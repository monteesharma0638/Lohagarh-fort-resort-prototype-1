"use client";

import {AnimatePresence, motion, useInView} from "framer-motion";
import { useRef, useState } from "react";

// ─── Palette (saffron-anchored) ────────────────────────────
export const palette = {
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

export interface OEmbedData {
  title: string;
  author_name: string;
  thumbnail_url: string;
  thumbnail_width: number;
  thumbnail_height: number;
}

export interface VideoMeta {
  youtubeId: string;
  title: string;
  author: string;
  thumbnail: string;
  status: "loading" | "ready" | "error";
}
// ─── Fetch oEmbed metadata for a single video ID ──────────
export async function fetchVideoMeta(youtubeId: string): Promise<VideoMeta> {
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
export function PlayIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5.14v14l11-7-11-7z" />
    </svg>
  );
}

// ─── Skeleton shimmer ─────────────────────────────────────
export function Skeleton() {
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
export function VideoCard({ meta, index, hideMeta = false  }: { meta: VideoMeta; index: number, hideMeta?: boolean }) {
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
      {
        !hideMeta &&
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
      }
    </motion.div>
  );
}