"use client";
import React, { useState } from "react";
import Logo from "../../(UIComponents)/Logo";
import { inter } from "../../utils/inter";
import { useRouter } from "next/navigation";
import Link from "next/link";
type Props = {};

function UpdateContent({}: Props) {
  const router = useRouter();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="md:col-span-6 order-2 md:order-1">
        {/* Logo */}
      <div className="ml-14 mt-12">
        <Link href="/">
          <Logo />
        </Link>
      </div>
      {/* Main Content */}
      <div className="md:mt-[12vh] flex flex-col lg:mx-[25%] w-[90%] mx-auto md:w-[80%] lg:w-[50%]">
        <h1 className="font-bold text-3xl text-start">Update Password</h1>
        <p className="font-medium my-[3vh]">
          Update your password and make sure to keep it safe.
        </p>
        {/* Input Feilds */}
        <div className="bg-white h-[7vh] w-full border-black border-[0.5px] border-opacity-50 flex items-center mb-3">
          <input
            className={`${inter.className} font-normal px-3 text-black focus:outline-none w-full`}
            placeholder="New Password *"
            required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="bg-white h-[7vh] w-full border-black border-[0.5px] border-opacity-50 flex items-center mb-2">
          <input
            className={`${inter.className} font-normal px-3 text-black focus:outline-none w-full`}
            placeholder="Confirm Password *"
            required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <Link
          href="/forgotPassword"
          className={` ${inter.className} underline font-normal text-sm`}
        >
          Forgot Password?
        </Link>
        {/* Button Login */}
        <div className={` ${inter.className} mt-[3vh]`}>
          <button
            onClick={() => router.push("/business")}
            className={`bg-black text-white font-medium   py-4 w-full px-20 `}
          >
            Update Password
          </button>
        </div>
        {/* Link Signup */}
        <div className={`  ${inter.className} mt-[2vh] md:text-start md:items-start items-center text-center`}>
          <span className="font-medium md:text-start text-center">
            Do not want to rest Password?
          </span>
          <Link href="/login" className="font-bold text-[#16A235] ml-1">
            Go Back
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UpdateContent;
