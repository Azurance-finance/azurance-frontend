import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import { InsuranceType } from "@/store/insurance/insurance.type";
import { useProvider } from "@/hooks/provider.hook";
import { ethers } from "ethers";
import tokenContractService from "@/services/contracts/mintableTokenContract.service";
import { formatDecimal } from "@/utils/formatNumber";
import azurancePoolContractService from "@/services/contracts/azurancePoolContract";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "@/utils/firebaseStorage";
import { useWalletStore } from "@/store/wallet/wallet.store";

type StakeModalTypes = {
  header: string;
  isOpen: boolean;
  insurance: InsuranceType;
  description?: string;
  onOpenChange: () => void;
  onInsuranceUpdate: () => void;
  onClose: () => void;
};
const borderedStyle = {
  inputWrapper: `border-1 border-[#D0D5DD]`,
  label: `text-[#5B616E] text-sm font-medium`,
};

const StakeModal = ({
  isOpen,
  header,
  insurance,
  description,
  onOpenChange,
  onInsuranceUpdate,
  onClose,
}: StakeModalTypes) => {
  const [amount, setAmount] = React.useState("");
  const [availableAmount, setAvailableAmount] = useState(0);
  const [allowance, setAllowance] = useState(0);
  const wording = header === "Claim" ? "claiming" : "stacking";
  const { currentChainId } = useWalletStore();
  const [imageUrl, setImageUrls] = useState<string>();

  const [loading, setLoading] = useState(false);

  const {
    onOpen: onOpenBuy,
    onOpenChange: onOpenChangeBuy,
    isOpen: isOpenBuyModal,
  } = useDisclosure();

  const {
    isOpen: isOpenStack,
    onOpen: onOpenStack,
    onOpenChange: onOpenChangeStack,
  } = useDisclosure();
  const {
    onOpen: onOpenUnlock,
    onOpenChange: onOpenChangeUnlock,
    isOpen: isOpenUnlockModal,
  } = useDisclosure();

  const { provider } = useProvider();
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

  const handleBuy = async () => {
    setLoading(true);
    if (provider) {
      try {
        if (now > insurance.maturityTime) {
          await handleUnlockMaturity();
        } else if (now > insurance.staleTime) {
        } else if (allowance <= +amount) {
          await handleApprove();
        } else {
          await handleBuyInsurance();
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

  const handleBuyInsurance = async () => {
    if (provider) {
      try {
        const signer = provider?.getSigner();
        await azurancePoolContractService.buyInsurance(
          insurance.id,
          signer,
          ethers.utils.parseEther(amount)
        );
        onOpenStack();
        onInsuranceUpdate();
        onOpenBuy();
        onClose();
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleCheckUnlockClaim = async () => {
    if (provider) {
      try {
        const signer = provider?.getSigner();
        await azurancePoolContractService.checkUnlockClaim(
          insurance.id,
          signer
        );
        onInsuranceUpdate();
        onOpenUnlock();
        onClose();
      } catch (e) {
        console.error(e);
      }
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

  const calculateMaxDeposit = () => {
    const sellerShares = +ethers.utils.formatEther(insurance.sellerShares);
    const buyerShares = +ethers.utils.formatEther(insurance.buyerShares);
    const multiplier = +ethers.utils.formatUnits(
      insurance.multiplier,
      insurance.multiplierDecimals
    );

    return sellerShares / multiplier - buyerShares;
  };

  const getButtonMessage = () => {
    if (now > insurance.maturityTime) {
      return "Unlock";
    } else if (now > insurance.staleTime) {
      return "Sell ended";
    } else if (allowance <= +amount) {
      return "Approve";
    } else {
      return "Buy";
    }
  };

  const getDownloadURLWithBackup = async (chainId: string, address: string) => {
    try {
      const url = await getDownloadURL(
        ref(storage, `files/${chainId}-${address}.png`)
      );
      return setImageUrls(url);
    } catch (e) {
      return setImageUrls(`/insurances/AIA.png`);
    }
  };

  useEffect(() => {
    getDownloadURLWithBackup(currentChainId, insurance.id);
  }, [insurance, currentChainId]);

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
                  description={`Max deposit: ${calculateMaxDeposit()} ${
                    insurance.underlyingToken.symbol
                  }`}
                  endContent={
                    <div className="flex">
                      <div className="my-auto text-[#0052FF] text-xs font-semibold">
                        MAX
                      </div>
                      <Divider className="w-[1px] h-5 mx-2 my-auto" />
                      <div className="flex">
                        <Image
                          src={`/tokens/${insurance.underlyingToken.symbol}.png`}
                          alt="logo-token"
                          width={20}
                          height={20}
                        />

                        <div className=" text-[#0F1419] text-sm font-normal pl-2 pr-4">
                          {insurance.underlyingToken.symbol}
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
                  {insurance.underlyingToken.symbol}
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
                    <div className="flex justify-end w-52">
                      <picture>
                        <img
                          src={imageUrl as string}
                          alt="logo-token"
                          width={20}
                          height={20}
                        />
                      </picture>
                      <div className=" text-[#0F1419] text-sm font-normal pl-2">
                        {insurance.buyerToken.symbol}
                      </div>
                    </div>
                  }
                  classNames={borderedStyle}
                  type="number"
                  value={formatDecimal(calculateShare())}
                />

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
                  {/* <div className=" flex justify-between">
                    <p className="text-[#A3A3A3] font-medium text-sm">
                      Exchange Rate
                    </p>
                    <p className="text-[#0F1419] font-medium text-sm">
                      1 {token1} = 1 {token2}
                    </p>
                  </div> */}
                  <div className=" flex justify-between">
                    <p className="text-[#A3A3A3] font-medium text-sm">
                      Claimable benefit
                    </p>
                    <p className="text-[#0F1419] font-medium text-sm">
                      {formatDecimal(
                        +ethers.utils.formatUnits(
                          insurance.multiplier,
                          insurance.multiplierDecimals
                        )
                      )}
                      x
                    </p>
                  </div>
                  <div className=" flex justify-between">
                    <p className="text-[#A3A3A3] font-medium text-sm">
                      You will receive
                    </p>
                    <p className="text-[#0F1419] font-medium text-sm">
                      {formatDecimal(calculateShare())}{" "}
                      {insurance.buyerToken.symbol}
                    </p>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <div className="flex-1">
                  <Button
                    onClick={() => {
                      handleBuy();
                    }}
                    color="primary"
                    className="w-full mb-1"
                    isLoading={loading}
                  >
                    {getButtonMessage()}
                  </Button>
                  <div
                    className="flex justify-center cursor-pointer mt-2"
                    onClick={handleCheckUnlockClaim}
                  >
                    <p className="text-[#A3A3A3] font-medium  text-xs">
                      You can request for claim by clicking here
                    </p>
                  </div>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <StatusModal
        isOpen={isOpenStack}
        isLoading={false}
        title={`You have deposited ${amount} ${insurance.underlyingToken.symbol}`}
        description={`${formatDecimal(calculateShare())} ${insurance.buyerToken.symbol} is transferred to your wallet.`}
        onOpenChange={onOpenChangeStack}
        isFooter={true}
      />
      <StatusModal
        isOpen={isOpenBuyModal}
        isLoading={false}
        onOpenChange={onOpenChangeBuy}
        isFooter={false}
        title="Buy successfully"
        description="Your request has been confirmed."
      />
      <StatusModal
        isOpen={isOpenUnlockModal}
        isLoading={false}
        onOpenChange={onOpenChangeUnlock}
        isFooter={true}
        title="Your liquidity has expired"
        description="Your liquidity has been expired. Please refresh to
the Claim page for claim token."
      />
    </>
  );
};

export default StakeModal;
