"use client";

import { motion } from "motion/react";
import { team } from "@/data/team";
import ClosingText from "./closing/ClosingText";
import Embers from "./closing/Embers";

export default function Closing() {
  return (
    <section className="relative z-10 flex min-h-screen items-center justify-center overflow-hidden bg-[#020a04] px-8 py-24">
      {/* Green fire glow from the bottom */}
      <motion.div
        className="pointer-events-none absolute -bottom-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-green-600/50 blur-[160px]"
        animate={{ opacity: [0.5, 1, 0.6, 0.9, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -bottom-32 left-1/2 h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-lime-400/40 blur-[120px]"
        animate={{ opacity: [0.9, 0.4, 1, 0.5, 0.9] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Top glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-green-500/15 blur-[160px]" />

      {/* Big Background Text */}
      <p
        style={{ WebkitTextStroke: "2px rgba(34,197,94,0.25)" }}
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap font-brand text-[16vw] uppercase leading-none text-transparent md:text-[22vw]"
      >
        {team.name}
      </p>

      <Embers />

      <ClosingText />
    </section>
  );
}