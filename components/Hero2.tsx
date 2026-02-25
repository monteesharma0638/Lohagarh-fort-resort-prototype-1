"use client";
import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from "next/image";

const slides = [
    {
      image: "/images/lohagarhfortresort/front-gate.jpg",
      title: "The Royal Lohagarh",
      subtitle: "Heritage of Excellence",
      description: "A Symphony of Indian Hospitality & Grandeur"
    },
    {
        image: "/images/lohagarhfortresort/homepage-slider-image-1.webp",
        title: "Palatial Suites",
        subtitle: "Modern Luxury",
        description: "Experience the pinnacle of comfort in our restored royal chambers"
    },
    {
        image: "/images/lohagarhfortresort/pool-site.jpg",
        title: "Culinary Arts",
        subtitle: "Gourmet Flavors",
        description: "Authentic recipes from the royal kitchens of India"
    }
];

export default function Hero() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide, index) => (
            <div key={index} className="relative flex-[0_0_100%] min-w-0 h-full">
              <Image 
                src={slide.image} 
                alt={slide.title} 
                className="absolute inset-0 w-full h-full object-cover opacity-60"
                fill
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-foreground/60" />
              
              <div className="relative h-full flex items-center justify-center text-center px-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                >
                  <span className="block text-primary text-xs md:text-sm tracking-[0.5em] uppercase font-bold mb-6">
                    {slide.subtitle}
                  </span>
                  <h1 className="text-5xl md:text-8xl lg:text-9xl font-serif text-white mb-8 leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-white/70 text-sm md:text-base tracking-[0.2em] uppercase max-w-xl mx-auto font-medium">
                    {slide.description}
                  </p>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={scrollPrev}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-2 text-white/50 hover:text-primary transition-colors border border-white/10 hover:border-primary/50"
      >
        <ChevronLeft size={32} strokeWidth={1} />
      </button>
      <button 
        onClick={scrollNext}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-2 text-white/50 hover:text-primary transition-colors border border-white/10 hover:border-primary/50"
      >
        <ChevronRight size={32} strokeWidth={1} />
      </button>

      {/* Decorative Border */}
      <div className="absolute inset-8 pointer-events-none z-10 hidden md:block" />
    </section>
  );
}