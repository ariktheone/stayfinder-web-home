
import { TrendingUp } from "lucide-react";

const PopularDestinations = () => {
  const destinations = [
    { 
      name: "New York", 
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=300&fit=crop", 
      count: "1,000+ stays",
      description: "The city that never sleeps"
    },
    { 
      name: "Los Angeles", 
      image: "https://images.unsplash.com/photo-1444927714506-8492d94b5ba0?w=400&h=300&fit=crop", 
      count: "800+ stays",
      description: "City of angels and dreams"
    },
    { 
      name: "San Francisco", 
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop", 
      count: "600+ stays",
      description: "Golden Gate and innovation"
    },
    { 
      name: "Miami", 
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop", 
      count: "500+ stays",
      description: "Sun, sand, and nightlife"
    },
  ];

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
              className="relative rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer group hover-scale shadow-lg touch-manipulation"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-[4/5] bg-gradient-to-br from-gray-200 to-gray-300">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder.svg';
                  }}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2 mobile-subtitle mobile-optimized">{destination.name}</h3>
                <p className="text-xs sm:text-sm opacity-90 mb-1 mobile-text">{destination.description}</p>
                <p className="text-xs sm:text-sm font-medium mobile-text">{destination.count}</p>
              </div>
              <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-2 sm:px-3 py-1 text-white text-xs sm:text-sm font-medium">
                  Popular
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;
