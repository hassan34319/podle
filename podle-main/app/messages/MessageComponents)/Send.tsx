import React from "react";

type Props = {
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

function Send({ handleSubmit }: Props) {
  return (
    <button onClick={handleSubmit}>
      <svg
        width="70"
        height="40"
        viewBox="0 0 70 70"
        fill="none"
        className="cursor-pointer"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="70" height="70" rx="35" fill="#FBAC18" />
        <g clip-path="url(#clip0_3229_111)">
          <path
            d="M51.5739 20.4346L25.3516 46.6498C25.9185 46.9261 26.5402 47.0713 27.1709 47.0746H31.6618C32.0375 47.0736 32.3979 47.223 32.6628 47.4894L35.0966 49.9218C36.4164 51.2508 38.2116 51.9988 40.0845 52.0002C40.8578 51.9995 41.6258 51.8727 42.3583 51.6251C44.8835 50.7971 46.7203 48.608 47.097 45.9773L51.881 23.2535C52.1095 22.3066 52.0008 21.3099 51.5739 20.4346Z"
            fill="white"
          />
          <path
            d="M46.7889 18.1097L24.1203 22.8852C20.2471 23.4174 17.5385 26.9887 18.0706 30.8619C18.2808 32.3916 18.9853 33.8106 20.0768 34.9027L22.5091 37.335C22.775 37.6008 22.9243 37.9615 22.924 38.3374V42.8284C22.9273 43.459 23.0725 44.0809 23.3487 44.6477L49.5668 18.4254C48.7052 18.002 47.7235 17.8904 46.7889 18.1097Z"
            fill="white"
          />
        </g>
        <defs>
          <clipPath id="clip0_3229_111">
            <rect
              width="34"
              height="34"
              fill="white"
              transform="translate(18 18)"
            />
          </clipPath>
        </defs>
      </svg>
    </button>
  );
}

export default Send;
