
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Listing } from '@/types/database';

export const useOptimizedListing = (id: string | undefined) => {
  const [listing, setListing] = useState<Listing | null>(null);
  const [nearbyListings, setNearbyListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [nearbyLoading, setNearbyLoading] = useState(false);
  const { toast } = useToast();

  const fetchListing = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);
      
      // Use the optimized database function
      const { data, error } = await supabase.rpc('get_listing_with_nearby', {
        listing_id: id,
        radius_km: 10
      });

      if (error) {
        // Fallback to individual queries if function fails
        const { data: listingData, error: listingError } = await supabase
          .from('listings')
          .select('*')
          .eq('id', id)
          .single();

        if (listingError) throw listingError;
        
        setListing(listingData);
        
        // Fetch nearby listings separately
        if (listingData.latitude && listingData.longitude) {
          setNearbyLoading(true);
          const { data: nearbyData, error: nearbyError } = await supabase.rpc('get_nearby_listings', {
            target_lat: listingData.latitude,
            target_lng: listingData.longitude,
            exclude_id: id,
            max_results: 6
          });

          if (!nearbyError && nearbyData) {
            setNearbyListings(nearbyData);
          }
          setNearbyLoading(false);
        }
      } else if (data) {
        setListing(data.listing);
        setNearbyListings(data.nearby_listings || []);
      }
    } catch (error) {
      console.error('Error fetching listing:', error);
      toast({
        title: "Error loading listing",
        description: "Failed to load listing details. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [id, toast]);

  useEffect(() => {
    fetchListing();
  }, [fetchListing]);

  return {
    listing,
    nearbyListings,
    loading,
    nearbyLoading,
    refetch: fetchListing
  };
};
