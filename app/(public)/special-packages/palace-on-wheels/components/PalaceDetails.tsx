"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import MotionDiv from '@/components/MotionDiv';

const cabins = [
  {
    title: "Deluxe Cabins",
    desc: "Hand-woven textiles, ensuite bathrooms, and antique furniture.",
    img: "https://palaceonwheels.rajasthan.gov.in/public/admin/images/cabins/351cfb0933784814ea0c1293b5cda97917c07cea4.jpg",
    path: "deluxe-cabin",
    icon: "👑"
  },
  {
    title: "Super Deluxe Cabin",
    desc: "King size Suites, Private Lounges, Panoramic windows.",
    img: "https://palaceonwheels.rajasthan.gov.in/public/admin/images/cabins/8d6390650793d1d0af96f688dedb8ff2ccfbec263.jpg",
    path: "super-deluxe-cabin",
    icon: "✨"
  },
  {
    title: "Suite Cabin",
    desc: "Hand-woven textiles, ensuite bathrooms, and antique furniture.",
    img: "https://palaceonwheels.rajasthan.gov.in/public/admin/images/cabins/e1a3a942d373fcf4e96445f472c9396c3ef3f1872.png",
    path: "suite-cabin",
    icon: "🏰"
  },
  {
    title: "Presidential Suite",
    desc: "Hand-woven textiles, ensuite bathrooms, and antique furniture.",
    img: "https://palaceonwheels.rajasthan.gov.in/public/admin/images/cabins/d0c3251e901ddb2da7fbc01b2bdf2346e81cb4a91.png",
    path: "presidential-suite",
    icon: "💎"
  },
];

const PalaceDetails = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  return (
    <section ref={ref} className="bg-gradient-to-b z-10 from-white via-[#FFFCF7] to-white py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-serif text-maroon mb-4 italic">
            Royal Accommodations
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold"></div>
            <p className="text-gold font-sans uppercase tracking-widest text-sm">Elevate Your Journey</p>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold"></div>
          </div>
        </motion.div>

        {/* Cabin Grid - 4 Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
          {cabins.map((cabin, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="group"
            >
              <Link href={"/special-packages/palace-on-wheels/" + cabin.path}>
                <div className="relative overflow-hidden bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 border border-gold/10">
                  {/* Image Container */}
                  <div className="aspect-video relative overflow-hidden bg-maroon/5">
                    <Image 
                      src={cabin.img} 
                      fill 
                      alt={cabin.title}
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-maroon/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>

                  {/* Icon Badge */}
                  <div className="absolute top-3 right-3 text-3xl bg-white/90 backdrop-blur w-10 h-10 rounded-full flex items-center justify-center shadow-lg">
                    {cabin.icon}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h4 className="text-lg font-serif text-maroon mb-2 group-hover:text-gold transition-colors">
                      {cabin.title}
                    </h4>
                    <p className="text-xs text-gray-500 leading-relaxed font-sans">
                      {cabin.desc}
                    </p>
                    <div className="mt-4 flex items-center text-gold text-xs font-semibold uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                      Explore →
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Amenities Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {[
            { icon: "🍽️", title: "Fine Dining", desc: "Multi-course gourmet experiences" },
            { icon: "🛎️", title: "Butler Service", desc: "24/7 personalized assistance" },
            { icon: "🚂", title: "Scenic Routes", desc: "Panoramic journey through Rajasthan" }
          ].map((amenity, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="text-center p-8 rounded-lg bg-gradient-to-br from-gold/5 to-transparent border border-gold/20 hover:border-gold/50 transition-colors"
            >
              <div className="text-4xl mb-4">{amenity.icon}</div>
              <h3 className="text-xl font-serif text-maroon mb-2">{amenity.title}</h3>
              <p className="text-sm text-gray-600">{amenity.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Dining Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-maroon/5 to-gold/5 rounded-xl p-12 border border-gold/20"
        >
          <h3 className="text-4xl font-serif text-maroon mb-12 text-center">Culinary Excellence</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                name: "The Maharaja",
                subtitle: "Gourmet International",
                desc: "Elaborate multi-course meals with classic desserts and fine wine pairings."
              },
              {
                name: "The Maharani",
                subtitle: "Authentic Rajasthani",
                desc: "Flavors of Rajasthan prepared by award-winning chefs for glorious meals."
              }
            ].map((restaurant, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                className="bg-white p-8 rounded-lg shadow-md border-l-4 border-gold"
              >
                <h4 className="text-2xl font-serif text-maroon mb-2">{restaurant.name}</h4>
                <p className="text-gold font-bold text-xs uppercase tracking-widest mb-4">{restaurant.subtitle}</p>
                <p className="text-gray-600 leading-relaxed italic">{restaurant.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <button className="px-10 py-3 bg-gradient-to-r from-maroon to-bhagwa text-white font-serif text-lg rounded-lg hover:shadow-lg transition-shadow uppercase tracking-wider">
            Explore Full Experience →
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default PalaceDetails;
