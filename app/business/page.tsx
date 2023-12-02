import Link from "next/link";
import React from "react";
import Logo from "../(UIComponents)/Logo";
import MobileLogo from "../(UIComponents)/MobileLogo";
import { client } from "../utils/client";
import { inter } from "../utils/inter";
import BusinessContent from "./(businessComponents)/BusinessContent";

type Props = {};
export const revalidate = 60;
async function BusinessPage({}: Props) {
  const backgroundImageUrl = "/bg_business.jpg"; // Replace 'jpg' with the actual file extension of your image.

  const query = `*[_type == 'autoBusiness']`;

  // Fetch the documents
  const autoBusinesses = await client.fetch(query);

  const createImage = await client.fetch(`
  *[_type == "createImage"] {
    ...
  }
`);

    console.log(autoBusinesses)
  return (
    <main
      className="bg-cover bg-top min-h-[100vh] "
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      {/* Overlay Black */}
      <div className="absolute inset-0 bg-black bg-opacity-60" />
      {/* Logo */}

      {/* Main content based on conditions */}
      <BusinessContent autoBusiness={autoBusinesses} createImage={createImage} />
    </main>
  );
}

export default BusinessPage;
