import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { DisclaimerBanner, SymptomForm } from "@/components";

export default function SymptomsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <DisclaimerBanner />

      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Symptom Information Tool</h1>
        <p className="text-muted-foreground mb-8">
          This is a technical demonstration of how AI could provide general
          health information.
        </p>

        <Card className="border-red-200 bg-red-50 mb-8">
          <CardHeader className="pb-2">
            <div className="flex items-start space-x-4">
              <AlertTriangle className="h-6 w-6 text-red-500 mt-1 flex-shrink-0" />
              <div>
                <CardTitle className="text-red-700">
                  Educational Demonstration Only
                </CardTitle>
                <CardDescription className="text-red-600 mt-1">
                  This tool does not provide medical diagnoses. It demonstrates
                  AI capabilities for a portfolio project.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-red-600">
              Never rely on this information for health decisions. Always
              consult healthcare professionals.
            </p>
          </CardContent>
        </Card>

        <SymptomForm />

        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Portfolio Project | Not for actual
            medical use
          </p>
        </div>
      </div>
    </div>
  );
}
