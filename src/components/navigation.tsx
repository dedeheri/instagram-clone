import React, { ReactNode } from "react";

import HomeIcon from "./svg/home-icon";
import ExploreIcon from "./svg/explore-icon";
import ReelIcon from "./svg/reel-icon";
import PlusIcon from "./svg/plus-icon";
import MessageIcon from "./svg/message-icon";
import Link from "next/link";
import { useSession } from "next-auth/react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface INavigationLink {
  icon: ReactNode;
  url: string;
}

const navigationLinks: INavigationLink[] = [
  {
    icon: <HomeIcon className="size-6 hover:size-[25px] duration-300" />,
    url: "/",
  },
  {
    icon: <ExploreIcon className="size-6 hover:size-[25px] duration-300" />,
    url: "/explore",
  },
  {
    icon: <ReelIcon className="size-6 hover:size-[25px] duration-300" />,
    url: "/reels",
  },
  {
    icon: <PlusIcon className="size-6 hover:size-[25px] duration-300" />,
    url: "/create",
  },
  {
    icon: <MessageIcon className="size-6 hover:size-[25px] duration-300" />,
    url: "/message",
  },
];

const Navigation = () => {
  const { data: session, status } = useSession();

  return (
    <section className="block md:hidden h-14 border-t bg-white dark:bg-black fixed bottom-0 w-full">
      <div className="flex items-center h-full justify-between px-5">
        {navigationLinks.map((nav, i) => (
          <button key={i}>
            <Link href={nav.url}>{nav.icon}</Link>
          </button>
        ))}

        {session && (
          <Avatar className="size-7">
            <AvatarImage
              src={session?.user?.image!}
              alt="@shadcn"
              className="rounded-full"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        )}
      </div>
    </section>
  );
};

export default Navigation;
