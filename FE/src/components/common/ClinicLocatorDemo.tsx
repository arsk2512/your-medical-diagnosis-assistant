"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2 } from "lucide-react";

export default function ClinicLocatorDemo() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [loading, setLoading] = useState(false);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  // Ensure the query is related to healthcare
  const formatSearchQuery = (query: string) => {
    const keywords = ["hospital", "clinic", "health center"];
    const lowerQuery = query.toLowerCase();

    // Check if query already contains healthcare-related words
    const containsKeyword = keywords.some((word) => lowerQuery.includes(word));

    return containsKeyword ? query : `${query} hospitals & clinics`;
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      alert("Please enter a location.");
      return;
    }

    setLoading(true);
    setShowMap(false); // Reset map before update

    setTimeout(() => {
      setShowMap(true);
      setLoading(false);
    }, 500); // Small delay for better UX
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 p-4">
      {/* Search Input */}
      <div className="flex flex-col sm:flex-row gap-3 items-center">
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search hospitals, clinics, health centers..."
          className="flex-1 w-full sm:w-auto"
        />
        <Button
          onClick={handleSearch}
          disabled={loading}
          className="w-full sm:w-auto min-w-[120px]"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Search className="h-4 w-4 mr-2" />
          )}
          {loading ? "Searching..." : "Search"}
        </Button>
      </div>

      {/* Display Google Map */}
      <div className="h-[450px] w-full border rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
        {showMap ? (
          <iframe
            key={searchTerm} // Forces re-render when search term changes
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
          <p className="text-gray-600 text-center px-4">
            Enter a location and search for hospitals, clinics, or health
            centers.
          </p>
        )}
      </div>
    </div>
  );
}
