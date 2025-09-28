import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, IndianRupee, Briefcase, Filter, ArrowLeft, Phone, Mail, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PostedJob {
  id: string;
  locationType: string;
  villageAddress?: string;
  landmark?: string;
  jobType: string;
  personsRequired: number;
  payPerPerson: number;
  farmSize: string;
  workDescription: string;
  contactName: string;
  contactPhone: string;
  contactEmail?: string;
  postedDate: string;
}

const jobTypes = [
  "Land Preparation",
  "Sowing",
  "Manuring and Fertilization",
  "Irrigation",
  "Weeding and Pest Control",
  "Harvesting",
  "Post-Harvest Management",
];

export default function JobsPosted() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<PostedJob[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<PostedJob[]>([]);
  
  // Filter states
  const [filterJobType, setFilterJobType] = useState<string>("all");
  const [filterMinPay, setFilterMinPay] = useState<string>("");
  const [filterMaxPay, setFilterMaxPay] = useState<string>("");
  const [filterFarmSize, setFilterFarmSize] = useState<string>("");

  useEffect(() => {
    // Load jobs from localStorage
    const storedJobs = localStorage.getItem("postedJobs");
    if (storedJobs) {
      const parsedJobs = JSON.parse(storedJobs);
      setJobs(parsedJobs);
      setFilteredJobs(parsedJobs);
    }
  }, []);

  useEffect(() => {
    // Apply filters
    let filtered = jobs;

    if (filterJobType !== "all") {
      filtered = filtered.filter(job => job.jobType === filterJobType);
    }

    if (filterMinPay) {
      filtered = filtered.filter(job => job.payPerPerson >= parseInt(filterMinPay));
    }

    if (filterMaxPay) {
      filtered = filtered.filter(job => job.payPerPerson <= parseInt(filterMaxPay));
    }

    if (filterFarmSize) {
      filtered = filtered.filter(job => 
        job.farmSize.toLowerCase().includes(filterFarmSize.toLowerCase())
      );
    }

    setFilteredJobs(filtered);
  }, [jobs, filterJobType, filterMinPay, filterMaxPay, filterFarmSize]);

  const clearFilters = () => {
    setFilterJobType("all");
    setFilterMinPay("");
    setFilterMaxPay("");
    setFilterFarmSize("");
  };

  return (
    <div className="space-y-6 p-4 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Button
            variant="ghost"
            onClick={() => navigate("/jobs")}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Post Job
          </Button>
          <h1 className="text-3xl font-bold text-gradient-nature mb-2">
            Posted Jobs
          </h1>
          <p className="text-muted-foreground">
            Browse available agricultural job opportunities
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter Jobs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="jobTypeFilter">Job Type</Label>
              <Select value={filterJobType} onValueChange={setFilterJobType}>
                <SelectTrigger>
                  <SelectValue placeholder="All job types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Job Types</SelectItem>
                  {jobTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="minPay">Min Pay (₹)</Label>
              <Input
                id="minPay"
                type="number"
                placeholder="Minimum pay"
                value={filterMinPay}
                onChange={(e) => setFilterMinPay(e.target.value)}
                min="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxPay">Max Pay (₹)</Label>
              <Input
                id="maxPay"
                type="number"
                placeholder="Maximum pay"
                value={filterMaxPay}
                onChange={(e) => setFilterMaxPay(e.target.value)}
                min="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="farmSizeFilter">Farm Size</Label>
              <Input
                id="farmSizeFilter"
                placeholder="e.g., acres, hectares"
                value={filterFarmSize}
                onChange={(e) => setFilterFarmSize(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-muted-foreground">
              Showing {filteredJobs.length} of {jobs.length} jobs
            </p>
            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Jobs List */}
      <div className="space-y-4">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <Card key={job.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    {job.jobType}
                  </CardTitle>
                  <Badge variant="secondary">
                    Posted: {new Date(job.postedDate).toLocaleDateString()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Location</p>
                      <p className="text-sm text-muted-foreground">
                        {job.locationType === "current" 
                          ? "Current Location" 
                          : `${job.villageAddress}${job.landmark ? ` (${job.landmark})` : ""}`
                        }
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Workers Needed</p>
                      <p className="text-sm text-muted-foreground">{job.personsRequired} persons</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <IndianRupee className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Pay per Person</p>
                      <p className="text-sm text-muted-foreground">₹{job.payPerPerson}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Farm Size</p>
                      <p className="text-sm text-muted-foreground">{job.farmSize}</p>
                    </div>
                  </div>
                </div>

                {job.workDescription && (
                  <div>
                    <p className="text-sm font-medium mb-1">Work Description</p>
                    <p className="text-sm text-muted-foreground">{job.workDescription}</p>
                  </div>
                )}

                {/* Contact Information */}
                <div className="border-t pt-4">
                  <p className="text-sm font-medium mb-2">Contact Information</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Contact Person</p>
                        <p className="text-sm text-muted-foreground">{job.contactName}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Phone</p>
                        <p className="text-sm text-muted-foreground">
                          <a href={`tel:${job.contactPhone}`} className="hover:underline">
                            {job.contactPhone}
                          </a>
                        </p>
                      </div>
                    </div>

                    {job.contactEmail && (
                      <div className="flex items-center gap-2 md:col-span-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Email</p>
                          <p className="text-sm text-muted-foreground">
                            <a href={`mailto:${job.contactEmail}`} className="hover:underline">
                              {job.contactEmail}
                            </a>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1">Apply for Job</Button>
                  <Button variant="outline" asChild>
                    <a href={`tel:${job.contactPhone}`}>Call Now</a>
                  </Button>
                  {job.contactEmail && (
                    <Button variant="outline" asChild>
                      <a href={`mailto:${job.contactEmail}`}>Send Email</a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <Briefcase className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No Jobs Found</h3>
              <p className="text-muted-foreground mb-4">
                {jobs.length === 0 
                  ? "No jobs have been posted yet." 
                  : "No jobs match your current filters."
                }
              </p>
              {jobs.length > 0 && (
                <Button variant="outline" onClick={clearFilters}>
                  Clear Filters
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}