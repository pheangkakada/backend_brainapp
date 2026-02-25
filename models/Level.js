const mongoose = require('mongoose');

// Schema for a single question inside a level
const QuestionSchema = new mongoose.Schema({
  questionText: String,
  options: [String],   
  correctAnswer: String, 
  type: String           
});

// Schema for the Level itself
const LevelSchema = new mongoose.Schema({
  index: { type: Number, required: true, unique: true }, // 0, 1, 2...
  title: String,
  iconName: String, // "looks_one", "school", etc.
  status: { type: String, default: 'locked' }, // 'active', 'locked', 'completed'
  questions: [QuestionSchema] 
});

module.exports = mongoose.model('Level', LevelSchema);