
import { Search, Home, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  type?: "search" | "wishlist" | "bookings" | "listings";
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

const EmptyState = ({
  type = "search",
  title,
  description,
  actionLabel,
  onAction,
  className
}: EmptyStateProps) => {
  const getEmptyStateContent = () => {
    switch (type) {
      case "wishlist":
        return {
          icon: Heart,
          title: title || "Your wishlist is empty",
          description: description || "Start exploring and save your favorite properties",
          actionLabel: actionLabel || "Browse Properties"
        };
      case "bookings":
        return {
          icon: Home,
          title: title || "No bookings yet",
          description: description || "Book your first stay to see your reservations here",
          actionLabel: actionLabel || "Find Properties"
        };
      case "listings":
        return {
          icon: Home,
          title: title || "No listings found",
          description: description || "Create your first listing to start hosting",
          actionLabel: actionLabel || "Create Listing"
        };
      default:
        return {
          icon: Search,
          title: title || "No results found",
          description: description || "Try adjusting your search criteria or explore different locations",
          actionLabel: actionLabel || "Clear Filters"
        };
    }
  };

  const content = getEmptyStateContent();
  const Icon = content.icon;

  return (
    <div className={cn(
      "flex flex-col items-center justify-center py-12 px-4 text-center",
      className
    )}>
      <div className="mb-6 p-4 bg-gray-100 rounded-full">
        <Icon className="h-12 w-12 text-gray-400" />
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {content.title}
      </h3>
      
      <p className="text-gray-600 mb-6 max-w-md">
        {content.description}
      </p>
      
      {onAction && (
        <Button 
          onClick={onAction}
          className="bg-rose-600 hover:bg-rose-700 text-white px-6"
        >
          {content.actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
