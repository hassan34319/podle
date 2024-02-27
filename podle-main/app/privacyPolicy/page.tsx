import Image from "next/image";
import React from "react";
import Footer from "../(UIComponents)/Footer";
import MobileLogo from "../(UIComponents)/MobileLogo";
import MobileNavbar from "../(UIComponents)/MobileNavbar";
import SecondaryNavbar from "../(UIComponents)/SecondaryNavbar";
import { client } from "../utils/client";

type Props = {};

type Policy = {
  _id: string;
  title: string;
  desc: string;
};

export const revalidate = 30;

async function Privacy({}: Props) {
  const query = `*[_type == 'privacy']`;

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
      <div className="flex flex-col items-center mt-4 md:mt-8 lg:mt-16">
        <h1 className="text-lg md:text-xl lg:text-4xl font-bold">
          Privacy Policy
        </h1>
        {policies.map((pol: Policy) => {
          return (
            <div
              key={pol._id}
              className="flex flex-col items-center mt-8 lg:mt-16 w-[90%] mx-auto text-center"
            >
              <h1 className="text-sm md:text-base lg:text-xl font-bold">
                {pol.title}
              </h1>
              <p className="text-xs md:text-sm lg:text-lg mt-2 lg:mt-4">{pol.desc}</p>
            </div>
          );
        })}
      </div>
      <Footer/>
    </main>
  );
}

export default Privacy;
