import React, { useState } from "react";
import CreateInsurance from "./components/CreateInsurance";
import TitleDescription from "./components/TitleDescription";

import { useDisclosure } from "@nextui-org/react";
import CreateInsuranceModal from "../Modal/CreateInsuranceModal";
import PercentageBar from "../Slide/PercentageBar";
type TopBannerTypes = {
  title: string;
  description: string;
  isCreateInsurance: boolean;
};
const TopBanner = ({
  title,
  description,
  isCreateInsurance,
}: TopBannerTypes) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div>
      <div className="flex justify-between py-10">
        <TitleDescription title={title} description={description} />
        {isCreateInsurance && (
          <div className="my-auto">
            <CreateInsurance onOpen={onOpen} />
          </div>
        )}

        <CreateInsuranceModal isOpen={isOpen} onOpenChange={onOpenChange} />
      </div>
    </div>
  );
};

export default TopBanner;
