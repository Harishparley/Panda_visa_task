const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Custom Logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`);
  next();
});

// In-memory data
let alerts = [
  { id: "1", country: 'France', city: 'Paris', visaType: 'Tourist', status: 'Active', createdAt: new Date() }
];

// GET: Fetch all alerts with filtering
app.get('/alerts', (req, res) => {
  const { country, status } = req.query;
  let filtered = [...alerts];
  
  if (country) filtered = filtered.filter(a => a.country.toLowerCase() === country.toLowerCase());
  if (status) filtered = filtered.filter(a => a.status === status);
  
  res.json(filtered);
});

// POST: Create a new alert
app.post('/alerts', (req, res) => {
  const { country, city, visaType } = req.body;

  // Human Touch: Basic Validation to prevent "messy" data
  if (!country || !city) {
    return res.status(400).json({ error: "Location fields (Country/City) are mandatory." });
  }

  const validTypes = ['Tourist', 'Business', 'Student'];
  if (!validTypes.includes(visaType)) {
    return res.status(400).json({ error: "Invalid Visa Category." });
  }

  const newAlert = { id: Date.now().toString(), ...req.body, createdAt: new Date() };
  alerts.push(newAlert);
  res.status(201).json(newAlert);
});

// --- ADDED THESE ROUTES TO FIX YOUR BUTTONS ---

// PUT: Update status (Cycle logic)
app.put('/alerts/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const index = alerts.findIndex(a => a.id.toString() === id.toString());
  
  if (index !== -1) {
    alerts[index].status = status;
    res.json(alerts[index]);
  } else {
    res.status(404).json({ message: "Alert not found" });
  }
});

// DELETE: Remove an alert
app.delete('/alerts/:id', (req, res) => {
  const { id } = req.params;
  alerts = alerts.filter(a => a.id.toString() !== id.toString());
  res.status(204).send();
});

// Centralized error handling 
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something broke on our end!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));