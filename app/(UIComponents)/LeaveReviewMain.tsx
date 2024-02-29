"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai"; // Import icons
import SampleCard from "../serviceProvider/dashboard/(UserComponents)/SampleCard";
import ServiceCard from "../services/(ServiceComponents)/ServiceCard";
import { client } from "../utils/client";

type Props = {
  gigId: string;
  orderId : string;
};

function LeaveReviewMain({ gigId,orderId }: Props) {
  const [gig, selectedGig] = useState<Gig>();
  const router = useRouter()

  const [communicationRating, setCommunicationRating] = useState<number>(0);
  const [serviceRating, setServiceRating] = useState<number>(0);
  const [recommendRating, setRecommendRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>('');

  // ... Existing code ...

  const session = useSession()

  const handleCommunicationRatingChange = (newRating: number) => {
    setCommunicationRating(newRating);
  };

  const handleServiceRatingChange = (newRating: number) => {
    setServiceRating(newRating);
  };

  const handleRecommendRatingChange = (newRating: number) => {
    setRecommendRating(newRating);
  };

  const handleReviewSubmit = async () => {
    // Calculate the overall cumulative rating score
    const cumulativeRating = (communicationRating + serviceRating + recommendRating) / 3;

    // Prepare the review data
    const reviewData = {
      _type : 'review',
      sellerEmail: gig?.sellerEmail, // Update with actual seller email
      buyerEmail: session.data?.user?.email, // Update with actual buyer email or retrieve from authentication
      reviewText,
      reviewRating: cumulativeRating, // Convert the rating to string as per schema
    };

    // Send reviewData to Sanity using the client
    try {
      await client.create(reviewData);
      // Handle successful review submission, e.g., show a success message
      if (gig) {
      const updatedNumOrders = gig?.numOrders ? gig.numOrders + 1 : 1;
    const updatedRating =
      gig?.rating && gig?.numOrders
        ? (gig.rating * gig.numOrders + cumulativeRating) / (gig.numOrders + 1)
        : cumulativeRating;

    // Update the Gig document in Sanity with the new numOrders and rating
    await client
      .patch(gig._id)
      .set({ numOrders: updatedNumOrders, rating: updatedRating })
      .commit();
      }

     await client.patch(orderId).set({ status: "reviewed" }).commit();

      router.push('/')
    } catch (error) {
      // Handle error while submitting the review
      console.error('Error submitting review:', error);
    }
  };


  if (!gigId) {
    return <div>Loading..</div>;
  }

  const handleGig = async () => {
    const gigFound = await client.fetch(`*[_type == "gig" && _id == $id][0]`, {
      id: gigId,
    });
    selectedGig(gigFound);
  };

  if (gigId) {
    handleGig();
  }

  //   const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
  //     if (e.target === e.currentTarget) {
  //       onClose();
  //     }
  //   };


  // Function to render star icons based on rating
  const renderStars = (handler: (newRating: number) => void, currentRating: number) => {
    const stars = [];
    const totalStars = 5;
    for (let i = 1; i <= totalStars; i++) {
      stars.push(
        <span
          key={i}
          className="cursor-pointer text-2xl"
          onClick={() => handler(i)}
        >
          {i <= currentRating ? (
            <AiFillStar className="text-yellow-600" />
          ) : (
            <AiOutlineStar />
          )}
        </span>
      );
    }
    return stars;
  };
  return (
    <div className="md:flex flex-row h-max mt-4 md:mt-8 px-5 md:px-10 justify-between pb-10">
      <div className="md:w-[60%] w-full">
        <h1 className="text-xs md:text-base text-opacity-70">
          Public Feedback
        </h1>
        <h1 className="md:text-lg xl:text-4xl font-bold mt-2 md:mt-4">
          Share Your Experience with the Community, to help them make better
          decisions.
        </h1>
        <div className="md:flex flex-row justify-between mt-6 md:mt-12">
          <div className="flex flex-col gap-y-2 ">
            <p className="font-bold text-base md:text-lg">
              Communication With Seller
            </p>
            <p className="text-opacity-70 text-sm md:text-base">
              How responsive was the seller during the process?
            </p>
          </div>
          <div className="mt-2 md:mt-0 flex items-center">{renderStars(handleCommunicationRatingChange, communicationRating)}</div>
        </div>
        <div className="md:flex flex-row justify-between mt-6 md:mt-12">
          <div className="flex flex-col gap-y-2 ">
            <p className="font-bold text-base md:text-lg">
              Service As Described
            </p>
            <p className="text-opacity-70 text-sm md:text-base">
              How was the service quality compared to what the seller promised?
            </p>
          </div>
          <div className="mt-2 md:mt-0 flex items-center">{renderStars(handleServiceRatingChange, serviceRating)}</div>
        </div>
        <div className="md:flex flex-row justify-between mt-6 md:mt-12">
          <div className="flex flex-col gap-y-2 ">
            <p className="font-bold text-base md:text-lg">
              Buy Again Or Recommend
            </p>
            <p className="text-opacity-70 text-sm md:text-base">
              Would you buy again or recommend this seller to your friends?
            </p>
          </div>
          <div className="mt-2 md:mt-0 flex items-center">{renderStars(handleRecommendRatingChange, recommendRating)}</div>
        </div>
        <div className="mt-6 md:mt-12">
          <div className="flex flex-col gap-y-2 ">
            <p className="font-bold text-base md:text-lg">
              What was it like working with this seller?
            </p>
            <textarea value={reviewText} onChange={(e)=>setReviewText(e.target.value)}className="px-4 py-4 h-24 md:h-36 xl:w-[80%] border-black border-2 bg-transparent text-black" />
          </div>
        </div>
        <button
          className={`bg-[#16A235] xl:w-[80%] mt-4 md:mt-4 lg:mt-8 border-white hover:bg-opacity-80 rounded-lg border-[0.5px] font-medium text-white w-full py-4 `}
          onClick={handleReviewSubmit}
        >
          Submit
        </button>
      </div>
      <div className="md:w-[40%] px-5 md:px-10 hidden md:block">
        {gig && (
          <SampleCard
            rating={gig.rating}
            image={gig.imageUrl}
            title={gig.title}
            index={-1}
            category={gig.category}
            price={gig.basicPackage.price}
          />
        )}
        {!gig && <div>Gig Loading</div>}
      </div>
    </div>
  );
}

export default LeaveReviewMain;
