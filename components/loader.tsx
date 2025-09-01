"use client";

import { motion } from "framer-motion";
import { Leaf } from "lucide-react";

interface FullLoaderProps {
  message?: string;
}

export function FullLoader({ message = "Loading..." }: FullLoaderProps) {
  // 🌟 Change these values if you want
  const count = 12;  // 🔧 number of orbiting leaves
  const speed = 1;  // 🔧 base speed (seconds per rotation, lower = faster)
  const radius = 50; // 🔧 orbit distance from center

  // Generate angles dynamically based on count
  const angles = Array.from({ length: count }, (_, i) => (360 / count) * i);

  return (
    <div
      className="
        min-h-[calc(100dvh-4rem)] flex flex-col items-center justify-center
        bg-gradient-to-br from-green-50 via-white to-green-100
        dark:bg-gradient-to-br dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900
        relative overflow-hidden
      "
    >
      {/* Glowing center aura */}
      <motion.div
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-28 h-28 rounded-full bg-green-300 dark:bg-green-800 blur-3xl opacity-40"
      />

      <div className="relative w-48 h-48 flex items-center justify-center">
        {/* Orbiting leaves */}
        {angles.map((deg, i) => (
          <motion.div
            key={i}
            className="absolute left-.4 top-0.3"
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: speed + i,
              ease: "linear",
            }}
            style={{ transform: `translate(-50%, -50%) rotate(${deg}deg)` }}
          >
            {/* Push leaf outward by radius */}
            <div style={{ transform: `translateX(${radius}px)` }}>
              <Leaf className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
          </motion.div>
        ))}

        {/* Central leaf */}
        <motion.div
          animate={{ rotate: [-10, 10, -10] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="p-4 rounded-full bg-green-100 dark:bg-zinc-800 shadow-lg relative z-10"
        >
          <Leaf className="w-10 h-10 text-green-700 dark:text-green-300" />
        </motion.div>
      </div>

      {/* Loading text */}
      <motion.p
        initial={{ opacity: 0.3 }}
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="mt-8 text-green-800 dark:text-green-400 text-lg font-bold tracking-wide flex items-center gap-2"
      >
        {message}
        <Leaf className="w-5 h-5 text-green-600 dark:text-green-400" />
      </motion.p>
    </div>
  );
}
