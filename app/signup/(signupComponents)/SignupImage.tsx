import Logo from "@/app/(UIComponents)/Logo";
import MobileLogo from "@/app/(UIComponents)/MobileLogo";
import { urlFor } from "@/app/utils/UrlImage";
import Image from "next/image";
import React from "react";
import { Link } from "react-feather";

type Image = {
  image: {
    asset: {
      url: string;
    };
  };
};

type Props = {
  signUpImage: Image[]
};

function SignupImage({signUpImage}: Props) {
  return (
    <section className="relative md:col-span-4 md:h-[100vh] h-[50vh] flex items-end justify-end top-0 right-0 order-1 md:order-2 z-0">
      <div className="flex items-start pt-[3vh] justify-center z-30 w-full h-full">
        <MobileLogo />
      </div>
      <Image
        src={urlFor(signUpImage[0].image).url()}
        alt="Podcast Girl"
        className="object-cover rounded-b-[50px] md:rounded-none"
        fill
      />
    </section>
  );
}

export default SignupImage;
