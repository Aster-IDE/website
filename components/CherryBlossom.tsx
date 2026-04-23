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
  }));
}

function PetalShape({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 24"
      fill="currentColor"
      className="text-[#FFB7C5]/50"
    >
      <path d="M8 2 C8 2, 2 8, 2 15 C2 20, 6 22, 8 23 C10 22, 14 20, 14 15 C14 8, 8 2, 8 2 Z" />
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
          <PetalShape size={petal.size} />
        </motion.div>
      ))}
    </div>
  );
}
