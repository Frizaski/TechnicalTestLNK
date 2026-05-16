import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'rahasia_default';

// 1. Fungsi Register (Untuk membuat akun uji coba)
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    
    // Cek apakah email sudah ada
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'Email sudah terdaftar' });
      return;
    }

    // Enkripsi password menggunakan bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Simpan user baru ke database
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    
    res.status(201).json({ message: 'User berhasil dibuat, silakan login' });
  } catch (error: any) {
    res.status(500).json({ message: 'Terjadi kesalahan server', error: error.message });
  }
};

// 2. Fungsi Login
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: 'User tidak ditemukan' });
      return;
    }

    // Cocokkan password
    const isPasswordValid = await bcrypt.compare(password, user.password as string);
    if (!isPasswordValid) {
      res.status(400).json({ message: 'Password salah' });
      return;
    }

    // CATAT TIMESTAMP LOGIN
    user.activityHistory.push({ action: 'login', timestamp: new Date() });
    await user.save();

    // Buat Token akses
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });
    
    res.status(200).json({ message: 'Login berhasil', token, email: user.email });
  } catch (error: any) {
    res.status(500).json({ message: 'Terjadi kesalahan server', error: error.message });
  }
};

// 3. Fungsi Logout
export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body; 
    
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: 'User tidak ditemukan' });
      return;
    }

    // CATAT TIMESTAMP LOGOUT
    user.activityHistory.push({ action: 'logout', timestamp: new Date() });
    await user.save();

    res.status(200).json({ message: 'Logout berhasil, timestamp telah dicatat' });
  } catch (error: any) {
    res.status(500).json({ message: 'Terjadi kesalahan server', error: error.message });
  }
};