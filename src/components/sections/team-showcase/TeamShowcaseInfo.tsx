"use client";

import { AnimatePresence, motion } from "motion/react";
import { laoFont } from "./laoFont";
import { textVariants, type Slide } from "./teamShowcase";

type Props = {
  slide: Slide;
  index: number;
  direction: number;
  inView: boolean;
};

export default function TeamShowcaseInfo({
  slide,
  index,
  direction,
  inView,
}: Props) {
  const [firstName, ...restName] = slide.name.split(" ");

  return (
    <div className="order-2 w-full text-center md:order-1 md:-translate-y-10 md:text-left">
      <AnimatePresence mode="wait" custom={direction}>
        {inView && (
          <motion.div
            key={index}
            custom={direction}
            variants={textVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="flex flex-col items-center md:items-start"
          >
            {/* Desktop-only label */}
            <div className="hidden items-center md:flex md:-translate-y-12">
              <p className="font-tech text-xl font-semibold uppercase tracking-[0.3em] text-green-400 md:text-4xl">
                {slide.label}
              </p>
            </div>

            {/* Name */}
            <h2 className="mt-6 -skew-x-6 font-brand text-5xl font-black italic uppercase leading-none tracking-wide text-white drop-shadow-[0_0_14px_rgba(34,197,94,0.4)] md:mt-8 md:skew-x-0 md:text-9xl md:font-normal md:not-italic md:drop-shadow-none">
              {firstName}
              {restName.length > 0 && (
                <>
                  {" "}
                  <span className="bg-linear-to-b from-green-300 to-green-600 bg-clip-text text-transparent">
                    {restName.join(" ")}
                  </span>
                </>
              )}
            </h2>

            {/* Divider (mobile only) */}
            <div className="mt-4 h-0.5 w-12 rounded-full bg-green-500 md:hidden" />

            {/* Caption with « » */}
            <p
              className={`${laoFont.className} mt-4 flex max-w-[320px] items-start justify-center gap-2 text-xl leading-relaxed text-green-300 md:mt-5 md:max-w-lg md:justify-start md:gap-3 md:text-3xl`}
            >
              <span
                aria-hidden="true"
                className="font-brand text-2xl leading-none text-green-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)] md:text-4xl"
              >
                «
              </span>
              <span>{slide.caption}</span>
              <span
                aria-hidden="true"
                className="font-brand text-2xl leading-none text-green-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)] md:text-4xl"
              >
                »
              </span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}