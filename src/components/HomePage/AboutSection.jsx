import { Link } from 'react-router-dom';
import { scrollToTop } from '../../lib/Utils';

export default function AboutSection() {
    return (
        <section className="bg-blue-50 bg-cover py-20 px-6 mx-auto text-center ">
                <h2 className="text-3xl font-bold text-yellow-500">Who We Are</h2>
                <p className="mt-4 text-lg text-gray-800">
                  We connect cultures through bachata. Our events are inclusive spaces full of rhythm, diversity, and passion for dance.
                </p>
                <Link to="/about" onClick={scrollToTop}>
                        <button className="mt-6 px-6 py-3 bg-white hover:bg-yellow-50 text-gray-800 font-semibold rounded-xl transition">
                            Get to know the BE team
                        </button>
                </Link>
        </section>
    );
}