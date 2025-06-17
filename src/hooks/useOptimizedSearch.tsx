
import { useState, useEffect, useMemo, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Listing, SearchFilters } from '@/types/database';
import { useToast } from '@/hooks/use-toast';

export const useOptimizedSearch = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [allListings, setAllListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchCache, setSearchCache] = useState<Map<string, Listing[]>>(new Map());
  const { toast } = useToast();

  // Cache key generator
  const generateCacheKey = useCallback((filters?: SearchFilters) => {
    if (!filters) return 'all';
    return JSON.stringify({
      location: filters.location || '',
      minPrice: filters.minPrice || 0,
      maxPrice: filters.maxPrice || 1000,
      guests: filters.guests || 1,
      propertyType: filters.propertyType || '',
      amenities: filters.amenities?.sort() || []
    });
  }, []);

  // Optimized fetch with caching
  const fetchListings = useCallback(async (filters?: SearchFilters) => {
    const cacheKey = generateCacheKey(filters);
    
    // Check cache first
    if (searchCache.has(cacheKey)) {
      const cachedResults = searchCache.get(cacheKey)!;
      setListings(cachedResults);
      return cachedResults;
    }

    try {
      setLoading(true);
      let query = supabase.from('listings').select('*');

      // Apply filters efficiently
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

      const { data, error } = await query.limit(50); // Limit for performance

      if (error) throw error;
      
      const results = data || [];
      
      // Cache the results
      setSearchCache(prev => new Map(prev.set(cacheKey, results)));
      setListings(results);
      
      return results;
    } catch (error) {
      console.error('Error fetching listings:', error);
      toast({
        title: "Search Error",
        description: "Failed to fetch listings. Please try again.",
        variant: "destructive",
      });
      return [];
    } finally {
      setLoading(false);
    }
  }, [generateCacheKey, searchCache, toast]);

  // Load all listings once on mount
  useEffect(() => {
    const loadAllListings = async () => {
      try {
        const { data, error } = await supabase
          .from('listings')
          .select('*')
          .limit(100);

        if (error) throw error;
        
        setAllListings(data || []);
        setListings(data || []);
      } catch (error) {
        console.error('Error loading listings:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAllListings();
  }, []);

  // Client-side sorting for better performance
  const sortedListings = useMemo(() => {
    return [...listings];
  }, [listings]);

  // Clear cache when needed
  const clearCache = useCallback(() => {
    setSearchCache(new Map());
  }, []);

  return {
    listings: sortedListings,
    allListings,
    loading,
    fetchListings,
    clearCache
  };
};
