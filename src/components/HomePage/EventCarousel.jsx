import {useKeenSlider} from 'keen-slider/react'
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebaseConfig.js"
import EventCard from './EventCard.jsx';
import { KeenAutoplayWithDots } from "../../lib/keenAutoplayWithDots.js";
import { useState, useRef, useEffect } from "react";
import { RiDiscountPercentFill } from "react-icons/ri";

export default function EventCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  const [events, setEvents] = useState([]);
  
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "featuredEvents"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(data);
    });

    return () => unsub();
  }, []);

  const keenPlugin = KeenAutoplayWithDots(sliderRef, setCurrentSlide)

  const [ref, instanceRef] = useKeenSlider(
    events.length > 0
      ? {
          loop: true,
          slides: {
            perView: 1,
            spacing: 15,
          },
          breakpoints: {
            "(min-width: 768px)": {
              slides: { perView: 2, spacing: 10 },
            },
            "(min-width: 1024px)": {
              slides: { perView: 3, spacing: 10 },
            },
          },
        }
      : null, 
    events.length > 0 ? [keenPlugin] : []
  );

    return (
      <section className='bg-gray-800 py-12'>
        <h1 className='text-yellow-500 text-2xl font-bold mb-4'>Featured Events</h1>
        <h1 className='text-yellow-500 text-2xl font-bold mb-4'>Use code: BELONDON when checking out for a nice discount on the events with the mark <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                <RiDiscountPercentFill className="mr-2" />
                Discount
              </span>
        </h1>
        <div className='relative'>
          <div ref={ref} className="keen-slider w-full min-h-[300px]">
            {events.map((event, i) => (
              <div key={i} className="keen-slider__slide">
                <EventCard {...event} />
              </div>
            ))}
          </div>
        </div>
        {instanceRef.current && events.length > 1 && (
          <div className="flex justify-center mt-6 gap-2">
            {events.map((_, i) => (
              <button
                key={i}
                onClick={() => instanceRef.current?.moveToIdx(i)}
                className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                  currentSlide === i ? "bg-yellow-500" : "bg-white"
                }`}
              ></button>
            ))}
          </div>
      )}
      </section>
    )
}