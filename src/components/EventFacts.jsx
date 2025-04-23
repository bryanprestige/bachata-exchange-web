import CountUp from 'react-countup';
import { motion } from 'framer-motion';

export default function EventFacts() {
    function Stat({ number, suffix, label }) {
        return (
          <motion.div
          className="opacity-0"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-5xl font-extrabold text-yellow-500">
            <CountUp end={number} duration={2} suffix={suffix} enableScrollSpy scrollSpyOnce />
          </p>
          <p className="mt-2 text-lg">{label}</p>
        </motion.div>
        );
      }

    return (
        <section className="bg-gray-800 text-white py-20 px-6">
            <h2 className="text-3xl font-bold text-yellow-500 text-center mb-12">
                Bachata Exchange achievements
            </h2>
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 text-center max-w-6xl mx-auto">
                <Stat number={800} suffix="+" label="Hours of dancing every year" />
                <Stat number={120} suffix="+" label="Free class hours with top teachers" />
                <Stat number={100} suffix="+" label="Volunteer national and international Teachers" />
                <Stat number={300} suffix="+" label="Attendees every Sunday" />
                <Stat number={35} suffix="+" label="Events per year" />
                <Stat number={4} suffix="+" label="Years building community" />
            </div>
        </section>
    )
}