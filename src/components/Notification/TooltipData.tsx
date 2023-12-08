import { Divider, Slider } from "@nextui-org/react";
import React from "react";
type TooltipDataTypes = {
  percent: number;
};
const TooltipData = ({ percent }: TooltipDataTypes) => {
  return (
    <div className=" w-[260px] p-2">
      <div className="flex justify-between text-sm text-[#A3A3A3] font-bold">
        <p>Percentage</p>
        <p className=" text-[#0F1419] text-sm font-bold">{percent}%</p>
      </div>
      <Slider
        aria-label="Player progress"
        color="primary"
        hideThumb={true}
        value={percent}
        className="w-full my-1"
        size="sm"
      />
      <div className="flex justify-between">
        <div className="flex">
          <div className=" w-3 h-3 rounded-[2px] bg-[#0052FF] mr-1" />
          <p className=" text-xs font-medium text-[#A3A3A3]">Total Buyer</p>
        </div>
        <div className=" text-[#0F1419] text-xs font-medium">
          392,584,520.15
        </div>
      </div>
      <Divider className="my-2" />
      <div className="flex justify-between">
        <div className="flex">
          <div className=" w-3 h-3 rounded-[2px] bg-[#F4F4F5] mr-1" />
          <p className=" text-xs font-medium text-[#A3A3A3]">Total Seller</p>
        </div>
        <div className=" text-[#0F1419] text-xs font-medium">
          392,584,520.15
        </div>
      </div>
    </div>
  );
};

export default TooltipData;
