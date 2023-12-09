import { AZURANCE_FACTORY_ABI } from "@/constants/abis/azuranceFactory.abi";
import { CONTRACT_ADDRESS } from "@/constants/address.constant";
import { ethers } from "ethers";

const azuranceFactoryContract = (
  contractAddress: string,
  provider: ethers.Signer | ethers.providers.Provider
) => {
  return new ethers.Contract(contractAddress, AZURANCE_FACTORY_ABI, provider);
};

const createAzuranceContract = async (
  contractAddress: string,
  provider: ethers.Signer | ethers.providers.Provider,
  multiplier: number | ethers.BigNumber,
  maturityBlock: number | ethers.BigNumber,
  staleBlock: number | ethers.BigNumber,
  asset: string,
  fee: number | ethers.BigNumber,
  feeTo: string,
  condition: string,
  name: string,
  symbol: string
) => {
  const contract = azuranceFactoryContract(contractAddress, provider);
  const tx = await contract.createAzuranceContract(
    multiplier,
    maturityBlock,
    staleBlock,
    asset,
    fee,
    feeTo,
    condition,
    name,
    symbol
  );
  await tx.wait();
  return tx;
};

const azuranceFactoryContractService = {
  azuranceFactoryContract,
  createAzuranceContract,
};
export default azuranceFactoryContractService;
