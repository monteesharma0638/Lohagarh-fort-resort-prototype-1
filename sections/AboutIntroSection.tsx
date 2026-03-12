"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const images = [
  "https://res.cloudinary.com/drayl5ppi/image/upload/v1773212409/lohagarh/images/hero/DSC03810_a2obbz.jpg",
  "https://res.cloudinary.com/drayl5ppi/image/upload/v1773212408/lohagarh/images/hero/edit8_spadua.jpg",
  "https://res.cloudinary.com/drayl5ppi/image/upload/v1773212407/lohagarh/images/hero/DSC03783_v1psxa.jpg",
  "https://res.cloudinary.com/drayl5ppi/image/upload/v1773212406/lohagarh/images/hero/DSC01586_qdlvzv.jpg",
];

function AboutImageSlider() {
  return (
    <div className="relative w-full h-[420px] overflow-hidden rounded-xl">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        slidesPerView={1}
        loop
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        className="h-full"
      >
        {images.map((img, i) => (
          <SwiperSlide key={i}>
            <Image
              src={img}
              alt="Lohagarh Resort"
              fill
              className="object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <style global jsx>
        {`
          .swiper-pagination-bullet {
            background: white;
            opacity: 0.5;
          }

          .swiper-pagination-bullet-active {
            background: hsl(var(--gold));
            opacity: 1;
          }
        `}
      </style>
    </div>
  );
}

export default function AboutIntroSection() {
  return (
    <section className="py-10 bg-[#f8f6f3]">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Content */}
        <div>
          <p className="uppercase tracking-[0.35em] text-xs text-[hsl(var(--gold))] mb-4">
            About Lohagarh
          </p>

          <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-6">
            Crafting Experiences in
            <br /> Luxury & Nature
          </h2>

          <p className="text-muted-foreground leading-relaxed mb-6">
            Lohagarh Group of Companies is built on a vision to create
            extraordinary destinations that combine the elegance of luxury
            hospitality with the serenity of nature. Each of our properties is
            carefully designed to offer guests a harmonious escape from the busy
            pace of everyday life.
          </p>

          <p className="text-muted-foreground leading-relaxed mb-8">
            With a deep respect for natural landscapes and traditional
            architecture, Lohagarh has established itself as a unique
            destination where comfort, culture, and sustainability come together
            to create unforgettable experiences.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-6 border-t">
            <div>
              <h3 className="text-3xl font-serif text-[hsl(var(--gold))]">
                20+
              </h3>
              <p className="text-sm text-muted-foreground">Years Experience</p>
            </div>

            <div>
              <h3 className="text-3xl font-serif text-[hsl(var(--gold))]">
                5+
              </h3>
              <p className="text-sm text-muted-foreground">Luxury Resorts</p>
            </div>

            <div>
              <h3 className="text-3xl font-serif text-[hsl(var(--gold))]">
                10K+
              </h3>
              <p className="text-sm text-muted-foreground">Happy Guests</p>
            </div>
          </div>
        </div>

        {/* Right Image Layout */}

        <AboutImageSlider />
      </div>
    </section>
  );
}
