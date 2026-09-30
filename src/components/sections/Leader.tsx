"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { team } from "@/data/team";

const reveal = (delay = 0) => ({
  initial: {
    opacity: 0,
    y: 60,
    filter: "blur(12px)",
  },
  whileInView: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  },
  viewport: {
    once: false,
    amount: 0.3,
  },
  transition: {
    duration: 0.8,
    delay,
    ease: "easeOut" as const,
  },
});

export default function Leader() {
  const leader = team.leader;

  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const bgTextX = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 min-h-screen overflow-hidden rounded-t-[3rem] bg-black px-6 py-20 md:px-24 md:py-24"
    >
      {/* glow */}
      <div className="pointer-events-none absolute -right-40 top-1/4 h-[450px] w-[450px] rounded-full bg-green-500/20 blur-[120px]" />

      <div className="pointer-events-none absolute -left-40 bottom-0 h-[350px] w-[350px] rounded-full bg-green-700/20 blur-[120px]" />

      {/* background text */}
      <motion.p
        style={{
          x: bgTextX,
          WebkitTextStroke: "2px rgba(34,197,94,0.25)",
        }}
        className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 whitespace-nowrap font-brand text-[18vw] uppercase text-transparent"
      >
        {team.name}
      </motion.p>

      <div className="relative mx-auto flex max-w-7xl flex-col gap-12 md:grid md:grid-cols-2 md:items-center md:gap-16">
        {/* TEXT */}
        <div className="order-2 text-left md:order-1">
          <motion.div {...reveal()} className="flex items-center gap-4">
            <span className="h-[3px] w-10 bg-green-500 md:w-16" />

            <p className="font-tech text-sm uppercase tracking-[0.25em] text-green-400 md:text-4xl">
              Meet our leader
            </p>
          </motion.div>

          <motion.h2
            {...reveal(0.15)}
            className="mt-5 font-brand text-5xl leading-none text-white md:text-9xl"
          >
            {leader.name.split(" ")[0]}{" "}
            <span className="bg-linear-to-b from-green-300 to-green-600 bg-clip-text text-transparent">
              {leader.name.split(" ").slice(1).join(" ")}
            </span>
          </motion.h2>

          <motion.div
            {...reveal(0.3)}
            className="mt-5 flex items-center gap-4"
          >
            <span className="h-1 w-10 bg-green-500" />

            <p className="font-brand text-3xl uppercase tracking-widest text-transparent bg-linear-to-r from-green-300 to-green-600 bg-clip-text md:text-7xl">
              {leader.role}
            </p>
          </motion.div>

          <motion.p
            {...reveal(0.45)}
            className="mt-6 max-w-md text-sm leading-relaxed text-gray-400 md:text-lg"
          >
            {leader.description}
          </motion.p>
        </div>

        {/* IMAGE */}
        <motion.div
          {...reveal(0.2)}
          className="order-1 flex justify-center md:order-2 md:justify-end"
        >
          <motion.div style={{ y: imageY }} className="relative">
            <div className="absolute inset-0 translate-x-4 translate-y-4 rotate-3 rounded-3xl border-2 border-green-500/60" />

            <img
              src={leader.image}
              alt={leader.name}
              className="relative h-[380px] w-[260px] rounded-3xl object-cover shadow-[0_0_80px_rgba(34,197,94,0.35)] md:h-[520px] md:w-[400px]"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}