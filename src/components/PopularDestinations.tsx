
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
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
            <TrendingUp className="h-8 w-8 mr-3 text-rose-500" />
            Popular destinations
          </h2>
          <p className="text-xl text-gray-600">
            Explore the world's most loved destinations
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {destinations.map((destination, index) => (
            <div
              key={destination.name}
              className="relative rounded-2xl overflow-hidden cursor-pointer group hover-scale shadow-lg"
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
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{destination.name}</h3>
                <p className="text-sm opacity-90 mb-1">{destination.description}</p>
                <p className="text-sm font-medium">{destination.count}</p>
              </div>
              <div className="absolute top-4 right-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm font-medium">
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
