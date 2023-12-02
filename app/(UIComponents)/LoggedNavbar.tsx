"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { client } from "../utils/client";
import { urlFor } from "../utils/UrlImage";
import MobileLogo from "./MobileLogo";
import MobileNavbar from "./MobileNavbar";
import SecondaryNavbar from "./SecondaryNavbar";

type Props = {};

function LoggedNavbar({}: Props) {
  const session = useSession();
  const [imageMain, setImageUrl] = useState("");
  const searchEmail = session?.data?.user?.email; // Replace with the email you want to search

  // Fetch the document based on the email field

  (async () => {
    if (session?.data?.user?.name === "contentCreator") {
      try {
        const user = await client.fetch(
          '*[_type == "contentCreator" && email == $email][0]',
          {
            email: searchEmail,
          }
        );

        if (user) {
          console.log("Document found:", user);
          const imageUrl = user.profileImage;
          setImageUrl(imageUrl);
        } else {
          console.log("Document not found");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    }

    if (session?.data?.user?.name === "serviceProvider") {
      try {
        const user = await client.fetch(
          '*[_type == "claimedBusiness" && email == $email][0]',
          {
            email: searchEmail,
          }
        );

        if (user) {
          console.log("Document found:", user);
          const imageUrl = urlFor(user.logo).url();
          setImageUrl(imageUrl);
        } else {
          console.log("Document not found");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    }
  })();

  return (
    <>
      <SecondaryNavbar />
      <div className="lg:hidden flex flex-row justify-between z-30 relative pt-[4vh] items-center">
        <MobileNavbar />
        <MobileLogo />
        {session.data && (
        <div className="relative w-10 md:w-16 h-full py-10 mr-4 rounded-full">
            <Image
              src={imageMain}
              alt="Profile Icon"
              fill
              className="object-contain rounded-full "
            />
                    </div>
          )}
        {!session.data && (
          <Link
            href="/signup"
            className="cursor-pointer relative bg-black mr-1  overflow-hidden flex flex-row md:py-2 md:px-6 px-2 py-1 rounded-sm md:rounded-none box-border items-center justify-center text-left  text-white font-inter "
          >
            <b className="relative text-xs">Sign Up</b>
          </Link>
        )}
      </div>
    </>
  );
}

export default LoggedNavbar;
