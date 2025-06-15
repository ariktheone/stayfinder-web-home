
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Listing } from '@/types/database';
import { useToast } from '@/hooks/use-toast';

export const useNearbyListings = (currentListing: Listing | null, radius: number = 0.1) => {
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
        
        // Calculate approximate bounding box for nearby search
        const latMin = currentListing.latitude! - radius;
        const latMax = currentListing.latitude! + radius;
        const lngMin = currentListing.longitude! - radius;
        const lngMax = currentListing.longitude! + radius;

        const { data, error } = await supabase
          .from('listings')
          .select('*')
          .neq('id', currentListing.id) // Exclude current listing
          .gte('latitude', latMin)
          .lte('latitude', latMax)
          .gte('longitude', lngMin)
          .lte('longitude', lngMax)
          .limit(6);

        if (error) throw error;
        setNearbyListings(data || []);
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
