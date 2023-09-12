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
  LoginImage: Image[];
};

function LoginImage({ LoginImage }: Props) {
  return (
    <section className="relative md:col-span-4 md:h-[100vh] h-[50vh] flex items-end justify-end top-0 right-0 order-1 md:order-2">
      <div className="flex items-start pt-[3vh] justify-center z-30 w-full h-full">
        <MobileLogo />
      </div>
      <Image
        src={urlFor(LoginImage[0].image).url()}
        alt="Podcast Girl"
        className="object-cover md:rounded-none rounded-b-[50px]"
        fill
      />
    </section>
  );
}

export default LoginImage;
