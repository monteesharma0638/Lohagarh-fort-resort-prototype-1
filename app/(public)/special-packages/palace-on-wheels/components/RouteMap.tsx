"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";

/* ══════════════════════
   TRAIN SVG
══════════════════════ */
const TrainSVG = ({ width = 220 }) => (
  <svg width={width} viewBox="0 0 280 72" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", overflow: "visible" }}>
    {/* Carriage 2 (tail) */}
    <rect x="4" y="18" width="80" height="34" rx="5" fill="#1a120a" stroke="#c48b36" strokeWidth="1.2"/>
    <rect x="10" y="23" width="14" height="10" rx="2" fill="#f0c060" opacity="0.65"/>
    <rect x="30" y="23" width="14" height="10" rx="2" fill="#f0c060" opacity="0.65"/>
    <rect x="50" y="23" width="14" height="10" rx="2" fill="#f0c060" opacity="0.6"/>
    <rect x="70" y="23" width="9"  height="10" rx="2" fill="#f0c060" opacity="0.55"/>
    <rect x="6"  y="38" width="76" height="2.5" rx="1" fill="#c48b36" opacity="0.5"/>
    <circle cx="20" cy="54" r="8" fill="#111" stroke="#c48b36" strokeWidth="1.8"/>
    <circle cx="20" cy="54" r="4" fill="#1e1408" stroke="#c48b36" strokeWidth="1"/>
    <circle cx="68" cy="54" r="8" fill="#111" stroke="#c48b36" strokeWidth="1.8"/>
    <circle cx="68" cy="54" r="4" fill="#1e1408" stroke="#c48b36" strokeWidth="1"/>
    <rect x="80" y="34" width="10" height="4" rx="1" fill="#c48b36" opacity="0.7"/>
    {/* Carriage 1 */}
    <rect x="88" y="18" width="78" height="34" rx="5" fill="#1a120a" stroke="#c48b36" strokeWidth="1.2"/>
    <rect x="94"  y="23" width="14" height="10" rx="2" fill="#f0c060" opacity="0.7"/>
    <rect x="114" y="23" width="14" height="10" rx="2" fill="#f0c060" opacity="0.7"/>
    <rect x="134" y="23" width="14" height="10" rx="2" fill="#f0c060" opacity="0.65"/>
    <rect x="154" y="23" width="8"  height="10" rx="2" fill="#f0c060" opacity="0.6"/>
    <rect x="90"  y="38" width="74" height="2.5" rx="1" fill="#c48b36" opacity="0.55"/>
    <circle cx="104" cy="54" r="8" fill="#111" stroke="#c48b36" strokeWidth="1.8"/>
    <circle cx="104" cy="54" r="4" fill="#1e1408" stroke="#c48b36" strokeWidth="1"/>
    <circle cx="150" cy="54" r="8" fill="#111" stroke="#c48b36" strokeWidth="1.8"/>
    <circle cx="150" cy="54" r="4" fill="#1e1408" stroke="#c48b36" strokeWidth="1"/>
    <rect x="164" y="34" width="8" height="4" rx="1" fill="#c48b36" opacity="0.7"/>
    {/* Engine */}
    <rect x="170" y="14" width="100" height="38" rx="6" fill="#1a120a" stroke="#c48b36" strokeWidth="1.5"/>
    <rect x="238" y="6"  width="32" height="46" rx="5" fill="#221508" stroke="#c48b36" strokeWidth="1.5"/>
    <rect x="242" y="11" width="12" height="10" rx="2" fill="#f0c060" opacity="0.85"/>
    <ellipse cx="271" cy="35" rx="4" ry="4" fill="#ffe066" opacity="0.9"/>
    <ellipse cx="271" cy="35" rx="8" ry="8" fill="#ffe066" opacity="0.15"/>
    <rect x="180" y="4"  width="10" height="12" rx="3" fill="#2a1a08" stroke="#c48b36" strokeWidth="1"/>
    <rect x="172" y="18" width="64" height="3"  rx="1" fill="#c48b36" opacity="0.5"/>
    <rect x="172" y="42" width="64" height="3"  rx="1" fill="#c48b36" opacity="0.5"/>
    <circle cx="190" cy="54" r="10" fill="#111" stroke="#c48b36" strokeWidth="2"/>
    <circle cx="190" cy="54" r="5"  fill="#1e1408" stroke="#c48b36" strokeWidth="1"/>
    <circle cx="218" cy="54" r="10" fill="#111" stroke="#c48b36" strokeWidth="2"/>
    <circle cx="218" cy="54" r="5"  fill="#1e1408" stroke="#c48b36" strokeWidth="1"/>
    <circle cx="250" cy="54" r="8"  fill="#111" stroke="#c48b36" strokeWidth="2"/>
    <circle cx="250" cy="54" r="4"  fill="#1e1408" stroke="#c48b36" strokeWidth="1"/>
    <circle cx="268" cy="54" r="6"  fill="#111" stroke="#c48b36" strokeWidth="1.5"/>
    <line x1="190" y1="54" x2="250" y2="54" stroke="#c48b36" strokeWidth="2" opacity="0.7"/>
    <polygon points="270,52 280,58 270,58" fill="#c48b36" opacity="0.8"/>
    {/* Shadow */}
    <ellipse cx="140" cy="66" rx="128" ry="4" fill="#000" opacity="0.3"/>
  </svg>
);

/* ══════════════════════
   ITINERARY
══════════════════════ */
const itinerary = [
  { day:"Day 1", city:"New Delhi",      desc:"Ceremonial welcome at Safdarjung Station. Begin your royal odyssey amidst the grandeur of India's capital.",       icon:"🏛️", color:"#c48b36", img:"https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80", side:"right" },
  { day:"Day 2", city:"Jaipur",          desc:"The Pink City — visit the majestic Hawa Mahal and the fortress of Amber, draped in rose-hued splendour.",          icon:"🐘", color:"#e07b54", img:"https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80", side:"left"  },
  { day:"Day 3", city:"Sawai Madhopur",  desc:"Wild safari through tiger territory and the ancient Chittorgarh Fort rising from the Rajasthani plains.",          icon:"🐅", color:"#7a9e5f", img:"https://images.unsplash.com/photo-1561948955-570b270e7c36?w=800&q=80", side:"right" },
  { day:"Day 4", city:"Udaipur",         desc:"The City of Lakes — drift across Lake Pichola, past the legendary Jag Niwas floating palace.",                    icon:"🛶", color:"#5f8fae", img:"https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&q=80", side:"left"  },
  { day:"Day 5", city:"Jaisalmer",       desc:"Golden City at dusk — camel silhouettes against amber skies over the Sam Sand Dunes.",                            icon:"🏜️", color:"#d4a83a", img:"https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80", side:"right" },
  { day:"Day 6", city:"Jodhpur",         desc:"The Blue City — Mehrangarh Fort commands the horizon above a sea of cobalt rooftops.",                            icon:"🏰", color:"#4e7db5", img:"https://images.unsplash.com/photo-1581820624879-1a0e49a90ef5?w=800&q=80", side:"left"  },
  { day:"Day 7", city:"Agra",            desc:"Bird sanctuary serenity and the Taj Mahal at dawn — a monument to eternal devotion.",                             icon:"🕊️", color:"#c4a882", img:"https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=80", side:"right" },
  { day:"Day 8", city:"New Delhi",       desc:"Return to Safdarjung for a grand farewell breakfast. Your royal journey draws to a close.",                        icon:"🚉", color:"#c48b36", img:"https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80", side:"left"  },
];

/* ══════════════════════
   useMediaQuery
══════════════════════ */
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    setMatches(mq.matches);
    const h = (e: MediaQueryListEvent) => setMatches(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, [query]);
  return matches;
}

/* ══════════════════════
   TRACK SVG
══════════════════════ */
const TrackLine = ({ leftEdge }: { leftEdge: boolean }) => (
  <svg
    style={{
      position: "absolute", top: 0, height: "100%", width: 48,
      left: leftEdge ? 20 : "50%",
      transform: leftEdge ? "none" : "translateX(-50%)",
      pointerEvents: "none", zIndex: 1,
    }}
    preserveAspectRatio="none"
    viewBox="0 0 48 1000"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line x1="14" y1="0" x2="14" y2="1000" stroke="#2a1f10" strokeWidth="3.5"/>
    <line x1="34" y1="0" x2="34" y2="1000" stroke="#2a1f10" strokeWidth="3.5"/>
    {Array.from({ length: 120 }).map((_, i) => (
      <rect key={i} x="7" y={i * 9} width="34" height="4" rx="1.5" fill="#1e1508" opacity="0.95"/>
    ))}
    <line x1="14" y1="0" x2="14" y2="1000" stroke="#c48b36" strokeWidth="1.2" opacity="0.4"/>
    <line x1="34" y1="0" x2="34" y2="1000" stroke="#c48b36" strokeWidth="1.2" opacity="0.4"/>
  </svg>
);

/* ══════════════════════════════════════════════
   THE TRAIN — position:fixed, clamped to section

   How it works:
   1. We use an IntersectionObserver on the section to know when
      the section is in view → show/hide the fixed train.
   2. We use getBoundingClientRect on scroll to compute exact
      progress (0→1) of the section through the viewport.
   3. That progress drives the train's top position from
      ~8vh to ~88vh via a spring.

   This is 100% reliable — no sticky quirks, no broken transforms.
══════════════════════════════════════════════ */
const FixedTrain = ({ sectionRef, leftEdge }: any) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      {
        root: null,
        rootMargin: "-100px 0px -100px 0px",
      }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [sectionRef]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // ✅ Responsive vertical movement
  const top = useTransform(
    scrollYProgress,
    [0, 1],
    ["12vh", "88vh"] // more natural for tall screens
  );

  const trainWidth = leftEdge ? 80 : 120; // mobile : desktop


  // ✅ Correct alignment with track
  const leftStyle = leftEdge
    ? -5 // mobile (left track)
    : "50%"; // desktop (center track)

  if (!visible) return null;

  return (
    <motion.div
      style={{
        position: "fixed",
        top,
        left: leftStyle,
        x: leftEdge ? 0 : "-50%", // center align on desktop
        zIndex: 50,
        pointerEvents: "none",
      }}
    >
      <motion.div style={{ width: trainWidth }}>
        <Image
          src="/train.png"
          alt="train"
          width={200}
          height={600}
          style={{ width: "100%", height: "auto" }}
          priority
        />
      </motion.div>
    </motion.div>
  );
};
/* ══════════════════════
   CARD INNER
══════════════════════ */
const CardInner = ({ item, imgHeight = "h-44", titleSize = "text-2xl", padding = "p-5" }: { item: typeof itinerary[0]; imgHeight?: string; titleSize?: string; padding?: string }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 90%", "end 20%"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);

  return (
    <div ref={ref} className="rounded-xl overflow-hidden border border-white/[0.07] shadow-2xl shadow-black/70" style={{ background: "#16100a" }}>
      <div className={`${imgHeight} overflow-hidden relative`}>
        <motion.img style={{ y: imgY }} src={item.img} alt={item.city} className="w-full h-[120%] object-cover"/>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#16100a]"/>
        <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[9px] uppercase tracking-[0.2em] font-bold backdrop-blur-sm border"
          style={{ color: item.color, borderColor: item.color+"50", background: item.color+"18", fontFamily:"sans-serif" }}>
          {item.day}
        </div>
        <div className="absolute top-3 right-3 text-xl">{item.icon}</div>
      </div>
      <div className={padding}>
        <h3 className={`${titleSize} font-serif mb-2 tracking-tight`} style={{ color: item.color }}>{item.city}</h3>
        <p className="text-white/55 text-sm leading-relaxed" style={{ fontFamily:"sans-serif" }}>{item.desc}</p>
        <motion.div
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.55 }}
          className="mt-4 h-[1px] origin-left"
          style={{ background: `linear-gradient(to right, ${item.color}60, transparent)` }}
        />
      </div>
    </div>
  );
};

/* ══════════════════════
   STATION DOT
══════════════════════ */
const StationDot = ({ isLeft, mobile }: { isLeft?: boolean; mobile?: boolean }) => {
  if (mobile) return (
    <>
      <motion.div initial={{ scale:0 }} whileInView={{ scale:1 }} transition={{ delay:0.12, type:"spring" }}
        className="absolute left-[26px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-amber-400 bg-[#0f0b06] z-20"/>
      <div className="absolute left-[38px] top-1/2 -translate-y-1/2 h-[1px] w-8"
        style={{ background:"linear-gradient(to right,#f59e0b50,transparent)" }}/>
    </>
  );
  return (
    <>
      <motion.div initial={{ scale:0 }} whileInView={{ scale:1 }} transition={{ delay:0.18, type:"spring" }}
        className={`absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border-2 border-amber-400 bg-[#0f0b06] z-20 ${isLeft ? "right-[calc(53%-52px)]" : "left-[calc(53%-52px)]"}`}/>
      <div className={`absolute top-1/2 -translate-y-1/2 h-[1px] w-12 ${isLeft ? "right-[calc(53%-40px)] bg-gradient-to-r from-transparent to-amber-500/50" : "left-[calc(53%-40px)] bg-gradient-to-r from-amber-500/50 to-transparent"}`}/>
    </>
  );
};

/* ── Mobile Card ── */
const MobileCard = ({ item }: { item: typeof itinerary[0] }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target:ref, offset:["start 88%","start 28%"] });
  const opacity = useTransform(scrollYProgress, [0,.4,.85,1], [0,1,1,.75]);
  const y       = useTransform(scrollYProgress, [0,.5], [20,0]);
  return (
    <motion.div ref={ref} style={{ opacity, y }} className="relative flex items-center min-h-[72vh] py-10 pl-16 pr-4">
      <StationDot mobile={true}/>
      <div className="w-full"><CardInner item={item} imgHeight="h-40" titleSize="text-xl" padding="p-4"/></div>
    </motion.div>
  );
};

/* ── Tablet Card ── */
const TabletCard = ({ item }: { item: typeof itinerary[0] }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target:ref, offset:["start 88%","start 25%"] });
  const opacity = useTransform(scrollYProgress, [0,.4,.85,1], [0,1,1,.75]);
  const y       = useTransform(scrollYProgress, [0,.5], [22,0]);
  return (
    <motion.div ref={ref} style={{ opacity, y }} className="relative flex items-center min-h-[75vh] py-12 pl-20 pr-8">
      <StationDot mobile={true}/>
      <div className="w-full max-w-md"><CardInner item={item} imgHeight="h-48" titleSize="text-2xl" padding="p-5"/></div>
    </motion.div>
  );
};

/* ── Desktop Card ── */
const DesktopCard = ({ item }: { item: typeof itinerary[0] }) => {
  const ref = useRef(null);
  const isLeft = item.side === "left";
  const { scrollYProgress } = useScroll({ target:ref, offset:["start 85%","start 20%"] });
  const opacity = useTransform(scrollYProgress, [0,.35,.85,1], [0,1,1,.65]);
  const x       = useTransform(scrollYProgress, [0,.4], [isLeft ? -50 : 50, 0]);
  const scale   = useTransform(scrollYProgress, [0,.4], [0.95,1]);
  return (
    <motion.div ref={ref} style={{ opacity, x, scale }}
      className={`relative flex items-center min-h-[85vh] py-16 ${isLeft ? "justify-start pl-10 xl:pl-20 pr-[53%]" : "justify-end pr-10 xl:pr-20 pl-[53%]"}`}>
      <StationDot isLeft={isLeft}/>
      <div className="w-full" style={{ maxWidth:400 }}>
        <CardInner item={item} imgHeight="h-52" titleSize="text-2xl" padding="p-5"/>
      </div>
    </motion.div>
  );
};

/* ══════════════════════
   ROOT
══════════════════════ */
const RouteMap = () => {
  const sectionRef = useRef(null);
  const isMobile   = useMediaQuery("(max-width: 639px)");
  const isTablet   = useMediaQuery("(min-width: 640px) and (max-width: 1023px)");
  const leftEdge   = isMobile || isTablet;

  return (
    <section ref={sectionRef} style={{ position:"relative", fontFamily:"'Georgia', serif", overflowX:"hidden" }}>

      {/* Train */}
      <div style={{
        position:"relative", inset:0, pointerEvents:"none", opacity:0.025, top: 0,
        backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundRepeat:"repeat", backgroundSize:"120px",
      }}/>
      <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0 }}>
        <div style={{ position:"absolute", top:"30%", left:"50%", transform:"translate(-50%,-50%)", width:400, height:400, background:"rgba(180,120,40,0.07)", borderRadius:"50%", filter:"blur(100px)" }}/>
      </div>

      {/* ── HEADER ── */}
      <div className="relative z-10 text-center pt-14 sm:pt-20 lg:pt-24 pb-6 sm:pb-10 px-4">
        <motion.p initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
          className="text-amber-500 uppercase tracking-[0.4em] text-[10px] sm:text-xs mb-3" style={{ fontFamily:"sans-serif" }}>
          The Palace on Wheels
        </motion.p>
        <motion.h1 initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.15 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-primary font-serif mb-4 leading-tight"
          style={{ textShadow:"0 0 80px #c48b3628" }}>
          Royal Journey
        </motion.h1>
        <motion.div initial={{ scaleX:0 }} animate={{ scaleX:1 }} transition={{ delay:0.4, duration:0.8 }}
          className="w-24 sm:w-32 h-[1px] bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-4"/>
        <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.5 }}
          className="text-black text-xs sm:text-sm max-w-[220px] sm:max-w-xs mx-auto leading-relaxed" style={{ fontFamily:"sans-serif" }}>
          Scroll to travel through eight days of Rajasthan magnificence
        </motion.p>
        <motion.div animate={{ y:[0,8,0] }} transition={{ repeat:Infinity, duration:2 }}
          className="mt-6 sm:mt-10 text-amber text-[10px] sm:text-xs tracking-widest uppercase" style={{ fontFamily:"sans-serif" }}>
          ↓ scroll
        </motion.div>
      </div>

      {/* ── JOURNEY ── */}
      <div style={{ position:"relative", zIndex:10 }}>
        <TrackLine leftEdge={leftEdge}/>

        {itinerary.map((item, i) => (
          <div key={i} className="relative">
            <div className="block sm:hidden"><MobileCard item={item}/></div>
            <div className="hidden sm:block lg:hidden"><TabletCard item={item}/></div>
            <div className="hidden lg:block"><DesktopCard item={item}/></div>
          </div>
        ))}
      </div>

      {/* ── FOOTER ── */}
      <div className="relative z-10 text-center pb-16 sm:pb-24 pt-6 px-4">
        <motion.div initial={{ opacity:0, scale:0.9 }} whileInView={{ opacity:1, scale:1 }}
          className="inline-block px-6 sm:px-8 py-3 sm:py-4 rounded-full border border-amber-500/70 bg-amber-500/5 backdrop-blur-sm">
          <p className="text-amber-400 text-xs sm:text-sm tracking-widest uppercase" style={{ fontFamily:"sans-serif" }}>
            🚉 Journey Complete
          </p>
        </motion.div>
      </div>

      {/* ── TRAIN — fixed, clamped to section via IntersectionObserver ── */}
      <FixedTrain sectionRef={sectionRef} leftEdge={leftEdge}/>

    </section>
  );
};

export default RouteMap;