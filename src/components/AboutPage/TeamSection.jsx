import { motion } from "framer-motion";

const team = [
    { name: "Catherine", role: "Lead Director", image: "https://i.pravatar.cc/150?img=10" },
    { name: "Rebekha", role: "Event Coordinator", image: "https://i.pravatar.cc/150?img=16" },
    { name: "Chino", role: "Music Manager", image: "https://i.pravatar.cc/150?img=11" },
    { name: "Bryan Herrera", role: "Tech Lead", image: "https://i.pravatar.cc/150?img=13" }
  ]

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut"
    }
  })
};

export default function TeamSection() {
  return (
    <section className="bg-blue-100 py-20 px-6">
      <h2 className="text-3xl font-bold text-yellow-500 text-center mb-12">Meet Our Team</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-5xl mx-auto">
        {team.map((person, i) => (
          <motion.div
            key={i}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={itemVariants}
            className="bg-gray-800 rounded-xl p-6 text-center shadow-lg hover:shadow-2xl transition"
          >
            <img
              src={person.image}
              alt={person.name}
              className="w-32 h-32 mx-auto mb-4 object-cover rounded-full border-4 border-yellow-400"
            />
            <h3 className="text-xl font-semibold text-purple-200">{person.name}</h3>
            <p className="text-yellow-500">{person.role}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
