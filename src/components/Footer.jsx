import { FaInstagram, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
    return (
      <footer className="bg-gray-800 text-yellow-400 py-10 px-6 mt-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 text-center md:text-left">
          {/* Logo + copyright */}
          <div>
            <h3 className="text-xl font-bold text-yellow-500">Bachata Exchange</h3>
            <p className="mt-2 text-sm text-yellow-300">© 2025 All rights reserved.</p>
          </div>

          {/* Socials */}
          <div className="flex justify-center md:justify-end items-center gap-6 text-2xl mr-20">
            <a href="https://www.instagram.com/bachata.exchange/" target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-white">
              <FaInstagram />
            </a>
            <a href="mailto:hello@bachataexchange.com" aria-label="Email" className="hover:text-white">
              <FaEnvelope />
            </a>
          </div>
        </div>
      </footer>
    );
  }