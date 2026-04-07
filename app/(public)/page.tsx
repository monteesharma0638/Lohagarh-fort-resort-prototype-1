import { ArrowRight, Globe, Sparkles } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Link from "next/link";
import MotionDiv from "@/components/MotionDiv";
import Image from "next/image";
import RevealImage from "@/components/motion/RevealImage";
import Hero from "@/components/Hero";
import ResortExplorer from "./components/ResortExplorer";
import AllExploreSections from "./components/AllExploreSections";
import { getHotels } from "@/lib/db";
import PalaceTrainSection from "./components/PalaceTrainSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lohagarh Group of Companies - A Legacy of Indian Royalty",
  description: "Experience a symphony of Indian hospitality at Lohagarh Hotels. Stay in luxurious sanctuaries within historic forts and palaces for a truly grand getaway.",
};

const stats = [
  { label: "Heritage Properties", value: "6" },
  { label: "Years of Royalty", value: "20+" },
  { label: "Global Awards", value: "100+" },
  { label: "Happy Guests", value: "1M+" }
];

export default async function Home() {
  const hotels = await getHotels();

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-black">
      <Hero />
 <section className="py-24 bg-[#faf8f4] overflow-hidden">
      <div className="container mx-auto max-w-8xl px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch min-h-[520px]">
 
          {/* ── LEFT: Text Column ── */}
          <MotionDiv
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="flex flex-col justify-center pr-0 lg:pr-15 py-10 lg:py-0"
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6">
              <span className="block w-8 h-px bg-primary" />
              <span className="text-primary text-xs tracking-[0.35em] uppercase font-medium">
                Welcome To
              </span>
            </div>
 
            {/* Heading */}
            <h2 className="font-serif text-4xl md:text-5xl text-[#1a120b] leading-[1.1] mb-6 tracking-tight">
              Lohagarh<br />
              <span className="text-[#3d2712]">Group of Companies</span>
            </h2>
 
            {/* Gold rule */}
            <div className="w-12 h-[2px] bg-primary mb-8" />
 
            {/* Body */}
            <p className="text-[#5a4a38] text-base leading-[1.9] mb-10 max-w-md">
              Experience the grandeur of exotic Rajasthan with Lohagarh —
              India's only chain of heritage Palace-hotels and resorts under
              private ownership. Wake up to history on your doorstep.
            </p>
 
 
            {/* CTA */}
            <div>
              <Link href="/about">
                <span className="inline-block border border-primary text-primary px-10 py-4 text-xs font-bold tracking-[0.2em] uppercase hover:bg-primary hover:text-white transition-all duration-400">
                  Discover More
                </span>
              </Link>
            </div>
          </MotionDiv>
 
          {/* ── RIGHT: Image Column ── */}
          <MotionDiv
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
            className="relative"
          >
            {/* Decorative offset border */}
            <div className="absolute top-4 right-4 bottom-[-16px] left-[-16px] border border-[#e8dcc8] z-0 hidden lg:block" />
 
            {/* Main image */}
            <div className="relative z-10 w-full h-full min-h-[400px] lg:min-h-0 overflow-hidden">
              <Image
                src="https://res.cloudinary.com/drayl5ppi/image/upload/v1773212407/lohagarh/images/hero/DSC03783_v1psxa.jpg"
                alt="Lohagarh Heritage Palace"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
 
              {/* Subtle dark vignette on bottom of image only */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-black/20" />
 
            </div>
          </MotionDiv>
 
        </div>
      </div>
    </section>

      {/* Featured Hotels - Horizontal Reveal */}
      <section className="py-10 md:py-32 px-0 md:px-4 bg-primary-foreground">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 pb-5">
            <SectionHeading 
              title="Palatial Destinations" 
              subtitle="The Royal Collection" 
              centered={false}
              className="mb-0"
              // light
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
          
          <ResortExplorer featuredHotels={hotels} />
        </div>
      </section>

      {/* NEW 1: Royal Concierge Service */}
      <section className="py-32 bg-background relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2">
              <span className="text-primary text-xs font-bold tracking-[0.4em] uppercase mb-4 block">SIGNATURE HOSPITALITY</span>
              <h2 className="text-5xl md:text-7xl font-serif text-primary mb-8 leading-tight">The Lohagarh Experience</h2>
              <p className="text-gray-800 text-lg mb-12 font-light leading-relaxed">From luxury eco-villas tucked into the Aravalli hills to grand heritage celebrations, our group brings together the finest traditions of Rajasthan with modern sustainable luxury.</p>
              <div className="grid grid-cols-2 gap-8">
                <div className="border-l-2 border-primary/30 pl-6 py-2">
                  <h4 className="text-primary/90 font-serif text-xl mb-2">Bespoke Stays</h4>
                  <p className="text-gray-700 text-sm">A diverse portfolio featuring private pool villas, luxury glamping, and royal suites across all our destinations.</p>
                </div>
                <div className="border-l-2 border-primary/30 pl-6 py-2">
                  <h4 className="text-primary/90 font-serif text-xl mb-2">Heritage Events</h4>
                  <p className="text-gray-700 text-sm">Premier venues for destination weddings and corporate retreats, hosting up to 2,000 guests in majestic settings.</p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="aspect-[4/5] bg-secondary/20 border border-primary/10 p-4">
                <RevealImage src="https://pub-ff97545f109a472fb64184a710a01a80.r2.dev/lohagarh-fort-resort/banner.jpeg" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Concierge" />
              </div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      <AllExploreSections />

      <PalaceTrainSection />

      {/* 2. Stats Section */}
      <section className="py-10 bg-secondary/10 border-y border-primary/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            {stats.map((stat, idx) => (
              <MotionDiv key={idx} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
                <div className="text-4xl md:text-6xl font-serif text-primary mb-2">{stat.value}</div>
                <div className="text-xs tracking-[0.3em] uppercase text-foreground/60 font-bold">{stat.label}</div>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}