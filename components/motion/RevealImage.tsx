"use client";
import { motion } from "framer-motion";

export default function RevealImage({ src, className, alt }: { src: string, className?: string, alt?: string }) {
  return (
    <motion.img
      src={src}
      alt={alt}
      initial={{ filter: "grayscale(100%)" }}
      whileInView={{ filter: "grayscale(0%)" }}
      transition={{ duration: 2 }}
      viewport={{ once: true, amount: 0.4 }}
      className={className}
    />
  );
}