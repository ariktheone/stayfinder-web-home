
import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface WishlistButtonProps {
  listingId: string;
  className?: string;
}

const WishlistButton = ({ listingId, className = "" }: WishlistButtonProps) => {
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
      const { data: wishlist } = await supabase
        .from('wishlists')
        .select('id')
        .eq('user_id', user.id)
        .eq('is_default', true)
        .single();

      if (wishlist) {
        // Check if listing is in wishlist
        const { data: wishlistItem } = await supabase
          .from('wishlist_items')
          .select('id')
          .eq('wishlist_id', wishlist.id)
          .eq('listing_id', listingId)
          .maybeSingle();

        setIsInWishlist(!!wishlistItem);
      }
    } catch (error) {
      console.error('Error checking wishlist status:', error);
    }
  };

  const toggleWishlist = async () => {
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
      // Get user's default wishlist
      let { data: wishlist } = await supabase
        .from('wishlists')
        .select('id')
        .eq('user_id', user.id)
        .eq('is_default', true)
        .single();

      // Create default wishlist if it doesn't exist
      if (!wishlist) {
        const { data: newWishlist, error } = await supabase
          .from('wishlists')
          .insert({
            user_id: user.id,
            name: 'My Wishlist',
            is_default: true
          })
          .select()
          .single();

        if (error) throw error;
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

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleWishlist}
      disabled={loading}
      className={className}
    >
      <Heart
        className={`h-4 w-4 ${
          isInWishlist ? 'fill-red-500 text-red-500' : 'text-gray-500'
        }`}
      />
    </Button>
  );
};

export default WishlistButton;
