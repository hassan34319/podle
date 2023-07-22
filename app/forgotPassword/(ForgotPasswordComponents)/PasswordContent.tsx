"use client";
import React, { useState } from "react";
import Logo from "../../(UIComponents)/Logo";
import { inter } from "../../utils/inter";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useStateContext } from "@/app/context/stateContext";
type Props = {};

function PasswordContent({}: Props) {
  const router = useRouter();
  const [inputEmail, setInputEmail] = useState("");
  //   This email is used to store the submitted email in the context so that we can send reset email to that email from anywhere in the app
  const { email, addEmail } = useStateContext();
//   This function handles click on reset Password
    const handleResetPassword = ()=> {
        addEmail(inputEmail)
        router.push("/resetEmail")
    }

  return (
    <div className="md:col-span-6">
      {/* Logo */}
      <div className="ml-14 mt-12">
        <Link href="/">
          <Logo />
        </Link>
      </div>
      {/* Main Content */}
      <div className="mt-[20vh] flex flex-col mx-[25%]">
        <h1 className="font-bold text-3xl text-start">Forgot Password?</h1>
        <p className="font-medium my-[2vh]">
          No worries, we’ll send you reset instructions.
        </p>
        {/* Input Feilds */}
        <div className="bg-white h-[7vh] w-full border-black border-[0.5px] border-opacity-50 flex items-center mt-[4vh] ">
          <input
            className={`${inter.className} font-normal px-3 text-black focus:outline-none w-full`}
            placeholder="Email Address *"
            required
            value={inputEmail}
            onChange={(e) => setInputEmail(e.target.value)}
          />
        </div>
        {/* Button Login */}
        <div className={` ${inter.className} mt-[3vh]`}>
          <button
            onClick={handleResetPassword}
            className={`bg-black text-white font-medium   py-4 w-full px-20 `}
          >
            Reset Password
          </button>
        </div>
        {/* Link Signup */}
        <div
          className={`${inter.className} mt-[1.5vh] flex justify-center text-center items-center space-x-1`}
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

export default PasswordContent;
