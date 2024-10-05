"use client";

import { Fragment, useState } from "react";
import SearchIcon from "./svg/search-icon";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  TransitionChild,
} from "@headlessui/react";
import { Button } from "./ui/button";

interface ISearchSidebar {
  onCollapse: any;
  collapase: boolean;
}

const SearchSidebar = ({ onCollapse, collapase }: ISearchSidebar) => {
  return (
    <Fragment>
      <Button
        onClick={() => onCollapse(!collapase)}
        variant="ghost"
        className="flex justify-start px-3 group items-center space-x-4 h-12 dark:hover:bg-[#1a1a1a] rounded-lg w-full"
      >
        <SearchIcon className="fixed group-hover:size-[1.6rem] size-6 duration-300" />
        <p
          className={`text-lg font-normal p-7 lg:block hidden ${
            collapase ? "!hidden" : "block"
          }`}
        >
          Cari
        </p>
      </Button>

      <Dialog open={collapase} onClose={onCollapse} className="relative">
        <div className="fixed inset-0 overflow-hidden ">
          <div className="absolute inset-0 overflow-hidden ">
            <div className="pointer-events-none fixed inset-y-0  left-[4.5rem] flex max-w-full">
              <DialogPanel
                transition
                className="pointer-events-auto border-r rounded-2xl  bg-white dark:bg-black relative w-screen max-w-md transform transition duration-300 ease-in-out data-[closed]:-translate-x-full sm:duration-300"
              >
                <TransitionChild>
                  <div className="absolute right-0 top-0 -ml-8 flex pr-2 pt-4 duration-300 ease-in-out data-[closed]:opacity-0 sm:-ml-10 sm:pr-4">
                    <button
                      type="button"
                      onClick={() => onCollapse(!collapase)}
                      className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                    >
                      <span className="absolute -inset-2.5" />
                      <span className="sr-only">Close panel</span>X
                    </button>
                  </div>
                </TransitionChild>
                <div className="flex h-full flex-col overflow-y-hidden py-6">
                  <div className="px-4 sm:px-6">
                    <DialogTitle className="text-base font-semibold leading-6">
                      Panel title
                    </DialogTitle>
                  </div>
                  <div className="relative mt-6 flex-1 px-4 sm:px-6">
                    {/* Your content */}
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </Fragment>
  );
};

export default SearchSidebar;
