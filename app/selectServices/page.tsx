import Link from "next/link";
import React from "react";
import Logo from "../(UIComponents)/Logo";
import MobileLogo from "../(UIComponents)/MobileLogo";
import { inter } from "../utils/inter";
import SelectServicesContent from "./(SelectServicesComponents)/SelectServicesContent";

type Props = {};

function SelectServicesPage({}: Props) {
  const backgroundImageUrl = "/bg_business.jpg"; // Replace 'jpg' with the actual file extension of your image.

  return (
    <main
      className="bg-cover bg-top min-h-[100vh] "
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      {/* Overlay Black */}
      <div className="absolute inset-0 bg-black bg-opacity-60" />
      {/* Logo */}
      <div className="md:pl-14 pt-4 md:pt-8 z-30 opacity-100 relative">
        <Link href="/" className="hidden md:block">
          <Logo />
        </Link>
        <div className="md:hidden flex items-start pt-[3vh] justify-center z-30 w-full">
          <MobileLogo />
        </div>
      </div>
      {/* Main content based on conditions */}
      <SelectServicesContent />
    </main>
  );
}

export default SelectServicesPage;
