import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlusCircle, Clock, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function MedicationTrackerDemo() {
  // Mock data for demonstration purposes
  const medications = [
    {
      id: 1,
      name: "Vitamin D",
      dosage: "1000 IU",
      frequency: "Once daily",
      timeOfDay: "Morning with food",
      refillDate: "2023-12-15",
      adherence: 92,
      active: true,
    },
    {
      id: 2,
      name: "Multivitamin",
      dosage: "1 tablet",
      frequency: "Once daily",
      timeOfDay: "Morning with food",
      refillDate: "2023-11-30",
      adherence: 85,
      active: true,
    },
    {
      id: 3,
      name: "Allergy Medication",
      dosage: "10mg",
      frequency: "Once daily",
      timeOfDay: "Evening",
      refillDate: "2023-12-05",
      adherence: 78,
      active: true,
    },
    {
      id: 4,
      name: "Antibiotic Course",
      dosage: "500mg",
      frequency: "Twice daily",
      timeOfDay: "Morning and evening with food",
      refillDate: null,
      adherence: 100,
      active: false,
      endDate: "2023-09-15",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Medication Tracker</h2>
        <Button>
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Medication
        </Button>
      </div>

      <div className="space-y-4">
        {medications.map((med) => (
          <Card key={med.id} className={!med.active ? "opacity-70" : undefined}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{med.name}</CardTitle>
                  <CardDescription>
                    {med.dosage} - {med.frequency}
                  </CardDescription>
                </div>
                <Badge variant={med.active ? "default" : "outline"}>
                  {med.active ? "Active" : "Completed"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">{med.timeOfDay}</span>
                </div>

                {med.active && med.refillDate && (
                  <div className="flex items-center">
                    <AlertCircle className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">
                      Refill by:{" "}
                      {new Date(med.refillDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                )}

                {!med.active && med.endDate && (
                  <div className="flex items-center">
                    <AlertCircle className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">
                      Completed on:{" "}
                      {new Date(med.endDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                )}

                {med.active && (
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Adherence</span>
                      <span className="text-sm">{med.adherence}%</span>
                    </div>
                    <Progress value={med.adherence} className="h-2" />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center pt-4">
        <p className="text-sm text-muted-foreground italic">
          This is a demonstration with mock data. No real medication information
          is stored.
        </p>
      </div>
    </div>
  );
}
