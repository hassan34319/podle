import Image from "next/image";
import React from "react";

type Props = {};

function PasswordImage({}: Props) {
  return (
    <section className="relative md:col-span-4 h-[100vh] flex items-end justify-end top-0 right-0">
      <Image
        src="/forgotPhoto.png"
        alt="Podcast Girl"
        className="object-cover"
        fill
      />
    </section>
  );
}

export default PasswordImage;