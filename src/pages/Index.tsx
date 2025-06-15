
import { useState } from "react";
import { Listing, SearchFilters } from "@/types/database";
import { useListings } from "@/hooks/useListings";
import Header from "@/components/Header";
import EnhancedSearchFilters from "@/components/EnhancedSearchFilters";
import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { MapPin, Star, TrendingUp } from "lucide-react";

const Index = () => {
  const { listings, loading, fetchListings } = useListings();
  const [filteredListings, setFilteredListings] = useState<Listing[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (filters: SearchFilters) => {
    setHasSearched(true);
    await fetchListings(filters);
    
    // Apply sorting
    let sorted = [...listings];
    switch (filters.sortBy) {
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
    
    setFilteredListings(sorted);
  };

  const displayListings = hasSearched ? filteredListings : listings;

  const popularDestinations = [
    { name: "New York", image: "/placeholder.svg", count: "1,000+ stays" },
    { name: "Los Angeles", image: "/placeholder.svg", count: "800+ stays" },
    { name: "San Francisco", image: "/placeholder.svg", count: "600+ stays" },
    { name: "Miami", image: "/placeholder.svg", count: "500+ stays" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Find your perfect stay
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Discover unique places to stay around the world, from cozy apartments to luxury villas
          </p>
          
          {/* Search Component */}
          <div className="max-w-4xl mx-auto">
            <EnhancedSearchFilters onSearch={handleSearch} loading={loading} />
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      {!hasSearched && (
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
              <TrendingUp className="h-8 w-8 mr-3 text-rose-500" />
              Popular destinations
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {popularDestinations.map((destination) => (
                <div
                  key={destination.name}
                  className="relative rounded-lg overflow-hidden cursor-pointer group"
                >
                  <div className="aspect-square bg-gray-200">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-end p-4">
                    <h3 className="text-white font-semibold text-lg">{destination.name}</h3>
                    <p className="text-white text-sm opacity-90">{destination.count}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Listings Results */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          {hasSearched && (
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                {displayListings.length} {displayListings.length === 1 ? 'stay' : 'stays'} found
              </h2>
              <Button
                variant="outline"
                onClick={() => {
                  setHasSearched(false);
                  setFilteredListings([]);
                }}
              >
                Clear filters
              </Button>
            </div>
          )}

          {!hasSearched && (
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Featured stays
            </h2>
          )}

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-48 bg-gray-300 rounded-t-lg"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : displayListings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayListings.map((listing) => (
                <PropertyCard key={listing.id} listing={listing} />
              ))}
            </div>
          ) : hasSearched ? (
            <div className="text-center py-12">
              <MapPin className="h-24 w-24 mx-auto text-gray-300 mb-6" />
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                No stays found
              </h3>
              <p className="text-gray-500 mb-8">
                Try adjusting your search filters or exploring a different area
              </p>
              <Button
                onClick={() => {
                  setHasSearched(false);
                  setFilteredListings([]);
                }}
                className="bg-rose-500 hover:bg-rose-600"
              >
                Clear filters and explore
              </Button>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">Start searching to discover amazing places to stay!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Index;
