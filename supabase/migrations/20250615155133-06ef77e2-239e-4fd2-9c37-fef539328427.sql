
-- Add indexes for better query performance (without is_active column)
CREATE INDEX IF NOT EXISTS idx_listings_location ON listings USING gin(to_tsvector('english', location));
CREATE INDEX IF NOT EXISTS idx_listings_coordinates ON listings (latitude, longitude) WHERE latitude IS NOT NULL AND longitude IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_listings_price ON listings (price_per_night);
CREATE INDEX IF NOT EXISTS idx_listings_guests ON listings (max_guests);
CREATE INDEX IF NOT EXISTS idx_listings_host ON listings (host_id);
CREATE INDEX IF NOT EXISTS idx_listings_type ON listings (type);

-- Add function to get nearby listings with better performance
CREATE OR REPLACE FUNCTION get_nearby_listings(
  target_lat double precision,
  target_lng double precision,
  radius_km double precision DEFAULT 10,
  exclude_id uuid DEFAULT NULL,
  max_results integer DEFAULT 6
)
RETURNS TABLE (
  id uuid,
  host_id uuid,
  title text,
  description text,
  location text,
  latitude double precision,
  longitude double precision,
  price_per_night integer,
  max_guests integer,
  bedrooms integer,
  bathrooms integer,
  amenities text[],
  images text[],
  type text,
  distance_km double precision
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    l.id,
    l.host_id,
    l.title,
    l.description,
    l.location,
    l.latitude,
    l.longitude,
    l.price_per_night,
    l.max_guests,
    l.bedrooms,
    l.bathrooms,
    l.amenities,
    l.images,
    l.type,
    (6371 * acos(cos(radians(target_lat)) * cos(radians(l.latitude)) 
     * cos(radians(l.longitude) - radians(target_lng)) 
     + sin(radians(target_lat)) * sin(radians(l.latitude)))) as distance_km
  FROM listings l
  WHERE 
    l.latitude IS NOT NULL 
    AND l.longitude IS NOT NULL
    AND (exclude_id IS NULL OR l.id != exclude_id)
    AND (6371 * acos(cos(radians(target_lat)) * cos(radians(l.latitude)) 
         * cos(radians(l.longitude) - radians(target_lng)) 
         + sin(radians(target_lat)) * sin(radians(l.latitude)))) <= radius_km
  ORDER BY distance_km
  LIMIT max_results;
END;
$$ LANGUAGE plpgsql;

-- Add function to get listing with optimized query
CREATE OR REPLACE FUNCTION get_listing_with_nearby(
  listing_id uuid,
  radius_km double precision DEFAULT 10
)
RETURNS json AS $$
DECLARE
  main_listing listings%ROWTYPE;
  nearby_listings json;
  result json;
BEGIN
  -- Get the main listing
  SELECT * INTO main_listing FROM listings WHERE id = listing_id;
  
  IF main_listing.id IS NULL THEN
    RETURN NULL;
  END IF;
  
  -- Get nearby listings if coordinates exist
  IF main_listing.latitude IS NOT NULL AND main_listing.longitude IS NOT NULL THEN
    SELECT json_agg(row_to_json(nearby.*)) INTO nearby_listings
    FROM get_nearby_listings(
      main_listing.latitude, 
      main_listing.longitude, 
      radius_km, 
      listing_id
    ) AS nearby;
  ELSE
    nearby_listings := '[]'::json;
  END IF;
  
  -- Combine results
  result := json_build_object(
    'listing', row_to_json(main_listing),
    'nearby_listings', COALESCE(nearby_listings, '[]'::json)
  );
  
  RETURN result;
END;
$$ LANGUAGE plpgsql;
