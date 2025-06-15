
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

-- Insert realistic worldwide sample data
INSERT INTO public.listings (host_id, title, description, location, latitude, longitude, price_per_night, max_guests, bedrooms, bathrooms, amenities, images, type) VALUES
-- New York, USA
('80af3f95-3070-469f-8dac-88e829cf7466', 'Modern Manhattan Loft', 'Stylish industrial loft in the heart of Manhattan with stunning city views and exposed brick walls', 'New York, NY, USA', 40.7589, -73.9851, 25000, 4, 2, 2, ARRAY['WiFi', 'Kitchen', 'Air conditioning', 'Washer', 'TV', 'Workspace'], ARRAY['https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=800&q=80'], 'Entire apartment'),
('80af3f95-3070-469f-8dac-88e829cf7466', 'Brooklyn Brownstone', 'Charming historic brownstone in trendy Brooklyn neighborhood with private garden', 'Brooklyn, NY, USA', 40.6782, -73.9442, 18000, 6, 3, 2, ARRAY['WiFi', 'Kitchen', 'Garden', 'Parking', 'Fireplace'], ARRAY['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80'], 'Entire house'),

-- London, UK
('80af3f95-3070-469f-8dac-88e829cf7466', 'Victorian House in Notting Hill', 'Beautiful Victorian house in prestigious Notting Hill with traditional English charm', 'London, UK', 51.5152, -0.2056, 35000, 8, 4, 3, ARRAY['WiFi', 'Kitchen', 'Fireplace', 'Garden', 'Washer'], ARRAY['https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&fit=crop&w=800&q=80'], 'Entire house'),
('80af3f95-3070-469f-8dac-88e829cf7466', 'Cozy Shoreditch Studio', 'Modern studio apartment in trendy Shoreditch area, perfect for city exploration', 'London, UK', 51.5224, -0.0780, 12000, 2, 1, 1, ARRAY['WiFi', 'Kitchen', 'Air conditioning', 'TV'], ARRAY['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80'], 'Entire apartment'),

-- Paris, France
('80af3f95-3070-469f-8dac-88e829cf7466', 'Elegant Parisian Apartment', 'Classic Haussmanian apartment in Le Marais with authentic French architecture', 'Paris, France', 48.8566, 2.3522, 28000, 4, 2, 1, ARRAY['WiFi', 'Kitchen', 'Balcony', 'Washer', 'TV'], ARRAY['https://images.unsplash.com/photo-1502602898536-47ad22581b52?auto=format&fit=crop&w=800&q=80'], 'Entire apartment'),
('80af3f95-3070-469f-8dac-88e829cf7466', 'Montmartre Artist Loft', 'Bohemian loft in artistic Montmartre with views of Sacré-Cœur', 'Paris, France', 48.8867, 2.3431, 22000, 3, 1, 1, ARRAY['WiFi', 'Kitchen', 'City view', 'Workspace'], ARRAY['https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=80'], 'Entire apartment'),

-- Tokyo, Japan
('80af3f95-3070-469f-8dac-88e829cf7466', 'Modern Tokyo Apartment', 'Ultra-modern apartment in Shibuya with high-tech amenities and city views', 'Tokyo, Japan', 35.6762, 139.6503, 20000, 2, 1, 1, ARRAY['WiFi', 'Kitchen', 'Air conditioning', 'TV', 'City view'], ARRAY['https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80'], 'Entire apartment'),
('80af3f95-3070-469f-8dac-88e829cf7466', 'Traditional Ryokan Suite', 'Authentic Japanese experience in a traditional ryokan-style accommodation', 'Tokyo, Japan', 35.6895, 139.6917, 30000, 4, 2, 2, ARRAY['WiFi', 'Kitchen', 'Traditional bath', 'Garden view'], ARRAY['https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80'], 'Entire place'),

-- Sydney, Australia
('80af3f95-3070-469f-8dac-88e829cf7466', 'Bondi Beach House', 'Stunning beachfront house with direct access to famous Bondi Beach', 'Sydney, Australia', -33.8906, 151.2744, 32000, 8, 4, 3, ARRAY['WiFi', 'Kitchen', 'Beach access', 'Pool', 'BBQ', 'Ocean view'], ARRAY['https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=800&q=80'], 'Entire house'),
('80af3f95-3070-469f-8dac-88e829cf7466', 'Harbour View Apartment', 'Luxury apartment with breathtaking Sydney Harbour Bridge views', 'Sydney, Australia', -33.8568, 151.2153, 40000, 6, 3, 2, ARRAY['WiFi', 'Kitchen', 'Pool', 'Gym', 'Harbour view', 'Balcony'], ARRAY['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80'], 'Entire apartment'),

-- Rome, Italy
('80af3f95-3070-469f-8dac-88e829cf7466', 'Historic Roman Villa', 'Elegant villa near the Colosseum with ancient Roman charm and modern amenities', 'Rome, Italy', 41.9028, 12.4964, 35000, 10, 5, 4, ARRAY['WiFi', 'Kitchen', 'Garden', 'Historic features', 'Terrace'], ARRAY['https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80'], 'Entire villa'),
('80af3f95-3070-469f-8dac-88e829cf7466', 'Trastevere Townhouse', 'Charming townhouse in the bohemian Trastevere neighborhood', 'Rome, Italy', 41.8902, 12.4693, 24000, 4, 2, 2, ARRAY['WiFi', 'Kitchen', 'Terrace', 'Historic charm'], ARRAY['https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?auto=format&fit=crop&w=800&q=80'], 'Entire house'),

-- Barcelona, Spain
('80af3f95-3070-469f-8dac-88e829cf7466', 'Gothic Quarter Apartment', 'Stylish apartment in the heart of Barcelona\'s Gothic Quarter', 'Barcelona, Spain', 41.3851, 2.1734, 18000, 4, 2, 1, ARRAY['WiFi', 'Kitchen', 'Balcony', 'Historic location'], ARRAY['https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=800&q=80'], 'Entire apartment'),
('80af3f95-3070-469f-8dac-88e829cf7466', 'Beachfront Barcelona Loft', 'Modern loft steps from Barceloneta Beach with sea views', 'Barcelona, Spain', 41.3794, 2.1925, 26000, 6, 3, 2, ARRAY['WiFi', 'Kitchen', 'Beach access', 'Sea view', 'Balcony'], ARRAY['https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80'], 'Entire apartment'),

-- Dubai, UAE
('80af3f95-3070-469f-8dac-88e829cf7466', 'Luxury Dubai Marina Penthouse', 'Ultra-luxury penthouse in Dubai Marina with infinity pool and stunning views', 'Dubai, UAE', 25.0772, 55.1389, 60000, 8, 4, 4, ARRAY['WiFi', 'Kitchen', 'Pool', 'Gym', 'Concierge', 'City view', 'Luxury amenities'], ARRAY['https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80'], 'Entire penthouse'),
('80af3f95-3070-469f-8dac-88e829cf7466', 'Desert Resort Villa', 'Exclusive desert resort villa with private pool and spa facilities', 'Dubai, UAE', 25.0657, 55.1713, 45000, 6, 3, 3, ARRAY['WiFi', 'Kitchen', 'Private pool', 'Spa', 'Desert view', 'Luxury'], ARRAY['https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80'], 'Entire villa'),

-- Singapore
('80af3f95-3070-469f-8dac-88e829cf7466', 'Marina Bay Luxury Suite', 'High-end suite overlooking Marina Bay Sands with infinity pool access', 'Singapore', 1.2966, 103.8558, 38000, 4, 2, 2, ARRAY['WiFi', 'Kitchen', 'Pool', 'Gym', 'City view', 'Concierge'], ARRAY['https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80'], 'Entire apartment'),

-- Rio de Janeiro, Brazil
('80af3f95-3070-469f-8dac-88e829cf7466', 'Copacabana Beachfront Apartment', 'Iconic beachfront apartment with panoramic views of Copacabana Beach', 'Rio de Janeiro, Brazil', -22.9717, -43.1826, 22000, 4, 2, 2, ARRAY['WiFi', 'Kitchen', 'Beach access', 'Ocean view', 'Balcony'], ARRAY['https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=800&q=80'], 'Entire apartment'),
('80af3f95-3070-469f-8dac-88e829cf7466', 'Santa Teresa Artist House', 'Bohemian house in the artistic Santa Teresa neighborhood with city views', 'Rio de Janeiro, Brazil', -22.9133, -43.1889, 16000, 6, 3, 2, ARRAY['WiFi', 'Kitchen', 'City view', 'Garden', 'Artistic atmosphere'], ARRAY['https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80'], 'Entire house'),

-- Cape Town, South Africa
('80af3f95-3070-469f-8dac-88e829cf7466', 'Table Mountain View Villa', 'Stunning villa with breathtaking views of Table Mountain and False Bay', 'Cape Town, South Africa', -33.9249, 18.4241, 28000, 8, 4, 3, ARRAY['WiFi', 'Kitchen', 'Pool', 'Mountain view', 'Wine cellar', 'Garden'], ARRAY['https://images.unsplash.com/photo-1580417794414-7f1923c0bfc1?auto=format&fit=crop&w=800&q=80'], 'Entire villa'),

-- Bangkok, Thailand
('80af3f95-3070-469f-8dac-88e829cf7466', 'Chao Phraya River Penthouse', 'Luxury penthouse with river views and traditional Thai design elements', 'Bangkok, Thailand', 13.7563, 100.5018, 20000, 6, 3, 3, ARRAY['WiFi', 'Kitchen', 'Pool', 'River view', 'Thai design', 'Balcony'], ARRAY['https://images.unsplash.com/photo-1552550049-db097c9480d1?auto=format&fit=crop&w=800&q=80'], 'Entire penthouse'),

-- Reykjavik, Iceland
('80af3f95-3070-469f-8dac-88e829cf7466', 'Northern Lights Cabin', 'Cozy cabin perfect for viewing the Northern Lights with hot tub and fireplace', 'Reykjavik, Iceland', 64.1466, -21.9426, 24000, 4, 2, 1, ARRAY['WiFi', 'Kitchen', 'Hot tub', 'Fireplace', 'Northern lights view'], ARRAY['https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=800&q=80'], 'Entire cabin'),

-- Vancouver, Canada
('80af3f95-3070-469f-8dac-88e829cf7466', 'Stanley Park Waterfront Condo', 'Modern waterfront condo with views of Stanley Park and English Bay', 'Vancouver, Canada', 49.2827, -123.1207, 26000, 4, 2, 2, ARRAY['WiFi', 'Kitchen', 'Water view', 'Balcony', 'Gym'], ARRAY['https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=800&q=80'], 'Entire apartment'),

-- Mexico City, Mexico
('80af3f95-3070-469f-8dac-88e829cf7466', 'Colonial Roma Norte House', 'Beautiful colonial house in trendy Roma Norte with rooftop terrace', 'Mexico City, Mexico', 19.4326, -99.1332, 15000, 6, 3, 2, ARRAY['WiFi', 'Kitchen', 'Rooftop terrace', 'Colonial architecture'], ARRAY['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80'], 'Entire house'),

-- Amsterdam, Netherlands
('80af3f95-3070-469f-8dac-88e829cf7466', 'Canal House Amsterdam', 'Historic canal house with traditional Dutch architecture and canal views', 'Amsterdam, Netherlands', 52.3676, 4.9041, 30000, 6, 3, 2, ARRAY['WiFi', 'Kitchen', 'Canal view', 'Historic charm', 'Bicycles'], ARRAY['https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=800&q=80'], 'Entire house'),

-- Seoul, South Korea
('80af3f95-3070-469f-8dac-88e829cf7466', 'Gangnam Modern Apartment', 'Ultra-modern apartment in trendy Gangnam district with high-tech amenities', 'Seoul, South Korea', 37.5665, 126.9780, 18000, 3, 2, 1, ARRAY['WiFi', 'Kitchen', 'Air conditioning', 'High-tech features', 'City view'], ARRAY['https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=800&q=80'], 'Entire apartment');
