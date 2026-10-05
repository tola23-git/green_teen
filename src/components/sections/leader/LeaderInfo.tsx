"use client";

import { motion } from "motion/react";
import type { Person } from "@/types/team";
import { reveal } from "./reveal";

type Props = {
  leader: Person;
};

export default function LeaderInfo({ leader }: Props) {
  return (
    <div className="text-left">
      <motion.div {...reveal()} className="flex items-center gap-4 md:gap-5">
        <span className="h-[3px] w-10 bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.9)] md:w-16" />
        <p className="font-tech text-lg font-semibold uppercase tracking-[0.3em] text-green-400 md:text-4xl">
          Meet our leader team
        </p>
      </motion.div>

      <motion.h2
        {...reveal(0.15)}
        className="mt-6 font-brand text-5xl leading-none tracking-wide text-white md:mt-8 md:text-9xl"
      >
        {leader.name.split(" ")[0]}{" "}
        <span className="bg-linear-to-b from-green-300 to-green-600 bg-clip-text text-transparent">
          {leader.name.split(" ").slice(1).join(" ")}
        </span>
      </motion.h2>

      <motion.div
        {...reveal(0.3)}
        className="mt-4 flex items-center gap-4 md:mt-6 md:gap-5"
      >
        <span className="h-1 w-10 -skew-x-12 bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.9)] md:w-16" />
        <p className="font-brand text-3xl uppercase tracking-widest -skew-x-6 bg-linear-to-r from-green-300 via-green-400 to-green-600 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(34,197,94,0.8)] md:text-7xl">
          {leader.role}
        </p>
      </motion.div>

      <motion.p
        {...reveal(0.45)}
        className="mt-6 max-w-md text-base leading-relaxed text-gray-400 md:mt-8 md:text-lg"
      >
        {leader.caption}
      </motion.p>
    </div>
  );
}