import { useState } from 'react';
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig.js"

export default function PastEventsForm() {

    const [loading, setLoading] = useState(false);
    const [cover,setCover] = useState(null);
    const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;

    const [peForm, setPeForm] = useState({
        title: '',
        date: '',
        teachers: '',
        instagramCover: '',
        instagramLink: '',
    });

    const handleCoverChange = (e) => {
        setCover(e.target.files[0]);
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
          instagramLink: peForm.instagramLink
        });
    
        alert("Past event added!");
        setPeForm({ title: '', date: '', teachers: '', instagramLink: '' });
        setLoading(false);
        setCover(null);
      } 

    return (
        <section className="bg-gray-800 p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Add Past Event Video</h2>
        <form onSubmit={handleAddPastEvent} className="grid gap-4 md:grid-cols-2">
          {['title','date','teachers', 'instagramLink'].map(field => (
            <input
              key={field}
              type={field==='date' ? 'date' : field==='instagramLink' ? 'url' : 'text'}
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
          <button
                type="submit"
                className={`bg-purple-500 text-white py-2 rounded hover:bg-yellow-400 col-span-full ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={loading}
              >
                {loading ? "Uploading..." : "Add Past Event"}
              </button>
        </form>
      </section>
    );
}