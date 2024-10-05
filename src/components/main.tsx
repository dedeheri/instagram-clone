"use client";

import React, { useEffect, useState } from "react";
import {
  useGetRandomPhotosForStoriesQuery,
  useGetRandomPhotosQuery,
} from "@/features/feature/random-photos-api";

import { IImage } from "@/types/image-types";
import Container from "./container";
import Stories from "./stories";
import Card from "./card";

interface IGetRandomPhoto {
  data: IImage[];
  isLoading: boolean;
  isFetching: boolean;
}
interface IGetRandomPhotoStories {
  data: IImage[];
  isLoading: boolean;
}

const Main = () => {
  const [page, setPage] = useState<number>(1);

  const { data, isLoading, isFetching } =
    useGetRandomPhotosQuery<IGetRandomPhoto>(page);
  const { data: photoStories, isLoading: isLoadingStories } =
    useGetRandomPhotosForStoriesQuery<IGetRandomPhotoStories>();

  useEffect(() => {
    const onScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;
      if (scrolledToBottom && !isFetching) {
        console.log("Fetching more data...");
        setPage(page + 1);
      }
    };

    document.addEventListener("scroll", onScroll);

    return function () {
      document.removeEventListener("scroll", onScroll);
    };
  }, [page, isFetching]);

  return (
    <Container>
      <div className="space-y-10">
        <Stories results={photoStories} isLoading={isLoadingStories} />
        <Card result={data} isFetching={isFetching} isLoading={isLoading} />
      </div>
    </Container>
  );
};

export default Main;
