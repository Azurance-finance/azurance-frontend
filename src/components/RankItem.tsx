import { truncateAddress } from "@/utils/formatString";
import React from "react";

interface IProps {
  rank: number;
  name: string;
  address: string;
  value: number;
  symbol: string;
}

export default function RankItem(props: IProps) {
  return (
    <div className="w-full flex items-center border-b pb-1">
      <div className="mr-5 text-sm text-gray-400">{props.rank}</div>
      <div className="flex flex-col">
        <div className="text-sm font-medium">{props.name}</div>
        <div className="text-gray-400 text-xs">
          {truncateAddress(props.address)}
        </div>
      </div>
      <div className="ml-auto font-medium">
        {props.value} {props.symbol}
      </div>
    </div>
  );
}
