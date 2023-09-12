import React from "react";
import SecondaryNavbar from "../(UIComponents)/SecondaryNavbar";
import ServicesMain from "./(ServiceComponents)/ServicesMain";
import ServiceCategories from "./(ServiceComponents)/ServiceCategories";
import ServiceSearch from "./(ServiceComponents)/ServiceSearch";
import Footer from "../(UIComponents)/Footer";
import MobileNavbar from "../(UIComponents)/MobileNavbar";
import MobileLogo from "../(UIComponents)/MobileLogo";
import Link from "next/link";
import PageCircle from "./(ServiceComponents)/PageCircle";
import Image from "next/image";

type Props = {};

function ServicePage({}: Props) {
  return (
    <main className="top-0 mt-0 min-h-[100vh] text-black bg-[#E8DFCC]">
      <SecondaryNavbar />
      <div className="md:hidden flex flex-row justify-between z-30 relative pt-[8vh] items-center">
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
      <ServiceSearch />
      <ServiceCategories />
      <ServicesMain />
      <Footer />
      {/* <PodcastServices />
      <Footer /> */}
    </main>
  );
}

export default ServicePage;
