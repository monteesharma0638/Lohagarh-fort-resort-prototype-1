"use client";

import MotionButtonPrimary from "@/components/motion/MotionButtonPrimary";
import { motion } from "framer-motion";
import Link from "next/link";

const highlights = [
  {
    title: "Opulent Cabins",
    desc: "Heritage interiors with refined comfort and detailing.",
  },
  {
    title: "Gourmet Dining",
    desc: "Curated cuisine served in a regal ambiance.",
  },
  {
    title: "Curated Routes",
    desc: "Jaipur, Udaipur, Jaisalmer & Agra journeys.",
  },
  {
    title: "Royal Hospitality",
    desc: "Personalized service with cultural immersion.",
  },
];

export default function PalaceTrainSection() {
  return (
    <section className="relative bg-background py-16 px-4 md:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <p className="text-xs tracking-[0.3em] text-primary uppercase">
            Palace on Wheels
          </p>

          <h2 className="text-3xl md:text-5xl font-serif leading-tight mt-2">
            A Royal Journey
            <span className="block gold-text-gradient">
              Through Timeless India
            </span>
          </h2>
        </motion.div>

        {/* Main Layout */}
        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden border border-border"
          >
            <img
              src="https://www.thepalaceonwheels.org/storage/pow-exterior.jpeg"
              alt="Palace on Wheels"
              className="w-full h-full object-cover"
            />

            {/* overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 via-transparent to-transparent" />

            {/* badge */}
            <div className="absolute bottom-3 left-3 bg-card/80 backdrop-blur px-3 py-2 border border-border text-xs">
              <span className="text-accent font-medium">Since 1982</span>
            </div>
          </motion.div>

          {/* Content */}
          <div className="flex flex-col justify-between">
            <div className="grid gap-4">
              {highlights.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="border-b border-border pb-3 group"
                >
                  <h3 className="text-lg font-semibold flex items-center justify-between">
                    {item.title}
                    <span className="text-muted-foreground text-sm group-hover:text-primary transition">
                      0{i + 1}
                    </span>
                  </h3>

                  <p className="text-muted-foreground text-sm mt-1">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            <Link href="/special-packages/palace-on-wheels">
              <MotionButtonPrimary>Explore Journey</MotionButtonPrimary>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
