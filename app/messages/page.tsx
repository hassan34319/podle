import { getServerSession } from "next-auth";
import Image from "next/image";
import React from "react";
import Footer from "../(UIComponents)/Footer";
import LoggedNavbar from "../(UIComponents)/LoggedNavbar";
import { client } from "../utils/client";
import { getSessionServer } from "../utils/getCurrentUser";
import { urlFor } from "../utils/UrlImage";
import MainConvo from "./MessageComponents)/MainConvo";
import MobileChats from "./MessageComponents)/MobileChats";

type Props = {};
export const dynamic = "force-dynamic";

async function page({}: Props) {
  const session = await getSessionServer();
  const searchEmail = session?.user?.email;

  const conversations = await client
    .fetch(
      `*[_type == 'conversation' && (email1 == $searchEmail || email2 == $searchEmail)]`,
      { searchEmail }
    )
    .catch((error: string) => {
      console.error("Error fetching conversations:", error);
    });

  //   const otherUserEmails = conversations.map((conversation: any) =>
  //     conversation.email1 !== searchEmail
  //       ? conversation.email1
  //       : conversation.email2
  //   );

  const conversationsWithOtherUsers = await Promise.all(
    conversations.map(async (conversation: any) => {
      const otherUserEmail =
        conversation.email1 !== searchEmail
          ? conversation.email1
          : conversation.email2;

      try {
        const otherUser = await client.fetch(
          `*[_type == "contentCreator" && email == $email][0]`,
          { email: otherUserEmail }
        );

        if (otherUser) {
          return {
            ...conversation,
            otherUserName: otherUser?.userName || "No Username",
            otherUserImage: otherUser?.profileImage || "No Image content",
            otherUserType : 'Content Creator'
          };
        } else {
          const otherUser2 = await client.fetch(
            `*[_type == "claimedBusiness" && email == $email][0]`,
            { email: otherUserEmail }
          );

          return {
            ...conversation,
            otherUserName: otherUser2?.name || "No Username",
            otherUserImage:
              urlFor(otherUser2?.logo).url() || "No Image claimed",
              otherUserType : 'Service Provider'
          };
        }
      } catch (error) {
        console.error("Error fetching other users:", error);
        return null; // Handle error case or return a default value
      }
    })
  );
  console.log("Conversations:", conversationsWithOtherUsers);
  return (
    <main className="top-0 mt-0 min-h-[100vh] text-black bg-[#E8DFCC]">
      <LoggedNavbar />
      {conversations.length == 0 && (
        <div className="flex items-center min-h-[80vh] justify-center">
          <p>No Conversations found</p>
        </div>
      )}
      {conversations.length > 0 && (
        <>
        <MainConvo conversations ={conversationsWithOtherUsers}/>
        <MobileChats conversations={conversationsWithOtherUsers}/>
        </>
      )}
      <Footer />
    </main>
  );
}

export default page;
