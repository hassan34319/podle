import Link from "next/link";
import React from "react";
import Logo from "../(UIComponents)/Logo";
import MobileLogo from "../(UIComponents)/MobileLogo";
import { client } from "../utils/client";
import { getSessionServer } from "../utils/getCurrentUser";
import { inter } from "../utils/inter";
import SelectServicesContent from "./(SelectServicesComponents)/SelectServicesContent";

type Props = {};

async function SelectServicesPage({}: Props) {
  const backgroundImageUrl = "/bg_business.jpg"; // Replace 'jpg' with the actual file extension of your image.
  const session = await  getSessionServer()
  const searchEmail = session?.user?.email; // Replace with the email you want to search

  // Fetch the document based on the email field
  const user  = await client
    .fetch('*[_type == "claimedBusiness" && email == $email][0]', {
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

    console.log("From select services", user)
  return (
    <main
      className="bg-cover bg-top min-h-[100vh] h-max "
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      {/* Overlay Black */}
      <div className="absolute inset-0 bg-black bg-opacity-60" />
      {/* Logo */}
      <div className="md:pl-14 pt-4 md:pt-8 z-30 opacity-100 relative">
        <Link href="/" className="hidden md:block">
          <Logo />
        </Link>
        <div className="md:hidden flex items-start pt-[3vh] justify-center z-30 w-full">
          <MobileLogo />
        </div>
      </div>
      {/* Main content based on conditions */}
      <SelectServicesContent  user={user} />
    </main>
  );
}

export default SelectServicesPage;
