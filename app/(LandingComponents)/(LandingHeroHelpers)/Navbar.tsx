import Link from "next/link";
import React from "react";
import { inter } from "../../utils/inter";
type Props = {};

function Navbar({}: Props) {
  return (
    <div className="flex flex-row lg:space-x-24 space-x-12 ">
      <div
        className={`${inter.className} flex flex-row justify-center items-center lg:space-x-8 space-x-4 cursor-pointer`}
      >
        <Link href="/services" className="font-medium cursor-pointer">
          Podcast Services
        </Link>
        <Link
          href="https://medium.com/@mattystaudt"
          className="font-medium cursor-pointer"
        >
          Blog
        </Link>
        <Link href="/login" className="font-medium cursor-pointer">
          Log In
        </Link>
        <Link
          href="https://discord.gg/JNvtFq3p"
          className="font-medium cursor-pointer"
        >
          Discord
        </Link>
      </div>
      <Link
        href="/signup"
        className="cursor-pointer relative bg-black  overflow-hidden flex flex-row lg:py-2 lg:px-6 px-2 py-1 rounded-sm md:rounded-none box-border items-center justify-center text-left  text-white font-inter"
      >
        <b className="relative">Sign Up</b>
      </Link>
    </div>
  );
}

export default Navbar;
