"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function JaipurSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=200%", // scroll distance
          scrub: true,
          pin: true,
        },
      });

      // Step 1: Zoom into fort
      tl.to(imageRef.current, {
        scale: 1.4,
        ease: "none",
      });

      // Step 2: Fade content
      tl.fromTo(
        contentRef.current,
        { opacity: 0, y: 80 },
        { opacity: 1, y: 0, ease: "power2.out" },
        0.3
      );

      // Step 3: subtle parallax
      tl.to(
        imageRef.current,
        {
          y: "-5%",
          ease: "none",
        },
        0
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden">

      {/* Background */}
      <div ref={imageRef} className="absolute inset-0">
        <Image
          src="https://s7ap1.scene7.com/is/image/incredibleindia/hawa-mahal-jaipur-rajasthan-city-1-hero?qlt=82&ts=1742200253577"
          alt="Amer Fort Jaipur"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4"
      >
        <p className="text-primary tracking-widest text-xs uppercase">
          Day 2
        </p>

        <h2 className="text-4xl md:text-6xl font-serif mt-3">
          Jaipur
        </h2>

        <p className="mt-4 max-w-xl text-muted-foreground">
          Step into the majestic Amer Fort and experience royal courtyards,
          intricate carvings, and timeless Rajput architecture.
        </p>
      </div>

    </section>
  );
}