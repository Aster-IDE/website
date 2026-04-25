"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

interface Petal {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  sway: number;
  variant: number;
}

function mulberry32(seed: number) {
  return function() {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function generatePetals(count: number, seed = 12345): Petal[] {
  const rand = mulberry32(seed);
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: rand() * 100,
    size: rand() * 12 + 8,
    duration: rand() * 8 + 12,
    delay: rand() * 10,
    sway: rand() * 40 - 20,
    variant: Math.floor(rand() * 4),
  }));
}

function PetalShape({ size, variant }: { size: number; variant: number }) {
  const paths = [
    "M2 12C6 6 14 4 20 8C24 11 24 17 19 21C13 25 5 22 2 12Z",
    "M3 4H16C21 4 24 8 22 13C19 20 10 23 4 19C1 17 0 12 1 9C1 7 2 5 3 4Z",
    "M2 10C6 5 13 4 18 8C22 11 22 17 18 21C13 25 6 22 2 16C1 14 1 12 2 10Z",
    "M2 13C7 7 14 5 20 9L15 13L20 17C14 22 7 24 2 18Z",
  ];

  const path = paths[variant] ?? paths[0];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 32"
      fill="none"
    >
      <path d={path} fill="#EA7C96" fillOpacity="0.82" />
    </svg>
  );
}

export default function CherryBlossom({ count = 20 }: { count?: number }) {
  const petals = useMemo(() => generatePetals(count, 12345), [count]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute top-0"
          style={{ left: `${petal.x}%` }}
          initial={{ y: -50, x: 0, rotate: 0, opacity: 0 }}
          animate={{
            y: ["0vh", "110vh"],
            x: [0, petal.sway, -petal.sway / 2, petal.sway / 2, 0],
            rotate: [0, 360, 720, 1080, 1440],
            opacity: [0, 1, 1, 1, 0],
          }}
          transition={{
            y: {
              duration: petal.duration,
              repeat: Infinity,
              delay: petal.delay,
              ease: "linear",
            },
            x: {
              duration: petal.duration,
              repeat: Infinity,
              delay: petal.delay,
              ease: "easeInOut",
            },
            rotate: {
              duration: petal.duration,
              repeat: Infinity,
              delay: petal.delay,
              ease: "linear",
            },
            opacity: {
              duration: petal.duration,
              repeat: Infinity,
              delay: petal.delay,
              times: [0, 0.05, 0.5, 0.95, 1],
            },
          }}
        >
          <PetalShape size={petal.size} variant={petal.variant} />
        </motion.div>
      ))}
    </div>
  );
}
