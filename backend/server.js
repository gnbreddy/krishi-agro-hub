import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from 'mongoose';
import Job from './models/Job.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const db_user = "gopavaramnagabharathreddy_db_user";
const db_password = "al1IzVc1iuZDPGLy";
const connection_string = `mongodb+srv://${db_user}:${db_password}@cluster0.d4pingn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(connection_string)
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Define the route for creating a new job posting
app.post('/api/jobs', async (req, res) => {
  try {
    console.log('Received job data:', req.body);
    const newJob = new Job(req.body);
    const job = await newJob.save();
    console.log('Job saved successfully:', job);
    res.status(201).json(job);
  } catch (err) {
    console.error('Error saving job:', err.message);
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
});

// Define the route for fetching all job postings
app.get('/api/jobs', async (req, res) => {
  try {
    const jobs = await Job.find();
    console.log('Fetched jobs:', jobs.length);
    res.json(jobs);
  } catch (err) {
    console.error('Error fetching jobs:', err.message);
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
  console.log(`Health check: http://localhost:${port}/api/health`);
});