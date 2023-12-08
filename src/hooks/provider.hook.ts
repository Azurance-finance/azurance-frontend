import { useWalletStore } from "@/store/wallet/wallet.store";
import { useCometh } from "./cometh.hook";
import { WalletType } from "@/store/wallet/wallet.type";
import { useMemo } from "react";
import { useMetaMask } from "./metamask.hook";

export const useProvider = () => {
  const { walletType, resetState } = useWalletStore();
  const {
    comethProvider,
    signOut: comethSignOut,
    instance: comethInfo,
  } = useCometh();
  const {
    provider: metaMaskProvider,
    disconnect: metaMaskDisconnect,
    connecting,
  } = useMetaMask();

  const set = useMemo(() => {
    switch (walletType) {
      case WalletType.cometh:
        return {
          provider: comethProvider,
          disconnect: () => {
            comethSignOut();
            resetState();
          },
        };
      case WalletType.metamask:
        return {
          provider: metaMaskProvider,
          disconnect: () => {
            metaMaskDisconnect();
            resetState();
          },
        };
      default:
        return { provider: null, disconnect: () => {} };
    }
  }, [
    comethProvider,
    comethSignOut,
    metaMaskDisconnect,
    metaMaskProvider,
    resetState,
    walletType,
  ]);

  return { ...set };
};
