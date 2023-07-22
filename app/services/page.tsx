import React from "react";
import SecondaryNavbar from "../(UIComponents)/SecondaryNavbar";
import ServicesMain from "./(ServiceComponents)/ServicesMain";
import ServiceCategories from "./(ServiceComponents)/ServiceCategories";
import ServiceSearch from "./(ServiceComponents)/ServiceSearch";
import Footer from "../(UIComponents)/Footer";

type Props = {};

function ServicePage({}: Props) {
  return (
    <main className="top-0 mt-0 min-h-[100vh] text-black bg-[#E8DFCC]">
      <SecondaryNavbar />
      <ServiceSearch/>
      <ServiceCategories/>
      <ServicesMain/>
      <Footer/>
      {/* <PodcastServices />
      <Footer /> */}
    </main>
  );
}

export default ServicePage;
