import Image from "next/image";
import React, { useState } from "react";
import MobileLogo from "../(UIComponents)/MobileLogo";
import MobileNavbar from "../(UIComponents)/MobileNavbar";
import SecondaryNavbar from "../(UIComponents)/SecondaryNavbar";
import { client } from "../utils/client";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/solid";
import FAQComponent from "./(FAQComponents)/FAQComponent";
import Footer from "../(UIComponents)/Footer";

type Props = {};

type FAQ = {
  _id: string;
  question: string;
  answer: string;
};

export const revalidate = 30;

async function FAQ({}: Props) {
  
  const query = `*[_type == 'faq']`;

  // Fetch the documents
  const policies = await client.fetch(query);
  console.log(policies);
  return (
    <main className="top-0 mt-0 min-h-[100vh] text-black bg-[#E8DFCC] w-full">
      <SecondaryNavbar />
      <div className="lg:hidden flex flex-row justify-between z-30 relative pt-[4vh] items-center">
        <MobileNavbar />
        <MobileLogo />
        <div className="relative w-1/4 h-full py-10">
          <Image
            src="/proff.png"
            alt="Profile Icon"
            fill
            className="object-contain"
          />
        </div>
      </div>
      <FAQComponent policies={policies}/>
      <Footer/>
    </main>
  );
}

export default FAQ;
