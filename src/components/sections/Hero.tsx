"use client";

import {
  AnimatePresence,
  motion,
  useInView,
  useScroll,
  useTransform,
} from "motion/react";
import { useCallback, useRef, useState } from "react";
import { team } from "@/data/team";
import IntroCountdown from "./hero/IntroCountdown";
import { burstVariants, pulseVariants } from "./hero/posterVariants";
import ExplodedPoster from "./hero/ExplodedPoster";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  const inView = useInView(stickyRef, { amount: 0.6 });

  // Poster animation starts only after the 3-2-1 intro finishes
  const [ready, setReady] = useState(false);
  const handleDone = useCallback(() => setReady(true), []);

  const state = inView && ready ? "show" : "hide";

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const bgColor = useTransform(
    scrollYProgress,
    [0, 1],
    ["#064e2b", "#03200f"],
  );

  const glowOpacity = useTransform(scrollYProgress, [0.2, 0.9], [0, 1]);

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.6]);
  const opacity = useTransform(scrollYProgress, [0.3, 1], [1, 0]);
  const radius = useTransform(scrollYProgress, [0, 1], [0, 48]);

  return (
    <motion.section
      ref={sectionRef}
      style={{ backgroundColor: bgColor }}
      className="relative h-[200vh]"
    >
      <div
        ref={stickyRef}
        className="sticky top-0 h-dvh overflow-hidden md:h-screen"
      >
        {/* Green glow behind the image */}
        <motion.div
          style={{ opacity: glowOpacity }}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-500/25 blur-[160px]"
        />

        {/* Intro countdown 3 2 1 */}
        <AnimatePresence>
          {!ready && (
            <IntroCountdown key="intro" active={inView} onDone={handleDone} />
          )}
        </AnimatePresence>

        <motion.div
          style={{ scale, opacity, borderRadius: radius }}
          className="relative h-full w-full overflow-hidden"
        >
          {/* Desktop-only background matching the poster colors */}
          <div className="pointer-events-none absolute inset-0 hidden md:block">
            <div className="absolute inset-0 bg-linear-to-b from-[#070c18] via-[#04140c] to-[#03200f]" />
            <div className="absolute left-1/2 top-[40%] h-[70vh] w-[55vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-500/30 blur-[140px]" />
            <div className="absolute -left-40 top-1/3 h-[500px] w-[500px] rounded-full bg-green-600/20 blur-[140px]" />
            <div className="absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-emerald-500/20 blur-[140px]" />
            <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(34,197,94,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.15)_1px,transparent_1px)] [background-size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
          </div>

          {/* 1. Glow burst at the start of the explosion */}
          <motion.div
            variants={burstVariants}
            initial="hide"
            animate={state}
            className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-400/60 blur-[100px]"
          />

          {/* 2. Exploded view: tiles fly in and assemble the poster */}
          <ExplodedPoster state={state} src={team.coverImage} alt={team.name} />

          {/* 3. Soft flash when assembled */}
          <motion.div
            variants={pulseVariants}
            initial="hide"
            animate={state}
            className="pointer-events-none absolute inset-0 z-20 bg-green-300"
          />
        </motion.div>
      </div>
    </motion.section>
  );
}