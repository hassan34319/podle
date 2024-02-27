import LoggedNavbar from "@/app/(UIComponents)/LoggedNavbar";
import { client } from "@/app/utils/client";
import { getSessionServer } from "@/app/utils/getCurrentUser";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import Footer from "../../(UIComponents)/Footer";
import MobileLogo from "../../(UIComponents)/MobileLogo";
import MobileNavbar from "../../(UIComponents)/MobileNavbar";
import SecondaryNavbar from "../../(UIComponents)/SecondaryNavbar";
import UserDetails from "./(CCComponents)/UserDetails";

type Props = {};
export const dynamic = 'force-dynamic'
async function ContentPage({}: Props) {
  const session = await getSessionServer();
  const searchEmail = session?.user?.email; // Replace with the email you want to search

  
  if (!session) {
    redirect('/login')
  }

  if(session.user?.name === 'serviceProvider') {
    redirect('/serviceProvider/dashboard')
  }

  // Fetch the document based on the email field
  const user  = await client
    .fetch('*[_type == "contentCreator" && email == $email][0]', {
      email: searchEmail,
    })
    .then((document) => {
      if (document) {
        console.log("Document found:", document);
        return document;
      } else {
        console.log("Document not found");
      }
    })
    .catch((error) => {
      console.error("Error fetching document:", error);
    });

    console.log("Me user", user)
  return (
    <main className="top-0 mt-0 min-h-[100vh] text-black bg-[#E8DFCC]">
      <LoggedNavbar/>
      <UserDetails user={user} />
      <Footer />
    </main>
  );
}

export default ContentPage;
