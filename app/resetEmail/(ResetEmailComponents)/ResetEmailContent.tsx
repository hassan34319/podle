"use client";
import React, { useState } from "react";
import Logo from "../../(UIComponents)/Logo";
import { inter } from "../../utils/inter";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useStateContext } from "@/app/context/stateContext";
type Props = {};

function ResetEmailContent({}: Props) {
  const router = useRouter();
  const {email} = useStateContext()
  return (
    <div className="h-[85vh]">
      {/* Logo */}
      <div className="pl-14 pt-12">
        <Link href="/">
          <Logo />
        </Link>
      </div>
      {/* Main Content */}
      <div className="mt-[20vh] flex flex-col items-center mx-[35%]">
        <h1 className="font-bold text-3xl text-center">Check Your Email</h1>
        <p className="font-normal text-lg my-[3vh] text-center">
          We sent a password reset link to {email}
        </p>
        {/* Input Feilds */}
        {/* Button Login */}
        <div className={` ${inter.className} mt-[3vh]`}>
          <button
            onClick={() => router.push("/business")}
            className={`bg-black text-white font-medium   py-4 w-full px-28 `}
          >
            Open Email App
          </button>
        </div>
        <div className={`  ${inter.className} mt-[2vh]   text-sm`}>
          <span className="font-medium text-center">
            Didn't Recieve the Email?{"   "}
          </span>
          <Link href="/resend" className="font-bold text-[#16A235] ml-1">
            Click to Resend
          </Link>
        </div>
        {/* Link Signup */}
        <div
          className={`${inter.className} mt-[2vh] flex justify-center text-center items-center space-x-1`}
        >
          <ArrowLeftIcon height={15} width={15} className="text-black" />
          <Link
            href="/login"
            className="font-medium text-start text-sm hover:underline"
          >
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ResetEmailContent;
