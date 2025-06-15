
import { Heart, Star, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Listing } from "@/types/database";

interface PropertyCardProps {
  listing: Listing;
}

const PropertyCard = ({ listing }: PropertyCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/listing/${listing.id}`);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // TODO: Implement favorites functionality
    console.log('Added to favorites:', listing.id);
  };

  return (
    <Card 
      className="group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300"
      onClick={handleCardClick}
    >
      <div className="relative">
        <img 
          src={listing.images?.[0] || '/placeholder.svg'} 
          alt={listing.title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Button 
          size="sm" 
          variant="secondary" 
          className="absolute top-3 right-3 p-2 h-8 w-8 rounded-full bg-white/80 hover:bg-white"
          onClick={handleFavoriteClick}
        >
          <Heart className="h-4 w-4" />
        </Button>
        <Badge className="absolute top-3 left-3 bg-white/90 text-gray-900 hover:bg-white">
          {listing.type || 'Property'}
        </Badge>
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
            {listing.title}
          </h3>
          <div className="flex items-center space-x-1 text-sm">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">4.8</span>
            <span className="text-gray-500">(42)</span>
          </div>
        </div>
        
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{listing.location}</span>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
          <span>{listing.max_guests} guests</span>
          <span>{listing.bedrooms || 0} bedrooms</span>
          <span>{listing.bathrooms || 0} bathrooms</span>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {listing.amenities?.slice(0, 3).map((amenity) => (
            <Badge key={amenity} variant="outline" className="text-xs">
              {amenity}
            </Badge>
          ))}
          {(listing.amenities?.length || 0) > 3 && (
            <Badge variant="outline" className="text-xs">
              +{(listing.amenities?.length || 0) - 3} more
            </Badge>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-gray-900">
              ${Math.round((listing.price_per_night || 0) / 100)}
            </span>
            <span className="text-gray-600 text-sm"> / night</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
