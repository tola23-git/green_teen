"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { team } from "@/data/team";

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 80, filter: "blur(15px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: false, amount: 0.5 },
  transition: { duration: 0.8, delay, ease: "easeOut" as const },
});

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
        {/* Left: text */}
        <div className="text-left">
          <motion.div {...reveal()} className="flex items-center gap-4 md:gap-5">
            <span className="h-[3px] w-10 bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.9)] md:w-16" />
            <p className="font-tech text-lg font-semibold uppercase tracking-[0.3em] text-green-400 md:text-4xl">
              Meet our leader team
            </p>
          </motion.div>

          <motion.h2
            {...reveal(0.15)}
            className="mt-6 font-brand text-5xl leading-none tracking-wide text-white md:mt-8 md:text-9xl"
          >
            {leader.name.split(" ")[0]}{" "}
            <span className="bg-linear-to-b from-green-300 to-green-600 bg-clip-text text-transparent">
              {leader.name.split(" ").slice(1).join(" ")}
            </span>
          </motion.h2>

          <motion.div {...reveal(0.3)} className="mt-4 flex items-center gap-4 md:mt-6 md:gap-5">
            <span className="h-1 w-10 -skew-x-12 bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.9)] md:w-16" />
            <p
              className="
                font-brand
                text-3xl md:text-7xl
                uppercase
                tracking-widest
                -skew-x-6
                bg-linear-to-r from-green-300 via-green-400 to-green-600
                bg-clip-text text-transparent
                drop-shadow-[0_0_25px_rgba(34,197,94,0.8)]
              "
            >
              {leader.role}
            </p>
          </motion.div>

          <motion.p
            {...reveal(0.45)}
            className="mt-6 max-w-md text-base leading-relaxed text-gray-400 md:mt-8 md:text-lg"
          >
            {leader.description}
          </motion.p>
        </div>

        {/* Right: photo */}
        <motion.div
          {...reveal(0.2)}
          className="relative justify-self-center md:justify-self-end"
        >
          <motion.div style={{ y: imageY }} className="relative">
            <div className="absolute inset-0 translate-x-5 translate-y-5 rotate-3 rounded-3xl border-2 border-green-500/60" />

            <img
              src={leader.image}
              alt={leader.name}
              className="relative aspect-[4/5] w-[70vw] max-w-[400px] rounded-3xl object-cover shadow-[0_0_80px_rgba(34,197,94,0.35)] md:h-[520px] md:w-[400px]"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}