import UpcomingEventCard from "./UpcomingEventCard";
import PastEventCarousel from "./PastEventCarousel";
//import flyer1 from "../assets/flyer1.png"
//import flyer2 from "../assets/flyer2.png"
//import flyer3 from "../assets/flyer3.png"
import Footer from "./Footer";
//import pastEventData2024 from "../api/pastEvents2024.json"  with { type:"json"}

import { useEffect, useState } from 'react';
import { db } from "../firebaseConfig.js";
import { collection, onSnapshot,getDocs } from 'firebase/firestore';

export default function EventsPage() {

    const [pastEvents, setPastEvents] = useState([]);
    const [teachers,setTeachers] = useState([]);

    useEffect(() => {
        const fetchPastEvents = async () => {
          const querySnapshot = await getDocs(collection(db, "pastEvents"));
          const events = querySnapshot.docs.map(doc => doc.data()); 
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
    
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "pastEvents"), snapshot => {
            const events = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setPastEvents(events);
        });
        
        return () => unsubscribe();
    }, []);
    
    console.log('teachers',teachers);
   /*  const teachers = [
        { name: "Dren", level: "Beginners", image: flyer1 },
        { name: "Jacopo.", level: "Improvers", image: flyer2 },
        { name: "Iman", level: "Intermediate", image: flyer3 },
      ]; */

    return (
       <>
            <section className="bg-yellow-500 text-white p-14 pt-20 text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-800 mt-12 ">How Our Classes Work</h2>
                <p className="max-w-3xl mx-auto text-gray-800">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, justo nec sagittis efficitur, sem magna faucibus lacus, nec fermentum justo libero non lorem.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, justo nec sagittis efficitur, sem magna faucibus lacus, nec fermentum justo libero non lorem.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, justo nec sagittis efficitur, sem magna faucibus lacus, nec fermentum justo libero non lorem.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, justo nec sagittis efficitur, sem magna faucibus lacus, nec fermentum justo libero non lorem.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, justo nec sagittis efficitur, sem magna faucibus lacus, nec fermentum justo libero non lorem.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, justo nec sagittis efficitur, sem magna faucibus lacus, nec fermentum justo libero non lorem.
                </p>
            </section>
            <section className="bg-gray-800 rounded-2xl shadow-lg p-6 text-white max-w-4xl mx-auto mb-8">
                <h3 className="text-yellow-400 text-xl font-semibold mb-2">Classes start at 5pm</h3>
                <p className="text-sm text-white mb-2">{new Date("2025-04-27").toDateString()} | 12 Primrose Street, London,EC2A 2EG</p>
            <UpcomingEventCard
                teachers={teachers}
            />
            <p className="text-lg italic text-white">Open level warm-up included</p>

            </section>
            <section className="bg-gray-800 text-white py-12 px-6 text-center">
                <h2 className="text-3xl font-bold text-yellow-500 mb-4">Events 2025</h2>
                <p className="max-w-3xl mx-auto text-white">
                    Slide to the right to find more highlights from BE in cronological order
                </p>
            </section>
            {/* <PastEventCarousel
                events={pastEvents}
            /> */}
            <section className="bg-gray-800 text-white py-12 px-6 text-center">
                <h2 className="text-3xl font-bold text-yellow-500 mb-4">Events 2024</h2>
                <p className="max-w-3xl mx-auto text-white">
                    Slide to the right to find more highlights from BE in cronological order
                </p>
            </section>
            {/* <PastEventCarousel
              events={pastEventData2024}
            /> */}
            <Footer />
       </>
    );
}