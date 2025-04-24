import './App.css'
import { Link,Routes,Route } from 'react-router-dom'
import HomePage from './components/HomePage.jsx'
import AboutPage from './components/AboutPage.jsx'
import EventsPage from './components/EventsPage.jsx'
import JoinPage from './components/JoinPage.jsx'
import beLogo from './assets/bachata-exchange-logo.png'
import { SiGofundme } from "react-icons/si";
import { useState,useEffect } from 'react'
import {scrollToTop} from './lib/Utils.js'
import { motion, AnimatePresence } from 'framer-motion';

import AdminDashboard from './components/AdminDashboard.jsx'
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
          <Link to="/" className="flex items-center gap-2 ml-3" onClick={scrollToTop}>
            <img src={beLogo} alt="Bachata Exchange Logo" className="h-12 object-contain" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 text-lg font-medium">
            <Link to="/" className="hover:text-white transition mt-3" onClick={scrollToTop}>Home</Link>
            <Link to="/about" className="hover:text-white transition mt-3" onClick={scrollToTop}>About</Link>
            <Link to="/events" className="hover:text-white transition mr-10 mt-3" onClick={scrollToTop}>Events</Link>
            <a href='https://www.gofundme.com/f/btvyd-bachata-exchange-community-project' target='_blank'>
              <button className="bg-white text-gray-800 px-6 py-3 font-semibold rounded-xl hover:bg-yellow-500 hover:text-gray-800 transition mr-3">
                Donate
                <SiGofundme className="inline ml-2 mb-1" />
              </button>
            </a>
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
        <Route path="/join" element={<JoinPage />} />
        <Route path="/dashboard-8432access" element={<AdminDashboard />} />
      </Routes>
    </>
  )
}

export default App
