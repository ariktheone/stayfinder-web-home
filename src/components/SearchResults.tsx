
import { useState } from "react";
import { Listing, SearchFilters } from "@/types/database";
import OptimizedPropertyCard from "./OptimizedPropertyCard";
import SkeletonCard from "./SkeletonCard";
import EmptyState from "./EmptyState";
import { Button } from "@/components/ui/button";
import { Grid, List, ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SearchResultsProps {
  listings: Listing[];
  loading?: boolean;
  onClearFilters?: () => void;
  currentFilters?: SearchFilters | null;
  onUpdateSort?: (sortBy: 'price_low' | 'price_high' | 'rating' | 'distance') => void;
}

const SearchResults = ({ 
  listings, 
  loading = false, 
  onClearFilters,
  currentFilters,
  onUpdateSort 
}: SearchResultsProps) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  if (loading) {
    return (
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 lg:py-8">
        <div className={cn(
          viewMode === "grid" 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
            : "space-y-4"
        )}>
          {Array.from({ length: 8 }).map((_, index) => (
            <SkeletonCard 
              key={index} 
              variant={viewMode === "list" ? "horizontal" : "vertical"} 
            />
          ))}
        </div>
      </div>
    );
  }

  if (!listings.length) {
    return (
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <EmptyState 
          type="search" 
          onAction={onClearFilters}
        />
      </div>
    );
  }

  const getSortLabel = () => {
    switch (currentFilters?.sortBy) {
      case 'price_low':
        return 'Price: Low to High';
      case 'price_high':
        return 'Price: High to Low';
      case 'rating':
        return 'Rating';
      case 'distance':
        return 'Distance';
      default:
        return 'Sort by';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 lg:py-8">
        {/* View Toggle and Sort - Optimized for Mobile */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
              {listings.length} {listings.length === 1 ? 'property' : 'properties'}
            </h2>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto justify-between sm:justify-end">
            {/* Sort Dropdown */}
            {onUpdateSort && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center space-x-2 touch-target">
                    <ArrowUpDown className="h-4 w-4" />
                    <span className="hidden sm:inline">{getSortLabel()}</span>
                    <span className="sm:hidden">Sort</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={() => onUpdateSort('price_low')}>
                    Price: Low to High
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onUpdateSort('price_high')}>
                    Price: High to Low
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onUpdateSort('rating')}>
                    Rating
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onUpdateSort('distance')}>
                    Distance
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            
            {/* View Toggle */}
            <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="h-8 w-8 p-0 touch-target"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="h-8 w-8 p-0 touch-target"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Results Grid/List - Optimized Layout */}
        <div className={cn(
          "transition-all duration-300",
          viewMode === "grid" 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
            : "space-y-4 max-w-none"
        )}>
          {listings.map((listing, index) => (
            <div
              key={listing.id}
              className={cn(
                "animate-fade-in touch-manipulation",
                viewMode === "list" && "w-full"
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <OptimizedPropertyCard 
                listing={listing} 
                priority={index < 6}
                variant={viewMode === "list" ? "horizontal" : "vertical"}
              />
            </div>
          ))}
        </div>

        {/* Load More Button - For Future Enhancement */}
        {listings.length > 0 && listings.length % 12 === 0 && (
          <div className="flex justify-center mt-8 sm:mt-12">
            <Button 
              variant="outline" 
              className="px-6 sm:px-8 py-2 sm:py-3 touch-target"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Load More Properties'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
