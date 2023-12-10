import { tokens } from "@/constants/token";
import { useProvider } from "@/hooks/provider.hook";
import azurancePoolContractService from "@/services/contracts/azurancePoolContract";
import tokenContractService from "@/services/contracts/tokenContract.service";
import { InsuranceType } from "@/store/insurance/insurance.type";
import { formatDecimal } from "@/utils/formatNumber";
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
  useDisclosure,
} from "@nextui-org/react";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import NotiSolidIcon from "../Icon/NotiSolidIcon";
import StatusModal from "./StatusModal";
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
  insurance: InsuranceType;
  description?: string;
  onOpenChange: () => void;
  onInsuranceUpdate: () => void;
  onClose: () => void;
};
const DepositModal = ({
  isOpen,
  insurance,
  description,
  onOpenChange,
  onInsuranceUpdate,
  onClose,
}: DepositModalTypes) => {
  const [amount, setAmount] = useState("");
  const [availableAmount, setAvailableAmount] = useState(0);
  const [allowance, setAllowance] = useState(0);
  const [loading, setLoading] = useState(false);
  const {
    onOpen: onOpenDeposit,
    onOpenChange: onOpenChangeDeposit,
    isOpen: isOpenDepositModal,
  } = useDisclosure();
  const {
    onOpen: onOpenUnlock,
    onOpenChange: onOpenChangeUnlock,
    isOpen: isOpenUnlockModal,
  } = useDisclosure();
  const { provider } = useProvider();

  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");
  const [modalLoading, setModalLoading] = useState(false);

  const now = Math.round(new Date().valueOf() / 1000);

  useEffect(() => {
    (async () => {
      if (provider) {
        const signer = provider?.getSigner();
        const address = await signer.getAddress();

        const balance = await tokenContractService.getBalance(
          insurance.underlyingToken.id,
          provider,
          address
        );
        const allowance = await tokenContractService.getAllowance(
          insurance.underlyingToken.id,
          provider,
          address,
          insurance.id
        );
        setAvailableAmount(+balance);
        setAllowance(+allowance);
      }
    })();
  }, [insurance, provider]);

  const handleDeposit = async () => {
    setLoading(true);
    if (provider) {
      try {
        if (now > insurance.maturityTime) {
          await handleUnlockMaturity();
        } else if (now > insurance.staleTime) {
        } else if (allowance <= +amount) {
          await handleApprove();
        } else {
          await handleSellInsurance();
        }
      } catch (e) {
        console.error(e);
      }
    }
    setLoading(false);
  };

  const handleApprove = async () => {
    if (provider) {
      try {
        const signer = provider?.getSigner();
        await tokenContractService.approve(
          insurance.underlyingToken.id,
          signer,
          insurance.id,
          ethers.constants.MaxUint256
        );
        setAllowance(Infinity);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleUnlockMaturity = async () => {
    if (provider) {
      try {
        const signer = provider?.getSigner();
        await azurancePoolContractService.unlockMaturity(insurance.id, signer);
        onInsuranceUpdate();
        onOpenUnlock();
        onClose();
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleSellInsurance = async () => {
    if (provider) {
      try {
        const signer = provider?.getSigner();
        await azurancePoolContractService.sellInsurance(
          insurance.id,
          signer,
          ethers.utils.parseEther(amount)
        );
        onInsuranceUpdate();
        onOpenDeposit();
        onClose();
      } catch (e) {
        console.error(e);
      }
    }
  };

  const getButtonMessage = () => {
    if (now > insurance.maturityTime) {
      return "Unlock";
    } else if (now > insurance.staleTime) {
      return "Deposit ended";
    } else if (allowance <= +amount) {
      return "Approve";
    } else {
      return "Deposit";
    }
  };

  const calculateShare = () => {
    const totalShares = +ethers.utils.formatEther(insurance.totalShares);
    const totalValue = +ethers.utils.formatEther(insurance.totalValue);
    if (totalShares === 0) {
      return +amount;
    } else {
      return (+amount * totalShares) / totalValue;
    }
  };

  return (
    <>
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
                  placeholder={insurance.underlyingToken.symbol}
                  variant="bordered"
                  size="lg"
                  radius="sm"
                  classNames={triggerStyle}
                  isDisabled
                  value={insurance.underlyingToken.symbol}
                  disabled
                  startContent={
                    insurance.underlyingToken.symbol && (
                      <picture>
                        <img
                          src={`tokens/${insurance.underlyingToken.symbol.toUpperCase()}.png`}
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
                  {insurance.underlyingToken.symbol}
                </div>

                {description && (
                  <div className=" bg-[#F1F5FD] rounded p-3 flex">
                    <div>
                      <NotiSolidIcon />
                    </div>
                    <p className=" text-sm font-normal text-[#000] ml-2 ">
                      {description}
                    </p>
                  </div>
                )}

                <div className=" border-1 border-[#E9EBED] rounded p-3 flex flex-col space-y-3">
                  <div className=" flex justify-between">
                    <p className="text-[#A3A3A3] font-medium text-sm">
                      You will receive
                    </p>
                    <p className="text-[#0F1419] font-medium text-sm">
                      {formatDecimal(calculateShare())}{" "}
                      {insurance.sellerToken.symbol}
                    </p>
                  </div>
                </div>
              </ModalBody>

              <ModalFooter className="mt-6">
                <Button
                  color="primary"
                  className="w-full"
                  isLoading={loading}
                  disabled={
                    now > insurance.staleTime && now < insurance.maturityTime
                  }
                  onClick={handleDeposit}
                >
                  {getButtonMessage()}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <StatusModal
        isOpen={isOpenDepositModal}
        isLoading={false}
        onOpenChange={onOpenChangeDeposit}
        isFooter={false}
        title="Deposit successfully"
        description="Your azurance has been successfully deposited."
      />
      <StatusModal
        isOpen={isOpenUnlockModal}
        isLoading={modalLoading}
        onOpenChange={onOpenChangeUnlock}
        isFooter={false}
        title={modalTitle}
        description={modalContent}
      />
    </>
  );
};

export default DepositModal;
