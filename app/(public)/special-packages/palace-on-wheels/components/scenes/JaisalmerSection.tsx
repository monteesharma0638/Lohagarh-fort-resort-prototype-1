"use client";

import gsap from "gsap";
import Image from "next/image";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

export default function JaisalmerSection() {
  const ref = useRef(null);
  const img = useRef(null);
  const content = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: "top top",
        end: "+=200%",
        scrub: true,
        pin: true,
      },
    });

    // Heat zoom burst
    tl.fromTo(img.current, { scale: 1.6 }, { scale: 1 });

    // Slight rotation (wind effect)
    tl.to(img.current, { rotate: 1.5, ease: "none" }, 0);

    // Content reveal
    tl.from(content.current, { opacity: 0, y: 100 }, 0.3);

  }, []);

  return (
    <section ref={ref} className="h-screen relative overflow-hidden">
      <div ref={img} className="absolute inset-0">
        <Image src="https://www.thepalaceonwheels.org/storage/jaislamer_fort_night_view_1914%20(1).jpg" alt="" fill className="object-cover" />
      </div>

      <div ref={content} className="relative z-10 h-full flex items-center justify-center">
        <h2 className="text-5xl font-serif">Jaisalmer</h2>
      </div>
    </section>
  );
}