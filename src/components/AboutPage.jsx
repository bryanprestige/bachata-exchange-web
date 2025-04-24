import { Link } from "react-router-dom";
import heroImage from '../assets/hero-image.png';
import MilestoneTimeline from "./MilestonesTimeline";
import TeamSection from "./TeamSection";
import ScrollToTopButton from "./ScrollToTopButton";
import Mission from "./Mission";
import FAQS from "./FAQS";
import PhotoGallery from "./PhotoGallery";
import GetInvolved from "./GetInvolved";
import Footer from "./Footer";
export default function AboutPage() {

    return (
        <main className="bg-gray-800">
            <section className="relative h-[60vh]  bg-cover bg-center text-yellow-500 flex items-center justify-center">
                        <img src={heroImage } className='absolute top-0 left-0 w-full h-full object-cover'></img>
                <div className="bg-gray-800 bg-opacity-60 p-6 rounded-xl text-center absolute">
                    <h1 className="text-4xl font-bold">Our Journey</h1>
                    <p className="mt-2 text-lg">From one small party to a thriving movement of joy and connection.</p>
                </div>
            </section>
            <MilestoneTimeline></MilestoneTimeline>
            <Mission></Mission>
            <TeamSection></TeamSection>
            <FAQS></FAQS>
            <PhotoGallery></PhotoGallery>
            <GetInvolved></GetInvolved>
            <Footer></Footer>
            <ScrollToTopButton></ScrollToTopButton>
        </main>
    );
}