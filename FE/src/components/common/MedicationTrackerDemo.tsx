'use client';
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define the schema for medication
const medicationSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Medication name is required"),
  dosage: z.string().optional(),
  frequency: z.string().optional(),
  timeOfDay: z.string().optional(),
  refillDate: z.string().optional(),
  adherence: z.number().min(0).max(100).optional(),
  active: z.boolean().optional(),
});

type Medication = z.infer<typeof medicationSchema>;

export default function MedicationTrackerDemo() {
  const [medications, setMedications] = useState<Medication[]>([
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
  ]);

  const { register, handleSubmit, reset, setValue, watch } = useForm<Medication>({
    resolver: zodResolver(medicationSchema),
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onSubmit = (data: Medication) => {
    const newMedication = { ...data, id: medications.length + 1, active: true };
    setMedications((prev) => [...prev, newMedication]);
    reset();
    setIsDialogOpen(false); // Close the modal after saving
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Medication Tracker</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsDialogOpen(true)}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Medication
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Medication</DialogTitle>
            </DialogHeader>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <Input
                  type="text"
                  {...register("name")}
                  placeholder="Enter medication name"
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Dosage</label>
                <Input
                  type="text"
                  {...register("dosage")}
                  placeholder="Enter dosage"
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Frequency</label>
                <Select
                  onValueChange={(value: string) => setValue("frequency", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Once daily">Once daily</SelectItem>
                    <SelectItem value="Twice daily">Twice daily</SelectItem>
                    <SelectItem value="Weekly">Weekly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Time of Day</label>
                <Select
                  onValueChange={(value: string) => setValue("timeOfDay", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select time of day" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Morning">Morning</SelectItem>
                    <SelectItem value="Afternoon">Afternoon</SelectItem>
                    <SelectItem value="Evening">Evening</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Refill Date</label>
                <Input
                  type="date"
                  {...register("refillDate")}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Adherence (%)</label>
                <div className="flex items-center space-x-4">
                  <Slider
                    defaultValue={[watch("adherence") || 0]}
                    max={100}
                    step={1}
                    onValueChange={(value: number[]) => setValue("adherence", value[0])}
                    className="w-full"
                  />
                  <span className="text-sm font-medium">{watch("adherence") || 0}%</span>
                </div>
              </div>
              <Button type="submit" className="w-full">
                Save
              </Button>
            </form>
          </DialogContent>
        </Dialog>
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