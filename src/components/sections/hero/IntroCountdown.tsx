"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { numberVariants } from "./textVariants";

type Props = {
  active: boolean;
  onDone: () => void;
};

export default function IntroCountdown({ active, onDone }: Props) {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (!active) return;

    setCount(3);
    const t1 = setTimeout(() => setCount(2), 1000);
    const t2 = setTimeout(() => setCount(1), 2000);
    const t3 = setTimeout(onDone, 3000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [active, onDone]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center"
    >
      <div className="absolute h-[320px] w-[320px] rounded-full bg-green-500/30 blur-[110px] md:h-[500px] md:w-[500px]" />

      <AnimatePresence mode="wait">
        <motion.span
          key={count}
          variants={numberVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="relative -skew-x-6 bg-linear-to-b from-white via-green-300 to-green-500 bg-clip-text font-brand text-[10rem] leading-none text-transparent drop-shadow-[0_0_35px_rgba(34,197,94,0.9)] md:text-[20rem]"
        >
          {count}
        </motion.span>
      </AnimatePresence>
    </motion.div>
  );
}