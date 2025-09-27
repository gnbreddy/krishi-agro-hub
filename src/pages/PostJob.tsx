import { useState } from "react";
import { Button } from "@/components/ui/button";
import { JobService } from "@/services/jobService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PostJob() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const jobData = {
        title,
        description,
        company,
        location,
        salary: Number(salary),
      };
      await JobService.postJob(jobData);
      // Reset form fields
      setTitle("");
      setDescription("");
      setCompany("");
        setLocation("");
      setSalary("");
      alert("Job posted successfully!");
    } catch (error) {
      console.error("Error posting job:", error);
      alert("Error posting job. Please try again.");
    }
  };

  return (
    <div className="space-y-6 p-4 max-w-7xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Post a Job</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                id="title"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                Company
              </label>
              <input
                type="text"
                id="company"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                id="location"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="salary" className="block text-sm font-medium text-gray-700">
                Salary
              </label>
              <input
                type="number"
                id="salary"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              />
            </div>
            <Button type="submit" onClick={handleSubmit}>
              Post Job
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}