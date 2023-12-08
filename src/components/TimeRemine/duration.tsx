import { Divider } from "@nextui-org/react";
import React from "react";

interface DurationProps {
  remainingTime: remainingTime;
  isDate: string;
  isTime: string;
}

type remainingTime = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export function Duration({ remainingTime, isDate, isTime }: DurationProps) {
  return (
    <div className="py-2 px-2 rounded-xl bg-[#EFEFEF] flex max-w-[400px]  text-[#0F1419] ">
      <div className="max-w-[38px] mx-1">
        <div className="flex min-w-[30px]">
          <div className="w-full bg-white rounded-lg border-1 border-[#E9EBED] px-1">
            {remainingTime.days}
          </div>
        </div>
        <div className="text-[#A3A3A3] text-xs mt-[2px]">D</div>
      </div>
      <div className="relative">
        <div className="absolute left-0 top-3 h-16 w-16">
          <Divider
            orientation="vertical"
            className=" w-[1px] h-[3px] bg-[#636469]"
          />
        </div>
      </div>
      <div className=" max-w-[38px] mx-1">
        <div className="flex min-w-[30px]">
          <div className="w-full bg-white rounded-lg border-1 border-[#E9EBED] px-1">
            {remainingTime.hours}
          </div>
        </div>
        <div className="text-[#A3A3A3] text-xs mt-[2px]">H</div>
      </div>
      <div className="relative">
        <div className="absolute left-0 top-3 h-16 w-16">
          <Divider
            orientation="vertical"
            className=" w-[1px] h-[3px] bg-[#636469]"
          />
        </div>
      </div>
      <div className="max-w-[38px] mx-1">
        <div className="flex min-w-[30px]">
          <div className="w-full bg-white rounded-lg border-1 border-[#E9EBED] px-1">
            {remainingTime.minutes}
          </div>
        </div>
        <div className="text-[#A3A3A3] text-xs mt-[2px]">M</div>
      </div>
      <div className="relative">
        <div className="absolute left-0 top-3 h-16 w-16">
          <Divider
            orientation="vertical"
            className=" w-[1px] h-[3px] bg-[#636469]"
          />
        </div>
      </div>
      <div className=" max-w-[38px] mx-1">
        <div className="flex min-w-[30px]">
          <div className="w-full bg-white rounded-lg border-1 border-[#E9EBED] px-1">
            {remainingTime.seconds}
          </div>
        </div>
        <div className="text-[#A3A3A3] text-xs mt-[2px]">S</div>
      </div>
      <div className="px-2">
        <Divider className=" w-[1px] h-full bg-[#A3A3A3]"></Divider>
      </div>
      <div className="flex flex-col justify-center text-end mr-2">
        <div className="text-[#0F1419] text-sm">{isDate}</div>
        <div className="text-[#A3A3A3] text-xs">{isTime}</div>
      </div>
    </div>
  );
}
