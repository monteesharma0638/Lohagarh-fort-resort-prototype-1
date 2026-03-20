"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { CLOUDFLARE_DEV_URL } from "@/lib/constants";

const highlights = [
  {
    title: "RUSTIC PRIVATE MACHANS",
    image: "/images/lohagarhfortresort/gallery3.jpg",
  },
  {
    title: "ENCOUNTERS WITH A RANGE OF WILDLIFE",
    image: "/images/lohagarhfortresort/coridoor.jpg",
  },
  {
    title: "COLONIAL BUNGALOWS WITH VERANDAHS",
    image: "/images/lohagarhfortresort/gallery1.webp",
  },
  {
    title: "JEEP SAFARI",
    image: CLOUDFLARE_DEV_URL + "/lohagarh-fort-resort/activities/Jeep_safari.jpg",
  },
  {
    title: "LUXURY JUNGLE EXPERIENCE",
    image: "/images/lohagarhfortresort/gallery3.jpg",
  },
  {
    title: "OUTDOOR GAMES",
    image: CLOUDFLARE_DEV_URL + "/lohagarh-fort-resort/activities/Games.jpg",
  },
];

export default function HighlightsSection() {
  return (
    <section className="bg-muted/40 py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          <div className="flex items-center gap-6">
            <span className="w-16 h-[1px] bg-border"></span>

            <h2 className="text:3xl md:text-5xl tracking-wide font-serif text-foreground">
              HIGHLIGHTS
            </h2>
          </div>

          <p className="text-muted-foreground leading-relaxed max-w-xl">
            A special place that provides a perfect natural setting, fosters spiritual growth, and helps you explore your inner self from the very beginning
          </p>
        </div>

        {/* Carousel */}

        <Swiper
          modules={[Navigation, Autoplay, Pagination]}
          navigation
          autoplay={{ delay: 4000 }}
          spaceBetween={30}
          slidesPerView={3}
          pagination={{
            clickable: true,
            dynamicBullets: true, // Optional: makes bullets smaller as they get further from active
          }} // Enable dots
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1200: { slidesPerView: 3 },
          }}
          className="highlightSwiper"
        >
          {highlights.map((item, i) => (
            <SwiperSlide key={i} className="!overflow-visible">
              {" "}
              {/* Allow zoom to spill out */}
              <div className="group cursor-pointer transition-all duration-500 hover:scale-105 hover:z-50 relative">
                {/* Image Container */}
                <div className="relative overflow-hidden rounded-lg shadow-md group-hover:shadow-2xl transition-shadow duration-500">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={600}
                    height={700}
                    className="w-full h-[420px] object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition duration-500" />
                </div>

                {/* Title */}
                <h3 className="mt-6 text-center font-serif text-lg tracking-wide text-foreground transition-colors duration-500 group-hover:text-[hsl(var(--gold))]">
                  {item.title}
                </h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Swiper styling */}
      <style jsx global>{`
        .highlightSwiper .swiper-button-next,
        .highlightSwiper .swiper-button-prev {
          background: hsl(var(--primary));
          color: white;
          width: 42px;
          height: 42px;
          border: 1px solid hsl(var(--primary));
          border-radius: 999px;
          transition: all 0.3s ease;
        }

        .highlightSwiper .swiper-button-next:hover,
        .highlightSwiper .swiper-button-prev:hover {
          color: white;
          background: hsl(var(--gold));
          border: 1px solid hsl(var(--gold));
        }

        .highlightSwiper .swiper-button-next::after,
        .highlightSwiper .swiper-button-prev::after {
          font-size: 28px;
        }

        /* Container spacing */
        .swiper-pagination {
          position: relative !important;
          margin-top: 40px !important;
          bottom: 0 !important;
        }

        /* Base style for all dots */
        .swiper-pagination-bullet {
          width: 14px !important; /* Larger diameter */
          height: 14px !important; /* Larger diameter */
          background: white !important; /* Solid white base */
          border: 2px solid hsl(var(--primary)) !important; /* Thick gold border */
          opacity: 0.6 !important; /* More visible when inactive */
          margin: 0 8px !important; /* More space between dots */
          transition: all 0.3s ease-in-out;
        }

        /* Active "Bold" State */
        .swiper-pagination-bullet-active {
          width: 40px !important; /* Elongated "pill" shape */
          border-radius: 20px !important;
          background: hsl(
            var(--primary)
          ) !important; /* Solid gold when active */
          opacity: 1 !important; /* Fully opaque */
          box-shadow: 0 0 10px rgba(212, 175, 55, 0.5); /* Subtle gold glow */
        }

        /* Hover effect for better UX */
        .swiper-pagination-bullet:hover {
          opacity: 1 !important;
          transform: scale(1.2);
        }

        /* 1. Ensure the swiper doesn't clip the zoomed-in card */
        .highlightSwiper {
          overflow: visible !important;
        }

        /* 2. Fix the z-index so the hovered card sits ON TOP of its neighbors */
        .highlightSwiper .swiper-slide {
          transition: z-index 0s;
        }

        .highlightSwiper .swiper-slide:hover {
          z-index: 100 !important;
        }

        /* 3. Your existing Navigation/Pagination styles... */
        .highlightSwiper .swiper-button-next,
        .highlightSwiper .swiper-button-prev {
          /* ... your arrow styles ... */
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
        }

        /* Push arrows OUTSIDE the zoom area */
        .highlightSwiper .swiper-button-prev {
          left: -60px !important;
        }
        .highlightSwiper .swiper-button-next {
          right: -60px !important;
        }

        @media (max-width: 1300px) {
          /* Bring arrows back inside or hide them if screen is too narrow */
          .highlightSwiper .swiper-button-prev {
            left: 10px !important;
          }
          .highlightSwiper .swiper-button-next {
            right: 10px !important;
          }
        }
      `}</style>
    </section>
  );
}
