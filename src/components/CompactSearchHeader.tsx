
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchFilters } from "@/types/database";
import EnhancedSearchFilters from "./EnhancedSearchFilters";

interface CompactSearchHeaderProps {
  onBackToHome: () => void;
  onSearch: (filters: SearchFilters) => void;
  loading: boolean;
  currentFilters: SearchFilters | null;
  resultsCount: number;
}

const CompactSearchHeader = ({ 
  onBackToHome, 
  onSearch, 
  loading, 
  currentFilters, 
  resultsCount 
}: CompactSearchHeaderProps) => {
  return (
    <section className="bg-white shadow-sm border-b sticky top-0 sm:top-16 z-40 safe-area-top">
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
        {/* Header Row */}
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <Button
            variant="ghost"
            onClick={onBackToHome}
            className="flex items-center space-x-2 hover:bg-gray-100 px-2 sm:px-3 py-2 touch-target touch-manipulation"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline text-sm sm:text-base">Back to Home</span>
          </Button>
          
          <div className="text-center flex-1 mx-2 sm:mx-4">
            <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mobile-subtitle mobile-optimized">
              {currentFilters?.location ? `Stays in ${currentFilters.location}` : 'Search Results'}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mobile-text">
              {resultsCount} {resultsCount === 1 ? 'property' : 'properties'} found
            </p>
          </div>

          <div className="w-12 sm:w-20"></div> {/* Spacer for balance */}
        </div>

        {/* Compact Search Filters */}
        <div className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4 touch-manipulation">
          <EnhancedSearchFilters 
            onSearch={onSearch} 
            loading={loading} 
            initialFilters={currentFilters}
            compact={true}
          />
        </div>
      </div>
    </section>
  );
};

export default CompactSearchHeader;
