import mongoose, { Schema, Document } from 'mongoose';

// Membuat tipe data TypeScript untuk User
export interface IUser extends Document {
  email: string;
  password?: string;
  activityHistory: {
    action: 'login' | 'logout';
    timestamp: Date;
  }[];
}

// Membuat Blueprint (Skema) untuk database MongoDB
const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // Array untuk menyimpan riwayat timestamp login dan logout
  activityHistory: [
    {
      action: { type: String, enum: ['login', 'logout'], required: true },
      timestamp: { type: Date, default: Date.now }
    }
  ]
});

export default mongoose.model<IUser>('User', UserSchema);