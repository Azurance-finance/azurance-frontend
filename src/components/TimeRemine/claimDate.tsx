import { Divider } from "@nextui-org/react";
import React from "react";

interface DurationProps {
  remainingTime: remainingTime;
}

type remainingTime = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export function ClaimDate({ remainingTime }: DurationProps) {
  return (
    <div className="py-2 px-2 rounded-xl flex max-w-[400px]  text-[#0F1419]">
      <div className="max-w-[38px] mx-2">
        <div className="flex min-w-[30px]">
          <div className="w-full bg-white rounded-lg border-1 border-[#E9EBED] px-1">
            {remainingTime.days}
          </div>
        </div>
        <div className="text-[#A3A3A3] text-xs mt-1">D</div>
      </div>
      <div className="relative">
        <div className="absolute left-0 top-3 h-16 w-16">
          <Divider
            orientation="vertical"
            className=" w-[1px] h-[3px] bg-[#636469]"
          />
        </div>
      </div>
      <div className=" max-w-[38px] mx-2">
        <div className="flex min-w-[30px]">
          <div className="w-full bg-white rounded-lg border-1 border-[#E9EBED] px-1">
            {remainingTime.hours}
          </div>
        </div>
        <div className="text-[#A3A3A3] text-xs mt-1">H</div>
      </div>
      <div className="relative">
        <div className="absolute left-0 top-3 h-16 w-16">
          <Divider
            orientation="vertical"
            className=" w-[1px] h-[3px] bg-[#636469]"
          />
        </div>
      </div>
      <div className="max-w-[38px] mx-2">
        <div className="flex min-w-[30px]">
          <div className="w-full bg-white rounded-lg border-1 border-[#E9EBED] px-1">
            {remainingTime.minutes}
          </div>
        </div>
        <div className="text-[#A3A3A3] text-xs mt-1">M</div>
      </div>
      <div className="relative">
        <div className="absolute left-0 top-3 h-16 w-16">
          <Divider
            orientation="vertical"
            className=" w-[1px] h-[3px] bg-[#636469]"
          />
        </div>
      </div>
      <div className=" max-w-[38px] mx-2">
        <div className="flex min-w-[30px]">
          <div className="w-full bg-white rounded-lg border-1 border-[#E9EBED] px-1">
            {remainingTime.seconds}
          </div>
        </div>
        <div className="text-[#A3A3A3] text-xs mt-1">S</div>
      </div>
    </div>
  );
}
