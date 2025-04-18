"use client";

import { useState } from "react";
import { AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DisclaimerBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-red-500 text-white p-4 mb-8 rounded-lg shadow-md">
      <div className="container mx-auto flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <AlertTriangle className="h-6 w-6 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h2 className="font-bold text-lg">DEMONSTRATION PROJECT ONLY</h2>
            <p className="text-sm md:text-base">
              This is a portfolio project demonstrating technical skills. It is
              NOT a real medical tool. The information provided is not reliable
              and should never be used for health decisions. Always consult
              qualified healthcare professionals for medical advice.
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-red-600 -mt-1 -mr-2"
          onClick={() => setIsVisible(false)}
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </Button>
      </div>
    </div>
  );
}
