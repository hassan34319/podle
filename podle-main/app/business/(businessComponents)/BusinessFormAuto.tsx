import { useStateContext } from "@/app/context/stateContext";
import { client } from "@/app/utils/client";
import { inter } from "@/app/utils/inter";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Router from "next/router";
import { useState } from "react"; // Don't forget to import useState

type Props = {};

function BusinessFormAuto({}: Props) {
  const { business }: { business: BusinessInfo } = useStateContext();
  const session = useSession();

  // Fetch the document based on the email field
  // State and setters
  const [streetAddress, setStreetAddress] = useState("");
  const [aptSuiteUnit, setAptSuiteUnit] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { addBusiness } = useStateContext();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmitForm = async () => {
    const searchEmail = session.data?.user?.email;

    const user = await client
      .fetch('*[_type == "claimedBusiness" && email == $email][0]', {
        email: searchEmail,
      })
      .then((document) => {
        if (document) {
          console.log("Document found:", document);
          return document;
        } else {
          console.log("Document not found");
        }
      })
      .catch((error) => {
        console.error("Error fetching document:", error);
      });

    if (!user) {
      return;
    }
    const requiredFields = [streetAddress, city, state, zipCode, phoneNumber];
    const areFieldsPresent = requiredFields.every(
      (field) => field && field.trim() !== ""
    );

    if (areFieldsPresent) {
      setLoading(true);
      setError("");
      const BusinessInformation: BusinessInfo = {
        name: business.name,
        streetAddress: streetAddress,
        city: city,
        state: state,
        zipCode: zipCode,
        phoneNumber: phoneNumber,
        searchResult: "Auto",
        description: business.description || "No desc",
        logo: business.logo!,
        services: business.services || [],
        specialTag: business.specialTags,
      };

      // Execute the query to find the document ID
      const businessId = business._id;

      // If businessId is found, proceed with deletion and update
      if (businessId && businessId.length > 0) {
        // Delete the document with the found ID
        const result = await client
          .delete(businessId)
          .then((response) => {
            console.log("Deletion successful:", response);
            // Proceed with updating the document or performing other actions
            return client.patch(user._id).set(BusinessInformation).commit();
          })
          .then(() => {
            console.log("Update successful");
            router.push("/serviceProvider/dashboard");
          })
          .catch((error) => console.error("Error:", error));
      } else {
        console.log("No document found with the provided business name");
      }
      // const query = `*[_type == 'review' && businessName == $businessName]{_id}`;
      // const params = { businessName: business.name };
      // const reviews = await client.fetch(query, params);

    
      // // Step 2: Add the email as sellerEmail to these reviews
      // const updatePromises = await reviews.map((review: { _id: string }) => {
      //   return client
      //     .patch(review._id)
      //     .set({ sellerEmail: searchEmail }) // Assuming userEmail holds the email to be added
      //     .commit();
      // });


        // router.push("/serviceProvider/dashboard")

    } else {
      setError("Feilds are missing");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-2 min-h-[80vh]">
      {/* Business Name */}
      <p
        className={`lg:mt-[9vh] md:mt-[5vh] mt-[2vh] md:font-bold ${inter.className} text-sm mb-4 md:text-2xl text-white`}
      >
        Your Business Details
      </p>

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

export default BusinessFormAuto;
