import { Link } from 'react-router-dom';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import EventCarousel from './EventCarousel';
import TestimonialCarousel from './TestimonialCarousel';
import Sponsors from './sponsors';
import EventFacts from './EventFacts';
import Footer from './Footer';
import ScrollToTopButton from './ScrollToTopButton';
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
      <section className="py-20 text-center bg-gray-800 text-white">
        <h2 className="text-2xl font-semibold">Want to be part of the movement?</h2>
        <p className="mt-2">Volunteer as a teacher, event coordinator, or brand partner!</p>
        <Link to="/join">
          <button className="mt-6 bg-white text-gray-800 px-6 py-3 font-semibold rounded-xl hover:bg-yellow-500 hover:text-gray-800 transition">
            Get Involved
          </button>
        </Link>
      </section>
      {/* Sponsosrs */}
      <Sponsors></Sponsors>
      {/* Footer */}
      <Footer></Footer>
      <ScrollToTopButton></ScrollToTopButton>
    </main>
    )
}