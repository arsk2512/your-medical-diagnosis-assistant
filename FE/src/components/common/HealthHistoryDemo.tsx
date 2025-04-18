"use client";
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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
const healthEventSchema = z.object({
  id: z.number().optional(),
  date: z.string().optional(),
  type: z.string().optional(),
  provider: z.string().optional(),
  notes: z.string().optional(),
  followUp: z.string().nullable().optional(),
});

type HealthEvent = z.infer<typeof healthEventSchema>;

export default function HealthHistoryDemo() {
  const [healthEvents, setHealthEvents] = useState<HealthEvent[]>([
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
  ]);

  const { register, handleSubmit, reset, watch, setValue } = useForm<HealthEvent>({
    resolver: zodResolver(healthEventSchema),
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onSubmit = (data: HealthEvent) => {
    const newEvent = { ...data, id: healthEvents.length + 1 };
    setHealthEvents((prev) => [...prev, newEvent]);
    reset();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Health History</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsDialogOpen(true)}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Entry
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Health Event</DialogTitle>
            </DialogHeader>
            <form
              onSubmit={handleSubmit((data) => {
                onSubmit(data);
                setIsDialogOpen(false); // Close the modal after saving
              })}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <Input type="date" {...register("date")} className="w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Type</label>
                <Select
                  value={watch("type") || ""}
                  onValueChange={(value: string) => setValue("type", value)}
                >
                  <SelectTrigger className="w-full">
                    <span>{watch("type") || "Select Type"}</span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Check-up">Check-up</SelectItem>
                    <SelectItem value="Vaccination">Vaccination</SelectItem>
                    <SelectItem value="Specialist">Specialist</SelectItem>
                    <SelectItem value="Emergency">Emergency</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Provider
                </label>
                <Input
                  type="text"
                  {...register("provider")}
                  placeholder="Enter provider name"
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Notes</label>
                <Textarea
                  {...register("notes")}
                  placeholder="Enter notes"
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Follow-up
                </label>
                <Textarea
                  {...register("followUp")}
                  placeholder="Enter follow-up details"
                  className="w-full"
                />
              </div>
              <Button type="submit" className="w-full">
                Save
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {healthEvents.map((event) => (
          <Card key={event.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{event.type}</CardTitle>
                  <CardDescription>
                    {event.date
                      ? new Date(event.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "No date provided"}
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
                  {event.type || "Unknown"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {event.provider && (
                  <div>
                    <span className="text-sm font-medium">Provider:</span>
                    <span className="text-sm ml-2">{event.provider}</span>
                  </div>
                )}
                {event.notes && (
                  <div>
                    <span className="text-sm font-medium">Notes:</span>
                    <p className="text-sm mt-1">{event.notes}</p>
                  </div>
                )}
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
