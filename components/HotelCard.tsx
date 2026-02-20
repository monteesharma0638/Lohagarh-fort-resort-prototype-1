"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface HotelCardProps {
  id?: string;
  name: string;
  location: string;
  image: string;
  description: string;
  price?: string;
}

export default function HotelCard({ id, name, location, image, description, price }: HotelCardProps) {
  const linkHref = id ? `/hotels/${id}` : "/hotels";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group cursor-pointer"
    >
      <Link href={linkHref}>
        <div className="relative overflow-hidden aspect-[4/5] mb-6">
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors z-10" />
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute bottom-0 left-0 right-0 p-6 z-20 bg-gradient-to-t from-black/80 to-transparent">
             <span className="text-xs font-bold tracking-widest text-primary uppercase mb-2 block">{location}</span>
             <h3 className="text-2xl font-serif text-white mb-2">{name}</h3>
          </div>
        </div>
      </Link>
      
      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
        {description}
      </p>
      
      <div className="flex items-center justify-between">
        {price && (
          <div>
            <span className="text-xs text-gray-500 uppercase block">Starting from</span>
            <span className="text-lg font-serif font-medium">₹{price}</span>
          </div>
        )}
        <Link href={linkHref}>
            <span className="inline-flex items-center text-xs font-bold tracking-widest uppercase hover:text-primary transition-colors group-hover:underline decoration-primary underline-offset-4">
            View Details <ArrowRight size={14} className="ml-2" />
            </span>
        </Link>
      </div>
    </motion.div>
  );
}