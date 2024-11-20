// lib/dbConnect.ts
import mongoose from 'mongoose';

const connection = { isConnected: false };

async function dbConnect() {
  if (connection.isConnected) {
    return; // Already connected
  }

  try {
    // Ensure the MongoDB URI is available
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in the environment variables');
    }

    const db = await mongoose.connect(process.env.MONGODB_URI);
    
    // Set connection state to true if connected
    connection.isConnected = db.connection.readyState === 1; // 1 means connected
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error; // Optional: rethrow error to handle it in calling functions
  }
}

export default dbConnect;
