import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

type Props = {
  onClose: () => void; // Function to close the modal
  buyerId : string;
};

const Rate: React.FC<Props> = ({ onClose, buyerId }: Props) => {
  const [rating, setRating] = useState<number>(0);

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };
  

  const handleSubmit = async () => {
    // Submit the rating to Sanity or perform any required action
    // For this example, let's just log the rating
    console.log('Submitted rating:', rating);

    // Close the modal
    onClose();
  };

  const renderStars = () => {
    const stars = [];
    const totalStars = 5;
    for (let i = 1; i <= totalStars; i++) {
      stars.push(
        <span
          key={i}
          className="cursor-pointer text-2xl"
          onClick={() => handleRatingChange(i)}
        >
          {i <= rating ? (
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
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-filter backdrop-blur-md">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Rate this item</h2>
        <div className="flex items-center">{renderStars()}</div>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
        >
          Submit
        </button>
        <button
          onClick={onClose}
          className="text-gray-600 ml-2 hover:text-gray-800 px-2 py-1"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Rate;
