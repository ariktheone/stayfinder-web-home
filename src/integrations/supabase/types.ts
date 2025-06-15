export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      booking_payment_deadlines: {
        Row: {
          booking_id: string | null
          created_at: string | null
          id: string
          payment_deadline: string
          reminder_sent: boolean | null
        }
        Insert: {
          booking_id?: string | null
          created_at?: string | null
          id?: string
          payment_deadline: string
          reminder_sent?: boolean | null
        }
        Update: {
          booking_id?: string | null
          created_at?: string | null
          id?: string
          payment_deadline?: string
          reminder_sent?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "booking_payment_deadlines_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          check_in: string
          check_out: string
          created_at: string
          guest_id: string
          id: string
          listing_id: string
          payment_deadline: string | null
          status: string | null
          total_amount: number
          total_guests: number
        }
        Insert: {
          check_in: string
          check_out: string
          created_at?: string
          guest_id: string
          id?: string
          listing_id: string
          payment_deadline?: string | null
          status?: string | null
          total_amount: number
          total_guests: number
        }
        Update: {
          check_in?: string
          check_out?: string
          created_at?: string
          guest_id?: string
          id?: string
          listing_id?: string
          payment_deadline?: string | null
          status?: string | null
          total_amount?: number
          total_guests?: number
        }
        Relationships: [
          {
            foreignKeyName: "bookings_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
        ]
      }
      listings: {
        Row: {
          amenities: string[] | null
          bathrooms: number | null
          bedrooms: number | null
          created_at: string
          description: string | null
          host_id: string
          id: string
          images: string[] | null
          latitude: number | null
          location: string | null
          longitude: number | null
          max_guests: number
          price_per_night: number
          title: string
          type: string | null
          updated_at: string | null
        }
        Insert: {
          amenities?: string[] | null
          bathrooms?: number | null
          bedrooms?: number | null
          created_at?: string
          description?: string | null
          host_id: string
          id?: string
          images?: string[] | null
          latitude?: number | null
          location?: string | null
          longitude?: number | null
          max_guests: number
          price_per_night: number
          title: string
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          amenities?: string[] | null
          bathrooms?: number | null
          bedrooms?: number | null
          created_at?: string
          description?: string | null
          host_id?: string
          id?: string
          images?: string[] | null
          latitude?: number | null
          location?: string | null
          longitude?: number | null
          max_guests?: number
          price_per_night?: number
          title?: string
          type?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      cancel_expired_bookings: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      get_listing_with_nearby: {
        Args: { listing_id: string; radius_km?: number }
        Returns: Json
      }
      get_nearby_listings: {
        Args: {
          target_lat: number
          target_lng: number
          radius_km?: number
          exclude_id?: string
          max_results?: number
        }
        Returns: {
          id: string
          host_id: string
          title: string
          description: string
          location: string
          latitude: number
          longitude: number
          price_per_night: number
          max_guests: number
          bedrooms: number
          bathrooms: number
          amenities: string[]
          images: string[]
          type: string
          distance_km: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
