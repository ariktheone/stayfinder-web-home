
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingDisplayProps {
  rating: number;
  reviewCount?: number;
  size?: "sm" | "md" | "lg";
  showCount?: boolean;
  className?: string;
}

const RatingDisplay = ({ 
  rating, 
  reviewCount, 
  size = "md", 
  showCount = true,
  className 
}: RatingDisplayProps) => {
  const sizeClasses = {
    sm: {
      star: "h-3 w-3",
      text: "text-xs",
      rating: "text-sm"
    },
    md: {
      star: "h-4 w-4",
      text: "text-sm",
      rating: "text-sm"
    },
    lg: {
      star: "h-5 w-5",
      text: "text-base",
      rating: "text-lg"
    }
  };

  const classes = sizeClasses[size];

  return (
    <div className={cn("flex items-center space-x-1", className)}>
      <Star className={cn(classes.star, "fill-yellow-400 text-yellow-400")} />
      <span className={cn("font-semibold text-gray-900", classes.rating)}>
        {rating.toFixed(1)}
      </span>
      {showCount && reviewCount && reviewCount > 0 && (
        <span className={cn("text-gray-600", classes.text)}>
          ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
        </span>
      )}
    </div>
  );
};

export default RatingDisplay;
