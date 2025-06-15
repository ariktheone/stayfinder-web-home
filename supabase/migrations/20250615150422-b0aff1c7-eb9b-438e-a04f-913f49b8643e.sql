
-- Add more realistic worldwide listings with proper host_id references
INSERT INTO public.listings (host_id, title, description, location, latitude, longitude, price_per_night, max_guests, bedrooms, bathrooms, amenities, images, type) VALUES

-- Additional New York listings
('80af3f95-3070-469f-8dac-88e829cf7466', 'Luxury Central Park View', 'Stunning penthouse overlooking Central Park with floor-to-ceiling windows', 'New York, NY, USA', 40.7829, -73.9654, 45000, 6, 3, 3, ARRAY['WiFi', 'Kitchen', 'Concierge', 'Gym', 'Pool', 'Central Park view'], ARRAY['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80'], 'Entire apartment'),
('80af3f95-3070-469f-8dac-88e829cf7466', 'Cozy East Village Studio', 'Charming studio in the heart of East Village with exposed brick', 'New York, NY, USA', 40.7265, -73.9815, 15000, 2, 1, 1, ARRAY['WiFi', 'Kitchen', 'Air conditioning'], ARRAY['https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80'], 'Entire apartment'),

-- London listings
('80af3f95-3070-469f-8dac-88e829cf7466', 'Thames View Penthouse', 'Modern penthouse with panoramic Thames views in London Bridge', 'London, UK', 51.5074, -0.0877, 42000, 8, 4, 3, ARRAY['WiFi', 'Kitchen', 'River view', 'Balcony', 'Concierge'], ARRAY['https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80'], 'Entire penthouse'),
('80af3f95-3070-469f-8dac-88e829cf7466', 'Camden Market Loft', 'Industrial loft steps from Camden Market with rooftop terrace', 'London, UK', 51.5414, -0.1460, 22000, 4, 2, 2, ARRAY['WiFi', 'Kitchen', 'Rooftop terrace', 'Workspace'], ARRAY['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80'], 'Entire apartment'),

-- Paris listings
('80af3f95-3070-469f-8dac-88e829cf7466', 'Champs-Élysées Luxury Suite', 'Opulent suite on the famous Champs-Élysées with Eiffel Tower views', 'Paris, France', 48.8698, 2.3076, 38000, 4, 2, 2, ARRAY['WiFi', 'Kitchen', 'Eiffel Tower view', 'Concierge', 'Balcony'], ARRAY['https://images.unsplash.com/photo-1502602898536-47ad22581b52?auto=format&fit=crop&w=800&q=80'], 'Entire apartment'),
('80af3f95-3070-469f-8dac-88e829cf7466', 'Saint-Germain Boutique Flat', 'Stylish apartment in trendy Saint-Germain-des-Prés', 'Paris, France', 48.8534, 2.3348, 26000, 3, 1, 1, ARRAY['WiFi', 'Kitchen', 'Historic charm', 'Shopping nearby'], ARRAY['https://images.unsplash.com/photo-1549638441-b787d2e11f14?auto=format&fit=crop&w=800&q=80'], 'Entire apartment'),

-- Los Angeles listings
('80af3f95-3070-469f-8dac-88e829cf7466', 'Hollywood Hills Villa', 'Stunning villa with infinity pool and city views in Hollywood Hills', 'Los Angeles, CA, USA', 34.1341, -118.3215, 40000, 10, 5, 4, ARRAY['WiFi', 'Kitchen', 'Pool', 'City view', 'BBQ', 'Hot tub'], ARRAY['https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80'], 'Entire villa'),
('80af3f95-3070-469f-8dac-88e829cf7466', 'Venice Beach Bungalow', 'Bohemian beach house steps from Venice Beach boardwalk', 'Los Angeles, CA, USA', 34.0195, -118.4912, 28000, 6, 3, 2, ARRAY['WiFi', 'Kitchen', 'Beach access', 'Bike rental', 'Garden'], ARRAY['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'], 'Entire house'),

-- San Francisco listings
('80af3f95-3070-469f-8dac-88e829cf7466', 'Nob Hill Victorian', 'Historic Victorian home with Golden Gate Bridge views', 'San Francisco, CA, USA', 37.7946, -122.4097, 35000, 8, 4, 3, ARRAY['WiFi', 'Kitchen', 'Golden Gate view', 'Historic charm', 'Fireplace'], ARRAY['https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=800&q=80'], 'Entire house'),
('80af3f95-3070-469f-8dac-88e829cf7466', 'Mission District Loft', 'Modern loft in vibrant Mission District with local art', 'San Francisco, CA, USA', 37.7599, -122.4148, 24000, 4, 2, 2, ARRAY['WiFi', 'Kitchen', 'Art gallery', 'Workspace', 'Rooftop'], ARRAY['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80'], 'Entire apartment'),

-- Berlin listings
('80af3f95-3070-469f-8dac-88e829cf7466', 'Brandenburg Gate Apartment', 'Modern apartment near Brandenburg Gate with historic views', 'Berlin, Germany', 52.5163, 13.3777, 20000, 4, 2, 2, ARRAY['WiFi', 'Kitchen', 'Historic location', 'City center'], ARRAY['https://images.unsplash.com/photo-1587564228448-e6b7b5f2c9dd?auto=format&fit=crop&w=800&q=80'], 'Entire apartment'),
('80af3f95-3070-469f-8dac-88e829cf7466', 'Kreuzberg Artist Studio', 'Creative space in hip Kreuzberg with exposed beams', 'Berlin, Germany', 52.4996, 13.4200, 16000, 3, 1, 1, ARRAY['WiFi', 'Kitchen', 'Artist studio', 'Creative space'], ARRAY['https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80'], 'Entire studio'),

-- Madrid listings
('80af3f95-3070-469f-8dac-88e829cf7466', 'Gran Via Luxury Suite', 'Elegant suite on Madrid''s main boulevard with balcony views', 'Madrid, Spain', 40.4200, -3.7016, 25000, 4, 2, 2, ARRAY['WiFi', 'Kitchen', 'Balcony', 'City center', 'Shopping'], ARRAY['https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=800&q=80'], 'Entire apartment'),
('80af3f95-3070-469f-8dac-88e829cf7466', 'Retiro Park Townhouse', 'Charming townhouse overlooking beautiful Retiro Park', 'Madrid, Spain', 40.4153, -3.6844, 30000, 6, 3, 3, ARRAY['WiFi', 'Kitchen', 'Park view', 'Garden', 'Traditional'], ARRAY['https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?auto=format&fit=crop&w=800&q=80'], 'Entire house'),

-- Milan listings
('80af3f95-3070-469f-8dac-88e829cf7466', 'Duomo Cathedral Apartment', 'Sophisticated apartment with Duomo cathedral views', 'Milan, Italy', 45.4654, 9.1895, 32000, 4, 2, 2, ARRAY['WiFi', 'Kitchen', 'Cathedral view', 'Shopping district'], ARRAY['https://images.unsplash.com/photo-1549638441-b787d2e11f14?auto=format&fit=crop&w=800&q=80'], 'Entire apartment'),
('80af3f95-3070-469f-8dac-88e829cf7466', 'Navigli Canal House', 'Trendy house along Milan''s famous Navigli canals', 'Milan, Italy', 45.4484, 9.1696, 26000, 6, 3, 2, ARRAY['WiFi', 'Kitchen', 'Canal view', 'Nightlife area'], ARRAY['https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80'], 'Entire house'),

-- Hong Kong listings
('80af3f95-3070-469f-8dac-88e829cf7466', 'Victoria Harbour Penthouse', 'Luxury penthouse with stunning Victoria Harbour views', 'Hong Kong', 22.2783, 114.1747, 50000, 6, 3, 3, ARRAY['WiFi', 'Kitchen', 'Harbour view', 'Concierge', 'Pool'], ARRAY['https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80'], 'Entire penthouse'),
('80af3f95-3070-469f-8dac-88e829cf7466', 'Central District High-Rise', 'Modern apartment in the heart of Central business district', 'Hong Kong', 22.2855, 114.1577, 35000, 4, 2, 2, ARRAY['WiFi', 'Kitchen', 'City view', 'Business district'], ARRAY['https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80'], 'Entire apartment'),

-- Mumbai listings
('80af3f95-3070-469f-8dac-88e829cf7466', 'Marine Drive Sea View', 'Elegant apartment on iconic Marine Drive with ocean views', 'Mumbai, India', 18.9434, 72.8231, 18000, 4, 2, 2, ARRAY['WiFi', 'Kitchen', 'Ocean view', 'Historic location'], ARRAY['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80'], 'Entire apartment'),
('80af3f95-3070-469f-8dac-88e829cf7466', 'Bandra West Modern Flat', 'Contemporary apartment in trendy Bandra West', 'Mumbai, India', 19.0596, 72.8295, 15000, 3, 2, 1, ARRAY['WiFi', 'Kitchen', 'Modern amenities', 'Shopping nearby'], ARRAY['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80'], 'Entire apartment'),

-- São Paulo listings
('80af3f95-3070-469f-8dac-88e829cf7466', 'Vila Madalena Artist Loft', 'Creative loft in bohemian Vila Madalena neighborhood', 'São Paulo, Brazil', -23.5505, -46.6333, 14000, 4, 2, 2, ARRAY['WiFi', 'Kitchen', 'Art district', 'Nightlife'], ARRAY['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80'], 'Entire apartment'),
('80af3f95-3070-469f-8dac-88e829cf7466', 'Jardins Luxury Penthouse', 'Upscale penthouse in exclusive Jardins district', 'São Paulo, Brazil', -23.5613, -46.6565, 28000, 6, 3, 3, ARRAY['WiFi', 'Kitchen', 'Luxury district', 'Concierge', 'Pool'], ARRAY['https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80'], 'Entire penthouse'),

-- Cairo listings
('80af3f95-3070-469f-8dac-88e829cf7466', 'Nile River Palace', 'Majestic palace apartment overlooking the historic Nile River', 'Cairo, Egypt', 30.0444, 31.2357, 22000, 8, 4, 3, ARRAY['WiFi', 'Kitchen', 'Nile view', 'Historic palace', 'Balcony'], ARRAY['https://images.unsplash.com/photo-1549638441-b787d2e11f14?auto=format&fit=crop&w=800&q=80'], 'Entire apartment'),
('80af3f95-3070-469f-8dac-88e829cf7466', 'Zamalek Island Villa', 'Elegant villa on exclusive Zamalek Island', 'Cairo, Egypt', 30.0626, 31.2197, 25000, 6, 3, 3, ARRAY['WiFi', 'Kitchen', 'Island location', 'Garden', 'Traditional'], ARRAY['https://images.unsplash.com/photo-1580417794414-7f1923c0bfc1?auto=format&fit=crop&w=800&q=80'], 'Entire villa'),

-- Istanbul listings
('80af3f95-3070-469f-8dac-88e829cf7466', 'Bosphorus Bridge View', 'Luxury apartment with stunning Bosphorus Bridge views', 'Istanbul, Turkey', 41.0082, 28.9784, 24000, 4, 2, 2, ARRAY['WiFi', 'Kitchen', 'Bosphorus view', 'Historic area'], ARRAY['https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=800&q=80'], 'Entire apartment'),
('80af3f95-3070-469f-8dac-88e829cf7466', 'Sultanahmet Ottoman House', 'Traditional Ottoman house near Hagia Sophia', 'Istanbul, Turkey', 41.0053, 28.9770, 20000, 6, 3, 2, ARRAY['WiFi', 'Kitchen', 'Historic location', 'Traditional architecture'], ARRAY['https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80'], 'Entire house'),

-- Moscow listings
('80af3f95-3070-469f-8dac-88e829cf7466', 'Red Square Luxury Suite', 'Premium suite with views of iconic Red Square', 'Moscow, Russia', 55.7539, 37.6208, 30000, 4, 2, 2, ARRAY['WiFi', 'Kitchen', 'Red Square view', 'Historic location'], ARRAY['https://images.unsplash.com/photo-1547036967-23d11aacaee0?auto=format&fit=crop&w=800&q=80'], 'Entire apartment'),
('80af3f95-3070-469f-8dac-88e829cf7466', 'Arbat Street Classical Flat', 'Classical apartment on famous pedestrian Arbat Street', 'Moscow, Russia', 55.7522, 37.5909, 22000, 3, 2, 1, ARRAY['WiFi', 'Kitchen', 'Pedestrian street', 'Classical style'], ARRAY['https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80'], 'Entire apartment'),

-- Buenos Aires listings
('80af3f95-3070-469f-8dac-88e829cf7466', 'Puerto Madero Waterfront', 'Modern waterfront apartment in upscale Puerto Madero', 'Buenos Aires, Argentina', -34.6118, -58.3636, 16000, 4, 2, 2, ARRAY['WiFi', 'Kitchen', 'Waterfront', 'Modern district'], ARRAY['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80'], 'Entire apartment'),
('80af3f95-3070-469f-8dac-88e829cf7466', 'San Telmo Tango House', 'Traditional house in historic San Telmo tango district', 'Buenos Aires, Argentina', -34.6214, -58.3731, 12000, 6, 3, 2, ARRAY['WiFi', 'Kitchen', 'Tango district', 'Historic charm'], ARRAY['https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80'], 'Entire house'),

-- Melbourne listings
('80af3f95-3070-469f-8dac-88e829cf7466', 'Yarra River Penthouse', 'Sophisticated penthouse overlooking the Yarra River', 'Melbourne, Australia', -37.8136, 144.9631, 32000, 6, 3, 3, ARRAY['WiFi', 'Kitchen', 'River view', 'City center', 'Balcony'], ARRAY['https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80'], 'Entire penthouse'),
('80af3f95-3070-469f-8dac-88e829cf7466', 'Fitzroy Warehouse Conversion', 'Industrial warehouse conversion in trendy Fitzroy', 'Melbourne, Australia', -37.7996, 144.9789, 24000, 4, 2, 2, ARRAY['WiFi', 'Kitchen', 'Industrial design', 'Trendy area'], ARRAY['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80'], 'Entire apartment'),

-- Tel Aviv listings
('80af3f95-3070-469f-8dac-88e829cf7466', 'Mediterranean Beach House', 'Beachfront house with direct Mediterranean Sea access', 'Tel Aviv, Israel', 32.0853, 34.7818, 35000, 8, 4, 3, ARRAY['WiFi', 'Kitchen', 'Beach access', 'Sea view', 'Terrace'], ARRAY['https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=800&q=80'], 'Entire house'),
('80af3f95-3070-469f-8dac-88e829cf7466', 'Rothschild Boulevard Loft', 'Modern loft on iconic Rothschild Boulevard', 'Tel Aviv, Israel', 32.0668, 34.7706, 26000, 4, 2, 2, ARRAY['WiFi', 'Kitchen', 'Boulevard location', 'Modern design'], ARRAY['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80'], 'Entire apartment'),

-- Zurich listings
('80af3f95-3070-469f-8dac-88e829cf7466', 'Lake Zurich Villa', 'Stunning villa with panoramic Lake Zurich views', 'Zurich, Switzerland', 47.3769, 8.5417, 55000, 10, 5, 4, ARRAY['WiFi', 'Kitchen', 'Lake view', 'Mountain view', 'Garden', 'Luxury'], ARRAY['https://images.unsplash.com/photo-1580417794414-7f1923c0bfc1?auto=format&fit=crop&w=800&q=80'], 'Entire villa'),
('80af3f95-3070-469f-8dac-88e829cf7466', 'Old Town Swiss Chalet', 'Traditional Swiss chalet in historic Old Town', 'Zurich, Switzerland', 47.3707, 8.5423, 38000, 6, 3, 3, ARRAY['WiFi', 'Kitchen', 'Historic location', 'Traditional Swiss', 'Fireplace'], ARRAY['https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=800&q=80'], 'Entire house'),

-- Vienna listings
('80af3f95-3070-469f-8dac-88e829cf7466', 'Schönbrunn Palace View', 'Imperial apartment with Schönbrunn Palace views', 'Vienna, Austria', 48.2082, 16.3738, 28000, 4, 2, 2, ARRAY['WiFi', 'Kitchen', 'Palace view', 'Imperial style', 'Historic'], ARRAY['https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&fit=crop&w=800&q=80'], 'Entire apartment'),
('80af3f95-3070-469f-8dac-88e829cf7466', 'Danube River Penthouse', 'Elegant penthouse overlooking the beautiful Danube River', 'Vienna, Austria', 48.2206, 16.3633, 32000, 6, 3, 3, ARRAY['WiFi', 'Kitchen', 'River view', 'Classical architecture'], ARRAY['https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80'], 'Entire penthouse'),

-- Stockholm listings
('80af3f95-3070-469f-8dac-88e829cf7466', 'Gamla Stan Medieval House', 'Historic medieval house in charming Gamla Stan', 'Stockholm, Sweden', 59.3251, 18.0711, 30000, 6, 3, 2, ARRAY['WiFi', 'Kitchen', 'Medieval architecture', 'Historic district'], ARRAY['https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=800&q=80'], 'Entire house'),
('80af3f95-3070-469f-8dac-88e829cf7466', 'Archipelago Island Cabin', 'Peaceful cabin on Stockholm archipelago island', 'Stockholm, Sweden', 59.3500, 18.1500, 20000, 4, 2, 1, ARRAY['WiFi', 'Kitchen', 'Island location', 'Nature', 'Peaceful'], ARRAY['https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=800&q=80'], 'Entire cabin'),

-- Oslo listings
('80af3f95-3070-469f-8dac-88e829cf7466', 'Fjord View Modern House', 'Contemporary house with breathtaking Norwegian fjord views', 'Oslo, Norway', 59.9139, 10.7522, 34000, 8, 4, 3, ARRAY['WiFi', 'Kitchen', 'Fjord view', 'Modern Scandinavian', 'Fireplace'], ARRAY['https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=800&q=80'], 'Entire house'),
('80af3f95-3070-469f-8dac-88e829cf7466', 'Royal Palace District Flat', 'Elegant apartment near the Royal Palace', 'Oslo, Norway', 59.9169, 10.7367, 26000, 4, 2, 2, ARRAY['WiFi', 'Kitchen', 'Royal district', 'Elegant design'], ARRAY['https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80'], 'Entire apartment');
