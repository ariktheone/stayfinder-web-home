
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Listing } from "@/types/database";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import PropertyCard from "@/components/PropertyCard";
import { Heart, Trash2, Sparkles } from "lucide-react";
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
    if (!user) return;

    try {
      setLoading(true);
      console.log('Fetching wishlist for user:', user.id);
      
      // First, get or create the user's default wishlist
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

      // If no default wishlist exists, create one
      if (!wishlist) {
        console.log('Creating default wishlist for user');
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

      console.log('Found wishlist:', wishlist.id);

      // Get wishlist items with their associated listings
      const { data: wishlistItemsData, error: itemsError } = await supabase
        .from('wishlist_items')
        .select(`
          id,
          listing_id,
          created_at
        `)
        .eq('wishlist_id', wishlist.id)
        .order('created_at', { ascending: false });

      if (itemsError) {
        console.error('Error fetching wishlist items:', itemsError);
        throw itemsError;
      }

      console.log('Found wishlist items:', wishlistItemsData?.length || 0);

      if (!wishlistItemsData || wishlistItemsData.length === 0) {
        setWishlistItems([]);
        return;
      }

      // Get the actual listing details
      const listingIds = wishlistItemsData.map(item => item.listing_id);
      const { data: listings, error: listingsError } = await supabase
        .from('listings')
        .select('*')
        .in('id', listingIds);

      if (listingsError) {
        console.error('Error fetching listings:', listingsError);
        throw listingsError;
      }

      console.log('Found listings:', listings?.length || 0);
      
      // Order listings according to wishlist item creation order
      const orderedListings = wishlistItemsData
        .map(item => listings?.find(listing => listing.id === item.listing_id))
        .filter((listing): listing is Listing => listing !== undefined);

      setWishlistItems(orderedListings);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      toast({
        title: "Error",
        description: "Failed to load wishlist. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (listingId: string) => {
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
        throw wishlistError;
      }

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
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse space-y-8">
            <div className="flex items-center space-x-4 mb-8">
              <div className="h-12 w-12 bg-gradient-to-br from-rose-200 to-pink-200 rounded-full"></div>
              <div className="h-8 bg-gradient-to-r from-rose-200 to-pink-200 rounded-full w-1/3"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <div className="h-64 bg-gradient-to-br from-rose-100 to-pink-100 rounded-2xl"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gradient-to-r from-rose-100 to-pink-100 rounded-full w-3/4"></div>
                    <div className="h-4 bg-gradient-to-r from-rose-100 to-pink-100 rounded-full w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full mb-6">
              <Heart className="h-10 w-10 text-white fill-current" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Your Wishlist
            </h1>
            <p className="text-xl text-gray-600 mb-4">
              {wishlistItems.length} saved {wishlistItems.length === 1 ? 'property' : 'properties'}
            </p>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <Sparkles className="h-4 w-4" />
              <span>Curated just for you</span>
            </div>
          </div>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-rose-100 to-pink-100 rounded-full flex items-center justify-center">
              <Heart className="h-16 w-16 text-rose-300" />
            </div>
            <h2 className="text-3xl font-bold text-gray-700 mb-6">
              Your wishlist is empty
            </h2>
            <p className="text-xl text-gray-500 mb-8 max-w-md mx-auto">
              Start exploring and save your favorite places to stay. Every journey begins with a dream destination.
            </p>
            <Button 
              onClick={() => navigate('/')} 
              className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-8 py-3 text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              Start exploring
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {wishlistItems.map((listing, index) => (
              <div 
                key={listing.id} 
                className="relative group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <PropertyCard listing={listing} />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeFromWishlist(listing.id)}
                  className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/90 backdrop-blur-sm shadow-lg border-0 hover:bg-red-50 hover:text-red-600 z-30"
                >
                  <Trash2 className="h-4 w-4" />
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
