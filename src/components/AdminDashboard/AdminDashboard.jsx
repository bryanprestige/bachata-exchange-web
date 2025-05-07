import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../../firebaseConfig.js"
import { useState, useEffect } from 'react';
import UpcomingEventsForm from "./UpcomingEventsForm.jsx";
import PastEventsForm from "./PastEventsForm.jsx";

export default function AdminDashboard() {
  const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASS;

  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);


  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);

  const handleLogin = e => {
    e.preventDefault();
    if (password === ADMIN_PASS) setAuthenticated(true);
    else alert('Wrong password');
  };


  useEffect(() => {
    const unsubPast = onSnapshot(collection(db, "pastEvents"), snapshot => {
      const events = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPastEvents(events);
    });

    const unsubTeachers = onSnapshot(collection(db, "teachers"), snapshot => {
      const events = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUpcomingEvents(events);
    });

    return () => {
      unsubPast();
      unsubTeachers();
    };
  }, []);

  useEffect(() => {
    const fetchPastEvents = async () => {
      const querySnapshot = await getDocs(collection(db, "pastEvents"));
      const events = querySnapshot.docs
        .map(doc => doc.data())
        .sort((a, b) => new Date(b.date) - new Date(a.date)); 
  
      setPastEvents(events);
    };
  
    fetchPastEvents();
  }, []);

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white p-6">
        <form onSubmit={handleLogin} className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-sm">
          <h2 className="text-2xl font-semibold mb-4 text-center">Admin Login</h2>
          <input
            type="password"
            placeholder="Enter password"
            className="input w-full mb-4"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button type="submit" className="w-full bg-purple-600 py-2 rounded hover:bg-purple-700">
            Unlock Dashboard
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 space-y-12">
      <h1 className="text-3xl font-bold text-center">🎛️ Admin Dashboard</h1>
      {/* Upcoming Events Form */}
      <UpcomingEventsForm></UpcomingEventsForm>
      {/* Past Events Form */}
      <PastEventsForm></PastEventsForm>
      {/* Data Preview */}
      <section className="bg-gray-800 p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Data Preview</h2>
        <div className="mb-6">
          <h3 className="text-xl font-semibold">Upcoming Events JSON</h3>
          <pre className="bg-black p-4 rounded text-sm overflow-x-auto">
            {JSON.stringify(upcomingEvents, null, 2)}
          </pre>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Past Events JSON</h3>
          <pre className="bg-black p-4 rounded text-sm overflow-x-auto">
            {JSON.stringify(pastEvents, null, 2)}
          </pre>
        </div>
      </section>
    </div>
  );
}
