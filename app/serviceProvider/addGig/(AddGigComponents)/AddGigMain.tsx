"use client";
import { client } from "@/app/utils/client";
import { inter } from "@/app/utils/inter";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Overview from "./Overview";
import Pricing from "./Pricing";
import Samples from "./Samples";

type Props = {
  categories : Category[]
};

function AddGigMain({categories}: Props) {
  const [selected, setSelected] = useState("overview");
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  // States for time inputs
  const [basicTime, setBasicTime] = useState("");
  const [standardTime, setStandardTime] = useState("");
  const [premiumTime, setPremiumTime] = useState("");
  const [basicDesc, setBasicDesc] = useState("");
  const [standardDesc, setStandardDesc] = useState("");
  const [premiumDesc, setPremiumDesc] = useState("");
  const [location, setLocation] = useState("")
  const [servicesName, setServicesName] = useState(({
    service1: "",
    service2 : "",
    service3 : "",
    service4 : "",
    service5 : ""
  }))

  // Boolean states for service inputs within each type
  const [basicServices, setBasicServices] = useState({
    service1: false,
    service2: false,
    service3: false,
    service4: false,
    service5: false,
  });

  const [standardServices, setStandardServices] = useState({
    service1: false,
    service2: false,
    service3: false,
    service4: false,
    service5: false,
  });

  const [premiumServices, setPremiumServices] = useState({
    service1: false,
    service2: false,
    service3: false,
    service4: false,
    service5: false,
  });

  const router = useRouter()
  // States for price inputs
  const [basicPrice, setBasicPrice] = useState(0);
  const [standardPrice, setStandardPrice] = useState(0);
  const [premiumPrice, setPremiumPrice] = useState(0);

  const session = useSession(); // Assuming useSession() returns the user session information

  const handleSubmit = async () => {
    if (
      !title ||
      !category ||
      !serviceType ||
      !description ||
      !image ||
      basicPrice == 0 ||
      standardPrice == 0 ||
      premiumPrice == 0 ||
      !basicTime||
      !standardTime||
      !premiumTime||
      !basicDesc||
      !standardDesc||
      !premiumDesc ||
      !servicesName.service1 ||
      !servicesName.service2 
    ) {
      // Check if all required fields are filled
      console.log("Feilds are empty")
      alert("Please fill in all fields and upload gig image.");
      return;
    }

    try {
      const sellerEmail = session?.data?.user?.email; // Get the seller's email from the user session

      // Create the gig document in Sanity
      const newgig = {
        _type: 'gig',
        sellerEmail: session?.data?.user?.email, // Get the seller's email from the user session
        imageUrl: image, // Ensure you have the image URL here
        title: title,
        location : location,
        category: category,
        startingPrice: basicPrice, // Set your starting price here or modify as needed
        Description: description,
        basicPackage: {
          estimatedDeliveryTime: basicTime,
          price: basicPrice,
          description: basicDesc,
          Services: [
            {
              serviceName: servicesName.service1,
              included: basicServices.service1,
            },
            {
              serviceName: servicesName.service2,
              included: basicServices.service2,
            },
            {
              serviceName: servicesName.service3,
              included: basicServices.service3,
            },
            {
              serviceName: servicesName.service4,
              included: basicServices.service4,
            },
            {
              serviceName: servicesName.service5,
              included: basicServices.service5,
            },
          ],
        },
        standardPackage: {
          estimatedDeliveryTime: standardTime,
          price: standardPrice,
          description: standardDesc,
          Services: [
            {
              serviceName: servicesName.service1,
              included: standardServices.service1,
            },
            {
              serviceName: servicesName.service2,
              included: standardServices.service2,
            },
            {
              serviceName: servicesName.service3,
              included: standardServices.service3,
            },
            {
              serviceName: servicesName.service4,
              included: standardServices.service4,
            },
            {
              serviceName: servicesName.service5,
              included: standardServices.service5,
            },
          ],
        },
        premiumPackage: {
          estimatedDeliveryTime: premiumTime,
          price: premiumPrice,
          description: premiumDesc,
          Services: [
            {
              serviceName: servicesName.service1,
              included: premiumServices.service1,
            },
            {
              serviceName: servicesName.service2,
              included: premiumServices.service2,
            },
            {
              serviceName: servicesName.service3,
              included: premiumServices.service3,
            },
            {
              serviceName: servicesName.service4,
              included: premiumServices.service4,
            },
            {
              serviceName: servicesName.service5,
              included: premiumServices.service5,
            },
          ],
        },
        samples: imageUrls, // Assuming imageUrls is an array of sample images
        // Other fields for your business schema
      };

      // Send a POST request to create the document
      const createdGig = await client.create(newgig);
      console.log("Created gig:", createdGig);

      // Clear form fields after successful submission
      setTitle("");
      setCategory("");
      setServiceType("");
      setDescription("");
      setLocation("")
      setImageUrls([]);
      // Clear other form state as needed

      router.push("/serviceProvider/dashboard")
    } catch (error) {
      console.error("Error creating gig:", error);
      alert("Failed to create gig. Please try again later.");
    }
  };
  return (
    <main className="min-h-[80vh]">
      <div className="flex flex-row xl:w-[40%] px-8 justify-between mt-6 ">
        <h1
          onClick={() => setSelected("overview")}
          className={`xl:text-lg  cursor-pointer ${
            selected == "overview"
              ? "text-[#16A235] underline text-bold "
              : "text-gray-700"
          } `}
        >
          Overview
        </h1>
        <h1
          onClick={() => setSelected("pricing")}
          className={`xl:text-lg  cursor-pointer ${
            selected == "pricing" ? "text-[#16A235] underline" : "text-gray-700"
          } `}
        >
          Pricing Plans
        </h1>
        <h1
          onClick={() => setSelected("sample")}
          className={`xl:text-lg  cursor-pointer ${
            selected == "sample" ? "text-[#16A235] underline" : "text-gray-700"
          } `}
        >
          Sample Work
        </h1>
      </div>
      <div className="bg-opacity-[6%]  mx-6  bg-black mt-[1px] xl:mt-[2px] h-[2px] ">
        {" "}
      </div>
      {selected == "overview" && (
        <Overview
          title={title}
          setTitle={setTitle}
          category={category}
          setCategory={setCategory}
          serviceType={serviceType}
          setServiceType={setServiceType}
          description={description}
          setDescription={setDescription}
          setSelected={setSelected}
          image={image}
          setImage={setImage}
          categories={categories}
          location={location}
          setLocation={setLocation}
        />
      )}
      {selected == "pricing" && (
        <Pricing
          setSelected={setSelected}
          basicTime={basicTime}
          setBasicTime={setBasicTime}
          standardTime={standardTime}
          setStandardTime={setStandardTime}
          premiumTime={premiumTime}
          setPremiumTime={setPremiumTime}
          basicDesc={basicDesc}
          setBasicDesc={setBasicDesc}
          standardDesc={standardDesc}
          setStandardDesc={setStandardDesc}
          premiumDesc={premiumDesc}
          setPremiumDesc={setPremiumDesc}
          basicServices={basicServices}
          setBasicServices={setBasicServices}
          standardServices={standardServices}
          setStandardServices={setStandardServices}
          premiumServices={premiumServices}
          setPremiumServices={setPremiumServices}
          basicPrice={basicPrice}
          setBasicPrice={setBasicPrice}
          standardPrice={standardPrice}
          setStandardPrice={setStandardPrice}
          premiumPrice={premiumPrice}
          setPremiumPrice={setPremiumPrice}
          serviceName={servicesName}
          setServiceName={setServicesName}
        />
      )}
      {selected == "sample" && (
        <Samples imageUrls={imageUrls} setImageUrls={setImageUrls} handleSubmit={handleSubmit} />
      )}
    </main>
  );
}

export default AddGigMain;
