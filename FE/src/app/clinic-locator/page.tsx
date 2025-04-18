import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { DisclaimerBanner, ClinicLocatorDemo } from "@/components";

export default function ClinicLocatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <DisclaimerBanner />

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Clinic Locator Demo</h1>
        <p className="text-muted-foreground mb-8">
          A demonstration of how a clinic locator might work in a real
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
                  portfolio. The map and clinic data are simulated.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Find Healthcare Facilities</CardTitle>
            <CardDescription>
              Enter a location to find nearby healthcare facilities (demo only).
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* <div className="flex space-x-2">
              <div className="flex-1">
                <Input
                  placeholder="Enter zip code or city"
                  defaultValue="San Francisco, CA"
                />
              </div>
              <Button>
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div> */}
            <ClinicLocatorDemo />
          </CardContent>
        </Card>

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
