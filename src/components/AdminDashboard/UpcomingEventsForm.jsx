import { useState } from 'react';
import { collection, getDocs, writeBatch, doc } from "firebase/firestore";
import { db } from "../../firebaseConfig.js"


export default function UpcomingEventsForm() {

    const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;

    const [loading, setLoading] = useState(false);
    const [stagingTeachers, setStagingTeachers] = useState([]);
    const [image, setImage] = useState(null); 


    const [ueForm, setUeForm] = useState({
        names: '',
        classLevel: '',
        imageUrl: '',
        date: '',
      });

      const handleImageChange = (e) => {
        setImage(e.target.files[0]);
      };  

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
          date: ueForm.date || '',
        }]);
    
        setUeForm({ names: '', classLevel: '', imageUrl: '', date: '' });
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
      
          const missingDates = stagingTeachers.some(t => !t.date);
          if (missingDates) {
            alert("Error: All teachers must have a date set.");
            return;
          }
      
          await batch.commit();
          alert("Nueva semana publicada.");
          setStagingTeachers([]);
        };

    return (
        <section className="bg-gray-800 p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Add Teachers to Staging</h2>
        <form onSubmit={handleAddToStaging} className="grid gap-4 md:grid-cols-1">
            {['names'].map(field => (
                <input
                    key={field}
                    type='text'
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    className="input"
                    value={ueForm[field] || ''}
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
              type="date"
              className="input"
              value={ueForm.date || ''}
              onChange={e => setUeForm({ ...ueForm, date: e.target.value })}
              required
            />
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
    );
}