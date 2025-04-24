import { useState } from 'react';
import TeacherForm from './TeacherForm.jsx';
import VolunteerForm from './VolunteerForm.jsx';
import Footer from './Footer.jsx';

export default function JoinPage() {
  const [selection, setSelection] = useState(null);
  const [modalOpen, setModalOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-500 text-white px-6 py-12">
      {modalOpen && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
          <div className="bg-white text-black p-8 rounded-xl max-w-sm w-full text-center">
            <h2 className="text-2xl font-semibold mb-4">How would you like to help?</h2>
            <button
              onClick={() => {
                setSelection('teacher');
                setModalOpen(false);
              }}
              className="bg-gray-800 text-yellow-500 px-4 py-2 rounded mb-2 w-full hover:bg-gray-600"
            >
              I want to teach
            </button>
            <button
              onClick={() => {
                setSelection('volunteer');
                setModalOpen(false);
              }}
              className="bg-yellow-500 text-gray-800 px-4 py-2 rounded w-full hover:bg-yellow-400"
            >
              I want to volunteer
            </button>
          </div>
        </div>
      )}

      {/* Título visible cuando se elige una opción */}
      {selection && (
        <div className="max-w-3xl mx-auto mt-20">
          <h1 className="text-4xl font-bold text-yellow-500 text-center mb-10">
            {selection === 'teacher' ? 'Teach with Us' : 'Volunteer at Our Events'}
          </h1>

          {selection === 'teacher' ? <TeacherForm /> : <VolunteerForm />}
        </div>
      )}
      {selection && <Footer />}
    </div>
  );
}