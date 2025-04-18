"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ClinicLocatorDemo from "@/components/common/ClinicLocatorDemo";

export default function ClinicLocatorPage() {
  const searchParams = useSearchParams();
  const expert = searchParams.get("expert");
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          setLocationError("Unable to retrieve your location. Please enable location services.");
          console.error("Error getting location:", error);
        }
      );
    } else {
      setLocationError("Geolocation is not supported by your browser.");
    }
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Find Medical Facilities</h1>
      {locationError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {locationError}
        </div>
      )}
      <ClinicLocatorDemo 
        userLocation={userLocation} 
        expertType={expert || undefined} 
      />
    </div>
  );
}
