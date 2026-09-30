"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { team } from "@/data/team";
import type { Person } from "@/types/team";

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 40, filter: "blur(12px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: false, amount: 0.3 },
  transition: { duration: 1, delay, ease: "easeOut" as const },
});

type MemberRowProps = {
  member: Person;
  reverse: boolean;
};

function MemberRow({ member, reverse }: MemberRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const bgTextX = useTransform(
    scrollYProgress,
    [0, 1],
    reverse ? ["-10%", "10%"] : ["10%", "-10%"],
  );

  const [firstName, ...restName] = member.name.split(" ");

  return (
    <div
      ref={rowRef}
      className="relative flex min-h-screen items-center overflow-hidden px-6 py-16 md:px-24 md:py-24"
    >
      <div
        className={`pointer-events-none absolute top-1/4 h-[600px] w-[600px] rounded-full bg-green-500/20 blur-[140px] ${
          reverse ? "-left-40" : "-right-40"
        }`}
      />

      <motion.p
        style={{ x: bgTextX, WebkitTextStroke: "2px rgba(34,197,94,0.25)" }}
        className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 select-none whitespace-nowrap font-brand text-[16vw] uppercase leading-none text-transparent md:text-[22vw]"
      >
        {member.nickname}
      </motion.p>

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-8 md:grid md:grid-cols-2 md:items-center md:gap-16">
        <div className={`order-1 flex justify-center md:order-2 ${reverse ? "" : "md:justify-self-end"} ${reverse ? "md:order-1 md:justify-self-start" : ""}`}>
          <motion.div {...reveal(0.2)} className="relative">
            <motion.div style={{ y: imageY }} className="relative">
              <div
                className={`absolute inset-0 translate-y-4 rounded-3xl border-2 border-green-500/60 md:translate-y-5 ${
                  reverse ? "-translate-x-4 -rotate-3 md:-translate-x-5" : "translate-x-4 rotate-3 md:translate-x-5"
                }`}
              />

              <img
                src={member.image}
                alt={member.name}
                className="relative aspect-[4/5] h-[40vh] rounded-3xl object-cover shadow-[0_0_80px_rgba(34,197,94,0.35)] md:h-[520px] md:w-[400px]"
              />
            </motion.div>
          </motion.div>
        </div>

        <div className={`order-2 text-left ${reverse ? "md:order-2" : "md:order-1"}`}>
          <motion.div {...reveal()} className="flex items-center gap-3 md:gap-5">
            <span className="h-[3px] w-10 bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.9)] md:w-16" />
            <p className="font-tech text-sm font-semibold uppercase tracking-[0.25em] text-green-400 md:text-4xl md:tracking-[0.3em]">
              Meet the player
            </p>
          </motion.div>

          <motion.h2
            {...reveal(0.15)}
            className="mt-4 font-brand text-4xl leading-none tracking-wide text-white md:mt-8 md:text-9xl"
          >
            {firstName}{" "}
            <span className="bg-linear-to-b from-green-300 to-green-600 bg-clip-text text-transparent">
              {restName.join(" ")}
            </span>
          </motion.h2>

          <motion.div {...reveal(0.3)} className="mt-3 flex items-center gap-3 md:mt-6 md:gap-5">
            <span className="h-1 w-10 -skew-x-12 bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.9)] md:w-16" />
            <p className="font-brand -skew-x-6 bg-linear-to-r from-green-300 via-green-400 to-green-600 bg-clip-text text-2xl uppercase tracking-widest text-transparent drop-shadow-[0_0_25px_rgba(34,197,94,0.8)] md:text-7xl">
              {member.role}
            </p>
          </motion.div>

          <motion.p
            {...reveal(0.45)}
            className="mt-4 max-w-md text-sm leading-relaxed text-gray-400 md:mt-8 md:text-lg"
          >
            {member.description}
          </motion.p>
        </div>
      </div>
    </div>
  );
}

export default function Members() {
  return (
    <section className="relative z-10 bg-black">
      {team.members.map((member, index) => (
        <MemberRow key={member.name} member={member} reverse={index % 2 === 1} />
      ))}
    </section>
  );
}