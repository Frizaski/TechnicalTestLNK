# Technical Test Intern Programmer - MERN Stack

Aplikasi MERN Stack (MongoDB, Express, React, Node.js) ini dibuat untuk memenuhi Technical Test posisi Intern Programmer. Aplikasi ini menggunakan TypeScript pada Backend dan Frontend.

## Fitur Utama
1. **Autentikasi (Login & Logout)**: Menyimpan `timestamp` riwayat aktivitas ke database setiap kali user melakukan login atau logout.
2. **Big Calendar**: Menampilkan list data berbentuk kalender (hanya memunculkan email pengguna pada kotak tanggal).
3. **Modal Create Data**: Form CRUD untuk memasukkan Email, Date (YYYY-MM-DD), dan Description.
4. **Email Otomatis**: Mengirim email otomatis berisi pesan "Hi Salam kenal" ke alamat email yang disubmit pada form menggunakan Nodemailer.

## Cara Menjalankan Aplikasi di Lokal

Aplikasi ini dibagi menjadi dua folder: `backend` dan `frontend`. Silakan buka dua terminal terpisah.

### 1. Setup Backend
1. Buka terminal dan masuk ke folder backend: `cd backend`
2. Install dependencies: `npm install`
3. Buat file .env baru berdasarkan format .env.example. Untuk kemudahan testing agar tidak perlu setup database baru, kredensial asli telah saya lampirkan di dalam Email pengumpulan tugas.
4. Jalankan server: `npm run dev`
5. Server backend akan berjalan di `http://localhost:5000`

### 2. Setup Frontend
1. Buka terminal baru dan masuk ke folder frontend: `cd frontend`
2. Install dependencies: `npm install`
3. Jalankan server React (Vite): `npm run dev`
4. Buka browser dan akses link yang muncul (biasanya `http://localhost:5173`)

### Akun Testing
Untuk menguji fitur Login, Anda bisa menekan tombol **Register** atau membuat data via endpoint POST di Postman, atau menggunakan akun yang sudah saya siapkan di database:
* **Email:** tester@gmail.com
* **Password:** rahasia123