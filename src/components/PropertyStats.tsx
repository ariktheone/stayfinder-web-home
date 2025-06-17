
import { Users, Bed, Bath, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface PropertyStatsProps {
  maxGuests: number;
  bedrooms?: number;
  bathrooms?: number;
  propertyType?: string;
  size?: "sm" | "md" | "lg";
  layout?: "horizontal" | "vertical";
  className?: string;
}

const PropertyStats = ({ 
  maxGuests, 
  bedrooms, 
  bathrooms, 
  propertyType,
  size = "md",
  layout = "horizontal",
  className 
}: PropertyStatsProps) => {
  const sizeClasses = {
    sm: {
      icon: "h-3 w-3",
      text: "text-xs"
    },
    md: {
      icon: "h-4 w-4",
      text: "text-sm"
    },
    lg: {
      icon: "h-5 w-5",
      text: "text-base"
    }
  };

  const classes = sizeClasses[size];
  
  const stats = [
    { icon: Users, value: maxGuests, label: maxGuests === 1 ? 'guest' : 'guests' },
    ...(bedrooms ? [{ icon: Bed, value: bedrooms, label: bedrooms === 1 ? 'bedroom' : 'bedrooms' }] : []),
    ...(bathrooms ? [{ icon: Bath, value: bathrooms, label: bathrooms === 1 ? 'bathroom' : 'bathrooms' }] : []),
    ...(propertyType ? [{ icon: Home, value: propertyType, label: '' }] : [])
  ];

  return (
    <div className={cn(
      "flex text-gray-600",
      layout === "horizontal" ? "flex-row space-x-4" : "flex-col space-y-2",
      className
    )}>
      {stats.map((stat, index) => (
        <div key={index} className="flex items-center space-x-1">
          <stat.icon className={cn(classes.icon, "flex-shrink-0")} />
          <span className={cn("font-medium", classes.text)}>
            {typeof stat.value === 'number' ? `${stat.value} ${stat.label}` : stat.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default PropertyStats;
