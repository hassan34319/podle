import Link from "next/link";
import React from "react";
import Logo from "../(UIComponents)/Logo";
import MobileLogo from "../(UIComponents)/MobileLogo";
import { client } from "../utils/client";
import { inter } from "../utils/inter";
import CCSignUp from "./(CCcomponents)/CCSignUp";

type Props = {};
export const revalidate = 60;
async function CCPage({}: Props) {
  const backgroundImageUrl = "/bg_business.jpg"; // Replace 'jpg' with the actual file extension of your image.


  const createImage = await client.fetch(`
  *[_type == "createImage"] {
    ...
  }
`);
  return (
    <main
      className="bg-cover bg-top min-h-[100vh] "
    >
      {/* Overlay Black */}
      <div className="absolute inset-0 bg-black bg-opacity-60" />
      {/* Logo */}

      {/* Main content based on conditions */}
      <CCSignUp createImage={createImage} />
    </main>
  );
}

export default CCPage;
