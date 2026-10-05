"use client";

import { motion } from "motion/react";
import { reveal } from "./reveal";
import ClosingCountdown from "./ClosingContdown";

const float = (duration: number, delay = 0) => ({
  animate: { y: [0, -16, 0] },
  transition: {
    duration,
    delay,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
});

export default function ClosingText() {
  return (
    <div className="relative text-center">
      <motion.div {...reveal()}>
        <motion.h2
          {...float(3.5)}
          className="font-brand text-6xl uppercase leading-none tracking-wide text-white md:text-[10rem]"
        >
          See{" "}
          <span className="bg-linear-to-b from-green-300 to-green-600 bg-clip-text text-transparent">
            You
          </span>
        </motion.h2>
      </motion.div>

      <motion.div {...reveal(0.3)} className="mt-6">
        <motion.p
          {...float(4, 0.4)}
          className="font-brand -skew-x-6 bg-linear-to-b from-lime-300 via-green-400 to-emerald-600 bg-clip-text text-6xl uppercase tracking-widest text-transparent drop-shadow-[0_0_30px_rgba(34,197,94,0.8)] md:text-9xl"
        >
          23 October
        </motion.p>
      </motion.div>

      <motion.div {...reveal(0.6)} className="mt-10 md:mt-14">
        <ClosingCountdown />
      </motion.div>
    </div>
  );
}