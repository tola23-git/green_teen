import type { Variants } from "motion/react";
import { team } from "@/data/team";

export const slides = [
  { ...team.leader, label: "Meet our team", bg: team.name, type: "TEAM LEADER" },
  ...team.members.map((member) => ({
    ...member,
    label: "Meet our team",
    bg: team.name,
    type: "MEMBER",
  })),
];

export type Slide = (typeof slides)[number];

export const textVariants: Variants = {
  enter: (dir: number) => ({ opacity: 0, y: 70 * dir, filter: "blur(12px)" }),
  center: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: "easeOut" },
  },
  exit: (dir: number) => ({
    opacity: 0,
    y: -70 * dir,
    filter: "blur(12px)",
    transition: { duration: 0.35 },
  }),
};

export const photoVariants: Variants = {
  enter: (dir: number) => ({ opacity: 0, x: 80 * dir, scale: 0.92 }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: -80 * dir,
    scale: 0.92,
    transition: { duration: 0.35 },
  }),
};