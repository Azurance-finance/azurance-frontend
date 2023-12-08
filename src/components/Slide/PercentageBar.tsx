import React from "react";
import { Slider, Tooltip } from "@nextui-org/react";
import { UserIcon } from "@heroicons/react/24/solid";
import TooltipData from "../Notification/TooltipData";

const PercentageBar = () => {
  const [value, setValue] = React.useState<number>(25.3);
  return (
    <div>
      <div className="flex">
        <UserIcon width={16} height={16} className="my-auto text-[#0052FF]" />
        <p className=" text-sm font-bold text-[#0052FF] my-auto ml-1">
          {value}%
        </p>
      </div>
      <Tooltip
        showArrow={true}
        content={<TooltipData percent={value} />}
        placement="bottom"
      >
        <Slider
          aria-label="Player progress"
          color="primary"
          hideThumb={true}
          value={value}
          className="max-w-[140px]"
          size="sm"
        />
      </Tooltip>
    </div>
  );
};

export default PercentageBar;
