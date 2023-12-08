import React from "react";
import { tokens } from "@/constants/token";
import {
  Button,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import NotiSolidIcon from "../Icon/NotiSolidIcon";
import ArrowDownIcon from "../Icon/ArrowDownIcon";
import Image from "next/image";
import StatusModal from "./StatusModal";
type StakeModalTypes = {
  onOpenChange: () => void;
  header: string;
  isOpen: boolean;
  token1: string;
  token2: string;
  description: string;
};
const borderedStyle = {
  inputWrapper: `border-1 border-[#D0D5DD]`,
  label: `text-[#5B616E] text-sm font-medium`,
};

const StakeModal = ({
  isOpen,
  onOpenChange,
  token1,
  header,
  token2,
  description,
}: StakeModalTypes) => {
  const [amount, setAmount] = React.useState("");
  const {
    isOpen: isOpenStack,
    onOpen: onOpenStack,
    onOpenChange: onOpenChangeStack,
  } = useDisclosure();
  const calculateAmount = +amount * 100;
  const availableAmount = 5323.123343;
  const logoToken = tokens.filter(
    (item) => item.tokenSymbol === token1 && item.logo
  );
  const wording = header === "Claim" ? "claiming" : "stacking";

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h1 className=" text-lg font-semibold text-[#0F1419] py-2">
                  {header}
                </h1>
              </ModalHeader>
              <Divider className="mb-2" />
              <ModalBody className=" relative space-y-2">
                <Input
                  key="outside"
                  size="lg"
                  radius="sm"
                  variant="bordered"
                  label={`${header} amount`}
                  labelPlacement="outside"
                  placeholder="Enter amount"
                  endContent={
                    <div className="flex">
                      <div className="my-auto text-[#0052FF] text-xs font-semibold">
                        MAX
                      </div>
                      <Divider className="w-[1px] h-5 mx-2 my-auto" />
                      <div className="flex">
                        <Image
                          src={logoToken[0].logo}
                          alt="logo-token"
                          width={20}
                          height={20}
                        />

                        <div className=" text-[#0F1419] text-sm font-normal pl-2 pr-4">
                          {token1}
                        </div>
                      </div>
                    </div>
                  }
                  classNames={borderedStyle}
                  type="number"
                  value={amount}
                  onValueChange={setAmount}
                />
                <div className="absolute right-6 top-0.5 text-xs font-normal">
                  Available: {availableAmount.toFixed(2)}
                  {token1}
                </div>
                <div className="flex justify-center ">
                  <div className="bg-[#F5F5F5] rounded-full w-6 h-6 flex">
                    <ArrowDownIcon
                      className=" w-4 h-4 text-[#0F1419] m-auto"
                      strokeWidth="2.5"
                    />
                  </div>
                </div>
                <Input
                  key="outside"
                  size="lg"
                  radius="sm"
                  variant="bordered"
                  label="Distribute"
                  labelPlacement="outside"
                  placeholder="--"
                  endContent={
                    <div className="flex">
                      <Image
                        src={logoToken[0].logo}
                        alt="logo-token"
                        width={20}
                        height={20}
                      />

                      <div className=" text-[#0F1419] text-sm font-normal pl-2 pr-4">
                        {token2}
                      </div>
                    </div>
                  }
                  classNames={borderedStyle}
                  type="number"
                  value={calculateAmount ? String(calculateAmount) : "--"}
                />
                <div className=" bg-[#F1F5FD] rounded p-3 flex">
                  <div>
                    <NotiSolidIcon />
                  </div>
                  <p className=" text-sm font-normal text-[#000] ml-2 ">
                    {description}
                  </p>
                </div>

                <div className=" border-1 border-[#E9EBED] rounded p-3 flex flex-col space-y-3">
                  <div className=" flex justify-between">
                    <p className="text-[#A3A3A3] font-medium text-sm">
                      Exchange Rate
                    </p>
                    <p className="text-[#0F1419] font-medium text-sm">
                      1 {token1} = 1 {token2}
                    </p>
                  </div>
                  <div className=" flex justify-between">
                    <p className="text-[#A3A3A3] font-medium text-sm">
                      Reference APR
                    </p>
                    <p className="text-[#0F1419] font-medium text-sm">3.80%</p>
                  </div>
                  <div className=" flex justify-between">
                    <p className="text-[#A3A3A3] font-medium text-sm">
                      You will receive
                    </p>
                    <p className="text-[#0F1419] font-medium text-sm">
                      0 {token2}
                    </p>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  onClick={() => {
                    onOpenStack();
                    onClose();
                  }}
                  color="primary"
                  className="w-full"
                >
                  {header}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <StatusModal
        isOpen={isOpenStack}
        isLoading={false}
        title={`You are now ${wording} ${amount} ${token1}`}
        description={`${wording} ${amount} ${token1}. You will receive ${calculateAmount} ${token2}`}
        onOpenChange={onOpenChangeStack}
      />
    </>
  );
};

export default StakeModal;
