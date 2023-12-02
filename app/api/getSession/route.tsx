export const dynamic = "force-dynamic";

import { client } from "@/app/utils/client";
import { NextResponse } from "next/server";
import Stripe from "stripe";
const stripe: Stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

interface EventApplicant {
  _type: string;
  eventName: string;
  date: Date;
  name: string;
  phone: string;
  email: string;
  address: string;
}

interface User {
  user: EventApplicant;
}

const sanityReq = async (order: EventApplicant) => {
  const response = await client.create({
    ...order,
  });
};



export async function GET(req: Request) {
  try {
    const sessionId = req?.url?.split("=")[1] as string;

    if (sessionId) {
      const session = await stripe.checkout.sessions.listLineItems(sessionId);
      const sessionDetails = await stripe.checkout.sessions.retrieve(sessionId);
      console.log("🚀 ~ file: route.tsx:77 ~ GET ~ session:", session);
      console.log(
        "🚀 ~ file: route.tsx:78 ~ GET ~ sessionDetails:",
        sessionDetails
      );
      const metaData = sessionDetails?.metadata
      const order = JSON.parse(metaData!.order)
      const data = sanityReq(
        order
      );
     
      return NextResponse.json({ session, sessionDetails });
    } else {
      return NextResponse.json({ message: "No session id" });
    }
  } catch (err) {
    console.log(err);
  }
}
