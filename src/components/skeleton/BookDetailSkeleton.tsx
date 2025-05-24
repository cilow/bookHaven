import { Skeleton } from "../ui/skeleton";

function BookDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 w-40 h-10 mb-6">
        <Skeleton className="h-4 w-4 rounded-sm" />

        <Skeleton className="h-4 w-24 rounded-sm" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Skeleton className=" overflow-hidden rounded-lg w-full h-full aspect-[3/4]" />
        <div>
          <div className="flex justify-between items-start">
            <div>
              <Skeleton className="h-8 w-64 mb-2" />
              <Skeleton className="h-5 w-40 mb-4" />
            </div>
            <Skeleton className="h-10 w-10 rounded-full" />{" "}
          </div>

          <div className="flex items-center gap-2 mb-6">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-4 w-32" />
          </div>

          <Skeleton className="h-6 w-24 mb-6" />

          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-2">
              <Skeleton className="h-5 w-5 mt-0.5 text-muted-foreground" />
              <div>
                <Skeleton className="h-4 w-24 mb-1" />
                <Skeleton className="h-4 w-36" />
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Skeleton className="h-5 w-5 mt-0.5 text-muted-foreground" />
              <div>
                <Skeleton className="h-4 w-24 mb-1" />
                <Skeleton className="h-4 w-44" />
              </div>
            </div>
          </div>

          <Skeleton className="h-10 w-full mb-8" />

          <div>
            <Skeleton className="h-5 w-32 mb-4" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetailSkeleton;
