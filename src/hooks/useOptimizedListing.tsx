
import { useState, useEffect, useCallback, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Listing } from '@/types/database';

export const useOptimizedListing = (id: string | undefined) => {
  const [listing, setListing] = useState<Listing | null>(null);
  const [nearbyListings, setNearbyListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [nearbyLoading, setNearbyLoading] = useState(false);
  const [cache, setCache] = useState<Map<string, { listing: Listing, nearby: Listing[] }>>(new Map());
  const { toast } = useToast();

  // Memoized fetch function
  const fetchListing = useCallback(async () => {
    if (!id) return;

    // Check cache first
    if (cache.has(id)) {
      const cached = cache.get(id)!;
      setListing(cached.listing);
      setNearbyListings(cached.nearby);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      
      // Try optimized database function first
      const { data: optimizedData, error: optimizedError } = await supabase.rpc('get_listing_with_nearby', {
        listing_id: id,
        radius_km: 10
      });

      if (!optimizedError && optimizedData) {
        const listingData = optimizedData.listing;
        const nearbyData = optimizedData.nearby_listings || [];
        
        setListing(listingData);
        setNearbyListings(nearbyData);
        
        // Cache the results
        setCache(prev => new Map(prev.set(id, { listing: listingData, nearby: nearbyData })));
        
      } else {
        // Fallback to individual queries
        const [listingResponse, nearbyResponse] = await Promise.all([
          supabase.from('listings').select('*').eq('id', id).single(),
          supabase.rpc('get_nearby_listings', {
            target_lat: 0, // Will be updated after getting listing
            target_lng: 0,
            exclude_id: id,
            max_results: 6
          })
        ]);

        if (listingResponse.error) throw listingResponse.error;
        
        const listingData = listingResponse.data;
        setListing(listingData);
        
        // Fetch nearby if coordinates exist
        if (listingData.latitude && listingData.longitude) {
          const { data: nearbyData } = await supabase.rpc('get_nearby_listings', {
            target_lat: listingData.latitude,
            target_lng: listingData.longitude,
            exclude_id: id,
            max_results: 6
          });
          
          setNearbyListings(nearbyData || []);
        }
        
        // Cache the results
        setCache(prev => new Map(prev.set(id, { 
          listing: listingData, 
          nearby: nearbyResponse.data || [] 
        })));
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
  }, [id, toast, cache]);

  useEffect(() => {
    fetchListing();
  }, [fetchListing]);

  // Memoized return object
  const returnValue = useMemo(() => ({
    listing,
    nearbyListings,
    loading,
    nearbyLoading,
    refetch: fetchListing
  }), [listing, nearbyListings, loading, nearbyLoading, fetchListing]);

  return returnValue;
};
