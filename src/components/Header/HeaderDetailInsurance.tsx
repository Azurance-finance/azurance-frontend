import { Button } from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import RedeemIcon from "../Icon/RedeemIcon";
import NotiIcon from "../Icon/NotiIcon";
import ChevronLeftIcon from "../Icon/ChevronLeftIcon";
type HeaderDetailInsuranceTypes = {
  logoImage: string;
  name: string;
  symbol: string;
};

const HeaderDetailInsurance = ({
  logoImage,
  name,
  symbol,
}: HeaderDetailInsuranceTypes) => {
  return (
    <>
      <div className="flex mb-10 cursor-pointer">
        <ChevronLeftIcon
          className="w-4 h-4  mr-2 my-auto  text-[#5B616E] "
          strokeWidth="2"
        />
        <h4 className=" text-sm font-medium text-[#5B616E]">
          Back to Explorer
        </h4>
      </div>
      <div className="flex justify-between">
        <div className="flex">
          <div className=" my-auto">
            <Image
              alt="logo-insurance"
              src={logoImage}
              width={45}
              height={45}
            />
          </div>
          <div className="ml-3">
            <h1 className=" text-[#0F1419] text-lg font-bold">{name}</h1>
            <h6 className=" text-[#A3A3A3] text-lg font-normal">{symbol}</h6>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="bordered"
            startContent={<NotiIcon color="#0F1419" />}
            className="border-[#E9EBED] min-w-[128px] border-1 bg-white text-sm font-normal text-[#0F1419] my-auto  px-6"
          >
            Issue
          </Button>
          <Button
            color="primary"
            className="my-auto px-6 text-sm font-normal min-w-[128px] border-none"
            startContent={<RedeemIcon />}
          >
            Redeem
          </Button>
        </div>
      </div>
    </>
  );
};

export default HeaderDetailInsurance;
