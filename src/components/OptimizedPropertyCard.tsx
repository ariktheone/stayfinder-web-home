
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import { Listing } from "@/types/database";
import WishlistButton from "./WishlistButton";
import ImageOptimized from "./ImageOptimized";
import PriceDisplay from "./PriceDisplay";
import RatingDisplay from "./RatingDisplay";
import PropertyStats from "./PropertyStats";

interface PropertyCardProps {
  listing: Listing;
  priority?: boolean;
  variant?: "vertical" | "horizontal";
}

const OptimizedPropertyCard = memo(({ listing, priority = false, variant = "vertical" }: PropertyCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/listing/${listing.id}`);
  };

  const imageUrl = listing.images?.[0] || '/placeholder.svg';

  if (variant === "horizontal") {
    return (
      <Card 
        className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white border-0 shadow-sm"
        onClick={handleClick}
      >
        <div className="flex flex-col sm:flex-row">
          <div className="relative overflow-hidden w-full sm:w-80 flex-shrink-0">
            <ImageOptimized
              src={imageUrl}
              alt={listing.title}
              className="w-full h-48 sm:h-full transition-transform duration-500 group-hover:scale-110"
              priority={priority}
            />
            
            <div className="absolute top-3 left-3 z-10">
              <Badge className="bg-white/90 text-gray-900 hover:bg-white font-medium">
                {listing.type || 'Property'}
              </Badge>
            </div>
            
            <WishlistButton 
              listingId={listing.id} 
              variant="floating"
              size="md"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          
          <CardContent className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 line-clamp-2 flex-1 group-hover:text-rose-600 transition-colors">
                  {listing.title}
                </h3>
                <div className="ml-4 flex-shrink-0">
                  <RatingDisplay rating={4.8} size="sm" showCount={false} />
                </div>
              </div>
              
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                <span className="text-sm">{listing.location}</span>
              </div>
              
              <div className="mb-4">
                <PropertyStats
                  maxGuests={listing.max_guests}
                  bedrooms={listing.bedrooms || 0}
                  bathrooms={listing.bathrooms || 0}
                  size="md"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <PriceDisplay 
                price={listing.price_per_night || 0}
                size="lg"
              />
              <div className="px-4 py-2 bg-rose-50 text-rose-600 rounded-full text-sm font-medium">
                Available
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    );
  }

  // Vertical layout (default grid view)
  return (
    <Card 
      className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white border-0 shadow-sm"
      onClick={handleClick}
    >
      <div className="relative overflow-hidden">
        <ImageOptimized
          src={imageUrl}
          alt={listing.title}
          className="w-full h-48 sm:h-56 md:h-64 transition-transform duration-500 group-hover:scale-110"
          priority={priority}
        />
        
        <div className="absolute top-3 left-3 z-10">
          <Badge className="bg-white/90 text-gray-900 hover:bg-white font-medium">
            {listing.type || 'Property'}
          </Badge>
        </div>
        
        <WishlistButton 
          listingId={listing.id} 
          variant="floating"
          size="md"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <CardContent className="p-4 sm:p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 line-clamp-2 flex-1 group-hover:text-rose-600 transition-colors">
            {listing.title}
          </h3>
          <div className="ml-3 flex-shrink-0">
            <RatingDisplay rating={4.8} size="sm" showCount={false} />
          </div>
        </div>
        
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
          <span className="text-sm truncate">{listing.location}</span>
        </div>
        
        <div className="mb-4">
          <PropertyStats
            maxGuests={listing.max_guests}
            bedrooms={listing.bedrooms || 0}
            bathrooms={listing.bathrooms || 0}
            size="sm"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <PriceDisplay 
            price={listing.price_per_night || 0}
            size="md"
          />
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
