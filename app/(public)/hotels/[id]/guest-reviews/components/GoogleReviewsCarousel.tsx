"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectCoverflow } from "swiper/modules";
import { motion, AnimatePresence, useInView } from "framer-motion";
import type { Swiper as SwiperType } from "swiper";

// ─── Import Swiper styles in your global CSS or layout ───
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { useFetch } from "@/hooks/api";
import TimeAgo from "@/components/ui/time-ago";

// ─── Types ───────────────────────────────────────────────
interface Review {
  id: number;
  name: string;
  rating: number;
  time: string | number;
  description: string;
}

const colors = [
  {
    color: "#D97706",
    bg: "#FFFBEB",
  },
  {
    color: "#0D9488",
    bg: "#F0FDFA",
  },
  {
    color: "#7C3AED",
    bg: "#F5F3FF",
  },
  {
    color: "#DC2626",
    bg: "#FEF2F2",
  },
]

// // ─── Data ────────────────────────────────────────────────
// const reviews: Review[] = [
//   {
//     id: 1,
//     name: "Sophia Marchetti",
//     initials: "SM",
//     rating: 5,
//     date: "2 weeks ago",
//     text: "An absolutely transformative experience. The attention to detail is unparalleled — every interaction felt considered, warm, and genuinely exceptional. I've recommended this to everyone I know.",
//     role: "Brand Strategist",
//     color: "#D97706",
//     bg: "#FFFBEB",
//   },
//   {
//     id: 2,
//     name: "James Whitfield",
//     initials: "JW",
//     rating: 5,
//     date: "1 month ago",
//     text: "Rare to find a service that consistently exceeds expectations. From first contact to delivery, the professionalism was extraordinary. This is the gold standard for the industry.",
//     role: "Creative Director",
//     color: "#0D9488",
//     bg: "#F0FDFA",
//   },
//   {
//     id: 3,
//     name: "Priya Nair",
//     initials: "PN",
//     rating: 5,
//     date: "3 weeks ago",
//     text: "I was skeptical at first, but I was completely won over. The quality speaks for itself. It has elevated my entire workflow and I genuinely cannot imagine going back.",
//     role: "Product Designer",
//     color: "#7C3AED",
//     bg: "#F5F3FF",
//   },
//   {
//     id: 4,
//     name: "Theo Beaumont",
//     initials: "TB",
//     rating: 5,
//     date: "5 days ago",
//     text: "Effortlessly brilliant. The experience is seamless, the results are stunning, and the team behind it is world-class. Worth every single penny and then some.",
//     role: "Founder & CEO",
//     color: "#DC2626",
//     bg: "#FEF2F2",
//   },
//   {
//     id: 5,
//     name: "Amara Osei",
//     initials: "AO",
//     rating: 5,
//     date: "2 months ago",
//     text: "A genuinely rare find. I've worked with many services in this space, but nothing compares to the thoughtfulness and craft here. Five stars doesn't feel like enough.",
//     role: "Art Director",
//     color: "#2563EB",
//     bg: "#EFF6FF",
//   },
//   {
//     id: 6,
//     name: "Lena Voss",
//     initials: "LV",
//     rating: 4,
//     date: "1 week ago",
//     text: "Exceptional quality and a beautifully curated experience. The team understood my needs instantly and delivered beyond what I imagined. Truly impressive from start to finish.",
//     role: "UX Researcher",
//     color: "#DB2777",
//     bg: "#FDF2F8",
//   },
// ];

// ─── Sub-components ───────────────────────────────────────

function StarRating({ rating, color }: { rating: number; color: string }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.svg
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.07, type: "spring", stiffness: 300 }}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={i < rating ? color : "transparent"}
          stroke={i < rating ? color : "#D1D5DB"}
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
          />
        </motion.svg>
      ))}
    </div>
  );
}

function GoogleLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

function ReviewCard({ review, isActive, index = 0 }: { review: Review; isActive: boolean; index: number }) {
  return (
    <motion.div
      className="relative h-full rounded-2xl overflow-hidden"
      style={{
        background: isActive
          ? `linear-gradient(145deg, #ffffff 0%, ${colors[index % colors.length].bg} 100%)`
          : "#ffffff",
        border: `1.5px solid ${isActive ? colors[index % colors.length].color + "35" : "#E5E7EB"}`,
        boxShadow: isActive
          ? `0 8px 40px ${colors[index % colors.length].color}22, 0 2px 12px rgba(0,0,0,0.06)`
          : "0 2px 16px rgba(0,0,0,0.06)",
        transition: "all 0.4s ease",
      }}
    >
      {/* Colored top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
        style={{
          background: isActive
            ? `linear-gradient(90deg, ${colors[index % colors.length].color}, ${colors[index % colors.length].color}70)`
            : "transparent",
          transition: "all 0.4s ease",
        }}
      />

      {/* Decorative quote */}
      <div
        className="absolute top-4 right-5 text-7xl font-serif leading-none select-none pointer-events-none"
        style={{ color: colors[index % colors.length] + "12", fontFamily: "Georgia, serif", lineHeight: 1 }}
      >
        "
      </div>

      <div className="relative z-10 p-7 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <div>
              <p
                className="font-semibold text-sm leading-tight text-gray-900"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {review.name}
              </p>
            </div>
          </div>
          <GoogleLogo />
        </div>

        {/* Stars */}
        <StarRating rating={review.rating} color={colors[index % colors.length].color} />

        {/* Review text */}
        <p
          className="mt-4 text-gray-600 text-sm leading-relaxed flex-1"
          style={{ fontFamily: "'Lora', serif", letterSpacing: "0.01em" }}
        >
          "{review?.description.slice(0, 300)}..."
        </p>

        {/* Footer */}
        <div
          className="mt-5 pt-4 flex items-center justify-between"
          style={{ borderTop: "1px solid #F3F4F6" }}
        >
          <span
            className="text-xs text-gray-400"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            <TimeAgo timestamp={review.time} />
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────
export default function GoogleReviewsCarousel({rating = false, reviews = []} : {rating?: boolean, reviews?: any}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null);
  // const {data: reviews, loading: isLoading} = useFetch("/api/properties/testimonials?id=all");
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: "-80px" });

  const overallRating = (reviews?.reduce((s: any, r: any) => s + r.rating, 0) / reviews?.length).toFixed(1);
  const activeReview = reviews?.[activeIndex] ?? {};

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center py-20 px-4 overflow-hidden"
      style={{ background: "var(--primary)" }}
    >
      {/* Dot grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, var(--primary) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          opacity: 0.45,
        }}
      />

      {/* Top radial wash */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at top, #EFF6FF 0%, transparent 70%)",
        }}
      />

      {/* Animated color blob that follows active review accent */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeReview.time}
          className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "#2563EB", filter: "blur(120px)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.07 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        />
      </AnimatePresence>

      {/* ── Header ── */}
      <motion.div
        className="text-center mb-14 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white"
          style={{ border: "1px solid #E2E8F0", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.1 }}
        >
          <GoogleLogo />
          <span
            className="text-xs text-blue-500 font-semibold tracking-widest uppercase"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            Google Reviews
          </span>
        </motion.div>

        <h2
          className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 leading-tight"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Loved by{" "}
          <span
            className="italic"
            style={{
              background: "linear-gradient(90deg, #2563EB, #7C3AED)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            thousands.
          </span>
        </h2>

        <p
          className="text-gray-500 max-w-md mx-auto text-sm leading-relaxed"
          style={{ fontFamily: "'Lora', serif" }}
        >
          Real words from real people who've experienced something worth sharing.
        </p>

        {/* Rating strip */}
        {
          rating && <motion.div
          className="inline-flex items-center gap-5 mt-8 px-6 py-4 rounded-2xl bg-white"
          style={{ border: "1px solid #E2E8F0", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
        >
          <div className="text-center">
            <div
              className="text-3xl font-bold text-gray-900"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {overallRating}
            </div>
            <div className="flex mt-1 justify-center gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B" strokeWidth="1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                </svg>
              ))}
            </div>
          </div>

          <div className="w-px h-10 bg-gray-100" />

          <div className="text-center">
            <div className="text-lg font-semibold text-gray-800" style={{ fontFamily: "'DM Mono', monospace" }}>
              {reviews.length * 18}+
            </div>
            <div className="text-xs text-gray-400 mt-0.5" style={{ fontFamily: "'DM Mono', monospace" }}>
              Reviews
            </div>
          </div>

          <div className="w-px h-10 bg-gray-100" />

          <div className="text-center">
            <div className="text-lg font-semibold text-gray-800" style={{ fontFamily: "'DM Mono', monospace" }}>
              100%
            </div>
            <div className="text-xs text-gray-400 mt-0.5" style={{ fontFamily: "'DM Mono', monospace" }}>
              Verified
            </div>
          </div>
          </motion.div>
        }
      </motion.div>

      {/* ── Swiper ── */}
      <motion.div
        className="w-full max-w-6xl relative z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <Swiper
          onSwiper={setSwiperRef}
          modules={[Autoplay, Navigation, Pagination, EffectCoverflow]}
          effect="coverflow"
          grabCursor
          centeredSlides
          slidesPerView="auto"
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.2,
            slideShadows: false,
          }}
          autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
          pagination={{ clickable: true, el: ".custom-pagination" }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          loop
          className="pb-4"
          style={{ paddingLeft: "1rem", paddingRight: "1rem" }}
        >
          {reviews?.map((review: any, i: number) => (
            <SwiperSlide key={review.id} style={{ width: "360px", height: "320px" }}>
              <ReviewCard review={review} isActive={activeIndex === i} index={i} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mt-10">
          <motion.button
            onClick={() => swiperRef?.slidePrev()}
            whileHover={{ scale: 1.08, boxShadow: "0 4px 20px rgba(0,0,0,0.10)" }}
            whileTap={{ scale: 0.95 }}
            className="w-11 h-11 rounded-full flex items-center justify-center bg-white"
            style={{ border: "1.5px solid #E5E7EB", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </motion.button>

          <div className="custom-pagination flex gap-2 items-center" />

          <motion.button
            onClick={() => swiperRef?.slideNext()}
            whileHover={{ scale: 1.08, boxShadow: "0 4px 20px rgba(0,0,0,0.10)" }}
            whileTap={{ scale: 0.95 }}
            className="w-11 h-11 rounded-full flex items-center justify-center bg-white"
            style={{ border: "1.5px solid #E5E7EB", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </motion.button>
        </div>
      </motion.div>

      {/* Pagination dot overrides */}
      <style>{`
        .custom-pagination .swiper-pagination-bullet {
          width: 6px;
          height: 6px;
          background: #CBD5E1;
          border-radius: 9999px;
          opacity: 1;
          transition: all 0.3s ease;
          cursor: pointer;
          display: inline-block;
        }
        .custom-pagination .swiper-pagination-bullet-active {
          width: 24px;
          background: #2563EB;
          border-radius: 9999px;
        }
      `}</style>
    </section>
  );
}