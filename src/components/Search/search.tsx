import React, { SetStateAction } from "react";
import { SearchIcon } from "../../../public/icons/SearchIcon";

interface SearchProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export function Search({ search, setSearch }: SearchProps) {
  const handleChange = (e: any) => {
    setSearch(e?.target?.value);
  };
  return (
    <div className="flex items-center bg-gray-100 rounded-lg p-2.5">
      <SearchIcon className=" text-xl text-gray-400" />
      <input
        className="focus:outline-none bg-gray-100 pr-20 ml-1 "
        placeholder="Search by name or symbol"
        value={search}
        onChange={handleChange}
      />
    </div>
  );
}
