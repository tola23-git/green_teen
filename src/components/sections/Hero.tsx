"use client";

import { team } from "@/data/team";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef, useState } from "react";

const textVariants = (delay: number) => ({
  hide: {
    opacity: 0,
    y: -60,
    filter: "blur(16px)",
    transition: { duration: 0.5 },
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1, delay, ease: "easeOut" as const },
  },
});

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [showText, setShowText] = useState(true);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setShowText(value < 0.1);
  });

  const bgColor = useTransform(
    scrollYProgress,
    [0, 1],
    ["#000000", "#03200f"],
  );

  const glowOpacity = useTransform(scrollYProgress, [0.2, 0.9], [0, 1]);

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.6]);
  const opacity = useTransform(scrollYProgress, [0.3, 1], [1, 0]);
  const radius = useTransform(scrollYProgress, [0, 1], [0, 48]);

  const state = showText ? "show" : "hide";

  return (
    <motion.section
      ref={sectionRef}
      style={{ backgroundColor: bgColor }}
      className="relative h-[200vh]"
    >
      <div className="sticky top-0 h-[70vh] overflow-hidden md:h-screen">
        {/* Green glow behind the image */}
        <motion.div
          style={{ opacity: glowOpacity }}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-500/25 blur-[160px]"
        />

        <motion.div
          style={{ scale, opacity, borderRadius: radius }}
          className="relative h-full w-full overflow-hidden"
        >
          <img
            src={team.coverImage}
            alt={team.name}
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-linear-to-t from-green-950/90 via-green-950/20 to-transparent" />

          <div className="relative z-10 flex h-full flex-col items-center justify-end pb-8 text-center md:pb-[3vw]">
            <motion.h1
              variants={textVariants(0.1)}
              initial="hide"
              animate={state}
              className="
                font-brand
                text-5xl
                md:text-[11vw]
                leading-none
                tracking-wider
                -skew-x-6
                bg-linear-to-b from-white via-green-300 to-green-500
                bg-clip-text text-transparent
                drop-shadow-[0_0_25px_rgba(34,197,94,0.8)]
              "
            >
              {team.name}
            </motion.h1>

            <motion.div
              variants={textVariants(0.5)}
              initial="hide"
              animate={state}
              className="mt-3 flex items-center gap-3 md:mt-[1.5vw] md:gap-[1.5vw]"
            >
              <span className="h-px w-8 bg-green-400 md:w-[6vw]" />
              <p className="font-tech text-xs tracking-wider text-white md:text-[2.2vw]">
                {team.game}
              </p>
              <span className="h-px w-8 bg-green-400 md:w-[6vw]" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}