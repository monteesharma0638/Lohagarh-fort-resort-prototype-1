"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { fetchVideoMeta, palette, Skeleton, VideoCard, VideoMeta } from "@/components/ui/video-card";

// ─────────────────────────────────────────────────────────────
// ✅ THE ONLY THING YOU NEED TO EDIT — just paste your video IDs
// ─────────────────────────────────────────────────────────────
const VIDEO_IDS = [
  "4iaG6lDKy-Y",
  "ZcjWfXvi0hY", 
  "rT27ysCo3Y4",
  "jEvOd5rB-xE",
  "ccvSx-ZEz_0",
  "_qUu5iRFbBw",
  "h8o-lFFTdN8",
  "86E8ZfVwN6c",
  "gFw0VcEu4s8",
  "OKSZ9iV18Yo",
  "yQdOaqiDBwM",
  "IByNv5ZPY9Q",
  "ufnXJGDotz8",
  "9nIjA78_dNU",
  "kBxbFxeaN4o",
  "PT_XaE0Bjes",
  "QjLtcMBdKl0",
  "Rp2F_1pv6Ik",
];
// ─────────────────────────────────────────────────────────────

// ─── Types ────────────────────────────────────────────────

// ─── Main component ────────────────────────────────────────
export default function VideoShowcase() {
  const headerRef = useRef(null);
  const inView = useInView(headerRef, { once: true, margin: "-60px" });

  // Fetch oEmbed metadata for all IDs on mount
  const [videos, setVideos] = useState<VideoMeta[]>(
    VIDEO_IDS.map((id) => ({
      youtubeId: id,
      title: "",
      author: "",
      thumbnail: "",
      status: "loading" as const,
    }))
  );

  useEffect(() => {
    VIDEO_IDS.forEach(async (id, i) => {
      const meta = await fetchVideoMeta(id);
      setVideos((prev) => {
        const next = [...prev];
        next[i] = meta;
        return next;
      });
    });
  }, []);

  return (
    <section
      className="relative py-24 px-4 overflow-hidden"
      style={{ background: palette.warmWhite }}
    >
      {/* Saffron top border */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{
          background: `linear-gradient(90deg, transparent, ${palette.saffron}, ${palette.amber}, ${palette.saffron}, transparent)`,
        }}
      />

      {/* Soft dot-grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, ${palette.amber}55 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
          opacity: 0.18,
        }}
      />

      {/* Ambient glow blobs */}
      <div
        className="absolute top-10 right-10 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(ellipse, ${palette.saffron}18 0%, transparent 70%)` }}
      />
      <div
        className="absolute bottom-10 left-10 w-56 h-56 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(ellipse, ${palette.amber}14 0%, transparent 70%)` }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* ── Header ── */}
        <motion.div
          ref={headerRef}
          className="mb-14"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px" style={{ background: palette.saffron }} />
                <span
                  className="text-xs font-semibold tracking-[0.2em] uppercase"
                  style={{ color: palette.saffron, fontFamily: "'DM Mono', monospace" }}
                >
                  Watch & Listen
                </span>
              </div>
              <h2
                className="text-4xl md:text-5xl font-bold leading-tight"
                style={{ fontFamily: "'Playfair Display', serif", color: "#1C0A00" }}
              >
                Stories that{" "}
                <span
                  className="italic"
                  style={{
                    background: `linear-gradient(90deg, ${palette.saffron}, ${palette.rust})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  move
                </span>{" "}
                you.
              </h2>
            </div>

            <p
              className="text-sm leading-relaxed max-w-xs text-right hidden md:block"
              style={{ color: palette.sienna, fontFamily: "'Lora', serif", opacity: 0.75 }}
            >
              A few moments we've captured — real, unscripted, and worth your time.
            </p>
          </div>

          {/* Decorative rule */}
          <div className="mt-8 flex items-center gap-3">
            <div className="flex-1 h-px" style={{ background: palette.sand }} />
            <div className="w-2 h-2 rounded-full" style={{ background: palette.saffron }} />
            <div className="w-8 h-px" style={{ background: palette.sand }} />
          </div>
        </motion.div>

        {/* ── Video grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {videos.map((meta, i) =>
            meta.status === "loading" ? (
              <Skeleton key={meta.youtubeId + i} />
            ) : (
              <VideoCard key={meta.youtubeId + i} meta={meta} index={i} />
            )
          )}
        </div>

        {/* ── Footer note ── */}
        <motion.p
          className="text-center mt-12 text-xs tracking-wider"
          style={{ color: palette.sienna, fontFamily: "'DM Mono', monospace", opacity: 0.45 }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.45 } : {}}
          transition={{ delay: 0.6 }}
        >
          Don't just take our word for it — listen to them. Each video is a window into genuine moments shared by our guests.
        </motion.p>
      </div>
    </section>
  );
}