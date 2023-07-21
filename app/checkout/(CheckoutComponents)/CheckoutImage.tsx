import Image from "next/image";
import React from "react";

type Props = {};

function CheckoutImage({}: Props) {
  return (
    <section className="relative md:col-span-4 h-[97vh] flex mt-[3vh] ml-[3vh] rounded-3xl">
      <Image
        src="/podcast.jpg"
        alt="Podcast"
        className="object-cover"
        layout="fill"
      />
    </section>
  );
}

export default CheckoutImage;
