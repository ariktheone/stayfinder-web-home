
import { Button } from "@/components/ui/button";
import { SearchFilters } from "@/types/database";
import EnhancedSearchFilters from "./EnhancedSearchFilters";

interface HeroSectionProps {
  onSearch: (filters: SearchFilters) => void;
  loading: boolean;
}

const HeroSection = ({ onSearch, loading }: HeroSectionProps) => {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-rose-50/30 to-blue-50/30"></div>
      <div 
        className="absolute inset-0 opacity-40" 
        style={{
          backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fillRule=\"evenodd\"%3E%3Cg fill=\"%23f1f5f9\" fillOpacity=\"0.3\"%3E%3Ccircle cx=\"7\" cy=\"7\" r=\"1\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
        }}
      />
      
      <div className="container mx-auto text-center relative z-10">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 via-rose-600 to-blue-600 bg-clip-text text-transparent mb-8 leading-tight">
            Find your perfect stay
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Discover unique places to stay around the world, from cozy apartments to luxury villas. 
            Your next adventure awaits.
          </p>
        </div>
        
        {/* Search Component */}
        <div className="max-w-5xl mx-auto animate-scale-in">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-2">
            <EnhancedSearchFilters onSearch={onSearch} loading={loading} />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-rose-600">10M+</div>
            <div className="text-sm text-gray-600">Happy Guests</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-blue-600">200K+</div>
            <div className="text-sm text-gray-600">Unique Stays</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-green-600">50K+</div>
            <div className="text-sm text-gray-600">Cities</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-purple-600">4.8★</div>
            <div className="text-sm text-gray-600">Average Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
