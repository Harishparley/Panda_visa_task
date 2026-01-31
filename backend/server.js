const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// A custom logger to track requests in the console
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`);
  next();
});

// Using an array for "in-memory" storage as allowed by the task
let alerts = [
  { id: 1, country: 'France', city: 'Paris', visaType: 'Tourist', status: 'Active', createdAt: new Date() }
];

// GET with filtering logic
app.get('/alerts', (req, res) => {
  const { country, status } = req.query;
  let filtered = [...alerts];
  
  if (country) filtered = filtered.filter(a => a.country.toLowerCase() === country.toLowerCase());
  if (status) filtered = filtered.filter(a => a.status === status);
  
  res.json(filtered);
});

// POST logic 
app.post('/alerts', (req, res) => {
  const newAlert = { id: Date.now(), ...req.body, createdAt: new Date() };
  alerts.push(newAlert);
  res.status(201).json(newAlert);
});

// Centralized error handling 
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something broke on our end!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Internal tool running on port ${PORT}`));