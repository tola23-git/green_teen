export const textVariants = (delay: number) => ({
  hide: {
    opacity: 0,
    y: -60,
    filter: "blur(16px)",
    transition: { duration: 0.5 },
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1, delay, ease: "easeOut" as const },
  },
});

export const titleVariants = {
  hide: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.2 },
  },
};

// Impact slam: big + bright -> small + normal
export const letterVariants = {
  hide: {
    opacity: 0,
    scale: 2.5,
    y: -30,
    filter: "blur(12px) brightness(3)",
    transition: { duration: 0.3 },
  },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px) brightness(1)",
    transition: {
      scale: { type: "spring" as const, stiffness: 420, damping: 18 },
      y: { type: "spring" as const, stiffness: 420, damping: 18 },
      opacity: { duration: 0.2 },
      filter: { duration: 0.6 },
    },
  },
};

// Sharp slide-in from the side (skewed)
export const slideVariants = (delay: number) => ({
  hide: {
    opacity: 0,
    x: -100,
    skewX: -20,
    filter: "blur(8px)",
    transition: { duration: 0.3 },
  },
  show: {
    opacity: 1,
    x: 0,
    skewX: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  },
});

// Intro countdown number: pops in big, shrinks to normal, fades out
export const numberVariants = {
  enter: { opacity: 0, scale: 2.2, filter: "blur(14px)" },
  center: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const },
  },
  exit: {
    opacity: 0,
    scale: 0.6,
    filter: "blur(10px)",
    transition: { duration: 0.3, ease: "easeIn" as const },
  },
};