"use client";

import { motion } from "motion/react";

const embers = Array.from({ length: 22 }, (_, i) => ({
  left: (i * 47) % 100,
  size: 3 + (i % 4) * 2,
  duration: 4 + (i % 5),
  delay: (i % 7) * 0.7,
  rise: 350 + (i % 6) * 70,
}));

export default function Embers() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {embers.map((e, i) => (
        <motion.span
          key={i}
          style={{ left: `${e.left}%`, width: e.size, height: e.size }}
          className="absolute bottom-0 rounded-full bg-green-400 shadow-[0_0_12px_4px_rgba(74,222,128,0.8)]"
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: -e.rise, opacity: [0, 1, 0] }}
          transition={{
            duration: e.duration,
            delay: e.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}