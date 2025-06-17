
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Users, Bed, Bath } from "lucide-react";
import { Listing } from "@/types/database";
import WishlistButton from "./WishlistButton";

interface PropertyCardProps {
  listing: Listing;
  priority?: boolean;
}

const OptimizedPropertyCard = memo(({ listing, priority = false }: PropertyCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/listing/${listing.id}`);
  };

  const pricePerNight = Math.round((listing.price_per_night || 0) / 100);
  const imageUrl = listing.images?.[0] || '/placeholder.svg';

  return (
    <Card 
      className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white border-0 shadow-sm"
      onClick={handleClick}
    >
      <div className="relative overflow-hidden">
        <img 
          src={imageUrl}
          alt={listing.title}
          className="w-full h-48 sm:h-56 md:h-64 object-cover transition-transform duration-500 group-hover:scale-110"
          loading={priority ? "eager" : "lazy"}
          decoding="async"
        />
        
        <div className="absolute top-3 left-3 z-10">
          <Badge className="bg-white/90 text-gray-900 hover:bg-white font-medium">
            {listing.type || 'Property'}
          </Badge>
        </div>
        
        <div className="absolute top-3 right-3 z-10">
          <WishlistButton listingId={listing.id} />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <CardContent className="p-4 sm:p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 line-clamp-2 flex-1 group-hover:text-rose-600 transition-colors">
            {listing.title}
          </h3>
          <div className="flex items-center space-x-1 text-sm ml-3 flex-shrink-0">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">4.8</span>
          </div>
        </div>
        
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
          <span className="text-sm truncate">{listing.location}</span>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              <span>{listing.max_guests}</span>
            </div>
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1" />
              <span>{listing.bedrooms || 0}</span>
            </div>
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1" />
              <span>{listing.bathrooms || 0}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl sm:text-2xl font-bold text-gray-900">
              ₹{pricePerNight.toLocaleString()}
            </span>
            <span className="text-gray-600 text-sm"> / night</span>
          </div>
          <div className="px-3 py-1 bg-rose-50 text-rose-600 rounded-full text-xs font-medium">
            Available
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

OptimizedPropertyCard.displayName = "OptimizedPropertyCard";

export default OptimizedPropertyCard;
