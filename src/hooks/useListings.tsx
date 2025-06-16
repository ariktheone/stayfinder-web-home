
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
      console.log('Fetching listings with filters:', filters);
      
      let query = supabase.from('listings').select('*');

      if (filters?.location && filters.location.trim() !== '') {
        // More flexible location search - check multiple fields
        const locationTerm = filters.location.toLowerCase().trim();
        query = query.or(`location.ilike.%${locationTerm}%,city.ilike.%${locationTerm}%,title.ilike.%${locationTerm}%,description.ilike.%${locationTerm}%`);
      }

      if (filters?.minPrice && filters.minPrice > 0) {
        query = query.gte('price_per_night', filters.minPrice * 100);
      }

      if (filters?.maxPrice && filters.maxPrice < 1000) {
        query = query.lte('price_per_night', filters.maxPrice * 100);
      }

      if (filters?.guests && filters.guests > 1) {
        query = query.gte('max_guests', filters.guests);
      }

      if (filters?.propertyType && filters.propertyType !== '') {
        query = query.eq('type', filters.propertyType);
      }

      if (filters?.amenities && filters.amenities.length > 0) {
        query = query.contains('amenities', filters.amenities);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      console.log('Fetched listings:', data?.length || 0, 'results');
      setListings(data || []);
      
      // If no results found and we have a location filter, try a broader search
      if ((!data || data.length === 0) && filters?.location) {
        console.log('No results found, trying broader search...');
        const broadQuery = supabase.from('listings').select('*').limit(20);
        const { data: fallbackData, error: fallbackError } = await broadQuery;
        
        if (!fallbackError && fallbackData) {
          console.log('Fallback search returned:', fallbackData.length, 'results');
          // Only use fallback if we have results
          if (fallbackData.length > 0) {
            setListings(fallbackData);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching listings:', error);
      toast({
        title: "Search Error",
        description: "Unable to search properties. Please try again.",
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
