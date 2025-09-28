import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, IndianRupee, Phone, Mail, Calendar, Filter, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const jobTypes = [
  "Land Preparation",
  "Sowing",
  "Manuring and Fertilization",
  "Irrigation",
  "Weeding and Pest Control",
  "Harvesting",
  "Post-Harvest Management"
];

const payRanges = [
  { label: "Under ₹500", value: "0-500" },
  { label: "₹500 - ₹1000", value: "500-1000" },
  { label: "₹1000 - ₹2000", value: "1000-2000" },
  { label: "₹2000 - ₹5000", value: "2000-5000" },
  { label: "Above ₹5000", value: "5000+" }
];

const farmSizes = [
  { label: "Small (Under 1 acre)", value: "small" },
  { label: "Medium (1-5 acres)", value: "medium" },
  { label: "Large (5-10 acres)", value: "large" },
  { label: "Very Large (Above 10 acres)", value: "xlarge" }
];

export default function JobsPosted() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    search: "",
    jobType: "",
    payRange: "",
    farmSize: "",
    location: ""
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [jobs, filters]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/jobs");
      if (response.ok) {
        const data = await response.json();
        setJobs(data);
      } else {
        throw new Error("Failed to fetch jobs");
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      toast({
        title: "Error",
        description: "Failed to load jobs. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...jobs];

    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(searchTerm) ||
        job.description?.toLowerCase().includes(searchTerm) ||
        job.location.toLowerCase().includes(searchTerm)
      );
    }

    // Job type filter
    if (filters.jobType) {
      filtered = filtered.filter(job => job.category === filters.jobType);
    }

    // Pay range filter
    if (filters.payRange) {
      filtered = filtered.filter(job => {
        const payMatch = job.salary.match(/₹(\d+)/);
        if (!payMatch) return false;
        const pay = parseInt(payMatch[1]);
        const [min, max] = filters.payRange.split('-').map(Number);
        if (filters.payRange === "5000+") {
          return pay >= 5000;
        }
        return pay >= min && pay <= max;
      });
    }

    // Farm size filter
    if (filters.farmSize) {
      filtered = filtered.filter(job => {
        const farmSize = job.farmSize?.toLowerCase() || "";
        switch (filters.farmSize) {
          case "small":
            return farmSize.includes("under") || farmSize.includes("small") || farmSize.includes("0.5") || farmSize.includes("1 acre");
          case "medium":
            return farmSize.includes("1") || farmSize.includes("2") || farmSize.includes("3") || farmSize.includes("4") || farmSize.includes("5");
          case "large":
            return farmSize.includes("5") || farmSize.includes("6") || farmSize.includes("7") || farmSize.includes("8") || farmSize.includes("9") || farmSize.includes("10");
          case "xlarge":
            return farmSize.includes("above") || farmSize.includes("10") || farmSize.includes("large");
          default:
            return true;
        }
      });
    }

    // Location filter
    if (filters.location) {
      filtered = filtered.filter(job => 
        job.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    setFilteredJobs(filtered);
  };

  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      jobType: "",
      payRange: "",
      farmSize: "",
      location: ""
    });
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

  if (loading) {
    return (
      <div className="space-y-6 p-4 max-w-7xl mx-auto">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading jobs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 max-w-7xl mx-auto">
      <div className="text-center py-4">
        <h1 className="text-3xl font-bold text-green-600 mb-2">
          Posted Jobs
        </h1>
        <p className="text-gray-600">
          Browse and apply for agricultural job opportunities
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div>
              <Label htmlFor="search">Search</Label>
              <div className="relative mt-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Search jobs..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange("search", e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Job Type */}
            <div>
              <Label htmlFor="jobType">Job Type</Label>
              <Select value={filters.jobType} onValueChange={(value) => handleFilterChange("jobType", value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="All types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All types</SelectItem>
                  {jobTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Pay Range */}
            <div>
              <Label htmlFor="payRange">Pay Range</Label>
              <Select value={filters.payRange} onValueChange={(value) => handleFilterChange("payRange", value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="All ranges" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All ranges</SelectItem>
                  {payRanges.map((range) => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Farm Size */}
            <div>
              <Label htmlFor="farmSize">Farm Size</Label>
              <Select value={filters.farmSize} onValueChange={(value) => handleFilterChange("farmSize", value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="All sizes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All sizes</SelectItem>
                  {farmSizes.map((size) => (
                    <SelectItem key={size.value} value={size.value}>
                      {size.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Location */}
            <div>
              <Label htmlFor="location">Location</Label>
              <div className="relative mt-1">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="location"
                  placeholder="Enter location"
                  value={filters.location}
                  onChange={(e) => handleFilterChange("location", e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-gray-600">
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
          filteredJobs.map((job, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{job.title}</CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className={getJobTypeColor(job.category)}>
                        {job.category}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        Posted {formatDate(job.postedDate || new Date().toISOString())}
                      </span>
                    </div>
                  </div>
                  <Button className="bg-green-600 hover:bg-green-700">
                    Apply Now
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{job.company}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IndianRupee className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-semibold">{job.salary}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{job.farmSize || "Not specified"}</span>
                  </div>
                </div>

                {job.description && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-700">{job.description}</p>
                  </div>
                )}

                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  {job.phoneNumber && (
                    <div className="flex items-center gap-1">
                      <Phone className="h-4 w-4" />
                      <span>{job.phoneNumber}</span>
                    </div>
                  )}
                  {job.email && (
                    <div className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      <span>{job.email}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="text-center py-8">
              <div className="text-gray-500">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-semibold mb-2">No jobs found</p>
                <p>Try adjusting your filters or check back later for new job postings.</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
