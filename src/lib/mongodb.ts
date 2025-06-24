import { MongoClient } from 'mongodb';

// Skip environment check during build
const uri = process.env.MONGODB_URI || 'mongodb+srv://bigjay2708:agoodsecret@the-review-room-cluster.jn0xlcl.mongodb.net/task-management?retryWrites=true&w=majority&appName=the-review-room-cluster';
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable to preserve the connection across hot-reloads
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production mode, create a new client
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
