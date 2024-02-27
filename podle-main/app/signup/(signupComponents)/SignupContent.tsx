"use client";
import React from "react";
import Logo from "../../(UIComponents)/Logo";
import { inter } from "../../utils/inter";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Props = {
  
}

function SignupContent({}: Props) {
  const router = useRouter();
  return (
    <div className="md:col-span-6 order-2 md:order-1 ">
      <div className="md:ml-14 md:mt-12 ">
        <Link href="/" className="hidden md:block ">
          <Logo />
        </Link>
      </div>
      <div className="md:mt-[23vh] mt-[5vh] flex flex-col items-center justify-center md:justify-start w-[90%] md:w-full mx-auto">
        <h1 className="font-bold text-3xl">How would you like to use podle?</h1>
        {/* Button 1 */}
        <div className={` ${inter.className} mt-[7vh]`}>
          <button
            onClick={() => router.push("/contentCreatorSignUp")}
            className={`bg-[#16A235] text-white font-medium   py-4 w-full md:px-20 px-12 bg-opacity-[83%]`}
          >
            Sign up as a Content creator
          </button>
        </div>
        {/* Button 2 */}
        <div className={` ${inter.className} mt-[3vh]`}>
          <button
            onClick={() => router.push("/business")}
            className={`bg-black text-white font-medium   py-4 w-full md:px-20 px-12 `}
          >
            Sign up as a Service provider
          </button>
        </div>
        <div
          className={` md:pr-32 ${inter.className} mt-[3vh] md:text-start text-center items-center md:items-start`}
        >
          <span className="font-medium md:text-start text-center">
            Already have an account?{"   "}
          </span>
          <Link href="/login" className="font-bold text-[#16A235] ml-1">Log in</Link>
        </div>
      </div>
    </div>
  );
}

export default SignupContent;
