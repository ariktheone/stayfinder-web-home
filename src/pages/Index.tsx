
import { useState } from "react";
import { Listing, SearchFilters } from "@/types/database";
import { useListings } from "@/hooks/useListings";
import Header from "@/components/Header";
import EnhancedSearchFilters from "@/components/EnhancedSearchFilters";
import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { MapPin, Star, TrendingUp, Search, Users, Calendar, Shield } from "lucide-react";

const Index = () => {
  const { listings, loading, fetchListings } = useListings();
  const [filteredListings, setFilteredListings] = useState<Listing[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (filters: SearchFilters) => {
    setHasSearched(true);
    await fetchListings(filters);
    
    // Apply sorting
    let sorted = [...listings];
    switch (filters.sortBy) {
      case 'price_low':
        sorted.sort((a, b) => a.price_per_night - b.price_per_night);
        break;
      case 'price_high':
        sorted.sort((a, b) => b.price_per_night - a.price_per_night);
        break;
      case 'rating':
        // For now, we'll use a random rating since we don't have real ratings yet
        sorted.sort(() => Math.random() - 0.5);
        break;
      default:
        break;
    }
    
    setFilteredListings(sorted);
  };

  const displayListings = hasSearched ? filteredListings : listings;

  const popularDestinations = [
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

  const features = [
    {
      icon: Search,
      title: "Easy Search",
      description: "Find your perfect stay with our advanced search filters"
    },
    {
      icon: Users,
      title: "Trusted Community",
      description: "Join millions of travelers and hosts worldwide"
    },
    {
      icon: Calendar,
      title: "Flexible Booking",
      description: "Book instantly or request to book with flexible dates"
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description: "Your payments are protected with bank-level security"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-rose-50/30 to-blue-50/30"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23f1f5f9\" fill-opacity=\"0.3\"%3E%3Ccircle cx=\"7\" cy=\"7\" r=\"1\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
        
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
              <EnhancedSearchFilters onSearch={handleSearch} loading={loading} />
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

      {/* Features Section */}
      <section className="py-20 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why choose StayFinder?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We make it easy to find and book amazing places to stay
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={feature.title} 
                className="text-center group hover-scale"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-rose-500 to-blue-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      {!hasSearched && (
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
              {popularDestinations.map((destination, index) => (
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
      )}

      {/* Listings Results */}
      <section className="py-20 px-4 bg-white/30">
        <div className="container mx-auto">
          {hasSearched && (
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-bold text-gray-900">
                {displayListings.length} {displayListings.length === 1 ? 'stay' : 'stays'} found
              </h2>
              <Button
                variant="outline"
                onClick={() => {
                  setHasSearched(false);
                  setFilteredListings([]);
                }}
                className="hover:bg-rose-50 hover:border-rose-300"
              >
                Clear filters
              </Button>
            </div>
          )}

          {!hasSearched && (
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Featured stays
              </h2>
              <p className="text-xl text-gray-600">
                Handpicked accommodations for your perfect getaway
              </p>
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-64 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-300 rounded-full w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded-full w-1/2"></div>
                    <div className="h-4 bg-gray-300 rounded-full w-1/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : displayListings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {displayListings.map((listing, index) => (
                <div 
                  key={listing.id} 
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <PropertyCard listing={listing} />
                </div>
              ))}
            </div>
          ) : hasSearched ? (
            <div className="text-center py-20">
              <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                <MapPin className="h-16 w-16 text-gray-400" />
              </div>
              <h3 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-4">
                No stays found
              </h3>
              <p className="text-lg text-gray-500 mb-8 max-w-md mx-auto">
                Try adjusting your search filters or exploring a different area
              </p>
              <Button
                onClick={() => {
                  setHasSearched(false);
                  setFilteredListings([]);
                }}
                className="bg-gradient-to-r from-rose-500 to-blue-500 hover:from-rose-600 hover:to-blue-600 text-white px-8 py-3 text-lg"
              >
                Clear filters and explore
              </Button>
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-gray-500">Start searching to discover amazing places to stay!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Index;
