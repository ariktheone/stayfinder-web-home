
export interface Listing {
  id: string;
  host_id: string;
  title: string;
  description: string | null;
  location: string | null;
  latitude: number | null;
  longitude: number | null;
  price_per_night: number;
  max_guests: number;
  bedrooms: number | null;
  bathrooms: number | null;
  amenities: string[] | null;
  images: string[] | null;
  type: string | null;
  created_at: string;
  updated_at: string | null;
}

export interface Booking {
  id: string;
  listing_id: string;
  guest_id: string;
  check_in: string;
  check_out: string;
  total_guests: number;
  total_amount: number;
  status: string;
  payment_deadline?: string;
  created_at: string;
}

export interface SearchFilters {
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  propertyType?: string;
  amenities?: string[];
}
