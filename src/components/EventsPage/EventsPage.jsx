import { lazy, Suspense, useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { GoAlertFill } from "react-icons/go";
import pastEventData2024 from "../../api/pastEvents2024.json" with { type: "json" };
import { db } from "../../firebaseConfig.js";
import { collection, getDocs } from 'firebase/firestore';

// Lazy load components
const UpcomingEventCard = lazy(() => import("./UpcomingEventCard.jsx"));
const PastEventCarousel = lazy(() => import("./PastEventCarousel.jsx"));
const Footer = lazy(() => import("../Footer.jsx"));

export default function EventsPage() {
  const [pastEvents, setPastEvents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [filterType, setFilterType] = useState('');
  const [filterType2024, setFilterType2024] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterDate2024, setFilterDate2024] = useState('');
  const [filterName, setFilterName] = useState('');
  const [filterName2024, setFilterName2024] = useState('');

  useEffect(() => {
    const fetchPastEvents = async () => {
      const querySnapshot = await getDocs(collection(db, "pastEvents"));
      const events = querySnapshot.docs
        .map(doc => doc.data())
        .sort((a, b) => new Date(b.date) - new Date(a.date));
      setPastEvents(events);
    };

    const fetchTeachers = async () => {
      const querySnapshot = await getDocs(collection(db, "teachers"));
      const teachers = querySnapshot.docs.map(doc => doc.data());
      setTeachers(teachers);
    };

    fetchPastEvents();
    fetchTeachers();
  }, []);

  const filteredEvents = pastEvents.filter((event) => {
    if (filterType === "date" && filterDate) {
      const eventDate = new Date(event.date).toISOString().split("T")[0];
      return eventDate === filterDate;
    }
    if (filterType === "name" && filterName) {
      return event.teachers.toLowerCase().includes(filterName.toLowerCase());
    }
    return true;
  });

  const filteredEvents2024 = pastEventData2024.filter((event) => {
    if (filterType2024 === "date" && filterDate2024) {
      const eventDate = new Date(event.date).toISOString().split("T")[0];
      return eventDate === filterDate2024;
    }
    if (filterType2024 === "name" && filterName2024) {
      return event.teachers?.toLowerCase().includes(filterName2024.toLowerCase());
    }
    return true;
  });

  return (
    <>
      <section className="bg-yellow-500 text-white p-14 pt-20 text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800 mt-12 ">How Our Classes Work</h2>
        <p className="max-w-3xl mx-auto text-gray-800">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit...
        </p>
      </section>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <section className="bg-gray-800 rounded-2xl shadow-lg p-6 text-white max-w-4xl mx-auto mb-8">
          <h3 className="text-yellow-400 text-xl font-semibold mb-2">Classes start at 5pm</h3>
          {teachers.length > 0 && teachers[0].date && (
            <p className="text-sm text-white mb-2">
              {new Date(teachers[0].date).toDateString()} | 12 Primrose Street, London, EC2A 2EG
            </p>
          )}
          <Suspense fallback={<div className="text-white">Loading event...</div>}>
            <UpcomingEventCard teachers={teachers} />
          </Suspense>
          <p className="text-lg italic text-white">Open level warm-up included</p>
        </section>
      </motion.div>
      {/* 2025 EVENTS */}
      <section className="bg-gray-800 text-white py-12 px-6 text-center">
        <h2 className="text-3xl font-bold text-yellow-500 mb-4">Events 2025</h2>
        <p className="max-w-3xl mx-auto text-white">
          Slide to the right to find more highlights from BE in chronological order
        </p>
      </section>

      {/* Filters for 2025 */}
      <div className="mb-4 flex flex-col md:flex-row items-center justify-center gap-4 mt-5">
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="bg-gray-700 text-white p-2 rounded">
          <option value="" disabled>Filter</option>
          <option value="date">Filter by date</option>
          <option value="name">Filter by name</option>
        </select>
        {filterType === "date" ? (
          <input type="date" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} className="bg-gray-700 text-white p-2 rounded" />
        ) : filterType === "name" && (
          <input type="text" placeholder="Enter name..." value={filterName} onChange={(e) => setFilterName(e.target.value)} className="bg-gray-700 text-white p-2 rounded" />
        )}
      </div>

      <Suspense fallback={<div className="text-white text-center">Loading events...</div>}>
        {filteredEvents.length === 0 ? (
          <div className="keen-slider__slide bg-gray-900 p-4 rounded-xl text-white shadow-lg mb-5 flex items-center justify-center">
            <GoAlertFill />
            <p className="text-white ml-5">Events not found</p>
          </div>
        ) : (
          <PastEventCarousel events={filteredEvents} />
        )}
      </Suspense>

      {/* 2024 EVENTS */}
      <section className="bg-gray-800 text-white py-12 px-6 text-center">
        <h2 className="text-3xl font-bold text-yellow-500 mb-4">Events 2024</h2>
        <p className="max-w-3xl mx-auto text-white">
          Slide to the right to find more highlights from BE in chronological order
        </p>
      </section>

      {/* Filters for 2024 */}
      <div className="mb-4 flex flex-col md:flex-row items-center justify-center gap-4 mt-5">
        <select value={filterType2024} onChange={(e) => setFilterType2024(e.target.value)} className="bg-gray-700 text-white p-2 rounded">
          <option value="" disabled>Filter</option>
          <option value="date">Filter by date</option>
          <option value="name">Filter by name</option>
        </select>
        {filterType2024 === "date" ? (
          <input type="date" value={filterDate2024} onChange={(e) => setFilterDate2024(e.target.value)} className="bg-gray-700 text-white p-2 rounded" />
        ) : filterType2024 === "name" && (
          <input type="text" placeholder="Enter name..." value={filterName2024} onChange={(e) => setFilterName2024(e.target.value)} className="bg-gray-700 text-white p-2 rounded" />
        )}
      </div>

      <Suspense fallback={<div className="text-white text-center">Loading past events...</div>}>
        {filteredEvents2024.length === 0 ? (
          <div className="keen-slider__slide bg-gray-900 p-4 rounded-xl text-white shadow-lg flex items-center justify-center">
            <GoAlertFill />
            <p className="text-white ml-5">Events not found</p>
          </div>
        ) : (
          <PastEventCarousel events={filteredEvents2024} />
        )}
      </Suspense>

      <Suspense fallback={<div className="text-white text-center">Loading footer...</div>}>
        <Footer />
      </Suspense>
    </>
  );
}
