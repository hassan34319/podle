import Image from "next/image";
import React from "react";
import Footer from "../(UIComponents)/Footer";
import MobileLogo from "../(UIComponents)/MobileLogo";
import MobileNavbar from "../(UIComponents)/MobileNavbar";
import SecondaryNavbar from "../(UIComponents)/SecondaryNavbar";
import UserDetails from "./(UserComponents)/UserDetails";
import UserReviews from "./(UserComponents)/UserReviews";
import UserSamples from "./(UserComponents)/UserSamples";

type Props = {};

function UserPage({}: Props) {
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
      <UserDetails />
      <UserSamples />
      <UserReviews />
      <Footer />
    </main>
  );
}

export default UserPage;
