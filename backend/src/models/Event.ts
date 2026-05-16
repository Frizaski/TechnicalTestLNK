import mongoose, { Schema, Document } from 'mongoose';

// Membuat tipe data TypeScript untuk Event (Data Kalender)
export interface IEvent extends Document {
  email: string;
  date: string; // Disimpan dalam format string 'YYYY-MM-DD' sesuai permintaan UI
  description: string;
}

const EventSchema: Schema = new Schema({
  email: { type: String, required: true },
  date: { type: String, required: true },
  description: { type: String, required: true },
}, { 
  timestamps: true // Otomatis mencatat kapan data dibuat (createdAt)
});

export default mongoose.model<IEvent>('Event', EventSchema);