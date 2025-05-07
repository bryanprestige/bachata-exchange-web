import { lazy, Suspense } from 'react';

const HeroSection = lazy(() => import('./HeroSection'));
const AboutSection = lazy(() => import('./AboutSection'));
const EventCarousel = lazy(() => import('./EventCarousel'));
const TestimonialCarousel = lazy(() => import('./TestimonialCarousel'));
const Sponsors = lazy(() => import('./Sponsors'));
const Collaborators = lazy(() => import('./Collaborators'));
const EventFacts = lazy(() => import('./EventFacts'));
const GetInvolved = lazy(() => import('../GetInvolved'));
const Footer = lazy(() => import('../Footer'));
const ScrollToTopButton = lazy(() => import('../ScrollToTopButton'));

export default function HomePage() {
  return (
    <main className='bg-gray-800 w-full'>
      <Suspense fallback={<div className="text-white text-center py-10">Loading homepage...</div>}>
        {/* Hero Section */}
        <HeroSection />
        {/* About Section */}
        <AboutSection />
        {/* Events Preview */}
        <EventCarousel />
        {/* Testimonial Section */}
        <TestimonialCarousel />
        {/* Event Facts */}
        <EventFacts />
        {/* Call to Action */}
        <GetInvolved />
        {/* Sponsors & Collaborators */}
        <div className='flex flex-row gap-[-10px] bg-blue-50 items-center justify-center'> 
          <Sponsors />
          <Collaborators />
        </div>
        {/* Footer */}
        <Footer />
        {/* Scroll To Top Button */}
        <ScrollToTopButton />
      </Suspense>
    </main>
  );
}