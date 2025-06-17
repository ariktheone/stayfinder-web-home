
import { useState, useEffect, useCallback, useMemo } from "react";
import { Listing, SearchFilters } from "@/types/database";
import { useOptimizedSearch } from "@/hooks/useOptimizedSearch";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import PopularDestinations from "@/components/PopularDestinations";
import SearchResults from "@/components/SearchResults";
import CompactSearchHeader from "@/components/CompactSearchHeader";
import PropertyCard from "@/components/PropertyCard";

const Index = () => {
  const { listings, allListings, loading, fetchListings } = useOptimizedSearch();
  const [hasSearched, setHasSearched] = useState(false);
  const [currentFilters, setCurrentFilters] = useState<SearchFilters | null>(null);

  // Memoized sort function
  const applySorting = useCallback((listingsToSort: Listing[], sortBy: string) => {
    const sorted = [...listingsToSort];
    switch (sortBy) {
      case 'price_low':
        return sorted.sort((a, b) => a.price_per_night - b.price_per_night);
      case 'price_high':
        return sorted.sort((a, b) => b.price_per_night - a.price_per_night);
      case 'rating':
        return sorted.sort(() => Math.random() - 0.5);
      default:
        return sorted;
    }
  }, []);

  // Optimized search handler
  const handleSearch = useCallback(async (filters: SearchFilters) => {
    console.log('Searching with filters:', filters);
    setHasSearched(true);
    setCurrentFilters(filters);
    await fetchListings(filters);
  }, [fetchListings]);

  // Optimized destination click handler
  const handleDestinationClick = useCallback(async (location: string) => {
    console.log('Destination clicked:', location);
    const destinationFilters: SearchFilters = {
      location: location,
      checkIn: '',
      checkOut: '',
      guests: 1,
      minPrice: 0,
      maxPrice: 1000,
      propertyType: '',
      amenities: [],
      instantBook: false,
      sortBy: 'price_low'
    };
    
    setHasSearched(true);
    setCurrentFilters(destinationFilters);
    await fetchListings(destinationFilters);
  }, [fetchListings]);

  // Memoized sorted listings
  const sortedListings = useMemo(() => {
    if (!currentFilters?.sortBy) return listings;
    return applySorting(listings, currentFilters.sortBy);
  }, [listings, currentFilters?.sortBy, applySorting]);

  const handleBackToHome = useCallback(async () => {
    setHasSearched(false);
    setCurrentFilters(null);
    await fetchListings();
  }, [fetchListings]);

  const handleClearFilters = useCallback(async () => {
    const emptyFilters: SearchFilters = {
      location: '',
      checkIn: '',
      checkOut: '',
      guests: 1,
      minPrice: 0,
      maxPrice: 1000,
      propertyType: '',
      amenities: [],
      instantBook: false,
      sortBy: 'price_low'
    };
    await handleSearch(emptyFilters);
  }, [handleSearch]);

  const handleUpdateSort = useCallback((sortBy: 'price_low' | 'price_high' | 'rating' | 'distance') => {
    if (currentFilters) {
      const updatedFilters: SearchFilters = { ...currentFilters, sortBy };
      setCurrentFilters(updatedFilters);
    }
  }, [currentFilters]);

  // Memoized display listings
  const displayListings = useMemo(() => {
    return hasSearched ? sortedListings : allListings;
  }, [hasSearched, sortedListings, allListings]);

  // Memoized featured listings
  const featuredListings = useMemo(() => {
    return allListings.slice(0, 8);
  }, [allListings]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 mobile-optimized safe-area-top safe-area-bottom">
      <Header />
      
      {!hasSearched ? (
        <>
          <HeroSection onSearch={handleSearch} loading={loading} />
          <FeaturesSection />
          <PopularDestinations onDestinationClick={handleDestinationClick} />
          
          {/* Featured Listings Section */}
          <section className="py-8 sm:py-12 md:py-16 px-3 sm:px-4 bg-white/30 section-spacing">
            <div className="container mx-auto max-w-7xl">
              <div className="text-center mb-6 sm:mb-8 md:mb-12">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-2 sm:px-4 mobile-title mobile-optimized">
                  Featured stays
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-3 sm:px-4 mobile-text">
                  Handpicked accommodations for your perfect getaway
                </p>
              </div>

              {loading ? (
                <div className="property-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="animate-pulse touch-manipulation">
                      <div className="h-48 sm:h-56 md:h-64 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl sm:rounded-2xl mb-4"></div>
                      <div className="space-y-3 px-2">
                        <div className="h-4 bg-gray-300 rounded-full w-3/4"></div>
                        <div className="h-4 bg-gray-300 rounded-full w-1/2"></div>
                        <div className="h-4 bg-gray-300 rounded-full w-1/4"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : featuredListings.length > 0 ? (
                <div className="property-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 px-1 sm:px-2">
                  {featuredListings.map((listing, index) => (
                    <div 
                      key={listing.id} 
                      className="animate-fade-in touch-manipulation"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <PropertyCard listing={listing} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 sm:py-16 md:py-20 px-3 sm:px-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-4 sm:mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-700 mb-2 mobile-subtitle mobile-optimized">No properties available</h3>
                  <p className="text-sm sm:text-base text-gray-500 mobile-text">Start searching to discover amazing places to stay!</p>
                </div>
              )}
            </div>
          </section>
        </>
      ) : (
        <>
          <CompactSearchHeader
            onBackToHome={handleBackToHome}
            onSearch={handleSearch}
            loading={loading}
            currentFilters={currentFilters}
            resultsCount={displayListings.length}
          />
          <SearchResults
            listings={displayListings}
            loading={loading}
            onBackToHome={handleBackToHome}
            onClearFilters={handleClearFilters}
            currentFilters={currentFilters}
            onUpdateSort={handleUpdateSort}
          />
        </>
      )}
    </div>
  );
};

export default Index;
