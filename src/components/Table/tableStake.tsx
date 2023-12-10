import React, { useCallback, useEffect, useMemo, useState } from "react";
import { columnsStake } from "@/constants/mockTableData";
import { formatDecimal } from "@/utils/formatNumber";
import { AzuranceSelcet } from "./AzuranceSelect";
import { Button, useDisclosure } from "@nextui-org/react";
import { StarIcon } from "@heroicons/react/24/outline";
import { useFavoriteStore } from "@/store/favorite/favorite.store";
import StakeModal from "../Modal/StakeModal";
import { tabClaimSelect } from "@/constants/select.constant";
import { WalletIcon } from "../../../public/icons/WalletIcon";
import TimeRemine from "../TimeRemine/timeRemine";
import { Search } from "../Search/search";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "@/utils/firebaseStorage";
import { useInsurances } from "@/hooks/insurance.hook";
import { useWalletStore } from "@/store/wallet/wallet.store";
import { InsuranceType } from "@/store/insurance/insurance.type";
import { ethers } from "ethers";
import { StarIconSolid } from "../../../public/icons/StarIconSolid";
import { useProvider } from "@/hooks/provider.hook";
import tokenContractService from "@/services/contracts/mintableTokenContract.service";
import { STATES } from "@/constants/state.constant";

export default function TableStake() {

  const [filter, setFilter] = useState("Ongoing");
  const isDisable = false;

  const { provider } = useProvider();
  const { insurances: insuranceList, fetchInsurances } = useInsurances(100, 0, filter);

  const { currentChainId, walletAddress } = useWalletStore();
  const { favorites, addFavorite, removeFavorite } = useFavoriteStore();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [search, setSearch] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [buyerBalances, setBuyerBalances] = useState<number[]>([]);
  const [sellerBalances, setSellerBalances] = useState<number[]>([]);

  const selectedInsurance = insuranceList ? insuranceList[selectedIndex] : null;

  // TODO: Fix logo image template 
  const getDownloadURLWithBackup = useCallback(async (chainId: string, address: string) => {
    try {
      return await getDownloadURL(ref(storage, `files/${chainId}-${address}.png`));
    } catch (e) {
      return `/insurances/AIA.png`
    }
  }, []);

  useEffect(() => {
    fetchInsurances();
  }, [filter]);

  useEffect(() => {
    const promises = insuranceList.map(insurance => getDownloadURLWithBackup(currentChainId, insurance.id));
    Promise.all(promises).then(result => setImageUrls(result))
  }, [insuranceList, currentChainId]);

  useEffect(() => {

    (async () => {
      if (provider) {

        const promises = insuranceList.map(async item => {
          const sellerBalance = await tokenContractService.getBalance(item.sellerToken.id, provider, walletAddress);
          const buyerBalance = await tokenContractService.getBalance(item.buyerToken.id, provider, walletAddress);

          return {
            sellerBalance,
            buyerBalance
          }
        });

        const result = await Promise.all(promises);
        setBuyerBalances(result.map(item => +item.buyerBalance));
        setSellerBalances(result.map(item => +item.sellerBalance));

      }

    })()

  }, [walletAddress, insuranceList, provider]);

  const data = useMemo(() => {
    if (search) {
      const filtered = insuranceList.filter(
        (obj: InsuranceType) =>
          obj.name.toLowerCase().includes(search.toLowerCase()) ||
          obj.symbol.toLowerCase().includes(search.toLowerCase())
      );
      return filtered;
    }
    return insuranceList;
  }, [search, insuranceList]);

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
    onOpen();
  }

  const renderFavorite = (id: string) => {
    if (favorites.find((item) => item.id === id)) {
      return <StarIconSolid />;
    } else {
      return <StarIcon width={24} />;
    }
  };

  const handleFavorite = (insurance: InsuranceType) => {
    if (!favorites.includes(insurance)) {
      addFavorite(insurance);
    } else {
      removeFavorite(insurance);
    }
  };

  const getBuyerBalance = (index: number) => {
    return buyerBalances[index] || 0;
  }

  const getSellerBalance = (index: number) => {
    return sellerBalances[index] || 0;
  }

  const getSellerShare = (index: number) => {
    const insurance = insuranceList[index];
    return Number(ethers.utils.formatEther(insurance.sellerShares))
  }

  const getBuyerShare = (index: number) => {
    const insurance = insuranceList[index];
    return Number(ethers.utils.formatEther(insurance.buyerShares))
  }

  const getMultiplier = (index: number) => {
    const insurance = insuranceList[index];
    return Number(ethers.utils.formatUnits(insurance.multiplier, insurance.multiplierDecimals));
  }

  const getTotalValue = (index: number) => {
    const insurance = insuranceList[index];
    return Number(ethers.utils.formatUnits(insurance.totalValue, insurance.underlyingToken.decimals));
  }

  const calculateWithdrawableAmount = (index: number) => {
    const insurance = insuranceList[index];

    const multiplier = getMultiplier(index);
    const totalValue = getTotalValue(index);

    let totalBuyShare = getBuyerShare(index);
    let totalSellShare = getSellerShare(index);

    if (insurance.status === STATES.CLAIMABLE ) {
      totalBuyShare = totalBuyShare * multiplier;
      totalSellShare = totalSellShare / multiplier;
    } else if (insurance.status === STATES.MATURED) {
      totalBuyShare = totalBuyShare / multiplier;
      totalSellShare = totalSellShare * multiplier;
    }

    const totalShare = totalBuyShare + totalSellShare;

    const totalBuyerValue = totalShare === 0 ? 0 : totalBuyShare * totalValue / totalShare;
    const totalSellerValue = totalShare === 0 ? 0 : totalSellShare * totalValue / totalShare;

    const buyerValue = totalBuyShare === 0 ? 0 : getBuyerBalance(index) * totalBuyerValue / totalBuyShare;
    const sellerValue = totalSellShare === 0 ? 0 : getSellerBalance(index) * totalSellerValue / totalSellShare;

    return { buyerValue, sellerValue }
  }

  return (
    <div className="bg-white w-full mt-5 rounded-xl ">
      <div className="flex items-center justify-between p-4">
        <div>
          <AzuranceSelcet
            tabSelect={tabClaimSelect}
            filter={filter}
            setFilter={setFilter}
          />
        </div>
        <Search search={search} setSearch={setSearch} />
      </div>
      <table className="table-auto w-full">
        <thead className="bg-gray-100 text-gray-600 h-14 font-bold text-xs text-center uppercase">
          <tr>
            {columnsStake.map((column, index) => (
              <td
                key={column.field}
                width={column.width}
                className={`${column.field === "claimDate" ? "text-center" : "text-start"
                  } ${index === 0 && "pl-5"}`}
              >
                {column.headerName}
              </td>
            ))}
            <td width="" className="text-center">
              Action
            </td>
          </tr>
        </thead>
        <tbody className="text-center">
          {data?.length
            ? data
              .sort((a: InsuranceType, b: InsuranceType) => {
                return b.createdAt - a.createdAt;
              })
              .map((item: InsuranceType, index: number) => (
                <tr
                  key={index}
                  className={`${index !== data.length - 1 && `border-b `
                    } h-[95px] text-gray-600 rounded-none hover:bg-gray-50 cursor-pointer`}
                >
                  <td className="text-start pl-5">
                    <div className="flex">
                      <picture className="flex items-center">
                        <img
                          src={imageUrls[index] || "/insurances/AIA.png"}
                          width="36px"
                          height="36px"
                          alt="logo-chain"
                        />
                      </picture>
                      <div className="text-start ml-2">
                        <div className="text-sm font-semibold text-[#0F1419]">
                          {item.name}
                        </div>
                        <div className="max-w-[30px] text-[10px] bg-[#E5E5E6] rounded text-center py-[2px]">
                          {item.symbol}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="text-start">
                    <div className="flex">
                      <picture>
                        <img
                          src={`/tokens/${item.underlyingToken.symbol}.png`}
                          width="36px"
                          height="36px"
                          alt="logo-chain"
                        />
                      </picture>
                      <div className="text-start ml-2">
                        <div className="text-sm font-semibold">
                          {item.underlyingToken.name}
                        </div>
                        <div className="max-w-[30px] text-[12px] text-[#A3A3A3] text-start">
                          {item.underlyingToken.symbol}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="text-start">
                    <div className="text-[#0F1419] text-sm">
                      {formatDecimal(getBuyerBalance(index))}
                    </div>
                    <div className="text-[#A3A3A3] text-xs">
                      {formatDecimal(calculateWithdrawableAmount(index).buyerValue)} {item.underlyingToken.symbol}
                    </div>
                  </td>

                  <td className="text-start">
                    <div className="text-[#0F1419] text-sm">
                      {formatDecimal(getSellerBalance(index))}
                    </div>
                    <div className="text-[#A3A3A3] text-xs">
                      {formatDecimal(calculateWithdrawableAmount(index).sellerValue)} {item.underlyingToken.symbol}
                    </div>
                  </td>
                  <td>
                    <div className="flex flex-col justify-center items-center my-auto ">
                      <TimeRemine type="stake" timeData={item.maturityTime} />
                    </div>
                  </td>
                  <td className="text-start px-4 ">
                    <div className="flex">
                      <div className="px-1">
                        <Button
                          className={`w-24 px-4 border-1 ${isDisable
                            ? "bg-[#EAEBEF] text-[#BCBEC9] border-[#EAEBEF]"
                            : "bg-[#0052FF] text-white border-[#0052FF]"
                            }`}
                          onClick={onOpen}
                          isDisabled={isDisable}
                        >
                          <WalletIcon
                            color={`${isDisable ? "#BCBEC9" : "#FFFFFF"}`}
                          />
                          Claim
                        </Button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
      {
        selectedInsurance && (
          <StakeModal
            isOpen={isOpen}
            insurance={selectedInsurance}
            header="Buy"
            onOpenChange={onOpenChange}
            onInsuranceUpdate={fetchInsurances}
          />
        )
      }
    </div>
  );
}
