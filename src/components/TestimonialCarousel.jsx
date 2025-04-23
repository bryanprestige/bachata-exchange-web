import { useKeenSlider } from "keen-slider/react";
import Testimonial from "./Testimonial.jsx";
import { KeenAutoplayWithDots } from "../lib/keenAutoplayWithDots.js";
import { useState, useRef } from "react";

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
      quote: "Bachata Exchange made me feel at home from the first song. The vibe is unreal!",
      name: "Elena G.",
      avatar: "/avatars/elena.jpg",
    },
    {
      quote: "The most inclusive and welcoming dance event I’ve ever attended.",
      name: "Marcus V.",
      avatar: "/avatars/marcus.jpg",
    },
    {
      quote: "I met friends for life here. It’s more than just a party.",
      name: "Sophia D.",
      avatar: "/avatars/sophia.jpg",
    },
  ];

    return(
        <section className="bg-black py-20 px-6 text-white">
          <h2 className="text-3xl font-bold text-purple-200 text-center mb-12">What People Say</h2>
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
              </>
            )}
        </section>
   
    )
}