import { collection, addDoc, getDocs, onSnapshot, writeBatch, doc } from "firebase/firestore";
import { db } from "../firebaseConfig.js"
import { useState, useEffect } from 'react';

export default function AdminDashboard() {

  const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
  const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASS;

  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null); 
  const [cover,setCover] = useState(null);

  const [ueForm, setUeForm] = useState({
    names: '',
    classLevel: '',
    imageUrl: '',
  });
  const [peForm, setPeForm] = useState({
    title: '',
    date: '',
    teachers: '',
    instagramCover: '',
  });

  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [stagingTeachers, setStagingTeachers] = useState([]);

  const handleLogin = e => {
    e.preventDefault();
    if (password === ADMIN_PASS) setAuthenticated(true);
    else alert('Wrong password');
  };

  const handleCoverChange = (e) => {
    setCover(e.target.files[0]);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleAddPastEvent = async (e) => {
    e.preventDefault();
    setLoading(true);
    let coverUrl = "";
    if (cover) {
      const data = new FormData();
      data.append("file", cover);
      data.append("upload_preset", "instagram-cover");

      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: data,
      });

      const file = await res.json();

      if (!file.secure_url) {
        alert("Image upload failed. Please check your Cloudinary config.");
        setLoading(false);
        return;
      }    

      coverUrl = file.secure_url;
    }

    await addDoc(collection(db, "pastEvents"), {
      title: peForm.title,
      date: peForm.date,
      teachers: peForm.teachers,
      instagramCover: coverUrl,
    });

    alert("Past event added!");
    setLoading(false);
    setPeForm({ title: '', date: '', teachers: '', instagramCover: '' });
    setCover(null);
  }

  const handleAddToStaging = async (e) => {
    e.preventDefault();
    setLoading(true);

    let imageUrl = "";
    if (image) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "bachata-flyers");

      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: data,
      });

      const file = await res.json();

      if (!file.secure_url) {
        alert("Image upload failed. Please check your Cloudinary config.");
        setLoading(false);
        return;
      }    

      imageUrl = file.secure_url;
    }

    setStagingTeachers(prev => [...prev, {
      names: ueForm.names,
      classLevel: ueForm.classLevel,
      imageUrl,
    }]);

    setUeForm({ names: '', classLevel: '', imageUrl: '' });
    setImage(null);
    setLoading(false);
  };

  const handlePublishWeek = async () => {
    const querySnapshot = await getDocs(collection(db, "teachers"));
    const batch = writeBatch(db);

    querySnapshot.forEach(doc => {
      batch.delete(doc.ref);
    });

    stagingTeachers.forEach(t => {
      const docRef = doc(collection(db, "teachers"));
      batch.set(docRef, t);
    });

    await batch.commit();
    alert("Nueva semana publicada.");
    setStagingTeachers([]);
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
        <h2 className="text-2xl font-semibold mb-4">Add Teachers to Staging</h2>
        <form onSubmit={handleAddToStaging} className="grid gap-4 md:grid-cols-1">
            {['names'].map(field => (
                <input
                    key={field}
                    type='text'
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    className="input"
                    value={ueForm[field]}
                    onChange={e => setUeForm({ ...ueForm, [field]: e.target.value })}
                    required
                />
            ))}
            <select
              className="p-3 rounded bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={ueForm.classLevel}
              onChange={e => setUeForm({ ...ueForm, classLevel: e.target.value })}
            >
              <option value="" disabled>Class Level</option>
              <option value="Beginners">Beginners</option>
              <option value="Improvers">Improvers</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Footwork">Footwork</option>
              <option value="Special Concept">Special Concept</option>
            </select>
            <input
              type="file"
              accept="image/*"
              className="input"
              onChange={handleImageChange}
              required
            />
              <button
                type="submit"
                className={`bg-yellow-500 text-black py-2 rounded hover:bg-yellow-400 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={loading}
              >
                {loading ? "Uploading..." : "Add Upcoming Event"}
              </button>
        </form>

        <button
          onClick={handlePublishWeek}
          className="mt-4 w-full bg-green-500 py-2 rounded hover:bg-green-600"
        >
          📦 Publish New Week
        </button>

        <pre className="mt-4 bg-black p-4 rounded text-sm overflow-x-auto">
          {JSON.stringify(stagingTeachers, null, 2)}
        </pre>
      </section>

      {/* Past Events Form */}
      <section className="bg-gray-800 p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Add Past Event Video</h2>
        <form onSubmit={handleAddPastEvent} className="grid gap-4 md:grid-cols-2">
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
              type="file"
              accept="image/*"
              className="input"
              onChange={handleCoverChange}
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
