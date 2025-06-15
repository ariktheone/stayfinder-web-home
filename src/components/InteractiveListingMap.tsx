
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation, Maximize2 } from "lucide-react";
import { Listing } from "@/types/database";

declare global {
  interface Window {
    google: any;
    initInteractiveListingMap: () => void;
  }
}

interface InteractiveListingMapProps {
  currentListing: Listing;
  nearbyListings: Listing[];
}

const InteractiveListingMap = ({ currentListing, nearbyListings }: InteractiveListingMapProps) => {
  const navigate = useNavigate();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const [apiKey, setApiKey] = useState('');
  const [isApiKeySet, setIsApiKeySet] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
  const [mapZoom, setMapZoom] = useState(14);

  const loadGoogleMapsScript = useCallback(() => {
    if (window.google) {
      setScriptLoaded(true);
      initializeMap();
      return;
    }

    window.initInteractiveListingMap = () => {
      setScriptLoaded(true);
      initializeMap();
    };

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initInteractiveListingMap&libraries=geometry`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }, [apiKey]);

  const handleMarkerClick = useCallback((listing: Listing) => {
    setSelectedListing(listing);
    if (map.current && listing.latitude && listing.longitude) {
      map.current.panTo({ lat: listing.latitude, lng: listing.longitude });
      map.current.setZoom(16);
    }
  }, []);

  const handleListingNavigate = useCallback((listingId: string) => {
    navigate(`/listing/${listingId}`);
  }, [navigate]);

  const initializeMap = useCallback(() => {
    if (!mapContainer.current || !window.google || !currentListing.latitude || !currentListing.longitude) return;

    const center = { lat: currentListing.latitude, lng: currentListing.longitude };
    setMapCenter(center);

    map.current = new window.google.maps.Map(mapContainer.current, {
      center: center,
      zoom: mapZoom,
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        },
        {
          featureType: 'transit',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        }
      ],
      mapTypeControl: true,
      streetViewControl: true,
      fullscreenControl: true,
      zoomControl: true,
    });

    // Add current listing marker
    const currentMarker = new window.google.maps.Marker({
      position: center,
      map: map.current,
      title: currentListing.title,
      icon: {
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
          <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60">
            <circle cx="30" cy="30" r="26" fill="#dc2626" stroke="white" stroke-width="4" opacity="0.95"/>
            <circle cx="30" cy="30" r="12" fill="white"/>
            <text x="30" y="36" text-anchor="middle" fill="#dc2626" font-family="Arial" font-size="10" font-weight="bold">
              HERE
            </text>
          </svg>
        `),
        scaledSize: new window.google.maps.Size(60, 60),
        anchor: new window.google.maps.Point(30, 30)
      },
      zIndex: 1000,
      animation: window.google.maps.Animation.BOUNCE
    });

    // Stop animation after 2 seconds
    setTimeout(() => {
      currentMarker.setAnimation(null);
    }, 2000);

    const currentInfoWindow = new window.google.maps.InfoWindow({
      content: `
        <div style="padding: 16px; max-width: 280px;">
          <img src="${currentListing.images?.[0] || '/placeholder.svg'}" alt="${currentListing.title}" 
               style="width: 100%; height: 150px; object-fit: cover; border-radius: 8px; margin-bottom: 12px;">
          <h3 style="margin: 0 0 8px 0; font-weight: bold; font-size: 18px; color: #dc2626;">${currentListing.title}</h3>
          <p style="margin: 0 0 8px 0; color: #666; font-size: 14px; display: flex; align-items: center;">
            <span style="margin-right: 4px;">📍</span>${currentListing.location}
          </p>
          <div style="background: linear-gradient(135deg, #dc2626, #b91c1c); color: white; padding: 8px 12px; border-radius: 6px; display: inline-block; font-weight: bold;">
            Current Listing - $${Math.round((currentListing.price_per_night || 0) / 100)}/night
          </div>
        </div>
      `
    });

    currentMarker.addListener('click', () => {
      currentInfoWindow.open(map.current, currentMarker);
      setSelectedListing(currentListing);
    });

    // Add nearby listings markers
    nearbyListings.forEach((listing, index) => {
      if (listing.latitude && listing.longitude) {
        const marker = new window.google.maps.Marker({
          position: { lat: listing.latitude, lng: listing.longitude },
          map: map.current,
          title: listing.title,
          icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
                <circle cx="25" cy="25" r="22" fill="#3b82f6" stroke="white" stroke-width="3" opacity="0.9"/>
                <text x="25" y="30" text-anchor="middle" fill="white" font-family="Arial" font-size="12" font-weight="bold">
                  $${Math.round((listing.price_per_night || 0) / 100)}
                </text>
              </svg>
            `),
            scaledSize: new window.google.maps.Size(50, 50),
            anchor: new window.google.maps.Point(25, 25)
          },
          zIndex: 100 + index
        });

        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 12px; max-width: 240px;">
              <img src="${listing.images?.[0] || '/placeholder.svg'}" alt="${listing.title}" 
                   style="width: 100%; height: 130px; object-fit: cover; border-radius: 8px; margin-bottom: 10px;">
              <h3 style="margin: 0 0 8px 0; font-weight: bold; font-size: 16px;">${listing.title}</h3>
              <p style="margin: 0 0 8px 0; color: #666; font-size: 13px;">${listing.location}</p>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <p style="margin: 0; font-weight: bold; color: #3b82f6; font-size: 16px;">$${Math.round((listing.price_per_night || 0) / 100)}/night</p>
                <button onclick="window.navigateToListing('${listing.id}')" 
                        style="background: #3b82f6; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 12px;">
                  View Details
                </button>
              </div>
            </div>
          `
        });

        marker.addListener('click', () => {
          infoWindow.open(map.current, marker);
          handleMarkerClick(listing);
        });

        // Add hover effects
        marker.addListener('mouseover', () => {
          marker.setZIndex(1000);
        });

        marker.addListener('mouseout', () => {
          marker.setZIndex(100 + index);
        });
      }
    });

    // Global function for navigation from info windows
    (window as any).navigateToListing = (listingId: string) => {
      handleListingNavigate(listingId);
    };

    // Open current listing info window by default
    setTimeout(() => {
      currentInfoWindow.open(map.current, currentMarker);
    }, 500);

    // Add map event listeners
    map.current.addListener('zoom_changed', () => {
      setMapZoom(map.current.getZoom());
    });

    map.current.addListener('center_changed', () => {
      const center = map.current.getCenter();
      setMapCenter({ lat: center.lat(), lng: center.lng() });
    });

  }, [currentListing, nearbyListings, mapZoom, handleMarkerClick, handleListingNavigate]);

  const handleApiKeySubmit = () => {
    if (apiKey.trim()) {
      setIsApiKeySet(true);
      loadGoogleMapsScript();
    }
  };

  const centerOnCurrentListing = () => {
    if (map.current && currentListing.latitude && currentListing.longitude) {
      map.current.panTo({ lat: currentListing.latitude, lng: currentListing.longitude });
      map.current.setZoom(16);
    }
  };

  useEffect(() => {
    if (scriptLoaded && currentListing) {
      initializeMap();
    }
  }, [scriptLoaded, currentListing, nearbyListings, initializeMap]);

  if (!isApiKeySet) {
    return (
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Interactive Location Map
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          To display the interactive location map, please enter your Google Maps API key. 
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
            Load Interactive Map
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <MapPin className="h-6 w-6" />
          Location & Nearby Properties
        </h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={centerOnCurrentListing}
            className="flex items-center gap-2"
          >
            <Navigation className="h-4 w-4" />
            Center
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => map.current?.setZoom(mapZoom + 2)}
            className="flex items-center gap-2"
          >
            <Maximize2 className="h-4 w-4" />
            Zoom In
          </Button>
        </div>
      </div>

      <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-lg">
        <div ref={mapContainer} className="absolute inset-0" />
      </div>

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-600 rounded-full mr-2"></div>
            <span>Current Listing</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
            <span>Nearby Properties ({nearbyListings.length})</span>
          </div>
        </div>
        <div className="text-gray-600">
          Zoom: {mapZoom} | Lat: {mapCenter.lat.toFixed(4)}, Lng: {mapCenter.lng.toFixed(4)}
        </div>
      </div>

      {selectedListing && selectedListing.id !== currentListing.id && (
        <Card className="p-4 border-blue-200 bg-blue-50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-blue-900">{selectedListing.title}</h3>
              <p className="text-sm text-blue-700">{selectedListing.location}</p>
              <p className="text-lg font-bold text-blue-800">
                ${Math.round((selectedListing.price_per_night || 0) / 100)}/night
              </p>
            </div>
            <Button
              onClick={() => handleListingNavigate(selectedListing.id)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              View Details
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default InteractiveListingMap;
