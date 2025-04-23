import { Link } from 'react-router-dom';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import EventCarousel from './EventCarousel';
import TestimonialCarousel from './TestimonialCarousel';
import Sponsors from './sponsors';
import EventFacts from './EventFacts';
import Footer from './Footer';
import ScrollToTopButton from './ScrollToTopButton';
import GetInvolved from './GetInvolved';
export default function HomePage() {
    return (
      <main className='bg-gray-800'>
      {/* Hero Section */}
        <HeroSection></HeroSection>
      {/* About Section */}
      <AboutSection></AboutSection>
      
      {/* Events Preview */}
      <EventCarousel></EventCarousel>
      {/* Testimonial Section */}
      <TestimonialCarousel></TestimonialCarousel>
      {/* Event Facts */}
      <EventFacts></EventFacts>
      {/* Call to Action */}
      <GetInvolved></GetInvolved>
      {/* Sponsosrs */}
      <Sponsors></Sponsors>
      {/* Footer */}
      <Footer></Footer>
      <ScrollToTopButton></ScrollToTopButton>
    </main>
    )
}