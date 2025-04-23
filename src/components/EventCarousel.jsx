import {useKeenSlider} from 'keen-slider/react'
import EventCard from './EventCard';
import { KeenAutoplayWithDots } from "../lib/keenAutoplayWithDots.js";
import { useState, useRef } from "react";


export default function EventCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const sliderRef = useRef(null);

  const [ref, instanceRef] = useKeenSlider(
    {
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
    },
    [KeenAutoplayWithDots(sliderRef, setCurrentSlide, setLoaded)]
  );

  const events = [
    { image: '/event1.jpg', title: 'Spring Social', date: '2025-05-10' },
    { image: '/event2.jpg', title: 'Bachata Fiesta', date: '2025-06-01' },
    { image: "/event3.jpg", title: "Community Jam", date: "2025-07-15" },
    { image: "/event4.jpg", title: "Summer Vibes", date: "2025-08-20" },
    { image: "/event5.jpg", title: "Dance Marathon", date: "2025-09-05" }
  ];

    return (
      <section>
        <div className='relative'>
          <div ref={ref} className="keen-slider">
            {events.map((event, i) => (
              <div key={i} className="keen-slider__slide min-w-full">
                <EventCard {...event} />
              </div>
            ))}
          </div>
        </div>
        {loaded && instanceRef.current && (
          <>
            {/* Flechas */}
            <button
              onClick={() => instanceRef.current?.prev()}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white text-black rounded-full p-2 hover:bg-purple-200 transition"
            >
              ←
            </button>
            <button
              onClick={() => instanceRef.current?.next()}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-black rounded-full p-2 hover:bg-purple-200 transition"
            >
              →
            </button>

            {/* Dots */}
            <div className="flex justify-center mt-6 gap-2">
              {events.map((_, i) => (
                <button
                  key={i}
                  onClick={() => instanceRef.current?.moveToIdx(i)}
                  className={`h-2 w-2 rounded-full ${
                    currentSlide === i ? "bg-yellow-500" : "bg-gray-800"
                  }`}
                ></button>
              ))}
            </div>
          </>
        )}
      </section>
    )

}