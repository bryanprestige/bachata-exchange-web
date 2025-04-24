import { motion } from "framer-motion";

export default function UpcomingEventCard({ date, title, teachers, location, note }) {
    return (
        <motion.div
        className="bg-gray-900 rounded-2xl shadow-lg p-6 text-white max-w-4xl mx-auto mb-8"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="bg-gray-800 rounded-2xl shadow-lg p-6 text-white max-w-4xl mx-auto mb-8">
            <h3 className="text-yellow-400 text-xl font-semibold mb-2">{title}</h3>
            <p className="text-sm text-white mb-2">{new Date(date).toDateString()} | {location}</p>
    
            <div className="grid grid-cols-1 sm:grid-cols-3 my-4">
            {teachers.map((t, i) => (
                <div key={i} className="flex flex-col items-center gap-4 bg-gray-800 p-3 rounded-xl">
                <img
                    src={t.image}
                    alt={t.name}
                    className="w90 h-80 rounded-2 object-cover border-2 border-yellow-500"
                />
                <div>
                    <p className="font-semibold text-yellow-500">{t.name}</p>
                    <p className="text-sm text-white">{t.level}</p>
                </div>
                </div>
            ))}
            </div>
    
            {note && <p className="text-sm italic text-white">{note}</p>}
        </div>
      </motion.div>
    );
  }
  