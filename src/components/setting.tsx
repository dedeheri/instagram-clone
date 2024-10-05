import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import MenuIcon from "./svg/menu-icon";
import { Button } from "./ui/button";
import SunIcon from "./svg/sun-icon";

import { useTheme } from "next-themes";
import { signOut } from "next-auth/react";

interface ISetting {
  collapase: boolean;
}

const Setting = ({ collapase }: ISetting) => {
  const { setTheme, theme } = useTheme();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="flex justify-start px-3 group items-center space-x-4 h-12 dark:hover:bg-[#1a1a1a] rounded-lg w-full"
        >
          <MenuIcon className="fixed group-hover:size-[1.6rem] size-6 duration-300" />
          <p
            className={`text-lg font-normal p-7 lg:block hidden ${
              collapase ? "!hidden" : "block"
            }`}
          >
            Lainnya
          </p>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-2 w-[266px] bg-white dark:bg-[#262626]  mb-2 -ml-10 h-[110px] rounded-2xl border shadow relative">
        <div>
          <Button
            onClick={() =>
              theme === "dark" ? setTheme("light") : setTheme("dark")
            }
            variant="ghost"
            className="space-x-4 w-full flex
           justify-start h-11"
          >
            <SunIcon />
            <p className="text-md font-normal">Ubah tampilan</p>
          </Button>

          <Button
            onClick={() => signOut()}
            variant="ghost"
            className="space-x-4 w-full flex
           justify-start h-11"
          >
            <p className="text-md font-normal">Keluar</p>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Setting;
