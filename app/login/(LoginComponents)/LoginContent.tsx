"use client";
import React, { useState } from "react";
import Logo from "../../(UIComponents)/Logo";
import { inter } from "../../utils/inter";
import { useRouter } from "next/navigation";
import Link from "next/link";
type Props = {};

function LoginContent({}: Props) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="md:col-span-6">
        {/* Logo */}
      <div className="ml-14 mt-12">
        <Link href="/">
          <Logo />
        </Link>
      </div>
      {/* Main Content */}
      <div className="mt-[12vh] flex flex-col mx-[25%]">
        <h1 className="font-bold text-3xl text-start">Welcome Back To Podle</h1>
        <p className="font-medium my-[3vh]">
          Login to explore Podle’s network of verified podcasting services.
        </p>
        {/* Input Feilds */}
        <div className="bg-white h-[7vh] w-full border-black border-[0.5px] border-opacity-50 flex items-center mb-3">
          <input
            className={`${inter.className} font-normal px-3 text-black focus:outline-none w-full`}
            placeholder="Email Address *"
            required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="bg-white h-[7vh] w-full border-black border-[0.5px] border-opacity-50 flex items-center mb-2">
          <input
            className={`${inter.className} font-normal px-3 text-black focus:outline-none w-full`}
            placeholder="Password *"
            required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            LOG IN
          </button>
        </div>
        {/* Link Signup */}
        <div className={`  ${inter.className} mt-[2vh] text-start items-start`}>
          <span className="font-medium text-start">
            Don't have an account?{"   "}
          </span>
          <Link href="/signup" className="font-bold text-[#16A235] ml-1">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginContent;
