"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function UdaipurSection() {
  const ref = useRef(null);
  const img = useRef(null);
  const content = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "+=200%",
          scrub: true,
          pin: true,
        },
      });

      // Water reveal (clip-path)
      tl.fromTo(
        img.current,
        { clipPath: "inset(100% 0% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", ease: "power2.out" }
      );

      // Gentle floating motion
      tl.to(img.current, { y: "-6%", ease: "none" }, 0);

      // Soft fade content
      tl.from(content.current, { opacity: 0, y: 40 }, 0.4);
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="h-screen relative overflow-hidden">
      <div ref={img} className="absolute inset-0">
        <Image src="https://s7ap1.scene7.com/is/image/incredibleindia/lake-pichola-udaipur-rajasthan-2-attr-hero?qlt=82&ts=1742161994371" alt="" fill className="object-cover" />
      </div>

      <div ref={content} className="relative z-10 h-full flex items-center justify-center text-center">
        <h2 className="text-5xl font-serif">Udaipur</h2>
      </div>
    </section>
  );
}