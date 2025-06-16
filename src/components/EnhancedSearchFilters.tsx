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
  const [filters, setFilters] = useState<SearchFilters>({
    location: initialFilters?.location || '',
    checkIn: initialFilters?.checkIn || '',
    checkOut: initialFilters?.checkOut || '',
    guests: initialFilters?.guests || 1,
    minPrice: initialFilters?.minPrice || 0,
    maxPrice: initialFilters?.maxPrice || 1000,
    propertyType: initialFilters?.propertyType || '',
    amenities: initialFilters?.amenities || [],
    instantBook: initialFilters?.instantBook || false,
    sortBy: initialFilters?.sortBy || 'price_low'
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
    console.log('Executing search with filters:', searchFilters);
    onSearch(searchFilters);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
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
      <div className="w-full mobile-optimized">
        {/* Mobile-first compact layout */}
        <div className="flex flex-col gap-3 p-3 bg-white rounded-xl shadow-sm border touch-manipulation">
          {/* Location Search - Full width on mobile */}
          <div className="w-full">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none z-10" />
              <Input
                placeholder="Where to?"
                value={filters.location}
                onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                onKeyPress={handleKeyPress}
                className="pl-10 h-12 border-gray-200 focus:border-rose-300 text-base mobile-optimized touch-target w-full"
              />
            </div>
          </div>

          {/* Mobile row for guests, filters and search */}
          <div className="flex items-center gap-2 w-full">
            {/* Guests - Smaller on mobile */}
            <div className="flex-shrink-0 w-20">
              <div className="relative">
                <Users className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none z-10" />
                <Input
                  type="number"
                  min="1"
                  value={filters.guests}
                  onChange={(e) => setFilters(prev => ({ ...prev, guests: parseInt(e.target.value) || 1 }))}
                  onKeyPress={handleKeyPress}
                  className="pl-8 h-12 border-gray-200 focus:border-rose-300 text-base mobile-optimized touch-target w-full"
                />
              </div>
            </div>

            {/* Advanced Filters - Responsive popover */}
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  className="h-12 relative border-gray-200 touch-target flex-shrink-0 px-3"
                  type="button"
                >
                  <Filter className="h-4 w-4" />
                  {hasActiveFilters() && (
                    <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {[
                        filters.location,
                        checkInDate,
                        checkOutDate,
                        filters.guests > 1,
                        filters.minPrice > 0,
                        filters.maxPrice < 1000,
                        filters.propertyType,
                        filters.amenities?.length,
                        filters.instantBook
                      ].filter(Boolean).length}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent 
                className="w-[90vw] max-w-sm p-4 mx-2 max-h-[80vh] overflow-y-auto mobile-optimized" 
                align="end"
                side="bottom"
                sideOffset={8}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 text-lg">Filters</h3>
                    {hasActiveFilters() && (
                      <Button variant="ghost" size="sm" onClick={clearFilters} className="text-gray-500 touch-target">
                        Clear all
                      </Button>
                    )}
                  </div>

                  {/* Dates - Mobile optimized */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">Check-in</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button 
                            variant="outline" 
                            className="w-full justify-start text-left font-normal touch-target h-12"
                            type="button"
                          >
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
                            className="pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">Check-out</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button 
                            variant="outline" 
                            className="w-full justify-start text-left font-normal touch-target h-12"
                            type="button"
                          >
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
                            className="pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  {/* Price Range - Mobile optimized */}
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-3 block">Price Range (per night)</Label>
                    <div className="px-2">
                      <Slider
                        value={[filters.minPrice, filters.maxPrice]}
                        onValueChange={([min, max]) => setFilters(prev => ({ 
                          ...prev, 
                          minPrice: min, 
                          maxPrice: max 
                        }))}
                        max={1000}
                        step={10}
                        className="w-full touch-manipulation"
                      />
                      <div className="flex justify-between text-sm text-gray-600 mt-3">
                        <span>${filters.minPrice}</span>
                        <span>${filters.maxPrice}+</span>
                      </div>
                    </div>
                  </div>

                  {/* Property Type - Mobile optimized */}
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">Property Type</Label>
                    <Select
                      value={filters.propertyType || "all"}
                      onValueChange={(value) => setFilters(prev => ({ 
                        ...prev, 
                        propertyType: value === "all" ? "" : value 
                      }))}
                    >
                      <SelectTrigger className="w-full h-12 touch-target">
                        <SelectValue placeholder="Any type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Any type</SelectItem>
                        {propertyTypes.map(type => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Apply Button */}
                  <Button 
                    onClick={handleSearch} 
                    disabled={loading}
                    className="w-full bg-rose-500 hover:bg-rose-600 text-white h-12 touch-target"
                    type="button"
                  >
                    <Search className="mr-2 h-4 w-4" />
                    {loading ? 'Searching...' : 'Apply Filters'}
                  </Button>
                </div>
              </PopoverContent>
            </Popover>

            {/* Search Button */}
            <Button 
              onClick={handleSearch} 
              disabled={loading}
              className="bg-rose-500 hover:bg-rose-600 text-white h-12 px-4 touch-target flex-1 min-w-0"
              type="button"
            >
              <Search className="mr-1 h-4 w-4 flex-shrink-0" />
              <span className="truncate">{loading ? 'Searching...' : 'Search'}</span>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border p-4 sm:p-6 mobile-optimized">
      {/* Main Search Row - Mobile responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Location */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">Where</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
            <Input
              placeholder="Search destinations"
              value={filters.location}
              onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
              onKeyPress={handleKeyPress}
              className="pl-10 h-12 border-gray-200 focus:border-rose-300 text-base mobile-optimized touch-target"
            />
          </div>
        </div>

        {/* Check-in - Mobile optimized */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">Check-in</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full justify-start text-left font-normal h-12 border-gray-200 touch-target"
                type="button"
              >
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
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Check-out - Mobile optimized */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">Check-out</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full justify-start text-left font-normal h-12 border-gray-200 touch-target"
                type="button"
              >
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
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Guests - Mobile optimized */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">Guests</Label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
            <Input
              type="number"
              min="1"
              value={filters.guests}
              onChange={(e) => setFilters(prev => ({ ...prev, guests: parseInt(e.target.value) || 1 }))}
              onKeyPress={handleKeyPress}
              className="pl-10 h-12 border-gray-200 focus:border-rose-300 text-base mobile-optimized touch-target"
            />
          </div>
        </div>
      </div>

      {/* Action Row - Mobile responsive */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <Button
            variant="outline"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center justify-center space-x-2 h-12 sm:h-auto touch-target"
            type="button"
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span>More filters</span>
            {hasActiveFilters() && (
              <span className="bg-rose-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center ml-2">
                {[
                  filters.location,
                  checkInDate,
                  checkOutDate,
                  filters.guests > 1,
                  filters.minPrice > 0,
                  filters.maxPrice < 1000,
                  filters.propertyType,
                  filters.amenities?.length,
                  filters.instantBook
                ].filter(Boolean).length}
              </span>
            )}
          </Button>
          
          {hasActiveFilters() && (
            <Button variant="ghost" onClick={clearFilters} className="text-gray-500 h-12 sm:h-auto touch-target" type="button">
              Clear all
            </Button>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <div className="flex items-center space-x-2">
            <Label htmlFor="sortBy" className="text-sm whitespace-nowrap">Sort by:</Label>
            <Select
              value={filters.sortBy}
              onValueChange={(value: 'price_low' | 'price_high' | 'rating' | 'distance') => 
                setFilters(prev => ({ ...prev, sortBy: value }))
              }
            >
              <SelectTrigger className="w-full sm:w-40 h-12 sm:h-auto touch-target">
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
            className="bg-rose-500 hover:bg-rose-600 text-white px-6 sm:px-8 h-12 touch-target"
            type="button"
          >
            <Search className="mr-2 h-4 w-4" />
            {loading ? 'Searching...' : 'Search'}
          </Button>
        </div>
      </div>

      {/* Advanced Filters - Mobile responsive */}
      {showAdvanced && (
        <div className="mt-6 p-4 sm:p-6 bg-gray-50 rounded-xl border-t space-y-6">
          {/* Price Range */}
          <div>
            <Label className="text-base font-semibold mb-3 block">Price Range (per night)</Label>
            <div className="px-2">
              <Slider
                value={[filters.minPrice, filters.maxPrice]}
                onValueChange={([min, max]) => setFilters(prev => ({ 
                  ...prev, 
                  minPrice: min, 
                  maxPrice: max 
                }))}
                max={1000}
                step={10}
                className="w-full touch-manipulation"
              />
              <div className="flex justify-between text-sm text-gray-600 mt-3">
                <span>${filters.minPrice}</span>
                <span>${filters.maxPrice}+</span>
              </div>
            </div>
          </div>

          {/* Property Type */}
          <div>
            <Label className="text-base font-semibold mb-2 block">Property Type</Label>
            <Select
              value={filters.propertyType || "all"}
              onValueChange={(value) => setFilters(prev => ({ 
                ...prev, 
                propertyType: value === "all" ? "" : value 
              }))}
            >
              <SelectTrigger className="w-full h-12 touch-target">
                <SelectValue placeholder="Any type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any type</SelectItem>
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
            <Label className="text-base font-semibold mb-3 block">Amenities</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {amenityOptions.map(amenity => (
                <div key={amenity} className="flex items-center space-x-2 touch-target">
                  <Checkbox
                    id={amenity}
                    checked={filters.amenities?.includes(amenity)}
                    onCheckedChange={() => toggleAmenity(amenity)}
                    className="touch-target"
                  />
                  <Label htmlFor={amenity} className="text-sm cursor-pointer">
                    {amenity}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Instant Book */}
          <div className="flex items-center space-x-2 touch-target">
            <Checkbox
              id="instantBook"
              checked={filters.instantBook}
              onCheckedChange={(checked) => setFilters(prev => ({ 
                ...prev, 
                instantBook: !!checked 
              }))}
              className="touch-target"
            />
            <Label htmlFor="instantBook" className="font-medium cursor-pointer">Instant Book</Label>
            <span className="text-sm text-gray-500">Properties you can book without waiting for host approval</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedSearchFilters;
