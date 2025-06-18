
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import { Listing } from "@/types/database";
import { useNavigate } from "react-router-dom";
import WishlistButton from "./WishlistButton";
import ImageOptimized from "./ImageOptimized";
import PriceDisplay from "./PriceDisplay";
import RatingDisplay from "./RatingDisplay";
import PropertyStats from "./PropertyStats";

interface PropertyCardProps {
  listing: Listing;
}

const PropertyCard = ({ listing }: PropertyCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/listing/${listing.id}`);
  };

  const getPlaceholderImage = () => {
    const images = [
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop"
    ];
    return images[Math.floor(Math.random() * images.length)];
  };

  return (
    <Card className="cursor-pointer hover:shadow-2xl transition-all duration-300 group relative overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-lg hover-scale">
      <WishlistButton 
        listingId={listing.id}
        variant="floating"
        className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110"
      />

      <div onClick={handleClick}>
        <div className="relative h-64 overflow-hidden rounded-t-2xl">
          <ImageOptimized
            src={listing.images?.[0] || getPlaceholderImage()}
            alt={listing.title}
            className="w-full h-full group-hover:scale-110 transition-transform duration-500"
            fallbackSrc={getPlaceholderImage()}
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {listing.type && (
            <Badge className="absolute top-4 left-4 bg-white/90 text-gray-800 backdrop-blur-sm border-0 shadow-sm">
              {listing.type.charAt(0).toUpperCase() + listing.type.slice(1)}
            </Badge>
          )}

          <div className="absolute bottom-4 left-4">
            <RatingDisplay rating={4.8} size="sm" />
          </div>
        </div>

        <CardContent className="p-6">
          {listing.location && (
            <div className="flex items-center text-gray-500 text-sm mb-3">
              <MapPin className="h-4 w-4 mr-2 text-rose-500" />
              <span className="truncate font-medium">{listing.location}</span>
            </div>
          )}

          <h3 className="font-bold text-xl mb-3 line-clamp-2 group-hover:text-rose-600 transition-colors leading-tight">
            {listing.title}
          </h3>

          <div className="mb-4">
            <PropertyStats
              maxGuests={listing.max_guests}
              bedrooms={listing.bedrooms}
              bathrooms={listing.bathrooms}
              size="sm"
            />
          </div>

          <div className="flex items-center justify-between mb-4">
            <RatingDisplay rating={4.8} reviewCount={24} size="sm" />
            <PriceDisplay price={listing.price_per_night} />
          </div>

          {listing.amenities && listing.amenities.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {listing.amenities.slice(0, 3).map((amenity, index) => (
                <Badge key={index} variant="secondary" className="text-xs bg-gray-100 text-gray-700 hover:bg-gray-200">
                  {amenity}
                </Badge>
              ))}
              {listing.amenities.length > 3 && (
                <Badge variant="secondary" className="text-xs bg-rose-100 text-rose-700">
                  +{listing.amenities.length - 3} more
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </div>
    </Card>
  );
};

export default PropertyCard;
