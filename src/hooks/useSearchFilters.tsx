
import { useState } from 'react';
import { SearchFilters } from '@/types/database';

export const useSearchFilters = () => {
  const [filters, setFilters] = useState<SearchFilters>({
    location: '',
    minPrice: 50,
    maxPrice: 500,
    checkIn: '',
    checkOut: '',
    guests: 1,
    propertyType: '',
    amenities: []
  });

  const updateFilter = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      location: '',
      minPrice: 50,
      maxPrice: 500,
      checkIn: '',
      checkOut: '',
      guests: 1,
      propertyType: '',
      amenities: []
    });
  };

  return { filters, updateFilter, clearFilters };
};
