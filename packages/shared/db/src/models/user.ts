import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  fullName: string;
  email: string;
  passwordHash: string;
  phoneNumber: string;
  createdAt?: Date;
  ownedParkingIds?: string[];
}

const userSchema = new Schema<IUser>({
  fullName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  passwordHash: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  ownedParkingIds: [{ type: String }], // store ObjectId as string
});

export const UserModel = mongoose.model<IUser>('User', userSchema);
