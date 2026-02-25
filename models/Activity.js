const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Links to the User
  type: { type: String, required: true },   // e.g., "lesson", "story", "quiz"
  title: { type: String, required: true },  // e.g., "Alphabet Unit 1"
  xpEarned: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now } // Auto-saves current time
});

module.exports = mongoose.model('Activity', ActivitySchema);