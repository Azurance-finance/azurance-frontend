import React, { useCallback, useEffect, useMemo, useState } from "react";
import { columnsInsurance } from "@/constants/mockTableData";
import { formatDecimal } from "@/utils/formatNumber";
import PercentageBar from "../Slide/PercentageBar";
import { AzuranceSelcet } from "./AzuranceSelect";
import { Button, Tooltip, useDisclosure } from "@nextui-org/react";
import { StarIconSolid } from "../../../public/icons/StarIconSolid";
import { ArrowDownTrayIcon, StarIcon } from "@heroicons/react/24/outline";
import { useFavoriteStore } from "@/store/favorite/favorite.store";
import { tabSelect } from "@/constants/select.constant";
import TimeRemine from "../TimeRemine/timeRemine";
import { Search } from "../Search/search";
import DepositModal from "../Modal/DepositModal";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "@/utils/firebaseStorage";
import { InsuranceType } from "@/store/insurance/insurance.type";
import { useWalletStore } from "@/store/wallet/wallet.store";
import { ethers } from "ethers";
import { useInsurances } from "@/hooks/insurance.hook";
import TooltipData from "../Notification/TooltipData";

export default function TableInsurance() {
  const [filter, setFilter] = useState("Ongoing");
  const { insurances: insuranceList, fetchInsurances } = useInsurances(
    100,
    0,
    filter
  );

  const { currentChainId } = useWalletStore();
  const { favorites, addFavorite, removeFavorite } = useFavoriteStore();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [isDisable, setIsDisable] = useState(false);
  const [search, setSearch] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectedInsurance = insuranceList ? insuranceList[selectedIndex] : null;

  const getDownloadURLWithBackup = useCallback(
    async (chainId: string, address: string) => {
      try {
        return await getDownloadURL(
          ref(storage, `files/${chainId}-${address}.png`)
        );
      } catch (e) {
        return `/insurances/AIA.png`;
      }
    },
    []
  );

  useEffect(() => {
    fetchInsurances();
  }, [filter]);

  useEffect(() => {
    const promises = insuranceList.map((insurance) =>
      getDownloadURLWithBackup(currentChainId, insurance.id)
    );
    Promise.all(promises).then((result) => setImageUrls(result));
  }, [insuranceList, currentChainId]);

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
  };

  const handleFavorite = (insurance: InsuranceType) => {
    if (!favorites.includes(insurance)) {
      addFavorite(insurance);
    } else {
      removeFavorite(insurance);
    }
  };

  const renderFavorite = (id: string) => {
    if (favorites.find((item) => item.id === id)) {
      return <StarIconSolid />;
    } else {
      return <StarIcon width={24} />;
    }
  };

  const getSellerShare = (index: number) => {
    const insurance = insuranceList[index];
    return Number(ethers.utils.formatEther(insurance.sellerShares));
  };

  const getBuyerShare = (index: number) => {
    const insurance = insuranceList[index];
    return Number(ethers.utils.formatEther(insurance.buyerShares));
  };

  const getMultiplier = (index: number) => {
    const insurance = insuranceList[index];
    return Number(
      ethers.utils.formatUnits(
        insurance.multiplier,
        insurance.multiplierDecimals
      )
    );
  };

  const getUtilization = (index: number) => {
    const sellerShare = getSellerShare(index);
    const buyerShare = getBuyerShare(index);
    const multiplier = getMultiplier(index);
    if (sellerShare === 0) return 0;
    return ((buyerShare * multiplier) / sellerShare) * 100;
  };

  const calculateInsuranceAPR = (index: number) => {
    const insurance = insuranceList[index];

    const totalValue = Number(ethers.utils.formatEther(insurance.totalValue));
    if (totalValue === 0) return 0;

    const sellerShare = getSellerShare(index);
    const buyerShare = getBuyerShare(index);
    const multiplier = Number(
      ethers.utils.formatUnits(
        insurance.multiplier,
        insurance.multiplierDecimals
      )
    );

    const adjustedSellerShare = sellerShare * multiplier;
    const adjustedBuyerShare = buyerShare / multiplier;
    const adjustedTotalShare = adjustedSellerShare + adjustedBuyerShare;
    const sellerValue = (adjustedSellerShare * totalValue) / adjustedTotalShare;
    return ((sellerValue - sellerShare) / sellerShare) * 100;
  };

  return (
    <div className="bg-white w-full mt-5 rounded-xl">
      <div className="flex items-center justify-between p-4">
        <div>
          <AzuranceSelcet
            tabSelect={tabSelect}
            filter={filter}
            setFilter={setFilter}
          />
        </div>
        <Search search={search} setSearch={setSearch} />
      </div>
      <table className="table-auto w-full">
        <thead className="bg-gray-100 text-gray-600 h-14 font-bold text-xs text-center uppercase">
          <tr>
            <td width="6%" className="pl-5">
              <span className="hidden">Favorite</span>
            </td>
            {columnsInsurance.map((column) => (
              <td
                key={column.field}
                width={column.width}
                className={`${
                  column.field === "expiration" ? "text-center" : "text-start"
                }`}
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
                    className={`${
                      index !== data.length - 1 && `border-b `
                    } h-[95px] text-gray-600 rounded-none hover:bg-gray-50`}
                  >
                    <td>
                      <div
                        className="flex w-full justify-center items-center"
                        onClick={() => {
                          handleFavorite(item);
                        }}
                      >
                        {renderFavorite(item.id)}
                      </div>
                    </td>
                    <td className="text-start">
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
                    {/*TODO: Add tooltip saying. The APR presents the APR upon maturity. If the insurance is claimable by buyers, loss may occurs. Proceed with your caution.*/}
                    <td className="text-start text-[#0F1419]">
                      {formatDecimal(calculateInsuranceAPR(index), 0, 2)}%
                      <Tooltip
                        showArrow={true}
                        content={
                          <div>
                            The APR presents the APR upon maturity. If the
                            insurance is claimable by buyers, loss may occurs.
                            Proceed with your caution.
                          </div>
                        }
                        placement="bottom"
                      ></Tooltip>
                    </td>
                    <td className="text-start  text-[#0F1419]">
                      {formatDecimal(getSellerShare(index))}{" "}
                      {item.underlyingToken.symbol}
                    </td>
                    {/*TODO: Add tooltip saying. Utilization reflect how much liquidity is allocated by buyers. It can be calculated as "buyer * multiplier / seller"*/}
                    <td className="text-start">
                      <PercentageBar
                        utilization={getUtilization(index)}
                        totalBuyer={getBuyerShare(index)}
                        totalSeller={getSellerShare(index)}
                      />
                    </td>
                    <td>
                      <div className="flex flex-col justify-center items-center my-auto ">
                        <TimeRemine timeData={item.maturityTime} />
                      </div>
                    </td>
                    <td className="text-start px-4">
                      <Button
                        className={`w-30 px-4 text-xs font-semibold border-1 ${
                          isDisable
                            ? "bg-[#EAEBEF] text-[#BCBEC9] border-[#EAEBEF]"
                            : "bg-white text-[#0F1419] border-[#D0D5DD]"
                        }`}
                        onClick={() => handleSelect(index)}
                        isDisabled={isDisable}
                      >
                        <ArrowDownTrayIcon width={16} height={16} />
                        Deposit
                      </Button>
                    </td>
                  </tr>
                ))
            : null}
        </tbody>
      </table>
      {selectedInsurance && (
        <DepositModal
          onOpenChange={onOpenChange}
          onInsuranceUpdate={() => {
            fetchInsurances();
            onClose();
          }}
          isOpen={isOpen}
          insurance={selectedInsurance}
        />
      )}
    </div>
  );
}
