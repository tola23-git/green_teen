"use client";

import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type Variants,
} from "motion/react";
import { useRef, useState } from "react";
import { team } from "@/data/team";

const slides = [
  { ...team.leader, label: "Meet our team", bg: team.name, type: "TEAM LEADER" },
  ...team.members.map((member) => ({
    ...member,
    label: "Meet our team",
    bg: team.name,
    type: "MEMBER",
  })),
];

const textVariants: Variants = {
  enter: (dir: number) => ({ opacity: 0, y: 70 * dir, filter: "blur(12px)" }),
  center: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: "easeOut" },
  },
  exit: (dir: number) => ({
    opacity: 0,
    y: -70 * dir,
    filter: "blur(12px)",
    transition: { duration: 0.35 },
  }),
};

const photoVariants: Variants = {
  enter: (dir: number) => ({ opacity: 0, x: 80 * dir, scale: 0.92 }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: -80 * dir,
    scale: 0.92,
    transition: { duration: 0.35 },
  }),
};

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

  const slide = slides[index];
  const [firstName, ...restName] = slide.name.split(" ");

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

        {/* Big Background Text */}
        <motion.p
          style={{ x: bgTextX, WebkitTextStroke: "2px rgba(34,197,94,0.25)" }}
          className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 select-none whitespace-nowrap font-brand text-[16vw] uppercase leading-none text-transparent md:text-[22vw]"
        >
          {team.name}
        </motion.p>

        {/* Mobile-only label at the very top */}
        <div className="relative pt-4 md:hidden">
          <AnimatePresence mode="wait" custom={direction}>
            {inView && (
              <motion.div
                key={`mobile-label-${index}`}
                custom={direction}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex items-center gap-3"
              >
                <span className="h-[3px] w-8 bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.9)]" />
                <p className="font-tech text-sm font-semibold uppercase tracking-[0.25em] text-green-400">
                  {slide.label}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="relative mx-auto flex h-[calc(100%-3rem)] flex-col justify-center gap-6 md:grid md:h-full md:grid-cols-2 md:items-center md:gap-12">
          {/* Photo first on mobile, right on desktop */}
          <div className="relative order-1 flex justify-center md:order-2 md:justify-self-end">
            <div className="absolute inset-0 translate-x-4 translate-y-4 rotate-3 rounded-3xl border-2 border-green-500/60 md:translate-x-5 md:translate-y-5" />

            <AnimatePresence mode="wait" custom={direction}>
              {inView && (
                <motion.div
                  key={slide.image}
                  custom={direction}
                  variants={photoVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="relative"
                >
                  <img
                    src={slide.image}
                    alt={slide.name}
                    className="relative aspect-[4/5] h-[36vh] rounded-3xl object-cover shadow-[0_0_80px_rgba(34,197,94,0.35)] md:h-[68vh]"
                  />

                  <div className="absolute bottom-3 left-3 rounded-xl border border-green-400/40 bg-black/60 px-4 py-3 shadow-[0_0_40px_rgba(34,197,94,0.35)] backdrop-blur-md md:-bottom-8 md:-left-8 md:rounded-2xl md:px-8 md:py-5">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-green-300 md:text-xs md:tracking-[0.4em]">
                      {team.name}
                    </p>
                    <p className="mt-1 font-brand text-lg uppercase tracking-widest text-white md:text-3xl">
                      {slide.type}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Text second on mobile, left on desktop */}
          <div className="order-2 text-left md:order-1">
            <AnimatePresence mode="wait" custom={direction}>
              {inView && (
                <motion.div
                  key={index}
                  custom={direction}
                  variants={textVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  {/* Desktop-only label (unchanged from before) */}
                  <div className="hidden items-center gap-5 md:flex">
                    <span className="h-[3px] w-16 bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.9)]" />
                    <p className="font-tech text-xl font-semibold uppercase tracking-[0.3em] text-green-400 md:text-4xl">
                      {slide.label}
                    </p>
                  </div>

                  <h2 className="mt-4 font-brand text-4xl leading-none tracking-wide text-white md:mt-8 md:text-9xl">
                    {firstName}{" "}
                    <span className="bg-linear-to-b from-green-300 to-green-600 bg-clip-text text-transparent">
                      {restName.join(" ")}
                    </span>
                  </h2>

                  <div className="mt-3 flex items-center gap-3 md:mt-6 md:gap-5">
                    <span className="h-1 w-10 -skew-x-12 bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.9)] md:w-16" />
                    <p className="font-brand -skew-x-6 bg-linear-to-r from-green-300 via-green-400 to-green-600 bg-clip-text text-2xl uppercase tracking-widest text-transparent drop-shadow-[0_0_25px_rgba(34,197,94,0.8)] md:text-7xl">
                      {slide.role}
                    </p>
                  </div>

                  <p className="mt-4 max-w-md text-sm leading-relaxed text-gray-400 md:mt-8 md:text-lg">
                    {slide.description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}