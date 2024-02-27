import { client } from "@/app/utils/client";
import { inter } from "@/app/utils/inter";
import Image from "next/image";
import React, { useState } from "react";

type Props = {
  setSanityImage: (sanityImage: string) => void;
};

function BusinessImage({ setSanityImage }: Props) {
  const [image, setImage] = useState<string | null>(null);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = async (e) => {
        const uploadedImage = e.target?.result as string;
        setImage(uploadedImage);

        // Upload the image to Sanity and create an asset
        const imageUrl = await uploadImageToSanity(file);
        console.log("FINAL URL", imageUrl)
        // Create or update the "business" document with the image reference
        setSanityImage(imageUrl);
      };

      reader.readAsDataURL(file);
    }
  };

  const uploadImageToSanity = async (file: File) => {
    // Initialize the Sanity client

    // Create a Sanity asset document with the uploaded image
    const result = await client.assets.upload("image", file);
    console.log("URL",result)

    // Retrieve the URL of the uploaded image
    return result.url;
  };

  return (
    <div className="col-span-1 flex flex-col items-center justify-center h-full space-y-4">
      <div className=" relative lg:w-[70%] md:w-[80%] w-[90%] md:h-[80%] h-[20rem] bg-white relative flex justify-center items-center border-black border-[1px]">
        {/* Image Icon */}
        {image ? (
          // If an image is uploaded, display the uploaded image
          <Image fill className="object-contain" src={image} alt="Uploaded Company Logo" />
        ) : (
          // If no image is uploaded, display the placeholder image icon
          <svg
            width="100"
            height="100"
            viewBox="0 0 151 149"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M23.8421 0H127.158C133.481 0 139.546 2.47866 144.017 6.8907C148.488 11.3027 151 17.2867 151 23.5263V125.474C151 131.713 148.488 137.697 144.017 142.109C139.546 146.521 133.481 149 127.158 149H23.8421C17.5188 149 11.4545 146.521 6.98319 142.109C2.51193 137.697 0 131.713 0 125.474V23.5263C0 17.2867 2.51193 11.3027 6.98319 6.8907C11.4545 2.47866 17.5188 0 23.8421 0ZM23.8421 7.84211C19.6266 7.84211 15.5837 9.49454 12.6028 12.4359C9.62199 15.3773 7.94737 19.3666 7.94737 23.5263V114.416L42.0416 80.6953L61.91 100.301L101.647 61.09L143.053 101.947V23.5263C143.053 19.3666 141.378 15.3773 138.397 12.4359C135.416 9.49454 131.373 7.84211 127.158 7.84211H23.8421ZM61.91 111.436L42.0416 91.8311L7.94737 125.474C7.94737 129.633 9.62199 133.623 12.6028 136.564C15.5837 139.505 19.6266 141.158 23.8421 141.158H127.158C131.373 141.158 135.416 139.505 138.397 136.564C141.378 133.623 143.053 129.633 143.053 125.474V113.005L101.647 72.2258L61.91 111.436ZM43.7105 23.5263C48.98 23.5263 54.0336 25.5919 57.7596 29.2686C61.4857 32.9453 63.5789 37.9319 63.5789 43.1316C63.5789 48.3312 61.4857 53.3179 57.7596 56.9946C54.0336 60.6713 48.98 62.7368 43.7105 62.7368C38.4411 62.7368 33.3875 60.6713 29.6614 56.9946C25.9354 53.3179 23.8421 48.3312 23.8421 43.1316C23.8421 37.9319 25.9354 32.9453 29.6614 29.2686C33.3875 25.5919 38.4411 23.5263 43.7105 23.5263ZM43.7105 31.3684C40.5489 31.3684 37.5167 32.6077 35.2811 34.8138C33.0454 37.0198 31.7895 40.0118 31.7895 43.1316C31.7895 46.2514 33.0454 49.2434 35.2811 51.4494C37.5167 53.6554 40.5489 54.8947 43.7105 54.8947C46.8722 54.8947 49.9044 53.6554 52.14 51.4494C54.3756 49.2434 55.6316 46.2514 55.6316 43.1316C55.6316 40.0118 54.3756 37.0198 52.14 34.8138C49.9044 32.6077 46.8722 31.3684 43.7105 31.3684Z"
              fill="#111111"
            />
          </svg>
        )}
      </div>
      {/* Text for add Image */}
      {/* Plus Icon and input for image upload */}
      <label className="flex flex-row items-center space-x-2 pr-[20%]">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: "none" }}
        />
        {/* Plus Icon */}
        <p className="flex flex-row items-center space-x-2 pr-[20%]">
          <svg
            width="20"
            height="20"
            viewBox="0 0 39 39"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.5 35.75C28.4749 35.75 35.75 28.4749 35.75 19.5C35.75 10.5251 28.4749 3.25 19.5 3.25C10.5251 3.25 3.25 10.5251 3.25 19.5C3.25 28.4749 10.5251 35.75 19.5 35.75Z"
              stroke="#16A235"
              stroke-width="2.66667"
              stroke-linejoin="round"
            />
            <path
              d="M19.5 13V26M13 19.5H26"
              stroke="#16A235"
              stroke-width="2.66667"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          {/* Add image text */}
          <p className={`${inter.className} font-normal text-black`}>
            Insert Company Logo or Image
          </p>
        </p>
      </label>
    </div>
  );
}

export default BusinessImage;
