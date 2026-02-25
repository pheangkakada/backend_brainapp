const express = require('express');
const router = express.Router();
const User = require('../models/User');

// --- 1. LOGIN (Strict: Must exist in DB) ---
// --- 1. LOGIN (Strict Mode) ---
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    
    // ERROR: User does not exist
    if (!user) {
      return res.status(404).json({ message: "User not found. Please Register." });
    }

    // ERROR: Wrong Password (simple check)
    if (user.password !== req.body.password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // SUCCESS
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- 2. REGISTER (New Route) ---
router.post('/register', async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// --- 3. GET USER PROFILE (Keep this as is) ---
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      xp: user.xp,
      completedLevels: user.completedLevels || [],
      completedStories: user.completedStories || []
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- 4. UPDATE USER (Keep this) ---
router.put('/:id', async (req, res) => {
  try {
    if (!req.body.password || req.body.password.trim() === "") {
      delete req.body.password;
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true } 
    );
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// --- 5. DELETE USER (Keep this) ---
router.delete('/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;