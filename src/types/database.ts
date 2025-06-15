
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

export interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  phone: string | null;
  bio: string | null;
  is_host: boolean;
  is_verified: boolean;
  host_since: string | null;
  response_rate: number;
  response_time: string | null;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  listing_id: string;
  reviewer_id: string;
  reviewee_id: string;
  booking_id: string | null;
  rating: number;
  comment: string | null;
  cleanliness_rating: number | null;
  communication_rating: number | null;
  checkin_rating: number | null;
  accuracy_rating: number | null;
  location_rating: number | null;
  value_rating: number | null;
  created_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  recipient_id: string;
  listing_id: string | null;
  booking_id: string | null;
  content: string;
  is_read: boolean;
  created_at: string;
}

export interface Wishlist {
  id: string;
  user_id: string;
  name: string;
  is_default: boolean;
  created_at: string;
}

export interface WishlistItem {
  id: string;
  wishlist_id: string;
  listing_id: string;
  created_at: string;
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
  instantBook?: boolean;
  sortBy?: 'price_low' | 'price_high' | 'rating' | 'distance';
}
