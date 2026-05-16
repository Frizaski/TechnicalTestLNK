import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import id from 'date-fns/locale/id'; // Bahasa Indonesia
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import EventModal from '../components/EventModal';

// JANGAN LUPA IMPORT CSS KALENDERNYA!
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Konfigurasi tanggal untuk Kalender
const locales = { 'id': id };
const localizer = dateFnsLocalizer({
  format, parse, startOfWeek, getDay, locales,
});

const CalendarPage: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // Fungsi mengambil data dari backend
  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/events');
      // Format data backend agar sesuai dengan format react-big-calendar
      const formattedEvents = response.data.map((item: any) => {
        const eventDate = new Date(item.date);
        return {
          title: item.email, // Hanya memunculkan emailnya saja sesuai soal
          start: eventDate,
          end: eventDate,
          allDay: true,
        };
      });
      setEvents(formattedEvents);
    } catch (error) {
      console.error('Gagal mengambil data kalender', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Fungsi Logout dengan mencatat timestamp
  const handleLogout = async () => {
    const userEmail = localStorage.getItem('userEmail');
    try {
      if (userEmail) {
        await axios.post('http://localhost:5000/api/auth/logout', { email: userEmail });
      }
    } catch (error) {
      console.error('Gagal mencatat timestamp logout', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('userEmail');
      navigate('/login');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header Bar */}
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow">
        <h1 className="text-2xl font-bold text-gray-800">Big Calendar</h1>
        <div className="flex gap-4">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-2 text-white bg-blue-600 rounded shadow hover:bg-blue-700"
          >
            Create
          </button>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 text-white bg-red-500 rounded shadow hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Area Kalender */}
      <main className="flex-1 p-6">
        <div className="h-full p-4 bg-white rounded shadow">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: '100%' }}
            views={['month']} // Kita batasi hanya tampilan bulan sesuai gambar test
            popup={true}
          />
        </div>
      </main>

      {/* Panggil Modal Component */}
      <EventModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={fetchEvents} // Jika submit sukses, otomatis refresh kalender
      />
    </div>
  );
};

export default CalendarPage;