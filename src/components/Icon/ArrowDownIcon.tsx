import React from "react";
type ArrowDownIconTypes = {
  className: string;
  strokeWidth: string;
};
const ArrowDownIcon = ({ className, strokeWidth }: ArrowDownIconTypes) => {
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
        d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75"
      />
    </svg>
  );
};

export default ArrowDownIcon;
