import React, { useState } from 'react';
import axios from 'axios';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void; // Fungsi untuk me-refresh kalender setelah sukses submit
}

const EventModal: React.FC<EventModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post('http://localhost:5000/api/events', {
        email,
        date,
        description
      });
      alert('Data berhasil disubmit & Email terkirim!');
      // Reset form
      setEmail(''); setDate(''); setDescription('');
      onSuccess(); // Refresh data kalender
      onClose();   // Tutup modal
    } catch (error) {
      alert('Terjadi kesalahan saat menyimpan data');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-xl">
        <h2 className="mb-4 text-xl font-bold">Create Event</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex items-center">
            <label className="w-24 text-sm font-medium">Email</label>
            <input type="email" required className="flex-1 p-2 border rounded"
              value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="mb-4 flex items-center">
            <label className="w-24 text-sm font-medium">Date</label>
            <input type="date" required className="flex-1 p-2 border rounded"
              value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div className="mb-6 flex items-start">
            <label className="w-24 mt-2 text-sm font-medium">Description</label>
            <textarea required rows={4} className="flex-1 p-2 border rounded resize-none"
              value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300">Cancel</button>
            <button type="submit" disabled={isLoading} className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
              {isLoading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;