"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import type { Person } from "@/types/team";
import MemberInfo from "./MemberInfo";
import MemberPhoto from "./MemberPhoto";

type Props = {
  member: Person;
  reverse: boolean;
};

export default function MemberRow({ member, reverse }: Props) {
  const rowRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const bgTextX = useTransform(
    scrollYProgress,
    [0, 1],
    reverse ? ["-10%", "10%"] : ["10%", "-10%"],
  );

  return (
    <section
      ref={rowRef}
      className="relative min-h-screen overflow-hidden px-6 py-20 md:px-24"
    >
      {/* glow */}
      <div
        className={`pointer-events-none absolute top-1/4 h-[350px] w-[350px] rounded-full bg-green-500/20 blur-[120px] md:h-[600px] md:w-[600px] ${
          reverse ? "-left-40" : "-right-40"
        }`}
      />

      {/* background name */}
      <motion.p
        style={{ x: bgTextX, WebkitTextStroke: "1px rgba(34,197,94,0.25)" }}
        className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 whitespace-nowrap font-brand text-[25vw] uppercase text-transparent md:text-[22vw]"
      >
        {member.nickname}
      </motion.p>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-12 md:grid md:grid-cols-2 md:gap-16">
        <MemberPhoto member={member} reverse={reverse} imageY={imageY} />
        <MemberInfo member={member} reverse={reverse} />
      </div>
    </section>
  );
}