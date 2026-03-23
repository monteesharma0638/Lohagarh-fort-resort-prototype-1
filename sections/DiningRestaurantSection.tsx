"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { MoveLeft, MoveRight } from "lucide-react";
import { useState } from "react";
import MotionDiv from "@/components/MotionDiv";
import { useMediaQuery } from "@/hooks/useUtils";

const restaurants = [
  {
    title: "Private Dinner",
    description:
      "Cherish a magical dining experience with a loved one. Our staff ensures an unforgettable evening.",
    cuisine: "Indian",
    hours: "Dinner, on request",
    phone: "+91 14123 85700",
    image: "/images/lohagarhfortresort/food-item-1.jpg",
  },
  {
    title: "Bonnet Breakfast",
    description:
      "Enjoy a lavish breakfast set up on your safari vehicle bonnet deep in the jungle.",
    cuisine: "Multi-Cuisine",
    hours: "Breakfast, as requested",
    phone: "+91 97704 29399",
    image: "/images/lohagarhfortresort/dine_in.jpg",
  },
  {
    title: "Private Dinner",
    description:
      "Cherish a magical dining experience with a loved one. Our staff ensures an unforgettable evening.",
    cuisine: "Indian",
    hours: "Dinner, on request",
    phone: "+91 14123 85700",
    image: "/images/lohagarhfortresort/food-item-1.jpg",
  },
  {
    title: "Bonnet Breakfast",
    description:
      "Enjoy a lavish breakfast set up on your safari vehicle bonnet deep in the jungle.",
    cuisine: "Multi-Cuisine",
    hours: "Breakfast, as requested",
    phone: "+91 97704 29399",
    image: "/images/lohagarhfortresort/dine_in.jpg",
  },
];

interface IDiningRestaurant {
  hotel: any
}

export default function DiningRestaurantsSection({hotel}: IDiningRestaurant) {
  const {resAndBars} = hotel ?? {};
  const [isBeginning, setIsBeginning] = useState<boolean>(true);
  const [isEnd, setIsEnd] = useState<boolean>(false);

    const isMobile = useMediaQuery("(max-width: 768px)");
  
    const SwiperContainer = isMobile
      ? ({ children }: any) => (
          <MotionDiv
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {children}
          </MotionDiv>
        )
      : SwiperSlide;
  
  return (
    <section className="">
      <div className="max-w-7xl mx-auto md:px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="font-serif text-4xl mb-3">Restaurants at {hotel.name}</h2>

          <p className="text-muted-foreground max-w-xl mx-auto text-sm">
            Discover extraordinary dining experiences crafted with authentic
            flavors and timeless hospitality.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative md:px-16 overflow-visible">
          <button className={`nav-prev absolute left-0 top-1/2 -translate-y-1/2 z-20 shadow-xl ${
            isBeginning ? "opacity-0 pointer-events-none" : ""
          }`}>
            <MoveLeft />
          </button>
          <Swiper
            modules={[Navigation, Pagination]}
            navigation={{
              prevEl: ".nav-prev",
              nextEl: ".nav-next",
            }}
            onSlideChange={(swiper) => {
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
            onSwiper={(swiper) => {
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
            spaceBetween={24}
            slidesPerView={1}
            pagination={{
              clickable: true,
              dynamicBullets: true, // Optional: makes bullets smaller as they get further from active
            }} // Enable dots
            breakpoints={{
              640: { slidesPerView: 1 },
              900: { slidesPerView: 2 },
              // 1200: { slidesPerView: 3 },
            }}
          >
            {resAndBars?.length && resAndBars.map((item: any, i: number) => (
              <SwiperContainer key={i}>
                <div className="bg-white my-2 rounded-lg shadow-md hover:shadow-xl transition duration-500 overflow-hidden">
                  {/* Image */}
                  <div className="relative">
                    <Image
                      src={item.img}
                      alt={item.name}
                      width={600}
                      height={400}
                      className="w-full h-[200px] object-cover transition duration-700 hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-serif text-lg mb-2">{item.name}</h3>

                    <p className="text-muted-foreground text-xs mb-4 leading-relaxed">
                      {item.description.split("\n")[0]}
                    </p>

                    {/* Info */}
                    {/* <div className="flex justify-between text-xs mb-4">
                      <div>
                        <p className="text-muted-foreground uppercase text-[10px]">
                          Cuisine
                        </p>
                        <p>{item.cuisine}</p>
                      </div>

                      <div>
                        <p className="text-muted-foreground uppercase text-[10px]">
                          Hours
                        </p>
                        <p>{item.hours}</p>
                      </div>
                    </div> */}

                    <p className="text-[hsl(var(--gold))] text-xs mb-4">
                      {item.phone}
                    </p>

                    {/* Actions */}
                    {/* <div className="flex justify-between items-center border-t pt-3">
                      <button className="text-xs text-muted-foreground hover:text-black">
                        Book Table
                      </button>

                      <button className="text-xs text-[hsl(var(--gold))] uppercase tracking-wider">
                        Details →
                      </button>
                    </div> */}
                  </div>
                </div>
              </SwiperContainer>
            ))}
          </Swiper>
          <button className={`nav-next absolute right-0 top-1/2 -translate-y-1/2 z-20 shadow-xl ${
            isEnd ? "opacity-0 pointer-events-none" : ""
          }`}>
            <MoveRight />
          </button>
        </div>
      </div>

      {/* Optional arrow styling */}
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
