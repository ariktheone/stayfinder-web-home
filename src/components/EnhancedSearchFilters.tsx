
import { useState } from "react";
import { Search, MapPin, Users, Calendar, Filter, SlidersHorizontal, X } from "lucide-react";
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
  initialFilters?: SearchFilters | null;
  compact?: boolean;
}

const EnhancedSearchFilters = ({ 
  onSearch, 
  loading = false, 
  initialFilters = null,
  compact = false 
}: EnhancedSearchFiltersProps) => {
  const [filters, setFilters] = useState<SearchFilters>(initialFilters || {
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

  const [checkInDate, setCheckInDate] = useState<Date | undefined>(
    initialFilters?.checkIn ? new Date(initialFilters.checkIn) : undefined
  );
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(
    initialFilters?.checkOut ? new Date(initialFilters.checkOut) : undefined
  );
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

  const clearFilters = () => {
    const emptyFilters: SearchFilters = {
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
    };
    setFilters(emptyFilters);
    setCheckInDate(undefined);
    setCheckOutDate(undefined);
    setShowAdvanced(false);
  };

  const hasActiveFilters = () => {
    return (
      filters.location !== '' ||
      checkInDate ||
      checkOutDate ||
      filters.guests > 1 ||
      filters.minPrice > 0 ||
      filters.maxPrice < 1000 ||
      filters.propertyType !== '' ||
      (filters.amenities && filters.amenities.length > 0) ||
      filters.instantBook
    );
  };

  if (compact) {
    return (
      <div className="flex flex-wrap items-center gap-3">
        {/* Quick Location Search */}
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Where to?"
              value={filters.location}
              onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
              className="pl-10 h-12"
            />
          </div>
        </div>

        {/* Quick Guests */}
        <div className="w-24">
          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="number"
              min="1"
              value={filters.guests}
              onChange={(e) => setFilters(prev => ({ ...prev, guests: parseInt(e.target.value) || 1 }))}
              className="pl-10 h-12"
            />
          </div>
        </div>

        {/* Advanced Filters Popover */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="h-12 relative">
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {hasActiveFilters() && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  !
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-96 p-6" align="end">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Filters</h3>
                {hasActiveFilters() && (
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Clear all
                  </Button>
                )}
              </div>

              {/* Date Range */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Check-in</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <Calendar className="mr-2 h-4 w-4" />
                        {checkInDate ? format(checkInDate, "MMM dd") : "Date"}
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

                <div>
                  <Label>Check-out</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <Calendar className="mr-2 h-4 w-4" />
                        {checkOutDate ? format(checkOutDate, "MMM dd") : "Date"}
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
              </div>

              {/* Price Range */}
              <div>
                <Label className="text-sm font-medium">Price Range (per night)</Label>
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
                <Label className="text-sm font-medium">Property Type</Label>
                <Select
                  value={filters.propertyType}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, propertyType: value }))}
                >
                  <SelectTrigger className="w-full mt-1">
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

              <Button onClick={handleSearch} className="w-full bg-rose-500 hover:bg-rose-600">
                <Search className="mr-2 h-4 w-4" />
                Apply Filters
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        {/* Search Button */}
        <Button 
          onClick={handleSearch} 
          disabled={loading}
          className="bg-rose-500 hover:bg-rose-600 text-white h-12 px-8"
        >
          <Search className="mr-2 h-4 w-4" />
          {loading ? 'Searching...' : 'Search'}
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border p-6">
      {/* Main Search Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {/* Location */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">Where</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search destinations"
              value={filters.location}
              onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
              className="pl-10 h-12 border-gray-200"
            />
          </div>
        </div>

        {/* Check-in */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">Check-in</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal h-12 border-gray-200">
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
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">Check-out</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal h-12 border-gray-200">
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
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">Guests</Label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="number"
              min="1"
              value={filters.guests}
              onChange={(e) => setFilters(prev => ({ ...prev, guests: parseInt(e.target.value) || 1 }))}
              className="pl-10 h-12 border-gray-200"
            />
          </div>
        </div>
      </div>

      {/* Action Row */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center space-x-2"
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span>More filters</span>
            {hasActiveFilters() && (
              <span className="bg-rose-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center ml-2">
                !
              </span>
            )}
          </Button>
          
          {hasActiveFilters() && (
            <Button variant="ghost" onClick={clearFilters} className="text-gray-500">
              Clear all
            </Button>
          )}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <Label htmlFor="sortBy" className="text-sm">Sort by:</Label>
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

          <Button 
            onClick={handleSearch} 
            disabled={loading}
            className="bg-rose-500 hover:bg-rose-600 text-white px-8 h-12"
          >
            <Search className="mr-2 h-4 w-4" />
            {loading ? 'Searching...' : 'Search'}
          </Button>
        </div>
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="mt-6 p-6 bg-gray-50 rounded-xl border-t space-y-6">
          {/* Price Range */}
          <div>
            <Label className="text-base font-semibold">Price Range (per night)</Label>
            <div className="mt-3">
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
              <div className="flex justify-between text-sm text-gray-600 mt-2">
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
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
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
            <Label htmlFor="instantBook" className="font-medium">Instant Book</Label>
            <span className="text-sm text-gray-500">Properties you can book without waiting for host approval</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedSearchFilters;
