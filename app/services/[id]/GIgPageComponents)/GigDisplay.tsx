"use client";
import { fetchPostJSON } from "@/app/utils/api-helpers";
import { client } from "@/app/utils/client";
import getStripe from "@/app/utils/getStripe";
import { renderRatingStars, renderRatingStarsLarge } from "@/app/utils/stars";
import { useSession } from "next-auth/react";
import { Basic } from "next/font/google";
import Image from "next/image";
import {  useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import Stripe from "stripe";

type Props = {
  gig: Gig;
};

function GigDisplay({ gig }: Props) {
  const [loading, setLoading] = useState(false);
  const session = useSession();
  const user = session.data?.user;
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");

  const openModal = () => {
    setShowModal(true);
    document.body.style.overflow = "hidden"; // Prevent scrolling on the background
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = ""; // Allow scrolling on the background
  };

  const router = useRouter();

  const handleSend = async () => {
    if (!message || !gig || !gig.sellerEmail) {
      router.push("/login")
      return;
    }

    setLoading(true);

    try {
      // Find conversation based on conditions
      const conversations = await client.fetch(
        `
      *[_type == 'conversation' && (
        (email1 == $sellerEmail && email2 == $userEmail) ||
        (email1 == $userEmail && email2 == $sellerEmail)
      )]
    `,
        {
          sellerEmail: gig.sellerEmail,
          userEmail: user?.email || "", // Ensure user?.email is not undefined
        }
      );

      let conversation;

      if (conversations.length > 0) {
        conversation = conversations[0]; // Assuming you want to update the first found conversation
        const updatedMessages = [
          ...conversation.messages,
          { messageText: message, sender: user?.email },
        ];

        // Update the existing conversation with the new message
        await client
          .patch(conversation._id)
          .set({ messages: updatedMessages })
          .commit();
      } else {
        // Create a new conversation if none exists
        conversation = await client
          .create({
            _type: "conversation",
            email1: user?.email,
            email2: gig.sellerEmail,
            messages: [{ messageText: message, sender: user?.email }],
          })
          .then((res) => res)
          .catch((err) => {
            console.error("Error creating conversation:", err);
            return null;
          });
      }

      console.log("Message sent successfully to conversation:", conversation);
    } catch (error) {
      console.error("Error sending message:");
    }

    setLoading(false);
    closeModal(); // Close the modal after sending the message
  };
  const handleSubmit = async () => {
    if (!session.data) {
      router.push('/login')
      return;
    }
    try {
      setLoading(true);
      const checkoutSession: Stripe.Checkout.Session = await fetchPostJSON(
        "/api/checkoutSession",
        {
          items: [
            {
              title: gig.title + " " + pkgTitle,
              price: selectedPackage.price,
              image: gig.imageUrl,
            },
          ],
          order: JSON.stringify({
            _type: "order",
            sellerEmail: gig.sellerEmail,
            buyerEmail: user?.email,
            gigID: gig._id,
            packageName: pkgTitle,
            price: selectedPackage.price,
            status: "Pending",
            estimatedDelivery: selectedPackage.estimatedDeliveryTime,
          }),
        }
      );

      // Internal Server Error
      if ((checkoutSession as any).statusCode === 500) {
        console.error((checkoutSession as any).message);
        return;
      }

      // Redirect to checkout
      const stripe = await getStripe();
      setLoading(false);
      const { error } = await stripe!.redirectToCheckout({
        // Make the id field from the Checkout Session creation API response
        // available to this file, so you can provide it as parameter here
        // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
        sessionId: checkoutSession?.id, //This is is used as the query parameter to the success page.
      });
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `error.message`.
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `error.message`.
      console.warn(error.message);
    } catch {
      console.log("Error occured");
    }
  };
  const [selectedPackage, setSelectedPackage] = useState(gig.basicPackage);
  const [pkgTitle, selectedPkgTitle] = useState("basic");
  const basicClickHandler = () => {
    setSelectedPackage(gig.basicPackage);
    selectedPkgTitle("basic");
  };
  const standardClickHandler = () => {
    setSelectedPackage(gig.standardPackage);
    selectedPkgTitle("standard");
  };
  const premiumClickHandler = () => {
    setSelectedPackage(gig.premiumPackage);
    selectedPkgTitle("premium");
  };

  return (
    <main className="mt-2 md:mt-4 lg:mt-8 xl:px-8 px-4 pb-4 lg:pb-8">
      <h1 className="xl:text-xl md:text-lg text-base text-black font-bold">
        {gig.title}
      </h1>
      <div className="flex flex-row space-x-2 mt-[2vh]">
        {renderRatingStars(gig.rating).map((star, index) => (
          <span key={index}>{star}</span>
        ))}
        <p className="text-black text-sm md:text-base font-semibold">
          {gig.rating}
        </p>
        <p className="text-black text-sm md:text-base font-semibold">
          ({gig.numOrders})
        </p>
        <p className="text-black text-sm md:text-base font semibold">
          {" "}
          | 2 Orders in Queue
        </p>
      </div>
      <div className="flex xl:flex-row xl:justify-between flex-col mt-8  ">
        {/* Image */}
        <div className="xl:w-[60%] w-[95%] mx-auto xl:mx-0 xl:h-[28rem] h-[12rem] md:h-[24rem] flex justify-start relative ">
          <Image
            src={gig.imageUrl}
            alt={gig.title}
            fill
            className="object-cover rounded-md"
          />
        </div>
        {/* Table */}
        <div className="xl:w-[35%] bg-[#EEE8DA] w-[95%] mx-auto mt-8 xl:mt-0 xl:mx-0 rounded-xl">
          <div className="w-full grid grid-rows-1 grid-cols-3 rounded-xl">
            <div
              onClick={basicClickHandler}
              className={`h-12 cursor-pointer rounded-tl-xl font-bold md:h-12 lg:h-16 border-black border-opacity-[6%] border-2 flex items-center justify-center text-xs md:text-base ${
                pkgTitle == "basic" ? "bg-[#16A235]" : ""
              }`}
            >
              Basic
            </div>
            <div
              onClick={standardClickHandler}
              className={`h-12 cursor-pointer font-bold md:h-12 lg:h-16 border-black border-l-0 border-opacity-[6%] border-2 flex items-center justify-center text-xs md:text-base ${
                pkgTitle == "standard" ? "bg-[#16A235]" : ""
              }`}
            >
              Standard
            </div>
            <div
              onClick={premiumClickHandler}
              className={`h-12 cursor-pointer font-bold rounded-tr-xl md:h-12 lg:h-16 border-black border-l-0  border-opacity-[6%] border-2 flex items-center justify-center text-xs md:text-base ${
                pkgTitle == "premium" ? "bg-[#16A235]" : ""
              }`}
            >
              Premium
            </div>
          </div>
          <p className="text-sm xl:text-base text-black xl:px-8 px-4 mt-2 mb:mt-4 lg:mt-8">
            Description : {selectedPackage.description}
          </p>
          <div className="flex flex-row xl:px-8 px-4 mt-2 md:mt-4 lg:mt-8 w-full justify-between">
            <div className="flex flex-row   text-black text-bold gap-x-2">
              <svg
                className="md:w-[24px] md:h-[24px] h-[16px] w-[16px]"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z"
                  stroke="black"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M15.7109 15.1798L12.6109 13.3298C12.0709 13.0098 11.6309 12.2398 11.6309 11.6098V7.50977"
                  stroke="black"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p className="text-sm md:text-base">
                {selectedPackage.estimatedDeliveryTime}
              </p>
            </div>
            <h1 className="md:text-lg text-black font-bold text-sm ">
              ${selectedPackage.price}
            </h1>
          </div>
          <div className="mt-2 md:mt-4 lg:mt-8 flex-col space-y-2 px-4 md:px-8 text-sm md:text-base">
            {selectedPackage.Services.map((ser) => {
              return (
                <div
                  className={`flex flex-row gap-x-2  ${
                    ser.included ? "" : "opacity-30"
                  }`}
                >
                  <FaCheck />
                  <p className="text-black">{ser.serviceName}</p>
                </div>
              );
            })}
          </div>
          <div className="flex xl:flex-row flex-col w-full justify-center ">
            <button
              onClick={handleSubmit}
              className={`bg-[#16A235] w-[95%] mx-auto mt-2 md:mt-4 lg:mt-8 border-white hover:bg-opacity-80 rounded-lg border-[0.5px] font-medium text-white py-2 xl:py-4 `}
            >
              {loading ? "Loading" : "Order Now"}
            </button>
            <button
              onClick={openModal}
              className={`bg-black w-[95%] mx-auto mt-[1px] xl:mt-8  border-white hover:bg-opacity-80 rounded-lg border-[0.5px] font-medium text-white py-2 xl:py-4 `}
            >
              Send Message
            </button>
            {showModal && (
              <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-black opacity-50 absolute inset-0"></div>
                <div className="z-10 bg-white p-4 rounded-md shadow-md">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="border border-gray-300 p-2 rounded-md mb-2 w-full"
                  />
                  <div className="flex justify-end">
                    <button
                      onClick={handleSend}
                      disabled={loading}
                      className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
                    >
                      {loading ? "Sending..." : "Send"}
                    </button>
                    <button
                      onClick={closeModal}
                      className="bg-red-500 text-white px-4 py-2 rounded-md"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <h1 className="xl:text-xl md:text-lg text-base text-black font-bold mt-8">
        About The Service
      </h1>
      <p className=" xl:w-[60%] mt-4 text-sm md:text-base xl:text-lg">
        {gig.Description}
      </p>
    </main>
  );
}

export default GigDisplay;
