
import { useState } from "react";
import { Calendar, MapPin, Search, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SearchFilters from "@/components/SearchFilters";
import PropertyCard from "@/components/PropertyCard";
import Header from "@/components/Header";
import Map from "@/components/Map";

const properties = [
  {
    id: 1,
    title: "Modern Loft in Downtown",
    location: "New York, NY",
    price: 150,
    rating: 4.8,
    reviews: 42,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=800&q=80",
    host: "Sarah Johnson",
    type: "Entire apartment",
    guests: 4,
    bedrooms: 2,
    bathrooms: 1,
    amenities: ["WiFi", "Kitchen", "Parking", "AC"],
    coordinates: [-74.006, 40.7128] as [number, number]
  },
  {
    id: 2,
    title: "Cozy Beach House",
    location: "Miami, FL",
    price: 220,
    rating: 4.9,
    reviews: 68,
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=800&q=80",
    host: "Mike Rodriguez",
    type: "Entire house",
    guests: 6,
    bedrooms: 3,
    bathrooms: 2,
    amenities: ["WiFi", "Kitchen", "Beach Access", "Pool"],
    coordinates: [-80.1918, 25.7617] as [number, number]
  },
  {
    id: 3,
    title: "Mountain Cabin Retreat",
    location: "Aspen, CO",
    price: 180,
    rating: 4.7,
    reviews: 35,
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=800&q=80",
    host: "Emma Wilson",
    type: "Entire cabin",
    guests: 8,
    bedrooms: 4,
    bathrooms: 3,
    amenities: ["WiFi", "Fireplace", "Hot Tub", "Mountain View"],
    coordinates: [-106.8175, 39.1911] as [number, number]
  },
  {
    id: 4,
    title: "Urban Studio",
    location: "San Francisco, CA",
    price: 120,
    rating: 4.6,
    reviews: 29,
    image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=800&q=80",
    host: "David Chen",
    type: "Private room",
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    amenities: ["WiFi", "Kitchen", "Gym", "City View"],
    coordinates: [-122.4194, 37.7749] as [number, number]
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showMap, setShowMap] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 animate-fade-in">
              Find Your Perfect Stay
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto animate-fade-in">
              Discover unique places to stay around the world, from cozy apartments to luxury villas
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="max-w-4xl mx-auto">
            <Card className="p-6 shadow-2xl animate-scale-in">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Where</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      placeholder="Search destinations" 
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Check in</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input type="date" className="pl-10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Check out</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input type="date" className="pl-10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Guests</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input placeholder="Add guests" className="pl-10" />
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center mt-6">
                <Button 
                  variant="outline" 
                  onClick={() => setShowFilters(!showFilters)}
                  className="text-gray-600"
                >
                  More filters
                </Button>
                <Button className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 px-8">
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white border-b animate-fade-in">
          <div className="container mx-auto px-4 py-6">
            <SearchFilters />
          </div>
        </div>
      )}

      {/* Map/List Toggle */}
      <section className="container mx-auto px-4 py-6 border-b">
        <div className="flex justify-center space-x-4">
          <Button 
            variant={!showMap ? "default" : "outline"}
            onClick={() => setShowMap(false)}
          >
            List View
          </Button>
          <Button 
            variant={showMap ? "default" : "outline"}
            onClick={() => setShowMap(true)}
          >
            Map View
          </Button>
        </div>
      </section>

      {/* Map or Properties Section */}
      <section className="container mx-auto px-4 py-12">
        {showMap ? (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Property Locations</h2>
            <Map properties={properties} />
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Featured Stays</h2>
              <Badge variant="secondary" className="text-sm">
                {properties.length} properties found
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {properties.map((property, index) => (
                <div 
                  key={property.id} 
                  className="animate-fade-in hover-scale"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <PropertyCard property={property} />
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Hosting?</h2>
          <p className="text-xl mb-8 opacity-90">
            Earn extra income by sharing your space with travelers from around the world
          </p>
          <Button 
            size="lg" 
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
          >
            Become a Host
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
