import { Skeleton } from "../ui/skeleton";

const StoriesLoading = () => {
  return (
    <section className="flex relative group max-w-[630px] mx-auto space-x-5 ">
      {[...Array(8)].map((_, i) => (
        <Skeleton className="size-[62px] rounded-full" key={i} />
      ))}
    </section>
  );
};

export default StoriesLoading;
