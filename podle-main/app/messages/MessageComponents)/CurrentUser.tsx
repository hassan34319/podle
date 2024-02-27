import React from "react";

type Props = {
    messageText : string
};

function CurrentUser({messageText}: Props) {
  return (
    <div className="w-full flex flex-row mr-0 justify-end gap-x-2">
      <p className="text-sm md:text-base text-white bg-[#16A235] max-w-[50%] rounded-l-2xl rounded-t-2xl px-6 flex items-center min-h-10 py-4">
        {messageText}
      </p>
    </div>
  );
}

export default CurrentUser;
