import { motion } from "framer-motion";

const milestones = [
  {
    year: "2021",
    title: "The Beginning",
    description: "We started with one dream, a handful of friends, and a lot of love for dance.",
    emoji: "🌱",
  },
  {
    year: "2022",
    title: "The Growth",
    description: "New venues, new faces, and more than double the energy. A real community was born.",
    emoji: "🚀",
  },
  {
    year: "2023",
    title: "The Impact",
    description: "Hundreds of hours of free classes, social impact, and a family that kept growing.",
    emoji: "🌍",
  },
  {
    year: "2024",
    title: "The Celebration",
    description: "Milestone events, international teachers, and dancers from all around the world.",
    emoji: "🎉",
  },
];

export default function MilestoneTimeline() {
  return (
    <section className="bg-black text-white py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-yellow-500 text-center mb-12">Our Milestones</h2>
        <div className="relative border-l-4 border-purple-600 pl-6 space-y-10">
          {milestones.map((milestone, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -left-8 top-1 bg-purple-600 rounded-full w-6 h-6 flex items-center justify-center text-white text-lg">
                {milestone.emoji}
              </div>
              <h3 className="text-xl font-semibold text-purple-200">{milestone.year} – {milestone.title}</h3>
              <p className="text-white text-base">{milestone.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
