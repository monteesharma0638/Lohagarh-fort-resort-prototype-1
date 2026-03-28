"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function TrainAnimation({ children }: { children: ReactNode }) {
  return (
    <div className="relative overflow-hidden">

      {/* 🚂 TRAIN SVG */}
      <motion.div
        initial={{ x: "120%" }}
        whileInView={{ x: "-120%" }}
        transition={{
          duration: 2.8,
          ease: [0.65, 0, 0.35, 1], // smooth cubic-bezier
        }}
        viewport={{ once: true }}
        className="absolute bottom-0 left-0 z-20"
      >
        <LuxuryTrainSVG />
      </motion.div>

      {/* 🪟 CONTENT REVEAL (like window being opened) */}
      <motion.div
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        whileInView={{ clipPath: "inset(0 0% 0 0)" }}
        transition={{
          duration: 1.6,
          ease: "easeOut",
          delay: 0.4,
        }}
        viewport={{ once: true }}
      >
        {children}
      </motion.div>

      {/* TRACK LINE */}
      <div className="absolute bottom-2 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-orange-400 to-transparent opacity-40" />
    </div>
  );
}

const LuxuryTrainSVG = () => {
  return (
    <svg
      width="260"
      height="80"
      viewBox="0 0 260 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Body */}
      <rect x="10" y="20" width="180" height="35" rx="8" fill="#8B5E3C" />
      <rect x="30" y="28" width="20" height="12" fill="#FDE68A" />
      <rect x="60" y="28" width="20" height="12" fill="#FDE68A" />
      <rect x="90" y="28" width="20" height="12" fill="#FDE68A" />

      {/* Engine */}
      <rect x="180" y="30" width="40" height="25" rx="5" fill="#A16207" />
      <rect x="200" y="15" width="10" height="15" fill="#A16207" />

      {/* Wheels */}
      <circle cx="50" cy="65" r="8" fill="#1F2937" />
      <circle cx="110" cy="65" r="8" fill="#1F2937" />
      <circle cx="170" cy="65" r="8" fill="#1F2937" />
      <circle cx="210" cy="65" r="8" fill="#1F2937" />

      {/* Smoke */}
      <circle cx="205" cy="10" r="4" fill="#D1D5DB" opacity="0.7" />
      <circle cx="215" cy="6" r="3" fill="#D1D5DB" opacity="0.5" />
    </svg>
  );
};