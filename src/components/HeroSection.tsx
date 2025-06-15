
import { Button } from "@/components/ui/button";
import { SearchFilters } from "@/types/database";
import EnhancedSearchFilters from "./EnhancedSearchFilters";

interface HeroSectionProps {
  onSearch: (filters: SearchFilters) => void;
  loading: boolean;
}

const HeroSection = ({ onSearch, loading }: HeroSectionProps) => {
  return (
    <section className="relative py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 px-3 sm:px-4 overflow-hidden hero-section safe-area-top">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-rose-50/30 to-blue-50/30"></div>
      <div 
        className="absolute inset-0 opacity-40" 
        style={{
          backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fillRule=\"evenodd\"%3E%3Cg fill=\"%23f1f5f9\" fillOpacity=\"0.3\"%3E%3Ccircle cx=\"7\" cy=\"7\" r=\"1\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
        }}
      />
      
      <div className="container mx-auto text-center relative z-10 max-w-7xl">
        <div className="animate-fade-in hero-content">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold bg-gradient-to-r from-gray-900 via-rose-600 to-blue-600 bg-clip-text text-transparent mb-4 sm:mb-6 md:mb-8 leading-tight px-2 mobile-title mobile-optimized">
            Find your perfect stay
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-6 sm:mb-8 md:mb-10 lg:mb-12 max-w-3xl mx-auto leading-relaxed px-3 sm:px-4 mobile-text">
            Discover unique places to stay around the world, from cozy apartments to luxury villas. 
            Your next adventure awaits.
          </p>
        </div>
        
        {/* Search Component */}
        <div className="max-w-5xl mx-auto animate-scale-in px-2 sm:px-4">
          <div className="bg-white/90 sm:bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl shadow-xl sm:shadow-2xl border border-white/20 p-2 sm:p-3 md:p-4 touch-manipulation">
            <EnhancedSearchFilters onSearch={onSearch} loading={loading} />
          </div>
        </div>

        {/* Stats */}
        <div className="stats-grid grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mt-8 sm:mt-12 md:mt-16 max-w-2xl mx-auto px-3 sm:px-4">
          <div className="text-center touch-manipulation">
            <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-rose-600 mobile-optimized">10M+</div>
            <div className="text-xs sm:text-sm text-gray-600 mt-1">Happy Guests</div>
          </div>
          <div className="text-center touch-manipulation">
            <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-blue-600 mobile-optimized">200K+</div>
            <div className="text-xs sm:text-sm text-gray-600 mt-1">Unique Stays</div>
          </div>
          <div className="text-center touch-manipulation">
            <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-green-600 mobile-optimized">50K+</div>
            <div className="text-xs sm:text-sm text-gray-600 mt-1">Cities</div>
          </div>
          <div className="text-center touch-manipulation">
            <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-purple-600 mobile-optimized">4.8★</div>
            <div className="text-xs sm:text-sm text-gray-600 mt-1">Average Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
