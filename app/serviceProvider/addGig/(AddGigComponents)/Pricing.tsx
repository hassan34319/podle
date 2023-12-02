import React from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

type Props = {
  setSelected: (selected: string) => void;
  basicServices: {
    service1: boolean;
    service2: boolean;
    service3: boolean;
    service4: boolean;
    service5: boolean;
  };
  setBasicServices: React.Dispatch<
    React.SetStateAction<{
      service1: boolean;
      service2: boolean;
      service3: boolean;
      service4: boolean;
      service5: boolean;
    }>
  >;
  standardServices: {
    service1: boolean;
    service2: boolean;
    service3: boolean;
    service4: boolean;
    service5: boolean;
  };
  setStandardServices: React.Dispatch<
    React.SetStateAction<{
      service1: boolean;
      service2: boolean;
      service3: boolean;
      service4: boolean;
      service5: boolean;
    }>
  >;
  premiumServices: {
    service1: boolean;
    service2: boolean;
    service3: boolean;
    service4: boolean;
    service5: boolean;
  };
  setPremiumServices: React.Dispatch<
    React.SetStateAction<{
      service1: boolean;
      service2: boolean;
      service3: boolean;
      service4: boolean;
      service5: boolean;
    }>
  >;
  serviceName : {
    service1: string;
    service2: string;
    service3: string;
    service4: string;
    service5: string;
  };
  setServiceName: React.Dispatch<
    React.SetStateAction<{
      service1: string;
      service2: string;
      service3: string;
      service4: string;
      service5: string;
    }>
  >;
  basicTime: string;
  setBasicTime: React.Dispatch<React.SetStateAction<string>>;
  standardTime: string;
  setStandardTime: React.Dispatch<React.SetStateAction<string>>;
  premiumTime: string;
  setPremiumTime: React.Dispatch<React.SetStateAction<string>>;
  basicDesc: string;
  setBasicDesc: React.Dispatch<React.SetStateAction<string>>;
  standardDesc: string;
  setStandardDesc: React.Dispatch<React.SetStateAction<string>>;
  premiumDesc: string;
  setPremiumDesc: React.Dispatch<React.SetStateAction<string>>;
  basicPrice: number;
  setBasicPrice: React.Dispatch<React.SetStateAction<number>>;
  standardPrice: number;
  setStandardPrice: React.Dispatch<React.SetStateAction<number>>;
  premiumPrice: number;
  setPremiumPrice: React.Dispatch<React.SetStateAction<number>>;
};

function Pricing({
  setSelected,
  basicServices,
  setBasicServices,
  standardServices,
  setStandardServices,
  premiumServices,
  setPremiumServices,
  basicTime,
  setBasicTime,
  standardTime,
  setStandardTime,
  premiumTime,
  setPremiumTime,
  basicDesc,
  setBasicDesc,
  standardDesc,
  setStandardDesc,
  premiumDesc,
  setPremiumDesc,
  basicPrice,
  setBasicPrice,
  standardPrice,
  setStandardPrice,
  premiumPrice,
  setPremiumPrice,
  serviceName,
  setServiceName
}: Props) {
  return (
    <div className="flex flex-col px-4 md:px-8 mt-2 md:mt-4 lg:mt-8">
      <div className="bg-[#EEE8DA] grid grid-cols-4 grid-rows-8 w-full xl:w-[60%] rounded-xl mb-2 md:mb-4 lg:mb-8">
        <div className="h-12 bg-[#16A235] rounded-tl-xl md:h-12 lg:h-16 border-black border-opacity-[6%] border-2 flex items-center justify-center text-xs md:text-base">
          {/* Content */}
        </div>
        <div className="h-12 font-bold md:h-12 lg:h-16 border-black border-opacity-[6%] border-2 flex items-center justify-center text-xs md:text-base">
          Basic
        </div>
        <div className="h-12 font-bold md:h-12 lg:h-16 border-black border-l-0 border-opacity-[6%] border-2 flex items-center justify-center text-xs md:text-base">
          Standard
        </div>
        <div className="h-12 font-bold md:h-12 lg:h-16 border-black border-l-0 rounded-tr-xl border-opacity-[6%] border-2 flex items-center justify-center text-xs md:text-base">
          Premium
        </div>
        <div className="h-12 border-l-0 font-bold md:h-12 lg:h-16 border-black border-t-0 border-opacity-[6%] border-2 flex items-center justify-center ] text-xs md:text-base">
          Delivery Time
        </div>
        <input
          className={`text-center  bg-transparent h-12 text-xs md:text-base md:h-12 lg:h-16 border-black border-l-0 border-t-0 border-opacity-[6%] border-2 flex items-center justify-center`}
          value={basicTime} // Set the value of the input to basicTime
          onChange={(e) => setBasicTime(e.target.value)} // Update basicTime on change
        ></input>
        <input
          className={`text-center  bg-transparent h-12 text-xs md:text-base md:h-12 lg:h-16 border-black border-l-0 border-t-0 border-opacity-[6%] border-2 flex items-center justify-center`}
          value={standardTime} // Set the value of the input to standardTime
          onChange={(e) => setStandardTime(e.target.value)} // Update standardTime on change
        ></input>
        <input
          className={`text-center  bg-transparent h-12 text-xs md:text-base md:h-12 lg:h-16 border-black border-l-0 border-t-0 border-opacity-[6%] border-2 flex items-center justify-center`}
          value={premiumTime} // Set the value of the input to premiumTime
          onChange={(e) => setPremiumTime(e.target.value)} // Update premiumTime on change
        ></input>
        <div className="h-12 border-l-0 font-bold md:h-12 lg:h-16 border-black border-t-0 border-opacity-[6%] border-2 flex items-center justify-center ] text-xs md:text-base">
          Description 
        </div>
        <input
          className={`text-center  bg-transparent h-12 text-xs md:text-base md:h-12 lg:h-16 border-black border-l-0 border-t-0 border-opacity-[6%] border-2 flex items-center justify-center`}
          value={basicDesc} // Set the value of the input to basicTime
          onChange={(e) => setBasicDesc(e.target.value)} // Update basicTime on change
        ></input>
        <input
          className={`text-center  bg-transparent h-12 text-xs md:text-base md:h-12 lg:h-16 border-black border-l-0 border-t-0 border-opacity-[6%] border-2 flex items-center justify-center`}
          value={standardDesc} // Set the value of the input to standardTime
          onChange={(e) => setStandardDesc(e.target.value)} // Update standardTime on change
        ></input>
        <input
          className={`text-center  bg-transparent h-12 text-xs md:text-base md:h-12 lg:h-16 border-black border-l-0 border-t-0 border-opacity-[6%] border-2 flex items-center justify-center`}
          value={premiumDesc} // Set the value of the input to premiumTime
          onChange={(e) => setPremiumDesc(e.target.value)} // Update premiumTime on change
        ></input>
        <input
        onChange={(e) =>
          setServiceName({
            ...serviceName,
            service1: e.target.value,
          })
        } 
          value={serviceName.service1}
          placeholder="Service 1"
          className="text-center font-bold bg-transparent h-12 text-xs md:text-base md:h-12 lg:h-16 border-black border-l-0 border-t-0 border-opacity-[6%] border-2 flex items-center justify-center "
        ></input>
        <div
          className={`text-center font-bold bg-transparent h-12 text-xs md:text-base md:h-12 lg:h-16 border-black border-l-0 border-t-0 border-opacity-[6%] border-2 flex items-center justify-center`}
          onClick={() =>
            setBasicServices({
              ...basicServices,
              service1: !basicServices.service1,
            })
          } // Toggle the boolean value on click
        >
          {basicServices.service1 ? <FaCheck /> : <FaTimes />}
        </div>
        <div
          className={`text-center font-bold bg-transparent h-12 text-xs md:text-base md:h-12 lg:h-16 border-black border-l-0 border-t-0 border-opacity-[6%] border-2 flex items-center justify-center`}
          // Display the tick or cross icon based on the boolean state
          onClick={() =>
            setStandardServices({
              ...standardServices,
              service1: !standardServices.service1,
            })
          } // Toggle the boolean value on click
        >
          {standardServices.service1 ? <FaCheck /> : <FaTimes />}
        </div>
        <div
          className={`text-center font-bold bg-transparent h-12 text-xs md:text-base md:h-12 lg:h-16 border-black border-l-0 border-t-0 border-opacity-[6%] border-2 flex items-center justify-center`}
          // Display the tick or cross icon based on the boolean state
          onClick={() =>
            setPremiumServices({
              ...premiumServices,
              service1: !premiumServices.service1,
            })
          } // Toggle the boolean value on click
        >
          {premiumServices.service1 ? <FaCheck /> : <FaTimes />}
        </div>
        <input
        onChange={(e) =>
          setServiceName({
            ...serviceName,
            service2: e.target.value,
          })
        } 
        value={serviceName.service2}
          placeholder="Service 2"
          className="text-center font-bold bg-transparent h-12 text-xs md:text-base md:h-12 lg:h-16 border-black border-l-0 border-t-0 border-opacity-[6%] border-2 flex items-center justify-center "
        ></input>
        <div
          className={`text-center font-bold bg-transparent h-12 text-xs md:text-base md:h-12 lg:h-16 border-black border-l-0 border-t-0 border-opacity-[6%] border-2 flex items-center justify-center`}
          onClick={() =>
            setBasicServices({
              ...basicServices,
              service2: !basicServices.service2,
            })
          } // Toggle the boolean value on click
        >
          {basicServices.service2 ? <FaCheck /> : <FaTimes />}
        </div>
        <div
          className={`text-center font-bold bg-transparent h-12 text-xs md:text-base md:h-12 lg:h-16 border-black border-l-0 border-t-0 border-opacity-[6%] border-2 flex items-center justify-center`}
          // Display the tick or cross icon based on the boolean state
          onClick={() =>
            setStandardServices({
              ...standardServices,
              service2: !standardServices.service2,
            })
          } // Toggle the boolean value on click
        >
          {standardServices.service2 ? <FaCheck /> : <FaTimes />}
        </div>
        <div
          className={`text-center font-bold bg-transparent h-12 text-xs md:text-base md:h-12 lg:h-16 border-black border-l-0 border-t-0 border-opacity-[6%] border-2 flex items-center justify-center`}
          // Display the tick or cross icon based on the boolean state
          onClick={() =>
            setPremiumServices({
              ...premiumServices,
              service2: !premiumServices.service2,
            })
          } // Toggle the boolean value on click
        >
          {premiumServices.service2 ? <FaCheck /> : <FaTimes />}
        </div>
        <input
      onChange={(e) =>
        setServiceName({
          ...serviceName,
          service3: e.target.value,
        })
      } 
      value={serviceName.service3}
          placeholder="Service 3"
          className="text-center font-bold bg-transparent h-12 text-xs md:text-base md:h-12 lg:h-16 border-black border-l-0 border-t-0 border-opacity-[6%] border-2 flex items-center justify-center "
        ></input>
        <div
          className={`text-center font-bold bg-transparent h-12 text-xs md:text-base md:h-12 lg:h-16 border-black border-l-0 border-t-0 border-opacity-[6%] border-2 flex items-center justify-center`}
          onClick={() =>
            setBasicServices({
              ...basicServices,
              service3: !basicServices.service3,
            })
          } // Toggle the boolean value on click
        >
          {basicServices.service3 ? <FaCheck /> : <FaTimes />}
        </div>
        <div
          className={`text-center font-bold bg-transparent h-12 text-xs md:text-base md:h-12 lg:h-16 border-black border-l-0 border-t-0 border-opacity-[6%] border-2 flex items-center justify-center`}
          // Display the tick or cross icon based on the boolean state
          onClick={() =>
            setStandardServices({
              ...standardServices,
              service3: !standardServices.service3,
            })
          } // Toggle the boolean value on click
        >
          {standardServices.service3 ? <FaCheck /> : <FaTimes />}
        </div>
        <div
          className={`text-center font-bold bg-transparent h-12 text-xs md:text-base md:h-12 lg:h-16 border-black border-l-0 border-t-0 border-opacity-[6%] border-2 flex items-center justify-center`}
          // Display the tick or cross icon based on the boolean state
          onClick={() =>
            setPremiumServices({
              ...premiumServices,
              service3: !premiumServices.service3,
            })
          } // Toggle the boolean value on click
        >
          {premiumServices.service3 ? <FaCheck /> : <FaTimes />}
        </div>
        <input
          onChange={(e) =>
            setServiceName({
              ...serviceName,
              service4: e.target.value,
            })
          } 
          value={serviceName.service4}
          placeholder="Service 4"
          className="text-center font-bold bg-transparent h-12 text-xs md:text-base md:h-12 lg:h-16 border-black border-l-0 border-t-0 border-opacity-[6%] border-2 flex items-center justify-center "
        ></input>
        <div
          className={`text-center font-bold bg-transparent h-12 text-xs md:text-base md:h-12 lg:h-16 border-black border-l-0 border-t-0 border-opacity-[6%] border-2 flex items-center justify-center`}
          onClick={() =>
            setBasicServices({
              ...basicServices,
              service4: !basicServices.service4,
            })
          } // Toggle the boolean value on click
        >
          {basicServices.service4 ? <FaCheck /> : <FaTimes />}
        </div>
        <div
          className={`text-center font-bold bg-transparent h-12 text-xs md:text-base md:h-12 lg:h-16 border-black border-l-0 border-t-0 border-opacity-[6%] border-2 flex items-center justify-center`}
          // Display the tick or cross icon based on the boolean state
          onClick={() =>
            setStandardServices({
              ...standardServices,
              service4: !standardServices.service4,
            })
          } // Toggle the boolean value on click
        >
          {standardServices.service4 ? <FaCheck /> : <FaTimes />}
        </div>
        <div
          className={`text-center font-bold bg-transparent h-12 text-xs md:text-base md:h-12 lg:h-16 border-black border-l-0 border-t-0 border-opacity-[6%] border-2 flex items-center justify-center`}
          // Display the tick or cross icon based on the boolean state
          onClick={() =>
            setPremiumServices({
              ...premiumServices,
              service4: !premiumServices.service4,
            })
          } // Toggle the boolean value on click
        >
          {premiumServices.service4 ? <FaCheck /> : <FaTimes />}
        </div>
        <input
           onChange={(e) =>
            setServiceName({
              ...serviceName,
              service5: e.target.value,
            })
          } 
          value={serviceName.service5}
          placeholder="Service 5"
          className="text-center font-bold bg-transparent h-12 text-xs md:text-base md:h-12 lg:h-16 border-black border-l-0 border-t-0 border-opacity-[6%] border-2 flex items-center justify-center "
        ></input>
        <div
          className={`text-center font-bold bg-transparent h-12 text-xs md:text-base md:h-12 lg:h-16 border-black border-l-0 border-t-0 border-opacity-[6%] border-2 flex items-center justify-center`}
          onClick={() =>
            setBasicServices({
              ...basicServices,
              service5: !basicServices.service5,
            })
          } // Toggle the boolean value on click
        >
          {basicServices.service5 ? <FaCheck /> : <FaTimes />}
        </div>
        <div
          className={`text-center font-bold bg-transparent h-12 text-xs md:text-base md:h-12 lg:h-16 border-black border-l-0 border-t-0 border-opacity-[6%] border-2 flex items-center justify-center`}
          // Display the tick or cross icon based on the boolean state
          onClick={() =>
            setStandardServices({
              ...standardServices,
              service5: !standardServices.service5,
            })
          } // Toggle the boolean value on click
        >
          {standardServices.service5 ? <FaCheck /> : <FaTimes />}
        </div>
        <div
          className={`text-center font-bold bg-transparent h-12 text-xs md:text-base md:h-12 lg:h-16 border-black border-l-0 border-t-0 border-opacity-[6%] border-2 flex items-center justify-center`}
          // Display the tick or cross icon based on the boolean state
          onClick={() =>
            setPremiumServices({
              ...premiumServices,
              service5: !premiumServices.service5,
            })
          } // Toggle the boolean value on click
        >
          {premiumServices.service5 ? <FaCheck /> : <FaTimes />}
        </div>
        <div className="h-12 border-l-0 rounded-bl-xl  font-bold md:h-12 lg:h-16 border-black border-t-0 border-opacity-[6%] border-2 flex items-center justify-center text-xs md:text-base">
          Price ($)
        </div>
        <input
          className={`text-center bg-transparent h-12 text-xs md:text-base md:h-12 lg:h-16 border-black border-l-0 border-t-0 border-opacity-[6%] border-2 flex items-center justify-center`}
          value={basicPrice}
          type="number"
          onChange={(e) => setBasicPrice(parseFloat(e.target.value))}
        ></input>

        <input
        type="number"
          className={`text-center bg-transparent h-12 text-xs md:text-base md:h-12 lg:h-16 border-black border-l-0 border-t-0 border-opacity-[6%] border-2 flex items-center justify-center`}
          value={standardPrice}
          onChange={(e) => setStandardPrice(parseFloat(e.target.value))}
        ></input>

        <input
        type="number"
          className={`text-center rounded-br-xl h-12 text-xs md:text-base md:h-12 bg-transparent lg:h-16 border-black border-l-0 border-t-0 border-opacity-[6%] border-2 flex items-center justify-center`}
          value={premiumPrice}
          onChange={(e) => setPremiumPrice(parseFloat(e.target.value))}
        ></input>
      </div>
      <button
        className={`bg-[#16A235] xl:w-[50%] mt-2 md:mt-4 lg:mt-8 border-white hover:bg-opacity-80 rounded-lg border-[0.5px] font-medium text-white w-full py-4 `}
        onClick={() => setSelected("sample")}
      >
        Save
      </button>
    </div>
  );
}

export default Pricing;
