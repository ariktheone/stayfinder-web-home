
import React, { useEffect, useRef, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Listing } from "@/types/database";

declare global {
  interface Window {
    google: any;
    initListingMap: () => void;
  }
}

interface ListingMapProps {
  currentListing: Listing;
  nearbyListings: Listing[];
}

const ListingMap = ({ currentListing, nearbyListings }: ListingMapProps) => {
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

    window.initListingMap = () => {
      setScriptLoaded(true);
      initializeMap();
    };

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initListingMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  };

  const initializeMap = () => {
    if (!mapContainer.current || !window.google || !currentListing.latitude || !currentListing.longitude) return;

    const center = { lat: currentListing.latitude, lng: currentListing.longitude };

    map.current = new window.google.maps.Map(mapContainer.current, {
      center: center,
      zoom: 14,
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        }
      ]
    });

    // Add marker for current listing (highlighted)
    const currentMarker = new window.google.maps.Marker({
      position: center,
      map: map.current,
      title: currentListing.title,
      icon: {
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
          <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
            <circle cx="25" cy="25" r="22" fill="#dc2626" stroke="white" stroke-width="3" opacity="0.9"/>
            <circle cx="25" cy="25" r="8" fill="white"/>
            <text x="25" y="30" text-anchor="middle" fill="#dc2626" font-family="Arial" font-size="10" font-weight="bold">
              YOU
            </text>
          </svg>
        `),
        scaledSize: new window.google.maps.Size(50, 50),
      },
      zIndex: 1000
    });

    const currentInfoWindow = new window.google.maps.InfoWindow({
      content: `
        <div style="padding: 12px; max-width: 250px;">
          <img src="${currentListing.images?.[0] || '/placeholder.svg'}" alt="${currentListing.title}" style="width: 100%; height: 140px; object-fit: cover; border-radius: 8px; margin-bottom: 10px;">
          <h3 style="margin: 0 0 8px 0; font-weight: bold; font-size: 16px; color: #dc2626;">${currentListing.title}</h3>
          <p style="margin: 0 0 8px 0; color: #666; font-size: 13px;">${currentListing.location}</p>
          <div style="background: #dc2626; color: white; padding: 4px 8px; border-radius: 4px; display: inline-block;">
            <strong>Current Listing - $${Math.round((currentListing.price_per_night || 0) / 100)}/night</strong>
          </div>
        </div>
      `
    });

    currentMarker.addListener('click', () => {
      currentInfoWindow.open(map.current, currentMarker);
    });

    // Add markers for nearby listings
    nearbyListings.forEach((listing) => {
      if (listing.latitude && listing.longitude) {
        const marker = new window.google.maps.Marker({
          position: { lat: listing.latitude, lng: listing.longitude },
          map: map.current,
          title: listing.title,
          icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
                <circle cx="20" cy="20" r="18" fill="#3b82f6" stroke="white" stroke-width="2"/>
                <text x="20" y="25" text-anchor="middle" fill="white" font-family="Arial" font-size="11" font-weight="bold">
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
              <p style="margin: 0; font-weight: bold; color: #3b82f6; font-size: 14px;">$${Math.round((listing.price_per_night || 0) / 100)}/night</p>
            </div>
          `
        });

        marker.addListener('click', () => {
          infoWindow.open(map.current, marker);
        });
      }
    });

    // Open current listing info window by default
    currentInfoWindow.open(map.current, currentMarker);
  };

  const handleApiKeySubmit = () => {
    if (apiKey.trim()) {
      setIsApiKeySet(true);
      loadGoogleMapsScript();
    }
  };

  useEffect(() => {
    if (scriptLoaded && currentListing) {
      initializeMap();
    }
  }, [scriptLoaded, currentListing, nearbyListings]);

  if (!isApiKeySet) {
    return (
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Map Location</h3>
        <p className="text-sm text-gray-600 mb-4">
          To display the location map, please enter your Google Maps API key. 
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
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Location & Nearby Properties</h2>
      <div className="relative w-full h-96 rounded-lg overflow-hidden">
        <div ref={mapContainer} className="absolute inset-0" />
      </div>
      <div className="flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-600 rounded-full mr-2"></div>
            <span>Current Listing</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
            <span>Nearby Properties</span>
          </div>
        </div>
        <span>{nearbyListings.length} nearby properties</span>
      </div>
    </div>
  );
};

export default ListingMap;
