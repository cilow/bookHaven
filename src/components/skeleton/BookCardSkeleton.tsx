import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function BookCardSkeleton() {
  return (
    <Card className="pt-0 overflow-hidden h-full w-full flex flex-col animate-pulse">
      <div className="relative bg-muted pt-[100%]">
        <Skeleton className="absolute top-0 left-0 w-full h-full" />
      </div>
      <CardContent className="pt-6 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <Skeleton className="h-5 w-3/4 rounded" />
          <Skeleton className="h-5 w-5 rounded-full" />
        </div>
        <Skeleton className="h-4 w-1/2 mb-2" />
        <Skeleton className="h-4 w-1/4" />
      </CardContent>
      <CardFooter className="pt-0">
        <Skeleton className="w-full py-4"></Skeleton>
      </CardFooter>
    </Card>
  );
}

export default BookCardSkeleton;
