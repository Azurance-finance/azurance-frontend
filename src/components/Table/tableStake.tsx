import React, { useEffect, useMemo, useState } from "react";
import { SearchIcon } from "../../../public/icons/SearchIcon";
import { columnsStake } from "@/constants/mockTableData";
import { formatFiatNumber, formatDecimal } from "@/utils/formatNumber";
import { AzuranceSelcet } from "./AzuranceSelect";
import { Button, useDisclosure } from "@nextui-org/react";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { useFavoriteStore } from "@/store/favorite/favorite.store";
import StakeModal from "../Modal/StakeModal";
import { tabSelect } from "@/constants/select.constant";
import { WalletIcon } from "../../../public/icons/WalletIcon";
import TimeRemine from "../TimeRemine/timeRemine";
import { IAzurance } from "../../../types/azurance";
import { Search } from "../Search/search";

export default function TableStake({ dataTable }: any) {
  const { favorites, addFavorite, removeFavorite } = useFavoriteStore();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isTabs, setIstabs] = useState(
    tabSelect.filter((tab) => tab.value !== "Watchlist")
  );
  const [search, setSearch] = useState("");

  const [isDisable, setIsDisable] = useState(false);
  const [filter, setFilter] = useState("Ongoing");
  const [insuranceList, setInsuranceList] = useState(dataTable);

  useEffect(() => {
    if (filter === "Watchlist") {
      setInsuranceList(favorites as any);
    } else {
      setInsuranceList(dataTable);
    }
  }, [filter]);

  const data = useMemo(() => {
    if (search) {
      const filtered = insuranceList.filter(
        (obj: IAzurance) =>
          obj.insuranceName.toLowerCase().includes(search.toLowerCase()) ||
          obj.symbol.toLowerCase().includes(search.toLowerCase())
      );
      return filtered;
    }
    return insuranceList;
  }, [search, insuranceList]);

  return (
    <div className="bg-white w-full mt-5 rounded-xl ">
      <div className="flex items-center justify-between p-4">
        <div>
          <AzuranceSelcet
            tabSelect={isTabs}
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
                className={`${
                  column.field === "claimDate" ? "text-center" : "text-start"
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
                .sort((a: any, b: any) => {
                  return a.id - b.id;
                })
                .map((item: any, index: number) => (
                  <tr
                    key={index}
                    className={`${
                      index !== data.length - 1 && `border-b `
                    } h-[95px] text-gray-600 rounded-none hover:bg-gray-50 cursor-pointer`}
                    onClick={() => {
                      // router.push(`/file?oid=${data.id}`);
                    }}
                  >
                    <td className="text-start pl-5">
                      <div className="flex">
                        <picture className="flex items-center">
                          <img
                            src={item.logo}
                            width="36px"
                            height="36px"
                            alt="logo-chain"
                          />
                        </picture>
                        <div className="text-start ml-2">
                          <div className="text-sm font-semibold text-[#0F1419]">
                            {item.insuranceName}
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
                            src={item.tokenLogo}
                            width="36px"
                            height="36px"
                            alt="logo-chain"
                          />
                        </picture>
                        <div className="text-start ml-2">
                          <div className="text-sm font-semibold">
                            {item.token}
                          </div>
                          <div className="max-w-[30px] text-[12px] text-[#A3A3A3] text-start">
                            {item.tokenSymbol}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="text-start">
                      <div className="text-[#0F1419] text-sm">
                        {formatDecimal(item.balance)}
                      </div>
                      <div className="text-[#A3A3A3] text-xs">
                        {formatFiatNumber(item.balance)}
                      </div>
                    </td>

                    <td className="text-start">
                      <div className="text-[#0F1419] text-sm">
                        {formatDecimal(item.balance)}
                      </div>
                      <div className="text-[#A3A3A3] text-xs">
                        {formatFiatNumber(item.balance)}
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-col justify-center items-center my-auto ">
                        <TimeRemine type="stake" timeData={1702701987} />
                      </div>
                    </td>
                    <td className="text-start px-4 ">
                      <div className="flex">
                        <div className="px-1">
                          <Button
                            className={`w-24 px-4 border-1 ${
                              isDisable
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
      <StakeModal
        onOpenChange={onOpenChange}
        isOpen={isOpen}
        token1="DAI"
        token2="sDAI"
        header="Claim"
        description="After you successfully submit your ETH claim request
your ETH will be frozen in your wallet, and you will be
able to receive rewards."
      />
    </div>
  );
}
