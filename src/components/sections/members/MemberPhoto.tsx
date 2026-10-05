"use client";

import { motion, type MotionValue } from "motion/react";
import type { Person } from "@/types/team";
import { reveal } from "./reveal";

type Props = {
  member: Person;
  reverse: boolean;
  imageY: MotionValue<number>;
};

export default function MemberPhoto({ member, reverse, imageY }: Props) {
  return (
    <motion.div
      {...reveal(0.2)}
      className={`order-1 flex w-full justify-center ${
        reverse ? "md:order-1" : "md:order-2"
      }`}
    >
      <motion.div style={{ y: imageY }} className="relative">
        <div
          className={`absolute inset-0 translate-y-4 rounded-3xl border border-green-500/60 md:translate-y-5 ${
            reverse ? "-translate-x-4 -rotate-3" : "translate-x-4 rotate-3"
          }`}
        />

        <img
          src={member.image}
          alt={member.name}
          className="relative h-[420px] w-[280px] rounded-3xl object-cover object-top shadow-[0_0_80px_rgba(34,197,94,0.35)] md:h-[520px] md:w-[400px]"
        />
      </motion.div>
    </motion.div>
  );
}