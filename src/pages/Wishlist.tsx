
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Listing } from "@/types/database";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import PropertyCard from "@/components/PropertyCard";
import { Heart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const Wishlist = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [wishlistItems, setWishlistItems] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
      return;
    }
    if (user) {
      fetchWishlistItems();
    }
  }, [user, authLoading, navigate]);

  const fetchWishlistItems = async () => {
    try {
      // Get user's default wishlist
      const { data: wishlist } = await supabase
        .from('wishlists')
        .select('id')
        .eq('user_id', user?.id)
        .eq('is_default', true)
        .single();

      if (wishlist) {
        // Get wishlist items with listing details
        const { data, error } = await supabase
          .from('wishlist_items')
          .select(`
            id,
            listings (*)
          `)
          .eq('wishlist_id', wishlist.id)
          .order('created_at', { ascending: false });

        if (error) throw error;

        const listings = data?.map(item => item.listings).filter(Boolean) || [];
        setWishlistItems(listings as Listing[]);
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      toast({
        title: "Error",
        description: "Failed to load wishlist",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (listingId: string) => {
    try {
      // Get user's default wishlist
      const { data: wishlist } = await supabase
        .from('wishlists')
        .select('id')
        .eq('user_id', user?.id)
        .eq('is_default', true)
        .single();

      if (wishlist) {
        const { error } = await supabase
          .from('wishlist_items')
          .delete()
          .eq('wishlist_id', wishlist.id)
          .eq('listing_id', listingId);

        if (error) throw error;

        setWishlistItems(prev => prev.filter(item => item.id !== listingId));
        toast({
          title: "Removed from wishlist",
          description: "Property removed from your wishlist",
        });
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      toast({
        title: "Error",
        description: "Failed to remove from wishlist",
        variant: "destructive",
      });
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-300 rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-64 bg-gray-300 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
            <Heart className="h-8 w-8 text-red-500" />
            <span>Your Wishlist</span>
          </h1>
          <p className="text-gray-600 mt-2">
            {wishlistItems.length} saved {wishlistItems.length === 1 ? 'property' : 'properties'}
          </p>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="h-24 w-24 mx-auto text-gray-300 mb-6" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Your wishlist is empty
            </h2>
            <p className="text-gray-500 mb-8">
              Start exploring and save your favorite places to stay
            </p>
            <Button onClick={() => navigate('/')} className="bg-rose-500 hover:bg-rose-600">
              Start exploring
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((listing) => (
              <div key={listing.id} className="relative group">
                <PropertyCard listing={listing} />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeFromWishlist(listing.id)}
                  className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-white shadow-lg"
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
