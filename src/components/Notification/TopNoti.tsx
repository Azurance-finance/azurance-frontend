import React from "react";
import CloseIcon from "../Icon/CloseIcon";
type TopNotiTypes = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const TopNoti = ({ setOpen }: TopNotiTypes) => {
  return (
    <div className="h-12 py-3 relative bg-gradient-to-b from-blue-600 to-blue-700 w-full flex justify-center">
      <h1 className=" text-white text-xs my-auto font-medium">
        Decentralized insurance platform that providing flexible conditions
        on-chain
      </h1>
      <h1 className=" bg-white text-[#0052FF] text-xs py-1 px-2 rounded-md ml-2 font-medium">
        Stay tuned
      </h1>

      <div
        onClick={() => setOpen(true)}
        className=" absolute right-6 cursor-pointer"
      >
        <CloseIcon color={"#fff"} strokeWidth={"1.5"} />
      </div>
    </div>
  );
};

export default TopNoti;
