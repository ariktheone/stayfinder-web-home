
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin } from "lucide-react";
import { Listing } from "@/types/database";

interface NearbyListingsProps {
  listings: Listing[];
  loading: boolean;
}

const NearbyListings = ({ listings, loading }: NearbyListingsProps) => {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Nearby Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="h-48 bg-gray-300 rounded-t-lg"></div>
              <CardContent className="p-4">
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-2/3"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (listings.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Nearby Properties</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {listings.map((listing) => (
          <Card 
            key={listing.id}
            className="cursor-pointer hover:shadow-lg transition-shadow duration-300"
            onClick={() => navigate(`/listing/${listing.id}`)}
          >
            <div className="relative">
              <img 
                src={listing.images?.[0] || '/placeholder.svg'} 
                alt={listing.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <Badge className="absolute top-3 left-3 bg-white/90 text-gray-900">
                {listing.type || 'Property'}
              </Badge>
            </div>
            
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 flex-1">
                  {listing.title}
                </h3>
                <div className="flex items-center space-x-1 text-sm ml-2">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium text-xs">4.8</span>
                </div>
              </div>
              
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="h-3 w-3 mr-1" />
                <span className="text-xs truncate">{listing.location}</span>
              </div>
              
              <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                <span>{listing.max_guests} guests</span>
                <span>{listing.bedrooms || 0} beds</span>
                <span>{listing.bathrooms || 0} baths</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-lg font-bold text-gray-900">
                    ${Math.round((listing.price_per_night || 0) / 100)}
                  </span>
                  <span className="text-gray-600 text-xs"> / night</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NearbyListings;
