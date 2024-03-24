"use client";
import { client } from "@/app/utils/client";
import { inter } from "@/app/utils/inter";
import { renderRatingStars } from "@/app/utils/stars";
import { useState } from "react";
import { MdArrowUpward, MdFireplace, MdOutlineVerifiedUser } from "react-icons/md";

type Props = {
  user: ServiceProvider;
  rating: number;
  reviews: Review[];
};

function UserDescription({ user, rating, reviews }: Props) {
  const owner = true;
  const [editable, setEditable] = useState(false); // State to track if the description is editable
  const [description, setDescription] = useState(user.description); // Replace with your default description

  const handleEditDescription = () => {
    setEditable(true);
  };

  const handleSaveDescription = () => {
    setEditable(false);
    const updateData = {
      description: description,
      // Add other fields you want to update here
    };

    // Perform the update
    client
      .patch(user._id)
      .set(updateData)
      .commit()
      .then((response) => console.log("Update successful:", response))
      .catch((error) => console.error("Error updating document:", error));

    // Implement logic to save the description, e.g., send it to the server
  };

  return (
    <div
      className={`px-[8%] flex flex-col h-full justify-between ${inter.className} text-lg md:w-[64%] w-full md:pb-[8vh] `}
    >
      {/* Name and other details */}
      <div className="flex flex-col w-full mt-[6vh]">
        {/* Name and Rating */}
        <div className="flex md:flex-row flex-col gap-y-2 md:gap-y-0 justify-between w-full">
          {/* Name */}
          <div className="w-full flex flex-row gap-x-4 md:block md:gap-x-0">
            <p className="text-[#16A235] font-medium mb-[2vh]">
              Business Name :
            </p>
            <p className="text-black font-semibold">{user.name}</p>
          </div>
          {/* Rating */}
          <div className="w-full flex flex-row gap-x-4 md:block md:gap-x-0">
            <p className="text-[#16A235] font-medium mb-[2vh] ">Rating : </p>
            <div className="flex flex-row space-x-2">
              {renderRatingStars(rating).map((star, index) => (
                <span key={index}>{star}</span>
              ))}
              <p className="text-black text-sm md:text-base font-semibold">
                {rating && rating}
              </p>
              <p className="text-black text-sm md:text-base font-semibold">
                ({reviews.length > 0 && reviews.length})
              </p>
            </div>
          </div>
        </div>
        {/* Services and verified */}
        <div className="flex md:flex-row flex-col gap-y-2 md:gap-y-0 justify-between w-full md:mt-[8vh]">
          {/* Services */}
          <div className="w-full flex flex-row gap-x-4 md:block md:gap-x-0">
            <p className="text-[#16A235] font-medium mb-[2vh]">
              On Podle Since
            </p>
            <p className="text-black font-semibold">
              {" "}
              {new Date(user._createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
{/* Tag */}
          <div className="w-full flex flex-row gap-x-4 md:block md:gap-x-0">
          <p className="text-black font-medium mb-[2vh] flex flex-row ">
      {user.specialTag}
      <span>
        {user.specialTag === "Hot" && <MdFireplace height={20} width={20} className="text-red-500 ml-2" />}
        {user.specialTag === "Top Rated" && <MdArrowUpward height={20} width={20} className="text-blue-500 ml-2" />}
        {user.specialTag == "Recommended" && <MdOutlineVerifiedUser height={20} width={20} className="text-black ml-2" />}
      </span>
    </p>
          </div>
        </div>
      </div>
      {/* Description */}
      <div className="md:mb-[4vh] mb-[2vh] mt-4">
        <p className="text-[#16A235] font-medium mb-[2vh]">Description</p>
        {editable ? (
          <>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-300 p-2 mb-2 w-full"
            />
            <button
              onClick={handleSaveDescription}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              Save
            </button>
          </>
        ) : (
          <>
            <p className="text-black font-normal">{description}</p>
            <button onClick={handleEditDescription} className="text-blue-500">
              Edit
            </button>
          </>
        )}
      </div>
      <p className="text-[#16A235] font-medium mb-[2vh]">We are Know For These Services : </p>
      <div className="flex flex-row flex-wrap mb-[6vh]">

        {user.services.map((service, index) => (
          <button
            key={index}
            className="bg-[#16A235] text-white px-3 py-1 rounded-md mr-2 mb-2"
          >
            {service}
          </button>
        ))}
      </div>
      {/* {!owner && (
        <button
          className={`bg-[#16A235] mt-[3vh] md:hidden border-white hover:bg-opacity-80 rounded-lg border-[0.5px] font-medium  ${inter.className} text-white w-full py-4 `}
          // onClick={() => router.push("/selectServices")}
        >
          Send Message
        </button>
      )} */}
    </div>
  );
}

export default UserDescription;
