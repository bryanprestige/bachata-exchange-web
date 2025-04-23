import { Link } from 'react-router-dom';
//import heroVideo from '../assets/hero-video.mp4';
import heroImage from '../assets/hero-image.png';
export default function HeroSection() {
    return (
        <section
        className=" relative h-screen flex items-center justify-center "
        >
            <img src={heroImage } className='absolute top-0 left-0 w-full h-full object-cover'></img>
            {/* <video src={heroVideo} autoPlay loop muted className='absolute top-0 left-0 w-full h-full object-cover'>
            </video> */}
            <div className="bg-gray-800 bg-opacity-50 p-8 rounded-2xl text-center absolute">
                <h1 className="text-4xl md:text-6xl font-bold text-yellow-500">Bachata Exchange</h1>
                <p className="mt-4 text-lg md:text-2xl text-white">More than dance, a community.</p>
                <Link to="/events">
                <button className="mt-6 px-6 py-3 bg-white hover:bg-yellow-100 text-gray-800 font-semibold rounded-xl transition">
                    View Upcoming Events
                </button>
                </Link>
            </div>
        </section>
    );
}