const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  xp: { type: Number, default: 0 },
  
  // You already have this for levels:
  completedLevels: { type: [Number], default: [] },

  // --- ADD THIS LINE FOR STORIES ---
  completedStories: { type: [Number], default: [] }, 
});

module.exports = mongoose.model('User', UserSchema);