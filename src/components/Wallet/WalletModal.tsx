import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@nextui-org/react";
import Image from "next/image";
import WalletSelector from "./WalletSelector";
import { WalletType } from "@/store/wallet/wallet.type";
import { useCallback, useEffect, useState } from "react";
import { useCometh } from "@/hooks/cometh.hook";
import { useWalletStore } from "@/store/wallet/wallet.store";
import { useMetaMask } from "@/hooks/metamask.hook";

interface IWalletModal {
  isOpen: boolean;
  onOpenChange: () => void;
}

export default function WalletModal({ isOpen, onOpenChange }: IWalletModal) {
  // const [isCometh, setIsCometh] = useState(false);
  const { walletAddress } = useWalletStore();
  const [walletAddressInput, setWalletAddressInput] = useState(
    walletAddress || ""
  );
  // const { signIn, signUp, isSuccesss, setIsSuccess, isLoading } = useCometh();
  const { connect } = useMetaMask();

  const walletContent = useCallback(
    (onClose: () => void) => {
      const walletList = [
        {
          label: "Metamask",
          type: WalletType.metamask,
          icon: "/wallet/metamask.svg",
          function: () => connect(),
        },
        // {
        //   label: "Safe",
        //   type: WalletType.safe,
        //   icon: "/wallet/safe.svg",
        //   function: () => {},
        // },
        // {
        //   label: "Cometh",
        //   type: WalletType.cometh,
        //   icon: "/wallet/cometh.svg",
        //   function: () => setIsCometh(true),
        // },
      ];
      // if (isCometh)
      //   return (
      //     <>
      //       <ModalHeader className="flex items-center space-x-3">
      //         <Image
      //           src="/logo/cometh.svg"
      //           alt="Cometh Logo"
      //           width="90"
      //           height="30"
      //         />
      //       </ModalHeader>
      //       <ModalBody>
      //         <h1 className="font-semibold text-2xl">Continue with Cometh</h1>
      //         <p className="font-normal text-sm text-[#475467]">
      //           Please enter your wallet address
      //         </p>
      //         <Input
      //           variant="bordered"
      //           size="md"
      //           type="text"
      //           color="primary"
      //           label="Wallet Address"
      //           placeholder="Enter your wallet address"
      //           value={walletAddressInput}
      //           onChange={(e) => setWalletAddressInput(e.target.value)}
      //           disabled={isLoading}
      //         />

      //         <Button
      //           onPress={() => signIn(walletAddressInput as `0x${string}`)}
      //           color="primary"
      //           className="text-white font-semibold py-3"
      //           disabled={isLoading}
      //         >
      //           {isLoading ? <Spinner color="default" /> : "Continue"}
      //         </Button>
      //         <div className="flex items-center space-x-3 color-[#EFEFEF] text-[#A3A3A3] py-6">
      //           <hr className="w-full" />
      //           <p className="text-sm font-medium">OR</p>
      //           <hr className="w-full" />
      //         </div>
      //         <Button
      //           onPress={() => signUp()}
      //           className="bg-white border-1 border-[#EFEFEF] font-semibold py-3"
      //           disabled={isLoading}
      //         >
      //           {isLoading ? <Spinner color="default" /> : "Create new Wallet"}
      //         </Button>
      //       </ModalBody>
      //     </>
      //   );
      // else
      return (
        <>
          <ModalHeader className="flex items-center space-x-3">
            <Image
              src="/azurance-logo.png"
              alt="Shout Logo"
              width={121}
              height={32}
            />
            {/* <p className="text-[#0F1419] font-bold text-base ml-3">
                Azurance
              </p> */}
          </ModalHeader>
          <ModalBody className=" my-5 ">
            <h1 className="font-semibold text-[#0F1419] text-2xl">
              Connect Wallet
            </h1>
            <p className="font-normal text-sm text-[#5B616E] pb-4">
              Choose how you want to connect. There are several wallet
              providers.
              <span className="text-[#0052FF] ml-1">Sign in another way</span>
            </p>
            <WalletSelector walletList={walletList} onClose={onClose} />
          </ModalBody>
          <ModalFooter className="flex justify-center">
            <p className="text-sm text-[#5B616E]">
              What is a wallet ?{" "}
              <span className="text-[#0052FF] font-semibold cursor-pointer">
                Learn about wallets
              </span>
            </p>
          </ModalFooter>
        </>
      );
    },
    [walletAddressInput, connect]
  );

  // useEffect(() => {
  //   if (isOpen) setIsCometh(false);
  // }, [isOpen]);
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={true}>
      <ModalContent className="px-3 py-8">
        {(onClose) => {
          // isSuccesss && !isLoading && (onClose(), setIsSuccess(false));
          return walletContent(onClose);
        }}
      </ModalContent>
    </Modal>
  );
}
