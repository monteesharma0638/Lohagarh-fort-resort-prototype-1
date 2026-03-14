import { ArrowRight, Globe, Sparkles } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import HotelCard from "@/components/HotelCard";
import Link from "next/link";
import MotionDiv from "@/components/MotionDiv";
import hotels from "@/data/hotels.json";
import Hero2 from "@/components/Hero2";
import Image from "next/image";
import RevealImage from "@/components/motion/RevealImage";
import Hero from "@/components/Hero";
import { Swiper } from "swiper/react";
import ResortExplorer from "./components/ResortExplorer";
import ExploreSection from "./components/ExploreSection";
import AllExploreSections from "./components/AllExploreSections";


  const stats = [
    { label: "Heritage Properties", value: "25+" },
    { label: "Years of Royalty", value: "100" },
    { label: "Global Awards", value: "150+" },
    { label: "Happy Guests", value: "1M+" }
  ];

export default function Home() {
  const featuredHotels = hotels.filter(hotel => hotel.featured);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-black">
      <Hero />
      <section className="py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
           <div className="h-full w-full" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/handmade-paper.png")' }} />
        </div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <MotionDiv
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="text-left md:col-span-2"
            >
              <SectionHeading 
                title="LOHAGARH GROUP OF HOTELS" 
                subtitle="WELCOME TO" 
              />
              {/* <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed font-serif italic max-w-3xl mx-auto mb-12">
                Experience the grandeur of exotic Rajasthan with HRH, India's only chain of heritage Palace-hotels and resorts under private ownership, as you wake up to history on your doorstep.
              </p> */}
              <div className="flex flex-col items-left">
                <p className="text-gray-600 text-sm tracking-widest max-w-2xl text-justify leading-loose mb-10">
                  Experience the grandeur of exotic Rajasthan with HRH, India's only chain of heritage Palace-hotels and resorts under private ownership, as you wake up to history on your doorstep.
                </p>
                <Link href="/about" className="mx-auto md:mx-0">
                  <span className="bg-primary/10 border border-primary text-primary px-10 py-4 text-xs font-bold tracking-widest uppercase hover:bg-primary hover:text-white transition-all duration-500">
                    Discover More
                  </span>
                </Link>
              </div>
            </MotionDiv>
            <div className="md:col-span-1 py-20 md:py-0">
              <Image className="rounded-xl" src={"/images/mahalkhas/front.jpg"} alt={""} width={600} height={1200} />
            </div>
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
                <RevealImage src="/images/mahalkhas/front.jpg" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Concierge" />
              </div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      <AllExploreSections />

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