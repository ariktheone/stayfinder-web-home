
import { useState } from "react";
import { Calendar, MapPin, Search, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SearchFilters from "@/components/SearchFilters";
import PropertyCard from "@/components/PropertyCard";
import Header from "@/components/Header";
import GoogleMap from "@/components/GoogleMap";
import { useSearchFilters } from "@/hooks/useSearchFilters";
import { useListings } from "@/hooks/useListings";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showMapInSearch, setShowMapInSearch] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  const { filters, updateFilter, clearFilters } = useSearchFilters();
  const { listings, loading, fetchListings } = useListings();

  const handleSearch = () => {
    const searchFilters = {
      ...filters,
      location: searchQuery,
      checkIn,
      checkOut,
      guests
    };
    fetchListings(searchFilters);
  };

  const handleApplyFilters = () => {
    const searchFilters = {
      ...filters,
      location: searchQuery,
      checkIn,
      checkOut,
      guests
    };
    fetchListings(searchFilters);
    setShowFilters(false);
  };

  const handleClearFilters = () => {
    clearFilters();
    setSearchQuery("");
    setCheckIn("");
    setCheckOut("");
    setGuests(1);
    fetchListings();
  };

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
                    <Input 
                      type="date" 
                      className="pl-10"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Check out</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      type="date" 
                      className="pl-10"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Guests</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      type="number"
                      placeholder="Add guests" 
                      className="pl-10"
                      min="1"
                      value={guests}
                      onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center mt-6">
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowFilters(!showFilters)}
                    className="text-gray-600"
                  >
                    More filters
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowMapInSearch(!showMapInSearch)}
                    className="text-gray-600"
                  >
                    {showMapInSearch ? "Hide Map" : "Show Map"}
                  </Button>
                </div>
                <Button 
                  className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 px-8"
                  onClick={handleSearch}
                >
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
              </div>
            </Card>

            {/* Map in Search Section */}
            {showMapInSearch && (
              <div className="mt-6">
                <Card className="p-4">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900">Search Area</h3>
                  <GoogleMap listings={listings} />
                </Card>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white border-b animate-fade-in">
          <div className="container mx-auto px-4 py-6">
            <SearchFilters 
              filters={filters}
              onFilterChange={updateFilter}
              onClearFilters={handleClearFilters}
              onApplyFilters={handleApplyFilters}
              listingsCount={listings.length}
            />
          </div>
        </div>
      )}

      {/* Properties Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Featured Stays</h2>
          <Badge variant="secondary" className="text-sm">
            {listings.length} properties found
          </Badge>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-64 bg-gray-300 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {listings.map((listing, index) => (
              <div 
                key={listing.id} 
                className="animate-fade-in hover-scale"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <PropertyCard listing={listing} />
              </div>
            ))}
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
