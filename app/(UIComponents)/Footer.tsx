import Image from "next/image";
import Link from "next/link";
import React from "react";
import APP from "../../public/app_store.svg";
import { RiCopyrightLine } from "react-icons/ri";

type Props = {};

function Footer({}: Props) {
  return (
    <section className="mt-16 md:ml-[20%] md:mr-[35%] pb-[5vh] w-[90%] md:w-[45%] mx-auto">
      <div className="flex flex-row justify-between items-start pb-[10vh]">
        {/* Footer Navbar */}
        <div className="flex-col flex space-y-5 justify-start text-xs md:text-base">
          <Link href="/services" className="font-bold">
            Services
          </Link>
          <Link href="/faq" className="font-bold">
            FAQ
          </Link>
          <Link href="/privacyPolicy" className="font-bold">
            PRIVACY POLICY
          </Link>
          <Link href="/terms" className="font-bold">
            PODLE TERMS OF SERVICE
          </Link>
        </div>
        <div className="flex-col flex space-y-2 justify-start items-center">
          <Link href="/about" className="text-xs md:text-base font-extrabold ml-2 mb-4">
            GET THE MOBILE APP
          </Link>
          <div className="relative md:w-[200px] md:h-[60px] w-[150px] h-[45px]">
          <Image
            src="/app_store.png"
            alt="App store"
            fill
            className="mr-2 object-contain"
          ></Image>
          </div>
          <div className="relative md:w-[200px] md:h-[60px] w-[150px] h-[45px]">
          <Image
            src="/google_play_icon2.png"
            alt="Google store"
            fill
            className="mr-2 object-contain"
          ></Image>
          </div>
        </div>
      </div>
      <p className="flex-row flex font-medium items-center text-xs md:text-base justify-center md:justify-start ">
        <RiCopyrightLine height={4} width={4} className="mr-2"/>
        Copyright Podle, Inc. 2023. All Rights Reserved{" "}
      </p>
    </section>
  );
}

export default Footer;
