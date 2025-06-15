
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
    <section className="bg-white shadow-sm border-b sticky top-16 z-40">
      <div className="container mx-auto px-4 py-4">
        {/* Header Row */}
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            onClick={onBackToHome}
            className="flex items-center space-x-2 hover:bg-gray-100 px-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back to Home</span>
          </Button>
          
          <div className="text-center flex-1 mx-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">
              {currentFilters?.location ? `Stays in ${currentFilters.location}` : 'Search Results'}
            </h2>
            <p className="text-sm text-gray-600">
              {resultsCount} {resultsCount === 1 ? 'property' : 'properties'} found
            </p>
          </div>

          <div className="w-20"></div> {/* Spacer for balance */}
        </div>

        {/* Compact Search Filters */}
        <div className="bg-gray-50 rounded-xl p-4">
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
