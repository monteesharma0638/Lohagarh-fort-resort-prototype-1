"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

type SpotCard = {
  title: string;
  description: string;
  image: string;
};

type Station = {
  name: string;
  shortNote: string;
  arrivalNote: string;
  heroImage: string;
  spots: SpotCard[];
};

const stations: Station[] = [
  {
    name: "New Delhi",
    shortNote: "The journey begins at the capital heart of India.",
    arrivalNote: "Board the train, settle in, and watch the route come alive.",
    heroImage: "/images/delhi/hero.jpg",
    spots: [
      {
        title: "India Gate",
        description: "A grand ceremonial landmark that sets the tone for the trip.",
        image: "/images/delhi/india-gate.jpg",
      },
      {
        title: "Qutub Minar",
        description: "An iconic tower that feels timeless against the city skyline.",
        image: "/images/delhi/qutub-minar.jpg",
      },
      {
        title: "Humayun's Tomb",
        description: "A calm heritage stop with beautiful Mughal architecture.",
        image: "/images/delhi/humayun-tomb.jpg",
      },
      {
        title: "Chandni Chowk",
        description: "Busy lanes, strong aromas, and classic Old Delhi energy.",
        image: "/images/delhi/chandni-chowk.jpg",
      },
      {
        title: "Lotus Temple",
        description: "A serene visual pause before the rails pick up speed.",
        image: "/images/delhi/lotus-temple.jpg",
      },
      {
        title: "Akshardham",
        description: "A polished finish to the capital chapter of the itinerary.",
        image: "/images/delhi/akshardham.jpg",
      },
    ],
  },
  {
    name: "Jaipur",
    shortNote: "Pink city energy, forts, palaces, and elegant geometry.",
    arrivalNote: "The journey slows down into royal architecture and warm color.",
    heroImage: "/images/jaipur/hero.jpg",
    spots: [
      {
        title: "Hawa Mahal",
        description: "The famous palace facade with its elegant lattice windows.",
        image: "/images/jaipur/hawa-mahal.jpg",
      },
      {
        title: "Amber Fort",
        description: "A dramatic hilltop fort with sweeping views and royal halls.",
        image: "/images/jaipur/amber-fort.jpg",
      },
      {
        title: "City Palace",
        description: "A regal blend of courtyards, museums, and vibrant details.",
        image: "/images/jaipur/city-palace.jpg",
      },
      {
        title: "Jantar Mantar",
        description: "An astronomy stop where science and heritage meet.",
        image: "/images/jaipur/jantar-mantar.jpg",
      },
      {
        title: "Jal Mahal",
        description: "A postcard-like palace floating quietly on the water.",
        image: "/images/jaipur/jal-mahal.jpg",
      },
      {
        title: "Nahargarh Fort",
        description: "A sunset-friendly viewpoint that frames the whole city.",
        image: "/images/jaipur/nahargarh.jpg",
      },
    ],
  },
  {
    name: "Sawai Madhopur",
    shortNote: "Wildlife, forest edges, and the rhythm of Ranthambore.",
    arrivalNote: "The visuals turn greener and the soundscape feels more open.",
    heroImage: "/images/sawai-madhopur/hero.jpg",
    spots: [
      {
        title: "Ranthambore Fort",
        description: "An ancient fort standing above forested terrain.",
        image: "/images/sawai-madhopur/ranthambore-fort.jpg",
      },
      {
        title: "Safari Gate",
        description: "The gateway to the jungle adventure and wildlife sightings.",
        image: "/images/sawai-madhopur/safari-gate.jpg",
      },
      {
        title: "Padam Talao",
        description: "A scenic lake where still water meets dense greenery.",
        image: "/images/sawai-madhopur/padam-talao.jpg",
      },
      {
        title: "Kachida Valley",
        description: "A quieter valley section where the landscape feels deeper.",
        image: "/images/sawai-madhopur/kachida-valley.jpg",
      },
      {
        title: "Ganesh Temple",
        description: "A peaceful spiritual stop inside the forested route.",
        image: "/images/sawai-madhopur/ganesh-temple.jpg",
      },
      {
        title: "Jogi Mahal",
        description: "A heritage pause near the lake with a rustic mood.",
        image: "/images/sawai-madhopur/jogi-mahal.jpg",
      },
    ],
  },
  {
    name: "Udaipur",
    shortNote: "Lakes, marble, and a soft reflective pace.",
    arrivalNote: "The route feels elegant here, with water and palaces everywhere.",
    heroImage: "/images/udaipur/hero.jpg",
    spots: [
      {
        title: "City Palace",
        description: "A majestic complex with lake views and detailed courtyards.",
        image: "/images/udaipur/city-palace.jpg",
      },
      {
        title: "Lake Pichola",
        description: "A calm lake setting that becomes the mood of the entire city.",
        image: "/images/udaipur/lake-pichola.jpg",
      },
      {
        title: "Jag Mandir",
        description: "An elegant island palace that feels made for postcards.",
        image: "/images/udaipur/jag-mandir.jpg",
      },
      {
        title: "Saheliyon Ki Bari",
        description: "A garden stop with fountains and leisurely pathways.",
        image: "/images/udaipur/saheliyon-ki-bari.jpg",
      },
      {
        title: "Fateh Sagar",
        description: "A bright lakeside stretch that gives the city more breathing room.",
        image: "/images/udaipur/fateh-sagar.jpg",
      },
      {
        title: "Bagore Ki Haveli",
        description: "A heritage house that adds texture to the lakeside route.",
        image: "/images/udaipur/bagore-ki-haveli.jpg",
      },
    ],
  },
  {
    name: "Jaisalmer",
    shortNote: "Golden desert tones and wind-carved silhouettes.",
    arrivalNote: "The palette shifts to sand, stone, and vast open skies.",
    heroImage: "/images/jaisalmer/hero.jpg",
    spots: [
      {
        title: "Jaisalmer Fort",
        description: "A living fort with yellow sandstone that glows in the sun.",
        image: "/images/jaisalmer/fort.jpg",
      },
      {
        title: "Patwon Ki Haveli",
        description: "Detailed craftsmanship that makes every facade worth a pause.",
        image: "/images/jaisalmer/patwon-ki-haveli.jpg",
      },
      {
        title: "Sam Sand Dunes",
        description: "The classic desert stop where the horizon becomes the hero.",
        image: "/images/jaisalmer/sam-sand-dunes.jpg",
      },
      {
        title: "Gadisar Lake",
        description: "A serene water break in the middle of the desert city.",
        image: "/images/jaisalmer/gadisar-lake.jpg",
      },
      {
        title: "Salim Singh Ki Haveli",
        description: "A unique structure with a striking roofline and historic charm.",
        image: "/images/jaisalmer/salim-singh-haveli.jpg",
      },
      {
        title: "Kuldhara",
        description: "A mysterious heritage stop that adds legend to the itinerary.",
        image: "/images/jaisalmer/kuldhara.jpg",
      },
    ],
  },
  {
    name: "Jodhpur",
    shortNote: "Blue city streets and bold fort silhouettes.",
    arrivalNote: "The route becomes dramatic with strong colors and high contrast.",
    heroImage: "/images/jodhpur/hero.jpg",
    spots: [
      {
        title: "Mehrangarh Fort",
        description: "The dominant fort that watches over the whole city.",
        image: "/images/jodhpur/mehrangarh-fort.jpg",
      },
      {
        title: "Jaswant Thada",
        description: "A peaceful marble memorial with a soft, refined feel.",
        image: "/images/jodhpur/jaswant-thada.jpg",
      },
      {
        title: "Umaid Bhawan",
        description: "A grand palace that brings a royal finish to the route.",
        image: "/images/jodhpur/umaid-bhawan.jpg",
      },
      {
        title: "Clock Tower",
        description: "A lively center point surrounded by market movement.",
        image: "/images/jodhpur/clock-tower.jpg",
      },
      {
        title: "Toorji Ka Jhalra",
        description: "An old stepwell with strong geometry and cool tones.",
        image: "/images/jodhpur/toorji-ka-jhalra.jpg",
      },
      {
        title: "Mandore Gardens",
        description: "A green heritage stop that softens the blue city chapter.",
        image: "/images/jodhpur/mandore-gardens.jpg",
      },
    ],
  },
  {
    name: "Agra",
    shortNote: "A final historic stretch with one of India’s most famous skylines.",
    arrivalNote: "The journey closes on monumental architecture and a calm emotional note.",
    heroImage: "/images/agra/hero.jpg",
    spots: [
      {
        title: "Taj Mahal",
        description: "The final signature landmark that gives the route its crown moment.",
        image: "/images/agra/taj-mahal.jpg",
      },
      {
        title: "Agra Fort",
        description: "A powerful red sandstone fort that anchors the city’s history.",
        image: "/images/agra/agra-fort.jpg",
      },
      {
        title: "Mehtab Bagh",
        description: "A peaceful view across the river toward the monument skyline.",
        image: "/images/agra/mehtab-bagh.jpg",
      },
      {
        title: "Itmad-ud-Daulah",
        description: "A delicate marble stop often called a jewel box of design.",
        image: "/images/agra/itmad-ud-daulah.jpg",
      },
      {
        title: "Fatehpur Sikri",
        description: "A heritage detour that adds a grand close to the route.",
        image: "/images/agra/fatehpur-sikri.jpg",
      },
      {
        title: "Sadar Bazaar",
        description: "A bustling end-note where travel energy meets local life.",
        image: "/images/agra/sadar-bazaar.jpg",
      },
    ],
  },
  {
    name: "New Delhi",
    shortNote: "The loop closes where it began, with a smooth return home.",
    arrivalNote: "The route ends softly, like a completed journey that still feels alive.",
    heroImage: "/images/delhi/return.jpg",
    spots: [
      {
        title: "Connaught Place",
        description: "A central urban stop that feels familiar and complete.",
        image: "/images/delhi/cp.jpg",
      },
      {
        title: "India Gate Evening",
        description: "A closing view that gives the circle of the journey a final glow.",
        image: "/images/delhi/india-gate-evening.jpg",
      },
      {
        title: "Humayun's Tomb",
        description: "A quiet heritage note that brings the trip back to balance.",
        image: "/images/delhi/humayun-tomb-2.jpg",
      },
      {
        title: "Lotus Temple",
        description: "A reflective pause before the story ends.",
        image: "/images/delhi/lotus-temple-2.jpg",
      },
      {
        title: "Akshardham",
        description: "A polished final frame for the closing station.",
        image: "/images/delhi/akshardham-2.jpg",
      },
      {
        title: "Old Delhi Streets",
        description: "A memory-heavy farewell to the route map.",
        image: "/images/delhi/old-delhi.jpg",
      },
    ],
  },
];

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function TrainJourney() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const trainRef = useRef<HTMLImageElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const svgLineRef = useRef<SVGGElement | null>(null);
  const [activeStation, setActiveStation] = useState(0);
  const [mounted, setMounted] = useState(false);

  const current = useMemo(() => stations[activeStation], [activeStation]);

  useEffect(() => {
    setMounted(true);

    if (!sectionRef.current || !trainRef.current || !pathRef.current) return;

    const totalScroll = window.innerHeight * stations.length * 1.05;

    const ctx = gsap.context(() => {
      const travelTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "end end",
          end: `+=${totalScroll}`,
          scrub: 1,
          pin: stickyRef.current,
          anticipatePin: 1,
          onUpdate: (self) => {
            const index = Math.min(
              stations.length - 1,
              Math.floor(self.progress * stations.length)
            );
            setActiveStation(index);
          },
        },
      });

      travelTl.to(trainRef.current, {
        motionPath: {
          path: pathRef.current,
          align: pathRef.current,
          autoRotate: false,
          alignOrigin: [0.5, 0.5],
        },
        ease: "none",
        duration: 0.18,
      });

      travelTl.to(
        svgLineRef.current,
        {
          opacity: 1,
          duration: 0.01,
        },
        0
      );

      gsap.to(svgLineRef.current?.querySelector(".pulse-train"), {
        x: 220,
        repeat: -1,
        yoyo: true,
        ease: "none",
        duration: 1.4,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      
      className="relative w-full overflow-hidden bg-[#07070b] text-white"
    >
      <div
        ref={stickyRef}
        className="relative flex min-h-screen items-center justify-center"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_35%),linear-gradient(to_bottom,_rgba(8,8,12,1),_rgba(6,6,10,1))]" />

        <div className="absolute left-0 top-0 h-full w-full opacity-40">
          <div className="absolute left-[-12%] top-[22%] h-72 w-72 rounded-full bg-[#7a4dff]/20 blur-3xl" />
          <div className="absolute right-[-8%] top-[10%] h-96 w-96 rounded-full bg-[#00c2ff]/10 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-10 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/70 backdrop-blur">
              Route map journey
            </div>
            <h1 className="text-4xl font-semibold leading-tight text-white md:text-6xl">
              Scroll through a cinematic train itinerary.
            </h1>
            <p ref={sectionRef} className="mt-4 max-w-2xl text-sm leading-7 text-white/65 md:text-base">
              The train enters from the junction holder, reaches each station,
              and then the route switches to a subtle SVG motion while the
              station title and location cards transform with the scroll.
            </p>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <div className="space-y-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.name}
                  initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -24, filter: "blur(8px)" }}
                  transition={{ duration: 0.45 }}
                  className="rounded-[28px] border border-white/10 bg-white/6 p-5 shadow-2xl shadow-black/30 backdrop-blur-xl md:p-7"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.35em] text-white/45">
                        Current station
                      </p>
                      <h2 className="mt-2 text-3xl font-semibold md:text-5xl">
                        {current.name}
                      </h2>
                      <p className="mt-3 max-w-2xl text-sm leading-6 text-white/70 md:text-base">
                        {current.shortNote}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white/70">
                      {activeStation + 1} / {stations.length}
                    </div>
                  </div>

                  <div className="mt-6 overflow-hidden rounded-[24px] border border-white/10 bg-black/25 p-4">
                    <div className="grid gap-4 md:grid-cols-[0.9fr_1.1fr] md:items-center">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] border border-white/10 bg-white/5">
                        <img
                          src={current.heroImage}
                          alt={current.name}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                          Journey update
                        </p>
                        <p className="mt-2 text-base leading-7 text-white/75 md:text-lg">
                          {current.arrivalNote}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2 text-xs text-white/50">
                          {stations.map((station, idx) => (
                            <span
                              key={station.name + idx}
                              className={cx(
                                "rounded-full border px-3 py-1",
                                idx === activeStation
                                  ? "border-white/30 bg-white/10 text-white"
                                  : "border-white/10 bg-white/5"
                              )}
                            >
                              {station.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <AnimatePresence mode="wait">
                  {current.spots.map((spot, index) => (
                    <motion.article
                      key={`${current.name}-${spot.title}`}
                      initial={{ opacity: 0, y: 22 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -22 }}
                      transition={{ duration: 0.35, delay: index * 0.04 }}
                      className="group overflow-hidden rounded-[24px] border border-white/10 bg-white/6 shadow-xl shadow-black/25 backdrop-blur-lg"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img
                          src={spot.image}
                          alt={spot.title}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                      </div>
                      <div className="space-y-2 p-4">
                        <h3 className="text-lg font-semibold text-white">
                          {spot.title}
                        </h3>
                        <p className="text-sm leading-6 text-white/65">
                          {spot.description}
                        </p>
                      </div>
                    </motion.article>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            <div className="relative min-h-[560px] rounded-[30px] border border-white/10 bg-white/5 p-5 shadow-2xl shadow-black/30 backdrop-blur-xl">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-white/40">
                    Track animation
                  </p>
                  <h3 className="mt-2 text-xl font-semibold">Train route motion</h3>
                </div>
                <div className="rounded-full border border-white/10 bg-black/20 px-3 py-2 text-xs text-white/55">
                  GSAP + Framer Motion
                </div>
              </div>

              <div className="relative h-[480px] overflow-hidden rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,_rgba(255,255,255,0.05),_rgba(255,255,255,0.01))] p-4">
                <svg
                  viewBox="0 0 620 420"
                  className="absolute inset-0 h-full w-full"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="routeGlow" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.2" />
                      <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.75" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M52 340 C 130 300, 170 260, 220 220 C 272 178, 335 170, 392 140 C 438 115, 490 104, 570 80"
                    stroke="url(#routeGlow)"
                    strokeWidth="7"
                    strokeLinecap="round"
                    strokeDasharray="1 0"
                    opacity="0.9"
                  />
                  <path
                    d="M52 340 C 130 300, 170 260, 220 220 C 272 178, 335 170, 392 140 C 438 115, 490 104, 570 80"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="12 14"
                    opacity="0.26"
                  />
                  <g ref={svgLineRef} opacity="0.7">
                    <motion.g
                      className="pulse-train"
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                      style={{ transformOrigin: "center" }}
                    >
                      <rect x="0" y="0" width="42" height="22" rx="6" fill="#ffffff" fillOpacity="0.14" />
                      <rect x="6" y="4" width="18" height="8" rx="3" fill="#ffffff" fillOpacity="0.7" />
                      <circle cx="12" cy="18" r="3" fill="#ffffff" fillOpacity="0.65" />
                      <circle cx="30" cy="18" r="3" fill="#ffffff" fillOpacity="0.65" />
                    </motion.g>
                  </g>
                </svg>

                <Image
                  ref={trainRef}
                  src="/images/train.png"
                  alt="Train"
                  width={260}
                  height={120}
                  className="absolute left-[15px] top-[252px] z-10 h-auto w-[190px] drop-shadow-[0_20px_25px_rgba(0,0,0,0.45)] md:w-[220px]"
                  priority
                />

                <div className="absolute bottom-4 left-4 flex items-end gap-4">
                  <div className="flex flex-col items-center">
                    <div className="h-4 w-4 rounded-full bg-white shadow-[0_0_30px_rgba(255,255,255,0.4)]" />
                    <div className="h-40 w-[2px] bg-gradient-to-b from-white to-transparent" />
                  </div>
                  <div className="relative rounded-[20px] border border-white/10 bg-black/35 px-4 py-3 backdrop-blur-md">
                    <p className="text-xs uppercase tracking-[0.35em] text-white/40">
                      Junction holder
                    </p>
                    <p className="mt-1 text-sm text-white/75">
                      The train starts from the lower-left junction and reaches the first station.
                    </p>
                  </div>
                </div>

                <Image
                  src="/images/junction-holder.png"
                  alt="Junction holder"
                  width={180}
                  height={180}
                  className="absolute bottom-0 left-0 z-[5] h-auto w-[160px] opacity-90 md:w-[180px]"
                />

                <div className="absolute inset-x-0 top-4 flex justify-center">
                  <div className="rounded-full border border-white/10 bg-black/30 px-4 py-2 text-xs tracking-[0.25em] text-white/55 backdrop-blur-md">
                    SVG movement takes over after the first arrival
                  </div>
                </div>

                <div className="absolute bottom-6 right-6 max-w-xs rounded-[22px] border border-white/10 bg-black/35 p-4 backdrop-blur-md">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                    Active station
                  </p>
                  <p className="mt-2 text-2xl font-semibold">{current.name}</p>
                  <p className="mt-2 text-sm leading-6 text-white/65">
                    Scroll to switch stations. The top cards refresh every time the journey reaches the next stop.
                  </p>
                </div>
              </div>

              <svg
                className="pointer-events-none absolute inset-0 h-full w-full opacity-0"
                viewBox="0 0 620 420"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  ref={pathRef}
                  d="M52 340 C 130 300, 170 260, 220 220 C 272 178, 335 170, 392 140 C 438 115, 490 104, 570 80"
                  stroke="transparent"
                  strokeWidth="1"
                />
              </svg>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="mx-auto mt-2 max-w-3xl rounded-[28px] border border-white/10 bg-white/5 px-5 py-5 text-center backdrop-blur-xl"
          >
            <p className="text-sm leading-7 text-white/70 md:text-base">
              This itinerary closes where it began — a full loop from New Delhi to Agra and back to New Delhi.
              The scroll keeps the movement cinematic while the station cards stay easy to read.
            </p>
            <p className="mt-3 text-sm font-medium text-white/90">
              Thank you for traveling with this route map.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
