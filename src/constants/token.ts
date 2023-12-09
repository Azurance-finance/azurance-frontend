import { CONTRACT_ADDRESS } from "./address.constant";

export const tokens = [
  {
    tokenAddress: CONTRACT_ADDRESS["0xa869"]["USDT"],
    tokenName: "USD Tether",
    tokenSymbol: "USDT",
    decimal: 18,
    logo: "/tokens/USDT.png",
  },
  {
    tokenAddress: CONTRACT_ADDRESS["0xa869"]["DAI"],
    tokenName: "Dai stablecoin",
    tokenSymbol: "DAI",
    decimal: 18,
    logo: "/tokens/DAI.png",
  },
  {
    tokenAddress: CONTRACT_ADDRESS["0xa869"]["WETH"],
    tokenName: "Wrapped Etherum",
    tokenSymbol: "WETH",
    decimal: 18,
    logo: "/tokens/WETH.png",
  },
];
