import { Tooltip } from "@nextui-org/react";
import React from "react";
type TooltipWarning = {
  children: React.ReactNode;
  description: string;
};
const TooltipWarning = ({ children, description }: TooltipWarning) => {
  return (
    <Tooltip
      showArrow={true}
      content={<div className=" w-[240px] p-2">{description}</div>}
      placement="bottom"
    >
      {children}
    </Tooltip>
  );
};

export default TooltipWarning;
