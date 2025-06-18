
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FloatingActionButtonProps {
  onClick: () => void;
  icon?: React.ReactNode;
  label?: string;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  className?: string;
}

const FloatingActionButton = ({
  onClick,
  icon = <Plus className="h-5 w-5" />,
  label,
  position = "bottom-right",
  className
}: FloatingActionButtonProps) => {
  const getPositionStyles = () => {
    switch (position) {
      case "bottom-left":
        return "bottom-6 left-6";
      case "top-right":
        return "top-6 right-6";
      case "top-left":
        return "top-6 left-6";
      default:
        return "bottom-6 right-6";
    }
  };

  return (
    <Button
      onClick={onClick}
      className={cn(
        "fixed z-50 h-14 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95",
        "bg-rose-600 hover:bg-rose-700 text-white",
        label ? "px-6 rounded-full" : "w-14 rounded-full",
        getPositionStyles(),
        className
      )}
    >
      {icon}
      {label && <span className="ml-2 font-medium">{label}</span>}
    </Button>
  );
};

export default FloatingActionButton;
