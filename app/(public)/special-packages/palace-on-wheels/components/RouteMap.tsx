"use client";
import React from 'react';
import { motion } from 'framer-motion';

const itinerary = [
  { day: "Day 1", city: "New Delhi", desc: "Ceremonial welcome at Safdarjung Station.", icon: "🏛️" },
  { day: "Day 2", city: "Jaipur", desc: "The Pink City—visit Hawa Mahal and Amber Fort.", icon: "🐘" },
  { day: "Day 3", city: "Ranthambore", desc: "Wild safari and the historic Chittorgarh Fort.", icon: "🐅" },
  { day: "Day 4", city: "Udaipur", desc: "The City of Lakes—Jag Niwas and Lake Pichola.", icon: "🛶" },
  { day: "Day 5", city: "Jaisalmer", desc: "Golden City—camel rides in the Sam Sand Dunes.", icon: "🏜️" },
  { day: "Day 6", city: "Jodhpur", desc: "The Blue City—Mehrangarh Fort exploration.", icon: "🏰" },
  { day: "Day 7", city: "Bharatpur", desc: "Bird sanctuary visits and the iconic Taj Mahal.", icon: "🕊️" },
  { day: "Day 8", city: "Delhi", desc: "Return journey and farewell breakfast.", icon: "🚉" },
];

const RouteMap = () => {
  return (
    <section className="bg-[#fdfbf7] py-16 px-6 md:py-24">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h3 className="text-[#c48b36] uppercase tracking-[0.2em] text-sm font-semibold mb-2">
          Travel Like Royalty
        </h3>
        <h2 className="text-4xl md:text-5xl font-serif text-[#2d2d2d]">
          Journey Itinerary
        </h2>
        <div className="w-24 h-[1px] bg-[#c48b36] mx-auto mt-6"></div>
      </div>

      {/* Desktop View: Horizontal Scroll/Grid */}
      <div className="hidden lg:block relative">
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gray-200 -translate-y-1/2 z-0"></div>
        <div className="grid grid-cols-8 gap-4 relative z-10">
          {itinerary.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-12 h-12 bg-white border-2 border-[#c48b36] rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <span className="text-xl">{item.icon}</span>
              </div>
              <h4 className="font-bold text-[#c48b36] text-sm uppercase">{item.day}</h4>
              <p className="font-serif font-semibold text-gray-800">{item.city}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile View: Vertical Stepper */}
      <div className="lg:hidden space-y-8 relative">
        <div className="absolute left-[23px] top-2 bottom-2 w-[2px] bg-gray-200 z-0"></div>
        {itinerary.map((item, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-start gap-6 relative z-10"
          >
            <div className="w-12 h-12 bg-white border-2 border-[#c48b36] rounded-full flex-shrink-0 flex items-center justify-center shadow-md">
              <span className="text-xl">{item.icon}</span>
            </div>
            <div>
              <h4 className="font-bold text-[#c48b36] text-xs uppercase tracking-widest">{item.day}</h4>
              <h5 className="text-xl font-serif text-gray-900 mb-1">{item.city}</h5>
              <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default RouteMap;