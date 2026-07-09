import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Stripe from "stripe";

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

    const { credits } = await req.json();
    
    // Example pricing: 1 Credit = $2.99
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
