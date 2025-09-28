import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MapPin, Users, IndianRupee, Briefcase, Eye, Phone, Mail, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const jobTypes = [
  "Land Preparation",
  "Sowing",
  "Manuring and Fertilization",
  "Irrigation",
  "Weeding and Pest Control",
  "Harvesting",
  "Post-Harvest Management",
];

export default function Jobs() {
  const navigate = useNavigate();
  const [locationType, setLocationType] = useState<string>("current");
  const [villageAddress, setVillageAddress] = useState<string>("");
  const [landmark, setLandmark] = useState<string>("");
  const [jobType, setJobType] = useState<string>("");
  const [personsRequired, setPersonsRequired] = useState<string>("");
  const [payPerPerson, setPayPerPerson] = useState<string>("");
  const [farmSize, setFarmSize] = useState<string>("");
  const [workDescription, setWorkDescription] = useState<string>("");
  const [contactName, setContactName] = useState<string>("");
  const [contactPhone, setContactPhone] = useState<string>("");
  const [contactEmail, setContactEmail] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!jobType || !personsRequired || !payPerPerson || !farmSize || !contactName || !contactPhone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields including contact information.",
        variant: "destructive",
      });
      return;
    }

    if (locationType === "manual" && (!villageAddress || !landmark)) {
      toast({
        title: "Missing Location Information",
        description: "Please provide village address and landmark.",
        variant: "destructive",
      });
      return;
    }

    // Create job object
    const newJob = {
      id: Date.now().toString(),
      locationType,
      villageAddress: locationType === "manual" ? villageAddress : "",
      landmark: locationType === "manual" ? landmark : "",
      jobType,
      personsRequired: parseInt(personsRequired),
      payPerPerson: parseInt(payPerPerson),
      farmSize,
      workDescription,
      contactName,
      contactPhone,
      contactEmail,
      postedDate: new Date().toISOString(),
    };

    // Save to localStorage
    const existingJobs = JSON.parse(localStorage.getItem("postedJobs") || "[]");
    const updatedJobs = [...existingJobs, newJob];
    localStorage.setItem("postedJobs", JSON.stringify(updatedJobs));

    // Reset form
    setLocationType("current");
    setVillageAddress("");
    setLandmark("");
    setJobType("");
    setPersonsRequired("");
    setPayPerPerson("");
    setFarmSize("");
    setWorkDescription("");
    setContactName("");
    setContactPhone("");
    setContactEmail("");

    toast({
      title: "Job Posted Successfully!",
      description: "Your job request has been posted and is now visible to workers.",
    });
  };

  return (
    <div className="space-y-6 p-4 max-w-4xl mx-auto">
      <div className="flex justify-between items-center py-4">
        <div className="text-center flex-1">
          <h1 className="text-3xl font-bold text-gradient-nature mb-2">
            Post a Job Request
          </h1>
          <p className="text-muted-foreground">
            Find skilled agricultural workers for your farm
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate("/jobs-posted")}
          className="flex items-center gap-2"
        >
          <Eye className="h-4 w-4" />
          Get Posted Jobs
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Job Request Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Location Section */}
            <div className="space-y-4">
              <Label className="text-base font-semibold flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Location of Job
              </Label>
              <RadioGroup value={locationType} onValueChange={setLocationType}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="current" id="current" />
                  <Label htmlFor="current">Use Current Location</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="manual" id="manual" />
                  <Label htmlFor="manual">Enter Village Address</Label>
                </div>
              </RadioGroup>
              
              {locationType === "manual" && (
                <div className="space-y-3 ml-6">
                  <div>
                    <Label htmlFor="village">Village Address</Label>
                    <Input
                      id="village"
                      placeholder="Enter village name and address"
                      value={villageAddress}
                      onChange={(e) => setVillageAddress(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="landmark">Landmark to Stop At</Label>
                    <Input
                      id="landmark"
                      placeholder="Enter nearby landmark"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Job Type */}
            <div className="space-y-2">
              <Label htmlFor="jobType" className="text-base font-semibold">
                Job Type
              </Label>
              <Select value={jobType} onValueChange={setJobType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>
                <SelectContent>
                  {jobTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Number of Persons Required */}
            <div className="space-y-2">
              <Label htmlFor="persons" className="text-base font-semibold flex items-center gap-2">
                <Users className="h-4 w-4" />
                Number of Persons Required
              </Label>
              <Input
                id="persons"
                type="number"
                placeholder="Enter number of workers needed"
                value={personsRequired}
                onChange={(e) => setPersonsRequired(e.target.value)}
                min="1"
              />
            </div>

            {/* Pay Per Person */}
            <div className="space-y-2">
              <Label htmlFor="pay" className="text-base font-semibold flex items-center gap-2">
                <IndianRupee className="h-4 w-4" />
                Pay for Each Person (₹)
              </Label>
              <Input
                id="pay"
                type="number"
                placeholder="Enter amount in rupees"
                value={payPerPerson}
                onChange={(e) => setPayPerPerson(e.target.value)}
                min="0"
              />
            </div>

            {/* Farm Size and Description */}
            <div className="space-y-2">
              <Label htmlFor="farmSize" className="text-base font-semibold">
                Size of Farm
              </Label>
              <Input
                id="farmSize"
                placeholder="e.g., 2 acres, 5 hectares"
                value={farmSize}
                onChange={(e) => setFarmSize(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-base font-semibold">
                Other Description About the Work
              </Label>
              <Textarea
                id="description"
                placeholder="Provide additional details about the work, timing, requirements, etc."
                value={workDescription}
                onChange={(e) => setWorkDescription(e.target.value)}
                rows={4}
              />
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <Label className="text-base font-semibold">
                Contact Information
              </Label>
              
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="contactName" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Contact Name *
                  </Label>
                  <Input
                    id="contactName"
                    placeholder="Enter your full name"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactPhone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Phone Number *
                  </Label>
                  <Input
                    id="contactPhone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactEmail" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email Address (Optional)
                  </Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    placeholder="Enter your email address"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg">
              Post Job Request
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
