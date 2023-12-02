import MobileLogo from "@/app/(UIComponents)/MobileLogo";
import { urlFor } from "@/app/utils/UrlImage";
import Image from "next/image";
import React from "react";

type Image = {
  image: {
    asset: {
      url: string;
    };
  };
};

type Props = {
  createImage: Image[];
};

function CreateImage({ createImage }: Props) {
  return (
    <section className="relative md:col-span-4 md:h-[100vh] h-[50vh] flex items-end justify-end top-0 right-0 order-1 md:order-2">
      <div className="flex items-start pt-[3vh] justify-center z-30 w-full h-full md:hidden">
        <MobileLogo />
      </div>
      <Image
        src={urlFor(createImage[0].image).url()}
        alt="Podcast Girl"
        className="object-cover md:rounded-none rounded-b-[50px]"
        fill
      />
    </section>
  );
}

export default CreateImage;