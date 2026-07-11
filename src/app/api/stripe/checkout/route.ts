import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

// We use a dummy test key if none is provided in .env
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_mock123", {
  apiVersion: "2024-04-10" as any,
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { credits, videoId } = await req.json();
    
    // If unlocking a specific video
    if (videoId) {
      try {
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
                unit_amount: 999, // $9.99
              },
              quantity: 1,
            },
          ],
          mode: "payment",
          success_url: `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/v/${videoId}?success=true`,
          cancel_url: `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/v/${videoId}?canceled=true`,
          metadata: {
            userId: (session.user as any).id,
            videoId: videoId
          }
        });
        return NextResponse.json({ url: checkoutSession.url });
      } catch (stripeErr: any) {
        if (process.env.NODE_ENV === "development") {
          console.warn("Stripe checkout failed (mocking success redirect for dev mode):", stripeErr.message);
          
          // Actually update the DB to simulate webhook success since we skip it
          await prisma.payment.create({
            data: {
              userId: (session.user as any).id,
              amount: 999,
              status: "COMPLETED",
              stripeId: "mock-sess-" + Date.now(),
              creditsAdded: 0
            }
          });
          
          await prisma.video.update({
            where: { id: videoId },
            data: { hasWatermark: false, isDownloadable: true }
          });

          return NextResponse.json({ url: `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/v/${videoId}?success=true` });
        }
        throw stripeErr;
      }
    }

    // Default flow: Example pricing: 1 Credit = $2.99
    const amount = credits * 299;

    // Create Checkout Session
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
      success_url: `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/dashboard?success=true`,
      cancel_url: `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/pricing?canceled=true`,
      metadata: {
        userId: (session.user as any).id,
        credits: credits.toString()
      }
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error: any) {
    console.error("Stripe Checkout Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
