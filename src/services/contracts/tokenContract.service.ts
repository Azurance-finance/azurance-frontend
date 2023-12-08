import { ERC20_ABI } from "@/constants/abis/erc20.abi";
import { ethers } from "ethers";

const tokenContract = (
  contractAddress: string,
  provider: ethers.Signer | ethers.providers.Provider
) => {
  return new ethers.Contract(contractAddress, ERC20_ABI, provider);
};

const getBalance = async (
  contractAddress: string,
  provider: ethers.Signer | ethers.providers.Provider,
  address: string
) => {
  const balance = await tokenContract(contractAddress, provider).balanceOf(
    address
  );
  return ethers.utils.formatUnits(balance, 18);
};

const getAllowance = async (
  contractAddress: string,
  provider: ethers.Signer | ethers.providers.Provider,
  address: string,
  spender: string
) => {
  const allowance = await tokenContract(contractAddress, provider).allowance(
    address,
    spender
  );
  return ethers.utils.formatUnits(allowance, 18);
};

const approve = async (
  contractAddress: string,
  signer: ethers.Signer,
  spender: string,
  amount: string | ethers.BigNumber
) => {
  const contract = tokenContract(contractAddress, signer);
  const tx = await contract.approve(spender, amount);
  await tx.wait();
  return tx;
};

const tokenContractService = {
  tokenContract,
  getBalance,
  getAllowance,
  approve,
};

export default tokenContractService;
