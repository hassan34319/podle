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
import LoggedNavbar from "../(UIComponents)/LoggedNavbar";
import { client } from "../utils/client";

type Props = {};

export const dynamic = "force-dynamic";

async function ServicePage({}: Props) {
  const gigs = await client
    .fetch('*[_type == "gig" && !(_id match "draft*")]')
    .then((document) => {
      if (document) {
        console.log("All Gigs found:", document);
        return document;
      } else {
        console.log("Document not found");
      }
    })
    .catch((error) => {
      console.error("Error fetching document:", error);
    });

  const categories = await client.fetch(`
    *[_type == "podcastService"] {
      ...
    }
  `);

  return (
    <main className="top-0 mt-0 min-h-[100vh] text-black bg-[#E8DFCC]">
      <LoggedNavbar />
      <ServiceSearch categories={categories} Gigs={gigs} />
      <ServiceCategories categories={categories} />
      <ServicesMain Gigs={gigs} />
      <Footer />
      {/* <PodcastServices />
      <Footer /> */}
    </main>
  );
}

export default ServicePage;
