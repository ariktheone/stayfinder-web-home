
import { Button } from "@/components/ui/button";
import { SearchFilters } from "@/types/database";
import EnhancedSearchFilters from "./EnhancedSearchFilters";

interface HeroSectionProps {
  onSearch: (filters: SearchFilters) => void;
  loading: boolean;
}

const HeroSection = ({ onSearch, loading }: HeroSectionProps) => {
  return (
    <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 px-4 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-rose-50/30 to-blue-50/30"></div>
      <div 
        className="absolute inset-0 opacity-40" 
        style={{
          backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fillRule=\"evenodd\"%3E%3Cg fill=\"%23f1f5f9\" fillOpacity=\"0.3\"%3E%3Ccircle cx=\"7\" cy=\"7\" r=\"1\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
        }}
      />
      
      <div className="container mx-auto text-center relative z-10 max-w-7xl">
        <div className="animate-fade-in">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-gray-900 via-rose-600 to-blue-600 bg-clip-text text-transparent mb-6 sm:mb-8 leading-tight px-2">
            Find your perfect stay
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 sm:mb-10 md:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
            Discover unique places to stay around the world, from cozy apartments to luxury villas. 
            Your next adventure awaits.
          </p>
        </div>
        
        {/* Search Component */}
        <div className="max-w-5xl mx-auto animate-scale-in px-2">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-2xl border border-white/20 p-1 sm:p-2">
            <EnhancedSearchFilters onSearch={onSearch} loading={loading} />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-12 sm:mt-16 max-w-2xl mx-auto px-4">
          <div className="text-center">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-rose-600">10M+</div>
            <div className="text-xs sm:text-sm text-gray-600">Happy Guests</div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600">200K+</div>
            <div className="text-xs sm:text-sm text-gray-600">Unique Stays</div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-green-600">50K+</div>
            <div className="text-xs sm:text-sm text-gray-600">Cities</div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-600">4.8★</div>
            <div className="text-xs sm:text-sm text-gray-600">Average Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
