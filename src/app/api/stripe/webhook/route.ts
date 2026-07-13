import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { sendUpgradeSuccessfulEmail } from "@/lib/email-service";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
  if (!stripeSecretKey || !webhookSecret) {
    console.error("Stripe webhook is not configured (missing secret key or webhook secret).");
    return new NextResponse("Webhook not configured", { status: 500 });
  }

  const stripe = new Stripe(stripeSecretKey, { apiVersion: "2024-04-10" as any });

  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return new NextResponse("Missing signature", { status: 400 });
  }

  let event: Stripe.Event;

  // Always verify the webhook signature. No dev bypass.
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return new NextResponse("Webhook signature verification failed", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const userId = session.metadata?.userId;
    const creditsStr = session.metadata?.credits;
    const videoId = session.metadata?.videoId;

    // Idempotency guard: if we've already recorded a payment for this Stripe
    // session, do nothing. Payment.stripeId is unique.
    if (session.id) {
      const existing = await prisma.payment.findUnique({ where: { stripeId: session.id } });
      if (existing) {
        console.log(`Stripe session ${session.id} already processed; skipping.`);
        return new NextResponse(JSON.stringify({ received: true }), { status: 200 });
      }
    }

    if (videoId) {
      try {
        const amount = session.amount_total ? session.amount_total / 100 : 9.99;

        // Unlock the video, and record a payment when we know the buyer.
        const ops: any[] = [
          prisma.videoProject.update({
            where: { id: videoId },
            data: { hasWatermark: false, isDownloadable: true },
          }),
        ];
        if (userId) {
          ops.push(
            prisma.payment.create({
              data: {
                userId,
                stripeId: session.id,
                amount,
                creditsAdded: 0,
                status: "COMPLETED",
              },
            })
          );
        }
        await prisma.$transaction(ops);

        const updatedVideo = await prisma.videoProject.findUnique({
          where: { id: videoId },
          include: { user: true },
        });

        const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
        if (updatedVideo?.user?.email) {
          await sendUpgradeSuccessfulEmail(
            updatedVideo.user.email,
            updatedVideo.user.name || "User",
            `${appUrl}/v/${videoId}`
          );
        }

        console.log(`Successfully unlocked video ${videoId}`);
      } catch (error) {
        console.error("Failed to unlock video:", error);
      }
    } else if (userId && creditsStr) {
      const creditsAdded = parseInt(creditsStr, 10);
      const amount = session.amount_total ? session.amount_total / 100 : 0;

      if (!Number.isInteger(creditsAdded) || creditsAdded < 1) {
        console.error(`Invalid credits metadata on session ${session.id}: ${creditsStr}`);
        return new NextResponse(JSON.stringify({ received: true }), { status: 200 });
      }

      try {
        // Record payment and grant credits atomically.
        await prisma.$transaction([
          prisma.payment.create({
            data: {
              userId,
              stripeId: session.id,
              amount,
              creditsAdded,
              status: "COMPLETED",
            },
          }),
          prisma.user.update({
            where: { id: userId },
            data: { credits: { increment: creditsAdded } },
          }),
        ]);

        console.log(`Successfully added ${creditsAdded} credits to user ${userId}`);
      } catch (dbError) {
        console.error("Failed to update database after payment:", dbError);
      }
    }
  }

  return new NextResponse(JSON.stringify({ received: true }), { status: 200 });
}
