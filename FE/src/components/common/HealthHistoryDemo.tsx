import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function HealthHistoryDemo() {
  // Mock data for demonstration purposes
  const healthEvents = [
    {
      id: 1,
      date: "2023-10-15",
      type: "Check-up",
      provider: "Dr. Smith",
      notes: "Annual physical examination. All vitals normal.",
      followUp: "Next annual check-up in 12 months",
    },
    {
      id: 2,
      date: "2023-08-22",
      type: "Vaccination",
      provider: "Community Clinic",
      notes: "Seasonal flu vaccine administered.",
      followUp: null,
    },
    {
      id: 3,
      date: "2023-06-10",
      type: "Specialist",
      provider: "Dr. Johnson",
      notes:
        "Consultation for recurring headaches. Recommended lifestyle changes and stress management.",
      followUp: "Follow-up in 3 months if symptoms persist",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Health History</h2>
        <Button>
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Entry
        </Button>
      </div>

      <div className="space-y-4">
        {healthEvents.map((event) => (
          <Card key={event.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{event.type}</CardTitle>
                  <CardDescription>
                    {new Date(event.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </CardDescription>
                </div>
                <Badge
                  variant={
                    event.type === "Check-up"
                      ? "default"
                      : event.type === "Vaccination"
                      ? "secondary"
                      : "outline"
                  }
                >
                  {event.type}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <span className="text-sm font-medium">Provider:</span>
                  <span className="text-sm ml-2">{event.provider}</span>
                </div>
                <div>
                  <span className="text-sm font-medium">Notes:</span>
                  <p className="text-sm mt-1">{event.notes}</p>
                </div>
                {event.followUp && (
                  <div>
                    <span className="text-sm font-medium">Follow-up:</span>
                    <p className="text-sm mt-1">{event.followUp}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center pt-4">
        <p className="text-sm text-muted-foreground italic">
          This is a demonstration with mock data. No real health information is
          stored.
        </p>
      </div>
    </div>
  );
}
