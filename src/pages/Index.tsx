
import { useState } from "react";
import { Listing, SearchFilters } from "@/types/database";
import { useListings } from "@/hooks/useListings";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import PopularDestinations from "@/components/PopularDestinations";
import SearchResults from "@/components/SearchResults";
import CompactSearchHeader from "@/components/CompactSearchHeader";
import PropertyCard from "@/components/PropertyCard";

const Index = () => {
  const { listings, loading, fetchListings } = useListings();
  const [filteredListings, setFilteredListings] = useState<Listing[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [currentFilters, setCurrentFilters] = useState<SearchFilters | null>(null);

  const applySorting = (listingsToSort: Listing[], sortBy: string) => {
    let sorted = [...listingsToSort];
    switch (sortBy) {
      case 'price_low':
        sorted.sort((a, b) => a.price_per_night - b.price_per_night);
        break;
      case 'price_high':
        sorted.sort((a, b) => b.price_per_night - a.price_per_night);
        break;
      case 'rating':
        // For now, we'll use a random rating since we don't have real ratings yet
        sorted.sort(() => Math.random() - 0.5);
        break;
      default:
        break;
    }
    return sorted;
  };

  const handleSearch = async (filters: SearchFilters) => {
    console.log('Searching with filters:', filters);
    setHasSearched(true);
    setCurrentFilters(filters);
    
    try {
      await fetchListings(filters);
      const sorted = applySorting(listings, filters.sortBy || 'price_low');
      setFilteredListings(sorted);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  const handleBackToHome = () => {
    setHasSearched(false);
    setFilteredListings([]);
    setCurrentFilters(null);
  };

  const handleClearFilters = () => {
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
    handleSearch(emptyFilters);
  };

  const handleUpdateSort = (sortBy: string) => {
    if (currentFilters) {
      const updatedFilters = { ...currentFilters, sortBy };
      setCurrentFilters(updatedFilters);
      const sorted = applySorting(filteredListings, sortBy);
      setFilteredListings(sorted);
    }
  };

  const displayListings = hasSearched ? filteredListings : listings;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <Header />
      
      {!hasSearched ? (
        <>
          <HeroSection onSearch={handleSearch} loading={loading} />
          <FeaturesSection />
          <PopularDestinations />
          
          {/* Featured Listings Section */}
          <section className="py-16 px-4 bg-white/30">
            <div className="container mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Featured stays
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Handpicked accommodations for your perfect getaway
                </p>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-64 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl mb-4"></div>
                      <div className="space-y-3">
                        <div className="h-4 bg-gray-300 rounded-full w-3/4"></div>
                        <div className="h-4 bg-gray-300 rounded-full w-1/2"></div>
                        <div className="h-4 bg-gray-300 rounded-full w-1/4"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : displayListings.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {displayListings.slice(0, 8).map((listing, index) => (
                    <div 
                      key={listing.id} 
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <PropertyCard listing={listing} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No properties available</h3>
                  <p className="text-gray-500">Start searching to discover amazing places to stay!</p>
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
