import MobileLogo from "@/app/(UIComponents)/MobileLogo";
import Image from "next/image";
import React from "react";

type Props = {};

function PasswordImage({}: Props) {
  return (
    <section className="relative md:col-span-4 md:h-[100vh] h-[50vh] flex items-end justify-end top-0 right-0 order-1 md:order-2">
      <div className="flex items-start pt-[3vh] justify-center z-30 w-full h-full md:hidden">
        <MobileLogo />
      </div>
      <Image
        src="/forgotPhoto.png"
        alt="Podcast Girl"
        className="object-cover rounded-b-[50px] md:rounded-none"
        fill
      />
    </section>
  );
}

export default PasswordImage;
