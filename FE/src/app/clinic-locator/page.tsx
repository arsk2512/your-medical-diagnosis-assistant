"use client";

import { Suspense } from "react";
import LocationWrapper from "@/components/common/LocationWrapper";

export default function ClinicLocatorPage() {

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Find Medical Facilities</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <LocationWrapper />
      </Suspense>
    </div>
  );
}
