"use client"
import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation'// Import the useRouter hook
import React from "react";
import { inter } from "../utils/inter";
import Logo from "./Logo";

type Props = {};

function SecondaryNavbar({}: Props) {
  const pathname = usePathname() // Get the router object
  console.log(pathname)

  return (
    <div className="h-[13vh] w-full bg-[#E8DFCC] md:flex flex-row items-center px-10 pt-4 hidden">
      <Link href="/" className="cursor-pointer">
      <Logo />
      </Link>
      <div
        className={`${inter.className} flex flex-row  text-opacity-100 justify-center items-center lg:space-x-8 space-x-4 cursor-pointer ml-[15%] mr-[35%]`}
      >
        <Link
          href="/dashboard"
          className={`font-medium cursor-pointer ${
              pathname === "/dashboard" ? "text-[#16A235]" : ""
          }`}
        >
          Dashboard
        </Link>
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
      </div>
      <div className="relative w-1/5 h-full py-10">
        <Image
          src="/proff.png"
          alt="Profile Icon"
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
}

export default SecondaryNavbar;
