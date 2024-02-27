"use client";
import { client } from "@/app/utils/client";
import Image from "next/image";
import React, { useRef, useState } from "react";

type Props = {
  imageUrls: string[];
  setImageUrls: (imgs: string[]) => void;
  handleSubmit: () => void;
};

function Samples({ imageUrls, setImageUrls, handleSubmit }: Props) {
  const fileInputRef1 = useRef<HTMLInputElement>(null);
  console.log(imageUrls);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;

    if (files) {
      const selectedFiles = Array.from(files); // Limit selection to three files
      setSelectedImages(selectedFiles);

      const uploadedImageUrls = await Promise.all(
        selectedFiles.map(async (file) => {
          // Simulate uploading the image and retrieve its URL
          const imageUrl = await uploadImageToSanity(file);

          return imageUrl;
        })
      );

      setImageUrls(uploadedImageUrls);
    }
  };

  const handleImageDelete = (index: number) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);

    const updatedImageUrls = [...imageUrls];
    updatedImageUrls.splice(index, 1);
    setImageUrls(updatedImageUrls);
  };

  const uploadImageToSanity = async (file: File) => {
    // Initialize the Sanity client

    // Create a Sanity asset document with the uploaded image
    const result = await client.assets.upload("image", file);
    console.log("URL", result.url);

    // Retrieve the URL of the uploaded image
    return result.url;
  };

  const openFileInput = (ref: React.RefObject<HTMLInputElement>) => {
    if (ref.current) {
      ref.current.click();
    }
  };

  return (
    <div className="flex flex-col gap-y-2 md:gap-y-4 lg:gap-y-8 px-8 mt-2 md:mt-4 lg:mt-8">
      <h1 className="text-lg md:text-xl lg:text-2xl font-bold">
        Upload Sample Work
      </h1>
      <h1 className="text-sm md:text-base lg:text-lg">
        Showcase your work to your clients.
      </h1>

      {/* Single input for multiple images */}
      <div className="text-sm md:text-base mt-1 md:mt-2 lg:mt-4 w-full ">
        <button
          onClick={() => openFileInput(fileInputRef1)}
          className="h-full px-2 mb-4 md:px-4 py-2 border-2 border-black rounded-lg  font-bold text-black md:py-4 bg-white flex justify-center items-center text-sm md:text-base "
        >
          <input
            ref={fileInputRef1}
            className="hidden"
            type="file"
            accept="image/png, image/jpeg" // Specify accepted image types
            onChange={handleImageUpload}
            multiple // Allow multiple file selection
          />
          Upload Work
        </button>
        {imageUrls.map((imageUrl, index) => (
          <div key={index} className="relative inline-block mr-2">
            <Image
              src={imageUrl}
              alt={`Uploaded image ${index + 1}`}
              width={100}
              height={100}
            />
            <button
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center -mr-2 -mt-2"
              onClick={() => handleImageDelete(index)}
            >
              X
            </button>
          </div>
        ))}
      </div>

      <button
        className={`bg-[#16A235] xl:w-[50%] mt-2 md:mt-4 lg:mt-8 border-white hover:bg-opacity-80 rounded-lg border-[0.5px] font-medium text-white w-full py-4 `}
        onClick={handleSubmit}
      >
        Save
      </button>
    </div>
  );
}

export default Samples;
