import { useRef } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

import { IImage } from "@/types/image-types";
import StoriesLoading from "./loading/stories-loading";

interface IStories {
  results: IImage[];
  isLoading: boolean;
}

const Stories = ({ results, isLoading }: IStories) => {
  const ref = useRef<any>(null);

  const onScroll = (scrollOffset: number) => {
    ref.current.scrollLeft += scrollOffset;
  };

  return isLoading ? (
    <StoriesLoading />
  ) : (
    <section className="flex relative group max-w-[630px] mx-auto">
      <button
        onClick={() => onScroll(-300)}
        className="bg-white rounded-full top-5 size-6 z-40 flex items-center justify-center translate-x-0 absolute shadow-xl border left-2"
      >
        <ChevronLeftIcon className="size-4 text-neutral-600" />
      </button>

      <div ref={ref} className="flex space-x-5 overflow-hidden scroll-smooth">
        {results?.map((result) => (
          <div className="text-center">
            <Avatar className="size-[62px] border rounded-full p-0.5 bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500">
              <AvatarImage
                src={result?.user?.profile_image?.medium}
                alt={result?.user?.first_name}
                className="rounded-full border-2"
              />
              <AvatarFallback className="bg-white" />
            </Avatar>

            <p className="text-xs pb-2 pt-1">{result?.user?.first_name}</p>
          </div>
        ))}
      </div>

      <button
        onClick={() => onScroll(300)}
        className="bg-white rounded-full z-40 size-6 top-5 flex items-center justify-center translate-x-0 absolute shadow-xl border right-2"
      >
        <ChevronRightIcon className="size-4 text-neutral-600" />
      </button>
    </section>
  );
};

export default Stories;
