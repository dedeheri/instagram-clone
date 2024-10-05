import moment from "moment";
import React from "react";
import HeartIcon from "./svg/heart-icon";
import CommentIcon from "./svg/comment-icon";
import ShareIcon from "./svg/share-icon";
import BookmarkIcon from "./svg/bookmark-icon";
import Link from "next/link";
import { IImage } from "@/types/image-types";
import LoadingIcon from "./svg/loading-icon";
import CardLoading from "./loading/card-loading";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface ICard {
  result: IImage[];
  isFetching: boolean;
  isLoading: boolean;
}

const Card = ({ result, isFetching, isLoading }: ICard) => {
  const router = useRouter();
  const { status } = useSession();

  const onLike = () => {
    if (status === "unauthenticated") {
      router.push("/accounts/login");
    }
  };

  return isLoading ? (
    <CardLoading />
  ) : (
    <section className="space-y-7 max-w-[468px] mx-auto">
      {result?.map((data: any) => (
        <>
          <div className="space-y-3 ">
            {/* user */}
            <Link href={data?.user?.username}>
              <div className="flex items-center space-x-3">
                <img
                  className="size-9 rounded-full"
                  src={data?.user?.profile_image?.medium}
                  alt={data?.user?.first_name}
                />
                <div className="-space-y-0.5">
                  <div className="flex space-x-2 items-center">
                    <h1 className="text-sm font-bold">
                      {data?.user?.first_name}
                    </h1>
                    <p className="text-sm text-neutral-400">•</p>
                    <p className="text-sm text-neutral-500">
                      {moment(data?.created_at).startOf("hour").fromNow()}
                    </p>
                  </div>
                  <p className="text-sm">{data?.user?.location}</p>
                </div>
              </div>
            </Link>

            {/* img */}
            <img
              src={data?.urls?.regular}
              alt={data?.alt_description}
              className="w-full h-[585px] rounded-md"
            />

            {/* action */}
            <div className="flex justify-between items-center">
              <div className="space-x-4">
                <button onClick={onLike}>
                  <HeartIcon />
                </button>
                <button>
                  <CommentIcon />
                </button>
                <button>
                  <ShareIcon />
                </button>
              </div>

              <button>
                <BookmarkIcon />
              </button>
            </div>

            {/* description */}
            <div className="flex space-x-1">
              <h1 className="text-sm font-bold">{data?.user?.first_name}</h1>
              <p className="text-sm">{data?.alt_description}</p>
            </div>

            {/* commentar */}
            <div>
              <button className="text-sm text-neutral-500">
                Tambahkan komentar...
              </button>
            </div>
          </div>
          <div className="border-b w-full" />
        </>
      ))}

      {isFetching && (
        <div className="flex justify-center animate-spin duration-1000">
          <LoadingIcon className="size-8 dark:fill-white fill-black" />
        </div>
      )}
    </section>
  );
};

export default Card;
