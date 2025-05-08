import { useState } from "react";
import { db } from "../../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { uploadImageToCloudinary } from "../../lib/cloudinaryUpload";

export default function FeaturedEventsForm() {
  const [formData, setFormData] = useState({
    title: "",
    dateRange: "",
    infoUrl: "",
    image: null,
    discount: "false",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = "";
      if (formData.image) {
        imageUrl = await uploadImageToCloudinary(formData.image);
      }

      await addDoc(collection(db, "featuredEvents"), {
        title: formData.title,
        dateRange: formData.dateRange,
        infoUrl: formData.infoUrl,
        imageUrl: imageUrl,
        discount: formData.discount,
      });

      alert("Event added successfully!");
      setFormData({ title: "", dateRange: "", infoUrl: "", image: null, discount: "false" });
    } catch (error) {
      console.error("Error adding featured event:", error);
      alert("Failed to add event.");
    }

    setLoading(false);
  };

  return (
    <section className="bg-gray-800 p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4">🟨 Featured Events</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Event Name"
          value={formData.title}
          onChange={handleChange}
          className="input w-full"
          required
        />
        <input
          type="text"
          name="dateRange"
          placeholder="Event Date (e.g., 10 May 2025 or 10–12 May 2025)"
          value={formData.dateRange}
          onChange={handleChange}
          className="input w-full"
          required
        />
        <input
          type="url"
          name="infoUrl"
          placeholder="More Info URL"
          value={formData.infoUrl}
          onChange={handleChange}
          className="input w-full"
          required
        />
        <label className="mr-3" >BELONDON Discount</label>
        <input
          type="checkbox"
          name="discount"
          checked={formData.discount === "true"}
          onChange={(e) => {
            setFormData((prev) => ({
              ...prev,
              discount: e.target.checked ? "true" : "false",
            }));
          }}
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="input w-full"
        />
        <button
          type="submit"
          className="bg-yellow-500 text-black py-2 px-6 rounded-xl hover:bg-yellow-400 transition"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Add Featured Event"}
        </button>
      </form>
    </section>
  );
}
