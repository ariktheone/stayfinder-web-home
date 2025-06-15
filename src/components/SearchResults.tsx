
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Listing } from "@/types/database";
import PropertyCard from "./PropertyCard";

interface SearchResultsProps {
  listings: Listing[];
  loading: boolean;
  onBackToHome: () => void;
  onClearFilters: () => void;
}

const SearchResults = ({ listings, loading, onBackToHome, onClearFilters }: SearchResultsProps) => {
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
            <MapPin className="h-16 w-16 text-gray-400" />
          </div>
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-4">
            No stays found
          </h3>
          <p className="text-lg text-gray-500 mb-8 max-w-md mx-auto">
            Try adjusting your search filters or exploring a different area
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={onBackToHome}
              className="bg-gradient-to-r from-rose-500 to-blue-500 hover:from-rose-600 hover:to-blue-600 text-white px-8 py-3 text-lg"
            >
              Explore All Stays
            </Button>
            <Button
              variant="outline"
              onClick={onClearFilters}
              className="px-8 py-3 text-lg"
            >
              Clear Filters
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
    </div>
  );
};

export default SearchResults;
