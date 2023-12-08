import { WalletType } from "@/store/wallet/wallet.type";

export const mappingWalletIconPath = (walletType: WalletType) => {
  switch (walletType) {
    case WalletType.cometh:
      return "/wallet/cometh.svg";
    case WalletType.metamask:
      return "/wallet/metamask.svg";
    case WalletType.safe:
      return "/wallet/safe.svg";
    default:
      return "/";
  }
};
