"use client";

import { motion } from "motion/react";
import { team } from "@/data/team";

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 60, filter: "blur(12px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: false, amount: 0.4 },
  transition: { duration: 1, delay, ease: "easeOut" as const },
});

export default function Closing() {
  return (
    <section className="relative z-10 flex min-h-screen items-center justify-center overflow-hidden bg-[#03200f] px-8 py-24">
      {/* Glow Effects */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-500/20 blur-[160px]" />

      {/* Big Background Text */}
      <p
        style={{ WebkitTextStroke: "2px rgba(34,197,94,0.2)" }}
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap font-brand text-[16vw] uppercase leading-none text-transparent md:text-[22vw]"
      >
        {team.name}
      </p>

      <div className="relative text-center">
        <motion.div
          {...reveal()}
          className="flex items-center justify-center gap-5"
        >
          <span className="h-[3px] w-10 bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.9)] md:w-16" />
          <p className="font-tech text-base font-semibold uppercase tracking-[0.3em] text-green-400 md:text-4xl">
            The end
          </p>
          <span className="h-[3px] w-10 bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.9)] md:w-16" />
        </motion.div>

        <motion.h2
          {...reveal(0.2)}
          className="mt-8 font-brand text-5xl uppercase leading-none tracking-wide text-white md:text-7xl md:text-[11rem]"
        >
          Thank{" "}
          <span className="bg-linear-to-b from-green-300 to-green-600 bg-clip-text text-transparent">
            You
          </span>
        </motion.h2>

        <motion.p
          {...reveal(0.4)}
          className="mt-6 font-tech text-lg uppercase tracking-[0.3em] text-gray-300 md:text-4xl"
        >
          For listening
        </motion.p>

        <motion.p {...reveal(0.6)} className="mt-12 text-base text-gray-400 md:text-lg">
          {team.name} · {team.game}
        </motion.p>
      </div>
    </section>
  );
}