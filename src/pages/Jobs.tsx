import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MapPin, Users, IndianRupee, FileText, Phone, Mail, Briefcase, Calendar, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const jobTypes = [
  "Land Preparation",
  "Sowing",
  "Manuring and Fertilization",
  "Irrigation",
  "Weeding and Pest Control",
  "Harvesting",
  "Post-Harvest Management"
];

export default function Jobs() {
  const [formData, setFormData] = useState({
    locationType: "current",
    villageAddress: "",
    landmark: "",
    jobType: "",
    numberOfPersons: "",
    payPerPerson: "",
    farmSize: "",
    workDescription: "",
    phoneNumber: "",
    email: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [postedJobs, setPostedJobs] = useState<any[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPostedJobs();
  }, []);

  const fetchPostedJobs = async () => {
    try {
      setLoadingJobs(true);
      const response = await fetch("http://localhost:5000/api/jobs");
      if (response.ok) {
        const data = await response.json();
        setPostedJobs(data.slice(0, 5)); // Show only latest 5 jobs
      } else {
        throw new Error("Failed to fetch jobs");
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      toast({
        title: "Error",
        description: "Failed to load posted jobs. Please check if backend server is running.",
        variant: "destructive",
      });
    } finally {
      setLoadingJobs(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.jobType || !formData.numberOfPersons || !formData.payPerPerson || 
        !formData.phoneNumber || !formData.farmSize) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (formData.locationType === "manual" && (!formData.villageAddress || !formData.landmark)) {
      toast({
        title: "Location Required",
        description: "Please provide village address and landmark.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const jobData = {
        title: `${formData.jobType} Job`,
        category: formData.jobType,
        location: formData.locationType === "current" ? "Current Location" : `${formData.villageAddress}, ${formData.landmark}`,
        salary: `₹${formData.payPerPerson} per person`,
        company: `${formData.numberOfPersons} persons required`,
        description: formData.workDescription,
        farmSize: formData.farmSize,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        postedDate: new Date().toISOString()
      };

      const response = await fetch("http://localhost:5000/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobData),
      });

      if (response.ok) {
        toast({
          title: "Job Posted Successfully",
          description: "Your job request has been posted and is now visible to workers.",
        });
        
        // Reset form
        setFormData({
          locationType: "current",
          villageAddress: "",
          landmark: "",
          jobType: "",
          numberOfPersons: "",
          payPerPerson: "",
          farmSize: "",
          workDescription: "",
          phoneNumber: "",
          email: ""
        });

        // Refresh posted jobs
        fetchPostedJobs();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to post job");
      }
    } catch (error) {
      console.error("Error posting job:", error);
      toast({
        title: "Error",
        description: `Failed to post job: ${error.message}. Please check if backend server is running.`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getJobTypeColor = (jobType: string) => {
    const colors: { [key: string]: string } = {
      "Land Preparation": "bg-orange-100 text-orange-700",
      "Sowing": "bg-green-100 text-green-700",
      "Manuring and Fertilization": "bg-yellow-100 text-yellow-700",
      "Irrigation": "bg-blue-100 text-blue-700",
      "Weeding and Pest Control": "bg-red-100 text-red-700",
      "Harvesting": "bg-purple-100 text-purple-700",
      "Post-Harvest Management": "bg-indigo-100 text-indigo-700"
    };
    return colors[jobType] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="space-y-6 p-4 max-w-7xl mx-auto">
      <div className="text-center py-4">
        <h1 className="text-3xl font-bold text-green-600 mb-2">
          Post Job Request
        </h1>
        <p className="text-gray-600">
          Post your agricultural job requirements and find skilled workers
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Half - Job Posting Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Job Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Location Section */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">Location of Job</Label>
                <RadioGroup
                  value={formData.locationType}
                  onValueChange={(value) => handleInputChange("locationType", value)}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="current" id="current" />
                    <Label htmlFor="current" className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Use Current Location
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="manual" id="manual" />
                    <Label htmlFor="manual" className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Enter Village Address
                    </Label>
                  </div>
                </RadioGroup>

                {formData.locationType === "manual" && (
                  <div className="space-y-3 pl-6">
                    <div>
                      <Label htmlFor="villageAddress">Village Address *</Label>
                      <Input
                        id="villageAddress"
                        placeholder="Enter village name and area"
                        value={formData.villageAddress}
                        onChange={(e) => handleInputChange("villageAddress", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="landmark">Landmark to Stop At *</Label>
                      <Input
                        id="landmark"
                        placeholder="e.g., Near temple, Bus stop, etc."
                        value={formData.landmark}
                        onChange={(e) => handleInputChange("landmark", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Job Type */}
              <div>
                <Label htmlFor="jobType" className="text-base font-semibold">Job Type *</Label>
                <Select value={formData.jobType} onValueChange={(value) => handleInputChange("jobType", value)}>
                  <SelectTrigger className="mt-1">
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

              {/* Number of Persons and Pay */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="numberOfPersons" className="text-base font-semibold">Number of Persons Required *</Label>
                  <div className="relative mt-1">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="numberOfPersons"
                      type="number"
                      placeholder="Enter number"
                      value={formData.numberOfPersons}
                      onChange={(e) => handleInputChange("numberOfPersons", e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="payPerPerson" className="text-base font-semibold">Pay for Each Person (₹) *</Label>
                  <div className="relative mt-1">
                    <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="payPerPerson"
                      type="number"
                      placeholder="Enter amount"
                      value={formData.payPerPerson}
                      onChange={(e) => handleInputChange("payPerPerson", e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              {/* Farm Size and Description */}
              <div>
                <Label htmlFor="farmSize" className="text-base font-semibold">Size of Farm *</Label>
                <Input
                  id="farmSize"
                  placeholder="e.g., 2 acres, 5 hectares"
                  value={formData.farmSize}
                  onChange={(e) => handleInputChange("farmSize", e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="workDescription" className="text-base font-semibold">Work Description</Label>
                <Textarea
                  id="workDescription"
                  placeholder="Describe the work details, requirements, and any special instructions..."
                  value={formData.workDescription}
                  onChange={(e) => handleInputChange("workDescription", e.target.value)}
                  className="mt-1"
                  rows={4}
                />
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">Contact Information</Label>
                <div>
                  <Label htmlFor="phoneNumber" className="text-sm">Phone Number *</Label>
                  <div className="relative mt-1">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="phoneNumber"
                      type="tel"
                      placeholder="Enter phone number"
                      value={formData.phoneNumber}
                      onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm">Email Address (Optional)</Label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter email address"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Posting Job..." : "Post Job Request"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Right Half - Posted Jobs */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Posted Jobs
              </CardTitle>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={fetchPostedJobs}
                disabled={loadingJobs}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${loadingJobs ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {loadingJobs ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading jobs...</p>
              </div>
            ) : postedJobs.length > 0 ? (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {postedJobs.map((job, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-sm">{job.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs ${getJobTypeColor(job.category)}`}>
                        {job.category}
                      </span>
                    </div>
                    
                    <div className="space-y-1 text-xs text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span>{job.company}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <IndianRupee className="h-3 w-3" />
                        <span className="font-semibold">{job.salary}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(job.postedDate)}</span>
                      </div>
                    </div>

                    {job.description && (
                      <p className="text-xs text-gray-700 mt-2 line-clamp-2">
                        {job.description}
                      </p>
                    )}

                    <div className="flex gap-2 mt-3">
                      <Button size="sm" className="text-xs bg-green-600 hover:bg-green-700">
                        Apply
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs">
                        Contact
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-sm">No jobs posted yet</p>
                <p className="text-xs">Post a job to see it here</p>
              </div>
            )}

            <div className="pt-4 border-t">
              <Button 
                onClick={() => navigate("/jobs-posted")}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                View All Posted Jobs
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}