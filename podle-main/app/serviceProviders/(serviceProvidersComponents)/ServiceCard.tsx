import { inter } from "@/app/utils/inter";
import React from "react";
import { renderRatingStars } from "@/app/utils/stars";
import Link from "next/link";
type Props = {
  rating: number | undefined;
  _id: string;
  backgroundImage: string | undefined;
  title: string | undefined;
  Category: string | undefined;
  claimed: boolean | undefined;
  services: string[] | undefined;
};

function ServiceCard({
  rating,
  backgroundImage,
  title,
  Category,
  _id,
  claimed,
  services,
}: Props) {
  console.log(backgroundImage);
  const backgroundImageUrl = backgroundImage;
  const claimedString = claimed ? "" : "unclaimed/";
  return (
    <Link
      href={`/serviceProviders/${claimedString}${_id}`}
      className="bg-cover col-span-1 lg:h-[35vh] md:h-[30vh] h-[35vh] mt-[2vh] md:mt-[10vh]"
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <div
        className={`bg-black relative bg-opacity-[77%] md:h-[12vh] lg:h-[20vh] h-[12vh] w-full bg-bottom md:mt-[26vh] mt-[23vh] flex flex-col ${inter.className} px-4 py-2 justify-between `}
      >
        <div className="flex flex-row gap-x-2">
          <p className="tex-base xl:text-xl font-medium text-[#16A235] mb-1 max-w-[70%]">
            {title}
          </p>
          <p
            className={`font-medium text-xs w-[30%] ${
              Category == "Hot" && "text-red-600"
            } ${Category == "Top Rated" && "text-blue-500"}  ${
              Category == "Recommended" && "text-yellow-500"
            }`}
          >
            {Category}
          </p>
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row flex-wrap">
            {services &&
              services.slice(0, 1).map((service, index) => (
                <button
                  key={index}
                  className="bg-[#16A235] text-white px-3 py-1 rounded-md mr-2 mb-2"
                >
                  {service}
                </button>
              ))}
          </div>
          {!claimed && (
            <Link
              href={`/business?id=${_id}`}
              className="bg-[#16A235] text-white px-2 py-1 rounded-md "
            >
              Claim Now
            </Link>
          )}
          {claimed && (
            <button className="bg-black text-white px-2 py-1 rounded-md ">
              Contact Us
            </button>
          )}
        </div>
      </div>
    </Link>
  );
}

export default ServiceCard;
