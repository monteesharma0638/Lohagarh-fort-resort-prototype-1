"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import HotelCard from "@/components/HotelCard";
import MotionDiv from "@/components/MotionDiv";
import hotelsData from "@/data/hotels.json";
import Image from "next/image";

const categories = ["All", "Jaipur, Rajasthan", "Bharatpur, Rajasthan", "Corbett, Uttarakhand", "Jaisalmer, Rajasthan"];

export default function Hotels() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredHotels = activeCategory === "All" 
    ? hotelsData 
    : hotelsData.filter(hotel => hotel.location === activeCategory);

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

{/* Filter Dropdown */}
<div className="bg-white border-b border-gray-100 sticky top-20 z-30 shadow-sm">
  <div className="container mx-auto px-4 py-4">
    <div className="max-w-xs flex justify-center md:justify-left"> {/* Adjust max-width as needed */}
      <label htmlFor="category-select" className="sr-only">
        Select Location
      </label>
      <select
        id="category-select"
        value={activeCategory}
        onChange={(e) => setActiveCategory(e.target.value)}
        className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block p-2.5 transition-all outline-none appearance-none cursor-pointer uppercase tracking-widest"
        style={{
          backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
          backgroundPosition: 'right 0.5rem center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '1.5em 1.5em'
        }}
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
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