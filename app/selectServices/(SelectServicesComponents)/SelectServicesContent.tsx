"use client"
import { inter } from "@/app/utils/inter";
import { useRouter } from "next/navigation";
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
type Props = {};
function SelectServicesContent({}: Props) {
  const router = useRouter()
  return (
    <div className="z-30 opacity-100 relative text-white h-[85vh]">
      <div className="flex flex-col items-center">
        <h1 className=" mt-[-4vh] font-extrabold text-4xl flex flex-row ">
          Select Services Your Company Offers
        </h1>
        {/* Services */}
        <div className="h-[70vh] w-[85%] bg-[#E8DFCC] rounded-xl mt-[5vh] grid md:grid-cols-3 grid-cols-2 pl-20 py-5 ">
          {dummy_dataset.map((data) => {
            return <ServiceSelectButton text={data} />;
          })}
        </div>
      </div>
      <div className="flex flex-row justify-between w-[85%] items-center ml-[7%] mt-[2vh]">
        <button
          className={`font-medium text-sm ${inter.className}  text-white underline  `}
          // onClick={handleBackClick}
        >
          Back
        </button>
        <button
          className={`bg-[#16A235] border-white  bg-opacity-80 border-[0.5px] font-medium  ${inter.className} text-white px-20 py-2  `}
          onClick={() => router.push("/checkout")}
        >
          CONFIRM
        </button>
      </div>
    </div>
  );
}

export default SelectServicesContent;
