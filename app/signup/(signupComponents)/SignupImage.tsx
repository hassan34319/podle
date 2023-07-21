import Image from "next/image";
import React from "react";

type Props = {};

function SignupImage({}: Props) {
  return (
    <section className="relative md:col-span-4 h-[100vh] flex items-end justify-end top-0 right-0">
      <Image
        src="/podcastGirl2.png"
        alt="Podcast Girl"
        className="object-cover"
        layout="fill"
      />
    </section>
  );
}

export default SignupImage;

