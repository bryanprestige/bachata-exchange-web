import './App.css'
import { Link,Routes,Route } from 'react-router-dom'
import HomePage from './components/HomePage.jsx'
import AboutPage from './components/AboutPage.jsx'
import EventsPage from './components/EventsPage.jsx'
import beLogo from './assets/bachata-exchange-logo.png'
import { useState,useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion';

function App() {

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
  
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
        <nav className={`py-4 fixed w-full z-50 transition-all duration-300 text-yellow-500 ${scrolled ? 'bg-gray-800 backdrop-blur shadow-lg' : 'bg-gray-800'}`}>
          <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 ml-3">
            <img src={beLogo} alt="Bachata Exchange Logo" className="h-12 object-contain" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 text-lg font-medium">
            <Link to="/" className="hover:text-white transition">Home</Link>
            <Link to="/about" className="hover:text-white transition">About</Link>
            <Link to="/events" className="hover:text-white transition">Events</Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-yellow-400"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden flex flex-col gap-3 text-lg px-4 mt-2 overflow-hidden"
            >
              <Link to="/" onClick={() => setMenuOpen(false)} className="hover:text-purple-300">Home</Link>
              <Link to="/about" onClick={() => setMenuOpen(false)} className="hover:text-purple-300">About</Link>
              <Link to="/events" onClick={() => setMenuOpen(false)} className="hover:text-purple-300">Events</Link>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/events" element={<EventsPage />} />
      </Routes>
    </>
  )
}

export default App
