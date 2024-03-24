"use client";
import { client } from "@/app/utils/client";
import { inter } from "@/app/utils/inter";
import { renderRatingStars } from "@/app/utils/stars";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import {
  MdArrowUpward,
  MdOutlineVerifiedUser,
  MdFireplace,
} from "react-icons/md";

type Props = {
  user: ServiceProvider;
  rating: number;
  reviews: Review[];
  unclaimed: boolean;
};

function UserDescription({ user, rating, reviews, unclaimed }: Props) {
  const [loading, setLoading] = useState(false);
  const session = useSession();
  const user2 = session.data?.user;
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


  const handleSend = async () => {
    if (!message) {
      // router.push("/login")
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
          sellerEmail: user.email,
          userEmail: user2?.email || "", // Ensure user?.email is not undefined
        }
      );

      let conversation;

      if (conversations.length > 0) {
        conversation = conversations[0]; // Assuming you want to update the first found conversation
        const updatedMessages = [
          ...conversation.messages,
          { messageText: message, sender: user2?.email },
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
            email1: user2?.email,
            email2: user?.email,
            messages: [{ messageText: message, sender: user2?.email }],
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
  return (
    <div
      className={`px-[8%] flex flex-col h-full justify-between ${inter.className} text-lg md:w-[64%] w-full md:pb-[8vh] `}
    >
      {/* Name and other details */}
      <div className="flex flex-col w-full mt-[6vh]">
        {/* Name and Rating */}
        <div className="flex md:flex-row flex-col gap-y-2 md:gap-y-0 justify-between w-full">
          {/* Name */}
          <div className="w-full flex flex-row gap-x-4 md:block md:gap-x-0">
            <p className="text-[#16A235] font-medium mb-[2vh]">
              Business Name :
            </p>
            <p className="text-black font-semibold">{user.name}</p>
          </div>
          {/* Rating */}
          <div className="w-full flex flex-row gap-x-4 md:block md:gap-x-0">
            <p className="text-[#16A235] font-medium mb-[2vh] ">Rating : </p>
            <div className="flex flex-row space-x-2">
              {renderRatingStars(rating).map((star, index) => (
                <span key={index}>{star}</span>
              ))}
              <p className="text-black text-sm md:text-base font-semibold">
                {rating && rating}
              </p>
              <p className="text-black text-sm md:text-base font-semibold">
                ({reviews.length > 0 && reviews.length})
              </p>
            </div>
          </div>
        </div>
        {/* Services and verified */}
        <div className="flex md:flex-row flex-col gap-y-2 md:gap-y-0 justify-between w-full md:mt-[8vh]">
          {/* Services */}
          <div className="w-full flex flex-row gap-x-4 md:block md:gap-x-0">
            <p className="text-[#16A235] font-medium mb-[2vh]">
              On Podle Since
            </p>
            <p className="text-black font-semibold">
              {" "}
              {new Date(user._createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          {/* Verified */}
          <div className="w-full flex flex-row gap-x-4 md:block md:gap-x-0">
            <p className="text-black font-medium mb-[2vh] flex flex-row ">
              {user.specialTag}
              <span>
                {user.specialTag === "Hot" && (
                  <MdFireplace
                    height={20}
                    width={20}
                    className="text-red-500 ml-2"
                  />
                )}
                {user.specialTag === "Top Rated" && (
                  <MdArrowUpward
                    height={20}
                    width={20}
                    className="text-blue-500 ml-2"
                  />
                )}
                {user.specialTag == "Recommended" && (
                  <MdOutlineVerifiedUser
                    height={20}
                    width={20}
                    className="text-black ml-2"
                  />
                )}
              </span>
            </p>
          </div>
        </div>
      </div>
      {/* Description */}
      <div className="md:mb-[4vh] mb-[2vh] mt-4">
        <p className="text-[#16A235] font-medium mb-[2vh]">Description</p>
        <p className="text-black font-normal">{user.description}</p>
      </div>
      <p className="text-[#16A235] font-medium mb-[2vh]">
        We are Know For These Services :{" "}
      </p>
      <div className="flex flex-row flex-wrap mb-[6vh]">
        {user.services.map((service, index) => (
          <button
            key={index}
            className="bg-[#16A235] text-white px-3 py-1 rounded-md mr-2 mb-2"
          >
            {service}
          </button>
        ))}
      </div>
      {unclaimed && (
        <Link
         href={`/business?id=${user._id}`}
          className={`bg-[#16A235] mt-[3vh] md:hidden border-white hover:bg-opacity-80 rounded-lg border-[0.5px] font-medium  ${inter.className} text-white w-full py-4 `}
          // onClick={() => router.push("/selectServices")}
        >
          Claim Now
        </Link>
      )}
      {!unclaimed && (
        <>
          <button
            className={`bg-[#16A235] mt-[3vh] md:hidden border-white hover:bg-opacity-80 rounded-lg border-[0.5px] font-medium  ${inter.className} text-white w-full py-4 `}
            // onClick={() => router.push("/selectServices")}
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
        </>
      )}
    </div>
  );
}

export default UserDescription;
