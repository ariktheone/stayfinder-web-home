
import { useState } from "react";
import { Listing } from "@/types/database";
import OptimizedPropertyCard from "./OptimizedPropertyCard";
import SkeletonCard from "./SkeletonCard";
import EmptyState from "./EmptyState";
import { Button } from "@/components/ui/button";
import { Grid, List } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchResultsProps {
  listings: Listing[];
  loading?: boolean;
  onClearFilters?: () => void;
}

const SearchResults = ({ listings, loading = false, onClearFilters }: SearchResultsProps) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (!listings.length) {
    return (
      <div className="container mx-auto px-4 py-8">
        <EmptyState 
          type="search" 
          onAction={onClearFilters}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* View Toggle */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {listings.length} {listings.length === 1 ? 'property' : 'properties'} found
          </h2>
        </div>
        
        <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className="h-8 w-8 p-0"
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("list")}
            className="h-8 w-8 p-0"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Results Grid/List */}
      <div className={cn(
        "transition-all duration-300",
        viewMode === "grid" 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          : "space-y-4"
      )}>
        {listings.map((listing, index) => (
          <div
            key={listing.id}
            className={cn(
              "animate-fade-in",
              viewMode === "list" && "max-w-none"
            )}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <OptimizedPropertyCard 
              listing={listing} 
              priority={index < 4}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
