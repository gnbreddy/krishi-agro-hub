import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
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
    const newJob = new Job(req.body);
    const job = await newJob.save();
    res.status(201).json(job);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Define the route for fetching all job postings
app.get('/api/jobs', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-pro" }); // Changed model to gemini-pro
    console.log("Using Gemini model:", model.model); // Log the model being used
    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();
    res.json({ reply: text });
  } catch (error) {
    console.error("Error communicating with Gemini API:", error);
    res.status(500).json({ error: "Failed to get response from AI" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
