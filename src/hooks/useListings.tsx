
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Listing, SearchFilters } from '@/types/database';
import { useToast } from '@/hooks/use-toast';

export const useListings = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchListings = async (filters?: SearchFilters) => {
    try {
      setLoading(true);
      let query = supabase.from('listings').select('*');

      if (filters?.location) {
        query = query.ilike('location', `%${filters.location}%`);
      }

      if (filters?.minPrice) {
        query = query.gte('price_per_night', filters.minPrice * 100);
      }

      if (filters?.maxPrice) {
        query = query.lte('price_per_night', filters.maxPrice * 100);
      }

      if (filters?.guests) {
        query = query.gte('max_guests', filters.guests);
      }

      if (filters?.propertyType) {
        query = query.eq('type', filters.propertyType);
      }

      if (filters?.amenities && filters.amenities.length > 0) {
        query = query.contains('amenities', filters.amenities);
      }

      const { data, error } = await query;

      if (error) throw error;
      setListings(data || []);
    } catch (error) {
      console.error('Error fetching listings:', error);
      toast({
        title: "Error",
        description: "Failed to fetch listings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchListingById = async (id: string): Promise<Listing | null> => {
    try {
      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching listing:', error);
      return null;
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  return { listings, loading, fetchListings, fetchListingById };
};
