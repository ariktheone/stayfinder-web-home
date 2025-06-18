
import { Card, CardContent } from "@/components/ui/card";

interface SkeletonCardProps {
  variant?: "vertical" | "horizontal";
}

const SkeletonCard = ({ variant = "vertical" }: SkeletonCardProps) => {
  if (variant === "horizontal") {
    return (
      <Card className="overflow-hidden bg-white border-0 shadow-sm animate-pulse">
        <div className="flex flex-col sm:flex-row">
          <div className="w-full sm:w-80 h-48 sm:h-64 bg-gradient-to-br from-gray-200 to-gray-300 flex-shrink-0"></div>
          <CardContent className="p-4 sm:p-6 flex-1">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <div className="h-6 bg-gray-300 rounded-full w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded-full w-1/2"></div>
                </div>
                <div className="h-4 bg-gray-300 rounded-full w-16 ml-4"></div>
              </div>
              <div className="h-4 bg-gray-300 rounded-full w-1/3"></div>
              <div className="flex space-x-4">
                <div className="h-4 bg-gray-300 rounded-full w-20"></div>
                <div className="h-4 bg-gray-300 rounded-full w-20"></div>
                <div className="h-4 bg-gray-300 rounded-full w-20"></div>
              </div>
              <div className="flex items-center justify-between mt-6">
                <div className="h-6 bg-gray-300 rounded-full w-24"></div>
                <div className="h-8 bg-gray-300 rounded-full w-20"></div>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    );
  }

  // Vertical layout (default)
  return (
    <Card className="overflow-hidden bg-white border-0 shadow-sm animate-pulse">
      <div className="h-48 sm:h-56 md:h-64 bg-gradient-to-br from-gray-200 to-gray-300"></div>
      <CardContent className="p-4 sm:p-5">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="h-5 bg-gray-300 rounded-full w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded-full w-12"></div>
          </div>
          <div className="h-4 bg-gray-300 rounded-full w-1/2"></div>
          <div className="flex space-x-3">
            <div className="h-4 bg-gray-300 rounded-full w-16"></div>
            <div className="h-4 bg-gray-300 rounded-full w-16"></div>
            <div className="h-4 bg-gray-300 rounded-full w-16"></div>
          </div>
          <div className="flex items-center justify-between pt-2">
            <div className="h-5 bg-gray-300 rounded-full w-20"></div>
            <div className="h-6 bg-gray-300 rounded-full w-16"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkeletonCard;
