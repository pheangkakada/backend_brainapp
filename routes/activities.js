const express = require('express');
const router = express.Router();
const Activity = require('../models/Activity');
const User = require('../models/User');

// POST: Save activity AND unlock level/story
// URL: http://localhost:3000/api/activities
router.post('/', async (req, res) => {
  // 1. Receive data from the app
  let { userId, type, title, xpEarned, levelIndex, storyIndex } = req.body;

  try {
    // 2. Safety: Force IDs to be Numbers (not strings)
    if (levelIndex !== undefined) levelIndex = parseInt(levelIndex);
    if (storyIndex !== undefined) storyIndex = parseInt(storyIndex);

    // 3. Save the Activity Log (History)
    const newActivity = new Activity({ userId, type, title, xpEarned });
    await newActivity.save();

    // 4. Update the User's Profile (The "Brain")
    const user = await User.findById(userId);
     if (user) {
       user.xp = (user.xp || 0) + xpEarned;
       if (type === 'lesson' && levelIndex !== undefined) {
         if (!user.completedLevels.includes(levelIndex)) user.completedLevels.push(levelIndex);
       }
       if (type === 'story' && storyIndex !== undefined) {
         if (!user.completedStories) user.completedStories = [];
         if (!user.completedStories.includes(storyIndex)) user.completedStories.push(storyIndex);
       }
       await user.save();
     }

    // 6. Respond to the App
    res.status(201).json({ 
      message: "Saved successfully", 
      completedLevels: user ? user.completedLevels : [],
      completedStories: user ? user.completedStories : []
    });

  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});
// 2. GET USER ACTIVITY HISTORY (Add this NEW route)
router.get('/:userId', async (req, res) => {
  try {
    const activities = await Activity.find({ userId: req.params.userId })
      .sort({ timestamp: -1 }) // Newest first
      .limit(20); // Get last 20 items
    res.json(activities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;