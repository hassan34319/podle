import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { inter } from "../../utils/inter";
import { signOut } from "next-auth/react"
type Props = {};

function Navbar({}: Props) {
  const session = useSession();
  return (
    <div className=" flex-row xl:space-x-24 space-x-12 hidden lg:flex w-full  ">
      <div
        className={`${inter.className} flex flex-row justify-center items-center xl:space-x-8 space-x-4 cursor-pointer md:text-xs xl:text-base`}
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
        {!session.data && (
          <Link href="/login" className="font-medium cursor-pointer">
            Log In
          </Link>
        )}
        {session.data && (
          <Link href={`/${session.data?.user?.name}/dashboard`} className="font-medium cursor-pointer">
            Dashboard
          </Link>
        )}
        <Link
          href="https://discord.gg/JNvtFq3p"
          className="font-medium cursor-pointer"
        >
          Discord
        </Link>
      </div>
      {!session.data && 
      <Link
        href="/signup"
        className="cursor-pointer relative bg-black  overflow-hidden flex flex-row md:py-2 md:px-6 px-2 py-1 rounded-sm md:rounded-none box-border items-center justify-center text-left  text-white font-inter "
      >
        <b className="relative text-xs">Sign Up</b>
      </Link>
}
      {session.data && 
      <button
        onClick={()=>signOut()}
        className="cursor-pointer relative bg-black  overflow-hidden flex flex-row md:py-2 md:px-4 px-2 py-1 rounded-sm md:rounded-none box-border items-center justify-center text-left  text-white font-inter "
      >
        <b className="relative text-xs">Log Out</b>
      </button>
}
    </div>
  );
}

export default Navbar;
