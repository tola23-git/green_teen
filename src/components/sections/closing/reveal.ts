export const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 60, filter: "blur(12px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: false, amount: 0.4 },
  transition: { duration: 1, delay, ease: "easeOut" as const },
});