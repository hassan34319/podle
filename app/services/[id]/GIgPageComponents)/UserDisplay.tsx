import { renderRatingStars } from "@/app/utils/stars";
import { urlFor } from "@/app/utils/UrlImage";
import Image from "next/image";
import React from "react";

type Props = {
  user: ServiceProvider;
  rating : number;
  reviews : Review[]
};

function UserDisplay({ user,rating,reviews }: Props) {
  return (
    <main className="mt-2 md:mt-4 lg:mt-8 xl:px-8 px-4 pb-4 lg:pb-8 xl:w-[60%] mb-4 md:mb-8 text-black">
      <div className="w-full flex flex-row border-t-black border-l-0 border-r-0 border-b-black border-[1px] border-opacity-[30%] py-4 md:py-8">
        <div className="relative xl:w-[20%] xl:h-[8rem] w-[30%] h-[6rem] md:h-[8rem]">
          <Image
            src={urlFor(user.logo).url()}
            alt="Picture User"
            fill
            className="object-contain"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <h1 className="md:text-lg xl:text-xl font-bold">{user.name}</h1>
          <div className="flex flex-row space-x-2 ">
            {renderRatingStars(rating).map((star, index) => (
              <span key={index}>{star}</span>
            ))}
            <p className="text-black text-sm md:text-base font-semibold">{rating && rating}</p>
            <p className="text-black text-sm md:text-base font-semibold">
              ({reviews && reviews.length > 0 && reviews.length})
            </p>
          </div>
          <button className="md:px-2 md:py-2 px-1 py-1 border-black border-[1px] rounded-md text-center text-sm md:text-base">
                Contact Me
          </button>
        </div>
      </div>
    </main>
  );
}

export default UserDisplay;
