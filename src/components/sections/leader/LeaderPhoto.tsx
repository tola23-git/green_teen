"use client";

import { motion, type MotionValue } from "motion/react";
import type { Person } from "@/types/team";
import { reveal } from "./reveal";

type Props = {
  leader: Person;
  imageY: MotionValue<number>;
};

export default function LeaderPhoto({ leader, imageY }: Props) {
  return (
    <motion.div
      {...reveal(0.2)}
      className="relative justify-self-center md:justify-self-end"
    >
      <motion.div style={{ y: imageY }} className="relative">
        <div className="absolute inset-0 translate-x-5 translate-y-5 rotate-3 rounded-3xl border-2 border-green-500/60" />

        <img
          src={leader.image}
          alt={leader.name}
          className="relative aspect-[4/5] w-[70vw] max-w-[400px] rounded-3xl object-cover shadow-[0_0_80px_rgba(34,197,94,0.35)] md:h-[520px] md:w-[400px]"
        />
      </motion.div>
    </motion.div>
  );
}