
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Users, Bed, Bath, Heart } from "lucide-react";
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

  // Generate a placeholder image with better variety
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
      {/* Wishlist Button */}
      <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
        <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
          <WishlistButton listingId={listing.id} />
        </div>
      </div>

      <div onClick={handleClick}>
        {/* Image */}
        <div className="relative h-64 overflow-hidden rounded-t-2xl">
          {listing.images && listing.images.length > 0 ? (
            <img
              src={listing.images[0]}
              alt={listing.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              onError={(e) => {
                e.currentTarget.src = getPlaceholderImage();
              }}
            />
          ) : (
            <img
              src={getPlaceholderImage()}
              alt={listing.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          )}
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {listing.type && (
            <Badge className="absolute top-4 left-4 bg-white/90 text-gray-800 backdrop-blur-sm border-0 shadow-sm">
              {listing.type.charAt(0).toUpperCase() + listing.type.slice(1)}
            </Badge>
          )}

          {/* Rating Badge */}
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-500 fill-current" />
            <span className="text-sm font-semibold">4.8</span>
          </div>
        </div>

        <CardContent className="p-6">
          {/* Location */}
          {listing.location && (
            <div className="flex items-center text-gray-500 text-sm mb-3">
              <MapPin className="h-4 w-4 mr-2 text-rose-500" />
              <span className="truncate font-medium">{listing.location}</span>
            </div>
          )}

          {/* Title */}
          <h3 className="font-bold text-xl mb-3 line-clamp-2 group-hover:text-rose-600 transition-colors leading-tight">
            {listing.title}
          </h3>

          {/* Property Details */}
          <div className="flex items-center text-gray-600 text-sm space-x-6 mb-4">
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1 text-blue-500" />
              <span className="font-medium">{listing.max_guests} guests</span>
            </div>
            {listing.bedrooms && (
              <div className="flex items-center">
                <Bed className="h-4 w-4 mr-1 text-green-500" />
                <span className="font-medium">{listing.bedrooms} bed{listing.bedrooms !== 1 ? 's' : ''}</span>
              </div>
            )}
            {listing.bathrooms && (
              <div className="flex items-center">
                <Bath className="h-4 w-4 mr-1 text-purple-500" />
                <span className="font-medium">{listing.bathrooms} bath{listing.bathrooms !== 1 ? 's' : ''}</span>
              </div>
            )}
          </div>

          {/* Price and Rating */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-sm font-semibold ml-1">4.8</span>
              </div>
              <span className="text-sm text-gray-500">(24 reviews)</span>
            </div>
            
            {/* Price */}
            <div className="text-right">
              <div className="flex items-baseline">
                <span className="text-2xl font-bold text-gray-900">${formatPrice(listing.price_per_night)}</span>
                <span className="text-gray-500 text-sm ml-1">/ night</span>
              </div>
            </div>
          </div>

          {/* Amenities Preview */}
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
