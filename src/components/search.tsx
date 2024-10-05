import React from "react";
import SearchIcon from "./svg/search-icon";

export const Search = () => {
  return (
    <div className="h-9 w-[268px] bg-[#efefef] dark:bg-[#262626] flex items-center px-3 rounded-lg space-x-3">
      <SearchIcon className="size-5 text-neutral-500" />
      <input className="w-full outline-none bg-transparent" />
    </div>
  );
};
