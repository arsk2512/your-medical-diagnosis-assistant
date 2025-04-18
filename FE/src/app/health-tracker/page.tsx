import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, PillIcon as Pills, FileText } from "lucide-react";
import {
  DisclaimerBanner,
  HealthHistoryDemo,
  MedicationTrackerDemo,
} from "@/components";

export default function HealthTrackerPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <DisclaimerBanner />

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Health Tracker Demo</h1>
        <p className="text-muted-foreground mb-8">
          A demonstration of how a health tracking system might work in a real
          application.
        </p>

        <Card className="border-red-200 bg-red-50 mb-8">
          <CardHeader className="pb-2">
            <div className="flex items-start space-x-4">
              <AlertTriangle className="h-6 w-6 text-red-500 mt-1 flex-shrink-0" />
              <div>
                <CardTitle className="text-red-700">
                  Portfolio Demonstration Only
                </CardTitle>
                <CardDescription className="text-red-600 mt-1">
                  This is a non-functional demo showing UI/UX design for a
                  portfolio. No real data is stored.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Tabs defaultValue="history" className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="history">
              <FileText className="h-4 w-4 mr-2" />
              Health History
            </TabsTrigger>
            <TabsTrigger value="medications">
              <Pills className="h-4 w-4 mr-2" />
              Medications
            </TabsTrigger>
          </TabsList>
          <TabsContent value="history">
            <HealthHistoryDemo />
          </TabsContent>
          <TabsContent value="medications">
            <MedicationTrackerDemo />
          </TabsContent>
        </Tabs>

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
