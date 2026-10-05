"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { team } from "@/data/team";
import LeaderInfo from "./leader/LeaderInfo";
import LeaderPhoto from "./leader/LeaderPhoto";

export default function Leader() {
  const leader = team.leader;
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const bgTextX = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 -mt-[100vh] min-h-screen overflow-hidden rounded-t-[3rem] bg-black px-6 py-24 md:px-24"
    >
      {/* Green glow */}
      <div className="pointer-events-none absolute -right-40 top-1/4 h-[600px] w-[600px] rounded-full bg-green-500/20 blur-[140px]" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-green-700/20 blur-[120px]" />

      {/* Giant outline text (team name) */}
      <motion.p
        style={{ x: bgTextX, WebkitTextStroke: "2px rgba(34,197,94,0.25)" }}
        className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 select-none whitespace-nowrap font-brand text-[16vw] uppercase leading-none text-transparent md:text-[20vw]"
      >
        {team.name}
      </motion.p>

      <div className="relative mx-auto grid min-h-[80vh] max-w-7xl items-center gap-10 md:grid-cols-2 md:gap-16">
        <LeaderInfo leader={leader} />
        <LeaderPhoto leader={leader} imageY={imageY} />
      </div>
    </section>
  );
}