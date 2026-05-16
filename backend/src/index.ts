import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import eventRoutes from './routes/eventRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors());
app.use(express.json());

// Routes Endpoint
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

async function startServer() {
  if (!MONGO_URI) {
    throw new Error('MONGO_URI belum diisi di file .env');
  }

  await mongoose.connect(MONGO_URI);
  console.log('Berhasil terhubung ke MongoDB Atlas!');

  app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
  });
}

startServer().catch((error: Error) => {
  console.error('Gagal menjalankan server:', error.message);
  process.exit(1);
});
