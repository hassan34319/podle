import { client } from "@/app/utils/client";
import Image from "next/image";
import React, { useRef } from "react";

type Props = {
  title: string;
  setTitle: (title: string) => void;
  location: string;
  setLocation: (title: string) => void;
  image: string;
  setImage: (title: string) => void;
  category: string;
  setCategory: (category: string) => void;
  serviceType: string;
  setServiceType: (serviceType: string) => void;
  description: string;
  setDescription: (description: string) => void;
  setSelected: (select: string) => void;
  categories: Category[];
};

function Overview({
  image,
  setImage,
  location,
  setLocation,
  title,
  setTitle,
  category,
  setCategory,
  serviceType,
  setServiceType,
  description,
  setDescription,
  setSelected,
  categories
}: Props) {
  const fileInputRef1 = useRef<HTMLInputElement>(null);
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    inputIndex: number
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = async (e) => {
        const uploadedImage = e.target?.result as string;

        // Upload the image to Sanity and create an asset
        const imageUrl = await uploadImageToSanity(file);

        // Add the uploaded image URL to the array state

        setImage(imageUrl);
      };

      reader.readAsDataURL(file);
    }
  };

  const uploadImageToSanity = async (file: File) => {
    // Initialize the Sanity client

    // Create a Sanity asset document with the uploaded image
    const result = await client.assets.upload("image", file);
    console.log("URL", result);

    // Retrieve the URL of the uploaded image
    return result.url;
  };

  const openFileInput = (ref: React.RefObject<HTMLInputElement>) => {
    if (ref.current) {
      ref.current.click();
    }
  };
  return (
    <div className="flex flex-col text-black gap-y-2 md:gap-y-4 lg:gap-y-8 px-8 mt-2 md:mt-4 lg:mt-8">
      <div className="text-black">
        <h1 className="md:text-lg lg:text-xl">Title</h1>
        <input
          className="text-sm md:text-base mt-1 px-3 md:mt-2 lg:mt-4 w-full xl:w-[50%] rounded-md overflow-hidden h-8 md:h-10 lg:h-12 bg-transparent border-2 xl:rounded-xl border-black border-opacity-[30%]"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="text-black">
        <h1 className="md:text-lg lg:text-xl">Area of Operation</h1>
        <input
          className="text-sm md:text-base mt-1 px-3 md:mt-2 lg:mt-4 w-full xl:w-[50%] rounded-md overflow-hidden h-8 md:h-10 lg:h-12 bg-transparent border-2 xl:rounded-xl border-black border-opacity-[30%]"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div className="text-black">
        <h1 className="md:text-lg lg:text-xl">Category</h1>
        <select
          className="text-sm md:text-base mt-1 px-3 md:mt-2 lg:mt-4 w-full xl:w-[50%] rounded-md overflow-hidden h-8 md:h-10 lg:h-12 bg-transparent border-2 xl:rounded-xl border-black border-opacity-[30%]"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select a category</option>
          {categories.map((categoryName, index) => (
            <option key={index} value={categoryName.title}>
              {categoryName.title}
            </option>
          ))}
        </select>
      </div>
      <div className="text-black">
        <h1 className="md:text-lg lg:text-xl">Service type</h1>
        <input
          className="text-sm md:text-base mt-1 px-3 md:mt-2 lg:mt-4 w-full xl:w-[50%] rounded-md overflow-hidden h-8 md:h-10 lg:h-12 bg-transparent border-2 xl:rounded-xl border-black border-opacity-[30%]"
          value={serviceType}
          onChange={(e) => setServiceType(e.target.value)}
        />
      </div>
      <div className="text-black">
        <h1 className="md:text-lg lg:text-xl">Description (max 250 words)</h1>
        <textarea
          className="text-sm md:text-base mt-1 px-3 md:mt-2 lg:mt-4 w-full xl:w-[50%] rounded-md overflow-hidden h-32 md:h-40 lg:h-48 bg-transparent border-2 xl:rounded-xl border-black border-opacity-[30%]"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <h1 className="md:text-lg  lg:text-xl">Gig Image</h1>
      <div className="text-sm md:text-base mt-1  md:mt-2 lg:mt-4 w-full xl:w-[50%] rounded-md overflow-hidden h-10 md:h-10 lg:h-12 bg-transparent border-2 xl:rounded-xl border-black border-opacity-[30%] flex justify-end">
        {image && (
          <Image
            src={image}
            alt={image}
            className="object-contain"
            width={100}
            height={100}
          />
        )}
        <button
          onClick={() => openFileInput(fileInputRef1)}
          className="h-full px-2 md:px-4 py-2 border-2 border-black rounded-tr-md rounded-br-md xl:rounded-tr-xl xl:rounded-br-xl  font-bold text-black md:py-4 bg-white flex justify-center items-center text-sm md:text-base"
        >
          <input
            ref={fileInputRef1}
            type="file"
            className="hidden"
            onChange={(e) => handleImageUpload(e, 1)}
          />
          Upload Work
        </button>
      </div>
      <button
        className={`bg-[#16A235] xl:w-[50%] mt-2 md:mt-4 lg:mt-8 border-white hover:bg-opacity-80 rounded-lg border-[0.5px] font-medium text-white w-full py-4 `}
        onClick={() => setSelected("pricing")}
      >
        Save
      </button>
    </div>
  );
}

export default Overview;
