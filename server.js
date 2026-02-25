require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// --- MIDDLEWARE ---
app.use(cors()); // Allows Flutter to talk to this server
app.use(express.json()); // Allows server to read JSON data

// --- DATABASE CONNECTION ---
const DB_URL = process.env.DB_URL;


mongoose.connect(DB_URL)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch((err) => console.error('❌ Database Connection Error:', err));

// --- IMPORT ROUTES ---
const storiesRouter = require('./routes/stories');
const levelsRouter = require('./routes/levels'); // New
const usersRouter = require('./routes/users');   // New
const activitiesRouter = require('./routes/activities');

// --- USE ROUTES ---
app.use('/api/stories', storiesRouter);
app.use('/api/levels', levelsRouter);
app.use('/api/users', usersRouter);
app.use('/api/activities', activitiesRouter);

// --- ROOT ROUTE (Optional Test) ---
app.get('/', (req, res) => {
  res.send('BrainGPP Backend is Running!');
});

// --- START SERVER ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});