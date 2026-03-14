"use client";

import HotelCard from "@/components/HotelCard";
import MotionDiv from "@/components/MotionDiv";
import React, { useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import { MoveLeft, MoveRight } from "lucide-react";

export default function ResortExplorer({
  featuredHotels,
}: {
  featuredHotels: any[];
}) {
  const [isBeginning, setIsBeginning] = useState<boolean>(true);
  const [isEnd, setIsEnd] = useState<boolean>(false);

  return (
    <div className="relative px-4 md:px-16 overflow-visible">
      <button
        className={`nav-prev absolute left-0 top-1/2 -translate-y-1/2 z-20 shadow-xl ${
          isBeginning ? "opacity-0 pointer-events-none" : ""
        }`}
      >
        <MoveLeft />
      </button>
      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: ".nav-prev",
          nextEl: ".nav-next",
        }}
        spaceBetween={40}
        // slidesPerView={3}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onSwiper={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        autoplay={{ delay: 4000 }}
      >
        {featuredHotels.map((hotel, index) => (
          <SwiperSlide>
            <HotelCard {...hotel} />
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        className={`nav-next absolute right-0 top-1/2 -translate-y-1/2 z-20 shadow-xl ${
          isEnd ? "opacity-0 pointer-events-none" : ""
        }`}
      >
        <MoveRight />
      </button>
      <style jsx global>
        {`
          /* Position arrows slightly outside slider */
          .nav-prev {
            left: -35px;
          }

          .nav-next {
            right: -35px;
          }

          /* Base style */
          .nav-prev,
          .nav-next {
            display: flex;
            align-items: center;
            justify-content: center;

            width: 56px;
            height: 56px;

            border-radius: 9999px;
            background: #f3f3f3;

            color: #b8860b; /* gold tone */

            border: none;

            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);

            transition: all 0.35s ease;

            cursor: pointer;
          }

          /* Hover animation */
          .nav-prev:hover,
          .nav-next:hover {
            background: #b8860b;
            color: white;
            transform: scale(1.08);
            box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25);
          }

          /* Click effect */
          .nav-prev:active,
          .nav-next:active {
            transform: scale(0.95);
          }

          /* Hide arrows on mobile */
          @media (max-width: 768px) {
            .nav-prev {
              top: -35px;
              left: 10px;
            }
            .nav-next {
              top: -35px;
              right: 10px;
            }
          }
        `}
      </style>
    </div>
  );
}
