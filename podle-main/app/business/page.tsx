import Link from "next/link";
import React from "react";
import Logo from "../(UIComponents)/Logo";
import MobileLogo from "../(UIComponents)/MobileLogo";
import { client } from "../utils/client";
import { inter } from "../utils/inter";
import BusinessContent from "./(businessComponents)/BusinessContent";

type Props = {};
export const revalidate = 60;
async function BusinessPage({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const backgroundImageUrl = "/bg_business.jpg"; // Replace 'jpg' with the actual file extension of your image.

  const { id } = searchParams;

  let clientFetch = null;
  if (id) {
    const query = `*[_type == 'autoBusiness' && _id == $id]`;
    const params = { id };

    clientFetch = await client
    .fetch(query, params)
    .then((result) => {
      // Handle the result
      return result; // Return the result to store it in clientFetch
    })
    .catch((error) => {
      // Handle errors
      console.error("Error:", error);
      throw error; // Rethrow the error to be caught by the caller
    });
  }

  const query = `*[_type == 'autoBusiness']`;

  // Fetch the documents
  const autoBusinesses = await client.fetch(query);

  const createImage = await client.fetch(`
  *[_type == "createImage"] {
    ...
  }
`);

  console.log(autoBusinesses);
  return (
    <main
      className="bg-cover bg-top min-h-[100vh] "
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      {/* Overlay Black */}
      <div className="absolute inset-0 bg-black bg-opacity-60" />
      {/* Logo */}

      {/* Main content based on conditions */}
      <BusinessContent
        business={clientFetch[0]}
        autoBusiness={autoBusinesses}
        createImage={createImage}
      />
    </main>
  );
}

export default BusinessPage;
