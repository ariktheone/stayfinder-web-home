
import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

interface WishlistButtonProps {
  listingId: string;
  className?: string;
  variant?: "default" | "floating" | "compact";
  size?: "sm" | "md" | "lg";
}

const WishlistButton = ({ 
  listingId, 
  className = "", 
  variant = "default",
  size = "md"
}: WishlistButtonProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      checkWishlistStatus();
    }
  }, [user, listingId]);

  const checkWishlistStatus = async () => {
    if (!user) return;

    try {
      // Get user's default wishlist
      const { data: wishlist, error: wishlistError } = await supabase
        .from('wishlists')
        .select('id')
        .eq('user_id', user.id)
        .eq('is_default', true)
        .maybeSingle();

      if (wishlistError) {
        console.error('Error fetching wishlist:', wishlistError);
        return;
      }

      if (wishlist) {
        // Check if listing is in wishlist
        const { data: wishlistItem, error: itemError } = await supabase
          .from('wishlist_items')
          .select('id')
          .eq('wishlist_id', wishlist.id)
          .eq('listing_id', listingId)
          .maybeSingle();

        if (itemError) {
          console.error('Error checking wishlist item:', itemError);
          return;
        }

        setIsInWishlist(!!wishlistItem);
      }
    } catch (error) {
      console.error('Error checking wishlist status:', error);
    }
  };

  const toggleWishlist = async (e: React.MouseEvent) => {
    // Prevent event bubbling to parent elements
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to save to wishlist",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Get or create user's default wishlist
      let { data: wishlist, error: wishlistError } = await supabase
        .from('wishlists')
        .select('id')
        .eq('user_id', user.id)
        .eq('is_default', true)
        .maybeSingle();

      if (wishlistError) {
        console.error('Error fetching wishlist:', wishlistError);
        throw wishlistError;
      }

      // Create default wishlist if it doesn't exist
      if (!wishlist) {
        const { data: newWishlist, error: createError } = await supabase
          .from('wishlists')
          .insert({
            user_id: user.id,
            name: 'My Wishlist',
            is_default: true
          })
          .select('id')
          .single();

        if (createError) {
          console.error('Error creating wishlist:', createError);
          throw createError;
        }
        wishlist = newWishlist;
      }

      if (isInWishlist) {
        // Remove from wishlist
        const { error } = await supabase
          .from('wishlist_items')
          .delete()
          .eq('wishlist_id', wishlist.id)
          .eq('listing_id', listingId);

        if (error) throw error;

        setIsInWishlist(false);
        toast({
          title: "Removed from wishlist",
          description: "Property removed from your wishlist",
        });
      } else {
        // Add to wishlist
        const { error } = await supabase
          .from('wishlist_items')
          .insert({
            wishlist_id: wishlist.id,
            listing_id: listingId
          });

        if (error) throw error;

        setIsInWishlist(true);
        toast({
          title: "Added to wishlist",
          description: "Property saved to your wishlist",
        });
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error);
      toast({
        title: "Error",
        description: "Failed to update wishlist",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "floating":
        return "absolute top-3 right-3 z-20 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg border-0 rounded-full p-2";
      case "compact":
        return "bg-transparent hover:bg-white/10 border-0 p-1";
      default:
        return "bg-white/90 backdrop-blur-sm hover:bg-white border border-gray-200 shadow-sm";
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return variant === "floating" ? "h-8 w-8" : "h-8 px-2";
      case "lg":
        return variant === "floating" ? "h-12 w-12" : "h-12 px-4";
      default:
        return variant === "floating" ? "h-10 w-10" : "h-10 px-3";
    }
  };

  const getHeartSize = () => {
    switch (size) {
      case "sm":
        return "h-3 w-3";
      case "lg":
        return "h-6 w-6";
      default:
        return "h-4 w-4";
    }
  };

  return (
    <Button
      onClick={toggleWishlist}
      disabled={loading}
      className={cn(
        "transition-all duration-300 hover:scale-105 active:scale-95",
        getVariantStyles(),
        getSizeStyles(),
        loading && "opacity-70 cursor-not-allowed",
        className
      )}
    >
      <Heart
        className={cn(
          getHeartSize(),
          "transition-all duration-300",
          isInWishlist 
            ? 'fill-red-500 text-red-500 animate-pulse' 
            : 'text-gray-600 hover:text-red-400',
          loading && "animate-spin"
        )}
      />
      {variant === "default" && size !== "sm" && (
        <span className="ml-2 text-sm font-medium">
          {isInWishlist ? "Saved" : "Save"}
        </span>
      )}
    </Button>
  );
};

export default WishlistButton;
