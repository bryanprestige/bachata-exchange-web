import { Link } from "react-router-dom";
import heroImage from '../assets/hero-image.png';
import MilestoneTimeline from "./MilestonesTimeline";
export default function AboutPage() {
    return (
        <>
            <section className="relative h-[60vh] bg-cover bg-center text-white flex items-center justify-center" style={{ backgroundImage: "url('../assets/hero-image.png')" }}>
                        <img src={heroImage } className='absolute top-0 left-0 w-full h-full object-cover'></img>
                <div className="bg-black bg-opacity-60 p-6 rounded-xl text-center absolute">
                    <h1 className="text-4xl font-bold">Our Journey</h1>
                    <p className="mt-2 text-lg">From one small party to a thriving movement of joy and connection.</p>
                </div>
            </section>
            <MilestoneTimeline></MilestoneTimeline>
            <section className="bg-gray-900 text-white py-12 px-6 text-center">
                <h2 className="text-3xl font-bold text-yellow-500 mb-4">Our Mission</h2>
                <p className="max-w-2xl mx-auto">To create a welcoming, safe and empowering space through bachata, open to everyone regardless of background or experience.</p>
            </section>
            <section className="py-12 bg-black text-white text-center">
                <h2 className="text-2xl font-semibold mb-6">Ready to be part of the story?</h2>
                <Link to="/join" className=" bg-white text-gray-800 px-6 py-3 font-semibold rounded-xl hover:bg-yellow-500 hover:text-gray-800 transition">Get Involved</Link>
            </section>
        </>
    );
}