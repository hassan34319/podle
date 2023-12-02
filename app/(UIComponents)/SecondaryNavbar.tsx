"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import the useRouter hook
import React, { useState } from "react";
import {TiMessage } from "react-icons/ti";
import { client } from "../utils/client";
import { inter } from "../utils/inter";
import { urlFor } from "../utils/UrlImage";
import Logo from "./Logo";

type Props = {};

function SecondaryNavbar({}: Props) {
  const pathname = usePathname(); // Get the router object
  console.log(pathname);
  const session = useSession();
  const [imageMain, setImageUrl] = useState("");

  (async () => {
    const searchEmail = session.data?.user?.email;
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
  console.log(pathname);
  return (
    <div className="h-[13vh] w-full bg-[#E8DFCC] lg:flex flex-row items-center px-8 pt-4 hidden justify-between">
      <Link href="/" className="cursor-pointer">
        <Logo />
      </Link>
      <div
        className={`${inter.className}  flex flex-row  text-opacity-100 justify-center items-center lg:space-x-8 space-x-4 cursor-pointer `}
      >
        {session.data && (
          <Link
            href={`/${session.data?.user?.name}/dashboard`}
            className={`font-medium cursor-pointer ${
              pathname?.includes(`${session.data?.user?.name}/dashboard`)
                ? "text-[#16A235]"
                : ""
            }`}
          >
            Dashboard
          </Link>
        )}
        {session.data && (
          <Link
            href={`/${session.data?.user?.name}/order`}
            className={`font-medium cursor-pointer ${
              pathname?.includes(`${session.data?.user?.name}/order`)
                ? "text-[#16A235]"
                : ""
            }`}
          >
            Orders
          </Link>
        )}
        {session.data && session.data?.user?.name == "serviceProvider" && (
          <Link
            href={`/transaction`}
            className={`font-medium cursor-pointer ${
              pathname?.includes(`/transaction`) ? "text-[#16A235]" : ""
            }`}
          >
            Transactions
          </Link>
        )}
        {!session.data && (
          <Link
            href="/login"
            className={`font-medium cursor-pointer ${
              pathname === "/login" ? "text-[#16A235]" : ""
            }`}
          >
            Login
          </Link>
        )}
        <Link
          href="https://medium.com/@mattystaudt"
          className={`font-medium cursor-pointer ${
            pathname === "/Blog" ? "text-[#16A235]" : ""
          }`}
        >
          Blogs
        </Link>
        <Link
          href="/services"
          className={`font-medium cursor-pointer ${
            pathname === "/services" ? "text-[#16A235]" : ""
          }`}
        >
          Services
        </Link>
        <Link
          href="https://discord.gg/JNvtFq3p"
          className={`font-medium cursor-pointer ${
            pathname === "/Discord" ? "text-[#16A235]" : ""
          }`}
        >
          Discord
        </Link>
        {session.data && (
          <Link
            onClick={() => signOut()}
            href="/"
            className={`font-medium cursor-pointer `}
          >
            Log out
          </Link>
        )}
      </div>
      <div className="relative w-max py-10 flex flex-row items-center gap-x-4  ">
        {session.data && (
          <Link href="/messages">
            <TiMessage height={40} width={40} className="h-8 w-8" />
          </Link>
        )}
        {session.data && (
          <div className="relative w-20 h-20 overflow-hidden  py-10 rounded-full  ">
            <Image
              src={imageMain}
              alt="Profile Icon"
              fill
              className="object-cover w-full h-full rounded-full "
            />
          </div>
        )}
        <div>
          {!session.data && (
            <Link
              href="/signup"
              className="cursor-pointer relative bg-black  overflow-hidden flex flex-row md:py-2 md:px-6 px-2 py-1 rounded-sm md:rounded-none box-border items-center justify-center text-left  text-white font-inter "
            >
              <b className="relative text-xs">Sign Up</b>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default SecondaryNavbar;
