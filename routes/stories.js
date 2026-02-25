const express = require('express');
const router = express.Router();
const Story = require('../models/Story');

// 1. GET ALL STORIES
// Flutter calls: GET http://localhost:3000/api/stories
router.get('/', async (req, res) => {
  try {
    const stories = await Story.find().sort({ set: 1 });
    res.json(stories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. ADD A NEW STORY (For testing)
router.post('/', async (req, res) => {
  const story = new Story(req.body);
  try {
    const newStory = await story.save();
    res.status(201).json(newStory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 3. UPDATE PROGRESS (Unlock/Complete)
// Flutter calls: PATCH http://localhost:3000/api/stories/ID_HERE
router.patch('/:id', async (req, res) => {
  try {
    const updatedStory = await Story.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        { new: true }
    );
    res.json(updatedStory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;