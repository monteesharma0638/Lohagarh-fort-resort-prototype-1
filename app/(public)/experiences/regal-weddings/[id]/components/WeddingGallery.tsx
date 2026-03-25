"use client";

import React, { useState, useRef } from 'react';
import { X, Maximize2, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const WeddingGallery = ({ wedding }: { wedding: any }) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const touchStart = useRef<number | null>(null);
  const touchEnd = useRef<number | null>(null);

  const images = wedding.img;

  // Threshold for a swipe to register (in pixels)
  const minSwipeDistance = 50;

  const nextImage = (e?: React.MouseEvent | React.TouchEvent) => {
    e?.stopPropagation();
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length);
    }
  };

  const prevImage = (e?: React.MouseEvent | React.TouchEvent) => {
    e?.stopPropagation();
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + images.length) % images.length);
    }
  };

  // Touch handlers for mobile swiping
  const onTouchStart = (e: React.TouchEvent) => {
    touchEnd.current = null;
    touchStart.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEnd.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return;
    const distance = touchStart.current - touchEnd.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) nextImage();
    if (isRightSwipe) prevImage();
  };

  return (
    <section className="bg-background">
      {/* Full-Width Wedding Cover */}
      <div className="relative h-[70vh] w-full overflow-hidden border-b border-gold/20">
        <Image 
          src={wedding.coverImage} 
          alt={`${wedding.title}-Cover`} 
          fill
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Clean Image Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {images.map((img: any, index: number) => (
            <div 
              key={index}
              className="group relative cursor-zoom-in overflow-hidden border border-border bg-muted"
              onClick={() => setSelectedImage(index)}
            >
              <img 
                src={img} 
                alt={`Gallery image ${index + 1}`}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 border-0 group-hover:border-[12px] border-gold/10 transition-all duration-500 pointer-events-none" />
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-white/90 p-2 rounded-full shadow-lg">
                  <Maximize2 size={18} className="text-bhagwa" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Immersive Zoom View */}
      {selectedImage !== null && (
        <div 
          className="fixed inset-0 z-[100] bg-maroon/95 backdrop-blur-xl flex items-center justify-center p-4 transition-all touch-none"
          onClick={() => setSelectedImage(null)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Close Button - Larger and more accessible on mobile */}
          <button className="absolute top-6 right-6 text-white/70 hover:text-gold transition-colors z-[110]">
            <X size={32} />
          </button>

          {/* Desktop Navigation Arrows */}
          <button 
            onClick={prevImage}
            className="absolute left-6 text-white/30 hover:text-white transition-colors hidden md:block"
          >
            <ChevronLeft size={48} />
          </button>

          <div className="relative max-w-6xl max-h-[85vh] select-none">
            <img 
              src={images[selectedImage]} 
              className="max-w-full max-h-[85vh] object-contain shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10"
              alt="Zoomed view"
              draggable="false"
            />
            {/* Mobile Swipe Hint (Optional) */}
            <p className="text-white/20 text-[10px] uppercase tracking-widest mt-4 text-center md:hidden">
              Swipe left or right
            </p>
          </div>

          <button 
            onClick={nextImage}
            className="absolute right-6 text-white/30 hover:text-white transition-colors hidden md:block"
          >
            <ChevronRight size={48} />
          </button>
        </div>
      )}
    </section>
  );
};

export default WeddingGallery;