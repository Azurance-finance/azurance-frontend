import React from "react";
type TitleDescriptionTypes = {
  title: string;
  description: string;
};
const TitleDescription = ({ description, title }: TitleDescriptionTypes) => {
  return (
    <div>
      <p className=" text-xl font-bold text-[#0F1419]">{title}</p>
      <p className="  text-sm font-normal text-[#9C9D9E] py-1">{description}</p>
    </div>
  );
};

export default TitleDescription;
