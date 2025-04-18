import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PillIcon as Pills, FileText } from "lucide-react";
import { HealthHistoryDemo, MedicationTrackerDemo } from "@/components";

export default function HealthTrackerPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Health Tracker Demo</h1>
        <p className="text-muted-foreground mb-8">
          A demonstration of how a health tracking system might work in a real
          application.
        </p>

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
