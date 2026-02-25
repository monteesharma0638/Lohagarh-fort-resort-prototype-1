import { ArrowRight, Globe, Sparkles } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import HotelCard from "@/components/HotelCard";
import Link from "next/link";
import MotionDiv from "@/components/MotionDiv";
import hotels from "./hotels/hotels.json";
import Hero2 from "@/components/Hero2";
import Image from "next/image";
import RevealImage from "@/components/motion/RevealImage";


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
      <Hero2 />
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

      {/* 2. Stats Section */}
      <section className="py-24 bg-secondary/10 border-y border-primary/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            {stats.map((stat, idx) => (
              <MotionDiv key={idx} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
                <div className="text-4xl md:text-6xl font-serif text-primary mb-2">{stat.value}</div>
                <div className="text-xs tracking-[0.3em] uppercase text-gray-500 font-bold">{stat.label}</div>
              </MotionDiv>
            ))}
          </div>
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

      {/* NEW 1: Royal Concierge Service */}
      <section className="py-32 bg-background relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2">
              <span className="text-primary text-xs font-bold tracking-[0.4em] uppercase mb-4 block">Unmatched Service</span>
              <h2 className="text-5xl md:text-7xl font-serif text-primary mb-8 leading-tight">The Royal <br/><span className="italic text-primary/80">Concierge</span></h2>
              <p className="text-gray-800 text-lg mb-12 font-light leading-relaxed">From private helicopter charters to curated heirloom jewelry viewings, our concierge team turns the impossible into your reality.</p>
              <div className="grid grid-cols-2 gap-8">
                <div className="border-l-2 border-primary/30 pl-6 py-2">
                  <h4 className="text-primary/90 font-serif text-xl mb-2">Private Travel</h4>
                  <p className="text-gray-700 text-sm">Bespoke transfers via vintage cars or private jets.</p>
                </div>
                <div className="border-l-2 border-primary/30 pl-6 py-2">
                  <h4 className="text-primary/90 font-serif text-xl mb-2">Curated Tours</h4>
                  <p className="text-gray-700 text-sm">After-hours access to historic monuments.</p>
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

      {/* NEW 3: Wellness Rituals (Video-like background) */}
      <section className="relative py-48 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/spa-wellness.png" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-background/80" />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
          <Sparkles className="text-primary mx-auto mb-8" size={48} />
          <h2 className="text-5xl md:text-7xl font-serif text-secondary mb-8">Sacred Rituals of <br/><span className="text-primary italic">Eternal Youth</span></h2>
          <p className="text-gray-700 text-xl font-light mb-12">Rediscover your inner self with ancient Ayurvedic therapies practiced in our palace sanctuaries for over five centuries.</p>
          <button className="bg-primary text-black px-12 py-5 text-xs font-bold tracking-[0.3em] uppercase hover:bg-white transition-all">Explore Wellness</button>
        </div>
      </section>

      {/* NEW 4: The Archive (History) */}
      <section className="py-32 bg-background border-y border-primary/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-24 items-center">
            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
              <img src="/images/room-luxury.png" className="w-full h-64 object-cover grayscale" />
              <img src="/images/dining-fine.png" className="w-full h-64 object-cover grayscale mt-8" />
            </div>
            <div className="lg:w-1/2">
              <span className="text-primary text-xs font-bold tracking-[0.4em] uppercase mb-4 block">The Living History</span>
              <h2 className="text-5xl font-serif text-secondary/90 mb-8">The Royal Archive</h2>
              <div className="space-y-8">
                {[
                  { year: "1824", event: "Foundation of the Jaipur Royal Estate" },
                  { year: "1947", event: "The Transition to Independent India" },
                  { year: "1995", event: "Opening the First Palace Hotel" }
                ].map((item, i) => (
                  <div key={i} className="flex gap-8 group">
                    <span className="text-primary font-serif text-2xl">{item.year}</span>
                    <p className="text-gray-500 border-l border-primary/20 pl-8 group-hover:text-primary transition-colors">{item.event}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW 5: Global Presence Map Placeholder */}
      <section className="py-32 bg-[#0a0a0a] text-center">
        <div className="container mx-auto px-6">
          <Globe className="text-primary/20 mx-auto mb-8" size={120} />
          <SectionHeading title="Global Footprint" subtitle="Our Presence" />
          <p className="text-gray-400 max-w-2xl mx-auto mb-16 font-light">From the deserts of Rajasthan to the bustling streets of London, Lohagarh represents the pinnacle of Indian luxury worldwide.</p>
          <div className="flex flex-wrap justify-center gap-12 opacity-50">
            {['Jaipur', 'Bharatpur', 'Jaisalmer', 'Nainital'].map(city => (
              <span key={city} className="text-white font-serif text-3xl tracking-widest">{city}</span>
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
            <Image 
              src="/images/lohagarhfortresort/dine-in.jpg"
              alt="Fine Dining"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              width={600}
              height={800}
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
            <Image 
              src="/images/lohagarhfortresort/food-item-1.jpg"
              alt="Spa" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              width={600}
              height={800}
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