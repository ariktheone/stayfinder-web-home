
import { MapPin, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Listing, SearchFilters } from "@/types/database";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PropertyCard from "./PropertyCard";

interface SearchResultsProps {
  listings: Listing[];
  loading: boolean;
  onBackToHome: () => void;
  onClearFilters: () => void;
  currentFilters?: SearchFilters | null;
  onUpdateSort?: (sortBy: string) => void;
}

const SearchResults = ({ 
  listings, 
  loading, 
  onBackToHome, 
  onClearFilters, 
  currentFilters,
  onUpdateSort 
}: SearchResultsProps) => {
  if (loading) {
    return (
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-48 sm:h-64 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl sm:rounded-2xl mb-4"></div>
              <div className="space-y-3 px-2">
                <div className="h-4 bg-gray-300 rounded-full w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded-full w-1/2"></div>
                <div className="h-4 bg-gray-300 rounded-full w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <div className="container mx-auto px-3 sm:px-4 py-12 sm:py-16">
        <div className="text-center max-w-md mx-auto">
          <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
            <MapPin className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400" />
          </div>
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-3">
            No stays found
          </h3>
          <p className="text-gray-500 mb-8 text-sm sm:text-base">
            Try adjusting your search criteria or explore different locations
          </p>
          <div className="flex flex-col gap-3 w-full">
            <Button
              onClick={onBackToHome}
              className="w-full bg-gradient-to-r from-rose-500 to-blue-500 hover:from-rose-600 hover:to-blue-600 text-white h-12 touch-target"
            >
              Explore All Stays
            </Button>
            <Button
              variant="outline"
              onClick={onClearFilters}
              className="w-full h-12 touch-target"
            >
              Clear Filters
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6">
      {/* Results Header */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
              {listings.length} {listings.length === 1 ? 'stay' : 'stays'} found
            </h3>
            {currentFilters?.location && (
              <p className="text-gray-600 text-sm sm:text-base">in {currentFilters.location}</p>
            )}
          </div>
        </div>

        {/* Sort Options - Mobile responsive */}
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm text-gray-600 whitespace-nowrap">Sort by:</span>
          <Select
            value={currentFilters?.sortBy || 'price_low'}
            onValueChange={onUpdateSort}
          >
            <SelectTrigger className="flex-1 max-w-48 h-12 touch-target">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price_low">Price: Low to High</SelectItem>
              <SelectItem value="price_high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="distance">Distance</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results Grid - Mobile optimized */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {listings.map((listing, index) => (
          <div 
            key={listing.id} 
            className="animate-fade-in"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <PropertyCard listing={listing} />
          </div>
        ))}
      </div>

      {/* Results summary */}
      {listings.length > 0 && (
        <div className="text-center mt-8 sm:mt-12">
          <p className="text-gray-500 text-sm sm:text-base">
            Showing {listings.length} of {listings.length} properties
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
