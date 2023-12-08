export enum WalletType {
  metamask = "metamask",
  safe = "safe",
  cometh = "cometh",
  none = "none",
}

export interface IWalletState {
  walletType: WalletType;
  walletAddress: string;
  currentChainId: string;
  ownerId: string;

  setOwnerId(ownerId: string): void;
  setWalletType: (walletType: WalletType) => void;
  setWalletAddress: (walletAddress: string) => void;
  setCurrentChainId: (currentChain: string) => void;
  resetState: () => void;
}
