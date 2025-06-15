
import { useState } from "react";
import { Search, MapPin, Users, Calendar, Filter, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { SearchFilters } from "@/types/database";
import { format } from "date-fns";

interface EnhancedSearchFiltersProps {
  onSearch: (filters: SearchFilters) => void;
  loading?: boolean;
}

const EnhancedSearchFilters = ({ onSearch, loading = false }: EnhancedSearchFiltersProps) => {
  const [filters, setFilters] = useState<SearchFilters>({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    minPrice: 0,
    maxPrice: 1000,
    propertyType: '',
    amenities: [],
    instantBook: false,
    sortBy: 'price_low'
  });

  const [checkInDate, setCheckInDate] = useState<Date>();
  const [checkOutDate, setCheckOutDate] = useState<Date>();
  const [showAdvanced, setShowAdvanced] = useState(false);

  const amenityOptions = [
    'WiFi', 'Kitchen', 'Parking', 'Pool', 'Hot tub', 'Pet friendly',
    'Air conditioning', 'Heating', 'Washer', 'Dryer', 'TV', 'Gym'
  ];

  const propertyTypes = [
    { value: 'apartment', label: 'Apartment' },
    { value: 'house', label: 'House' },
    { value: 'condo', label: 'Condo' },
    { value: 'villa', label: 'Villa' },
    { value: 'cabin', label: 'Cabin' },
    { value: 'studio', label: 'Studio' },
  ];

  const handleSearch = () => {
    const searchFilters: SearchFilters = {
      ...filters,
      checkIn: checkInDate ? format(checkInDate, 'yyyy-MM-dd') : '',
      checkOut: checkOutDate ? format(checkOutDate, 'yyyy-MM-dd') : '',
    };
    onSearch(searchFilters);
  };

  const toggleAmenity = (amenity: string) => {
    const currentAmenities = filters.amenities || [];
    const newAmenities = currentAmenities.includes(amenity)
      ? currentAmenities.filter(a => a !== amenity)
      : [...currentAmenities, amenity];
    
    setFilters(prev => ({ ...prev, amenities: newAmenities }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border">
      {/* Basic Search */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        {/* Location */}
        <div className="relative">
          <Label htmlFor="location">Where</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              id="location"
              placeholder="Search destinations"
              value={filters.location}
              onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
              className="pl-10"
            />
          </div>
        </div>

        {/* Check-in */}
        <div>
          <Label>Check-in</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <Calendar className="mr-2 h-4 w-4" />
                {checkInDate ? format(checkInDate, "MMM dd") : "Add dates"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={checkInDate}
                onSelect={setCheckInDate}
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Check-out */}
        <div>
          <Label>Check-out</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <Calendar className="mr-2 h-4 w-4" />
                {checkOutDate ? format(checkOutDate, "MMM dd") : "Add dates"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={checkOutDate}
                onSelect={setCheckOutDate}
                disabled={(date) => date < (checkInDate || new Date())}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Guests */}
        <div>
          <Label htmlFor="guests">Guests</Label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              id="guests"
              type="number"
              min="1"
              value={filters.guests}
              onChange={(e) => setFilters(prev => ({ ...prev, guests: parseInt(e.target.value) || 1 }))}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      {/* Advanced Filters Toggle */}
      <div className="flex justify-between items-center mb-4">
        <Button
          variant="outline"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center space-x-2"
        >
          <SlidersHorizontal className="h-4 w-4" />
          <span>More filters</span>
        </Button>
        
        <div className="flex items-center space-x-2">
          <Label htmlFor="sortBy">Sort by:</Label>
          <Select
            value={filters.sortBy}
            onValueChange={(value: any) => setFilters(prev => ({ ...prev, sortBy: value }))}
          >
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price_low">Price: Low to High</SelectItem>
              <SelectItem value="price_high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="distance">Distance</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="space-y-6 p-4 bg-gray-50 rounded-lg">
          {/* Price Range */}
          <div>
            <Label className="text-base font-semibold">Price Range (per night)</Label>
            <div className="mt-2">
              <Slider
                value={[filters.minPrice || 0, filters.maxPrice || 1000]}
                onValueChange={([min, max]) => setFilters(prev => ({ 
                  ...prev, 
                  minPrice: min, 
                  maxPrice: max 
                }))}
                max={1000}
                step={10}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600 mt-1">
                <span>${filters.minPrice}</span>
                <span>${filters.maxPrice}+</span>
              </div>
            </div>
          </div>

          {/* Property Type */}
          <div>
            <Label className="text-base font-semibold">Property Type</Label>
            <Select
              value={filters.propertyType}
              onValueChange={(value) => setFilters(prev => ({ ...prev, propertyType: value }))}
            >
              <SelectTrigger className="w-full mt-2">
                <SelectValue placeholder="Any type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any type</SelectItem>
                {propertyTypes.map(type => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Amenities */}
          <div>
            <Label className="text-base font-semibold">Amenities</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
              {amenityOptions.map(amenity => (
                <div key={amenity} className="flex items-center space-x-2">
                  <Checkbox
                    id={amenity}
                    checked={filters.amenities?.includes(amenity)}
                    onCheckedChange={() => toggleAmenity(amenity)}
                  />
                  <Label htmlFor={amenity} className="text-sm">
                    {amenity}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Instant Book */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="instantBook"
              checked={filters.instantBook}
              onCheckedChange={(checked) => setFilters(prev => ({ 
                ...prev, 
                instantBook: !!checked 
              }))}
            />
            <Label htmlFor="instantBook">Instant Book</Label>
          </div>
        </div>
      )}

      {/* Search Button */}
      <div className="mt-6">
        <Button 
          onClick={handleSearch} 
          disabled={loading}
          className="w-full bg-rose-500 hover:bg-rose-600 text-white"
        >
          <Search className="mr-2 h-4 w-4" />
          {loading ? 'Searching...' : 'Search'}
        </Button>
      </div>
    </div>
  );
};

export default EnhancedSearchFilters;
