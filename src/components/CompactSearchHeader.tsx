
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchFilters } from "@/types/database";
import EnhancedSearchFilters from "./EnhancedSearchFilters";
import { useState, useEffect } from "react";

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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className={`
      bg-white border-b border-gray-200 sticky top-0 sm:top-16 z-40 safe-area-top
      transition-all duration-300 ease-in-out
      ${isScrolled ? 'shadow-lg backdrop-blur-sm bg-white/95' : 'shadow-sm'}
    `}>
      {/* Compact Header Row - Always Visible */}
      <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-3">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={onBackToHome}
            className="flex items-center space-x-2 hover:bg-gray-100 px-2 sm:px-3 py-2 touch-target touch-manipulation"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline text-sm sm:text-base">Back</span>
          </Button>
          
          <div className="text-center flex-1 mx-2 sm:mx-4">
            <h2 className={`
              font-bold text-gray-900 mobile-subtitle mobile-optimized transition-all duration-300
              ${isScrolled ? 'text-sm sm:text-base' : 'text-base sm:text-lg md:text-xl'}
            `}>
              {currentFilters?.location ? `${currentFilters.location}` : 'Search Results'}
            </h2>
            <p className={`
              text-gray-600 mobile-text transition-all duration-300
              ${isScrolled ? 'text-xs' : 'text-xs sm:text-sm'}
            `}>
              {resultsCount} {resultsCount === 1 ? 'property' : 'properties'}
            </p>
          </div>

          <Button
            variant="ghost"
            onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
            className={`
              px-2 sm:px-3 py-2 touch-target text-sm font-medium rounded-lg
              transition-all duration-200
              ${isFiltersExpanded 
                ? 'bg-rose-100 text-rose-700 hover:bg-rose-200' 
                : 'hover:bg-gray-100 text-gray-700'
              }
            `}
          >
            <span className="hidden sm:inline">
              {isFiltersExpanded ? 'Hide' : 'Filters'}
            </span>
            <span className="sm:hidden">
              {isFiltersExpanded ? '✕' : '☰'}
            </span>
          </Button>
        </div>

        {/* Expandable Search Filters */}
        <div className={`
          overflow-hidden transition-all duration-300 ease-in-out
          ${isFiltersExpanded ? 'max-h-96 opacity-100 mt-3' : 'max-h-0 opacity-0'}
        `}>
          <div className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4 touch-manipulation">
            <EnhancedSearchFilters 
              onSearch={(filters) => {
                onSearch(filters);
                setIsFiltersExpanded(false); // Auto-collapse after search
              }} 
              loading={loading} 
              initialFilters={currentFilters}
              compact={true}
            />
          </div>
        </div>
      </div>

      {/* Minimal Scrolled State - When Scrolled Down */}
      {isScrolled && !isFiltersExpanded && (
        <div className="border-t border-gray-100 bg-white/90 backdrop-blur-sm">
          <div className="container mx-auto px-3 sm:px-4 py-2">
            <div className="flex items-center justify-center space-x-4 text-xs sm:text-sm text-gray-600">
              {currentFilters?.location && (
                <span className="bg-rose-100 text-rose-700 px-2 py-1 rounded-full">
                  📍 {currentFilters.location}
                </span>
              )}
              {currentFilters?.guests && currentFilters.guests > 1 && (
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                  👥 {currentFilters.guests} guests
                </span>
              )}
              {currentFilters?.checkIn && (
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  📅 {new Date(currentFilters.checkIn).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CompactSearchHeader;
