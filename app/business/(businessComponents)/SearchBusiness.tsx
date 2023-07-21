"use client";
import { useState } from "react";
import { inter } from "../../utils/inter";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { numberToWords } from "../../utils/numToWords.js";
import { useRouter } from "next/navigation";
import { useStateContext } from "@/app/context/stateContext";
type Props = {
  claimAuto: boolean;
  setClaimAuto: (value: boolean) => void;
  claimManual: boolean;
  setClaimManual: (value: boolean) => void;
};

function SearchBusiness({
  claimAuto,
  setClaimAuto,
  claimManual,
  setClaimManual,
}: Props) {
  const router = useRouter();
  //   The actual input inputted by the users
  const [searchInput, setSearchInput] = useState<string>("");
  //   The results got from user's search
  const [searchResults, setSearchResults] = useState<string[]>([]);
  //   Handles if user is still doing activity or is waiting for results
  const [showNoResultsMessage, setShowNoResultsMessage] =
    useState<boolean>(false);
  // The selected business by user from context
  const { addBusiness, business } = useStateContext();

  const dummyData: string[] = [
    "Jam Street Media, 123 ABC St, Los Angeles, CA 73738",
    "Pizza Hut, New York City, Street 4",
    "Pizza Max, London, Street 4",
    "McDonald's, Los Angeles, Avenue 5",
  ];

  //  Handles the change in user input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    setShowNoResultsMessage(false); // Hide the "No results found" message when user is typing
  };
  // Handles when user presses search Icon
  const handleSearchSubmit = () => {
    const filteredResults = dummyData.filter((address) =>
      address.toLowerCase().includes(searchInput.toLowerCase())
    );
    setSearchResults(filteredResults);
    setShowNoResultsMessage(true); // Show the "No results found" message when search button is clicked
  };
  //   Handles when user Selects a business
  const handleSelectBusiness = (address: string) => {
    // Adds Business to context
    addBusiness(address);
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
            <h1 className="mt-[9vh] font-extrabold text-6xl">
              Service Provider
            </h1>
            <p
              className={`mt-[9vh] font-bold ${inter.className}  xl:pr-[14%] text-2xl`}
            >
              Search for business by name
            </p>
            {/* Search Bar */}
            <div
              className={`mt-[2vh] rounded-lg bg-white box-border w-[40%] h-[6vh] border-[1px] ${inter.className}border-solid border-black flex items-center justify-between`}
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
                className={`mt-[2vh] rounded-lg bg-white box-border w-[40%] h-max border-[1px] ${inter.className}border-solid border-black `}
              >
                <p className="text-black text-opacity-60 font-normal text-sm ml-4 border-b-2 mr-4 py-2 border-gray-300">
                  {numberToWords(searchResults.length)} search result found
                </p>
                <div>
                  {searchResults.map((address) => (
                    <button
                      className="w-full text-start block ml-4 text-black font-normal py-3"
                      onClick={() => handleSelectBusiness(address)}
                      key={address}
                    >
                      {address}
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
          <div className="absolute bottom-[5vh] right-[10vh]">
            <button
              className={`bg-[#1F1E21] border-[#969694] border-[1px] font-medium text-sm ${inter.className} text-white px-8 py-3 `} onClick={handleSkipClick}
            >
              SKIP FOR NOW
            </button>
          </div>
          <div className="absolute bottom-[5vh] left-[10vh]">
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
