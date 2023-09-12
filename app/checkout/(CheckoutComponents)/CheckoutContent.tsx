"use client";
import { useStateContext } from "@/app/context/stateContext";
import getStripe from "@/app/utils/getStripe";
import { inter } from "@/app/utils/inter";
import React, { useContext, useState } from "react";
import CheckoutImage from "./CheckoutImage";
import Stripe from "stripe";
import { useRouter } from "next/navigation";

type Props = {};

const CheckoutContent = (props: Props) => {
  const { business } = useStateContext();
  const [loading, setLoading] = useState(false);
  const {
    title,
    businessName,
    streetAddress,
    city,
    state,
    zipCode,
    phoneNumber,
  } = business;
  if (business.title) {
    business.searchResult = `${businessName}, ${streetAddress}, ${city}, ${state} ${zipCode}`;
  }
  const router = useRouter();
  const createCheckoutSession = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/checkoutSession", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          businessName,
          streetAddress,
          city,
          state,
          zipCode,
          phoneNumber,
        }),
      });

      const data = await response.json();
      console.log(data);
      setLoading(false);

      if (data.error) {
        // Handle the error
        console.error(data.error);
      } else {
        // Redirect the user to the Stripe Checkout page
        router.push(`${data.url}`);
      }
    } catch (error) {
      setLoading(false);
      console.error("Something went wrong", error);
    }
  };

  return (
    <div className="z-30 opacity-100 relative text-white h-[85vh]">
      <div className="flex flex-col items-center">
        <h1 className="lg:mt-[9vh] md:mt-[20vh] mt-[20vh]  font-extrabold md:text-6xl text-3xl">
          Checkout
        </h1>
        <div
          className={`mt-[8vh] rounded-lg bg-white box-border lg:w-[40%] md:w-[60%] w-[80%] border-[1px] ${inter.className} border-solid border-black flex-col items-center justify-center rounded-xl`}
        >
          <p className="text-black font-bold text-xl py-8 px-10 text-start flex flex-col">
            {business.searchResult}
            <span className="border-b-[1px] border-black border-opacity-50 pb-2">
              Contact : {business.phoneNumber}
            </span>
            <span className="pt-2 text-opacity-50 text-black">
              Total : $25.00
            </span>
          </p>
        </div>
        <div className="w-[40%] flex justify-between mt-[5vh]">
          <button
            className={`bg-[#16A235] border-white bg-opacity-100 border-[0.5px] font-medium ${inter.className} text-white w-full py-2`}
            onClick={createCheckoutSession}
          >
            {loading ? "Loading" : "CHECKOUT"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutContent;
