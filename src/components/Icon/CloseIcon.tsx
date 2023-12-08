import { color } from "framer-motion";
import React from "react";
type CloseIconTypes = {
  color: string;
  strokeWidth: string;
};
const CloseIcon = ({ color, strokeWidth }: CloseIconTypes) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M8 8L16 16"
        stroke={color}
        stroke-width={strokeWidth}
        stroke-linecap="round"
      />
      <path
        d="M16 8L8 16"
        stroke={color}
        stroke-width={strokeWidth}
        stroke-linecap="round"
      />
      <rect x="0.5" y="0.5" width="23" height="23" rx="4.5" stroke="white" />
    </svg>
  );
};

export default CloseIcon;
