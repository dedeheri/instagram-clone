import React from "react";
import { Search } from "./search";
import HeartIcon from "./svg/heart-icon";
import Link from "next/link";
import IgIcon from "./svg/ig-icon";

const Header = () => {
  return (
    <header className="h-14 border-b  md:hidden  flex  justify-between items-center px-2">
      <Link href={"/"}>
        <IgIcon />
      </Link>
      <div className="flex space-x-3">
        <Search />
        <button>
          <HeartIcon />
        </button>
      </div>
    </header>
  );
};

export default Header;
