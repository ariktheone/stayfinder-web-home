
-- Add realistic India-based listings with proper host_id references
INSERT INTO public.listings (host_id, title, description, location, latitude, longitude, price_per_night, max_guests, bedrooms, bathrooms, amenities, images, type) VALUES

-- Mumbai listings
('80af3f95-3070-469f-8dac-88e829cf7466', 'Luxury Apartment in Bandra West', 'Modern 2BHK apartment in prime Bandra location with sea view and all amenities', 'Bandra West, Mumbai, Maharashtra, India', 19.0596, 72.8295, 8500, 4, 2, 2, ARRAY['WiFi', 'AC', 'Kitchen', 'Washing Machine', 'TV', 'Parking'], ARRAY['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80'], 'Entire apartment'),

('80af3f95-3070-469f-8dac-88e829cf7466', 'Cozy Studio in Powai', 'Well-furnished studio apartment near IIT Bombay with lake view', 'Powai, Mumbai, Maharashtra, India', 19.1176, 72.9060, 4500, 2, 1, 1, ARRAY['WiFi', 'AC', 'Kitchen', 'Lake View', 'Security'], ARRAY['https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80'], 'Entire apartment'),

('80af3f95-3070-469f-8dac-88e829cf7466', 'Heritage Home in Colaba', 'Beautiful colonial-style home near Gateway of India with authentic Mumbai charm', 'Colaba, Mumbai, Maharashtra, India', 18.9067, 72.8147, 12000, 6, 3, 2, ARRAY['WiFi', 'AC', 'Kitchen', 'Heritage Architecture', 'Tourist Area'], ARRAY['https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80'], 'Entire house'),

-- Delhi listings
('80af3f95-3070-469f-8dac-88e829cf7466', 'Modern Flat in Connaught Place', 'Centrally located apartment in the heart of New Delhi with metro connectivity', 'Connaught Place, New Delhi, Delhi, India', 28.6315, 77.2167, 7500, 4, 2, 2, ARRAY['WiFi', 'AC', 'Kitchen', 'Metro Access', 'Central Location'], ARRAY['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80'], 'Entire apartment'),

('80af3f95-3070-469f-8dac-88e829cf7466', 'Luxury Villa in Vasant Vihar', 'Spacious 4BHK villa in upscale South Delhi with garden and parking', 'Vasant Vihar, New Delhi, Delhi, India', 28.5672, 77.1592, 15000, 8, 4, 3, ARRAY['WiFi', 'AC', 'Kitchen', 'Garden', 'Parking', 'Security'], ARRAY['https://images.unsplash.com/photo-1580417794414-7f1923c0bfc1?auto=format&fit=crop&w=800&q=80'], 'Entire villa'),

('80af3f95-3070-469f-8dac-88e829cf7466', 'Cozy Room in Lajpat Nagar', 'Comfortable private room in bustling market area with local experience', 'Lajpat Nagar, New Delhi, Delhi, India', 28.5676, 77.2433, 3000, 2, 1, 1, ARRAY['WiFi', 'AC', 'Shared Kitchen', 'Market Area', 'Local Experience'], ARRAY['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80'], 'Private room'),

-- Bangalore listings
('80af3f95-3070-469f-8dac-88e829cf7466', 'Tech Hub Apartment in Koramangala', 'Modern 2BHK perfect for IT professionals with high-speed internet', 'Koramangala, Bangalore, Karnataka, India', 12.9279, 77.6271, 6500, 4, 2, 2, ARRAY['WiFi', 'AC', 'Kitchen', 'High-speed Internet', 'IT Hub'], ARRAY['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80'], 'Entire apartment'),

('80af3f95-3070-469f-8dac-88e829cf7466', 'Garden Villa in Whitefield', 'Beautiful villa with garden in IT corridor area', 'Whitefield, Bangalore, Karnataka, India', 12.9698, 77.7500, 9500, 6, 3, 3, ARRAY['WiFi', 'AC', 'Kitchen', 'Garden', 'IT Corridor', 'Parking'], ARRAY['https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=800&q=80'], 'Entire villa'),

('80af3f95-3070-469f-8dac-88e829cf7466', 'Trendy Loft in Indiranagar', 'Hip loft apartment in Bangalores party district with rooftop access', 'Indiranagar, Bangalore, Karnataka, India', 12.9784, 77.6408, 7000, 4, 2, 2, ARRAY['WiFi', 'AC', 'Kitchen', 'Rooftop', 'Nightlife Area'], ARRAY['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80'], 'Entire apartment'),

-- Chennai listings
('80af3f95-3070-469f-8dac-88e829cf7466', 'Beachfront Apartment in Besant Nagar', 'Stunning sea-facing apartment near Elliots Beach', 'Besant Nagar, Chennai, Tamil Nadu, India', 13.0067, 80.2669, 8000, 4, 2, 2, ARRAY['WiFi', 'AC', 'Kitchen', 'Sea View', 'Beach Access'], ARRAY['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80'], 'Entire apartment'),

('80af3f95-3070-469f-8dac-88e829cf7466', 'Traditional House in Mylapore', 'Authentic Tamil heritage home near Kapaleeshwarar Temple', 'Mylapore, Chennai, Tamil Nadu, India', 13.0339, 80.2619, 5500, 6, 3, 2, ARRAY['WiFi', 'AC', 'Kitchen', 'Heritage', 'Temple Nearby'], ARRAY['https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80'], 'Entire house'),

-- Hyderabad listings
('80af3f95-3070-469f-8dac-88e829cf7466', 'Modern Flat in HITEC City', 'Contemporary apartment in IT hub with all modern amenities', 'HITEC City, Hyderabad, Telangana, India', 17.4435, 78.3772, 6000, 4, 2, 2, ARRAY['WiFi', 'AC', 'Kitchen', 'IT Hub', 'Modern Amenities'], ARRAY['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80'], 'Entire apartment'),

('80af3f95-3070-469f-8dac-88e829cf7466', 'Heritage Haveli in Old City', 'Traditional Nizami architecture house near Charminar', 'Old City, Hyderabad, Telangana, India', 17.3616, 78.4747, 7500, 8, 4, 3, ARRAY['WiFi', 'AC', 'Kitchen', 'Heritage Architecture', 'Historic Area'], ARRAY['https://images.unsplash.com/photo-1580417794414-7f1923c0bfc1?auto=format&fit=crop&w=800&q=80'], 'Entire house'),

-- Pune listings
('80af3f95-3070-469f-8dac-88e829cf7466', 'Student-Friendly Flat in Koregaon Park', 'Perfect for students and young professionals near universities', 'Koregaon Park, Pune, Maharashtra, India', 18.5362, 73.8958, 4500, 3, 2, 1, ARRAY['WiFi', 'AC', 'Kitchen', 'Student Area', 'University Nearby'], ARRAY['https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80'], 'Entire apartment'),

('80af3f95-3070-469f-8dac-88e829cf7466', 'Hill View Villa in Lonavala', 'Weekend getaway villa with stunning hill views near Mumbai', 'Lonavala, Pune, Maharashtra, India', 18.7547, 73.4084, 12000, 8, 4, 3, ARRAY['WiFi', 'AC', 'Kitchen', 'Hill View', 'Weekend Getaway', 'Garden'], ARRAY['https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=800&q=80'], 'Entire villa'),

-- Kolkata listings
('80af3f95-3070-469f-8dac-88e829cf7466', 'Colonial Mansion in Park Street', 'Historic colonial building in the heart of cultural Kolkata', 'Park Street, Kolkata, West Bengal, India', 22.5448, 88.3426, 6500, 6, 3, 2, ARRAY['WiFi', 'AC', 'Kitchen', 'Colonial Architecture', 'Cultural Area'], ARRAY['https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80'], 'Entire house'),

('80af3f95-3070-469f-8dac-88e829cf7466', 'Riverside Apartment in Howrah', 'Peaceful apartment with Hooghly River view', 'Howrah, Kolkata, West Bengal, India', 22.5958, 88.2636, 4000, 4, 2, 2, ARRAY['WiFi', 'AC', 'Kitchen', 'River View', 'Peaceful'], ARRAY['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80'], 'Entire apartment'),

-- Jaipur listings
('80af3f95-3070-469f-8dac-88e829cf7466', 'Royal Haveli in Pink City', 'Traditional Rajasthani haveli with royal architecture', 'Old City, Jaipur, Rajasthan, India', 26.9124, 75.7873, 8500, 8, 4, 3, ARRAY['WiFi', 'AC', 'Kitchen', 'Royal Architecture', 'Heritage', 'Courtyard'], ARRAY['https://images.unsplash.com/photo-1580417794414-7f1923c0bfc1?auto=format&fit=crop&w=800&q=80'], 'Entire house'),

('80af3f95-3070-469f-8dac-88e829cf7466', 'Modern Apartment in Malviya Nagar', 'Contemporary living in peaceful residential area', 'Malviya Nagar, Jaipur, Rajasthan, India', 26.8568, 75.8028, 5000, 4, 2, 2, ARRAY['WiFi', 'AC', 'Kitchen', 'Residential Area', 'Peaceful'], ARRAY['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80'], 'Entire apartment'),

-- Goa listings
('80af3f95-3070-469f-8dac-88e829cf7466', 'Beach Villa in Calangute', 'Luxury villa steps away from famous Calangute Beach', 'Calangute, Goa, India', 15.5430, 73.7674, 15000, 10, 5, 4, ARRAY['WiFi', 'AC', 'Kitchen', 'Beach Access', 'Pool', 'Garden'], ARRAY['https://images.unsplash.com/photo-1580417794414-7f1923c0bfc1?auto=format&fit=crop&w=800&q=80'], 'Entire villa'),

('80af3f95-3070-469f-8dac-88e829cf7466', 'Portuguese House in Fontainhas', 'Charming heritage house in Latin Quarter of Panaji', 'Fontainhas, Panaji, Goa, India', 15.4909, 73.8278, 7000, 6, 3, 2, ARRAY['WiFi', 'AC', 'Kitchen', 'Heritage', 'Portuguese Architecture'], ARRAY['https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80'], 'Entire house'),

-- Kochi listings
('80af3f95-3070-469f-8dac-88e829cf7466', 'Backwater House in Kumrakom', 'Traditional Kerala house with backwater access and houseboat view', 'Kumrakom, Kochi, Kerala, India', 9.6179, 76.4316, 9000, 6, 3, 3, ARRAY['WiFi', 'AC', 'Kitchen', 'Backwater View', 'Traditional Kerala', 'Boat Access'], ARRAY['https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=800&q=80'], 'Entire house'),

('80af3f95-3070-469f-8dac-88e829cf7466', 'Modern Flat in Marine Drive', 'Contemporary apartment with Arabian Sea view in Kochi', 'Marine Drive, Kochi, Kerala, India', 9.9668, 76.2815, 6500, 4, 2, 2, ARRAY['WiFi', 'AC', 'Kitchen', 'Sea View', 'Modern'], ARRAY['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80'], 'Entire apartment'),

-- Ahmedabad listings
('80af3f95-3070-469f-8dac-88e829cf7466', 'Heritage Pol House in Old City', 'Traditional Gujarati house in historic pol (neighborhood)', 'Old City, Ahmedabad, Gujarat, India', 23.0225, 72.5714, 4500, 6, 3, 2, ARRAY['WiFi', 'AC', 'Kitchen', 'Heritage', 'Traditional Gujarat'], ARRAY['https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80'], 'Entire house'),

('80af3f95-3070-469f-8dac-88e829cf7466', 'Business Hotel Room in SG Highway', 'Modern accommodation in business district', 'SG Highway, Ahmedabad, Gujarat, India', 23.0395, 72.5066, 3500, 2, 1, 1, ARRAY['WiFi', 'AC', 'Kitchen', 'Business District', 'Modern'], ARRAY['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80'], 'Private room');
