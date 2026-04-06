"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

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
interface OEmbedData {
  title: string;
  author_name: string;
  thumbnail_url: string;
  thumbnail_width: number;
  thumbnail_height: number;
}

interface VideoMeta {
  youtubeId: string;
  title: string;
  author: string;
  thumbnail: string;
  status: "loading" | "ready" | "error";
}

// ─── Palette (saffron-anchored) ────────────────────────────
const palette = {
  saffron:   "#F4831F",
  amber:     "#F59E0B",
  turmeric:  "#D97706",
  cream:     "#FEF9F0",
  peach:     "#FDE8CC",
  rust:      "#C2410C",
  warmWhite: "#FFFAF3",
  sand:      "#E8D5B0",
  sienna:    "#92400E",
  muted:     "#78350F",
};

// ─── Fetch oEmbed metadata for a single video ID ──────────
async function fetchVideoMeta(youtubeId: string): Promise<VideoMeta> {
  try {
    const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${youtubeId}&format=json`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("oEmbed fetch failed");
    const data: OEmbedData = await res.json();
    return {
      youtubeId,
      title: data.title,
      author: data.author_name,
      // oEmbed gives 120×90 — we prefer the hi-res version directly
      thumbnail: `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`,
      status: "ready",
    };
  } catch {
    return {
      youtubeId,
      title: "Video",
      author: "",
      thumbnail: `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`,
      status: "error",
    };
  }
}

// ─── Play icon ────────────────────────────────────────────
function PlayIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5.14v14l11-7-11-7z" />
    </svg>
  );
}

// ─── Skeleton shimmer ─────────────────────────────────────
function Skeleton() {
  return (
    <div className="flex flex-col animate-pulse">
      <div
        className="w-full rounded-2xl rounded-b-none"
        style={{ aspectRatio: "16/9", background: palette.peach }}
      />
      <div
        className="px-5 py-5 rounded-b-2xl"
        style={{ background: "#fff", border: `1px solid ${palette.sand}`, borderTop: "none" }}
      >
        <div className="h-4 rounded-full mb-3" style={{ background: palette.peach, width: "70%" }} />
        <div className="h-3 rounded-full mb-2" style={{ background: palette.peach, width: "90%" }} />
        <div className="h-3 rounded-full" style={{ background: palette.peach, width: "55%" }} />
      </div>
    </div>
  );
}

// ─── Single video card ─────────────────────────────────────
function VideoCard({ meta, index }: { meta: VideoMeta; index: number }) {
  const [active, setActive] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  const cardRef = useRef(null);
  const inView = useInView(cardRef, { once: true, margin: "-60px" });

  const thumbSrc = imgFailed
    ? `https://img.youtube.com/vi/${meta.youtubeId}/hqdefault.jpg`
    : meta.thumbnail;

  return (
    <motion.div
      ref={cardRef}
      className="flex flex-col"
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.13, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* ── Video frame ── */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          borderRadius: "16px 16px 0 0",
          aspectRatio: "16/9",
          background: palette.peach,
          boxShadow: `0 4px 0 0 ${palette.saffron}`,
        }}
      >
        {/* Duration badge — shown only before play */}
        {!active && (
          <div
            className="absolute bottom-3 right-3 z-30 px-2.5 py-1 text-xs font-medium rounded-md"
            style={{
              background: "rgba(0,0,0,0.55)",
              color: "#fff",
              fontFamily: "'DM Mono', monospace",
              backdropFilter: "blur(4px)",
            }}
          >
            ▶ Watch
          </div>
        )}

        {/* Thumbnail overlay — visible before play */}
        <AnimatePresence>
          {!active && (
            <motion.div
              className="absolute inset-0 z-20 flex items-center justify-center cursor-pointer overflow-hidden"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              onClick={() => setActive(true)}
            >
              {/* Actual thumbnail image */}
              <img
                src={thumbSrc}
                alt={meta.title}
                className="absolute inset-0 w-full h-full object-cover"
                onError={() => setImgFailed(true)}
              />

              {/* Dark gradient scrim */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.08) 55%, rgba(0,0,0,0.20) 100%)",
                }}
              />

              {/* Saffron tint on hover */}
              <motion.div
                className="absolute inset-0"
                style={{ background: `${palette.saffron}28` }}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.22 }}
              />

              {/* Play button */}
              <motion.div
                className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full"
                style={{
                  background: palette.saffron,
                  boxShadow: "0 0 0 8px rgba(255,255,255,0.20)",
                  color: "#fff",
                }}
                whileHover={{ scale: 1.12, boxShadow: "0 0 0 14px rgba(255,255,255,0.14)" }}
                whileTap={{ scale: 0.95 }}
              >
                <PlayIcon size={22} />
              </motion.div>

              {/* Bottom title strip (from oEmbed metadata) */}
              <div className="absolute bottom-0 left-0 right-0 px-4 py-4 z-10">
                <p
                  className="text-white text-sm font-semibold leading-snug drop-shadow line-clamp-1"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {meta.title}
                </p>
                <p
                  className="text-xs mt-0.5 opacity-75"
                  style={{ color: palette.peach, fontFamily: "'DM Mono', monospace" }}
                >
                  {meta.author}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* YouTube iframe — mounts only after click */}
        {active && (
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${meta.youtubeId}?autoplay=1&rel=0&modestbranding=1&color=white`}
            title={meta.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ border: "none" }}
          />
        )}
      </div>

      {/* ── Card body — title & author from oEmbed ── */}
      <div
        className="flex-1 px-5 py-5"
        style={{
          background: "#ffffff",
          borderRadius: "0 0 16px 16px",
          border: `1px solid ${palette.sand}`,
          borderTop: "none",
          boxShadow: "0 8px 24px rgba(212,149,48,0.08)",
        }}
      >
        <h3
          className="text-base font-bold text-gray-900 leading-snug mb-1 line-clamp-2"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {meta.title}
        </h3>
        <p
          className="text-xs"
          style={{ color: palette.sienna, fontFamily: "'DM Mono', monospace", opacity: 0.7 }}
        >
          {meta.author}
        </p>

        {/* Footer action */}
        <div
          className="flex items-center justify-between mt-4 pt-4"
          style={{ borderTop: `1px solid ${palette.peach}` }}
        >
          <motion.button
            onClick={() => setActive(true)}
            className="flex items-center gap-2 text-sm font-semibold"
            style={{ color: palette.saffron, fontFamily: "'DM Mono', monospace" }}
            whileHover={{ x: 3 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <PlayIcon size={14} />
            Watch now
          </motion.button>

          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: i === 0 ? palette.saffron : palette.sand }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

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