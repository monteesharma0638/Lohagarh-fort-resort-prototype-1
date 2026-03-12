"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { MoveLeft, MoveRight } from "lucide-react";

const spaExperiences = [
  {
    title: "Lohagarh Fort Resort",
    image:
      "https://res.cloudinary.com/drayl5ppi/image/upload/v1773207916/lohagarh/images/spa/edit2_g1gpkp.jpg",
    description:
      "Step into a serene sanctuary designed to restore harmony between the body and mind. Moksha Spa offers an immersive wellness experience inspired by ancient Indian healing traditions combined with modern therapeutic practices. Each treatment is carefully curated by trained therapists to rejuvenate your senses and promote deep relaxation.",
    details:
      "Guests can indulge in calming herbal therapies, soothing massages and holistic beauty treatments designed to refresh the body while calming the mind. The tranquil environment, aromatic oils and natural ingredients create an atmosphere of complete rejuvenation.",
    treatments: [
      "International Massages",
      "Ayurvedic Treatments",
      "Hot Stone Therapy",
      "Herbal Detox Rituals",
      "Beauty Essentials",
      "Naturopathy Massage",
    ],
    hours: "9 AM – 8 PM",
    location: "Spa Pavilion",
  },
  {
    title: "Lohagarh Corbett Resort",
    image:
      "https://res.cloudinary.com/drayl5ppi/image/upload/v1773208399/lohagarh/images/spa/edit1_g3trye.jpg",
    description:
      "Experience authentic Ayurvedic therapies that focus on restoring balance to the body's natural energies. These treatments combine herbal oils, therapeutic techniques and ancient wellness rituals practiced for centuries.",
    details:
      "Our Ayurvedic programs are designed to detoxify, rejuvenate and revitalize your body through holistic healing methods that focus on complete wellness.",
    treatments: [
      "Abhyanga Oil Massage",
      "Shirodhara Therapy",
      "Panchakarma Detox",
      "Herbal Body Scrubs",
      "Traditional Head Massage",
    ],
    hours: "10 AM – 7 PM",
    location: "Wellness Pavilion",
  },
  {
    title: "Townhall Restaurant & Events",
    image:
      "https://res.cloudinary.com/drayl5ppi/image/upload/v1773207923/lohagarh/images/spa/edit3_dxtqsq.jpg",
    description:
      "Indulge in signature spa rituals designed to deliver deep relaxation and luxury. These curated experiences combine aromatherapy, soothing music and personalized massage techniques.",
    details:
      "Each ritual is crafted to create a peaceful environment where guests can disconnect from daily stress and immerse themselves in pure tranquility.",
    treatments: [
      "Aromatherapy Massage",
      "Couple Spa Ritual",
      "Luxury Facial Therapy",
      "Deep Tissue Massage",
      "Relaxation Therapy",
    ],
    hours: "9 AM – 9 PM",
    location: "Luxury Spa Suites",
  },
];

export default function SpaCarouselSection() {
  return (
    <section className="py-28 bg-[#f7f5f2]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <p className="uppercase tracking-[0.35em] text-xs text-[hsl(var(--gold))] mb-4">
            Wellness Experiences
          </p>

          <h2 className="font-serif text-5xl mb-6">Spa & Wellness Retreat</h2>

          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover a world of relaxation and rejuvenation through our curated
            spa experiences inspired by nature and ancient wellness traditions.
          </p>
        </div>

        {/* Carousel */}
        {/* Slider */}
        <div className="relative px-16 overflow-visible">
          <button className="nav-prev absolute left-0 top-1/2 -translate-y-1/2 z-20 shadow-xl">
            <MoveLeft />
          </button>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation={{
              prevEl: ".nav-prev",
              nextEl: ".nav-next",
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true, // Optional: makes bullets smaller as they get further from active
            }} // Enable dots
            spaceBetween={40}
            centeredSlides
            slidesPerView={1}
            autoplay={{ delay: 4000 }}
          >
            {spaExperiences.map((spa, i) => (
              <SwiperSlide key={i}>
                <div className="grid lg:grid-cols-2 gap-14 items-center">
                  {/* Image */}

                  <div className="relative overflow-hidden rounded-xl">
                    <Image
                      src={spa.image}
                      alt={spa.title}
                      width={700}
                      height={500}
                      className="w-full h-[420px] object-cover"
                    />
                  </div>

                  {/* Content */}

                  <div>
                    <h3 className="font-serif text-3xl mb-4">{spa.title}</h3>

                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {spa.description}
                    </p>

                    <p className="text-muted-foreground mb-8 leading-relaxed">
                      {spa.details}
                    </p>

                    {/* Treatments */}
                    <div className="grid sm:grid-cols-2 gap-3 mb-8">
                      {spa.treatments.map((item, idx) => (
                        <div key={idx} className="flex gap-3 items-center">
                          <span className="text-[hsl(var(--gold))] text-lg">
                            ✓
                          </span>

                          <span className="text-sm text-muted-foreground">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Info */}
                    <div className="flex gap-12 text-sm border-t pt-6">
                      <div>
                        <p className="uppercase text-xs text-muted-foreground mb-1">
                          Opening Hours
                        </p>
                        <p>{spa.hours}</p>
                      </div>

                      <div>
                        <p className="uppercase text-xs text-muted-foreground mb-1">
                          Location
                        </p>
                        <p>{spa.location}</p>
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
