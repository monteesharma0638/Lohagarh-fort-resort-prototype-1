"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function AgraSection() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=200%",
          scrub: true,
          pin: true,
        },
      });

      tl.to(imageRef.current, { scale: 1.25, ease: "none" });

      tl.fromTo(
        contentRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0 },
        0.3
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden">
      <div ref={imageRef} className="absolute inset-0">
        <Image src="/agra/taj-mahal.jpg" alt="Agra" fill className="object-cover" />
      </div>

      <div className="absolute inset-0 bg-black/30" />

      <div ref={contentRef} className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
        <p className="text-primary text-xs tracking-widest uppercase">Final Day</p>
        <h2 className="text-5xl font-serif mt-3">Agra</h2>
        <p className="mt-4 max-w-xl text-muted-foreground">
          Witness the timeless beauty of the Taj Mahal — the grand finale of your
          royal journey.
        </p>
      </div>
    </section>
  );
}