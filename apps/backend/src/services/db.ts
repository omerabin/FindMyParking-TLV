// db.service.ts
import mongoose from 'mongoose';
import { appConfig } from '../config/appConfig';

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(appConfig.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);

    console.log('✅ MongoDB connected successfully');

    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });

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
