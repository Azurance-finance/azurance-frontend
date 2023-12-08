import React from "react";
type NotiIconTypes = {
  color: string;
};

const NotiIcon = ({ color }: NotiIconTypes) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
    >
      <path
        d="M10.5 7.5V10.625M18 10C18 10.9849 17.806 11.9602 17.4291 12.8701C17.0522 13.7801 16.4997 14.6069 15.8033 15.3033C15.1069 15.9997 14.2801 16.5522 13.3701 16.9291C12.4602 17.306 11.4849 17.5 10.5 17.5C9.51509 17.5 8.53982 17.306 7.62987 16.9291C6.71993 16.5522 5.89314 15.9997 5.1967 15.3033C4.50026 14.6069 3.94781 13.7801 3.5709 12.8701C3.19399 11.9602 3 10.9849 3 10C3 8.01088 3.79018 6.10322 5.1967 4.6967C6.60322 3.29018 8.51088 2.5 10.5 2.5C12.4891 2.5 14.3968 3.29018 15.8033 4.6967C17.2098 6.10322 18 8.01088 18 10ZM10.5 13.125H10.5067V13.1317H10.5V13.125Z"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default NotiIcon;
