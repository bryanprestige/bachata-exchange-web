import { collection,addDoc ,getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig.js" 
import { useState,useEffect } from 'react';
//import pastEventsData from "../api/pastEvents2025.json";

export default function AdminDashboard() {

  const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASS;
  console.log(ADMIN_PASS)
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  // Estados para eventos futuros y pasados
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "pastEvents"), snapshot => {
      const events = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPastEvents(events);
    });
  
    return () => unsubscribe(); // Limpiar suscripción en desmontaje
  }, []);

  // Formularios
  const [ueForm, setUeForm] = useState({
    title: '',
    date: '',
    type: 'class',
    teachers: '',
    flyerUrl: '',
  });
  const [peForm, setPeForm] = useState({
    title: '',
    date: '',
    teachers: '',
    instagramEmbed: '',
  });

  useEffect(() => {
    const fetchPastEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "pastEvents"));
        const events = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPastEvents(events);
      } catch (error) {
        console.error("Error loading past events: ", error);
      }
    };
  
    fetchPastEvents();
  }, []);

  const handleLogin = e => {
    e.preventDefault();
    if (password === ADMIN_PASS) setAuthenticated(true);
    else alert('Wrong password');
  };

  const handleAddUpcoming = e => {
    e.preventDefault();
    setUpcomingEvents([...upcomingEvents, { ...ueForm }]);
    setUeForm({ title: '', date: '', type: 'class', teachers: '', flyerUrl: '' });
  };

  const handleAddPast = async e => {
    e.preventDefault();
  
    try {
      await addDoc(collection(db, "pastEvents"), peForm);
      alert("Past event added!");
      setPeForm({ title: '', date: '', teachers: '', instagramEmbed: '' });
    } catch (error) {
      console.error("Error adding past event: ", error);
      alert("There was an error saving the event.");
    }
  };

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
      <section className="bg-gray-800 p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Add Upcoming Event</h2>
        <form onSubmit={handleAddUpcoming} className="grid gap-4 md:grid-cols-2">
          {['title','date','teachers','flyerUrl'].map(field => (
            <input
              key={field}
              type={field==='date' ? 'date' : 'text'}
              placeholder={field === 'flyerUrl' ? 'Flyer Image URL' : field.charAt(0).toUpperCase() + field.slice(1)}
              className="input"
              value={ueForm[field]}
              onChange={e => setUeForm({...ueForm, [field]: e.target.value})}
              required
            />
          ))}
          <select
            className="input"
            value={ueForm.type}
            onChange={e => setUeForm({...ueForm, type: e.target.value})}
          >
            <option value="class">Class</option>
            <option value="social">Social</option>
          </select>
          <button type="submit" className="bg-yellow-500 text-black py-2 rounded hover:bg-yellow-400">
            Add Upcoming
          </button>
        </form>
      </section>

      {/* Past Events Form */}
      <section className="bg-gray-800 p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Add Past Event Video</h2>
        <form onSubmit={handleAddPast} className="grid gap-4 md:grid-cols-2">
          {['title','date','teachers'].map(field => (
            <input
              key={field}
              type={field==='date' ? 'date' : 'text'}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              className="input"
              value={peForm[field]}
              onChange={e => setPeForm({...peForm, [field]: e.target.value})}
              required
            />
          ))}
          <input
            type="text"
            placeholder="Instagram Embed URL"
            className="input col-span-full"
            value={peForm.instagramEmbed}
            onChange={e => setPeForm({...peForm, instagramEmbed: e.target.value})}
            required
          />
          <button type="submit" className="bg-purple-600 py-2 rounded hover:bg-purple-700 col-span-full">
            Add Past Event
          </button>
        </form>
      </section>

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
