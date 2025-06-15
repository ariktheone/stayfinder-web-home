
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SearchFilters as SearchFiltersType } from "@/types/database";

interface SearchFiltersProps {
  filters: SearchFiltersType;
  onFilterChange: (key: keyof SearchFiltersType, value: any) => void;
  onClearFilters: () => void;
  onApplyFilters: () => void;
  listingsCount: number;
}

const SearchFilters = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  onApplyFilters, 
  listingsCount 
}: SearchFiltersProps) => {
  const propertyTypes = [
    "Entire apartment", "Entire house", "Private room", "Shared room", "Entire cabin"
  ];

  const amenities = [
    "WiFi", "Kitchen", "Parking", "Pool", "Hot Tub", "Gym", 
    "Beach Access", "Fireplace", "AC", "Pet friendly"
  ];

  const handlePriceChange = (value: number[]) => {
    onFilterChange('minPrice', value[0]);
    onFilterChange('maxPrice', value[1]);
  };

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    const currentAmenities = filters.amenities || [];
    if (checked) {
      onFilterChange('amenities', [...currentAmenities, amenity]);
    } else {
      onFilterChange('amenities', currentAmenities.filter(a => a !== amenity));
    }
  };

  return (
    <div className="space-y-8">
      {/* Price Range */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Price range</h3>
        <div className="space-y-4">
          <Slider
            value={[filters.minPrice || 50, filters.maxPrice || 500]}
            onValueChange={handlePriceChange}
            max={1000}
            min={10}
            step={10}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>${filters.minPrice || 50}</span>
            <span>${filters.maxPrice || 500}+</span>
          </div>
        </div>
      </div>

      {/* Property Types */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Type of place</h3>
        <Select value={filters.propertyType || ''} onValueChange={(value) => onFilterChange('propertyType', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select property type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All types</SelectItem>
            {propertyTypes.map((type) => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Amenities */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Amenities</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4">
          {amenities.map((amenity) => (
            <div key={amenity} className="flex items-center space-x-2">
              <Checkbox 
                id={amenity} 
                checked={(filters.amenities || []).includes(amenity)}
                onCheckedChange={(checked) => handleAmenityChange(amenity, checked as boolean)}
              />
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

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-4 border-t">
        <Button variant="outline" onClick={onClearFilters}>
          Clear all
        </Button>
        <Button 
          className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
          onClick={onApplyFilters}
        >
          Show {listingsCount} places
        </Button>
      </div>
    </div>
  );
};

export default SearchFilters;
