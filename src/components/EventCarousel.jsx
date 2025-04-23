import {useKeenSlider} from 'keen-slider/react'
import EventCard from './EventCard';
import { KeenAutoplayWithDots } from "../lib/keenAutoplayWithDots.js";
import { useState, useRef } from "react";
import bachataHearthImg from '../assets/bachata-hearth.png';
import latinNotionImg from '../assets/latin-notion.png';
import bachazoukImg from '../assets/bachazouk.png';
import bachataBattleImg from '../assets/bachata-battle.png';
import springfestivalImg from '../assets/spring-festival.png';

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
    { image: bachataHearthImg, title: 'Bachata Hearth', date: '23 April 2025' },
    { image: latinNotionImg, title: 'Latin Notion', date: '15th to 19th May 2025' },
    { image: bachazoukImg, title: "BachazoUK Festival", date: "13th to 15th June 2025" },
    { image: bachataBattleImg, title: "London Bachata Battle", date: "20th April 2025" },
    { image: springfestivalImg, title: "Spring Festival SBK", date: "14th to 16th March 2025" }
  ];

    return (
      <section className='bg-gray-800 py-12'>
        <h1 className='text-yellow-500 text-2xl font-bold mb-4'>Featured Events</h1>
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
                    currentSlide === i ? "bg-yellow-500" : "bg-white"
                  }`}
                ></button>
              ))}
            </div>
          </>
        )}
      </section>
    )

}