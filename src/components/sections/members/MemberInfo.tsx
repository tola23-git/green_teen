"use client";

import { motion } from "motion/react";
import type { Person } from "@/types/team";
import { reveal } from "./reveal";

type Props = {
  member: Person;
  reverse: boolean;
};

export default function MemberInfo({ member, reverse }: Props) {
  const [firstName, ...restName] = member.name.split(" ");

  return (
    <div
      className={`order-2 w-full text-left ${
        reverse ? "md:order-2" : "md:order-1"
      }`}
    >
      <motion.div {...reveal()} className="flex items-center gap-3">
        <span className="h-[3px] w-10 bg-green-500" />
        <p className="font-tech text-sm uppercase tracking-[0.25em] text-green-400 md:text-4xl">
          Meet the player
        </p>
      </motion.div>

      <motion.h2
        {...reveal(0.15)}
        className="mt-5 font-brand text-5xl leading-none text-white md:text-9xl"
      >
        {firstName}{" "}
        <span className="bg-linear-to-b from-green-300 to-green-600 bg-clip-text text-transparent">
          {restName.join(" ")}
        </span>
      </motion.h2>

      <motion.div {...reveal(0.3)} className="mt-5 flex items-center gap-3">
        <span className="h-1 w-10 bg-green-500" />
        <p className="font-tech text-xl font-semibold tracking-widest md:text-5xl">
          <span className="text-green-400">Role:</span>{" "}
          <span className="text-white">{member.role}</span>
        </p>
      </motion.div>
    </div>
  );
}