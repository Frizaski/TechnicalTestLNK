import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import Event from '../models/Event';

// 1. Fungsi Create Data & Kirim Email
export const createEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, date, description } = req.body;

    // Simpan ke MongoDB
    const newEvent = new Event({ email, date, description });
    await newEvent.save();

    // PINDAHKAN KONFIGURASI KE DALAM SINI
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Kirim Email otomatis
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email, // Mengirim ke email tujuan
      subject: 'Pesan Otomatis MERN Stack',
      text: 'Hi Salam kenal',
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: 'Data berhasil disimpan & Email terkirim!', data: newEvent });
  } catch (error: any) {
    res.status(500).json({ message: 'Terjadi kesalahan', error: error.message });
  }
};

// 2. Fungsi Get Data (Untuk Big Calendar)
export const getEvents = async (req: Request, res: Response): Promise<void> => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error: any) {
    res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data', error: error.message });
  }
};