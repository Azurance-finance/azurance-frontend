import React from "react";
type ChevronLeftIconTypes = {
  className: string;
  strokeWidth: string;
};

const ChevronLeftIcon = ({ className, strokeWidth }: ChevronLeftIconTypes) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width={strokeWidth}
      stroke="currentColor"
      className={className}
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M15.75 19.5L8.25 12l7.5-7.5"
      />
    </svg>
  );
};

export default ChevronLeftIcon;
