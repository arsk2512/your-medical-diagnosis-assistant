"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Location {
  lat: number;
  lng: number;
}

interface ClinicLocatorDemoProps {
  userLocation: Location | null;
  expertType?: string;
}

export default function ClinicLocatorDemo({
  userLocation,
  expertType,
}: ClinicLocatorDemoProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [loading, setLoading] = useState(false);
  const [locationName, setLocationName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isAutoSearch, setIsAutoSearch] = useState(!!expertType);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    if (userLocation) {
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${userLocation.lat},${userLocation.lng}&key=${apiKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.results && data.results[0]) {
            const address = data.results[0].formatted_address;
            setLocationName(address);

            if (expertType) {
              const term = `${expertType} near ${address}`;
              setSearchTerm(term);
            }
          }
        })
        .catch((err) => {
          console.error("Error getting location name:", err);
          setError("Could not get location details");
        });
    }
  }, [userLocation, expertType]);

  useEffect(() => {
    if (expertType && searchTerm && locationName) {
      handleSearch(true);
    }
  }, [searchTerm, expertType, locationName]);

  const handleSearch = (isAuto = false) => {
    if (!searchTerm.trim()) {
      setError("Please enter a location or allow location access");
      return;
    }

    setLoading(true);
    setShowMap(false);
    setError(null);
    setIsAutoSearch(isAuto);

    // Small delay for better UX
    setTimeout(() => {
      setShowMap(true);
      setLoading(false);
    }, 500);
  };

  const formatSearchQuery = (query: string) => {
    const keywords = [
      "hospital",
      "clinic",
      "health center",
      "doctor",
      "medical",
    ];
    const lowerQuery = query.toLowerCase();

    // Check if query already contains healthcare-related words
    const containsKeyword = keywords.some((word) => lowerQuery.includes(word));

    return containsKeyword ? query : `${query} medical facilities`;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            {expertType ? `Find ${expertType}` : "Find Medical Facilities"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 items-center">
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for medical facilities..."
                className="flex-1 w-full sm:w-auto"
              />
              <Button
                onClick={() => handleSearch(false)}
                disabled={loading}
                className="w-full sm:w-auto min-w-[120px] cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    {isAutoSearch ? "Searching..." : "Searching..."}
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </>
                )}
              </Button>
            </div>

            {error && <div className="text-red-500 text-sm">{error}</div>}

            {locationName && expertType && (
              <div className="text-sm text-gray-600">
                Searching near: {locationName}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="h-[450px] w-full border rounded-lg overflow-hidden bg-gray-100">
        {showMap ? (
          <iframe
            key={searchTerm}
            width="100%"
            height="100%"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps/embed/v1/search?key=${apiKey}&q=${encodeURIComponent(
              formatSearchQuery(searchTerm)
            )}`}
          />
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="text-gray-600 text-center px-4">
              {userLocation
                ? expertType
                  ? "Searching for nearby specialists..."
                  : "Enter a search term or wait for location-based results..."
                : "Please allow location access or enter a location to search for medical facilities."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
