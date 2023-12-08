import { useDisclosure } from "@nextui-org/react";
import WalletButton from "./WalletButton";
import WalletModal from "./WalletModal";
import { useWalletStore } from "@/store/wallet/wallet.store";
import { WalletType } from "@/store/wallet/wallet.type";
import { useEffect, useState } from "react";
import WalletProfile from "./WalletProfile";
import ChainButton from "./ChainButton";
import { ChainModal } from "./ChainModal";

export default function WalletConnect() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isOpenChain,
    onOpen: onOpenChain,
    onOpenChange: onOpenChangeChain,
  } = useDisclosure();
  const { walletAddress, walletType } = useWalletStore();
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  if (
    domLoaded &&
    (walletAddress.length <= 0 || walletType === WalletType.none)
  )
    return (
      <>
        <WalletButton onOpen={onOpen} />
        <WalletModal isOpen={isOpen} onOpenChange={onOpenChange} />
      </>
    );
  return (
    <div className="flex space-x-3 items-center">
      <ChainButton onOpen={onOpenChain} />
      <WalletProfile />
      <ChainModal isOpen={isOpenChain} onOpenChange={onOpenChangeChain} />
    </div>
  );
}
