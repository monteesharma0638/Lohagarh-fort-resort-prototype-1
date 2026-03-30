"use client";

import React, { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// ─── SCROLL BUDGET ────────────────────────────────────────────────────────────
// Total = 48000px  |  8 stations × 6000px each
const TOTAL_SCROLL       = 18000;
const STATIONS_COUNT     = 8;

const T = {
  ARRIVED:     0.12,
  DOOR_OPEN:   0.18,
  PEOPLE_OUT:  0.28,
  PEOPLE_IN:   0.90,
  DOOR_CLOSED: 0.94,
  DEPARTED:    0.97,
};

const STATIONS = [
  {
    name: "New Delhi", code: "NDLS", tagline: "City of Empires",
    cards: [],
  },
  {
    name: "Jaipur", code: "JP", tagline: "The Pink City",
    cards: [
      { title: "Hawa Mahal",    desc: "Palace of the breeze",           tag: "Iconic"   },
      { title: "Amber Fort",    desc: "Rajput glory on a ridge",        tag: "Heritage" },
      { title: "City Palace",   desc: "Royal residence still alive",    tag: "Royal"    },
      { title: "Jantar Mantar", desc: "Celestial instruments in stone", tag: "UNESCO"   },
      { title: "Nahargarh Fort",desc: "Sunset vistas over the city",    tag: "Vista"    },
      { title: "Johari Bazaar", desc: "Jewels and lac bangles",         tag: "Market"   },
      { title: "Jal Mahal",     desc: "Water palace at dusk",           tag: "Romance"  },
      { title: "Albert Hall",   desc: "Indo-Saracenic masterpiece",     tag: "Museum"   },
    ],
  },
  {
    name: "Sawai Madhupur", code: "SWM", tagline: "Gateway to the Wild",
    cards: [
      { title: "Ranthambore",      desc: "Tigers in ancient ruins",             tag: "Safari"    },
      { title: "Ranthambore Fort", desc: "10th-century citadel",                tag: "Heritage"  },
      { title: "Padam Talao",      desc: "Largest lake in the park",            tag: "Nature"    },
      { title: "Jogi Mahal",       desc: "Forest lodge at the lake",            tag: "Retreat"   },
      { title: "Trinetra Ganesh",  desc: "Sacred temple in the fort",           tag: "Spiritual" },
      { title: "Kachida Valley",   desc: "Leopard and sloth bear country",      tag: "Wildlife"  },
      { title: "Raj Bagh Ruins",   desc: "Crumbling palace and crocodiles",     tag: "Ruins"     },
      { title: "Zone 3 & 4",       desc: "Prime big-cat territory",             tag: "Safari"    },
    ],
  },
  {
    name: "Udaipur", code: "UDZ", tagline: "Venice of the East",
    cards: [
      { title: "City Palace",       desc: "Marble and mirror on the lake",      tag: "Royal"     },
      { title: "Lake Pichola",      desc: "Shimmering heart of the city",       tag: "Scenic"    },
      { title: "Jag Mandir",        desc: "Island palace of exile",             tag: "History"   },
      { title: "Saheliyon-ki-Bari", desc: "Garden of the Maidens",              tag: "Garden"    },
      { title: "Bagore-ki-Haveli",  desc: "Mewar cultural evening",             tag: "Culture"   },
      { title: "Fateh Sagar Lake",  desc: "Western lake at golden hour",        tag: "Sunset"    },
      { title: "Eklingji Temple",   desc: "Lord Shiva's royal seat",            tag: "Spiritual" },
      { title: "Sajjangarh",        desc: "Monsoon Palace on the hill",         tag: "Vista"     },
    ],
  },
  {
    name: "Jaisalmer", code: "JSM", tagline: "The Golden City",
    cards: [
      { title: "Jaisalmer Fort",     desc: "Living fort of golden sandstone",   tag: "UNESCO"       },
      { title: "Sam Sand Dunes",     desc: "Camel rides at sunset",             tag: "Desert"       },
      { title: "Patwon-ki-Haveli",   desc: "Filigree facades in gold",          tag: "Heritage"     },
      { title: "Gadisar Lake",       desc: "Migratory birds at dawn",           tag: "Nature"       },
      { title: "Desert Camp",        desc: "Stars above the Thar",              tag: "Experience"   },
      { title: "Salim Singh Haveli", desc: "Peacock arch mansion",              tag: "Architecture" },
      { title: "Bada Bagh",          desc: "Royal cenotaphs in the dunes",      tag: "Regal"        },
      { title: "Kuldhara Village",   desc: "Haunted, abandoned hamlet",         tag: "Mystery"      },
    ],
  },
  {
    name: "Jodhpur", code: "JU", tagline: "The Blue City",
    cards: [
      { title: "Mehrangarh Fort", desc: "Towering above blue rooftops",    tag: "Majestic"  },
      { title: "Umaid Bhawan",    desc: "Art Deco palace hotel",            tag: "Luxury"    },
      { title: "Jaswant Thada",   desc: "Marble cenotaph aglow",           tag: "Heritage"  },
      { title: "Clock Tower",     desc: "Bazaar life below the spire",     tag: "Market"    },
      { title: "Mandore Gardens", desc: "Ruins and cenotaphs at dusk",     tag: "Garden"    },
      { title: "Sardar Market",   desc: "Handicrafts and textiles",        tag: "Shopping"  },
      { title: "Blue City Walk",  desc: "Cobalt lanes of Brahmpuri",       tag: "Culture"   },
      { title: "Balsamand Lake",  desc: "9th century reservoir",           tag: "Scenic"    },
    ],
  },
  {
    name: "Agra", code: "AGC", tagline: "The City of the Taj",
    cards: [
      { title: "Taj Mahal",      desc: "Love in white marble",                 tag: "UNESCO"       },
      { title: "Agra Fort",      desc: "Red sandstone Mughal citadel",         tag: "Heritage"     },
      { title: "Fatehpur Sikri", desc: "Abandoned capital in stone",           tag: "UNESCO"       },
      { title: "Mehtab Bagh",    desc: "Moonlight garden across the river",    tag: "Scenic"       },
      { title: "Itmad-ud-Daula", desc: "Baby Taj—first marble mausoleum",     tag: "Mughal"       },
      { title: "Kinari Bazaar",  desc: "Marble inlay and brasswork",           tag: "Market"       },
      { title: "Jama Masjid",    desc: "Shah Jahan's mosque",                 tag: "Spiritual"    },
      { title: "Chini-ka-Rauza", desc: "Persian tile masterpiece",            tag: "Architecture" },
    ],
  },
  {
    name: "New Delhi", code: "NDLS", tagline: "Journey Complete",
    cards: [],
  },
];

const TAG_COLORS: Record<string, string> = {
  Heritage: "#c9a84c", UNESCO: "#e8a045", Mughal: "#b87333",
  Landmark: "#8fbc8f", Garden: "#6b8f71", Market: "#d4956a",
  Spiritual: "#9b7db6", Culture: "#c17f7f", Royal: "#c9a84c",
  Iconic: "#e8a045", Vista: "#6aafb8", Romance: "#c17f7f",
  Museum: "#8fbc8f", Safari: "#7a9e5c", Nature: "#6b8f71",
  Retreat: "#9b7db6", Wildlife: "#7a9e5c", Ruins: "#b87333",
  Scenic: "#6aafb8", History: "#b87333", Sunset: "#e8a045",
  Desert: "#c9a84c", Experience: "#d4956a", Architecture: "#b87333",
  Regal: "#c9a84c", Mystery: "#9b7db6", Luxury: "#c9a84c",
  Majestic: "#c9a84c", Shopping: "#d4956a",
};

// ─── INLINE PEOPLE SVG ────────────────────────────────────────────────────────
const PeopleSVG = ({ flipped = false }) => (
  <svg
    width="96" height="52" viewBox="0 0 96 52"
    style={{ transform: flipped ? "scaleX(-1)" : "none", overflow: "visible", display: "block" }}
  >
    {[0, 1, 2].map((i) => {
      const cx = 16 + i * 32;
      const legAngle = i % 2 === 0 ? 14 : -14;
      return (
        <g key={i} transform={`translate(${cx},0)`}>
          <circle cx="0" cy="7" r="5.5" fill="#2a1f0e" />
          <rect x="-4.5" y="13" width="9" height="16" rx="3" fill="#2a1f0e" />
          <rect x="-4.5" y="27" width="3.5" height="14" rx="1.5" fill="#2a1f0e"
            style={{ transformOrigin: "-2.75px 27px", transform: `rotate(${-legAngle}deg)` }} />
          <rect x="1" y="27" width="3.5" height="14" rx="1.5" fill="#3a2a14"
            style={{ transformOrigin: "2.75px 27px", transform: `rotate(${legAngle}deg)` }} />
          <line x1="4.5" y1="17" x2="10" y2="24" stroke="#2a1f0e" strokeWidth="2.5" strokeLinecap="round" />
          <rect x="9" y="23" width="10" height="7" rx="2" fill="#c9a84c" />
          <rect x="11" y="21" width="6" height="3" rx="1" fill="none" stroke="#c9a84c" strokeWidth="1.2" />
          <line x1="9" y1="26.5" x2="19" y2="26.5" stroke="#b8953e" strokeWidth="0.8" />
        </g>
      );
    })}
  </svg>
);

// ─── PROGRESS DOTS ────────────────────────────────────────────────────────────
const ProgressDots = ({ total, active }: { total: number; active: number }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
    {Array.from({ length: total }).map((_, i) => (
      <div key={i} style={{
        width: i === active ? 20 : 6, height: 6, borderRadius: 3,
        background: i === active ? "#c9a84c" : "#d4c9a8",
        transition: "all 0.4s ease",
      }} />
    ))}
  </div>
);

// ─── LOCATION SLIDER ─────────────────────────────────────────────────────────
// FIX: uses height: "100%" so it fills its flex wrapper entirely (no blank space)
const LocationSlider = ({ cards, visibleCount, stationKey }: any) => {
  const activeCard = Math.max(0, visibleCount - 1);

  return (
    <div style={{
      width: "100%",
      height: "100%",          // ← fills the flex-1 wrapper; was `flex: 1`
      position: "relative",
      overflow: "hidden",
      borderRadius: 12,
      background: "#1a1208",
    }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={`${stationKey}-${activeCard}`}
          initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0.6 }}
          animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
          exit={{ clipPath: "inset(0 0 0 100%)", opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.76, 0, 0.24, 1] }}
          style={{ position: "absolute", inset: 0, display: "flex" }}
        >
          {/* Gradient background placeholder */}
          <div style={{
            position: "absolute", inset: 0,
            background: `linear-gradient(
              135deg,
              hsl(${(activeCard * 37) % 360}, 35%, 22%) 0%,
              hsl(${(activeCard * 37 + 40) % 360}, 45%, 35%) 100%
            )`,
          }}>
            <div style={{
              position: "absolute", inset: 0,
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`,
            }} />
          </div>

          {/* Text legibility overlay */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to right, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)",
          }} />

          {/* Content */}
          <div style={{
            position: "relative", zIndex: 2,
            display: "flex", flexDirection: "column",
            justifyContent: "flex-end",
            padding: "28px 36px",
            height: "100%",
          }}>
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              style={{
                alignSelf: "flex-start",
                fontFamily: "'DM Mono', monospace",
                fontSize: 9, fontWeight: 600,
                letterSpacing: "0.14em", textTransform: "uppercase",
                color: "#1a1208",
                background: TAG_COLORS[cards[activeCard]?.tag] || "#c9a84c",
                borderRadius: 99, padding: "3px 10px",
                marginBottom: 12,
              }}
            >
              {cards[activeCard]?.tag}
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 700, fontSize: 42,
                color: "#f5f0e8", lineHeight: 1.05,
                margin: 0, marginBottom: 8,
                letterSpacing: "-0.02em",
              }}
            >
              {cards[activeCard]?.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic", fontSize: 16,
                color: "rgba(245,240,232,0.65)",
                margin: 0, marginBottom: 24,
              }}
            >
              {cards[activeCard]?.desc}
            </motion.p>

            {/* Dot indicators */}
            <div style={{ display: "flex", gap: 6 }}>
              {cards.map((_: any, i: number) => (
                <div key={i} style={{
                  height: 3, borderRadius: 2,
                  width: i === activeCard ? 24 : 6,
                  background: i === activeCard
                    ? "#c9a84c"
                    : i < visibleCount
                      ? "rgba(245,240,232,0.4)"
                      : "rgba(245,240,232,0.12)",
                  transition: "all 0.4s ease",
                }} />
              ))}
            </div>
          </div>

          {/* Slide counter */}
          <div style={{
            position: "absolute", top: 20, right: 24,
            fontFamily: "'DM Mono', monospace",
            fontSize: 10, color: "rgba(245,240,232,0.4)",
            letterSpacing: "0.1em",
          }}>
            {String(activeCard + 1).padStart(2, "0")}
            <span style={{ color: "rgba(245,240,232,0.2)" }}>
              /{String(cards.length).padStart(2, "0")}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Gold bottom border */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        height: 2,
        background: "linear-gradient(90deg, #c9a84c, transparent)",
        zIndex: 3,
      }} />
    </div>
  );
};

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function InvertedTrainJourney() {
  const containerRef   = useRef<HTMLDivElement>(null);
  const trackRef       = useRef<SVGLineElement>(null);
  const trainWrapRef   = useRef<HTMLDivElement>(null);
  const journeyDoneRef = useRef(false);

  const [activeIdx,    setActiveIdx]    = useState(0);
  const [doorOpen,     setDoorOpen]     = useState(false);
  const [peoplePhase,  setPeoplePhase]  = useState("hidden");
  // "hidden" | "exiting" | "outside" | "boarding" | "gone"
  const [visibleCards, setVisibleCards] = useState(0);
  const [showEnd,      setShowEnd]      = useState(false);
  const [trainExited,  setTrainExited]  = useState(false);
  // FIX: track only moves during arrival/departure transitions, not during card reveal
  const [trackMoving,  setTrackMoving]  = useState(false);
  const [trainX, setTrainX] = useState(110); 

  const stateRef = useRef<{ activeIdx?: number }>({});
  stateRef.current = { activeIdx };

  const handleUpdate = useCallback((self: ScrollTrigger) => {
    requestAnimationFrame(() => {
      if (journeyDoneRef.current) return;

      const totalProgress = self.progress;
      const stIdx   = Math.min(Math.floor(totalProgress * STATIONS_COUNT), STATIONS_COUNT - 1);
      const raw     = totalProgress * STATIONS_COUNT;
      const spLocal = raw - Math.floor(raw); // 0→1 within current station

      // ── Reset on new station ──────────────────────────────────────────────
      if (stIdx !== stateRef.current?.activeIdx) {
        stateRef.current = { activeIdx: stIdx };
        setActiveIdx(stIdx);
        setTrainX(110);
        setDoorOpen(false);
        setPeoplePhase("hidden");
        setVisibleCards(0);
        setTrainExited(false);
        setShowEnd(false);
      }

      // ── Track: move only during arrival (< ARRIVED) or departure (>= DEPARTED)
      // NOT during the card-reveal window. This is the key fix for the track behaviour.
      setTrackMoving(spLocal < T.ARRIVED || spLocal >= T.DEPARTED);

      // ── Last station finale ───────────────────────────────────────────────
      if (stIdx === STATIONS_COUNT - 1 && spLocal >= T.DEPARTED) {
        journeyDoneRef.current = true;
        setTrainExited(true);
        setShowEnd(true);
        setTrackMoving(false);
        ScrollTrigger.getAll().forEach((st) => st.kill());
        return;
      }

      // ── Door ─────────────────────────────────────────────────────────────
      setDoorOpen(spLocal >= T.ARRIVED && spLocal < T.DOOR_CLOSED);

      // ── People: ONLY visible at station 0 (departure) and station 7 (arrival)
      // Hidden for all intermediate stops.
      if (stIdx === 0 || stIdx === STATIONS_COUNT - 1) {
        if      (spLocal < T.ARRIVED)     setPeoplePhase("hidden");
        else if (spLocal < T.DOOR_OPEN)   setPeoplePhase("hidden");
        else if (spLocal < T.PEOPLE_OUT)  setPeoplePhase("exiting");
        else if (spLocal < T.PEOPLE_IN)   setPeoplePhase("outside");
        else if (spLocal < T.DOOR_CLOSED) setPeoplePhase("boarding");
        else                              setPeoplePhase("gone");
      } else {
        setPeoplePhase("hidden");
      }

      if (spLocal < T.ARRIVED) {
        setTrainX((1 - spLocal / T.ARRIVED) * 110);
        } else {
        setTrainX(0);
        }

      // ── Cards (one per scroll chunk) ──────────────────────────────────────
      const cardWindow = T.PEOPLE_IN - T.PEOPLE_OUT;
      const cardStep   = cardWindow / 8;
      if (spLocal < T.PEOPLE_OUT) {
        setVisibleCards(0);
      } else if (spLocal >= T.PEOPLE_IN) {
        setVisibleCards(8);
      } else {
        const rawCount = (spLocal - T.PEOPLE_OUT) / cardStep;
        setVisibleCards(Math.min(Math.max(0, Math.floor(rawCount)), 8));
      }
    });
  }, []);

  // ── Skip Tour: kill pin, jump to end screen ─────────────────────────────────
  const handleSkip = useCallback(() => {
    ScrollTrigger.getAll().forEach((st) => st.kill());
    journeyDoneRef.current = true;
    setActiveIdx(STATIONS_COUNT - 1);
    setTrainExited(true);
    setShowEnd(true);
    setTrackMoving(false);
    // Scroll back to top so the component (now unpinned) is in view
    window.scrollTo(0, 0);
  }, []);

  useGSAP(() => {
    // No track animation in the GSAP timeline — track is now driven by CSS class.
    // We only need the ScrollTrigger for the onUpdate hook.
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: `+=${TOTAL_SCROLL}`,
      pin: true,
      pinSpacing: true,
      scrub: 0.8,
      anticipatePin: 1,
      onUpdate: handleUpdate,
      onLeave: (self) => {
        self.scroll(self.end);
      },
    });
  }, { scope: containerRef });

  const station = STATIONS[activeIdx];

  // ─── People position ──────────────────────────────────────────────────────
  const DOOR_X     = "calc(14% + 280px)";
  const PLATFORM_X = "calc(14% + 420px)";

  let peopleLeft    = DOOR_X;
  let peopleOpacity = 0;
  let peopleFlipped = false;

  switch (peoplePhase) {
    case "exiting":
      peopleLeft = PLATFORM_X; peopleOpacity = 1; peopleFlipped = false; break;
    case "outside":
      peopleLeft = PLATFORM_X; peopleOpacity = 1; peopleFlipped = false; break;
    case "boarding":
      peopleLeft = DOOR_X;     peopleOpacity = 1; peopleFlipped = true;  break;
    default:
      peopleOpacity = 0;
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Mono:wght@300;400;500&display=swap');

        @keyframes goldShimmer {
          0%   { background-position: -500px 0; }
          100% { background-position: 500px 0; }
        }
        .end-title {
          background: linear-gradient(90deg, #c9a84c 0%, #f5e9c0 35%, #e8c96a 50%, #f5e9c0 65%, #c9a84c 100%);
          background-size: 500px 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: goldShimmer 3.5s infinite linear;
        }

        /* Track animation — only active when .track-moving is applied */
        @keyframes trackScroll {
          from { stroke-dashoffset: 0; }
          to   { stroke-dashoffset: -66px; }
        }
        .track-moving {
          animation: trackScroll 0.35s linear infinite;
        }

        .skip-btn:hover {
          background: rgba(201,168,76,0.15) !important;
          border-color: rgba(201,168,76,0.7) !important;
          color: rgba(201,168,76,0.15) !important;
        }
      `}</style>

      <div
        ref={containerRef}
        style={{
          height: "100vh",
          width: "100%",
          background: "#f5f0e8",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
          fontFamily: "'Cormorant Garamond', serif",
          paddingTop: "16vh"
          // If your navbar is fixed/sticky, add paddingTop equal to its height instead,
          // e.g. paddingTop: "64px", and the flex children will fill the rest.
        }}
      >
        {/* Gold top rule */}
        <div style={{
          height: 3, flexShrink: 0,
          background: "linear-gradient(90deg,#c9a84c,#e8d9b0 50%,#c9a84c)",
        }} />

        {/* ── Skip Tour button ──────────────────────────────────────────────── */}
        {!showEnd && (
          <button
            onClick={handleSkip}
            className="skip-btn"
            style={{
              position: "absolute",
              top: 120, right: 14,
              zIndex: 500,
              fontFamily: "'DM Mono', monospace",
              fontSize: 9,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              background: "rgba(42,31,14,0.82)",
              color: "#c9a84c",
              border: "1px solid rgba(201,168,76,0.35)",
              borderRadius: 4,
              padding: "7px 14px",
              cursor: "pointer",
              transition: "background 0.2s ease, border-color 0.2s ease, color 0.2s ease",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
            }}
          >
            Skip Tour →
          </button>
        )}

        {/* ══════════════════════════════════════════════════════════════════════
            UPPER — Header + Location Card
            flex: 1 + minHeight: 0  →  fills ALL space above the train scene.
        ══════════════════════════════════════════════════════════════════════ */}
        <div style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: "10px 24px 8px",
          position: "relative",
          minHeight: 0,         // critical: allows flex child to shrink below content size
        }}>
          {/* Header row */}
          <div style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: 8,
            flexShrink: 0,        // header never squishes
          }}>
            <div>
              <div style={{
                fontFamily: "'DM Mono', monospace", fontSize: 9,
                letterSpacing: "0.18em", textTransform: "uppercase",
                color: "#9b8a6e", marginBottom: 3,
              }}>
                Palace On Wheels · Royal Rajasthan Circuit
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIdx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.28 }}
                  style={{ display: "flex", alignItems: "baseline", gap: 10 }}
                >
                  <span style={{
                    fontFamily: "'Cormorant Garamond', serif", fontWeight: 700,
                    fontSize: 30, color: "#2a1f0e", lineHeight: 1, letterSpacing: "-0.02em",
                  }}>{station.name}</span>
                  <span style={{
                    fontFamily: "'DM Mono', monospace", fontSize: 10,
                    color: "#c9a84c", fontWeight: 500, letterSpacing: "0.1em", paddingBottom: 2,
                  }}>{station.code}</span>
                  <span style={{
                    fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
                    fontSize: 13, color: "#9b8a6e", paddingBottom: 2,
                  }}>— {station.tagline}</span>
                </motion.div>
              </AnimatePresence>
            </div>

            <div style={{ textAlign: "right" }}>
              <div style={{
                fontFamily: "'DM Mono', monospace", fontSize: 9,
                letterSpacing: "0.15em", color: "#9b8a6e",
                textTransform: "uppercase", marginBottom: 6,
              }}>
                Stop {activeIdx + 1} of {STATIONS_COUNT}
              </div>
              <ProgressDots total={STATIONS_COUNT} active={activeIdx} />
            </div>
          </div>

          {/* LocationSlider wrapper — takes all remaining height */}
          <div style={{ flex: 1, minHeight: 0, overflow: "hidden" }}>
            <LocationSlider
              cards={station.cards}
              visibleCount={visibleCards}
              stationKey={activeIdx}
            />
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════════
            LOWER — Train scene (fixed proportion)
        ══════════════════════════════════════════════════════════════════════ */}
        <div style={{
          flex: "0 0 42%",
          position: "relative",
          display: "flex", flexDirection: "column", justifyContent: "flex-end",
          background: "linear-gradient(to bottom,#e8e0cc 0%,#ddd5be 100%)",
        }}>
          <div style={{ height: 1, background: "#c9a84c", opacity: 0.35 }} />

          {/* Station sign badge */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx + "-badge"}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.28 }}
              style={{
                position: "absolute", left: "14%", bottom: 102,
                display: "flex", flexDirection: "column", alignItems: "center",
                zIndex: 10,
              }}
            >
              <div style={{
                background: "#2a1f0e", color: "#f5f0e8",
                padding: "5px 14px", borderRadius: 4,
                display: "flex", alignItems: "center", gap: 8,
                boxShadow: "0 3px 14px rgba(0,0,0,0.28)",
                whiteSpace: "nowrap",
              }}>
                <span style={{
                  fontFamily: "'DM Mono', monospace", fontSize: 9,
                  color: "#c9a84c", letterSpacing: "0.14em", fontWeight: 500,
                }}>{station.code}</span>
                <span style={{ width: 1, height: 12, background: "#c9a84c", opacity: 0.4 }} />
                <span style={{
                  fontFamily: "'Cormorant Garamond', serif", fontWeight: 700,
                  fontSize: 14, letterSpacing: "0.06em", textTransform: "uppercase",
                }}>{station.name}</span>
              </div>
              <div style={{ width: 1, height: 24, background: "#2a1f0e", opacity: 0.6 }} />
            </motion.div>
          </AnimatePresence>

          {/* People — animated horizontally between door and platform.
              Rendered on first stop (idx 0) and last stop (idx 7) only. */}
          <motion.div
            animate={{ left: peopleLeft, opacity: peopleOpacity }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
            style={{
              position: "absolute",
              bottom: 60,
              zIndex: 25,
              pointerEvents: "none",
            }}
          >
            <PeopleSVG flipped={peopleFlipped} />
          </motion.div>

          {/* Train — exits left on final station */}
            <motion.div
            ref={trainWrapRef}
            animate={trainExited ? { x: "-110vw" } : { x: `${trainX}vw` }}
            transition={
                trainExited
                ? { duration: 1.8, ease: [0.4, 0, 1, 1] }
                : { duration: 0 }   // ← duration: 0 is critical — ScrollTrigger scrub already handles easing
            }
            style={{
              position: "relative", zIndex: 20,
              display: "flex",
              justifyContent: "flex-start",
              paddingLeft: "calc(14% - 60px)",
              marginBottom: 4,
            }}
          >
            <img
              src="/train-closed.png"
              alt="Train"
              style={{
                width: 680,
                filter: "drop-shadow(0 6px 18px rgba(0,0,0,0.22))",
                transform: "scaleX(-1)",
              }}
            />
          </motion.div>

          {/* Track bed */}
          <div style={{
            width: "100%", height: 56,
            background: "#b8a882", position: "relative",
            borderTop: "2px solid #a09070",
          }}>
            <svg
              width="100%" height="100%"
              style={{ position: "absolute", inset: 0 }}
              preserveAspectRatio="none"
            >
              <rect x="0" y="0" width="100%" height="100%" fill="#b8a882" />
              <line x1="0" y1="28%" x2="100%" y2="28%" stroke="#5a4e3a" strokeWidth="4" />
              <line x1="0" y1="72%" x2="100%" y2="72%" stroke="#5a4e3a" strokeWidth="4" />
              {/*
                FIX: trackMoving drives a CSS keyframe animation instead of GSAP scrub.
                Tracks animate ONLY when spLocal < T.ARRIVED or spLocal >= T.DEPARTED.
                They stay still while cards are being revealed.
              */}
              <line
                ref={trackRef}
                x1="0" y1="50%" x2="100%" y2="50%"
                stroke="#8c6e48" strokeWidth="36"
                strokeDasharray="14, 52"
                className={trackMoving ? "track-moving" : ""}
                style={{ strokeDashoffset: 0 }}
              />
            </svg>
            <div style={{
              position: "absolute", top: "24%", left: 0, right: 0, height: 2,
              background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.28) 30%,transparent)",
              pointerEvents: "none",
            }} />
          </div>
          <div style={{ height: 12, background: "linear-gradient(to bottom,rgba(0,0,0,0.12),transparent)" }} />
        </div>

        {/* ══════════════════════════════════════════════════════════════════════
            END SCREEN OVERLAY
            FIX: zIndex 40 keeps it below your navbar (set navbar to z-index ≥ 50).
            top: 3 respects the gold rule at the top.
        ══════════════════════════════════════════════════════════════════════ */}
        <AnimatePresence>
          {showEnd && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.4 }}
              style={{
                position: "absolute",
                top: 3, left: 0, right: 0, bottom: 0,
                background: "#130f07",
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                zIndex: 40,  // ← below typical navbar z-index (50+); adjust if needed
              }}
            >
              {/* Gold rules */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3,
                background: "linear-gradient(90deg,#c9a84c,#f5e9c0 50%,#c9a84c)" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3,
                background: "linear-gradient(90deg,#c9a84c,#f5e9c0 50%,#c9a84c)" }} />

              {/* Ornament ring */}
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  width: 116, height: 116, borderRadius: "50%",
                  border: "1.5px solid #c9a84c",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: 28,
                  boxShadow: "0 0 50px rgba(201,168,76,0.18), inset 0 0 30px rgba(201,168,76,0.06)",
                }}
              >
                <div style={{
                  width: 92, height: 92, borderRadius: "50%",
                  border: "1px solid rgba(201,168,76,0.35)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <svg width="50" height="30" viewBox="0 0 50 30">
                    <rect x="2" y="4" width="46" height="18" rx="5" fill="none" stroke="#c9a84c" strokeWidth="1.5"/>
                    <rect x="8" y="8" width="8" height="8" rx="1.5" fill="none" stroke="#c9a84c" strokeWidth="1"/>
                    <rect x="20" y="8" width="8" height="8" rx="1.5" fill="none" stroke="#c9a84c" strokeWidth="1"/>
                    <rect x="32" y="8" width="8" height="8" rx="1.5" fill="none" stroke="#c9a84c" strokeWidth="1"/>
                    <circle cx="11" cy="26" r="3" fill="none" stroke="#c9a84c" strokeWidth="1.5"/>
                    <circle cx="39" cy="26" r="3" fill="none" stroke="#c9a84c" strokeWidth="1.5"/>
                    <line x1="2" y1="22" x2="48" y2="22" stroke="#c9a84c" strokeWidth="0.75" strokeDasharray="3,3"/>
                  </svg>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.9 }}
                style={{ textAlign: "center" }}
              >
                <div style={{
                  fontFamily: "'DM Mono', monospace", fontSize: 10,
                  letterSpacing: "0.32em",
                  color: "#c9a84c", marginBottom: 14,
                }}>
                  Endless Unforgettable Memories
                </div>

                <h1 className="end-title text-xl md:text-7xl" style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 700, lineHeight: 1,
                  marginBottom: 14, letterSpacing: "-0.01em",
                }}>
                  Palace On Wheels
                </h1>

                <div style={{
                  fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
                  fontSize: 19, color: "rgba(245,240,232,0.45)",
                  marginBottom: 44,
                }}>
                  8 Stations &nbsp;·&nbsp; Royal Rajasthan Circuit
                </div>

                {/* Station recap strip */}
                <div className="flex flex-wrap w-70 md:w-auto justify-between py-3" style={{
                  borderTop: "1px solid rgba(201,168,76,0.2)",
                  borderBottom: "1px solid rgba(201,168,76,0.2)",
                }}>
                  {STATIONS.map((s, i) => (
                    <React.Fragment key={i}>
                      <div style={{ padding: "0 18px", textAlign: "center" }}>
                        <div style={{
                          fontFamily: "'DM Mono', monospace", fontSize: 8,
                          color: "#c9a84c", letterSpacing: "0.14em",
                          textTransform: "uppercase", marginBottom: 4,
                        }}>{s.code}</div>
                        <div style={{
                          fontFamily: "'Cormorant Garamond', serif", fontSize: 12,
                          color: "rgba(245,240,232,0.65)", whiteSpace: "nowrap",
                        }}>{s.name}</div>
                      </div>
                      {i < STATIONS.length - 1 && (
                        <div style={{
                          width: 1, alignSelf: "stretch",
                          background: "rgba(201,168,76,0.15)",
                          flexShrink: 0,
                        }} />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}