import { motion } from "framer-motion";
import heroImage from '../assets/hero-image.png';

const milestones = [
  {
    year: "2021",
    title: "The Beginning",
    description: "We started with one dream, a handful of friends, and a lot of love for dance.",
    emoji: "🌱",
    image: heroImage,
    bgColor: "from-purple-700 via-purple-800 to-purple-900",
  },
  {
    year: "2022",
    title: "The Growth",
    description: "New venues, new faces, and more than double the energy. A real community was born.",
    emoji: "🚀",
    image: heroImage,
    bgColor: "from-yellow-600 via-yellow-700 to-yellow-800",
  },
  {
    year: "2023",
    title: "The Impact",
    description: "Hundreds of hours of free classes, social impact, and a family that kept growing.",
    emoji: "🌍",
    image: heroImage,
    bgColor: "from-emerald-600 via-emerald-700 to-emerald-800",
  },
  {
    year: "2024",
    title: "The Celebration",
    description: "Milestone events, international teachers, and dancers from all around the world.",
    emoji: "🎉",
    image: heroImage,
    bgColor: "from-pink-600 via-pink-700 to-pink-800",
  },
];

export default function MilestoneTimeline() {
  return (
    <section className="bg-gray-800 text-white py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-yellow-500 text-center mb-12">Our Milestones</h2>
        <div className="relative border-l-4 border-purple-600 pl-6 space-y-12">
          {milestones.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              viewport={{ once: true }}
              className={`relative rounded-xl p-4 md:p-6 bg-gradient-to-br ${m.bgColor} shadow-md flex flex-col md:flex-row items-center gap-4`}
            >
              <div className="absolute -left-9 top-4 bg-purple-600 rounded-full w-6 h-6 flex items-center justify-center text-white text-lg">
                {m.emoji}
              </div>
              <img
                src={m.image}
                alt={`${m.year} milestone`}
                className="w-24 h-24 object-cover rounded-lg shadow-lg"
              />
              <div className="text-center md:text-left">
                <h3 className="text-xl font-semibold text-white">
                  {m.year} – {m.title}
                </h3>
                <p className="text-white">{m.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
