
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          avatar_url: string | null;
          phone: string | null;
          bio: string | null;
          is_host: boolean | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          avatar_url?: string | null;
          phone?: string | null;
          bio?: string | null;
          is_host?: boolean | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          phone?: string | null;
          bio?: string | null;
          is_host?: boolean | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
      },
      listings: {
        Row: {
          id: string;
          host_id: string;
          title: string;
          description: string | null;
          listing_type: string;
          location: string;
          latitude: number | null;
          longitude: number | null;
          price_per_night: number;
          max_guests: number;
          bedrooms: number;
          bathrooms: number;
          amenities: string[] | null;
          images: string[] | null;
          is_active: boolean;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          host_id: string;
          title: string;
          description?: string | null;
          listing_type: string;
          location: string;
          latitude?: number | null;
          longitude?: number | null;
          price_per_night: number;
          max_guests?: number;
          bedrooms?: number;
          bathrooms?: number;
          amenities?: string[] | null;
          images?: string[] | null;
          is_active?: boolean;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          host_id?: string;
          title?: string;
          description?: string | null;
          listing_type?: string;
          location?: string;
          latitude?: number | null;
          longitude?: number | null;
          price_per_night?: number;
          max_guests?: number;
          bedrooms?: number;
          bathrooms?: number;
          amenities?: string[] | null;
          images?: string[] | null;
          is_active?: boolean;
          created_at?: string | null;
          updated_at?: string | null;
        };
      },
      bookings: {
        Row: {
          id: string;
          listing_id: string;
          guest_id: string;
          check_in: string;
          check_out: string;
          total_guests: number;
          total_amount: number;
          status: string;
          stripe_session_id: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          listing_id: string;
          guest_id: string;
          check_in: string;
          check_out: string;
          total_guests: number;
          total_amount: number;
          status?: string;
          stripe_session_id?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          listing_id?: string;
          guest_id?: string;
          check_in?: string;
          check_out?: string;
          total_guests?: number;
          total_amount?: number;
          status?: string;
          stripe_session_id?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
      },
      payments: {
        Row: {
          id: string;
          booking_id: string;
          stripe_payment_intent_id: string | null;
          amount: number;
          currency: string | null;
          status: string;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          booking_id: string;
          stripe_payment_intent_id?: string | null;
          amount: number;
          currency?: string | null;
          status?: string;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          booking_id?: string;
          stripe_payment_intent_id?: string | null;
          amount?: number;
          currency?: string | null;
          status?: string;
          created_at?: string | null;
          updated_at?: string | null;
        };
      },
      reviews: {
        Row: {
          id: string;
          listing_id: string;
          guest_id: string;
          booking_id: string;
          rating: number;
          comment: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          listing_id: string;
          guest_id: string;
          booking_id: string;
          rating: number;
          comment?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          listing_id?: string;
          guest_id?: string;
          booking_id?: string;
          rating?: number;
          comment?: string | null;
          created_at?: string | null;
        };
      }
    },
    Views: {},
    Functions: {
      search_listings: {
        Args: {
          search_location?: string | null;
          min_price?: number | null;
          max_price?: number | null;
          check_in_date?: string | null;
          check_out_date?: string | null;
          min_guests?: number | null;
        };
        Returns: {
          id: string;
          title: string;
          description: string;
          listing_type: string;
          location: string;
          latitude: number | null;
          longitude: number | null;
          price_per_night: number;
          max_guests: number;
          bedrooms: number;
          bathrooms: number;
          amenities: string[] | null;
          images: string[] | null;
          host_name: string;
          avg_rating: number;
          review_count: number;
        }[];
      }
    },
    Enums: {
      listing_type: 'apartment' | 'house' | 'condo' | 'villa' | 'cabin' | 'studio',
      booking_status: 'pending' | 'confirmed' | 'cancelled' | 'completed',
      payment_status: 'pending' | 'paid' | 'failed' | 'refunded'
    },
    CompositeTypes: {}
  }
};
