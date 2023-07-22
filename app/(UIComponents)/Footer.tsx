import Image from "next/image";
import Link from "next/link";
import React from "react";
import APP from "../../public/app_store.svg";
import { RiCopyrightLine } from "react-icons/ri";

type Props = {};

function Footer({}: Props) {
  return (
    <section className="mt-16 ml-[20%] mr-[35%] pb-[5vh]">
      <div className="flex flex-row justify-between items-start pb-[10vh]">
        {/* Footer Navbar */}
        <div className="flex-col flex space-y-5 justify-start">
          <Link href="/about" className="font-bold">
            ABOUT
          </Link>
          <Link href="/about" className="font-bold">
            CONTACT US
          </Link>
          <Link href="/about" className="font-bold">
            FAQ
          </Link>
          <Link href="/about" className="font-bold">
            PRIVACY POLICY
          </Link>
          <Link href="/about" className="font-bold">
            PODLE TERMS OF SERVICE
          </Link>
        </div>
        <div className="flex-col flex space-y-2 justify-start">
          <Link href="/about" className="font-bold ml-2 mb-4">
            GET THE MOBILE APP
          </Link>
          <Image
            src="/app_store.png"
            alt="App store"
            width={200}
            height={60}
            className="mr-2"
          ></Image>
          <Image
            src="/google_play_icon2.png"
            alt="Google store"
            width={200}
            height={60}
            className="ml-[0.4rem]"
          ></Image>
        </div>
      </div>
      <p className="flex-row flex font-medium items-center ">
        <RiCopyrightLine height={4} width={4} className="mr-2"/>
        Copyright Podle, Inc. 2023. All Rights Reserved{" "}
      </p>
    </section>
  );
}

export default Footer;
