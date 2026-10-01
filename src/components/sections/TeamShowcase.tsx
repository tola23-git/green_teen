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
  const mobileBgTextX = useTransform(scrollYProgress, [0, 1], ["1%", "-1%"]);

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
          style={{ x: mobileBgTextX, WebkitTextStroke: "2px rgba(34,197,94,0.9)" }}
          className="pointer-events-none absolute left-1/2 top-[37%] z-0 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap font-brand text-[28vw] uppercase leading-none text-transparent opacity-90 drop-shadow-[0_0_18px_rgba(34,197,94,0.95)] md:hidden"
        >
          {team.name}
        </motion.p>

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
          {/* Photo first on mobile, right on desktop */}
          <div className="relative order-1 flex w-full justify-center md:w-auto md:order-2 md:justify-self-end">
            <div className="absolute inset-0 hidden translate-x-5 translate-y-5 rotate-3 rounded-3xl border-2 border-green-500/60 md:block" />

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
                  <div className="absolute -inset-4 translate-y-1 rotate-2 rounded-[2rem] [clip-path:polygon(4%_0%,96%_0%,98%_2%,99%_5%,100%_10%,99%_20%,98%_35%,100%_50%,98%_65%,99%_80%,100%_90%,99%_95%,98%_98%,96%_100%,4%_100%,2%_98%,1%_95%,0%_90%,1%_80%,2%_65%,0%_50%,2%_35%,1%_20%,0%_10%,1%_5%,2%_2%)] border-2 border-green-500/60 md:hidden md:inset-0 md:translate-x-5 md:translate-y-5 md:rounded-3xl md:[clip-path:none]" />

                  <img
                    src={slide.image}
                    alt={slide.name}
                    className="relative z-10 aspect-[4/5] h-[min(71.25vw,304px)] w-[min(57vw,243px)] max-w-[calc(100vw_-_3rem)] [@media(max-height:600px)]:h-[71.25vw] [@media(max-height:600px)]:w-[57vw] rounded-[1.25rem] object-cover object-top shadow-[0_0_80px_rgba(34,197,94,0.35)] md:z-auto md:h-[68vh] md:w-auto md:max-w-none md:rounded-3xl md:object-center"
                  />

                  <div className="absolute bottom-3 left-3 z-20 rounded-xl border border-green-400/40 bg-black/60 px-4 py-3 shadow-[0_0_40px_rgba(34,197,94,0.35)] backdrop-blur-md md:-bottom-8 md:-left-8 md:rounded-2xl md:px-8 md:py-5">
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
          <div className="order-2 w-full text-center md:order-1 md:text-left">
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

                  <div className="mt-3 flex items-center justify-center gap-3 md:mt-6 md:justify-start md:gap-5">
                    <span className="h-1 w-10 -skew-x-12 bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.9)] md:w-16" />
                    <p className="font-brand -skew-x-6 bg-linear-to-r from-green-300 via-green-400 to-green-600 bg-clip-text text-2xl uppercase tracking-[0.16em] text-transparent drop-shadow-[0_0_25px_rgba(34,197,94,0.8)] md:text-7xl md:tracking-widest">
                      {slide.role}
                    </p>
                  </div>

                  <p className="mx-auto mt-4 max-w-[320px] text-sm leading-relaxed text-gray-400 md:mx-0 md:mt-8 md:max-w-md md:text-left md:text-lg">
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