"use client";

import SectionHeading from "@/components/SectionHeading";
import MotionDiv from "@/components/MotionDiv";
import Link from "next/link";
import { fetchVideoMeta, VideoCard, VideoMeta } from "@/components/ui/video-card";
import { useEffect, useState } from "react";
import Image from "next/image";

// ─── Unsplash image constants ───────────────────────────────────────────────
const HERO_BG =
  "https://pub-ff97545f109a472fb64184a710a01a80.r2.dev/special-packages-cover.png"; // Taj Mahal / India palace
const WEDDING_HERO =
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80";
const WEDDING_1 =
"https://pub-ff97545f109a472fb64184a710a01a80.r2.dev/lohagarh-fort-resort/jal-mandap.jpg";
const WEDDING_2 =
"https://pub-ff97545f109a472fb64184a710a01a80.r2.dev/lohagarh-fort-resort/front-2.jpg";
const WEDDING_3 =
  "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80";

const EVENTS_HERO =
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80";
const EVENTS_1 =
  "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80";
const EVENTS_2 =
  "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80";
const EVENTS_3 =
  "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80";

const TRAIN_HERO =
  "https://pub-ff97545f109a472fb64184a710a01a80.r2.dev/palace-on-wheels/images/train_cover.jpeg";
const TRAIN_1 =
  "https://images.unsplash.com/photo-1553025934-296397db4010?w=800&q=80";
const TRAIN_2 =
  "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80";
const TRAIN_3 =
  "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80";

// ─── Data ────────────────────────────────────────────────────────────────────
const weddingFeatures = [
  { icon: "✦", label: "Royal Mandap Setups", desc: "Ornate mandaps adorned with marigolds, jasmine and heirloom silks across palace courtyards." },
  { icon: "✦", label: "Dedicated Wedding Planner", desc: "A personal specialist guides every ritual, décor choice and timeline with white-glove precision." },
  { icon: "✦", label: "Bridal Suites & Spa", desc: "Exclusive suites with in-room mehendi, bridal hammam and trousseau styling services." },
  { icon: "✦", label: "Heritage Banquet Halls", desc: "Century-old durbar halls and garden pavilions seating up to 2 000 guests." },
  { icon: "✦", label: "Royal Procession", desc: "Arrive on a white mare or vintage Rolls-Royce for a baraat fit for a maharaja." },
  { icon: "✦", label: "Culinary Extravaganza", desc: "160+ dish royal thali, live chaat counters, dessert stations and signature cocktail bars." },
];

const eventsFeatures = [
  { icon: "✦", label: "Corporate Summits", desc: "Fully equipped boardrooms, breakout halls and AV production for 10 to 2 000 delegates." },
  { icon: "✦", label: "Product Launches", desc: "Dramatic palace backdrops that make every brand moment uniquely unforgettable." },
  { icon: "✦", label: "Gala Dinners", desc: "Candlelit courtyards, rooftop terraces and fort ramparts set for black-tie evenings." },
  { icon: "✦", label: "Cultural Showcases", desc: "Folk performers, Rajasthani puppeteers, and classical musicians curated on request." },
  { icon: "✦", label: "Team Experiences", desc: "Desert safaris, polo clinics, cooking masterclasses and elephant sanctuary visits." },
  { icon: "✦", label: "End-to-End Logistics", desc: "Transport, accommodation, F&B, décor, tech and security — all under one roof." },
];

const trainFeatures = [
  { icon: "✦", label: "14 Royal Saloons", desc: "Superbly appointed cabins with hand-carved furniture, brass fittings and en-suite baths." },
  { icon: "✦", label: "7-Night Itinerary", desc: "Delhi → Jaipur → Sawai Madhopur → Chittorgarh → Udaipur → Bharatpur → Agra → Delhi." },
  { icon: "✦", label: "On-Board Dining Cars", desc: "Two restaurant cars serving Rajasthani, Mughal and continental menus with fine wines." },
  { icon: "✦", label: "Lounge & Spa Car", desc: "A wellness carriage with massage rooms, a bar-lounge and a curated library." },
  { icon: "✦", label: "Guided Palace Tours", desc: "Expert historians accompany every excursion through forts, temples and bazaars." },
  { icon: "✦", label: "All-Inclusive Luxury", desc: "Accommodation, all meals, excursions, transfers and sundowners included." },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-4 my-4">
      <span className="block h-px w-16 bg-[#c9a84c]/40" />
      <span className="text-[#c9a84c] text-xs tracking-[0.4em]">◆</span>
      <span className="block h-px w-16 bg-[#c9a84c]/40" />
    </div>
  );
}

function FeatureGrid({ features }: { features: typeof weddingFeatures }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
      {features.map((f) => (
        <div
          key={f.label}
          className="border border-[#e8dcc8] bg-white/70 backdrop-blur-sm p-6 hover:border-[#c9a84c]/70 hover:shadow-md transition-all duration-300 group"
        >
          <span className="text-[#c9a84c] text-xs tracking-widest">{f.icon}</span>
          <h4 className="text-[#1a1209] font-serif text-lg mt-2 mb-2 group-hover:text-[#a07830] transition-colors">
            {f.label}
          </h4>
          <p className="text-[#6b5c3e] text-sm leading-relaxed">{f.desc}</p>
        </div>
      ))}
    </div>
  );
}

function ImageTriad({ imgs }: { imgs: [string, string, string] }) {
  return (
    <div className="grid grid-cols-12 gap-3 mt-10 h-[420px]">
      {/* Large left image */}
      <div className="relative col-span-7 overflow-hidden">
        <Image
          src={imgs[0]}
          alt="Section 1"
          fill
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
        />
      </div>
      {/* Two stacked right images */}
      <div className="col-span-5 flex flex-col gap-3">
        <div className="relative flex-1 overflow-hidden">
          <Image
            src={imgs[1]}
            alt="Section 2"
            fill
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>
        <div className="relative flex-1 overflow-hidden">
          <Image
            src={imgs[2]}
            alt="Section 3"
            fill
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>
      </div>
    </div>
  );
}

interface PackageSectionProps {
  id: string;
  href: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  heroImg: string;
  triImages: [string, string, string];
  features: typeof weddingFeatures;
  price: string;
  priceNote: string;
  reverse?: boolean;
  VideoMeta?: VideoMeta | null;
}

function PackageSection({
  id,
  href,
  tag,
  title,
  subtitle,
  description,
  heroImg,
  triImages,
  features,
  price,
  priceNote,
  reverse = false,
  VideoMeta = null,
}: PackageSectionProps) {
  return (
    <section id={id} className="py-28 border-t border-[#e8dcc8]">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Tag + heading */}
        <div className="text-center mb-16">
          <span className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase">{tag}</span>
          <GoldDivider />
          <h2 className="font-serif text-5xl md:text-6xl text-[#1a1209] mt-2">{title}</h2>
          <p className="text-[#6b5c3e] mt-4 max-w-xl mx-auto leading-relaxed">{subtitle}</p>
        </div>

        {/* Hero split: image + description */}
        <div
          className={`flex flex-col ${reverse ? "lg:flex-row-reverse" : "lg:flex-row"} gap-10 items-center`}
        >
          {/* Image */}
          <div className="w-full lg:w-1/2 overflow-hidden aspect-[4/3] relative">
            {
              VideoMeta ? (
                <VideoCard meta={VideoMeta} index={0} />
              ): (
                <img
                  src={heroImg}
                  alt={title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              )
            }
            {/* Gold frame accent */}
            {
              !VideoMeta && (
                <>
                  <div
                    className={`absolute w-32 h-32 border border-[#c9a84c]/40 ${
                      reverse ? "-top-4 -left-4" : "-top-4 -right-4"
                    } pointer-events-none`}
                  />
                  <div
                    className={`absolute w-32 h-32 border border-[#c9a84c]/40 ${
                      reverse ? "-bottom-4 -right-4" : "-bottom-4 -left-4"
                    } pointer-events-none`}
                  />
                </>
              )
            }
          </div>

          {/* Text */}
          <div className="w-full lg:w-1/2 space-y-6">
            <p className="text-[#3d2e1a] leading-loose text-lg">{description}</p>
            <div className="border-l-2 border-[#c9a84c] pl-5">
              <p className="text-[#a07830] font-serif text-3xl">{price}</p>
              <p className="text-[#8a7055] text-sm mt-1">{priceNote}</p>
            </div>
            <Link
              href={href}
              className="inline-block mt-4 px-10 py-3 border border-[#c9a84c] text-[#c9a84c] text-sm tracking-[0.2em] uppercase hover:bg-[#c9a84c] hover:text-black transition-all duration-300"
            >
              Explore Package
            </Link>
          </div>
        </div>

        {/* Image triad */}
        <ImageTriad imgs={triImages} />

        {/* Features */}
        {/* <FeatureGrid features={features} /> */}

        {/* CTA strip */}
        <div className="mt-16 text-center border border-[#e8dcc8] py-10 px-6 bg-[#f5f0e8]">
          <p className="text-[#8a7055] text-sm tracking-widest uppercase mb-4">Begin Your Journey</p>
          <h3 className="text-[#1a1209] font-serif text-3xl mb-6">{`Reserve Your ${title} Experience`}</h3>
          <Link
            href={href}
            className="inline-block px-12 py-4 bg-[#c9a84c] text-black text-sm tracking-[0.25em] uppercase font-medium hover:bg-white transition-colors duration-300"
          >
            Enquire Now
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function SpecialPackages() {
  const [videoMeta, setVideoMeta] = useState<VideoMeta | null>(null);

  useEffect(() => {
    fetchVideoMeta("3BtuGZHHgV4").then(setVideoMeta);
  }, [])

  return (
    <div className="min-h-screen bg-[#faf8f4] text-[#1a1209]">
      <div
        className="relative h-[100vh] flex items-center justify-center"
        style={{
          backgroundImage: `url(${HERO_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center text-white px-4 max-w-3xl">
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="block text-[#c9a84c] text-xs tracking-[0.5em] uppercase mb-6">
              Curated for You
            </span>
            <h1 className="text-6xl md:text-9xl font-serif leading-none">
              Special<br />Packages
            </h1>
            <GoldDivider />
            <p className="text-stone-200 mt-4 text-lg max-w-lg mx-auto leading-relaxed">
              Three extraordinary ways to experience the grandeur of India's
              royal heritage — each crafted with singular devotion.
            </p>
          </MotionDiv>
        </div>
      </div>

      {/* ── QUICK NAV ── */}
      <nav className="sticky top-0 z-30 bg-[#faf8f4]/95 backdrop-blur border-b border-[#c9a84c]/30">
        <div className="container mx-auto px-6 max-w-6xl flex justify-center gap-12 py-4">
          {[
            { label: "Wedding", href: "#wedding" },
            { label: "Events", href: "#events" },
            { label: "Palace on Wheels", href: "#palace-on-wheels" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[#6b5c3e] text-xs tracking-[0.3em] uppercase hover:text-[#c9a84c] transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      {/* ── OVERVIEW CARDS ── */}
      <section className="py-20 container mx-auto px-6 max-w-6xl bg-[#faf8f4]">
        <div className="text-center mb-16">
          <SectionHeading title="Exclusive Offerings" subtitle="Tailored Experiences" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
          {[
            {
              href: "#wedding",
              img: WEDDING_HERO,
              label: "01",
              title: "Wedding",
              desc: "Celebrate your union in the grandeur of centuries-old palaces.",
            },
            {
              href: "#events",
              img: EVENTS_HERO,
              label: "02",
              title: "Events",
              desc: "Host milestone moments in regal settings with seamless execution.",
            },
            {
              href: "#palace-on-wheels",
              img: TRAIN_HERO,
              label: "03",
              title: "Palace on Wheels",
              desc: "Journey through royal Rajasthan aboard an iconic luxury train.",
            },
          ].map((card) => (
            <a
              key={card.title}
              href={card.href}
              className="group relative overflow-hidden block aspect-[3/4]"
            >
              <img
                src={card.img}
                alt={card.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <span className="text-[#c9a84c] text-xs tracking-[0.3em]">{card.label}</span>
                <h3 className="text-white font-serif text-3xl mt-1">{card.title}</h3>
                <p className="text-gray-300 text-sm mt-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {card.desc}
                </p>
                <span className="block mt-4 text-[#c9a84c] text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Discover →
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ── WEDDING SECTION ── */}
      <PackageSection
        id="wedding"
        href="/special-packages/wedding"
        tag="Package I"
        title="Wedding"
        subtitle="Your love story, set against centuries of royal splendour."
        description="From intimate ceremonies of 50 to grand celebrations of 2 000, our dedicated teams orchestrate every ritual with precision and heart. Palace courtyards draped in marigold garlands, ancestral banquet halls lit by a thousand diyas, and bridal suites perfumed with rose attar — every detail is composed like a poem. Let the legacy of maharajas frame your most cherished day."
        heroImg={WEDDING_HERO}
        triImages={[WEDDING_1, WEDDING_2, WEDDING_3]}
        features={weddingFeatures}
        price="From ₹12,00,000"
        priceNote="Per event · Customised quotations available"
        VideoMeta={videoMeta}
      />

      {/* ── EVENTS SECTION ── */}
      <PackageSection
        id="events"
        href="/special-packages/events"
        tag="Package II"
        title="Events"
        subtitle="Where every occasion becomes a story worth telling for generations."
        description="From intimate birthday celebrations to grand milestone parties—our palace venues transform every personal occasion into an extraordinary experience. With state-of-the-art audio-visual infrastructure set within heritage architecture, your celebration will command attention and leave a lasting impression on every guest who walks through our sandstone arches."
        heroImg={EVENTS_HERO}
        triImages={[EVENTS_1, EVENTS_2, EVENTS_3]}
        features={eventsFeatures}
        price="From ₹5,00,000"
        priceNote="Per event · Day & evening bookings available"
        reverse
      />

      {/* ── PALACE ON WHEELS SECTION ── */}
      <PackageSection
        id="palace-on-wheels"
        href="/special-packages/palace-on-wheels"
        tag="Package III"
        title="Palace on Wheels"
        subtitle="The world's finest luxury train journey through the heart of royal India."
        description="Embark on a seven-night odyssey through Rajasthan aboard our legendary Palace on Wheels — a rolling palace of 14 lavishly appointed saloon cars. Each carriage is named after a former royal state of Rajputana. Awake to desert dawns, alight at grand forts, and retire each evening to the gentle sway of the tracks with a single malt in hand. This is India as it was always meant to be seen."
        heroImg={TRAIN_HERO}
        triImages={[TRAIN_1, TRAIN_2, TRAIN_3]}
        features={trainFeatures}
        price="From $4,290 USD"
        priceNote="Per person, twin sharing · Departures Oct – Mar"
      />

      {/* ── FINAL GLOBAL CTA ── */}
      <section
        className="relative py-40 mt-10 flex items-center justify-center"
        style={{
          backgroundImage: `url(${HERO_BG})`,
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 text-center text-white px-6 max-w-2xl">
          <span className="text-[#f0d080] text-xs tracking-[0.5em] uppercase">Begin the Conversation</span>
          <GoldDivider />
          <h2 className="font-serif text-5xl md:text-6xl mt-4 leading-tight">
            Every Dream Deserves a Royal Stage
          </h2>
          <p className="text-stone-200 mt-6 leading-relaxed">
            Speak with our concierge team to craft a bespoke experience — no two packages are ever quite the same.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Link
              href="/contact"
              className="px-12 py-4 bg-[#c9a84c] text-black text-sm tracking-[0.25em] uppercase font-medium hover:bg-white transition-colors duration-300"
            >
              Contact Concierge
            </Link>
            <Link
              href="/rooms"
              className="px-12 py-4 border border-stone-200 text-white text-sm tracking-[0.25em] uppercase hover:border-[#f0d080] hover:text-[#f0d080] transition-colors duration-300"
            >
              View Rooms
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}