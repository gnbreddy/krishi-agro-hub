import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, Users, MapPin, IndianRupee } from "lucide-react";
import { JobService } from "@/services/jobService";
import { Job } from "@/types/job";

const jobCategories = [
  {
    title: "Land Preparation",
    value: "Land Preparation",
  },
  {
    title: "Sowing Land Preparation",
    value: "Sowing Land Preparation",
  },
  {
    title: "Manuring and Fertilization",
    value: "Manuring and Fertilization",
  },
  {
    title: "Irrigation",
    value: "Irrigation",
  },
  {
    title: "Weeding and Pest Control",
    value: "Weeding and Pest Control",
  },
  {
    title: "Harvesting",
    value: "Harvesting",
  },
  {
    title: "Post-Harvest Management",
    value: "Post-Harvest Management",
  },
];

export default function Jobs() {
  const [activeTab, setActiveTab] = useState(jobCategories[0].value);
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/jobs");
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="space-y-6 p-4 max-w-7xl mx-auto">
      <div className="text-center py-4">
        <h1 className="text-3xl font-bold text-gradient-nature mb-2">
          Agricultural Jobs
        </h1>
        <p className="text-muted-foreground">
          Find work or hire skilled agricultural workers
        </p>
        <Button asChild>
          <a href="/post-job">Post a Job</a>
        </Button>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8">
          {jobCategories.map((category) => (
            <TabsTrigger key={category.value} value={category.value}>
              {category.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {jobCategories.map((category) => (
          <TabsContent key={category.value} value={category.value} className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{category.title} Jobs ({jobs.filter(job => job.category === category.value).length})</CardTitle>
              </CardHeader>
              <CardContent>
                {jobs.filter(job => job.category === category.value).length > 0 ? (
                  <div className="space-y-4">
                    {jobs.filter(job => job.category === category.value).map((job, index) => (
                      <Card key={index}>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Briefcase className="h-5 w-5" /> {job.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            
                              <div className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                <span>{job.company}</span>
                              </div>
                            
                            <div className="flex items-center gap-1">
                              <IndianRupee className="h-4 w-4" />
                              <span>{job.salary}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              <span>{job.location}</span>
                            </div>
                          </div>
                          <Button className="mt-4">Apply Now</Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Briefcase className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No jobs available in this category at the moment.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
