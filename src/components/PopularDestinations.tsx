
import { TrendingUp, MapPin, Star, Users } from "lucide-react";

interface PopularDestinationsProps {
  onDestinationClick?: (location: string) => void;
}

const PopularDestinations = ({ onDestinationClick }: PopularDestinationsProps) => {
  const destinations = [
    { 
      name: "New York", 
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=300&fit=crop", 
      count: "1,000+ stays",
      description: "The city that never sleeps",
      highlights: ["Times Square", "Central Park", "Broadway"],
      rating: 4.8,
      avgPrice: 180,
      weather: "15°C",
      topAmenity: "Rooftop views"
    },
    { 
      name: "Los Angeles", 
      image: "https://images.unsplash.com/photo-1444927714506-8492d94b5ba0?w=400&h=300&fit=crop", 
      count: "800+ stays",
      description: "City of angels and dreams",
      highlights: ["Hollywood", "Santa Monica", "Beverly Hills"],
      rating: 4.7,
      avgPrice: 160,
      weather: "22°C",
      topAmenity: "Pool access"
    },
    { 
      name: "San Francisco", 
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop", 
      count: "600+ stays",
      description: "Golden Gate and innovation",
      highlights: ["Golden Gate", "Alcatraz", "Fisherman's Wharf"],
      rating: 4.6,
      avgPrice: 200,
      weather: "18°C",
      topAmenity: "Bay views"
    },
    { 
      name: "Miami", 
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop", 
      count: "500+ stays",
      description: "Sun, sand, and nightlife",
      highlights: ["South Beach", "Art Deco", "Ocean Drive"],
      rating: 4.9,
      avgPrice: 140,
      weather: "28°C",
      topAmenity: "Beach access"
    },
  ];

  const handleDestinationClick = (destinationName: string) => {
    console.log('Popular destination clicked:', destinationName);
    if (onDestinationClick) {
      onDestinationClick(destinationName);
    }
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 px-3 sm:px-4 section-spacing">
      <div className="container mx-auto">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center justify-center mobile-title mobile-optimized">
            <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 mr-2 sm:mr-3 text-rose-500" />
            Popular destinations
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mobile-text">
            Explore the world's most loved destinations
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {destinations.map((destination, index) => (
            <div
              key={destination.name}
              className="relative rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer group hover-scale shadow-lg touch-manipulation hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 active:scale-95"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handleDestinationClick(destination.name)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleDestinationClick(destination.name);
                }
              }}
              aria-label={`Search stays in ${destination.name} - ${destination.description}`}
            >
              <div className="aspect-[4/5] bg-gradient-to-br from-gray-200 to-gray-300 relative overflow-hidden">
                <img
                  src={destination.image}
                  alt={`${destination.name} - ${destination.description}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder.svg';
                  }}
                />
                {/* Weather badge */}
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 sm:px-3 py-1 text-gray-800 text-xs sm:text-sm font-medium shadow-sm">
                    {destination.weather}
                  </div>
                </div>
                {/* Rating badge */}
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                  <div className="bg-rose-500/90 backdrop-blur-sm rounded-full px-2 sm:px-3 py-1 text-white text-xs sm:text-sm font-medium group-hover:bg-rose-600/90 transition-colors duration-300 flex items-center gap-1">
                    <Star className="h-3 w-3 fill-current" />
                    {destination.rating}
                  </div>
                </div>
              </div>
              
              {/* Enhanced gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-all duration-500"></div>
              
              {/* Main content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                <div className="mb-3 sm:mb-4">
                  <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2 mobile-subtitle mobile-optimized group-hover:text-white transition-colors duration-300">
                    {destination.name}
                  </h3>
                  <p className="text-xs sm:text-sm opacity-90 mb-2 mobile-text group-hover:opacity-100 transition-opacity duration-300">
                    {destination.description}
                  </p>
                  
                  {/* City highlights */}
                  <div className="flex flex-wrap gap-1 mb-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                    {destination.highlights.slice(0, 2).map((highlight, idx) => (
                      <span 
                        key={idx}
                        className="bg-white/20 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Bottom info row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-rose-300" />
                      <span className="text-xs sm:text-sm font-medium mobile-text group-hover:text-rose-200 transition-colors duration-300">
                        {destination.count}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                      <Users className="h-3 w-3 text-blue-300" />
                      <span className="text-xs font-medium text-blue-200">
                        ${destination.avgPrice}/night
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Top amenity - appears on hover */}
                <div className="mt-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0 delay-200">
                  <span className="text-xs text-gray-300 font-medium">
                    Popular: {destination.topAmenity}
                  </span>
                </div>
              </div>
              
              {/* Click ripple effect */}
              <div className="absolute inset-0 bg-rose-500/20 opacity-0 group-active:opacity-100 transition-opacity duration-150"></div>
            </div>
          ))}
        </div>
        
        {/* Call to action */}
        <div className="text-center mt-10 sm:mt-12 md:mt-16">
          <p className="text-sm sm:text-base text-gray-600 mobile-text bg-blue-50/50 backdrop-blur-sm rounded-full px-4 py-2 inline-block">
            💡 Click on any destination to explore amazing stays in that city
          </p>
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;
