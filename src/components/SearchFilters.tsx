
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const SearchFilters = () => {
  const propertyTypes = [
    "Entire place", "Private room", "Shared room"
  ];

  const amenities = [
    "WiFi", "Kitchen", "Parking", "Pool", "Hot tub", "Gym", 
    "Beach access", "Fireplace", "AC", "Pet friendly"
  ];

  const houseRules = [
    "Instant book", "Self check-in", "Allows pets", "Smoking allowed"
  ];

  return (
    <div className="space-y-8">
      {/* Price Range */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Price range</h3>
        <div className="space-y-4">
          <Slider
            defaultValue={[50, 300]}
            max={500}
            step={10}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>$50</span>
            <span>$300+</span>
          </div>
        </div>
      </div>

      {/* Property Types */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Type of place</h3>
        <div className="grid grid-cols-3 gap-3">
          {propertyTypes.map((type) => (
            <Card key={type} className="p-4 cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full mx-auto mb-2"></div>
                <p className="text-sm font-medium">{type}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Amenities</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {amenities.map((amenity) => (
            <div key={amenity} className="flex items-center space-x-2">
              <Checkbox id={amenity} />
              <label 
                htmlFor={amenity} 
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {amenity}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* House Rules */}
      <div>
        <h3 className="text-lg font-semibold mb-4">House rules</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {houseRules.map((rule) => (
            <div key={rule} className="flex items-center space-x-2">
              <Checkbox id={rule} />
              <label 
                htmlFor={rule} 
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {rule}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-4 border-t">
        <Button variant="outline">
          Clear all
        </Button>
        <Button className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600">
          Show 24 places
        </Button>
      </div>
    </div>
  );
};

export default SearchFilters;
