
-- Listings (properties) table
CREATE TABLE public.listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  host_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  location TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  price_per_night INT NOT NULL,
  max_guests INT NOT NULL,
  bedrooms INT,
  bathrooms INT,
  amenities TEXT[],
  images TEXT[],
  type TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bookings table
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  guest_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  total_guests INT NOT NULL,
  total_amount INT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add RLS for listings (anyone can select, only hosts can insert)
ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Select all listings" ON public.listings
  FOR SELECT
  USING (true);

CREATE POLICY "Insert listings for hosts only" ON public.listings
  FOR INSERT
  WITH CHECK (auth.uid() = host_id);

CREATE POLICY "Update only by host" ON public.listings
  FOR UPDATE 
  USING (auth.uid() = host_id);

CREATE POLICY "Delete only by host" ON public.listings
  FOR DELETE 
  USING (auth.uid() = host_id);

-- Add RLS for bookings (guests can access their bookings, hosts see bookings for their listings)
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Select bookings for guest or host" ON public.bookings
  FOR SELECT
  USING (
    auth.uid() = guest_id
    OR auth.uid() IN (SELECT host_id FROM listings WHERE listings.id = bookings.listing_id)
  );

CREATE POLICY "Guests can insert bookings" ON public.bookings
  FOR INSERT
  WITH CHECK (auth.uid() = guest_id);

CREATE POLICY "Guests can update their bookings" ON public.bookings
  FOR UPDATE 
  USING (auth.uid() = guest_id);

CREATE POLICY "Guests can delete their bookings" ON public.bookings
  FOR DELETE 
  USING (auth.uid() = guest_id);

-- Indexes for performance
CREATE INDEX listings_location_idx ON public.listings (location);
CREATE INDEX listings_price_idx ON public.listings (price_per_night);
CREATE INDEX listings_amenities_idx ON public.listings USING GIN (amenities);

-- Insert sample data for testing
INSERT INTO public.listings (host_id, title, description, location, latitude, longitude, price_per_night, max_guests, bedrooms, bathrooms, amenities, images, type) VALUES
('80af3f95-3070-469f-8dac-88e829cf7466', 'Modern Loft in Downtown', 'Beautiful modern loft with stunning city views', 'New York, NY', 40.7128, -74.0060, 15000, 4, 2, 1, ARRAY['WiFi', 'Kitchen', 'Parking', 'AC'], ARRAY['https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=800&q=80'], 'Entire apartment'),
('80af3f95-3070-469f-8dac-88e829cf7466', 'Cozy Beach House', 'Perfect beach getaway with ocean views', 'Miami, FL', 25.7617, -80.1918, 22000, 6, 3, 2, ARRAY['WiFi', 'Kitchen', 'Beach Access', 'Pool'], ARRAY['https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=800&q=80'], 'Entire house'),
('80af3f95-3070-469f-8dac-88e829cf7466', 'Mountain Cabin Retreat', 'Peaceful mountain cabin with hiking trails', 'Aspen, CO', 39.1911, -106.8175, 18000, 8, 4, 3, ARRAY['WiFi', 'Fireplace', 'Hot Tub', 'Mountain View'], ARRAY['https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=800&q=80'], 'Entire cabin'),
('80af3f95-3070-469f-8dac-88e829cf7466', 'Urban Studio', 'Modern studio in the heart of the city', 'San Francisco, CA', 37.7749, -122.4194, 12000, 2, 1, 1, ARRAY['WiFi', 'Kitchen', 'Gym', 'City View'], ARRAY['https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=800&q=80'], 'Private room');
