import React from "react";
export const WalletIcon = ({
  strokeWidth = 1.5,
  color = "#0052FF",
  ...otherProps
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      d="M14 8V4.66667H3.33333C2.97971 4.66667 2.64057 4.52619 2.39052 4.27614C2.14048 4.02609 2 3.68696 2 3.33333C2 2.97971 2.14048 2.64057 2.39052 2.39052C2.64057 2.14048 2.97971 2 3.33333 2H12.6667V4.66667"
      stroke={color}
      stroke-width="1.2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M2 3.33331V12.6666C2 13.0203 2.14048 13.3594 2.39052 13.6095C2.64057 13.8595 2.97971 14 3.33333 14H14V10.6666"
      stroke={color}
      stroke-width="1.2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M11.9993 8C11.6457 8 11.3066 8.14048 11.0565 8.39052C10.8065 8.64057 10.666 8.97971 10.666 9.33333C10.666 9.68696 10.8065 10.0261 11.0565 10.2761C11.3066 10.5262 11.6457 10.6667 11.9993 10.6667H14.666V8H11.9993Z"
      stroke={color}
      stroke-width="1.2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
