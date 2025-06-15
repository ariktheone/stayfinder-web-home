
-- Create profiles table for extended user information
CREATE TABLE public.profiles (
  id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name text,
  avatar_url text,
  phone text,
  bio text,
  is_host boolean DEFAULT false,
  is_verified boolean DEFAULT false,
  host_since timestamp with time zone,
  response_rate integer DEFAULT 0,
  response_time text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create reviews table
CREATE TABLE public.reviews (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  listing_id uuid NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
  reviewer_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  reviewee_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  booking_id uuid REFERENCES public.bookings(id) ON DELETE CASCADE,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text,
  cleanliness_rating integer CHECK (cleanliness_rating >= 1 AND cleanliness_rating <= 5),
  communication_rating integer CHECK (communication_rating >= 1 AND communication_rating <= 5),
  checkin_rating integer CHECK (checkin_rating >= 1 AND checkin_rating <= 5),
  accuracy_rating integer CHECK (accuracy_rating >= 1 AND accuracy_rating <= 5),
  location_rating integer CHECK (location_rating >= 1 AND location_rating <= 5),
  value_rating integer CHECK (value_rating >= 1 AND value_rating <= 5),
  created_at timestamp with time zone DEFAULT now(),
  UNIQUE(booking_id, reviewer_id)
);

-- Create messages table for host-guest communication
CREATE TABLE public.messages (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id uuid NOT NULL,
  sender_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  recipient_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  listing_id uuid REFERENCES public.listings(id) ON DELETE CASCADE,
  booking_id uuid REFERENCES public.bookings(id) ON DELETE CASCADE,
  content text NOT NULL,
  is_read boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now()
);

-- Create wishlists table
CREATE TABLE public.wishlists (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL DEFAULT 'My Wishlist',
  is_default boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now()
);

-- Create wishlist_items table
CREATE TABLE public.wishlist_items (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  wishlist_id uuid NOT NULL REFERENCES public.wishlists(id) ON DELETE CASCADE,
  listing_id uuid NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
  created_at timestamp with time zone DEFAULT now(),
  UNIQUE(wishlist_id, listing_id)
);

-- Add RLS policies for profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Add RLS policies for reviews
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Reviews are viewable by everyone" ON public.reviews
  FOR SELECT USING (true);

CREATE POLICY "Users can create reviews for their bookings" ON public.reviews
  FOR INSERT WITH CHECK (auth.uid() = reviewer_id);

CREATE POLICY "Users can update their own reviews" ON public.reviews
  FOR UPDATE USING (auth.uid() = reviewer_id);

-- Add RLS policies for messages
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view messages they sent or received" ON public.messages
  FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = recipient_id);

CREATE POLICY "Users can send messages" ON public.messages
  FOR INSERT WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Users can update messages they sent or received" ON public.messages
  FOR UPDATE USING (auth.uid() = sender_id OR auth.uid() = recipient_id);

-- Add RLS policies for wishlists
ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own wishlists" ON public.wishlists
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own wishlists" ON public.wishlists
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own wishlists" ON public.wishlists
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own wishlists" ON public.wishlists
  FOR DELETE USING (auth.uid() = user_id);

-- Add RLS policies for wishlist_items
ALTER TABLE public.wishlist_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own wishlist items" ON public.wishlist_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.wishlists 
      WHERE wishlists.id = wishlist_items.wishlist_id 
      AND wishlists.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can add items to their own wishlists" ON public.wishlist_items
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.wishlists 
      WHERE wishlists.id = wishlist_items.wishlist_id 
      AND wishlists.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can remove items from their own wishlists" ON public.wishlist_items
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.wishlists 
      WHERE wishlists.id = wishlist_items.wishlist_id 
      AND wishlists.user_id = auth.uid()
    )
  );

-- Add indexes for better performance
CREATE INDEX idx_profiles_is_host ON public.profiles(is_host);
CREATE INDEX idx_reviews_listing_id ON public.reviews(listing_id);
CREATE INDEX idx_reviews_reviewer_id ON public.reviews(reviewer_id);
CREATE INDEX idx_messages_conversation_id ON public.messages(conversation_id);
CREATE INDEX idx_messages_sender_recipient ON public.messages(sender_id, recipient_id);
CREATE INDEX idx_wishlist_items_wishlist_id ON public.wishlist_items(wishlist_id);

-- Create trigger to automatically create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, is_host)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    false
  );
  
  -- Create default wishlist
  INSERT INTO public.wishlists (user_id, name, is_default)
  VALUES (new.id, 'My Wishlist', true);
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to get listing with reviews
CREATE OR REPLACE FUNCTION public.get_listing_reviews(listing_uuid uuid)
RETURNS TABLE (
  review_id uuid,
  reviewer_name text,
  reviewer_avatar text,
  rating integer,
  comment text,
  cleanliness_rating integer,
  communication_rating integer,
  checkin_rating integer,
  accuracy_rating integer,
  location_rating integer,
  value_rating integer,
  created_at timestamp with time zone
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    r.id as review_id,
    p.full_name as reviewer_name,
    p.avatar_url as reviewer_avatar,
    r.rating,
    r.comment,
    r.cleanliness_rating,
    r.communication_rating,
    r.checkin_rating,
    r.accuracy_rating,
    r.location_rating,
    r.value_rating,
    r.created_at
  FROM public.reviews r
  JOIN public.profiles p ON r.reviewer_id = p.id
  WHERE r.listing_id = listing_uuid
  ORDER BY r.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add average rating calculation function
CREATE OR REPLACE FUNCTION public.get_listing_avg_rating(listing_uuid uuid)
RETURNS TABLE (
  avg_rating numeric,
  review_count bigint
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    ROUND(AVG(rating::numeric), 1) as avg_rating,
    COUNT(*) as review_count
  FROM public.reviews
  WHERE listing_id = listing_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
