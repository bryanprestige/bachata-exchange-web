import { lazy, Suspense } from 'react';
import heroImage from '../../assets/hero-image.jpg';

const MilestoneTimeline = lazy(() => import("./MilestonesTimeline"));
const TeamSection = lazy(() => import("./TeamSection"));
const ScrollToTopButton = lazy(() => import("../ScrollToTopButton"));
const Mission = lazy(() => import("./Mission"));
const FAQS = lazy(() => import("./FAQS"));
const PhotoGallery = lazy(() => import("./PhotoGallery"));
const GetInvolved = lazy(() => import("../GetInvolved"));
const Footer = lazy(() => import("../Footer"));

export default function AboutPage() {
    return (
        <main className="bg-gray-800">
            <section className="relative h-[60vh] bg-cover bg-center text-yellow-500 flex items-center justify-center">
                <img src={heroImage} className='absolute top-0 left-0 w-full h-full object-cover' />
                <div className="bg-gray-800 bg-opacity-60 p-6 rounded-xl text-center absolute">
                    <h1 className="text-4xl font-bold">Our Journey</h1>
                    <p className="mt-2 text-lg">From one small party to a thriving movement of joy and connection.</p>
                </div>
            </section>
            <Suspense fallback={<div className="text-white text-center py-10">Loading about page...</div>}>
                <MilestoneTimeline />
                <Mission />
                <TeamSection />
                <FAQS />
                <PhotoGallery />
                <GetInvolved />
                <Footer />
                <ScrollToTopButton />
            </Suspense>
        </main>
    );
}