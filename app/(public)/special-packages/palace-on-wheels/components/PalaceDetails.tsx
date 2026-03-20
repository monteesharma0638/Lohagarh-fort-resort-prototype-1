"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import MotionDiv from '@/components/MotionDiv';

const cabins = [
  {
    title: "Deluxe Cabins",
    desc: "Hand-woven textiles, ensuite bathrooms, and antique furniture.",
    img: "https://palaceonwheels.rajasthan.gov.in/public/admin/images/cabins/351cfb0933784814ea0c1293b5cda97917c07cea4.jpg",
    path:"deluxe-cabin"
  },
  {
    title: "Super Deluxe Cabin",
    desc: "King size Suites, Private Lounges, Panoramic windows.",
    img: "https://palaceonwheels.rajasthan.gov.in/public/admin/images/cabins/8d6390650793d1d0af96f688dedb8ff2ccfbec263.jpg", 
    path: "super-deluxe-cabin"
  },
  {
    title: "Suite Cabin",
    desc: "Hand-woven textiles, ensuite bathrooms, and antique furniture.",
    img: "https://palaceonwheels.rajasthan.gov.in/public/admin/images/cabins/e1a3a942d373fcf4e96445f472c9396c3ef3f1872.png",
    path: "suite-cabin"
  },
  {
    title: "Presidential Suite",
    desc: "Hand-woven textiles, ensuite bathrooms, and antique furniture.",
    img: "https://palaceonwheels.rajasthan.gov.in/public/admin/images/cabins/d0c3251e901ddb2da7fbc01b2bdf2346e81cb4a91.png",
    path: "presidential-suite"
  },
];

const PalaceDetails = () => {
  return (
    <section className="bg-white py-20 px-6 md:px-12 border-l border-gold/10">
      <div className="max-w-4xl mx-auto">
        
        {/* Section 1: Cabin & Suite Categories */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <h3 className="text-3xl font-serif text-maroon italic">Cabin & Suite Categories</h3>
            <div className="flex-1 h-px bg-gold/30"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cabins.map((cabin, idx) => (
              <MotionDiv
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group border border-gold/10 p-4 bg-[#FAF9F6] shadow-sm hover:shadow-md transition-shadow"
              >
                <Link href={"/special-packages/palace-on-wheels/" + cabin.path}>
                  <div className={`aspect-video ${cabin.img} mb-4 flex items-center justify-center relative overflow-hidden`}>
                    {/* <span className="text-[10px] uppercase font-bold text-maroon/30 tracking-widest italic font-serif">
                      {cabin.title} View
                    </span> */}
                    <Image src={cabin.img} fill alt="" />
                    <div className="absolute inset-0 border-[0.5px] border-gold/20 m-2"></div>
                  </div>
                  <h4 className="text-lg font-serif text-maroon mb-2">{cabin.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed font-sans uppercase tracking-tight">
                    {cabin.desc}
                  </p>
                </Link>
              </MotionDiv>
            ))}
          </div>
        </div>

        {/* Section 2: Interactive Amenities (The Black Highlight Box) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <div className="relative border border-gold/30 p-2 group overflow-hidden">
             <div className="aspect-square bg-maroon/5 flex items-center justify-center text-xs italic text-maroon/30">
               Butler Service Feature
             </div>
             <div className="absolute top-0 right-0 p-3 bg-gold text-maroon rotate-0 group-hover:rotate-12 transition-transform">
                <span className="text-[10px] font-bold">ROYAL</span>
             </div>
          </div>

          <div className="bg-[#1A1A1A] p-10 text-white relative shadow-2xl">
            {/* Design accents */}
            <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-gold"></div>
            <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-gold"></div>
            
            <span className="text-gold font-sans uppercase tracking-[0.4em] text-[10px] font-bold block mb-3">
              Interactive Amenities
            </span>
            <h4 className="text-2xl font-serif mb-6">Amenity Highlight</h4>
            <ul className="space-y-4">
              {["Personalized Butler service", "Modern ensuite bathrooms", "24/7 Dining"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-xs uppercase tracking-widest text-gray-300">
                  <span className="w-1.5 h-1.5 bg-gold rotate-45"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Section 3: Dining & Gastronomy */}
        <div>
          <div className="flex items-center gap-4 mb-10">
            <h3 className="text-3xl font-serif text-maroon italic">Dining & Gastronomy</h3>
            <div className="flex-1 h-px bg-gold/30"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
             <div className="space-y-4">
               <h4 className="text-2xl font-serif text-maroon">The Maharaja</h4>
               <p className="text-bhagwa font-bold text-[10px] uppercase tracking-widest">Gourmet International</p>
               <p className="text-sm text-gray-600 leading-relaxed font-sans italic">
                 "Elaborate multi-course meals, classic desserts, multi-sensory experiences—a gastronomic journey as memorable as the route."
               </p>
             </div>

             <div className="space-y-4">
               <h4 className="text-2xl font-serif text-maroon">The Maharani</h4>
               <p className="text-bhagwa font-bold text-[10px] uppercase tracking-widest">Authentic Rajasthani</p>
               <p className="text-sm text-gray-600 leading-relaxed font-sans italic">
                 "Flavors of Rajasthan—elaborate and fine wine pairings for your glorious meals."
               </p>
             </div>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-4">
             {[1,2,3].map(i => (
               <div key={i} className="aspect-square bg-maroon/5 border border-gold/10 hover:border-gold/40 transition-colors"></div>
             ))}
          </div>
          
          <button className="mt-12 text-[10px] font-bold uppercase tracking-[0.3em] text-bhagwa border-b-2 border-bhagwa pb-1 hover:text-maroon hover:border-maroon transition-all">
            Show more details →
          </button>
        </div>

      </div>
    </section>
  );
};

export default PalaceDetails;