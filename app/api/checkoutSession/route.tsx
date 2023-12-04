import { NextResponse } from "next/server";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2022-11-15",
});


type ItemType =  {
  price : number,
  title : string,
  image : string
}
export async function POST(
    request: Request
) {
    const body = await request.json();
    const items: ItemType[] = body?.items;
    const order = body?.order
    const transformedItems = items?.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item?.title,
          // images: [urlFor(item.image[0]).url()],
          images : [item?.image],
        },
        unit_amount: Math.round(item?.price * 100),
      },
      quantity: 1,
    }));



    try {
     const params: Stripe.Checkout.SessionCreateParams = {
        payment_method_types: ["card"],
        line_items: transformedItems,
        payment_intent_data: {},
        mode: "payment",
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}services`,
        metadata: {
          // address: body.address,
          order : order,
        },
      };
      const checkoutSession: Stripe.Checkout.Session = await stripe.checkout.sessions.create(params);

      return NextResponse.json(checkoutSession);
    } catch (err) {
      console.log(err)
      const errorMessage = err instanceof Error ? err.message : "Internal server error";
      return NextResponse.json({ statusCode: 500, message: errorMessage });
    }
  } 