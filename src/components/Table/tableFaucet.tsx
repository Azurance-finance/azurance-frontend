import React, { useMemo, useState } from "react";
import { columnsToken } from "@/constants/mockTableData";
import { formatFiatNumber, formatDecimal } from "@/utils/formatNumber";
import { Button, useDisclosure } from "@nextui-org/react";
import { ArrowDownTrayIcon, PlusIcon } from "@heroicons/react/24/outline";
import StakeModal from "../Modal/StakeModal";
import { Search } from "../Search/search";
import { IToken } from "../../../types/token";

export default function TableFaucet({ dataTable }: any) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [search, setSearch] = useState("");

  const [isDisable, setIsDisable] = useState(false);
  const [tokensList, setTokensList] = useState(dataTable);

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
                        {formatDecimal(1652)}
                      </div>
                      <div className="text-[#A3A3A3] text-xs">
                        {formatFiatNumber(1652)}
                      </div>
                    </td>

                    <td className="text-center px-4  ">
                      <div className="flex justify-center">
                        <div className="px-1">
                          <Button
                            className={`w-30 px-4 border-1 ${
                              isDisable
                                ? "bg-[#EAEBEF] text-[#BCBEC9] border-[#EAEBEF]"
                                : "bg-[#0052FF] text-white border-[#0052FF]"
                            }`}
                            onClick={onOpen}
                            isDisabled={isDisable}
                          >
                            <ArrowDownTrayIcon
                              width={16}
                              height={16}
                              color={`${isDisable ? "#BCBEC9" : "#FFFFFF"}`}
                            />
                            Faucet
                          </Button>
                        </div>
                        <div className="px-1">
                          <Button
                            className={`w-36 px-4 border-1 ${
                              isDisable
                                ? "bg-[#EAEBEF] text-[#BCBEC9] border-[#EAEBEF]"
                                : "bg-[#0052FF] text-white border-[#0052FF]"
                            }`}
                            onClick={onOpen}
                            isDisabled={isDisable}
                          >
                            <PlusIcon
                              width={16}
                              height={16}
                              color={`${isDisable ? "#BCBEC9" : "#FFFFFF"}`}
                            />
                            Add to wallet
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