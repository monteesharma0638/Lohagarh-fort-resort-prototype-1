"use client";

import React, { useRef, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { STATIONS, TAG_COLORS } from "./trainrouteassets/constant_assets";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

// ─── SCROLL BUDGET ────────────────────────────────────────────────────────────
// Total = 48000px  |  8 stations × 6000px each
const TOTAL_SCROLL = 8000;
const STATIONS_COUNT = 8;

const T = {
  ARRIVED: 0.15, // train enters
  CARDS_END: 0.8, // cards reveal window
  DEPARTED: 0.92, // train exits
};

// ─── PROGRESS DOTS ────────────────────────────────────────────────────────────
const ProgressDots = ({ total, active }: { total: number; active: number }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
    {Array.from({ length: total }).map((_, i) => (
      <div
        key={i}
        style={{
          width: i === active ? 20 : 6,
          height: 6,
          borderRadius: 3,
          background: i === active ? "#c9a84c" : "#d4c9a8",
          transition: "all 0.4s ease",
        }}
      />
    ))}
  </div>
);

// ─── LOCATION SLIDER ─────────────────────────────────────────────────────────
// FIX: uses height: "100%" so it fills its flex wrapper entirely (no blank space)
const LocationSlider = ({ cards, visibleCount, stationKey }: any) => {
  const activeCard = useMemo(
    () => Math.min(Math.max(0, visibleCount - 1), cards.length - 1),
    [visibleCount, cards],
  );
  const card = cards[activeCard];
  if (!card) return null;

  return (
    <div
      style={{
        width: "100%",
        height: "100%", // ← fills the flex-1 wrapper; was `flex: 1`
        position: "relative",
        overflow: "hidden",
        borderRadius: 12,
        background: "#1a1208",
      }}
    >
      <AnimatePresence mode="sync">
        <motion.div
          key={`${stationKey}-${activeCard}`}
initial={{ x: "100%" }}
animate={{ x: "0%" }}
exit={{ x: "-100%" }}
transition={{ duration: 0.12, ease: "easeOut" }}
          style={{ position: "absolute", inset: 0, display: "flex" }}
        >
          {/* Gradient background placeholder */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(
                135deg,
                hsl(${(activeCard * 37) % 360}, 35%, 22%) 0%,
                hsl(${(activeCard * 37 + 40) % 360}, 45%, 35%) 100%
              )`,
            }}
          >
            <Image
              src={card.img}
              className="object-cover"
              alt={card.title}
              fill
              sizes="(max-width:768px) 100vw, 33vw"
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`,
              }}
            />
          </div>

          {/* Text legibility overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to right, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)",
            }}
          />

          {/* Content */}
          <div
            style={{
              position: "relative",
              zIndex: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: "28px 36px",
              height: "100%",
            }}
          >
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              style={{
                alignSelf: "flex-start",
                fontFamily: "'DM Mono', monospace",
                fontSize: 9,
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#1a1208",
                background: TAG_COLORS[cards[activeCard]?.tag] || "#c9a84c",
                borderRadius: 99,
                padding: "3px 10px",
                marginBottom: 12,
              }}
            >
              {card.tag}
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.25,
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 700,
                fontSize: 42,
                color: "#f5f0e8",
                lineHeight: 1.05,
                margin: 0,
                marginBottom: 8,
                letterSpacing: "-0.02em",
              }}
            >
              {card.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontSize: 16,
                color: "rgba(245,240,232,0.65)",
                margin: 0,
                marginBottom: 24,
              }}
            >
              {card.desc}
            </motion.p>

            {/* Dot indicators */}
            <div style={{ display: "flex", gap: 6 }}>
              {cards.map((_: any, i: number) => (
                <div
                  key={i}
                  style={{
                    height: 3,
                    borderRadius: 2,
                    width: i === activeCard ? 24 : 6,
                    background:
                      i === activeCard
                        ? "#c9a84c"
                        : i < visibleCount
                          ? "rgba(245,240,232,0.4)"
                          : "rgba(245,240,232,0.12)",
                    transition: "all 0.4s ease",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Slide counter */}
          <div
            style={{
              position: "absolute",
              top: 20,
              right: 24,
              fontFamily: "'DM Mono', monospace",
              fontSize: 10,
              color: "rgba(245,240,232,0.4)",
              letterSpacing: "0.1em",
            }}
          >
            {String(activeCard + 1).padStart(2, "0")}
            <span style={{ color: "rgba(245,240,232,0.2)" }}>
              /{String(cards.length).padStart(2, "0")}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Gold bottom border */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 2,
          background: "linear-gradient(90deg, #c9a84c, transparent)",
          zIndex: 3,
        }}
      />
    </div>
  );
};

const stationWeights = STATIONS.map((s, i) => {
  const hasCards = (s.cards?.length ?? 0) > 1;

  // first & last station → very small weight
  if (i === 0 || i === STATIONS.length - 1) {
    return 0.4;
  }

  return hasCards ? 1 : 0.25;
});

const totalWeight = stationWeights.reduce((a, b) => a + b, 0);

const normalized = stationWeights.map((w) => w / totalWeight);

const ranges = normalized.map((w, i) => {
  const start = normalized.slice(0, i).reduce((a, b) => a + b, 0);
  return {
    start,
    end: start + w,
  };
});

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function InvertedTrainJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<SVGLineElement>(null);
  const trainWrapRef = useRef<HTMLDivElement>(null);
  const journeyDoneRef = useRef(false);
  const cardCountRef = useRef(8);
  const visibleCardsRef = useRef(0);

  const [activeIdx, setActiveIdx] = useState(0);
  const [visibleCards, setVisibleCards] = useState(0);
  const [showEnd, setShowEnd] = useState(false);
  const [trainExited, setTrainExited] = useState(false);
  // FIX: track only moves during arrival/departure transitions, not during card reveal
  const [trackMoving, setTrackMoving] = useState(false);
  const [trainX, setTrainX] = useState(110);

  const stateRef = useRef<{ activeIdx?: number }>({});
  stateRef.current = { activeIdx };

  const handleUpdate = useCallback((self: ScrollTrigger) => {
    requestAnimationFrame(() => {
      if (journeyDoneRef.current) return;

      const totalProgress = self.progress;
      let stIdx = 0;
      let spLocal = 0;

      for (let i = 0; i < ranges.length; i++) {
        if (totalProgress >= ranges[i].start && totalProgress < ranges[i].end) {
          stIdx = i;

          const localProgress =
            (totalProgress - ranges[i].start) /
            (ranges[i].end - ranges[i].start);

          spLocal = Math.min(Math.max(localProgress, 0), 1);
          break;
        }
      }

      // ── Reset on new station ──────────────────────────────────────────────
      if (stIdx !== stateRef.current?.activeIdx) {
        stateRef.current = { activeIdx: stIdx };
        setActiveIdx(stIdx);
        cardCountRef.current = STATIONS[stIdx]?.cards?.length ?? 0;
        visibleCardsRef.current = 0;
        setTrainX(110);
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
        const containerTop =
          containerRef.current?.getBoundingClientRect().height ?? 0;
        ScrollTrigger.getAll().forEach((st) => st.kill(true));
        document.querySelectorAll(".gsap-pin-spacer").forEach((el) => {
          el.parentNode?.removeChild(el);
        });
        window.scrollTo({ top: containerTop, behavior: "instant" });
        return;
      }

      if (spLocal < T.ARRIVED) {
        // entering
        setTrainX((1 - spLocal / T.ARRIVED) * 110);
      } else if (spLocal >= T.DEPARTED) {
        // exiting
        const exitProgress = (spLocal - T.DEPARTED) / (1 - T.DEPARTED);
        setTrainX(-exitProgress * 110);
      } else {
        // stopped at station
        setTrainX(0);
      }

      const currentCardCount = STATIONS[stIdx]?.cards?.length ?? 0;

      let newVisibleCards = 0;

      if (spLocal < T.ARRIVED) {
        newVisibleCards = 0;
      } else if (spLocal >= T.CARDS_END) {
        newVisibleCards = currentCardCount;
      } else {
        const progress = (spLocal - T.ARRIVED) / (T.CARDS_END - T.ARRIVED);
        newVisibleCards = Math.floor(progress * currentCardCount);
      }

      // Only update state if value actually changed — prevents unnecessary re-renders
      if (newVisibleCards !== visibleCardsRef.current) {
        visibleCardsRef.current = newVisibleCards;
        setVisibleCards(newVisibleCards);
      }
    });
  }, []);

  // ── Skip Tour: kill pin, jump to end screen ─────────────────────────────────
  const handleSkip = useCallback(() => {
    const containerTop =
      containerRef.current?.getBoundingClientRect().height ?? 0;
    ScrollTrigger.getAll().forEach((st) => st.kill(true));
    document.querySelectorAll(".gsap-pin-spacer").forEach((el) => {
      el.parentNode?.removeChild(el);
    });
    window.scrollTo({ top: containerTop, behavior: "instant" });

    journeyDoneRef.current = true;
    setActiveIdx(STATIONS_COUNT - 1);
    setTrainExited(true);
    setShowEnd(true);
    setTrackMoving(false);
    // Scroll back to top so the component (now unpinned) is in view
    // window.scrollTo(0, 0);
  }, []);

  useGSAP(
    () => {
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
      });
    },
    { scope: containerRef },
  );

  const station = STATIONS[activeIdx];

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
            to   { stroke-dashoffset: -72px; }
        }
        .track-moving {
            animation: trackScroll 0.4s linear infinite;
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
          paddingTop: "16vh",
          // If your navbar is fixed/sticky, add paddingTop equal to its height instead,
          // e.g. paddingTop: "64px", and the flex children will fill the rest.
        }}
      >
        {/* Gold top rule */}
        <div
          style={{
            height: 3,
            flexShrink: 0,
            background: "linear-gradient(90deg,#c9a84c,#e8d9b0 50%,#c9a84c)",
          }}
        />

        {/* ── Skip Tour button ──────────────────────────────────────────────── */}
        {!showEnd && (
          <button
            onClick={handleSkip}
            className="skip-btn"
            style={{
              position: "absolute",
              top: 120,
              right: 14,
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
              transition:
                "background 0.2s ease, border-color 0.2s ease, color 0.2s ease",
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
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            padding: "10px 24px 8px",
            position: "relative",
            minHeight: 0, // critical: allows flex child to shrink below content size
          }}
        >
          {/* Header row */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginBottom: 8,
              flexShrink: 0, // header never squishes
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 9,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#9b8a6e",
                  marginBottom: 3,
                }}
              >
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
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 700,
                      fontSize: 30,
                      color: "#2a1f0e",
                      lineHeight: 1,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {station.name}
                  </span>
                  <span
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: 10,
                      color: "#c9a84c",
                      fontWeight: 500,
                      letterSpacing: "0.1em",
                      paddingBottom: 2,
                    }}
                  >
                    {station.code}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontStyle: "italic",
                      fontSize: 13,
                      color: "#9b8a6e",
                      paddingBottom: 2,
                    }}
                  >
                    — {station.tagline}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>

            <div style={{ textAlign: "right" }}>
              <div
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 9,
                  letterSpacing: "0.15em",
                  color: "#9b8a6e",
                  textTransform: "uppercase",
                  marginBottom: 6,
                }}
              >
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
        <div
          style={{
            flex: "0 0 16%",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            background: "linear-gradient(to bottom,#e8e0cc 0%,#ddd5be 100%)",
          }}
        >
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
                position: "absolute",
                left: "14%",
                bottom: 150,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                zIndex: 10,
              }}
            >
              <div
                style={{
                  background: "#2a1f0e",
                  color: "#f5f0e8",
                  padding: "5px 14px",
                  borderRadius: 4,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  boxShadow: "0 3px 14px rgba(0,0,0,0.28)",
                  whiteSpace: "nowrap",
                }}
              >
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 9,
                    color: "#c9a84c",
                    letterSpacing: "0.14em",
                    fontWeight: 500,
                  }}
                >
                  {station.code}
                </span>
                <span
                  style={{
                    width: 1,
                    height: 20,
                    background: "#c9a84c",
                    opacity: 0.4,
                  }}
                />
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 700,
                    fontSize: 14,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  {station.name}
                </span>
              </div>
              <div
                style={{
                  width: 1,
                  height: 24,
                  background: "#2a1f0e",
                  opacity: 0.6,
                }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Train — exits left on final station */}
          <motion.div
            ref={trainWrapRef}
            animate={trainExited ? { x: "-110vw" } : { x: `${trainX}vw` }}
            transition={
              trainExited
                ? { duration: 1.8, ease: [0.4, 0, 1, 1] }
                : { duration: 0 } // ← duration: 0 is critical — ScrollTrigger scrub already handles easing
            }
            style={{
              position: "relative",
              zIndex: 20,
              display: "flex",
              justifyContent: "flex-start",
              paddingLeft: "calc(14% - 60px)",
              marginBottom: -40,
            }}
          >
            <img
              src="/train-closed.png"
              alt="Train"
              style={{
                width: 1200,
                filter: "drop-shadow(0 6px 18px rgba(0,0,0,0.22))",
                transform: "scaleX(-1)",
              }}
            />
          </motion.div>

          {/* Track bed — 3D perspective */}
          <div
            style={{
              width: "100%",
              height: 64, // slightly taller than before
              background: "#9a8a6a",
              position: "relative",
              borderTop: "3px solid #6b5a3e", // darker top edge = depth
              boxShadow: "inset 0 -8px 16px rgba(0,0,0,0.25)", // depth at bottom
            }}
          >
            {/* Ballast gravel texture */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `radial-gradient(ellipse at 30% 60%, #9a8a6a 1px, transparent 1px),
                      radial-gradient(ellipse at 70% 40%, #7a6a4e 1px, transparent 1px),
                      radial-gradient(ellipse at 50% 80%, #8a7a5e 1px, transparent 1px)`,
                backgroundSize: "18px 12px, 22px 14px, 14px 10px",
                opacity: 0.6,
              }}
            />

            {/* 3D Track SVG */}
            <svg
              width="100%"
              height="100%"
              style={{ position: "absolute", inset: 0 }}
              preserveAspectRatio="none"
            >
              <defs>
                {/* Rail gradient — shiny steel top, dark side */}
                <linearGradient id="railGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#e8e0c8" />
                  <stop offset="25%" stopColor="#f5f0e0" />
                  <stop offset="55%" stopColor="#c8b880" />
                  <stop offset="100%" stopColor="#5a4e3a" />
                </linearGradient>

                {/* Sleeper gradient — wood with top/side depth */}
                <linearGradient id="sleeperGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a07848" />
                  <stop offset="35%" stopColor="#8c6438" />
                  <stop offset="100%" stopColor="#5a3e20" />
                </linearGradient>

                {/* Ballast gradient — gravel bed */}
                <linearGradient id="ballastGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#b8a882" />
                  <stop offset="100%" stopColor="#8a7a5e" />
                </linearGradient>
              </defs>

              {/* Ballast bed */}
              <rect
                x="0"
                y="0"
                width="100%"
                height="100%"
                fill="url(#ballastGrad)"
              />

              {/* ── Sleepers with 3D bevel effect ── */}
              <line
                ref={trackRef}
                x1="0"
                y1="50%"
                x2="100%"
                y2="50%"
                stroke="#5a3e20"
                strokeWidth="42"
                strokeDasharray="18, 54"
                className={trackMoving ? "track-moving" : ""}
                style={{ strokeDashoffset: 0 }}
              />
              {/* Sleeper top highlight (lighter strip on top face) */}
              <line
                x1="0"
                y1="50%"
                x2="100%"
                y2="50%"
                stroke="#a07848"
                strokeWidth="28"
                strokeDasharray="18, 54"
                className={trackMoving ? "track-moving" : ""}
                style={{ strokeDashoffset: 0, pointerEvents: "none" }}
              />
              {/* Sleeper top shine */}
              <line
                x1="0"
                y1="50%"
                x2="100%"
                y2="50%"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="12"
                strokeDasharray="18, 54"
                className={trackMoving ? "track-moving" : ""}
                style={{ strokeDashoffset: 0, pointerEvents: "none" }}
              />

              {/* ── Rail bottom shadow (gives rail thickness/depth) ── */}
              <line
                x1="0"
                y1="30%"
                x2="100%"
                y2="30%"
                stroke="#3a2e1e"
                strokeWidth="5"
              />
              <line
                x1="0"
                y1="70%"
                x2="100%"
                y2="70%"
                stroke="#3a2e1e"
                strokeWidth="5"
              />

              {/* ── Rail body ── */}
              <line
                x1="0"
                y1="28%"
                x2="100%"
                y2="28%"
                stroke="url(#railGrad)"
                strokeWidth="7"
              />
              <line
                x1="0"
                y1="72%"
                x2="100%"
                y2="72%"
                stroke="url(#railGrad)"
                strokeWidth="7"
              />

              {/* ── Rail top shine (bright glint on top of steel) ── */}
              <line
                x1="0"
                y1="26%"
                x2="100%"
                y2="26%"
                stroke="rgba(255,255,255,0.55)"
                strokeWidth="2"
              />
              <line
                x1="0"
                y1="70%"
                x2="100%"
                y2="70%"
                stroke="rgba(255,255,255,0.55)"
                strokeWidth="2"
              />
            </svg>

            {/* Animated sleeper overlay (CSS scroll illusion) */}
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 1440 90"
              preserveAspectRatio="none"
              style={{
                position: "absolute",
                inset: 0,
                mixBlendMode: "multiply",
              }}
            >
              <line
                ref={trackRef}
                x1="390"
                y1="90"
                x2="1050"
                y2="90"
                stroke="#5a4228"
                strokeWidth="10"
                strokeDasharray="66, 80"
                className={trackMoving ? "track-moving" : ""}
                style={{ strokeDashoffset: 0, opacity: 0 }}
              />
            </svg>

            {/* Rail shine overlay — horizontal glint across both rails */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "29%",
                width: "42%",
                height: "35%",
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)",
                pointerEvents: "none",
              }}
            />

            {/* Ground shadow at bottom */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 10,
                background:
                  "linear-gradient(to bottom, transparent, rgba(0,0,0,0.3))",
              }}
            />
          </div>
          <div
            style={{
              height: 12,
              background:
                "linear-gradient(to bottom,rgba(0,0,0,0.12),transparent)",
            }}
          />
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
                top: 3,
                left: 0,
                right: 0,
                bottom: 0,
                background: "#130f07",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 40, // ← below typical navbar z-index (50+); adjust if needed
              }}
            >
              {/* Gold rules */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  background:
                    "linear-gradient(90deg,#c9a84c,#f5e9c0 50%,#c9a84c)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  background:
                    "linear-gradient(90deg,#c9a84c,#f5e9c0 50%,#c9a84c)",
                }}
              />

              {/* Ornament ring */}
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  delay: 0.4,
                  duration: 1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  width: 116,
                  height: 116,
                  borderRadius: "50%",
                  border: "1.5px solid #c9a84c",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 28,
                  boxShadow:
                    "0 0 50px rgba(201,168,76,0.18), inset 0 0 30px rgba(201,168,76,0.06)",
                }}
              >
                <div
                  style={{
                    width: 92,
                    height: 92,
                    borderRadius: "50%",
                    border: "1px solid rgba(201,168,76,0.35)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="50" height="30" viewBox="0 0 50 30">
                    <rect
                      x="2"
                      y="4"
                      width="46"
                      height="18"
                      rx="5"
                      fill="none"
                      stroke="#c9a84c"
                      strokeWidth="1.5"
                    />
                    <rect
                      x="8"
                      y="8"
                      width="8"
                      height="8"
                      rx="1.5"
                      fill="none"
                      stroke="#c9a84c"
                      strokeWidth="1"
                    />
                    <rect
                      x="20"
                      y="8"
                      width="8"
                      height="8"
                      rx="1.5"
                      fill="none"
                      stroke="#c9a84c"
                      strokeWidth="1"
                    />
                    <rect
                      x="32"
                      y="8"
                      width="8"
                      height="8"
                      rx="1.5"
                      fill="none"
                      stroke="#c9a84c"
                      strokeWidth="1"
                    />
                    <circle
                      cx="11"
                      cy="26"
                      r="3"
                      fill="none"
                      stroke="#c9a84c"
                      strokeWidth="1.5"
                    />
                    <circle
                      cx="39"
                      cy="26"
                      r="3"
                      fill="none"
                      stroke="#c9a84c"
                      strokeWidth="1.5"
                    />
                    <line
                      x1="2"
                      y1="22"
                      x2="48"
                      y2="22"
                      stroke="#c9a84c"
                      strokeWidth="0.75"
                      strokeDasharray="3,3"
                    />
                  </svg>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.9 }}
                style={{ textAlign: "center" }}
              >
                <div
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 10,
                    letterSpacing: "0.32em",
                    color: "#c9a84c",
                    marginBottom: 14,
                  }}
                >
                  Endless Unforgettable Memories
                </div>

                <h1
                  className="end-title text-xl md:text-7xl"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 700,
                    lineHeight: 1,
                    marginBottom: 14,
                    letterSpacing: "-0.01em",
                  }}
                >
                  Palace On Wheels
                </h1>

                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: "italic",
                    fontSize: 19,
                    color: "rgba(245,240,232,0.45)",
                    marginBottom: 44,
                  }}
                >
                  8 Stations &nbsp;·&nbsp; Royal Rajasthan Circuit
                </div>

                {/* Station recap strip */}
                <div
                  className="flex flex-wrap w-70 md:w-auto justify-between py-3"
                  style={{
                    borderTop: "1px solid rgba(201,168,76,0.2)",
                    borderBottom: "1px solid rgba(201,168,76,0.2)",
                  }}
                >
                  {STATIONS.map((s, i) => (
                    <React.Fragment key={i}>
                      <div style={{ padding: "0 18px", textAlign: "center" }}>
                        <div
                          style={{
                            fontFamily: "'DM Mono', monospace",
                            fontSize: 8,
                            color: "#c9a84c",
                            letterSpacing: "0.14em",
                            textTransform: "uppercase",
                            marginBottom: 4,
                          }}
                        >
                          {s.code}
                        </div>
                        <div
                          style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: 12,
                            color: "rgba(245,240,232,0.65)",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {s.name}
                        </div>
                      </div>
                      {i < STATIONS.length - 1 && (
                        <div
                          style={{
                            width: 1,
                            alignSelf: "stretch",
                            background: "rgba(201,168,76,0.15)",
                            flexShrink: 0,
                          }}
                        />
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
