import { inter } from "@/app/utils/inter";
import { useState } from "react"; // Don't forget to import useState

type Props = {};

function BusinessForm({}: Props) {
  // State and setters
  const [businessName, setBusinessName] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [aptSuiteUnit, setAptSuiteUnit] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  return (
    (
        <div className="flex flex-col justify-center items-center">
          {/* Business Name */}
          <div className="bg-white h-[6vh] w-[70%] border-black border-[0.5px] border-opacity-50 flex items-center mb-5">
            <input
              className={`${inter.className} font-normal px-3 text-black focus:outline-none`}
              placeholder="Business name *"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
            />
          </div>
      
          {/* Street Address */}
          <div className="bg-white h-[6vh] w-[70%] border-black border-b-0 border-[0.5px] border-opacity-50 flex items-center ">
            <input
              className={`${inter.className} font-normal px-3 text-black focus:outline-none`}
              placeholder="Street Address *"
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
            />
          </div>
      
          {/* Apartment/Suite/Unit */}
          <div className="bg-white h-[6vh] w-[70%] border-black border-[0.5px] border-opacity-50 flex items-center mb-5">
            <input
              className={`${inter.className} font-normal px-3 text-black w-full focus:outline-none`}
              placeholder="Apt, Suite, Unit, Building (optional) "
              value={aptSuiteUnit}
              onChange={(e) => setAptSuiteUnit(e.target.value)}
            />
          </div>
      
          {/* City */}
          <div className="bg-white h-[6vh] w-[70%] border-black border-[0.5px] border-opacity-50 flex items-center mb-5">
            <input
              className={`${inter.className} font-normal px-3 text-black focus:outline-none`}
              placeholder="City *"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
      
          {/* State */}
          <div className=" mb-5 flex flex-row h-[6vh] justify-between w-[70%] bg-transparent">
            <div className="bg-white h-[6vh] w-[45%] border-black border-[0.5px] border-opacity-50 flex items-center justify-between">
              <input
                className={`${inter.className}  overflow-hidden whitespace-nowrap font-normal  text-black bg-transparent px-3 focus:outline-none`}
                placeholder="State *"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>
            {/* Zip Code */}
            <div className="bg-white h-[6vh] w-[45%] border-black border-[0.5px] border-opacity-50 flex items-center justify-between">
              <input
                className={`${inter.className} font-normal overflow-hidden whitespace-nowrap  text-black w-max bg-transparent px-3 focus:outline-none`}
                placeholder="Zip Code *"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
              />
            </div>
          </div>
      
          {/* Phone Number */}
          <div className="bg-white h-[6vh] w-[70%] border-black border-[0.5px] border-opacity-50 flex items-center mb-5">
            <input
              className={`${inter.className} font-normal px-3 text-black border-transparent focus:outline-none`}
              placeholder="Phone Number *"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
      
          {/* Password */}
          <div
            className={`bg-white ${inter.className} h-[6vh] w-[70%] border-black border-[0.5px] border-opacity-50 flex items-center mb-5`}
          >
            <input
              type="password"
              placeholder="Password *"
              className={`focus:outline-none font-normal px-3 text-black border-transparent  overflow-hidden whitespace-nowrap`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
      
          {/* Next Button */}
          <button
            className={`bg-[#16A235] border-white  bg-opacity-100 border-[0.5px] font-medium  ${inter.className} text-white w-[70%] h-[6vh] py-2 flex items-center justify-center bg-opacity-80 `}
            // onClick={handleBackClick}
          >
            NEXT
          </button>
        </div>
    )
  );
}

export default BusinessForm;
