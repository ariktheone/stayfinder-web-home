
import React, { useEffect, useRef, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Listing } from "@/types/database";

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

interface GoogleMapProps {
  listings: Listing[];
  center?: { lat: number; lng: number };
}

const GoogleMap = ({ listings, center = { lat: 40.7128, lng: -74.0060 } }: GoogleMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const [apiKey, setApiKey] = useState('');
  const [isApiKeySet, setIsApiKeySet] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  const loadGoogleMapsScript = () => {
    if (window.google) {
      setScriptLoaded(true);
      initializeMap();
      return;
    }

    window.initMap = () => {
      setScriptLoaded(true);
      initializeMap();
    };

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  };

  const initializeMap = () => {
    if (!mapContainer.current || !window.google) return;

    map.current = new window.google.maps.Map(mapContainer.current, {
      center: center,
      zoom: 10,
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        }
      ]
    });

    // Add markers for each listing
    listings.forEach((listing) => {
      if (listing.latitude && listing.longitude) {
        const marker = new window.google.maps.Marker({
          position: { lat: listing.latitude, lng: listing.longitude },
          map: map.current,
          title: listing.title,
          icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
                <circle cx="20" cy="20" r="18" fill="#e91e63" stroke="white" stroke-width="2"/>
                <text x="20" y="25" text-anchor="middle" fill="white" font-family="Arial" font-size="12" font-weight="bold">
                  $${Math.round((listing.price_per_night || 0) / 100)}
                </text>
              </svg>
            `),
            scaledSize: new window.google.maps.Size(40, 40),
          }
        });

        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 10px; max-width: 200px;">
              <img src="${listing.images?.[0] || '/placeholder.svg'}" alt="${listing.title}" style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px; margin-bottom: 8px;">
              <h3 style="margin: 0 0 8px 0; font-weight: bold; font-size: 14px;">${listing.title}</h3>
              <p style="margin: 0 0 8px 0; color: #666; font-size: 12px;">${listing.location}</p>
              <p style="margin: 0; font-weight: bold; color: #e91e63; font-size: 14px;">$${Math.round((listing.price_per_night || 0) / 100)}/night</p>
            </div>
          `
        });

        marker.addListener('click', () => {
          infoWindow.open(map.current, marker);
        });
      }
    });
  };

  const handleApiKeySubmit = () => {
    if (apiKey.trim()) {
      setIsApiKeySet(true);
      loadGoogleMapsScript();
    }
  };

  useEffect(() => {
    if (scriptLoaded && listings.length > 0) {
      initializeMap();
    }
  }, [scriptLoaded, listings]);

  if (!isApiKeySet) {
    return (
      <Card className="p-6 max-w-md mx-auto">
        <h3 className="text-lg font-semibold mb-4">Enter Google Maps API Key</h3>
        <p className="text-sm text-gray-600 mb-4">
          To display the map, please enter your Google Maps API key. 
          You can get one at <a href="https://developers.google.com/maps/documentation/javascript/get-api-key" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Cloud Console</a>
        </p>
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="AIzaSyC..."
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
          <Button onClick={handleApiKeySubmit} className="w-full">
            Load Map
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="relative w-full h-96">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg shadow-lg" />
    </div>
  );
};

export default GoogleMap;
