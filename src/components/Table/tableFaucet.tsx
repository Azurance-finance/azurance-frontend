import React, { useCallback, useEffect, useMemo, useState } from "react";
import { columnsToken } from "@/constants/mockTableData";
import { formatFiatNumber, formatDecimal } from "@/utils/formatNumber";
import { Button, useDisclosure } from "@nextui-org/react";
import { ArrowDownTrayIcon, PlusIcon } from "@heroicons/react/24/outline";
import StakeModal from "../Modal/StakeModal";
import { Search } from "../Search/search";
import { IToken } from "../../../types/token";
import FaucetModal from "../Modal/FaucetModal";
import { useProvider } from "@/hooks/provider.hook";
import tokenContractService from "@/services/contracts/tokenContract.service";
import { useWalletStore } from "@/store/wallet/wallet.store";
import { formatEther } from "ethers/lib/utils";
import { ethers } from "ethers";
import axios from "axios";
import { ADDRESS_FROM_API } from "@/constants/addressTokenETH.constant";

export default function TableFaucet({ dataTable }: any) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [balance, setBalance] = useState<string[]>([]);
  const { walletAddress } = useWalletStore();

  const [isAdding, setIsAdding] = useState(false);
  const [token, setToken] = useState<string>("");

  const [search, setSearch] = useState("");

  const [isDisable, setIsDisable] = useState(false);
  const [tokensList, setTokensList] = useState(dataTable);
  const { provider } = useProvider();

  const data = useMemo(() => {
    if (search) {
      const filtered = tokensList.filter(
        (obj: IToken) =>
          obj.tokenName.toLowerCase().includes(search.toLowerCase()) ||
          obj.tokenSymbol.toLowerCase().includes(search.toLowerCase())
      );
      return filtered;
    }
    return tokensList;
  }, [search, tokensList]);
  
  const handleAddFaucet = async (token: IToken) => {
    setIsAdding(true);
    try {
      if (window.ethereum) {
        await window.ethereum.request({
          method: "wallet_watchAsset",
          params: {
            type: "ERC20",
            options: {
              address: token.tokenAddress,
              symbol: token.tokenSymbol,
              decimals: token.tokenDecimal,
              image: token.tokenLogo,
            },
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
    setIsAdding(false);
  };
  const getDownloadURLWithBackup = useCallback(
    async (tokenAddr: string, provider: ethers.providers.Web3Provider) => {
      try {
        return await tokenContractService.getBalance(
          tokenAddr,
          provider,
          walletAddress
        );
      } catch (e) {
        console.log(e);
      }
    },
    []
  );

  useEffect(() => {
    (async () => {
      if (provider) {
        const promises = tokensList.map((tokenAddr: any) =>
          tokenContractService.getBalance(
            tokenAddr.tokenAddress,
            provider,
            walletAddress
          )
        );
        Promise.all(promises).then((result) => setBalance(result));
      }
    })();
  }, [tokensList, provider, walletAddress]);
  const [addr, setAddr] = useState<string[]>([]);

  const getExchangeData = async (addressToken: string) => {
    try {
      const res = await axios.get(
        `https://api.diadata.org/v1/assetQuotation/Ethereum/${addressToken}`
      );
      return res.data.Price;
    } catch (error) {
      console.error("Error fetching :", error);
      return null;
    }
  };
  const checkSymbolToFetch = (symbol: string) => {
    if (symbol === "USDT") {
      return ADDRESS_FROM_API?.USDT;
    } else if (symbol === "DAI") {
      return ADDRESS_FROM_API?.DAI;
    } else if (symbol === "WETH") {
      return ADDRESS_FROM_API?.WETH;
    }
  };
  useEffect(() => {
    const dataList = tokensList?.map((tokenAddr: any) => {
      const addrToken = checkSymbolToFetch(tokenAddr.tokenSymbol);
      if (addrToken) {
        return getExchangeData(addrToken);
      }
    });

    Promise.all(dataList).then((result) => setAddr(result));
  }, [tokensList]);

  return (
    <div className="bg-white w-full mt-5 rounded-xl ">
      <div className="flex items-center justify-end p-4">
        <Search search={search} setSearch={setSearch} />
      </div>
      <table className="table-auto w-full">
        <thead className="bg-gray-100 text-gray-600 h-14 font-bold text-xs text-center uppercase ">
          <tr>
            {columnsToken.map((column, index) => (
              <td
                key={column.field}
                width={column.width}
                className={`text-start pl-16`}
              >
                {column.headerName}
              </td>
            ))}
            <td width="40%" className="text-center">
              Action
            </td>
          </tr>
        </thead>
        <tbody className="text-center">
          {data?.length
            ? data
                .sort((a: any, b: any) => {
                  return a.id - b.id;
                })
                .map((item: IToken, index: number) => (
                  <tr
                    key={index}
                    className={`${
                      index !== data.length - 1 && `border-b `
                    } h-[95px] text-gray-600 rounded-none hover:bg-gray-50 cursor-pointer`}
                    onClick={() => {
                      // router.push(`/file?oid=${data.id}`);
                    }}
                  >
                    <td className="text-center pl-16">
                      <div className="flex">
                        <picture className="flex items-center">
                          <img
                            src={item.tokenLogo}
                            width="36px"
                            height="36px"
                            className="rounded-full"
                            alt="logo-chain"
                          />
                        </picture>
                        <div className="text-start ml-2">
                          <div className="text-sm font-semibold text-[#0F1419]">
                            {item.tokenName}
                          </div>
                          <div className="max-w-[30px] text-[10px] bg-[#E5E5E6] rounded text-center py-[2px]">
                            {item.tokenSymbol}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="text-start pl-16">
                      <div className="text-[#0F1419] text-sm">
                        {balance[index]}
                      </div>
                      <div className="text-[#A3A3A3] text-xs">
                        {formatFiatNumber(
                          Number(addr[index]) * Number(balance[index])
                        )}
                      </div>
                    </td>

                    <td className="text-center px-4  ">
                      <div className="flex justify-center">
                        <div className="px-1">
                          <Button
                            isLoading={isAdding}
                            className={`w-30 px-4 text-sm font-semibold border-1 ${
                              isDisable
                                ? "bg-[#EAEBEF] text-[#BCBEC9] border-[#EAEBEF]"
                                : "bg-white text-[#0F1419] border-[#D0D5DD]"
                            }`}
                            onClick={() => handleAddFaucet(item)}
                            isDisabled={isDisable}
                          >
                            <PlusIcon width={16} height={16} />
                            Add token
                          </Button>
                        </div>
                        <div className="px-1">
                          <Button
                            className={`w-30 px-4 border-1 text-sm ${
                              isDisable
                                ? "bg-[#EAEBEF] text-[#BCBEC9] border-[#EAEBEF]"
                                : "bg-[#0052FF] text-white border-[#0052FF]"
                            }`}
                            onClick={() => {
                              setToken(item.tokenName);
                              onOpen();
                            }}
                            isDisabled={isDisable}
                          >
                            <ArrowDownTrayIcon width={16} height={16} />
                            Faucet
                          </Button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
            : null}
        </tbody>
      </table>
      <FaucetModal
        isOpen={isOpen}
        header="Faucet"
        onOpenChange={onOpenChange}
        token={token}
      />
    </div>
  );
}
