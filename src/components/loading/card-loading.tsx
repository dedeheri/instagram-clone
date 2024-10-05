import { Skeleton } from "../ui/skeleton";

const CardLoading = () => {
  return (
    <section className="space-y-7 max-w-[468px] mx-auto">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="w-full space-y-4">
          {/* user */}
          <div className="flex items-center space-x-3 w-full">
            <Skeleton className="size-9 rounded-full" />

            <div className="space-y-1">
              <div className="flex space-x-2 items-center">
                <Skeleton className="h-3 w-52 rounded-full" />
                <Skeleton className="h-3 w-full rounded-full" />
              </div>
              <Skeleton className="h-2 w-full rounded-full" />
            </div>
          </div>

          {/* image */}
          <Skeleton className="w-full h-[585px] rounded-md" />

          {/* action */}
          <div className="flex justify-between items-center w-full">
            <div className="space-x-4 flex">
              <Skeleton className="size-9 rounded-full" />
              <Skeleton className="size-9 rounded-full" />
              <Skeleton className="size-9 rounded-full" />
            </div>

            <Skeleton className="size-9 rounded-full" />
          </div>

          <Skeleton className="h-3 w-1/2 rounded-full" />
          <Skeleton className="h-2 w-full rounded-full" />
          <Skeleton className="h-2 w-full rounded-full" />
        </div>
      ))}
    </section>
  );
};

export default CardLoading;
