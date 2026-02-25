"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import HotelCard from "@/components/HotelCard";
import MotionDiv from "@/components/MotionDiv";
import hotelsData from "./hotels.json";
import Image from "next/image";

// const hotelsData = ;

const categories = ["All", "Palace", "Resort", "Safari", "Camping", "Heritage"];

export default function Hotels() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredHotels = activeCategory === "All" 
    ? hotelsData 
    : hotelsData.filter(hotel => hotel.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image src="/images/lohagarhfortresort/hero_bg_1_1.jpg" alt="Hotels" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center text-white">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="block text-sm tracking-[0.3em] uppercase mb-4">Destinations</span>
            <h1 className="text-5xl md:text-7xl font-serif">Our Hotels</h1>
          </MotionDiv>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border-b border-gray-100 sticky top-20 z-30 shadow-sm">
        <div className="container mx-auto px-4 overflow-x-auto">
          <div className="flex justify-center min-w-max">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-8 py-6 text-sm tracking-widest uppercase transition-colors relative ${
                  activeCategory === category 
                    ? "text-primary font-bold" 
                    : "text-gray-500 hover:text-black"
                }`}
              >
                {category}
                {activeCategory === category && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Hotels Grid */}
      <div className="py-24 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredHotels.map((hotel) => (
              <HotelCard key={hotel.id} {...hotel} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}