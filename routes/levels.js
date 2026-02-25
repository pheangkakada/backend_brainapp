const express = require('express');
const router = express.Router();
const Level = require('../models/Level');

// GET ALL LEVELS
router.get('/', async (req, res) => {
  try {
    const levels = await Level.find().sort({ index: 1 });
    res.json(levels);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ADD A LEVEL (For testing)
router.post('/', async (req, res) => {
  try {
    const newLevel = new Level(req.body);
    await newLevel.save();
    res.status(201).json(newLevel);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;