"use client"
import { client } from "@/app/utils/client";
import { inter } from "@/app/utils/inter";
import { urlFor } from "@/app/utils/UrlImage";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Props = {
  user: ServiceProvider;
  unclaimed: boolean;
};

function UserImage({ user, unclaimed }: Props) {
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
    <div className="flex flex-col md:w-[36%] w-[90%] relative mt-2 items-center mx-auto md:mx-0">
      {/* Image */}
      <div className="md:h-[80%] h-[24rem] w-full relative">
        <Image src={user.logo} alt="User" className="object-contain " fill />
      </div>
      {/* Button */}

      {unclaimed && (
        <Link
        href={`/business?id=${user._id}`}
          className={`bg-[#16A235] mt-[3vh] border-white hover:bg-opacity-80 rounded-lg border-[0.5px] font-medium  ${inter.className} text-white w-full py-4 `}
        >
          Claim Now
        </Link>
      )}
      {!unclaimed && (
        <>
          <button
          onClick={()=>setShowModal(true)}
            className={`bg-[#16A235] mt-[3vh] border-white hover:bg-opacity-80 rounded-lg border-[0.5px] font-medium  ${inter.className} text-white w-full py-4 `}
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

export default UserImage;
