
import { useState, useEffect } from "react";
import { Listing, SearchFilters } from "@/types/database";
import { useListings } from "@/hooks/useListings";
import Header from "@/components/Header";
import SearchResults from "@/components/SearchResults";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AllListings = () => {
  const { listings, loading, fetchListings } = useListings();
  const [currentFilters, setCurrentFilters] = useState<SearchFilters | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all listings when component mounts
    fetchListings();
  }, []);

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleClearFilters = async () => {
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
    setCurrentFilters(emptyFilters);
    await fetchListings(emptyFilters);
  };

  const handleUpdateSort = (sortBy: 'price_low' | 'price_high' | 'rating' | 'distance') => {
    const updatedFilters: SearchFilters = { 
      ...currentFilters,
      sortBy 
    };
    setCurrentFilters(updatedFilters);
    
    // Apply sorting locally
    const sorted = [...listings].sort((a, b) => {
      switch (sortBy) {
        case 'price_low':
          return a.price_per_night - b.price_per_night;
        case 'price_high':
          return b.price_per_night - a.price_per_night;
        case 'rating':
          return Math.random() - 0.5; // Random for now since we don't have real ratings
        default:
          return 0;
      }
    });
    
    // Update the listings with sorted data
    // Since we can't directly modify the hook's state, we'll trigger a refetch
    fetchListings(updatedFilters);
  };

  const handleSearch = async (filters: SearchFilters) => {
    setCurrentFilters(filters);
    await fetchListings(filters);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <Header />
      
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackToHome}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">All Listings</h1>
              <p className="text-gray-600">
                {loading ? "Loading..." : `${listings.length} properties available`}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search Results */}
      <SearchResults
        listings={listings}
        loading={loading}
        onBackToHome={handleBackToHome}
        onClearFilters={handleClearFilters}
        currentFilters={currentFilters}
        onUpdateSort={handleUpdateSort}
        onSearch={handleSearch}
        showSearchBar={true}
      />
    </div>
  );
};

export default AllListings;
