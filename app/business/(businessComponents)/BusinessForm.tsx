import { useStateContext } from "@/app/context/stateContext";
import { inter } from "@/app/utils/inter";
import { useRouter } from "next/navigation";
import Router from "next/router";
import { useState } from "react"; // Don't forget to import useState

type Props = {
  sanityImage: string;
};

function BusinessForm({ sanityImage }: Props) {
  console.log(sanityImage);
  // State and setters
  const [businessName, setBusinessName] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [aptSuiteUnit, setAptSuiteUnit] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { addBusiness } = useStateContext();
  const [loading, setLoading] = useState(false)
  const router = useRouter();
  const handleSubmitForm = () => {
    const requiredFields = [
      businessName,
      streetAddress,
      city,
      state,
      zipCode,
      phoneNumber,
      sanityImage,
    ];
    const areFieldsPresent = requiredFields.every(
      (field) => field && field.trim() !== ""
    );

    if (areFieldsPresent) {
      setLoading(true)
      setError("")
      const BusinessInformation: BusinessInfo = {
        name: businessName,
        streetAddress: streetAddress,
        city: city,
        state: state,
        zipCode: zipCode,
        phoneNumber: phoneNumber,
        logo: {
          _type: "image",
          asset: {
            _ref: sanityImage,
          },
        },
        searchResult: "Manual",
      };

      addBusiness(BusinessInformation);
      router.push("/selectServices");
      setLoading(false)
    } else {
      setError("Feilds are missing");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-2">
      {/* Business Name */}
      <div className="bg-white h-[6vh] lg:w-[70%] md:w-[80%] w-[90%] border-black border-[0.5px] border-opacity-50 flex items-center mb-5">
        <input
          className={`${inter.className} font-normal px-3 text-black focus:outline-none`}
          placeholder="Business name *"
          required
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
        />
      </div>

      {/* Street Address */}
      <div className="bg-white h-[6vh] lg:w-[70%] md:w-[80%] w-[90%] border-black border-b-0 border-[0.5px] border-opacity-50 flex items-center ">
        <input
          className={`${inter.className} font-normal px-3 text-black focus:outline-none`}
          placeholder="Street Address *"
          value={streetAddress}
          required
          onChange={(e) => setStreetAddress(e.target.value)}
        />
      </div>

      {/* Apartment/Suite/Unit */}
      <div className="bg-white h-[6vh] lg:w-[70%] md:w-[80%] w-[90%] border-black border-[0.5px] border-opacity-50 flex items-center mb-5">
        <input
          className={`${inter.className} font-normal px-3 text-black w-full focus:outline-none`}
          placeholder="Apt, Suite, Unit, Building (optional) "
          value={aptSuiteUnit}
          onChange={(e) => setAptSuiteUnit(e.target.value)}
        />
      </div>

      {/* City */}
      <div className="bg-white h-[6vh] lg:w-[70%] md:w-[80%] w-[90%] border-black border-[0.5px] border-opacity-50 flex items-center mb-5">
        <input
          className={`${inter.className} font-normal px-3 text-black focus:outline-none`}
          placeholder="City *"
          value={city}
          required
          onChange={(e) => setCity(e.target.value)}
        />
      </div>

      {/* State */}
      <div className=" mb-5 flex flex-row h-[6vh] justify-between lg:w-[70%] md:w-[80%] w-[90%] bg-transparent">
        <div className="bg-white h-[6vh] w-[45%] border-black border-[0.5px] border-opacity-50 flex items-center justify-between">
          <input
            className={`${inter.className}  overflow-hidden whitespace-nowrap font-normal  text-black bg-transparent px-3 focus:outline-none`}
            placeholder="State *"
            value={state}
            required
            onChange={(e) => setState(e.target.value)}
          />
        </div>
        {/* Zip Code */}
        <div className="bg-white h-[6vh] w-[45%] border-black border-[0.5px] border-opacity-50 flex items-center justify-between">
          <input
            className={`${inter.className} font-normal overflow-hidden whitespace-nowrap  text-black w-max bg-transparent px-3 focus:outline-none`}
            placeholder="Zip Code *"
            value={zipCode}
            required
            onChange={(e) => setZipCode(e.target.value)}
          />
        </div>
      </div>

      {/* Phone Number */}
      <div className="bg-white h-[6vh] lg:w-[70%] md:w-[80%] w-[90%] border-black border-[0.5px] border-opacity-50 flex items-center mb-5">
        <input
          className={`${inter.className} font-normal px-3 text-black border-transparent focus:outline-none`}
          placeholder="Phone Number *"
          value={phoneNumber}
          required
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>

      {/* Password */}

      {/* Next Button */}
      {error && <p className="text-red-600">Some feilds are missing</p>}
      <button
        className={`bg-[#16A235] border-white  bg-opacity-100 border-[0.5px] font-medium  ${inter.className} text-white w-[70%] h-[6vh] py-2 flex items-center justify-center bg-opacity-80 `}
        onClick={handleSubmitForm}
      >
        {loading ? "Loading" : "NEXT"}
      </button>
    </div>
  );
}

export default BusinessForm;
