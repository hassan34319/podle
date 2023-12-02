import { client } from "@/app/utils/client";
import Image from "next/image";
import React, { useRef } from "react";

type Props = {
  imageUrls: string[];
  setImageUrls: (imgs: string[]) => void;
  handleSubmit : ()=> void
};

function Samples({ imageUrls, setImageUrls, handleSubmit }: Props) {
  const fileInputRef1 = useRef<HTMLInputElement>(null);
  const fileInputRef2 = useRef<HTMLInputElement>(null);
  const fileInputRef3 = useRef<HTMLInputElement>(null);
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

        if (imageUrls.length > 0) {
          const updatedImageUrls = [...imageUrls];
          if (updatedImageUrls.length < 3) {
            updatedImageUrls.push(imageUrl);
          } else {
            updatedImageUrls[inputIndex - 1] = imageUrl;
          }

          setImageUrls(updatedImageUrls.slice(0, 3));
        } else {
          setImageUrls([imageUrl]);
        }
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
    <div className="flex flex-col gap-y-2 md:gap-y-4 lg:gap-y-8 px-8 mt-2 md:mt-4 lg:mt-8">
      <h1 className="text-lg md:text-xl lg:text-2xl font-bold">
        Upload Sample Work
      </h1>
      <h1 className="text-sm md:text-base lg:text-lg">
        Showcase your work to your clients.
      </h1>

      <div className="text-sm md:text-base mt-1  md:mt-2 lg:mt-4 w-full xl:w-[50%] rounded-md overflow-hidden h-10 md:h-10 lg:h-12 bg-transparent border-2 xl:rounded-xl border-black border-opacity-[30%] flex justify-end">
        {imageUrls[0] && (
          <Image
            src={imageUrls[0]}
            alt={imageUrls[0]}
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
      <div className="text-sm md:text-base mt-1  md:mt-2 lg:mt-4 w-full xl:w-[50%] rounded-md overflow-hidden h-10 md:h-10 lg:h-12 bg-transparent border-2 xl:rounded-xl border-black border-opacity-[30%] flex justify-end">
        {imageUrls[1] && (
          <Image
            src={imageUrls[1]}
            alt={imageUrls[1]}
            className="object-contain"
            width={100}
            height={100}
          />
        )}
        <button
          onClick={() => openFileInput(fileInputRef2)}
          className="h-full px-2 md:px-4 py-2 border-2 border-black rounded-tr-md rounded-br-md xl:rounded-tr-xl xl:rounded-br-xl  font-bold text-black md:py-4 bg-white flex justify-center items-center text-sm md:text-base"
        >
          <input
            ref={fileInputRef2}
            type="file"
            className="hidden"
            onChange={(e) => handleImageUpload(e, 2)}
          />
          Upload Work
        </button>
      </div>
      <div className="text-sm md:text-base mt-1  md:mt-2 lg:mt-4 w-full xl:w-[50%] rounded-md overflow-hidden h-10 md:h-10 lg:h-12 bg-transparent border-2 xl:rounded-xl border-black border-opacity-[30%] flex justify-end">
        {imageUrls[2] && (
          <Image
            src={imageUrls[2]}
            alt={imageUrls[2]}
            className="object-contain"
            width={100}
            height={100}
          />
        )}
        <button
          onClick={() => openFileInput(fileInputRef3)}
          className="h-full px-2 md:px-4 py-2 border-2 border-black rounded-tr-md rounded-br-md xl:rounded-tr-xl xl:rounded-br-xl  font-bold text-black md:py-4 bg-white flex justify-center items-center text-sm md:text-base"
        >
          <input
            ref={fileInputRef3}
            type="file"
            className="hidden"
            onChange={(e) => handleImageUpload(e, 3)}
          />
          Upload Work
        </button>
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
