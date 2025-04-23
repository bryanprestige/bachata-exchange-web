import { useKeenSlider } from "keen-slider/react";
import Testimonial from "./Testimonial.jsx";
import { KeenAutoplayWithDots } from "../lib/keenAutoplayWithDots.js";
import { useState, useRef } from "react";
import { FaTripadvisor } from "react-icons/fa";
export default function TestimonialCarousel() {

  const [currentSlide, setCurrentSlide] = useState(0);
  const[loaded, setLoaded] = useState(false);
  const sliderRef = useRef(null);

  const [ref, instanceRef] = useKeenSlider(
    {
      loop: true,
      slides: {
        perView: 1,
        spacing: 16,
      },
      breakpoints: {
        "(min-width: 768px)": {
          slides: { perView: 2, spacing: 24 },
        },
        "(min-width: 1024px)": {
          slides: { perView: 3, spacing: 32 },
        },
      },
    },
    [KeenAutoplayWithDots(sliderRef, setCurrentSlide, setLoaded)]
  );
  
  const testimonials = [
    {
      quote: "Simply the best place to dance bachata in London! And the best place to be on Sunday evening. It gets better and better every time and I learnt so much there as well with free lessons that are run before the social dancing.",
      name: "Dominika K",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    {
      quote: "I love BE, it is my favourite place to dance, even I enjoyed it more here than when I dance in Spain, my country. It is always full of people with a good energy, even if you are a beginner, you would have fun. After last year, I was in such a hype to come back last Sunday and it was amazing, BE never let you down. It is like that special place that when you are there all your problems disappeare and you are able to see life differently. Love it here!! :) thank you to the organisers to make it happen, winter felt really long without BE.",
      name: "Agustin V",
      avatar: "https://i.pravatar.cc/150?img=7",
    },
    {
      quote: "I'm so glad this Is back!! By far my favorite night of dancing in London, doesn't go late, incredibly accessible off Liverpool Street Station, and the music, community, and vibe are always quality. It's like having a dance festival happen every weekend, and they play all types of bachata. The teachers they bring in are exceptional as well, and accommodate for multiple skill levels. Cannot recommend this spot enough, if you're a bachata dancer, This spot is a must",
      name: "Zach",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    {
      quote:"Great vibes! Bachat teachers are super friendly and helpful and they do it virtually for free (or for a small discretional donation) and then the social dancing brings all levels together to have fun! I try to go Sunday. 5pm onwards is Bachata time!",
      name: "Chiara C",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    {
      quote: "There is no other place that gives you the community feeling like Bachata Exchange.The energy that you feel there is like no other.Dancing on an open space is magic, it's way more relax than been on a disco, you can seem people better, it allows you to chat, it allow you to connect with people in ways that you can't in most places.This is a must try at least once if you came or live in London, I'm sure you will be surprise about it. If you are a complete beginner or an advance dancer, you will find many friendly people that you will enjoy dancing with.",
      name: "Horacio A",
      avatar: "https://i.pravatar.cc/150?img=8",
    },
    {
      quote:"I can’t rate BE enough, it’s the perfect end and start to my week. You can turn up alone and always see smiling welcoming dancers who have become my close friends over the years. You always feel welcome, safe and included! Social dancing in London wouldn’t be the same without it. Roll on the summer ☀️🕺💃",
      name: "Chantal ccj",
      avatar: "https://i.pravatar.cc/150?img=9",
    },
  ];

    return(
        <section className="bg-blue-50 py-20 px-6 text-white">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">What People Say</h2>
          <div className="relative">
            <div ref={ref} className="keen-slider">
              {testimonials.map((t, i) => (
                <div key={i} className="keen-slider__slide min-w-full">
                  <Testimonial {...t} />
                </div>
              ))}
            </div>
          </div>
          {loaded && instanceRef.current && (
              <>
                {/* Flechas */}
                {/* <button
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
                </button> */}

                {/* Dots */}
                <div className="flex justify-center mt-6 gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => instanceRef.current?.moveToIdx(i)}
                      className={`h-2 w-2 rounded-full ${
                        currentSlide === i ? "bg-yellow-500" : "bg-gray-800"
                      }`}
                    ></button>
                  ))}
                </div>
                <p className="mt-4 text-lg md:text-2xl text-gray-800">
                  Would you like to see what other people say?</p>
                <p className="mt-4 text-lg md:text-2xl text-gray-800">
                  Would you like to leave a review?
                  You can do it 
                  <a href="https://www.tripadvisor.es/Attraction_Review-g186338-d26663269-Reviews-Bachata_Exchange-London_England.html" target="_blank" className="text-green-400 ml-1">
                  here 
                  <FaTripadvisor className="inline ml-2 text-green-400"/>
                  </a>  
                </p>
              </>
            )}

        </section>
   
    )
}