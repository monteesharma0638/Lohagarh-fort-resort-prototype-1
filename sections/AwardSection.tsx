"use client";

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const awards = [
  { id: 1, title: 'TripAdvisor', subtitle: 'Certificate of Excellence', img: '/awards/tripadvisor.png' },
  { id: 1, title: 'TripAdvisor 2022', subtitle: 'Certificate of Excellence', img: '/awards/tripadvisor-2022.png' },
  { id: 2, title: 'Goibibo', subtitle: '4.5/5 Star Partner', img: '/awards/goibibo.jpg' },
  { id: 3, title: 'MakeMyTrip', subtitle: 'Star Partner Award', img: '/awards/makemytrip.jpg' },
  { id: 4, title: 'Nearbuy.com', subtitle: 'Traveller Review Award', img: '/awards/nearbuy.jpg' },
  { id: 5, title: 'Heritage Awards', subtitle: 'Best Luxury Resort', img: '/awards/holidayiq.jpg' },
];

const AwardSection = () => {
  return (
    <section className="py-16 bg-[#F9F8F6]">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <span className="text-sm font-bold tracking-widest text-[#C2A978] uppercase">
            Recognition of Excellence
          </span>
          <h2 className="text-4xl md:text-5xl font-serif mt-2 mb-4 text-[#2D2D2D]">
            Our Accolades
          </h2>
          <div className="w-20 h-px bg-[#C2A978] mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-600 leading-relaxed">
            Over the years, Lohagarh has been recognized by prestigious international and 
            national bodies for its commitment to luxury and exceptional hospitality.
          </p>
        </div>

        {/* Swiper Carousel */}
        <div className="relative px-8">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            className="pb-12"
          >
            {awards.map((award) => (
              <SwiperSlide key={award.id}>
                <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center h-full">
                  <div className="h-32 flex items-center justify-center mb-6">
                    <img 
                      src={award.img}
                      alt={award.title}
                      className="max-h-full object-contain filter"
                    />
                  </div>
                  <h3 className="font-serif text-lg text-gray-800">{award.title}</h3>
                  <p className="text-sm text-[#C2A978] font-medium mt-1">{award.subtitle}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Custom Styles for Swiper Arrows (Optional override) */}
      <style jsx global>{`
        .swiper-button-next, .swiper-button-prev {
          color: #C2A978 !important;
          transform: scale(0.7);
        }
        .swiper-pagination-bullet-active {
          background: #C2A978 !important;
        }
      `}</style>
    </section>
  );
};

export default AwardSection;