import { CONTRACT_ADDRESS } from "@/constants/address.constant";
import { tokens } from "@/constants/token";
import { useProvider } from "@/hooks/provider.hook";
import tokenContractService from "@/services/contracts/mintableTokenContract.service";
import { useWalletStore } from "@/store/wallet/wallet.store";
import {
  Button,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { parseEther } from "ethers/lib/utils";
import React, { useState } from "react";

type FaucetModalTypes = {
  isOpen: boolean;
  header: string;
  token: string;
  onOpenChange: () => void;
};
const borderedStyle = {
  inputWrapper: `border-1 border-[#D0D5DD]`,
  label: `text-[#5B616E] text-sm font-medium`,
};
const FaucetModal = ({
  onOpenChange,
  isOpen,
  token,
  header,
}: FaucetModalTypes) => {
  const [amount, setAmount] = useState("");
  const { walletAddress, currentChainId } = useWalletStore();
  const { provider } = useProvider();
  const [isLoading, setIsLoading] = useState(false);
  const handleMint = async () => {
    setIsLoading(true);
    try {
      if (provider) {
        const signer = provider.getSigner();
        const contractAddress = CONTRACT_ADDRESS[currentChainId][`${token}`];
        await tokenContractService.mint(
          contractAddress,
          signer,
          walletAddress as string,
          parseEther(amount)
        );
      }
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h1 className=" text-lg font-semibold text-[#0F1419] py-2">
                {header}
              </h1>
            </ModalHeader>
            <Divider />
            <ModalBody className=" py-6">
              <Input
                key="outside"
                size="lg"
                radius="sm"
                variant="bordered"
                label="Token"
                labelPlacement="outside"
                placeholder="0"
                classNames={borderedStyle}
                value={token}
                startContent={
                  <picture>
                    <img
                      src={`/tokens/${token.toUpperCase()}.png`}
                      width={24}
                      height={24}
                      alt=""
                      className="mr-2"
                    />
                  </picture>
                }
              />
              <Input
                key="outside"
                size="lg"
                radius="sm"
                variant="bordered"
                label="Amount"
                labelPlacement="outside"
                placeholder="0"
                classNames={borderedStyle}
                type="number"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
              />
            </ModalBody>
            <ModalFooter className=" text-center pb-6">
              <Button
                isLoading={isLoading}
                onPress={handleMint}
                color="primary"
                className="w-full"
              >
                Faucet
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default FaucetModal;
