const mongoose = require('mongoose');

// Schema for a single chat line (e.g., Lin: "Hello")
const ChatMessageSchema = new mongoose.Schema({
  speaker: String,
  text: String,
  audio: String
});

// Schema for dictionary words
const DictionaryWordSchema = new mongoose.Schema({
  def: String,
  audio: String
});

// Main Story Schema
const StorySchema = new mongoose.Schema({
  set: { type: Number, required: true },  // e.g., 1
  type: { type: String, required: true }, // 'chat' or 'reading'
  title: { type: String, required: true },
  sub: String,
  iconName: String, // We save "heart" instead of Icons.heart
  status: { type: String, default: 'locked' },

  // DATA FOR CHAT STORIES
  chatData: [ChatMessageSchema],

  // DATA FOR READING STORIES
  khmerTitle: String,
  image: String,
  audio: String, 
  paragraph: String,
  
  // Dictionary map
  dictionary: {
    type: Map,
    of: DictionaryWordSchema
  }
});

module.exports = mongoose.model('Story', StorySchema);