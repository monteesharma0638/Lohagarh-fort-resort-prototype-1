"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { MoveLeft, MoveRight } from "lucide-react";

const experiences = [
  {
    title: "Royal Rajasthani Feast",
    desc: "Experience the grandeur of traditional Rajasthani cuisine served in royal style with handcrafted recipes.",
    image: "/images/dining-fine.png",
  },
  {
    title: "Poolside Grill Nights",
    desc: "Enjoy freshly grilled kebabs and exotic drinks beside the pool under the starlit sky.",
    image: "/images/lohagarhfortresort/dine_in.jpg",
  },
  {
    title: "Private Candlelight Dinner",
    desc: "An intimate candlelight dining experience curated for unforgettable romantic evenings.",
    image: "/images/lohagarhfortresort/food-item-1.jpg",
  },
  {
    title: "Royal Dessert Tasting",
    desc: "A curated collection of decadent desserts inspired by royal kitchens of Rajasthan.",
    image: "/images/lohagarhfortresort/food-item-1.jpg",
  },
];

interface IDiningExperiences {
  diningExperiences: any;
}

export default function DiningExperiencesSection({
  diningExperiences,
}: IDiningExperiences) {
  return (
    <section className="pt-10 bg-background relative">
      <div className="max-w-7xl mx-auto md:px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="font-serif text-5xl mb-4">Dining Experiences</h2>

          <p className="text-muted-foreground max-w-2xl mx-auto">
            From royal feasts to romantic candlelight dinners, discover curated
            culinary experiences crafted to create unforgettable moments.
          </p>
        </div>

        {/* Slider */}
        <div className="relative md:px-16 overflow-visible">
          <button className="nav-prev absolute left-0 top-1/2 -translate-y-1/2 z-20 shadow-xl">
            <MoveLeft />
          </button>
          <Swiper
            modules={[Navigation, Pagination]}
            navigation={{
              prevEl: ".nav-prev",
              nextEl: ".nav-next",
            }}
            spaceBetween={40}
            pagination={{
              clickable: true,
              dynamicBullets: true, // Optional: makes bullets smaller as they get further from active
            }} // Enable dots
            slidesPerView={1.2}
            breakpoints={{
              768: { slidesPerView: 2.2 },
              1200: { slidesPerView: 3 },
            }}
          >
            {diningExperiences.map((item: any, i: number) => (
              <SwiperSlide key={i}>
                <div className="group relative h-[460px] overflow-hidden rounded-xl shadow-lg">
                  {/* Image */}
                  <Image
                    src={item.img}
                    alt={item.title}
                    width={700}
                    height={600}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                  {/* Luxury top line */}
                  <div className="absolute top-6 left-6 w-12 h-[2px] bg-[hsl(var(--gold))] transition-all duration-500 group-hover:w-24"></div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 p-8 w-full text-white flex flex-col justify-end">
                    <h3 className="font-serif text-2xl mb-1 tracking-wide transition-transform duration-500 group-hover:-translate-y-2">
                      {item.title}
                    </h3>

                    {/* The Animated Description */}
                    <div className="grid transition-all duration-500 ease-in-out grid-rows-[0fr] group-hover:grid-rows-[1fr] opacity-0 group-hover:opacity-100">
                      <div className="overflow-hidden">
                        <p className="text-sm text-white/80 leading-relaxed translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
                          {item.description}
                        </p>

                        {/* <span className="mt-4 inline-block text-[hsl(var(--gold))] text-xs tracking-[0.25em] uppercase">
                          Discover Experience
                        </span> */}
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <button className="nav-next absolute right-0 top-1/2 -translate-y-1/2 z-20 shadow-xl">
            <MoveRight />
          </button>
        </div>
      </div>

      {/* Custom arrow styling */}
      <style jsx global>{`
        /* Position the buttons in the side padding */
        .nav-prev {
          left: -20 !important;
          transform: translateX(-10px); /* Fine-tune the "outside" distance */
        }

        .nav-next {
          right: 0 !important;
          transform: translateX(10px); /* Fine-tune the "outside" distance */
        }

        /* Base style for the arrows */
        .nav-prev,
        .nav-next {
          color: hsl(var(--gold)) !important;
          width: 50px !important;
          height: 50px !important;
          border: 2px solid hsl(var(--gold)) !important;
          border-radius: 50% !important;
          background: white !important; /* Prevents arrows from being invisible on the background */
          z-index: 10;
          transition: all 0.3s ease;
        }

        /* Make the arrow icons slightly smaller/bolder */
        .nav-next:after,
        .nav-prev:after {
          font-size: 18px !important;
          font-weight: bold !important;
        }

        /* Hover Effect */
        .nav-next:hover,
        .nav-prev:hover {
          background: hsl(var(--gold)) !important;
          color: white !important;
        }

        /* Hide arrows on mobile to prevent them from going off-screen */
        @media (max-width: 768px) {
          .nav-next,
          .nav-prev {
            display: none !important;
          }
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
          border: 2px solid hsl(var(--gold)) !important; /* Thick gold border */
          opacity: 0.6 !important; /* More visible when inactive */
          margin: 0 8px !important; /* More space between dots */
          transition: all 0.3s ease-in-out;
        }

        /* Active "Bold" State */
        .swiper-pagination-bullet-active {
          width: 40px !important; /* Elongated "pill" shape */
          border-radius: 20px !important;
          background: hsl(var(--gold)) !important; /* Solid gold when active */
          opacity: 1 !important; /* Fully opaque */
          box-shadow: 0 0 10px rgba(212, 175, 55, 0.5); /* Subtle gold glow */
        }

        /* Hover effect for better UX */
        .swiper-pagination-bullet:hover {
          opacity: 1 !important;
          transform: scale(1.2);
        }
      `}</style>
    </section>
  );
}
