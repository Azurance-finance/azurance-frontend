import PlusIcon from "@/components/Icon/PlusIcon";
import { Button } from "@nextui-org/react";
import React from "react";
type CreateInsuranceTypes = {
  onOpen: () => void;
};
const CreateInsurance = ({ onOpen }: CreateInsuranceTypes) => {
  return (
    <Button
      onClick={onOpen}
      color="primary"
      className=" rounded-[12px] px-4 py-[10px] text-sm "
      startContent={<PlusIcon />}
    >
      Create Insurance
    </Button>
  );
};

export default CreateInsurance;
