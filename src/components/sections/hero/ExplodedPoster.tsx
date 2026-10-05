"use client";

import { motion, type Variants } from "motion/react";

const COLS = 6;
const ROWS = 6;

// Deterministic pseudo-random, rounded so server and client always match
const rand = (n: number) => {
  const s = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return Math.round((s - Math.floor(s)) * 1000) / 1000;
};

const round = (n: number) => Math.round(n);

type Tile = {
  col: number;
  row: number;
  x: number;
  y: number;
  z: number;
  rx: number;
  ry: number;
  rz: number;
  delay: number;
};

const tiles: Tile[] = Array.from({ length: COLS * ROWS }, (_, i) => {
  const col = i % COLS;
  const row = Math.floor(i / COLS);
  const dx = col - (COLS - 1) / 2;
  const dy = row - (ROWS - 1) / 2;
  const dist = Math.hypot(dx, dy);

  return {
    col,
    row,
    x: round(dx * 140 + (rand(i) - 0.5) * 220),
    y: round(dy * 140 + (rand(i + 100) - 0.5) * 220),
    z: round((rand(i + 200) - 0.3) * 700),
    rx: round((rand(i + 300) - 0.5) * 180),
    ry: round((rand(i + 400) - 0.5) * 180),
    rz: round((rand(i + 500) - 0.5) * 120),
    delay: Math.round((dist * 0.07 + rand(i + 600) * 0.25) * 100) / 100,
  };
});

// Fixed values (no long decimals) so SSR and client output are identical
const TILE_W = "16.67%";
const TILE_H = "16.67%";
const POS_STEPS = [0, 20, 40, 60, 80, 100];
const LEFT_STEPS = ["0%", "16.67%", "33.33%", "50%", "66.67%", "83.33%"];
const TOP_STEPS = LEFT_STEPS;

// Each tile flies from its exploded position back into place
const tileVariants: Variants = {
  hide: (t: Tile) => ({
    opacity: 0,
    x: t.x,
    y: t.y,
    z: t.z,
    rotateX: t.rx,
    rotateY: t.ry,
    rotateZ: t.rz,
    scale: 0.6,
    transition: { duration: 0 },
  }),
  show: (t: Tile) => ({
    opacity: 1,
    x: 0,
    y: 0,
    z: 0,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    scale: 1,
    transition: {
      duration: 1.1,
      delay: t.delay,
      ease: [0.22, 1, 0.36, 1],
      opacity: { duration: 0.3, delay: t.delay },
    },
  }),
};

// Tiles layer fades out slowly so it blends into the feathered poster
const layerVariants: Variants = {
  hide: { opacity: 1, transition: { duration: 0 } },
  show: { opacity: 0, transition: { duration: 0.6, delay: 1.8 } },
};

// Final full poster (sharp, feathered edges)
const finalVariants: Variants = {
  hide: { opacity: 0, transition: { duration: 0 } },
  show: { opacity: 1, transition: { duration: 0.8, delay: 1.6 } },
};

// Desktop: radial feather (no rectangle edges at all)
const FEATHER =
  "md:[mask-image:radial-gradient(ellipse_72%_72%_at_50%_50%,black_55%,transparent_100%)]";

type Props = {
  state: "show" | "hide";
  src: string;
  alt: string;
};

export default function ExplodedPoster({ state, src, alt }: Props) {
  return (
    <div className="absolute inset-x-0 top-1/2 w-full -translate-y-1/2 md:left-1/2 md:right-auto md:top-4 md:h-[calc(100%-2rem)] md:w-auto md:-translate-x-1/2 md:translate-y-0">
      {/* Desktop-only: soft green glow behind the poster (no hard edges) */}
      <motion.div
        variants={finalVariants}
        initial="hide"
        animate={state}
        className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[85%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-500/30 blur-[120px] md:block"
      />

      {/* Final poster: also defines the size of the wrapper */}
      <motion.img
        src={src}
        alt={alt}
        variants={finalVariants}
        initial="hide"
        animate={state}
        className={`relative block w-full [mask-image:linear-gradient(to_bottom,transparent,black_8%,black_60%,rgba(0,0,0,0.55)_100%)] md:h-full md:w-auto md:max-w-none ${FEATHER}`}
      />

      {/* Exploded tiles */}
      <motion.div
        variants={layerVariants}
        initial="hide"
        animate={state}
        style={{ perspective: 1000 }}
        className={`pointer-events-none absolute inset-0 md:overflow-visible ${FEATHER}`}
      >
        {tiles.map((t, i) => (
          <motion.div
            key={i}
            custom={t}
            variants={tileVariants}
            initial="hide"
            animate={state}
            style={{
              left: LEFT_STEPS[t.col],
              top: TOP_STEPS[t.row],
              width: TILE_W,
              height: TILE_H,
              backgroundImage: `url(${src})`,
              backgroundSize: "600% 600%",
              backgroundPosition: `${POS_STEPS[t.col]}% ${POS_STEPS[t.row]}%`,
            }}
            className="absolute shadow-[0_0_20px_rgba(74,222,128,0.35)]"
          />
        ))}
      </motion.div>
    </div>
  );
}