require('dotenv').config();
const mongoose = require('mongoose');
const Story = require('./models/Story');
const Level = require('./models/Level');

// Connect to MongoDB
mongoose.connect(process.env.DB_URL)
  .then(() => console.log('✅ Connected to MongoDB for Seeding'))
  .catch(err => console.log(err));

// --- DATA: LEVELS (Matches learn_page.dart) ---
const seedLevels = [
  {
    index: 0,
    title: 'Alphabet & Basics',
    iconName: 'looks_one_rounded',
    status: 'active',
    questions: [
      { questionText: 'Which letter is "Ka"?', options: ['ក', 'ខ', 'គ', 'ឃ'], correctAnswer: 'ក', type: 'multiple-choice' },
      { questionText: 'What sound does "ខ" make?', options: ['Ko', 'Kho', 'Go', 'Kho'], correctAnswer: 'Kho', type: 'multiple-choice' }
    ]
  },
  { index: 1, title: 'Numbers & Counting', iconName: 'looks_two_rounded', status: 'locked', questions: [] },
  { index: 2, title: 'Animals & Nature', iconName: 'looks_3_rounded', status: 'locked', questions: [] },
  { index: 3, title: 'Listen', iconName: 'headphones_rounded', status: 'locked', questions: [] },
  { index: 4, title: 'Hard practice', iconName: 'fitness_center_rounded', status: 'locked', questions: [] },
  { index: 5, title: 'Calculate', iconName: 'calculate_rounded', status: 'locked', questions: [] },
  // ... Add more levels here if needed
];

// --- DATA: STORIES (Matches data_story_page.dart) ---
const seedStories = [
  // SET 1: Chat Stories
  {
    set: 1,
    type: 'chat',
    title: 'The Date',
    sub: 'Meeting people',
    iconName: 'favorite_rounded',
    status: 'active',
    chatData: [
       { speaker: 'Lin', text: 'តើអ្នកចង់ញ៉ាំអ្វី? (What do you want to eat?)', audio: 'what_eat.mp3' },
       { speaker: 'Bea', text: 'ខ្ញុំចង់ញ៉ាំបាយ។ (I want to eat rice.)', audio: 'eat_rice.mp3' },
       { speaker: 'Lin', text: 'ខ្ញុំក៏ចង់ញ៉ាំបាយដែរ។ (I want to eat rice too.)', audio: 'eat_rice_too.mp3' }
    ]
  },
  // SET 2: Reading Stories
  {
    set: 2,
    type: 'reading',
    title: 'The Morning Market',
    sub: 'Daily Life',
    iconName: 'storefront_rounded',
    status: 'locked',
    khmerTitle: 'ផ្សារ ពេល ព្រឹក',
    image: 'assets/images/market.png',
    audio: 'market_story.mp3',
    paragraph: "រាល់ ព្រឹក ម៉ាក់ របស់ ខ្ញុំ ទៅ ផ្សារ ។",
    dictionary: {
      'រាល់': { def: 'Every', audio: 'roal.mp3' },
      'ព្រឹក': { def: 'Morning', audio: 'pruek.mp3' }
    }
  }
];

const seedDB = async () => {
  try {
    // 1. Clear existing data
    await Level.deleteMany({});
    await Story.deleteMany({});
    console.log('🗑️  Old data cleared.');

    // 2. Insert new data
    await Level.insertMany(seedLevels);
    console.log('📚 Levels added.');
    
    await Story.insertMany(seedStories);
    console.log('📖 Stories added.');
    
    console.log('✅ Database Seeded Successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedDB();