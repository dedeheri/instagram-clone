"use client";

import HomeIcon from "./svg/home-icon";
import SearchSidebar from "./search-sidebar";
import Setting from "./setting";
import Link from "next/link";
import IgIcon from "./svg/ig-icon";
import { Button } from "./ui/button";
import { useState } from "react";
import IgIconSmall from "./svg/ig-icon-small";
import ExploreIcon from "./svg/explore-icon";
import ReelIcon from "./svg/reel-icon";
import HeartIcon from "./svg/heart-icon";
import PlusIcon from "./svg/plus-icon";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const sidebarItem = ({ session }: { session: any }) => {
  const [collapase, setCollapse] = useState<boolean>(false);

  return (
    <aside
      className={`fixed py-6 px-3 z-50 border-r  bg-white dark:bg-black duration-300 xl:w-[335px] lg:w-[200px] w-[70px] hidden md:block h-full ${
        collapase && "!w-[70px] border-none"
      }`}
    >
      <div className="h-14">
        <Link href={"/"}>
          {collapase ? (
            <Button
              variant="ghost"
              className="flex justify-start px-3  items-center space-x-4 h-12 dark:hover:bg-[#1a1a1a] rounded-lg w-full"
            >
              <IgIconSmall className="fixed" />
            </Button>
          ) : (
            <div className="py-4 px-3">
              <IgIcon className="hidden lg:block" />

              <IgIconSmall className="lg:hidden block" />
            </div>
          )}
        </Link>
      </div>

      <nav className="h-full">
        <div className="flex flex-col h-full justify-between  pt-7 pb-24">
          <div className="space-y-3">
            <div>
              <Link href={"/"}>
                <Button
                  variant="ghost"
                  className="flex group justify-start px-3  items-center space-x-4 h-12 dark:hover:bg-[#1a1a1a] rounded-lg w-full"
                >
                  <HomeIcon className="fixed group-hover:size-[1.6rem] size-6 duration-300" />
                  <p
                    className={`text-lg font-normal p-7 lg:block hidden ${
                      collapase ? "!hidden" : "block"
                    }`}
                  >
                    Beranda
                  </p>
                </Button>
              </Link>
            </div>
            <SearchSidebar collapase={collapase} onCollapse={setCollapse} />
            <div>
              <Link href={"/explore"}>
                <Button
                  variant="ghost"
                  className="flex group justify-start px-3  items-center space-x-4 h-12 dark:hover:bg-[#1a1a1a] rounded-lg w-full"
                >
                  <ExploreIcon className="fixed group-hover:size-[1.6rem] size-6 duration-300" />
                  <p
                    className={`text-lg font-normal p-7 lg:block hidden ${
                      collapase ? "!hidden" : "block"
                    }`}
                  >
                    Jelajahi
                  </p>
                </Button>
              </Link>
            </div>
            <div>
              <Link href={"/reels"}>
                <Button
                  variant="ghost"
                  className="flex group justify-start px-3  items-center space-x-4 h-12 dark:hover:bg-[#1a1a1a] rounded-lg w-full"
                >
                  <ReelIcon className="fixed group-hover:size-[1.6rem] size-6 duration-300" />
                  <p
                    className={`text-lg font-normal p-7 lg:block hidden ${
                      collapase ? "!hidden" : "block"
                    }`}
                  >
                    Reels
                  </p>
                </Button>
              </Link>
            </div>

            <div>
              <Link href={"/explore"}>
                <Button
                  variant="ghost"
                  className="flex group justify-start px-3  items-center space-x-4 h-12 dark:hover:bg-[#1a1a1a] rounded-lg w-full"
                >
                  <HeartIcon className="fixed group-hover:size-[1.6rem] size-6 duration-300" />
                  <p
                    className={`text-lg font-normal p-7 lg:block hidden ${
                      collapase ? "!hidden" : "block"
                    }`}
                  >
                    Notifikasi
                  </p>
                </Button>
              </Link>
            </div>

            <div>
              <Link href={"/explore"}>
                <Button
                  variant="ghost"
                  className="flex group justify-start px-3  items-center space-x-4 h-12 dark:hover:bg-[#1a1a1a] rounded-lg w-full"
                >
                  <PlusIcon className="fixed group-hover:size-[1.6rem] size-6 duration-300" />
                  <p
                    className={`text-lg font-normal p-7 lg:block hidden ${
                      collapase ? "!hidden" : "block"
                    }`}
                  >
                    Buat
                  </p>
                </Button>
              </Link>
            </div>

            {session && (
              <div>
                <Link href={session?.user?.username || "/"}>
                  <Button
                    variant="ghost"
                    className="flex group justify-start px-3  items-center space-x-4 h-12 dark:hover:bg-[#1a1a1a] rounded-lg w-full"
                  >
                    <Avatar className="size-7 bg-red-300">
                      <AvatarImage
                        src={session?.user?.image || "/default-avatar.png"}
                        alt="@shadcn"
                        className="rounded-full"
                      />
                    </Avatar>
                    <p
                      className={`text-lg font-normal  lg:block hidden ${
                        collapase ? "!hidden" : "block"
                      }`}
                    >
                      {session?.user?.fullname}
                    </p>
                  </Button>
                </Link>
              </div>
            )}
          </div>

          <Setting collapase={collapase} />
        </div>
      </nav>
    </aside>
  );
};

export default sidebarItem;
