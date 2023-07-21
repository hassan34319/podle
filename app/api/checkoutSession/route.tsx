import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2022-11-15",
});
interface BusinessInfo {
    title: string;
    businessName: string;
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
    phoneNumber?: string; // Optional field for phone number
    searchResult?: string; // Field to store the search result
  }

export  async function POST(
    request: Request
) {
    const body = await request.json();
    console.log(body)
    const { title, streetAddress,city,state,zipCode,phoneNumber } = body;
    const searchResult = `${title}, ${streetAddress}, ${city}, ${state} ${zipCode}`
    // Calculate the total amount for the checkout session (you can change this according to your logic)
    const totalAmount = 2500; // $25.00 in cents

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: searchResult,
              },
              unit_amount: totalAmount,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
      });
      console.log(session)
        return NextResponse.json(session);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Internal server error";
      NextResponse.json({ statusCode: 500, message: errorMessage });
    }
  } 