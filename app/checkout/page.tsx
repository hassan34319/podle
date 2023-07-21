import Link from "next/link";
import React from "react";
import Logo from "../(UIComponents)/Logo";
import CheckoutContent from "./(CheckoutComponents)/CheckoutContent";

type Props = {};

const CheckoutPage = (props: Props) => {
  const backgroundImageUrl = "/bg_business.jpg"; // Replace 'jpg' with the actual file extension of your image.

  return (
    <main
      className="bg-cover bg-top min-h-[100vh] "
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      {/* Overlay Black */}
      <div className="absolute inset-0 bg-black bg-opacity-60" />
      {/* Logo */}
      <div className="pl-14 pt-8 z-30 opacity-100 relative">
        <Link href="/">
          <Logo />
        </Link>
      </div>
      {/* Main content based on conditions */}
      <CheckoutContent />
    </main>
  );
};

export default CheckoutPage;
