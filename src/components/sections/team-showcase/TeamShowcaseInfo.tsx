"use client";

import { AnimatePresence, motion } from "motion/react";
import { Fragment } from "react";
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

  // Split the role on "&" so the symbol can use a nicer font
  const roleParts = slide.role.split("&");

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

            {/* Role (replaces caption) */}
            <p className="mt-4 max-w-[320px] font-tech text-xl leading-relaxed text-green-300 md:mt-5 md:max-w-lg md:text-3xl">
              Role:{" "}
              {roleParts.map((part, i) => (
                <Fragment key={i}>
                  {i > 0 && (
                    <span className="mx-1 inline-block font-brand text-[1.15em] leading-none text-green-400">
                      &amp;
                    </span>
                  )}
                  {part.trim()}
                </Fragment>
              ))}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}