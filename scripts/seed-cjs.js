const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error('Please define the MONGODB_URI environment variable');
  process.exit(1);
}

const sampleTasks = [
  {
    title: 'Complete project documentation',
    description: 'Write comprehensive documentation for the task management app',
    status: 'in-progress',
    priority: 'high',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'Fix UI responsiveness issues',
    description: 'Address layout problems on mobile devices',
    status: 'todo',
    priority: 'medium',
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'Deploy application',
    description: 'Deploy the task management app to Vercel',
    status: 'todo',
    priority: 'high',
    dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'Add dark mode support',
    description: 'Implement dark mode theme with toggle functionality',
    status: 'todo',
    priority: 'low',
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'Optimize database queries',
    description: 'Improve performance of database operations',
    status: 'completed',
    priority: 'medium',
    dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(),
  },
];

async function seedDatabase() {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db();
    const tasksCollection = db.collection('tasks');
    
    // Clear existing data
    await tasksCollection.deleteMany({});
    console.log('Cleared existing tasks');
    
    // Insert sample tasks
    const result = await tasksCollection.insertMany(sampleTasks);
    console.log(`${result.insertedCount} tasks inserted successfully`);
    
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await client.close();
    console.log('Database connection closed');
  }
}

seedDatabase().catch(console.error);
