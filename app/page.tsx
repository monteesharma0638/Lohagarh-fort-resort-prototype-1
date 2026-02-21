import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import HotelCard from "@/components/HotelCard";
import Footer from "@/components/Footer";
import Link from "next/link";
import MotionDiv from "@/components/MotionDiv";
import MotionA from "@/components/MotionA";
import hotels from "./hotels/hotels.json";
import { Carousel, CarouselContent, CarouselNext } from "@/components/ui/carousel";

export default function Home() {
  const featuredHotels = hotels.filter(hotel => hotel.featured);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-black">
      <Hero />
      <section className="py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
           <div className="h-full w-full" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/handmade-paper.png")' }} />
        </div>
        <div className="container mx-auto max-w-5xl relative z-10">
          <MotionDiv
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <SectionHeading 
              title="A Legacy of Indian Royalty" 
              subtitle="The Lohagarh Signature" 
            />
            <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed font-serif italic max-w-3xl mx-auto mb-12">
              "To enter a Lohagarh property is to step back into an era of gold-leafed ceilings, intricate marble work, and hospitality that knows no bounds."
            </p>
            <div className="flex flex-col items-center">
              <p className="text-gray-400 text-sm tracking-widest uppercase max-w-2xl mx-auto leading-loose mb-10">
                For over a century, we have preserved the architectural marvels of the subcontinent, transforming historic forts and palaces into sanctuaries of unparalleled luxury.
              </p>
              <Link href="/discover">
                <span className="bg-primary/10 border border-primary text-primary px-10 py-4 text-xs font-bold tracking-widest uppercase hover:bg-primary hover:text-black transition-all duration-500">
                  Discover Our Story
                </span>
              </Link>
            </div>
          </MotionDiv>
        </div>
      </section>

      {/* Featured Hotels - Horizontal Reveal */}
      <section className="py-32 px-4 bg-secondary/30 border-y border-white/5">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <SectionHeading 
              title="Palatial Destinations" 
              subtitle="The Royal Collection" 
              centered={false}
              className="mb-0"
            />
            <Link href="/hotels">
              <MotionDiv
                whileHover={{ x: 10 }}
                className="hidden md:flex items-center gap-2 text-primary text-xs font-bold tracking-[0.3em] uppercase group cursor-pointer"
              >
                View All Properties <ArrowRight size={16} className="transition-transform group-hover:translate-x-2" />
              </MotionDiv>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {featuredHotels.map((hotel, index) => (
              <MotionDiv
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <HotelCard {...hotel} />
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* Experiences - Cinematic Dark Reveal */}
      <section className="py-0">
        <div className="flex flex-col lg:flex-row min-h-[700px]">
          <MotionDiv 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex-1 relative group overflow-hidden"
          >
            <img 
              src="/images/dining-fine.png" 
              alt="Fine Dining" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
            <div className="absolute inset-0 flex flex-col justify-end p-12 md:p-20">
              <span className="text-primary text-xs font-bold tracking-[0.4em] uppercase mb-4">The Epicurean</span>
              <h2 className="text-5xl font-serif text-white mb-6">Culinary Heritage</h2>
              <p className="text-white/70 text-sm tracking-widest uppercase mb-8 max-w-md">Authentic recipes from the royal kitchens of Rajasthan.</p>
              <Link href="/dining">
                <span className="self-start border border-white/30 px-10 py-4 text-xs text-white tracking-widest uppercase hover:bg-white hover:text-black transition-all">
                  Explore Dining
                </span>
              </Link>
            </div>
          </MotionDiv>
          <MotionDiv 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex-1 relative group overflow-hidden"
          >
            <img 
              src="/images/spa-wellness.png" 
              alt="Spa" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
            <div className="absolute inset-0 flex flex-col justify-end p-12 md:p-20">
              <span className="text-primary text-xs font-bold tracking-[0.4em] uppercase mb-4">The Sanctuary</span>
              <h2 className="text-5xl font-serif text-white mb-6">Jiva Wellness</h2>
              <p className="text-white/70 text-sm tracking-widest uppercase mb-8 max-w-md">Ancient healing rituals for the modern traveler.</p>
              <Link href="/experiences">
                <span className="self-start border border-white/30 px-10 py-4 text-xs text-white tracking-widest uppercase hover:bg-white hover:text-black transition-all">
                  View Treatments
                </span>
              </Link>
            </div>
          </MotionDiv>
        </div>
      </section>

      {/* Static Footer Brand Block */}
      <section className="py-40 bg-background flex flex-col items-center justify-center text-center px-4">
        <MotionDiv
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
        >
          <span className="text-primary text-sm tracking-[0.6em] uppercase mb-12 block">A Member of The Global Heritage Alliance</span>
          <h2 className="text-7xl md:text-9xl font-serif mb-8 gold-text-gradient opacity-20 select-none">LOHAGARH</h2>
        </MotionDiv>
      </section>
    </div>
  );
}