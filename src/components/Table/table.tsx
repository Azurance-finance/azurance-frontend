import React, { useEffect, useMemo, useState } from "react";
import { SearchIcon } from "../../../public/icons/SearchIcon";
import { columns } from "@/constants/mockTableData";
import { formatFiatNumber } from "@/utils/formatNumber";
import PercentageBar from "../Slide/PercentageBar";
import { AzuranceSelcet } from "./AzuranceSelect";
import { Button, useDisclosure } from "@nextui-org/react";
import { StarIconSolid } from "../../../public/icons/StarIconSolid";
import { StarIcon } from "@heroicons/react/24/outline";
import { useFavoriteStore } from "@/store/favorite/favorite.store";
import StakeModal from "../Modal/StakeModal";
import { IAzurance } from "../../../types/azurance";
import { tabSelect } from "@/constants/select.constant";
import TimeRemine from "../TimeRemine/timeRemine";
import { Search } from "../Search/search";

export default function AzuranceTable({ dataTable }: any) {
  const { favorites, addFavorite, removeFavorite } = useFavoriteStore();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [search, setSearch] = useState("");
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

  console.log({ data });

  const renderFavorite = (id: string) => {
    if (favorites.find((item) => item.id === id)) {
      return <StarIconSolid />;
    } else {
      return <StarIcon width={24} />;
    }
  };

  const handleFavorite = (insurance: IAzurance) => {
    if (!favorites.includes(insurance)) {
      addFavorite(insurance);
    } else {
      removeFavorite(insurance);
    }
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
        <thead className="bg-gray-100 text-gray-600 h-14 font-bold  text-xs text-center uppercase">
          <tr>
            <td width="6%" className="pl-5">
              <span className="hidden">Favorite</span>
            </td>
            {columns.map((column) => (
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
                            src={item.logo}
                            width="36px"
                            height="36px"
                            alt="logo-chain"
                          />
                        </picture>
                        <div className="text-start ml-2">
                          <div className="text-sm font-semibold  text-[#0F1419]">
                            {item.insuranceName}
                          </div>
                          <div className="max-w-[30px] text-[10px] bg-[#E5E5E6] rounded text-center py-[2px]">
                            {item.symbol}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="text-start  text-[#0F1419]">
                      {formatFiatNumber(Number(item.price))}
                    </td>
                    <td className="text-start  text-[#0F1419]">{item.apr}%</td>
                    <td className="text-start">
                      <PercentageBar />
                    </td>
                    <td className="text-start  text-[#0F1419]">
                      {formatFiatNumber(Number(item.totalSupply))}
                    </td>
                    <td>
                      <div className="flex flex-col justify-center items-center my-auto ">
                        <TimeRemine timeData={1702701987} />
                      </div>
                    </td>
                    <td className="text-start px-4">
                      <Button
                        color="primary"
                        className=" px-4"
                        onClick={onOpen}
                      >
                        Stake Now
                      </Button>
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
        header="Stake"
        description="Staking does not diminish your DAI balance. Both your DAI
and earned rewards can be reclaimed based on the
applicable conversion ratio at redemption."
      />
      {/* <StakeModal
        onOpenChange={onOpenChange}
        isOpen={isOpen}
        token1="DAI"
        token2="AVL"
        header="Claim"
        description="After you successfully submit your stETH claim request
your stETH will be frozen in your wallet, and you will be
able to receive rewards."
      /> */}
    </div>
  );
}
