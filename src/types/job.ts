export interface Job {
  id: string;
  title: string;
  description: string;
  company: string;
  location: string;
  salary: number;
  payRate: {
    amount: number;
    type: 'hourly' | 'daily' | 'weekly' | 'project';
    currency: string;
  };
  coordinates?: {
    lat: number;
    lng: number;
  };
  category: string;
}

export interface JobApplication {
  id: string;
  jobId: string;
  applicantName: string;
  applicantPhone: string;
  applicantEmail?: string;
  coverMessage: string;
  experience: string;
  availability: {
    startDate: Date;
    endDate?: Date;
  };
  appliedAt: Date;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
}

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  email?: string;
  userType: 'employer' | 'job-seeker' | 'both';
  location?: string;
}

export type JobCategory = Job['category'];
export type JobType = Job['title'];
export type PayType = Job['payRate']['type'];
export type ApplicationStatus = JobApplication['status'];