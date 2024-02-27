"use client";
import { useStateContext } from "@/app/context/stateContext";
import { client } from "@/app/utils/client";
import { inter } from "@/app/utils/inter";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ServiceSelectButton from "./ServiceSelectButton";
const dummy_dataset = [
  "Editing",
  "Podcast Players",
  "Podcast Discovery Apps",
  "Writing",
  "Transcription Services",
  "Podcast Promotion Tools",
  "Sound Design",
  "AI Solutions for Writing",
  "Newsletters",
  "Full Podcast Production",
  "Podcast Editing Tools",
  "Podcast Promotion Services",
  "Talent Coaching",
  "Podcast Discovery Tools",
  "Legal Services",
  "Video Production",
  "Podcast Video Tools",
  "Independent Sales",
  "Guest Bookings",
  "RSS Feed Providers",
  "Brand Safety",
  "Consultants",
  "Third Party Sales",
];
type Props = {
    user : ServiceProvider
};
function SelectServicesContent({user}: Props) {
  console.log(user, "From ss content")
  const router = useRouter();

  const {business} = useStateContext()
  const [loading,setLoading] = useState(false)

  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [description,setDescription] = useState("");
  const [DescScreen, setScreen] = useState(true);

  const handleSubmit = async () => {
    setLoading(true)
    try {

      // Create a new document of type "claimedBusiness" in Sanity
      const updatedInfo = {
        ...business,
        description, // Add the description
        services : selectedServices, // Add the selected services
      };

      console.log(updatedInfo)

      const result = await client
      .patch(user._id)
      .set(updatedInfo)
      .commit()
      .then(response => console.log('Update successful:', response))
      .then(response => router.push('/serviceProvider/dashboard'))
      .then(reponse => setLoading(false))
      .catch(error => console.error('Error updating document:', error));


      // Handle the result as needed

      // You can navigate to a different screen or perform additional actions here
    } catch (error) {
      console.error('Error claiming business:', error);
      // Handle any errors, show an error message, etc.
    }
  };

  // Function to toggle the selection of a service

  const toggleServiceSelection = (service: string) => {
    if (selectedServices.includes(service)) {
      // If the service is already selected, deselect it
      setSelectedServices((prevSelectedServices) =>
        prevSelectedServices.filter((s) => s !== service)
      );
    } else {
      // If the service is not selected, select it
      setSelectedServices((prevSelectedServices) => [
        ...prevSelectedServices,
        service,
      ]);
    }
  };
  return (
    <div className="z-30 opacity-100 relative text-white md:h-max h-max w-full mt-16 xl:mt-4">
      <div className="flex flex-col items-center w-full">
        {DescScreen ? (
          <div className="flex flex-col items-center w-full">
            <h1 className="font-extrabold md:text-6xl text-3xl flex flex-row ">
              Claim Your Business{" "}
              <InformationCircleIcon
                height={20}
                width={20}
                className="text-white mt-3 ml-2"
              />{" "}
            </h1>
            <div className=" text-black pb-4  h-max lg:w-[85%] md:w-[90%] w-[90%] bg-[#E8DFCC] rounded-xl mt-[5vh] flex flex-col items-center pt-10 md:pt-0">
              <h1 className="mt-2 md:mt-4 lg:mt-8 font-extrabold md:text-3xl text-xl w-[90%] mx-auto text-center">
                Write a brief description about your business
              </h1>
              <h1 className="lg:text-lg text-sm mt-2 md:mt-4 lg:mt-8 w-[90%] mx-auto text-center">
                This will be beneficial for creators searching for a business.
                You can edit this later on.
              </h1>
              <div className="bg-white lg:rounded-xl h-[55vh] lg:w-[80%] md:w-[85%] w-[90%] border-black border-[0.5px] border-opacity-50 flex items-center justify-center  mb-5 mx-auto">
                <input
                  className={`${inter.className} font-normal px-3 text-black focus:outline-none w-[90%] h-[90%]`}
                  placeholder="Business description *"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
          </div>
        ) : (
          <>
            <h1 className="ml-[5%] md:w-full md:ml-0 md:px-0 lg:mt-[-4vh] font-extrabold md:text-4xl text-2xl mt-[4vh] flex flex-row md:justify-center md:mt-[5vh]  ">
              Select Services Your Company Offers
            </h1>
            <div className="md:h-[70vh] h-max lg:w-[85%] md:w-[90%] w-[95%] bg-[#E8DFCC] rounded-xl mt-[5vh] grid md:grid-cols-3 grid-cols-1 lg:pl-20 pl-4 py-5 ">
              {dummy_dataset.map((data) => {
                return  <ServiceSelectButton
                key={data}
                text={data}
                toggleServiceSelection={toggleServiceSelection}
              />;
              })}
            </div>
          </>
        )}
      </div>
      <div className="flex flex-row justify-between md:w-[85%] w-[95%] items-center md:ml-[7%] mt-[2vh] mx-auto md:mx-0 pb-4">
        <button
          className={`font-medium text-sm ${inter.className}  text-white underline  `}
          onClick={() => DescScreen ? router.back() : setScreen(true)}
        >
          Back
        </button>
        <button
          className={`bg-[#16A235] border-white  bg-opacity-80 border-[0.5px] font-medium  ${inter.className} text-white px-20 py-2  `}
          onClick={() => DescScreen ? setScreen(false) : handleSubmit()}
        >
       {loading ? "Loading" : "NEXT"}
        </button>
      </div>
    </div>
  );
}

export default SelectServicesContent;
