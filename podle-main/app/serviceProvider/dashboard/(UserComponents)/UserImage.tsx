'use client'
import { client } from "@/app/utils/client";
import { inter } from "@/app/utils/inter";
import { urlFor } from "@/app/utils/UrlImage";
import Image from "next/image";
import { useState } from "react";

type Props = {
  user : ServiceProvider
};


function UserImage({user}: Props) {
  const owner = true;
  const [editable, setEditable] = useState(false);
  const [selectedImage, setSelectedImage] = useState(user.logo|| "https://thinksport.com.au/wp-content/uploads/2020/01/avatar-.jpg");

  const handleEditImage = () => {
    setEditable(!editable);
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = async (e) => {
        const uploadedImage = e.target?.result as string;
        setSelectedImage(uploadedImage);

        // Upload the image to Sanity and create an asset
        const imageUrl = await uploadImageToSanity(file);
        console.log("FINAL URL", imageUrl)

        const updateData = {
          logo : {
            _type: 'image',
            asset: {
              _ref: imageUrl,
              _type: 'reference'
            }
          },
          // Add other fields you want to update here
        };
        
        // Perform the update
        client
          .patch(user._id)
          .set(updateData)
          .commit()
          .then(response => console.log('Update successful:', response))
          .catch(error => console.error('Error updating document:', error));


        setSelectedImage(urlFor(updateData.logo).url());
        // Create or update the "business" document with the image reference
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
    return result._id;
  };

  return (
    <div className="flex flex-col md:w-[36%] w-[90%] relative mt-2 items-center mx-auto md:mx-0">
      {/* Image */}
      <div className="md:h-[80%] h-[24rem] w-full relative">
        {editable ? (
          <>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            <button onClick={() => setEditable(false)} className="bg-blue-500 text-white px-3 py-1 rounded mt-2">Save</button>
          </>
        ) : (
          <Image
            src={selectedImage}
            alt="User"
            className="object-contain "
            fill
          />
        )}
      </div>
      {/* Button */}
      {!editable && (
        <button
          className={`bg-[#16A235] mt-[3vh]  border-white hover:bg-opacity-80 rounded-lg border-[0.5px] font-medium  ${inter.className} text-white w-full py-4 `}
          onClick={handleEditImage}
        >
          Edit Profile Image
        </button>
      )}
      {editable && (
        <button
          className={`bg-[#16A235] mt-[3vh] border-white hover:bg-opacity-80 rounded-lg border-[0.5px] font-medium  ${inter.className} text-white w-full py-4 `}
          onClick={handleEditImage}
        >
          Save Profile
        </button>
      )}
      {/* {!owner &&  (
        <button
          className={`bg-[#16A235] mt-[3vh] border-white hover:bg-opacity-80 rounded-lg border-[0.5px] font-medium  ${inter.className} text-white w-full py-4 `}
          onClick={handleEditImage}
        >
          Send Message
        </button>
      )} */}
    </div>
  );
}

export default UserImage;
