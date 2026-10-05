import type { Variants } from "motion/react";

// Soft glow burst at the center when the explosion starts
export const burstVariants: Variants = {
  hide: { scale: 0.3, opacity: 0, transition: { duration: 0 } },
  show: {
    scale: [0.3, 2.5],
    opacity: [0.9, 0],
    transition: { duration: 1.2, ease: "easeOut" },
  },
};

// Shockwave ring when the poster snaps together
export const ringVariants = (delay: number): Variants => ({
  hide: { scale: 0, opacity: 0, transition: { duration: 0 } },
  show: {
    scale: [0, 4],
    opacity: [0.9, 0],
    transition: { duration: 1.1, delay, ease: "easeOut" },
  },
});

// Flash pulse at the moment of assembly
export const pulseVariants: Variants = {
  hide: { opacity: 0, transition: { duration: 0 } },
  show: {
    opacity: [0, 0.55, 0],
    transition: { duration: 0.7, delay: 1.8, times: [0, 0.2, 1] },
  },
};

// Green scan line sweeping down after assembly
export const scanVariants: Variants = {
  hide: { top: "-5%", opacity: 0, transition: { duration: 0 } },
  show: {
    top: ["-5%", "105%"],
    opacity: [0, 1, 1, 0],
    transition: { duration: 1.2, delay: 2, ease: "easeInOut" },
  },
};