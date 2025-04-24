import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
//import { useEffect } from "react"

export default function PastEventCarousel({ events }) {
  const [sliderRef] = useKeenSlider({
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
  })

     /*  useEffect(() => {
        if (events.length > 0) {
          if (!document.querySelector('script[src="https://www.instagram.com/embed.js"]')) {
            const script = document.createElement("script");
            script.src = "https://www.instagram.com/embed.js";
            script.async = true;
            document.body.appendChild(script);
          }
        }
      }, [events]);  */

  return (
    <div ref={sliderRef} className="keen-slider my-12">
      {events.map((event, i) => (
          <div key={i} className="keen-slider__slide bg-gray-900 p-4 rounded-xl text-white shadow-lg">
            <div className="aspect-video mb-4">
            <iframe
              className="w-full h-full rounded-xl"
              src={event.instagramEmbed}
              title={event.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
              {/* <blockquote className="instagram-media" 
                data-instgrm-permalink={event.instagramEmbed} 
                data-instgrm-version="12">
                <a href={event.instagramEmbed}></a>
              </blockquote> */}
            </div>
            <h4 className="text-yellow-400 font-semibold">{event.title}</h4>
            <h4 className="text-yellow-400 font-semibold">{new Date(event.date).toDateString()} </h4>
            <p className="text-sm text-white mt-2">{event.teachers}</p>
          </div>
      ))}
    </div>
  )
}
