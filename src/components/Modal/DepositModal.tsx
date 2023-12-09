import { tokens } from "@/constants/token";
import { useProvider } from "@/hooks/provider.hook";
import azurancePoolContractService from "@/services/contracts/azurancePoolContract";
import tokenContractService from "@/services/contracts/tokenContract.service";
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
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
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
  token: string,
  tokenAddress: string,
  outputToken: string,
  pool: string
};
const DepositModal = ({ isOpen, onOpenChange, token, tokenAddress, outputToken, pool }: DepositModalTypes) => {
  const [amount, setAmount] = useState("");
  const [availableAmount, setAvailableAmount] = useState(0);
  const [allowance, setAllowance] = useState(0);
  const [loading, setLoading] = useState(false);

  const { provider } = useProvider();

  useEffect(() => {

    (async () => {
      if (provider) {
        const signer = provider?.getSigner();
        const address = await signer.getAddress();

        const balance = await tokenContractService.getBalance(tokenAddress, provider, address);
        const allowance = await tokenContractService.getAllowance(tokenAddress, provider, address, pool);
        setAvailableAmount(+balance);
        setAllowance(+allowance)
      }
    })()

  }, [tokenAddress, provider]);

  const handleApprove = async () => {
    setLoading(true);
    if (provider) {
      try {
        const signer = provider?.getSigner();
        await tokenContractService.approve(tokenAddress, signer, pool, ethers.constants.MaxUint256);
        setAllowance(Infinity);
      } catch (e) {
        console.error(e);
      }
    }
    setLoading(false);
  }

  const handleUnlockMaturity = async () => {
    setLoading(true);
    if (provider) {
      try {
        const signer = provider?.getSigner();
        await azurancePoolContractService.unlockMaturity(pool, signer);
        // TODO: Update state to unlock maturity
        // Close modal after unlock
        // Fetch data update
      } catch (e) {
        console.error(e);
      }
    }
    setLoading(false);
  }

  const handleSellInsurance = async () => {
    setLoading(true);
    if (provider) {
      try {
        const signer = provider?.getSigner();
        await azurancePoolContractService.sellInsurance(pool, signer, ethers.utils.parseEther(amount));
      } catch (e) {
        console.error(e)
      }
    }
    setLoading(false);
  }

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
                placeholder={token}
                variant="bordered"
                size="lg"
                radius="sm"
                classNames={triggerStyle}
                isDisabled
                value={token}
                disabled
                startContent={
                  token && (
                    <picture>
                      <img
                        src={`tokens/${token.toUpperCase()}.png`}
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
                {token}
              </div>

              <div className=" border-1 border-[#E9EBED] rounded p-3 flex flex-col space-y-3">
                {/* <div className=" flex justify-between">
                  <p className="text-[#A3A3A3] font-medium text-sm">
                    Exchange Rate
                  </p>
                  <p className="text-[#0F1419] font-medium text-sm">
                    1 {isToken} = $ 1
                  </p>
                </div> */}
                {/* <div className=" flex justify-between">
                  <p className="text-[#A3A3A3] font-medium text-sm">
                    Network fee
                  </p>
                  <p className="text-[#0F1419] font-medium text-sm">3.80%</p>
                </div> */}
                <div className=" flex justify-between">
                  <p className="text-[#A3A3A3] font-medium text-sm">
                    You will receive
                  </p>
                  <p className="text-[#0F1419] font-medium text-sm">
                    0 {outputToken}
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
                isLoading={loading}
                onClick={allowance > +amount ? handleSellInsurance : handleApprove}
              >
                {allowance > +amount ? "Deposit" : "Approve"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default DepositModal;
