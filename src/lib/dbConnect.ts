import mongoose from 'mongoose';

// Use hardcoded fallback for build-time
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://bigjay2708:agoodsecret@the-review-room-cluster.jn0xlcl.mongodb.net/task-management?retryWrites=true&w=majority&appName=the-review-room-cluster';

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
interface CachedConnection {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Define global with mongoose property
declare global {
  var mongoose: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } | undefined;
}

// Use cached connection or initialize new one
const cached: CachedConnection = global.mongoose || { conn: null, promise: null };

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
