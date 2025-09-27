import { Job, JobApplication } from '@/types/job';

// Sample job data for cultivation tasks
const sampleJobs: Job[] = [
  {
    id: '1',
    title: 'Land Preparation - Plowing and Harrowing',
    location: {
      address: 'Village Rampur, District Meerut, UP',
      coordinates: { lat: 28.9845, lng: 77.7064 }
    },
    jobType: 'seasonal',
    category: 'land-preparation',
    payRate: {
      amount: 800,
      type: 'daily',
      currency: 'INR'
    },
    duration: {
      startDate: new Date('2024-10-15'),
      endDate: new Date('2024-11-15'),
      estimatedHours: 240
    },
    requirements: [
      'Experience with tractor operation',
      'Knowledge of plowing and harrowing techniques',
      'Ability to work in outdoor conditions',
      'Basic understanding of soil types'
    ],
    benefits: ['Daily meals provided', 'Transportation allowance', 'Bonus for quality work'],
    contactInfo: {
      name: 'Rajesh Kumar',
      phone: '+91-9876543210',
      email: 'rajesh.farmer@gmail.com',
      preferredContact: 'phone'
    },
    postedBy: 'user1',
    postedAt: new Date('2024-09-20'),
    status: 'active',
    applicationsCount: 3,
    numPeopleNeeded: 5,
    amountPaid: 800
  },
  {
    id: '2',
    title: 'Sowing and Seed Planting Specialist',
    location: {
      address: 'Kharif Fields, Ludhiana, Punjab',
      coordinates: { lat: 30.9010, lng: 75.8573 }
    },
    jobType: 'seasonal',
    category: 'sowing',
    payRate: {
      amount: 900,
      type: 'daily',
      currency: 'INR'
    },
    duration: {
      startDate: new Date('2024-11-01'),
      endDate: new Date('2024-12-15'),
      estimatedHours: 300
    },
    requirements: [
      'Experience in seed sowing techniques',
      'Knowledge of seed spacing and depth',
      'Familiarity with sowing machinery',
      'Attention to detail for quality work'
    ],
    benefits: ['Accommodation provided', 'Medical insurance', 'Performance bonus'],
    contactInfo: {
      name: 'Harpreet Singh',
      phone: '+91-9988776655',
      preferredContact: 'phone'
    },
    postedBy: 'user2',
    postedAt: new Date('2024-09-25'),
    status: 'active',
    applicationsCount: 7,
    numPeopleNeeded: 3,
    amountPaid: 900
  },
  {
    id: '3',
    title: 'Organic Manuring and Fertilization Team',
    location: {
      address: 'Organic Farm, Nashik, Maharashtra',
      coordinates: { lat: 19.9975, lng: 73.7898 }
    },
    jobType: 'part-time',
    category: 'manuring-fertilization',
    payRate: {
      amount: 600,
      type: 'daily',
      currency: 'INR'
    },
    duration: {
      startDate: new Date('2024-10-01'),
      endDate: new Date('2024-03-31'),
      estimatedHours: 400
    },
    requirements: [
      'Knowledge of organic farming practices',
      'Experience with fertilizer application',
      'Understanding of soil nutrition',
      'Physical fitness for manual work'
    ],
    benefits: ['Organic produce sharing', 'Skill development training', 'Flexible working hours'],
    contactInfo: {
      name: 'Priya Sharma',
      phone: '+91-8765432109',
      email: 'priya.organic@gmail.com',
      preferredContact: 'email'
    },
    postedBy: 'user3',
    postedAt: new Date('2024-09-18'),
    status: 'active',
    applicationsCount: 5,
    numPeopleNeeded: 4,
    amountPaid: 600
  },
  {
    id: '4',
    title: 'Irrigation System Operator',
    location: {
      address: 'Drip Irrigation Farm, Jalgaon, Maharashtra',
      coordinates: { lat: 21.0077, lng: 75.5626 }
    },
    jobType: 'full-time',
    category: 'irrigation',
    payRate: {
      amount: 15000,
      type: 'weekly',
      currency: 'INR'
    },
    duration: {
      startDate: new Date('2024-10-01'),
      endDate: new Date('2025-04-30'),
      estimatedHours: 1200
    },
    requirements: [
      'Experience with irrigation systems',
      'Knowledge of water management',
      'Basic technical skills for equipment maintenance',
      'Ability to work in all weather conditions'
    ],
    benefits: ['Health insurance', 'Accommodation', 'Annual bonus', 'Technical training'],
    contactInfo: {
      name: 'Suresh Patil',
      phone: '+91-7654321098',
      preferredContact: 'phone'
    },
    postedBy: 'user4',
    postedAt: new Date('2024-09-22'),
    status: 'active',
    applicationsCount: 12,
    numPeopleNeeded: 2,
    amountPaid: 15000
  },
  {
    id: '5',
    title: 'Weeding and Pest Control Specialist',
    location: {
      address: 'Cotton Fields, Yavatmal, Maharashtra',
      coordinates: { lat: 20.3897, lng: 78.1307 }
    },
    jobType: 'seasonal',
    category: 'weeding-pest-control',
    payRate: {
      amount: 700,
      type: 'daily',
      currency: 'INR'
    },
    duration: {
      startDate: new Date('2024-11-15'),
      endDate: new Date('2025-02-28'),
      estimatedHours: 350
    },
    requirements: [
      'Experience in pest identification',
      'Knowledge of organic pest control',
      'Manual weeding skills',
      'Safety awareness for chemical handling'
    ],
    benefits: ['Safety equipment provided', 'Training on IPM', 'Performance incentives'],
    contactInfo: {
      name: 'Ramesh Deshmukh',
      phone: '+91-9123456789',
      preferredContact: 'phone'
    },
    postedBy: 'user5',
    postedAt: new Date('2024-09-28'),
    status: 'active',
    applicationsCount: 8,
    numPeopleNeeded: 6,
    amountPaid: 700
  },
  {
    id: '6',
    title: 'Harvesting Team - Rice and Wheat',
    location: {
      address: 'Paddy Fields, Thanjavur, Tamil Nadu',
      coordinates: { lat: 10.7870, lng: 79.1378 }
    },
    jobType: 'seasonal',
    category: 'harvesting',
    payRate: {
      amount: 1000,
      type: 'daily',
      currency: 'INR'
    },
    duration: {
      startDate: new Date('2024-12-01'),
      endDate: new Date('2025-01-31'),
      estimatedHours: 400
    },
    requirements: [
      'Experience in crop harvesting',
      'Knowledge of harvesting timing',
      'Physical strength for manual work',
      'Familiarity with harvesting equipment'
    ],
    benefits: ['Bonus for timely completion', 'Meals and accommodation', 'Transportation provided'],
    contactInfo: {
      name: 'Murugan Pillai',
      phone: '+91-8901234567',
      preferredContact: 'phone'
    },
    postedBy: 'user6',
    postedAt: new Date('2024-09-30'),
    status: 'active',
    applicationsCount: 15,
    numPeopleNeeded: 10,
    amountPaid: 1000
  },
  {
    id: '7',
    title: 'Post-Harvest Processing and Storage',
    location: {
      address: 'Processing Unit, Mandya, Karnataka',
      coordinates: { lat: 12.5214, lng: 76.8958 }
    },
    jobType: 'contract',
    category: 'post-harvest',
    payRate: {
      amount: 25000,
      type: 'project',
      currency: 'INR'
    },
    duration: {
      startDate: new Date('2024-12-15'),
      endDate: new Date('2025-03-15'),
      estimatedHours: 600
    },
    requirements: [
      'Experience in grain processing',
      'Knowledge of storage techniques',
      'Quality control awareness',
      'Basic packaging skills'
    ],
    benefits: ['Project completion bonus', 'Skill certification', 'Future project priority'],
    contactInfo: {
      name: 'Lakshmi Narayana',
      phone: '+91-7890123456',
      email: 'lakshmi.processing@gmail.com',
      preferredContact: 'email'
    },
    postedBy: 'user7',
    postedAt: new Date('2024-10-01'),
    status: 'active',
    applicationsCount: 6,
    numPeopleNeeded: 2,
    amountPaid: 25000
  },
  {
    id: '8',
    title: 'Land Tenancy - Small Farmer Partnership',
    location: {
      address: 'Fertile Land, Sangli, Maharashtra',
      coordinates: { lat: 16.8524, lng: 74.5815 }
    },
    jobType: 'contract',
    category: 'land-tenancy',
    payRate: {
      amount: 0,
      type: 'project',
      currency: 'INR'
    },
    duration: {
      startDate: new Date('2024-11-01'),
      endDate: new Date('2025-10-31'),
      estimatedHours: 2000
    },
    requirements: [
      'Small farmer with limited land access',
      'Experience in crop cultivation',
      'Commitment for full crop cycle',
      'Basic farming equipment access'
    ],
    benefits: [
      '60% harvest share for tenant',
      'Water and electricity access',
      'Technical guidance provided',
      'Market linkage support'
    ],
    contactInfo: {
      name: 'Vishnu Patil',
      phone: '+91-9876543210',
      preferredContact: 'phone'
    },
    postedBy: 'user8',
    postedAt: new Date('2024-09-15'),
    status: 'active',
    applicationsCount: 4,
    numPeopleNeeded: 1,
    amountPaid: 0
  },
  {
    id: '9',
    title: 'Contract Farming - Vegetable Production',
    location: {
      address: 'Greenhouse Farm, Pune, Maharashtra',
      coordinates: { lat: 18.5204, lng: 73.8567 }
    },
    jobType: 'contract',
    category: 'land-tenancy',
    payRate: {
      amount: 50000,
      type: 'project',
      currency: 'INR'
    },
    duration: {
      startDate: new Date('2024-10-15'),
      endDate: new Date('2025-10-15'),
      estimatedHours: 1800
    },
    requirements: [
      'Experience in vegetable cultivation',
      'Knowledge of greenhouse farming',
      'Financial capacity for inputs',
      'Market connections preferred'
    ],
    benefits: [
      'Modern infrastructure access',
      'Technical support included',
      'Guaranteed water supply',
      'Storage facility available'
    ],
    contactInfo: {
      name: 'Anil Joshi',
      phone: '+91-8765432109',
      email: 'anil.greenhouse@gmail.com',
      preferredContact: 'email'
    },
    postedBy: 'user9',
    postedAt: new Date('2024-09-20'),
    status: 'active',
    applicationsCount: 2,
    numPeopleNeeded: 1,
    amountPaid: 50000
  }
];

// Job service functions
export class JobService {
  private static STORAGE_KEY = 'agricultural_jobs';
  private static APPLICATIONS_KEY = 'job_applications';

  // Get all jobs from localStorage or return sample data
  static getAllJobs(): Job[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const jobs = JSON.parse(stored);
        // Convert date strings back to Date objects
        return jobs.map((job: any) => ({
          ...job,
          postedAt: new Date(job.postedAt),
          duration: {
            ...job.duration,
            startDate: new Date(job.duration.startDate),
            endDate: job.duration.endDate ? new Date(job.duration.endDate) : undefined
          }
        }));
      }
      // If no stored data, save and return sample data
      this.saveJobs(sampleJobs);
      return sampleJobs;
    } catch (error) {
      console.error('Error loading jobs:', error);
      return sampleJobs;
    }
  }

  // Save jobs to localStorage
  static saveJobs(jobs: Job[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(jobs));
    } catch (error) {
      console.error('Error saving jobs:', error);
    }
  }

  // Get jobs by category
  static getJobsByCategory(category: string): Job[] {
    const allJobs = this.getAllJobs();
    return allJobs.filter(job => job.category === category && job.status === 'active');
  }

  // Get jobs by location
  static getJobsByLocation(location: string): Job[] {
    const allJobs = this.getAllJobs();
    return allJobs.filter(job => 
      job.location.address.toLowerCase().includes(location.toLowerCase()) && 
      job.status === 'active'
    );
  }

  // Get job by ID
  static getJobById(id: string): Job | undefined {
    const allJobs = this.getAllJobs();
    return allJobs.find(job => job.id === id);
  }

  // Add new job
  static addJob(job: Omit<Job, 'id' | 'postedAt' | 'applicationsCount'>): Job {
    const newJob: Job = {
      ...job,
      id: Date.now().toString(),
      postedAt: new Date(),
      applicationsCount: 0
    };
    
    const allJobs = this.getAllJobs();
    allJobs.push(newJob);
    this.saveJobs(allJobs);
    
    return newJob;
  }

  // Update job
  static updateJob(id: string, updates: Partial<Job>): Job | null {
    const allJobs = this.getAllJobs();
    const jobIndex = allJobs.findIndex(job => job.id === id);
    
    if (jobIndex === -1) return null;
    
    allJobs[jobIndex] = { ...allJobs[jobIndex], ...updates };
    this.saveJobs(allJobs);
    
    return allJobs[jobIndex];
  }

  // Delete job
  static deleteJob(id: string): boolean {
    const allJobs = this.getAllJobs();
    const filteredJobs = allJobs.filter(job => job.id !== id);
    
    if (filteredJobs.length === allJobs.length) return false;
    
    this.saveJobs(filteredJobs);
    return true;
  }

  // Get jobs posted by user
  static getJobsByUser(userId: string): Job[] {
    const allJobs = this.getAllJobs();
    return allJobs.filter(job => job.postedBy === userId);
  }

  // Search jobs
  static searchJobs(query: string): Job[] {
    const allJobs = this.getAllJobs();
    const searchTerm = query.toLowerCase();

    return allJobs.filter(job =>
      job.status === 'active' && (
        job.title.toLowerCase().includes(searchTerm) ||
        job.location.address.toLowerCase().includes(searchTerm) ||
        job.category.toLowerCase().includes(searchTerm)
      )
    );
  }

  // Filter jobs
  static filterJobs(filters: {
    category?: string;
    jobType?: string;
    minPay?: number;
    maxPay?: number;
    location?: string;
  }): Job[] {
    let jobs = this.getAllJobs().filter(job => job.status === 'active');

    if (filters.category) {
      jobs = jobs.filter(job => job.category === filters.category);
    }

    if (filters.jobType) {
      jobs = jobs.filter(job => job.jobType === filters.jobType);
    }

    if (filters.minPay !== undefined) {
      jobs = jobs.filter(job => job.payRate.amount >= filters.minPay!);
    }

    if (filters.maxPay !== undefined) {
      jobs = jobs.filter(job => job.payRate.amount <= filters.maxPay!);
    }

    if (filters.location) {
      jobs = jobs.filter(job => 
        job.location.address.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }

    return jobs;
  }

  static async postJob(jobData: { title: string; description: string; company: string; location: string; salary: number }) {
    console.log("Posting job:", jobData);
    try {
      // TODO: Replace with actual API endpoint
      const response = await fetch("http://localhost:5000/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Job posted successfully:", data);
      return data;
    } catch (error) {
      console.error("Error posting job:", error);
      throw error;
    }
  }
}
// Application service functions
export class ApplicationService {
  private static STORAGE_KEY = 'job_applications';

  // Get all applications
  static getAllApplications(): JobApplication[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const applications = JSON.parse(stored);
        return applications.map((app: any) => ({
          ...app,
          appliedAt: new Date(app.appliedAt),
          availability: {
            ...app.availability,
            startDate: new Date(app.availability.startDate),
            endDate: app.availability.endDate ? new Date(app.availability.endDate) : undefined
          }
        }));
      }
      return [];
    } catch (error) {
      console.error('Error loading applications:', error);
      return [];
    }
  }

  // Save applications
  static saveApplications(applications: JobApplication[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(applications));
    } catch (error) {
      console.error('Error saving applications:', error);
    }
  }

  // Add new application
  static addApplication(application: Omit<JobApplication, 'id' | 'appliedAt'>): JobApplication {
    const newApplication: JobApplication = {
      ...application,
      id: Date.now().toString(),
      appliedAt: new Date()
    };

    const allApplications = this.getAllApplications();
    allApplications.push(newApplication);
    this.saveApplications(allApplications);

    // Update job applications count
    const job = JobService.getJobById(application.jobId);
    if (job) {
      JobService.updateJob(job.id, { 
        applicationsCount: job.applicationsCount + 1 
      });
    }

    return newApplication;
  }

  // Get applications for a job
  static getApplicationsForJob(jobId: string): JobApplication[] {
    const allApplications = this.getAllApplications();
    return allApplications.filter(app => app.jobId === jobId);
  }

  // Update application status
  static updateApplicationStatus(id: string, status: JobApplication['status']): JobApplication | null {
    const allApplications = this.getAllApplications();
    const appIndex = allApplications.findIndex(app => app.id === id);
    
    if (appIndex === -1) return null;
    
    allApplications[appIndex].status = status;
    this.saveApplications(allApplications);
    
    return allApplications[appIndex];
  }
}