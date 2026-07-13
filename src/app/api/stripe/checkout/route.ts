import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

// Lazily construct the Stripe client so an unset key doesn't throw at import time
// (which would break build-time page-data collection).
function getStripe(): Stripe | null {
  if (!stripeSecretKey) return null;
  return new Stripe(stripeSecretKey, { apiVersion: "2024-04-10" as any });
}

const MAX_CREDITS_PER_CHECKOUT = 100;
const CREDIT_PRICE_CENTS = 299; // $2.99 per credit
const VIDEO_UNLOCK_CENTS = 999; // $9.99 per video

function baseUrl(): string {
  return process.env.NEXTAUTH_URL || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
}

export async function POST(req: Request) {
  try {
    const stripe = getStripe();
    if (!stripe) {
      return NextResponse.json({ error: "Payments are not configured." }, { status: 503 });
    }

    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const { credits, videoId } = await req.json();

    // --- Flow 1: Unlock a specific video ---
    if (videoId) {
      if (typeof videoId !== "string") {
        return NextResponse.json({ error: "Invalid videoId" }, { status: 400 });
      }

      // Ownership check: users can only pay to unlock their own videos.
      const project = await prisma.videoProject.findUnique({
        where: { id: videoId },
        select: { id: true, userId: true },
      });

      if (!project || project.userId !== userId) {
        return NextResponse.json({ error: "Not found or unauthorized" }, { status: 404 });
      }

      const checkoutSession = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "1IMP Premium Video Unlock",
                description: "Remove watermark, enable HD downloads, and get a shareable profile.",
              },
              unit_amount: VIDEO_UNLOCK_CENTS,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${baseUrl()}/v/${videoId}?success=true`,
        cancel_url: `${baseUrl()}/v/${videoId}?canceled=true`,
        metadata: {
          userId,
          videoId,
        },
      });
      return NextResponse.json({ url: checkoutSession.url });
    }

    // --- Flow 2: Buy credits ---
    if (!Number.isInteger(credits) || credits < 1 || credits > MAX_CREDITS_PER_CHECKOUT) {
      return NextResponse.json(
        { error: `Credits must be a whole number between 1 and ${MAX_CREDITS_PER_CHECKOUT}.` },
        { status: 400 }
      );
    }

    const amount = credits * CREDIT_PRICE_CENTS;

    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${credits} AI Video Credits`,
              description: "Generate professional AI introductions",
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${baseUrl()}/dashboard?success=true`,
      cancel_url: `${baseUrl()}/pricing?canceled=true`,
      metadata: {
        userId,
        credits: credits.toString(),
      },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error: any) {
    console.error("Stripe Checkout Error:", error);
    return NextResponse.json({ error: "Failed to start checkout" }, { status: 500 });
  }
}
