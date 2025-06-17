
import { MapPin, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Listing, SearchFilters } from "@/types/database";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import OptimizedPropertyCard from "./OptimizedPropertyCard";
import LoadingSpinner from "./LoadingSpinner";

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
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <LoadingSpinner size="lg" />
          <p className="text-gray-600 mt-4">Finding perfect stays for you...</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
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
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-md mx-auto">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
            <MapPin className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-3">
            No stays found
          </h3>
          <p className="text-gray-500 mb-8">
            Try adjusting your search criteria or explore different locations to find the perfect stay.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={onBackToHome}
              className="bg-gradient-to-r from-rose-500 to-blue-500 hover:from-rose-600 hover:to-blue-600 text-white"
            >
              Explore All Stays
            </Button>
            <Button
              variant="outline"
              onClick={onClearFilters}
            >
              Clear Filters
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Results Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {listings.length} stays found
          </h3>
          {currentFilters?.location && (
            <p className="text-gray-600">in {currentFilters.location}</p>
          )}
        </div>

        {/* Sort Options */}
        <div className="flex items-center space-x-3">
          <span className="text-sm text-gray-600">Sort by:</span>
          <Select
            value={currentFilters?.sortBy || 'price_low'}
            onValueChange={onUpdateSort}
          >
            <SelectTrigger className="w-48">
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

      {/* Results Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {listings.map((listing, index) => (
          <div 
            key={listing.id} 
            className="animate-fade-in"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <OptimizedPropertyCard listing={listing} priority={index < 4} />
          </div>
        ))}
      </div>

      {/* Results Summary */}
      {listings.length > 0 && (
        <div className="text-center mt-12">
          <p className="text-gray-500">
            Showing {listings.length} {listings.length === 1 ? 'property' : 'properties'}
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
