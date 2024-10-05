import React from "react";
import { Skeleton } from "../ui/skeleton";

const SidebarLoading = () => {
  return (
    <aside className="fixed py-6 px-3 z-50 border-r  bg-white dark:bg-black duration-300 xl:w-[335px] lg:w-[200px] w-[70px] hidden md:block h-full">
      <div className="h-14 px-3">
        <Skeleton className="h-10 w-40 rounded-full" />
      </div>

      <nav className="h-full px-3">
        <div className="flex flex-col h-full  space-y-9  pt-7 pb-24">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center space-x-5">
              <Skeleton className="size-8 rounded-full" />
              <Skeleton className="w-28 h-5 rounded-full" />
            </div>
          ))}
        </div>
      </nav>
    </aside>
  );
};

export default SidebarLoading;
