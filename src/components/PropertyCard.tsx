
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Users, Bed, Bath } from "lucide-react";
import { Listing } from "@/types/database";
import { useNavigate } from "react-router-dom";
import WishlistButton from "./WishlistButton";

interface PropertyCardProps {
  listing: Listing;
}

const PropertyCard = ({ listing }: PropertyCardProps) => {
  const navigate = useNavigate();

  const formatPrice = (price: number) => {
    return Math.round(price / 100);
  };

  const handleClick = () => {
    navigate(`/listing/${listing.id}`);
  };

  return (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-300 group relative">
      {/* Wishlist Button */}
      <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        <WishlistButton listingId={listing.id} />
      </div>

      <div onClick={handleClick}>
        {/* Image */}
        <div className="relative h-48 overflow-hidden rounded-t-lg">
          {listing.images && listing.images.length > 0 ? (
            <img
              src={listing.images[0]}
              alt={listing.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">No image</span>
            </div>
          )}
          
          {listing.type && (
            <Badge className="absolute top-3 left-3 bg-white text-gray-700">
              {listing.type.charAt(0).toUpperCase() + listing.type.slice(1)}
            </Badge>
          )}
        </div>

        <CardContent className="p-4">
          {/* Location */}
          {listing.location && (
            <div className="flex items-center text-gray-600 text-sm mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="truncate">{listing.location}</span>
            </div>
          )}

          {/* Title */}
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-rose-600 transition-colors">
            {listing.title}
          </h3>

          {/* Property Details */}
          <div className="flex items-center text-gray-600 text-sm space-x-4 mb-3">
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              <span>{listing.max_guests} guests</span>
            </div>
            {listing.bedrooms && (
              <div className="flex items-center">
                <Bed className="h-4 w-4 mr-1" />
                <span>{listing.bedrooms} bed{listing.bedrooms !== 1 ? 's' : ''}</span>
              </div>
            )}
            {listing.bathrooms && (
              <div className="flex items-center">
                <Bath className="h-4 w-4 mr-1" />
                <span>{listing.bathrooms} bath{listing.bathrooms !== 1 ? 's' : ''}</span>
              </div>
            )}
          </div>

          {/* Rating (placeholder for now) */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium ml-1">4.8</span>
              <span className="text-sm text-gray-500 ml-1">(24 reviews)</span>
            </div>
            
            {/* Price */}
            <div className="text-right">
              <span className="text-lg font-bold">${formatPrice(listing.price_per_night)}</span>
              <span className="text-gray-500 text-sm"> / night</span>
            </div>
          </div>

          {/* Amenities Preview */}
          {listing.amenities && listing.amenities.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1">
              {listing.amenities.slice(0, 3).map((amenity, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {amenity}
                </Badge>
              ))}
              {listing.amenities.length > 3 && (
                <Badge variant="secondary" className="text-xs">
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
