"use client";

import { AnimatePresence, motion, type MotionValue } from "motion/react";
import { team } from "@/data/team";
import { photoVariants, type Slide } from "./teamShowcase";

type Props = {
  slide: Slide;
  direction: number;
  inView: boolean;
  mobileBgTextX: MotionValue<string>;
};

export default function TeamShowcasePhoto({
  slide,
  direction,
  inView,
  mobileBgTextX,
}: Props) {
  return (
    <div className="relative order-1 flex w-full justify-center md:w-auto md:order-2 md:justify-self-end">
      {/* Mobile-only background text, centered on the photo */}
      <motion.p
        style={{ x: mobileBgTextX, WebkitTextStroke: "2px rgba(34,197,94,0.9)" }}
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap font-brand text-[28vw] uppercase leading-none text-transparent opacity-90 drop-shadow-[0_0_18px_rgba(34,197,94,0.95)] md:hidden"
      >
        {team.name}
      </motion.p>

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
            className="relative z-10 md:z-auto"
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
  );
}