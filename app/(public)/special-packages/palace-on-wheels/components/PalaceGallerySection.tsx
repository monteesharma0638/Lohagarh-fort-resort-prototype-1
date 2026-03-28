"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import trainCabins from "@/data/train-cabins.json"
import Link from "next/link";

const images = Object.values(trainCabins).map((value, i) => i? value[0]: [value[0], value[1]]).flat();

export default function PalaceGallerySection() {
  return (
    <section className="bg-background px-4 md:px-8 py-14">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="text-xs tracking-[0.3em] text-primary uppercase">
              Gallery
            </p>
            <h2 className="text-2xl md:text-4xl font-serif leading-tight mt-1">
              Palace on Wheels
              <span className="block gold-text-gradient">
                Inside Experience
              </span>
            </h2>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 h-screen md:grid-cols-3 gap-3">

          {images.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 1.05 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              viewport={{ once: true }}
              className={`relative overflow-hidden border border-border group ${
                i === 0 ? "col-span-2 row-span-2" : ""
              }`}
            >
              <div className="relative h-full w-full">
                <Image
                  src={src}
                  alt="Palace Gallery"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  fill
                />
              </div>

              {/* subtle overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition" />
            </motion.div>
          ))}

          {/* View Gallery Box */}
          <Link href="palace-on-wheels/gallery" className="h-full w-full">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              style={{height: "100%", width: "100%"}}
              className="flex items-center col-span-3 md:col-span-1 h-20 md:h-auto justify-center border border-primary text-primary relative overflow-hidden group cursor-pointer"
            >
              <span className="relative z-10 text-sm tracking-widest uppercase group-hover:text-primary-foreground transition">
                View Full Gallery
              </span>

              <span className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition duration-500" />
            </motion.div>
          </Link>

        </div>
      </div>
    </section>
  );
}