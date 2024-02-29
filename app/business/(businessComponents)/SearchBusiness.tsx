"use client";
import { useState } from "react";
import { inter } from "../../utils/inter";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { numberToWords } from "../../utils/numToWords.js";
import { useRouter } from "next/navigation";
import { useStateContext } from "@/app/context/stateContext";
import { client } from "@/sanity/lib/client";


type Props = {
  claimAuto: boolean;
  setClaimAuto: (value: boolean) => void;
  claimManual: boolean;
  setClaimManual: (value: boolean) => void;
  autoBusiness : BusinessInfo[];
};


function SearchBusiness({
  claimAuto,
  setClaimAuto,
  claimManual,
  setClaimManual,
  autoBusiness
}: Props) {
  const router = useRouter();
  //   The actual input inputted by the users
  const [searchInput, setSearchInput] = useState<string>("");
  //   The results got from user's search
  const [searchResults, setSearchResults] = useState<BusinessInfo[]>([]);
  //   Handles if user is still doing activity or is waiting for results
  const [showNoResultsMessage, setShowNoResultsMessage] =
    useState<boolean>(false);
  // The selected business by user from context
  const { addBusiness, business } = useStateContext();


  // Calculate the search result for each entry

  console.log(autoBusiness), "From Search";

  //  Handles the change in user input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    setShowNoResultsMessage(false); // Hide the "No results found" message when user is typing
  };
  // Handles when user presses search Icon
  const handleSearchSubmit = () => {
    const filteredResults = autoBusiness.filter((address) =>
      address.searchResult?.toLowerCase().includes(searchInput.toLowerCase())
    );

    setSearchResults(filteredResults);
    setShowNoResultsMessage(true); // Show the "No results found" message when the search button is clicked
  };
  //   Handles when user Selects a business
  const handleSelectBusiness = (selectedBusiness : BusinessInfo) => {
    // Adds Business to context
    addBusiness( {
      name: selectedBusiness.name,
      logo: selectedBusiness.logo,
      searchResult : selectedBusiness.searchResult,
      description : selectedBusiness.description,
      services : selectedBusiness.services,
      specialTags : selectedBusiness.specialTag

    }
    );
    // Changes Component to claim component
    setClaimAuto(true);
    console.log("business", business);
  };
  // When business is not found
  const handleAddNewBusiness = () => {
    setClaimManual(true);
    //When back is clicked
  };

  //   When Skip is clicked
  const handleSkipClick = () => {
    setClaimAuto(false);
    setClaimManual(true);
  };

  return (
    <>
      {!claimAuto && !claimManual && (
        <>
          <div className="flex flex-col items-center">
            <h1 className="lg:mt-[9vh] md:mt-[20vh] mt-[20vh]  font-extrabold md:text-6xl text-3xl">
              Service Provider
            </h1>
            <p
              className={`lg:mt-[9vh] md:mt-[5vh] mt-[2vh] md:font-bold ${inter.className} text-sm  xl:pr-[14%] md:text-2xl`}
            >
              Search for business by name
            </p>
            {/* Search Bar */}
            <div
              className={`mt-[2vh] rounded-lg bg-white box-border w-[80%] md:w-[60%] lg:w-[40%] h-[6vh] border-[1px] ${inter.className}border-solid border-black flex items-center justify-between`}
            >
              <input
                type="text"
                placeholder="Search Business"
                className="ml-4 text-black  font-normal w-full bg-transparent focus:outline-none"
                value={searchInput}
                onChange={handleInputChange}
              />
              <MagnifyingGlassIcon
                height={25}
                width={25}
                className="text-gray-900 mr-4 cursor-pointer"
                onClick={handleSearchSubmit}
              />
            </div>

            {/* Display search results */}
            {searchResults.length > 0 && showNoResultsMessage ? (
              <div
                className={`mt-[2vh] rounded-lg bg-white box-border md:w-[40%] w-[80%] h-max border-[1px] ${inter.className}border-solid border-black overflow-y-scroll max-h-[40vh] `}
              >
                <p className="text-black text-opacity-60 font-normal text-sm ml-4 border-b-2 mr-4 py-2 border-gray-300">
                  {numberToWords(searchResults.length)} search result found
                </p>
                <div>
                  {searchResults.map((address) => (
                    <button
                      className="w-full text-start block ml-4 text-black font-normal py-3"
                      onClick={() => handleSelectBusiness(address)}
                      key={address.name}
                    >
                      {address.searchResult}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {/* Show "No results found" message */}
            {searchResults.length === 0 && showNoResultsMessage ? (
              <div className="mt-8 text-white flex flex-row ">
                No results found{" "}
                <button
                  onClick={handleAddNewBusiness}
                  className="ml-2 underline"
                >
                  Add Now
                </button>
              </div>
            ) : null}
          </div>
          <div className="absolute md:bottom-[5vh] md:right-[10vh] bottom-2 right-[4vh]">
            <button
              className={`bg-[#1F1E21] border-[#969694] border-[1px] font-medium text-sm ${inter.className} text-white px-8 py-3 `}
              onClick={handleSkipClick}
            >
              SKIP FOR NOW
            </button>
          </div>
          <div className="absolute md:bottom-[5vh] md:left-[10vh] bottom-[1vh] left-[4vh]">
            <button
              className={`font-medium text-sm ${inter.className} text-white   underline text-end `}
              onClick={() => router.push("/signup")}
            >
              Back
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default SearchBusiness;
