
import { cn } from "@/lib/utils";

interface PriceDisplayProps {
  price: number;
  period?: string;
  currency?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  showCurrency?: boolean;
}

const PriceDisplay = ({ 
  price, 
  period = "night", 
  currency = "₹",
  size = "md",
  className,
  showCurrency = true 
}: PriceDisplayProps) => {
  const formatPrice = (price: number) => {
    const amount = Math.round(price / 100);
    return amount.toLocaleString('en-IN');
  };

  const sizeClasses = {
    sm: "text-lg",
    md: "text-xl sm:text-2xl",
    lg: "text-2xl sm:text-3xl"
  };

  const periodClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base"
  };

  return (
    <div className={cn("flex items-baseline space-x-1", className)}>
      {showCurrency && (
        <span className={cn("font-bold text-gray-900", sizeClasses[size])}>
          {currency}
        </span>
      )}
      <span className={cn("font-bold text-gray-900", sizeClasses[size])}>
        {formatPrice(price)}
      </span>
      <span className={cn("text-gray-600", periodClasses[size])}>
        / {period}
      </span>
    </div>
  );
};

export default PriceDisplay;
