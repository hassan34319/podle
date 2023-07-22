"use client";
import React from "react";
import Logo from "../../(UIComponents)/Logo";
import { inter } from "../../utils/inter";
import { useRouter } from "next/navigation";
import Link from "next/link";
type Props = {};

function SignupContent({}: Props) {
  const router = useRouter();
  return (
    <div className="md:col-span-6">
      <div className="ml-14 mt-12">
        <Link href="/">
          <Logo />
        </Link>
      </div>
      <div className="mt-[23vh] flex flex-col items-center">
        <h1 className="font-bold text-3xl">How would you like to use podle?</h1>
        {/* Button 1 */}
        <div className={` ${inter.className} mt-[7vh]`}>
          <button
            className={`bg-[#16A235] text-white font-medium   py-4 w-full px-20 bg-opacity-[83%]`}
          >
            Sign up as a Content creator
          </button>
        </div>
        {/* Button 2 */}
        <div className={` ${inter.className} mt-[3vh]`}>
          <button
            onClick={() => router.push("/business")}
            className={`bg-black text-white font-medium   py-4 w-full px-20 `}
          >
            Sign up as a Service provider
          </button>
        </div>
        <div
          className={` pr-32 ${inter.className} mt-[3vh] text-start items-start`}
        >
          <span className="font-medium text-start">
            Already have an account?{"   "}
          </span>
          <Link href="/login" className="font-bold text-[#16A235] ml-1">Log in</Link>
        </div>
      </div>
    </div>
  );
}

export default SignupContent;
