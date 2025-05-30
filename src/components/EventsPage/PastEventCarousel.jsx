import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"

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


  return (
        <div
          ref={sliderRef}
          className="keen-slider my-12"
          key={events.map(e => e.title).join("-")}
        >
        {events.map((event, i) => (
          <div key={i} className="keen-slider__slide bg-gray-900 p-4 rounded-xl text-white shadow-lg">
            <div className="aspect-video mb-4">
            <a href={event.instagramLink} target="_blank">
              <img
                className="w-full h-full rounded-xl"
                src={event.instagramCover}
                alt={event.title}
              ></img>
            </a>
            </div>
            <h4 className="text-yellow-400 font-semibold">{event.title}</h4>
            <h4 className="text-yellow-400 font-semibold">{new Date(event.date).toDateString()} </h4>
            <p className="text-sm text-white mt-2">{event.teachers}</p>
          </div>
      ))}
    </div>
  )
}
