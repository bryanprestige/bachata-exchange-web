import { motion } from "framer-motion";

export default function Loader({ message = "Loading..." }) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-800 text-yellow-400">
        <motion.div
          className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        />
        <span className="ml-4 text-xl font-semibold animate-pulse">{message}</span>
      </div>
    );
  }
  
