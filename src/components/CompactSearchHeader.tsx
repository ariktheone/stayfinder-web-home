
import { ArrowLeft, Filter } from "lucide-react";
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
    <section className="py-4 px-4 bg-white shadow-sm border-b sticky top-16 z-40">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            onClick={onBackToHome}
            className="flex items-center space-x-2 hover:bg-gray-100"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Button>
          
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-900">
              {currentFilters?.location ? `Stays in ${currentFilters.location}` : 'Search Results'}
            </h2>
            <p className="text-sm text-gray-600">
              {resultsCount} {resultsCount === 1 ? 'property' : 'properties'} found
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-500">Filters</span>
          </div>
        </div>

        {/* Compact Search Filters */}
        <div className="bg-gray-50 rounded-xl p-3">
          <EnhancedSearchFilters onSearch={onSearch} loading={loading} />
        </div>
      </div>
    </section>
  );
};

export default CompactSearchHeader;
