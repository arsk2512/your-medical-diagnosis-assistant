"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertTriangle,
  Activity,
  Calendar,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { DisclaimerBanner } from "@/components";
import { SignIn, useUser } from "@clerk/nextjs";

export default function Home() {
  const { user } = useUser();

  if (!user)
    return (
      <div className="flex justify-center items-center container mx-auto">
        <SignIn />
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Health Information Assistant
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A portfolio demonstration project showcasing AI and healthcare
          information integration.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-2">
              <Activity className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Symptom Information</CardTitle>
            <CardDescription>
              Enter symptoms to receive educational information.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Explore how AI can provide general health information based on
              symptom descriptions.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/symptoms" className="w-full">
              <Button className="w-full cursor-pointer">
                Try It <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-2">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Health Tracker</CardTitle>
            <CardDescription>
              Demo of a health history management system.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              See how users could track health information in a secure,
              organized interface.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/health-tracker" className="w-full">
              <Button className="w-full">
                Explore <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-2">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Clinic Locator</CardTitle>
            <CardDescription>
              Find healthcare facilities nearby (demo).
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Technical demonstration of location services integration with
              healthcare data.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/clinic-locator" className="w-full">
              <Button className="w-full">
                View Demo <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      <div className="text-center text-sm text-muted-foreground">
        <p>
          © {new Date().getFullYear()} Portfolio Project | Not for actual
          medical use
        </p>
      </div>
    </div>
  );
}
