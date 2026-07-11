import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { sendUpgradeSuccessfulEmail } from "@/lib/email-service";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_mock123", {
  apiVersion: "2024-04-10" as any,
});

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  let event: Stripe.Event;

  // Verify the webhook signature
  try {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "whsec_test_mock";
    // In production with real keys, you MUST provide a valid webhook secret in .env
    // For local dev without keys, we just parse the body if no signature is required.
    if (process.env.NODE_ENV === "production" || signature) {
      event = stripe.webhooks.constructEvent(body, signature as string, webhookSecret);
    } else {
      event = JSON.parse(body);
    }
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Handle the checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const userId = session.metadata?.userId;
    const creditsStr = session.metadata?.credits;
    const videoId = session.metadata?.videoId;

    if (videoId) {
      try {
        // 1. Unlock video
        const updatedVideo = await prisma.video.update({
          where: { id: videoId },
          data: {
            hasWatermark: false,
            isDownloadable: true,
          },
          include: { user: true }
        });

        // 2. Create a Payment record for this unlock
        if (userId) {
          const amount = session.amount_total ? session.amount_total / 100 : 9.99;
          await prisma.payment.create({
            data: {
              userId,
              stripeId: session.id,
              amount,
              creditsAdded: 0, // Video unlock, not credits
              status: "COMPLETED",
            }
          });
        }

        // 3. Send email
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
        if (updatedVideo.user?.email) {
          await sendUpgradeSuccessfulEmail(updatedVideo.user.email, updatedVideo.user.name || "User", `${baseUrl}/v/${videoId}`);
        }
        
        console.log(`Successfully unlocked video ${videoId}`);
      } catch (error) {
        console.error("Failed to unlock video:", error);
      }
    } else if (userId && creditsStr) {
      const creditsAdded = parseInt(creditsStr, 10);
      const amount = session.amount_total ? session.amount_total / 100 : 0;

      try {
        // 1. Create a Payment record
        await prisma.payment.create({
          data: {
            userId,
            stripeId: session.id,
            amount,
            creditsAdded,
            status: "COMPLETED",
          },
        });

        // 2. Increment the user's credits
        await prisma.user.update({
          where: { id: userId },
          data: {
            credits: {
              increment: creditsAdded,
            },
          },
        });

        console.log(`Successfully added ${creditsAdded} credits to user ${userId}`);
      } catch (dbError) {
        console.error("Failed to update database after payment:", dbError);
        // We still return 200 so Stripe doesn't retry infinitely if it's a structural DB error,
        // but in a robust system we might want to queue this or notify admins.
      }
    }
  }

  return new NextResponse(JSON.stringify({ received: true }), { status: 200 });
}
