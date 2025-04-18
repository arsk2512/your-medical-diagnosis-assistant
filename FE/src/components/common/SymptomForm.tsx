"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, Loader2, MapPin } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function SymptomForm() {
  const router = useRouter();
  const [symptoms, setSymptoms] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<null | {
    generalInfo: string;
    possibleCauses: string[];
    selfCare: string[];
    whenToSeek: string;
    recommendedExpert: {
      type: string;
      description: string;
    };
  }>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!symptoms.trim()) return;

    setIsLoading(true);

    try {
      const response = await fetch("/api/get-symptoms-cure", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: symptoms }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch data");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFindExpert = () => {
    if (result?.recommendedExpert) {
      router.push(`/clinic-locator?expert=${encodeURIComponent(result.recommendedExpert.type)}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Describe Symptoms</CardTitle>
            <CardDescription>
              Enter a description of what you&apos;re experiencing for this
              demonstration.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Example: I've had a headache and fatigue for the past two days..."
              className="min-h-[120px]"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
            />
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full"
              disabled={!symptoms.trim() || isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Get Information"
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>

      {result && (
        <div className="mt-8 space-y-6">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Demonstration Only</AlertTitle>
            <AlertDescription>
              The following information is simulated for this portfolio project
              and is not based on real medical analysis.
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle>General Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{result.generalInfo}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Educational Information</CardTitle>
              <CardDescription>
                Some general conditions that can sometimes be associated with
                these types of symptoms:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-1">
                {result.possibleCauses.map((cause, index) => (
                  <li key={index}>{cause}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>General Wellness Information</CardTitle>
              <CardDescription>
                General wellness practices that are often recommended:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-1">
                {result.selfCare.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-amber-50">
            <CardHeader>
              <CardTitle className="text-amber-800">
                When to Consult a Professional
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-amber-700">{result.whenToSeek}</p>
            </CardContent>
          </Card>

          {result.recommendedExpert && (
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-blue-800">Recommended Expert</CardTitle>
                <CardDescription className="text-blue-700">
                  {result.recommendedExpert.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold text-blue-900">
                    {result.recommendedExpert.type}
                  </p>
                  <Button
                    onClick={handleFindExpert}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <MapPin className="mr-2 h-4 w-4" />
                    Find {result.recommendedExpert.type} Near Me
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
