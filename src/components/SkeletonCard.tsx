
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonCard = () => {
  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <Skeleton className="w-full h-48 sm:h-56 md:h-64" />
        <div className="absolute top-3 left-3">
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
        <div className="absolute top-3 right-3">
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>
      
      <CardContent className="p-4 sm:p-5">
        <div className="flex items-start justify-between mb-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-5 w-12" />
        </div>
        
        <div className="flex items-center mb-3">
          <Skeleton className="h-4 w-4 mr-1" />
          <Skeleton className="h-4 w-32" />
        </div>
        
        <div className="mb-4 flex gap-4">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-baseline space-x-1">
            <Skeleton className="h-6 w-8" />
            <Skeleton className="h-6 w-12" />
            <Skeleton className="h-4 w-12" />
          </div>
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      </CardContent>
    </Card>
  );
};

export default SkeletonCard;
