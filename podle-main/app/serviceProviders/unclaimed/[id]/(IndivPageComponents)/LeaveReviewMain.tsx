"use client";
import React, { useState } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
// Assuming you have imported client and inter
import { client } from '@/app/utils/client';
import { inter } from '@/app/utils/inter';

type Props = {
  businessName: string;
};

function LeaveReviewMain({ businessName }: Props) {
  const router = useRouter();

  const [communicationRating, setCommunicationRating] = useState<number>(0);
  const [serviceRating, setServiceRating] = useState<number>(0);
  const [recommendRating, setRecommendRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>('');
  const [modalOpen, setModalOpen] = useState(false);

  const session = useSession();

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
    const cumulativeRating =
      (communicationRating + serviceRating + recommendRating) / 3;

    const reviewData = {
      _type: 'review',
      businessName: businessName,
      buyerEmail: session.data?.user?.email,
      reviewText,
      reviewRating: cumulativeRating,
    };

    try {
      await client.create(reviewData);
      router.push('/');
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const renderStars = (
    handler: (newRating: number) => void,
    currentRating: number
  ) => {
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
    <>
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center backdrop-filter backdrop-blur-lg overflow-y-auto ">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full ">
            <h1 className="text-xs md:text-base text-opacity-70 ">
              Public Feedback
            </h1>
            <h1 className="md:text-lg xl:text-4xl font-bold mt-2 md:mt-4">
              Share Your Experience with the Community, to help them make better
              decisions.
            </h1>
            <div className="md:flex flex-row justify-between mt-6 md:mt-12">
              <div className="flex flex-col gap-y-2 ">
                <p className="font-bold text-base md:text-lg">
                  Service Provier
                </p>
                <p className="text-opacity-70 text-sm md:text-base">
                  Did the seller deliver according to your expectation?
                </p>
              </div>
              <div className="mt-2 md:mt-0 flex items-center">
                {renderStars(
                  handleServiceRatingChange,
                  serviceRating
                )}
              </div>
            </div>
            <div className="md:flex flex-row justify-between mt-6 md:mt-12">
              <div className="flex flex-col gap-y-2 ">
                <p className="font-bold text-base md:text-lg">
                  Communication With Seller
                </p>
                <p className="text-opacity-70 text-sm md:text-base">
                  How responsive was the seller during the process?
                </p>
              </div>
              <div className="mt-2 md:mt-0 flex items-center">
                {renderStars(
                  handleCommunicationRatingChange,
                  communicationRating
                )}
              </div>
            </div>
            <div className="md:flex flex-row justify-between mt-6 md:mt-12">
              <div className="flex flex-col gap-y-2 ">
                <p className="font-bold text-base md:text-lg">
                  Recommend to friends
                </p>
                <p className="text-opacity-70 text-sm md:text-base">
                  How likely are you to recommend them to a friend?
                </p>
              </div>
              <div className="mt-2 md:mt-0 flex items-center">
                {renderStars(
                  handleRecommendRatingChange,
                  recommendRating
                )}
              </div>
            </div>
            {/* Repeat similar structure for other feedback sections */}
            <div className="mt-6 md:mt-12">
              <div className="flex flex-col gap-y-2 ">
                <p className="font-bold text-base md:text-lg">
                  What was it like working with this seller?
                </p>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="px-4 py-4 h-24 md:h-36 xl:w-[80%] border-black border-2 bg-transparent text-black"
                />
              </div>
            </div>
            <button
              className={`bg-[#16A235] xl:w-[80%] mt-4 md:mt-4 lg:mt-8 border-white hover:bg-opacity-80 rounded-lg border-[0.5px] font-medium text-white w-full py-4 `}
              onClick={handleReviewSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      )}
      {!modalOpen && (
        <button
          onClick={() => setModalOpen(true)}
          className={`bg-white h-[8vh] md:w-[30%] w-[90%] mt-[3vh] md:mt-0 border-[#16A235] border-[0.5px] border-opacity-50 text-center px-2 rounded-lg text-[#16A235] ${inter.className} font-medium text-lg`}
        >
          Leave a Review
        </button>
      )}
    </>
  );
}

export default LeaveReviewMain;
