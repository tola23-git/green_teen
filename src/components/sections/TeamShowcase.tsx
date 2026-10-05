"use client";

import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef, useState } from "react";
import { team } from "@/data/team";
import { slides, textVariants } from "./team-showcase/teamShowcase";
import TeamShowcaseInfo from "./team-showcase/TeamShowcaseInfo";
import TeamShowcasePhoto from "./team-showcase/TeamShowcasePhoto";

export default function TeamShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const total = slides.length;

  const [[index, direction], setPage] = useState<[number, number]>([0, 1]);

  const inView = useInView(stickyRef, { amount: 0.6 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = Math.min(total - 1, Math.floor(value * total));
    setPage((prev) =>
      prev[0] === next ? prev : [next, next > prev[0] ? 1 : -1],
    );
  });

  const bgTextX = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const mobileBgTextX = useTransform(scrollYProgress, [0, 1], ["1%", "-1%"]);

  const slide = slides[index];

  return (
    <section
      ref={sectionRef}
      style={{ height: `${total * 100}vh` }}
      className="relative z-10 -mt-[100vh] rounded-t-[3rem] bg-[#03200f]"
    >
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen overflow-hidden px-6 py-6 md:px-24 md:py-0"
      >
        {/* Glow Effects */}
        <div className="pointer-events-none absolute -right-40 top-1/4 h-[600px] w-[600px] rounded-full bg-green-500/20 blur-[140px]" />
        <div className="pointer-events-none absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-green-700/20 blur-[120px]" />

        {/* Big Background Text (desktop only; mobile one lives in the photo) */}
        <motion.p
          style={{ x: bgTextX, WebkitTextStroke: "2px rgba(34,197,94,0.25)" }}
          className="pointer-events-none absolute left-0 top-1/2 hidden -translate-y-1/2 select-none whitespace-nowrap font-brand text-[16vw] uppercase leading-none text-transparent md:block md:text-[22vw]"
          aria-hidden="true"
        >
          {team.name}
        </motion.p>

        {/* Mobile-only label at the very top */}
        <div className="relative flex justify-center pt-[calc(1rem_+_6svh)] [@media(max-height:600px)]:pt-4 md:hidden">
          <AnimatePresence mode="wait" custom={direction}>
            {inView && (
              <motion.div
                key={`mobile-label-${index}`}
                custom={direction}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex items-center justify-center gap-3"
              >
                <span className="h-[3px] w-8 bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.9)]" />
                <p className="font-tech text-sm font-semibold uppercase tracking-[0.25em] text-green-400">
                  {slide.label}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="relative z-10 mx-auto flex h-[calc(100%-3rem)] flex-col items-center justify-start gap-5 pt-[clamp(2rem,6svh,3rem)] [@media(max-height:600px)]:pt-[clamp(1.5rem,5svh,2rem)] md:z-auto md:grid md:h-full md:grid-cols-2 md:items-center md:justify-center md:gap-12 md:pt-0">
          <TeamShowcasePhoto
            slide={slide}
            direction={direction}
            inView={inView}
            mobileBgTextX={mobileBgTextX}
          />
          <TeamShowcaseInfo
            slide={slide}
            index={index}
            direction={direction}
            inView={inView}
          />
        </div>
      </div>
    </section>
  );
}