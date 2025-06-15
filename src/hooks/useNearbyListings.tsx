
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Listing } from '@/types/database';
import { useToast } from '@/hooks/use-toast';

export const useNearbyListings = (currentListing: Listing | null, radius: number = 10) => {
  const [nearbyListings, setNearbyListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!currentListing || !currentListing.latitude || !currentListing.longitude) {
      return;
    }

    const fetchNearbyListings = async () => {
      try {
        setLoading(true);
        
        // Use the optimized database function
        const { data, error } = await supabase.rpc('get_nearby_listings', {
          target_lat: currentListing.latitude,
          target_lng: currentListing.longitude,
          exclude_id: currentListing.id,
          radius_km: radius,
          max_results: 6
        });

        if (error) {
          console.error('Error with RPC call, falling back to manual query:', error);
          
          // Fallback to manual bounding box calculation
          const latRadius = radius / 111.32; // Approximate km to degrees conversion
          const lngRadius = radius / (111.32 * Math.cos(currentListing.latitude! * Math.PI / 180));
          
          const { data: fallbackData, error: fallbackError } = await supabase
            .from('listings')
            .select('*')
            .neq('id', currentListing.id)
            .gte('latitude', currentListing.latitude! - latRadius)
            .lte('latitude', currentListing.latitude! + latRadius)
            .gte('longitude', currentListing.longitude! - lngRadius)
            .lte('longitude', currentListing.longitude! + lngRadius)
            .limit(6);

          if (fallbackError) throw fallbackError;
          setNearbyListings(fallbackData || []);
        } else {
          setNearbyListings(data || []);
        }
      } catch (error) {
        console.error('Error fetching nearby listings:', error);
        toast({
          title: "Error",
          description: "Failed to fetch nearby listings",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchNearbyListings();
  }, [currentListing, radius, toast]);

  return { nearbyListings, loading };
};
