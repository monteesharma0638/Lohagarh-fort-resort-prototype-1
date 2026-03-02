"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion, useInView } from "framer-motion";

const galleryData = [
  {
    id: "fort-resort",
    property: "Lohagarh Fort Resort",
    location: "Jaipur",
    images: [
      { src: "/images/lohagarhfortresort/cover_drone_view.jpg", alt: "Aerial view of Lohagarh Fort Resort" },
      { src: "/images/lohagarhfortresort/front-gate.jpg", alt: "Grand entrance gate" },
      { src: "/images/lohagarhfortresort/coridoor.jpg", alt: "Heritage corridor" },
      { src: "/images/lohagarhfortresort/pool-site.jpg", alt: "Poolside view" },
      { src: "/images/lohagarhfortresort/dine-in.jpg", alt: "Royal dining" },
      { src: "/images/lohagarhfortresort/spa.webp", alt: "Spa & wellness" },
      { src: "/images/lohagarhfortresort/royal-wedding.jpg", alt: "Royal wedding setup" },
      { src: "/images/lohagarhfortresort/outer.webp", alt: "Exterior grounds" },
    ],
  },
  {
    id: "desert-resort",
    property: "Lohagarh Desert Resort",
    location: "Jaisalmer",
    images: [
      { src: "/images/lohagarhdesertresort/cover.png", alt: "Desert Resort overview" },
      { src: "/images/lohagarhdesertresort/main.png", alt: "Main building" },
      { src: "/images/lohagarhdesertresort/gallery1.png", alt: "Desert landscape" },
      { src: "/images/lohagarhdesertresort/gallery2.png", alt: "Resort amenities" },
    ],
  },
  {
    id: "townhall",
    property: "Townhall Restaurant & Events",
    location: "Bharatpur",
    images: [
      { src: "/images/townhall/front.jpg", alt: "Townhall entrance" },
      { src: "/images/townhall/gallery1.jpg", alt: "Interior dining" },
      { src: "/images/townhall/gallery2.jpg", alt: "Event setup" },
      { src: "/images/townhall/gallery3.jpg", alt: "Decor details" },
      { src: "/images/townhall/gallery4.jpg", alt: "Evening ambiance" },
      { src: "/images/townhall/gallery5.jpg", alt: "Banquet hall" },
      { src: "/images/townhall/gallery6.jpg", alt: "Garden area" },
      { src: "/images/townhall/gallery7.jpg", alt: "Night view" },
    ],
  },
  {
    id: "mahalkhas",
    property: "Mahalkhas",
    location: "Bharatpur",
    images: [
      { src: "/images/mahalkhas/front.jpg", alt: "Mahalkhas entrance" },
      { src: "/images/mahalkhas/banner.jpg", alt: "Heritage view" },
      { src: "/images/mahalkhas/gallery1.jpg", alt: "Interior view" },
      { src: "/images/mahalkhas/gallery2.jpg", alt: "Courtyard" },
      { src: "/images/mahalkhas/gallery3.jpg", alt: "Dining area" },
      { src: "/images/mahalkhas/gallery4.jpg", alt: "Garden" },
      { src: "/images/mahalkhas/gallery5.jpg", alt: "Rooms" },
      { src: "/images/mahalkhas/gallery6.jpg", alt: "Night atmosphere" },
    ],
  },
  {
    id: "corbett",
    property: "Lohagarh Corbett Resort",
    location: "Nainital",
    images: [
      { src: "/images/corbett/banner.jpg", alt: "Corbett Resort view" },
    ],
  },
];

function GalleryCard({ image, index, onClick }: { image: { src: string; alt: string }; index: number; onClick: () => void }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const sizes = ["row-span-2 col-span-1", "row-span-1 col-span-1", "row-span-1 col-span-2", "row-span-1 col-span-1"];
  const sizeClass = sizes[index % sizes.length];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.95 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(); } }}
      className={`${sizeClass} min-h-[200px] relative overflow-hidden cursor-pointer group focus:outline-none focus:ring-2 focus:ring-primary`}
      onClick={onClick}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
        <p className="text-white text-sm font-medium">{image.alt}</p>
      </div>
      <div className="absolute inset-0 border-2 border-white/0 group-hover:border-primary/50 transition-colors duration-500" />
    </motion.div>
  );
}

function PropertySection({ property, index }: { property: typeof galleryData[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="mb-24"
    >
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-8 flex items-end gap-4"
      >
        <div>
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary">{property.location}</span>
          <h3 className="text-3xl md:text-4xl font-serif text-foreground mt-1">{property.property}</h3>
        </div>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex-1 h-[2px] bg-gradient-to-r from-primary/40 to-transparent origin-left mb-2"
        />
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] gap-3">
        {property.images.map((image, imgIndex) => (
          <GalleryCard
            key={image.src}
            image={image}
            index={imgIndex}
            onClick={() => {
              const event = new CustomEvent("openLightbox", {
                detail: {
                  images: property.images,
                  startIndex: imgIndex,
                },
              });
              window.dispatchEvent(event);
            }}
          />
        ))}
      </div>
    </motion.section>
  );
}

function Lightbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState<{ src: string; alt: string }[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      setImages(detail.images);
      setCurrentIndex(detail.startIndex);
      setIsOpen(true);
    };
    window.addEventListener("openLightbox", handler);
    return () => window.removeEventListener("openLightbox", handler);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
      if (e.key === "ArrowRight") setCurrentIndex((prev) => (prev + 1) % images.length);
      if (e.key === "ArrowLeft") setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, images.length]);

  if (!isOpen || images.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        role="dialog"
        aria-modal="true"
        aria-label="Image lightbox"
        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center"
        onClick={() => setIsOpen(false)}
      >
        <button
          className="absolute top-6 right-6 text-white/70 hover:text-white z-10 transition-colors"
          onClick={() => setIsOpen(false)}
        >
          <X size={32} />
        </button>

        <button
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white z-10 p-2 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
          }}
        >
          <ChevronLeft size={40} />
        </button>

        <button
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white z-10 p-2 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            setCurrentIndex((prev) => (prev + 1) % images.length);
          }}
        >
          <ChevronRight size={40} />
        </button>

        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="relative w-[90vw] h-[80vh] max-w-6xl"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            fill
            className="object-contain"
            sizes="90vw"
            priority
          />
        </motion.div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4">
          <p className="text-white/60 text-sm">{images[currentIndex].alt}</p>
          <span className="text-white/40 text-xs">{currentIndex + 1} / {images.length}</span>
        </div>

        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(idx);
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === currentIndex ? "bg-primary w-6" : "bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function FilterBar({ activeFilter, onFilterChange }: { activeFilter: string; onFilterChange: (f: string) => void }) {
  const filters = [
    { id: "all", label: "All Properties" },
    ...galleryData.map((p) => ({ id: p.id, label: p.property })),
  ];

  return (
    <div className="flex flex-wrap justify-center gap-3 mb-16">
      {filters.map((filter) => (
        <motion.button
          key={filter.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onFilterChange(filter.id)}
          className={`px-5 py-2.5 text-xs font-bold tracking-[0.15em] uppercase transition-all ${
            activeFilter === filter.id
              ? "bg-primary text-white"
              : "bg-white text-gray-600 border border-gray-200 hover:border-primary hover:text-primary"
          }`}
        >
          {filter.label}
        </motion.button>
      ))}
    </div>
  );
}

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredData = activeFilter === "all"
    ? galleryData
    : galleryData.filter((p) => p.id === activeFilter);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/lohagarhfortresort/cover_drone_view.jpg"
          alt="Gallery hero"
          fill
          className="object-cover"
          priority
          loading="eager"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <span className="block text-sm tracking-[0.3em] uppercase mb-4 text-primary font-bold">A Visual Journey</span>
            <h1 className="text-5xl md:text-8xl font-serif">Gallery</h1>
            <p className="mt-4 text-white/70 text-lg max-w-xl mx-auto">
              Explore the grandeur of our heritage properties through stunning imagery
            </p>
          </motion.div>
        </div>
      </div>

      <section className="py-20 container mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {filteredData.map((property, index) => (
              <PropertySection key={property.id} property={property} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      <Lightbox />
    </div>
  );
}
