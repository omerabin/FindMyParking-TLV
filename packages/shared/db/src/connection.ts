// db.service.ts
import mongoose from 'mongoose';

let isConnected = false;

export const connectDB = async (mongoUri: string): Promise<void> => {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(mongoUri);
    isConnected = true;
    console.log('✅ MongoDB connected successfully');

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️ MongoDB disconnected');
    });
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB', error);
    process.exit(1); // Exit process if DB connection fails
  }
};

export const disconnectDB = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.log('🛑 MongoDB disconnected');
  } catch (error) {
    console.error('❌ Error while disconnecting MongoDB', error);
  }
};
