import React from "react";
import CloseIcon from "../Icon/CloseIcon";
import Link from "next/link";
type TopNotiTypes = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const TopNoti = ({ setOpen }: TopNotiTypes) => {
  return (
    <div className="h-12 py-3 relative bg-gradient-to-b from-blue-600 to-blue-700 w-full flex justify-center">
      <h1 className=" text-white text-xs my-auto font-medium">
        Winner of the Defi and Payment at Constellation a Chainlink hackathon
      </h1>
      <Link
        href="https://devpost.com/software/azurance"
        passHref
        target="_blank"
      >
        <h1 className=" bg-white text-[#0052FF] text-xs py-1 px-2 rounded-md ml-2 font-medium">
          Showcase
        </h1>
      </Link>

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
