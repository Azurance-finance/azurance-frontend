import { ethers } from "ethers";

export const getContract = (
  contractAddress: `0x${string}`,
  abi: ethers.ContractInterface,
  provider: ethers.Signer | ethers.providers.Provider
) => new ethers.Contract(contractAddress, abi, provider);
