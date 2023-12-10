import React, { useEffect, useState } from "react";
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
import { STATES } from "@/constants/state.constant";

type WithdrawModalTypes = {
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

const WithdrawModal = ({
  isOpen,
  header,
  insurance,
  description,
  onOpenChange,
  onInsuranceUpdate,
  onClose,
}: WithdrawModalTypes) => {

  const [buyerAmount, setBuyerAmount] = React.useState("0");
  const [avlBuyerAmount, setAvlBuyerAmount] = useState(0);
  const [buyerAllowance, setBuyerAllowance] = useState(0);

  const [sellerAmount, setSellerAmount] = React.useState("0");
  const [avlSellerAmount, setAvlSellerAmount] = useState(0);
  const [sellerAllowance, setSellerAllowance] = useState(0);

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

        const buyerBal = await tokenContractService.getBalance(
          insurance.buyerToken.id,
          provider,
          address
        );
        const buyerAllow = await tokenContractService.getAllowance(
          insurance.buyerToken.id,
          provider,
          address,
          insurance.id
        );

        const sellerBal = await tokenContractService.getBalance(
          insurance.sellerToken.id,
          provider,
          address
        );
        const sellerAllow = await tokenContractService.getAllowance(
          insurance.sellerToken.id,
          provider,
          address,
          insurance.id
        );

        setAvlBuyerAmount(+buyerBal);
        setBuyerAllowance(+buyerAllow);

        setAvlSellerAmount(+sellerBal);
        setSellerAllowance(+sellerAllow);
      }
    })();
  }, [insurance, provider]);

  const handleBuy = async () => {
    setLoading(true);
    if (provider) {
      try {
        if (buyerAllowance < +buyerAmount) {
          await handleApprove('buyer');
        } else if (sellerAllowance < +sellerAmount) {
          await handleApprove('seller');
        } else {
          await handleWithdraw();
        }
      } catch (e) {
        console.error(e);
      }
    }
    setLoading(false);
  };

  const handleApprove = async (label: 'buyer' | 'seller') => {
    if (provider) {
      try {
        const tokenAddress = label === 'buyer' ? insurance.buyerToken.id : insurance.sellerToken.id;
        const signer = provider?.getSigner();
        await tokenContractService.approve(
          tokenAddress,
          signer,
          insurance.id,
          ethers.constants.MaxUint256
        );
        if (label === 'buyer') {
          setBuyerAllowance(Infinity)
        } else if (label === 'seller') {
          setSellerAllowance(Infinity)
        }
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

  const handleWithdraw = async () => {
    if (provider) {
      try {
        const signer = provider?.getSigner();
        await azurancePoolContractService.withdraw(
          insurance.id,
          signer,
          ethers.utils.parseEther(buyerAmount),
          ethers.utils.parseEther(sellerAmount),
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

  const getMultiplier = () => {
    return Number(
      ethers.utils.formatUnits(
        insurance.multiplier,
        insurance.multiplierDecimals
      )
    );
  };

  const getTotalValue = () => {
    return Number(
      ethers.utils.formatUnits(
        insurance.totalValue,
        insurance.underlyingToken.decimals
      )
    );
  };

  const getSellerShare = () => {
    return Number(ethers.utils.formatEther(insurance.sellerShares));
  };

  const getBuyerShare = () => {
    return Number(ethers.utils.formatEther(insurance.buyerShares));
  };

  const calculateWithdrawableAmount = () => {
    const multiplier = getMultiplier();
    const totalValue = getTotalValue();

    let totalBuyShare = getBuyerShare();
    let totalSellShare = getSellerShare();

    let adjustedBuyShare = totalBuyShare;
    let adjustedSellShare = totalSellShare;

    if (insurance.status === STATES.CLAIMABLE) {
      adjustedBuyShare = totalBuyShare * multiplier;
      adjustedSellShare = totalSellShare / multiplier;
    } else if (insurance.status === STATES.MATURED) {
      adjustedBuyShare = totalBuyShare / multiplier;
      adjustedSellShare = totalSellShare * multiplier;
    }

    const totalShare = adjustedBuyShare + adjustedSellShare;

    const totalBuyerValue =
      totalShare === 0 ? 0 : (adjustedBuyShare * totalValue) / totalShare;
    const totalSellerValue =
      totalShare === 0 ? 0 : (adjustedSellShare * totalValue) / totalShare;

    const buyerValue =
      totalBuyShare === 0
        ? 0
        : (+buyerAmount * totalBuyerValue) / totalBuyShare;
    const sellerValue =
      totalSellShare === 0
        ? 0
        : (+sellerAmount * totalSellerValue) / totalSellShare;

    return { buyerValue, sellerValue, total: buyerValue + sellerValue };
  };

  const getButtonMessage = () => {
    if (buyerAllowance < +buyerAmount) {
      return "Approve Buyer Token";
    } else if (sellerAllowance < +sellerAmount) {
      return "Approve Seller Token";
    } else {
      return "Withdraw";
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

                <div>
                  <Input
                    key="outside"
                    size="lg"
                    radius="sm"
                    variant="bordered"
                    label={`Buyer token`}
                    labelPlacement="outside"
                    placeholder="Enter amount"
                    endContent={
                      <div className="flex">
                        <div className="my-auto text-[#0052FF] text-xs font-semibold">
                          MAX
                        </div>
                        <Divider className="w-[1px] h-5 mx-2 my-auto" />
                        <div className="flex justify-end w-28">
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
                      </div>
                    }
                    classNames={borderedStyle}
                    type="number"
                    value={buyerAmount}
                    onValueChange={setBuyerAmount}
                  />
                  <div className="absolute right-6 top-0.5 text-xs font-normal">
                    Available: {avlBuyerAmount.toFixed(2)} {' '} {insurance.buyerToken.symbol}
                  </div>
                </div>

                <div className="relative">
                  <Input
                    key="outside"
                    size="lg"
                    radius="sm"
                    variant="bordered"
                    label={`Seller token`}
                    labelPlacement="outside"
                    placeholder="Enter amount"
                    endContent={
                      <div className="flex">
                        <div className="my-auto text-[#0052FF] text-xs font-semibold">
                          MAX
                        </div>
                        <Divider className="w-[1px] h-5 mx-2 my-auto" />
                        <div className="flex justify-end w-28">
                          <picture>
                            <img
                              src={imageUrl as string}
                              alt="logo-token"
                              width={20}
                              height={20}
                            />
                          </picture>
                          <div className=" text-[#0F1419] text-sm font-normal pl-2">
                            {insurance.sellerToken.symbol}
                          </div>
                        </div>
                      </div>
                    }
                    classNames={borderedStyle}
                    type="number"
                    value={sellerAmount}
                    onValueChange={setSellerAmount}
                  />
                  <div className="absolute right-0 top-0 text-xs font-normal">
                    Available: {avlSellerAmount.toFixed(2)} {' '} {insurance.sellerToken.symbol}
                  </div>
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
                  label="You will receive"
                  labelPlacement="outside"
                  placeholder="--"
                  endContent={
                    <div className="flex justify-end w-52">
                      <picture>
                        <img
                          src={`/tokens/${insurance.underlyingToken.symbol}.png`}
                          alt="logo-token"
                          width={20}
                          height={20}
                        />
                      </picture>
                      <div className=" text-[#0F1419] text-sm font-normal pl-2">
                        {insurance.underlyingToken.symbol}
                      </div>
                    </div>
                  }
                  classNames={borderedStyle}
                  type="number"
                  value={formatDecimal(calculateWithdrawableAmount().total)}
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
                  {/* <div
                    className="flex justify-center cursor-pointer mt-2"
                    onClick={handleCheckUnlockClaim}
                  >
                    <p className="text-[#A3A3A3] font-medium  text-xs">
                      You can request for claim by clicking here
                    </p>
                  </div> */}
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <StatusModal
        isOpen={isOpenBuyModal}
        isLoading={false}
        onOpenChange={onOpenChangeBuy}
        isFooter={false}
        title="Withdraw successfully"
        description={`You have received ${formatDecimal(calculateWithdrawableAmount().total)} ${insurance.underlyingToken.symbol}`}
      />
      <StatusModal
        isOpen={isOpenUnlockModal}
        isLoading={false}
        onOpenChange={onOpenChangeUnlock}
        isFooter={true}
        title="Your liquidity has expired"
        description="Your liquidity has been expired. Please refresh to the Claim page for claim token."
      />
    </>
  );
};

export default WithdrawModal;
