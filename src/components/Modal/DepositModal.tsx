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
  Select,
  SelectItem,
} from "@nextui-org/react";
import React, { useState } from "react";
const borderedStyle = {
  inputWrapper: `border-1 border-[#D0D5DD]`,
  label: `text-[#5B616E] text-sm font-normal`,
};
const triggerStyle = {
  trigger: `border-1 border-[#D0D5DD]`,
  label: `text-[#808080] text-sm font-normal`,
};

type DepositModalTypes = {
  isOpen: boolean;
  onOpenChange: () => void;
};
const DepositModal = ({ isOpen, onOpenChange }: DepositModalTypes) => {
  const [amount, setAmount] = useState("");
  const [isToken, setIsToken] = useState("USDT");
  const availableAmount = 5323.123343;

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h1 className=" text-lg font-semibold text-[#0F1419] py-2">
                Deposit
              </h1>
            </ModalHeader>
            <Divider className="mb-2" />
            <ModalBody className=" relative space-y-2">
              <Select
                labelPlacement="outside"
                label="Token"
                placeholder="Select a token"
                variant="bordered"
                size="lg"
                radius="sm"
                classNames={triggerStyle}
                value={isToken}
                onChange={(e) => {
                  setIsToken(e.target.value);
                }}
                defaultSelectedKeys={[isToken]}
                startContent={
                  isToken && (
                    <picture>
                      <img
                        src={`tokens/${isToken.toUpperCase()}.png`}
                        width={24}
                        height={24}
                        alt=""
                        className="mr-2"
                      />
                    </picture>
                  )
                }
              >
                {tokens.map((token, index) => (
                  <SelectItem
                    key={token.tokenSymbol}
                    value={token.tokenSymbol}
                    startContent={
                      <picture>
                        <img
                          src={token.logo}
                          width={24}
                          height={24}
                          alt=""
                          className="mr-2"
                        />
                      </picture>
                    }
                  >
                    {token.tokenSymbol}
                  </SelectItem>
                ))}
              </Select>
              <Input
                key="outside"
                size="lg"
                radius="sm"
                variant="bordered"
                label="Amount"
                labelPlacement="outside"
                placeholder="Enter amount"
                classNames={borderedStyle}
                type="number"
                value={amount}
                onValueChange={setAmount}
                className="pt-6"
              />
              <div className="absolute right-6 top-0.5 text-xs font-normal">
                Available: {availableAmount.toFixed(2)}
                {isToken}
              </div>

              <div className=" border-1 border-[#E9EBED] rounded p-3 flex flex-col space-y-3">
                <div className=" flex justify-between">
                  <p className="text-[#A3A3A3] font-medium text-sm">
                    Exchange Rate
                  </p>
                  <p className="text-[#0F1419] font-medium text-sm">
                    1 {isToken} = $ 1
                  </p>
                </div>
                <div className=" flex justify-between">
                  <p className="text-[#A3A3A3] font-medium text-sm">
                    Network fee
                  </p>
                  <p className="text-[#0F1419] font-medium text-sm">3.80%</p>
                </div>
                <div className=" flex justify-between">
                  <p className="text-[#A3A3A3] font-medium text-sm">
                    You will receive
                  </p>
                  <p className="text-[#0F1419] font-medium text-sm">
                    0 {isToken}
                  </p>
                </div>
              </div>
            </ModalBody>
            <ModalFooter className="mt-6">
              <Button
                // onClick={() => {
                //   onOpenStack();
                // }}
                color="primary"
                className="w-full"
              >
                Deposit
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default DepositModal;
