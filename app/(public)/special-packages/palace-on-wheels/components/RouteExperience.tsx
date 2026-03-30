"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

const sections = [
  { title: "Jaipur", img: "https://s7ap1.scene7.com/is/image/incredibleindia/hawa-mahal-jaipur-rajasthan-city-1-hero?qlt=82&ts=1742200253577" },
  { title: "Jaisalmer", img: "https://www.thepalaceonwheels.org/storage/jaislamer_fort_night_view_1914%20(1).jpg" },
  { title: "Udaipur", img: "https://s7ap1.scene7.com/is/image/incredibleindia/lake-pichola-udaipur-rajasthan-2-attr-hero?qlt=82&ts=1742161994371" },
  { title: "Jodhpur", img: "https://s7ap1.scene7.com/is/image/incredibleindia/2-mehrangarh-fort-jodhpur-rajasthan-city-hero?qlt=82&ts=1726660925514" },
  { title: "Agra", img: "https://static.toiimg.com/thumb/msid-105717782,width-748,height-499,resizemode=4,imgsize-107610/.jpg" },
];

// 🎲 transition types
const transitions = ["diagonal", "curtain", "flip"];

export default function RouteExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const panels = panelsRef.current;

    const ctx = gsap.context(() => {
      // assign random transition to each panel (except first)
      const panelTransitions = panels.map((_, i) =>
        i === 0 ? null : transitions[Math.floor(Math.random() * transitions.length)]
      );

      // initial states
      panels.forEach((panel, i) => {
        if (i === 0) return;

        const type = panelTransitions[i];

        if (type === "diagonal") {
          gsap.set(panel, { xPercent: 100, yPercent: -100 });
        }

        if (type === "curtain") {
          gsap.set(panel, { clipPath: "inset(0% 0% 100% 0%)" });
        }

        if (type === "flip") {
          gsap.set(panel, {
            rotateY: 90,
            transformPerspective: 1200,
            transformOrigin: "left center",
          });
        }
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${panels.length * 120}%`,
          scrub: true,
          pin: true,
        },
      });

      panels.forEach((panel, i) => {
        if (i === 0) return;

        const prev = panels[i - 1];
        const type = panelTransitions[i];

        // 🔹 DIAGONAL
        if (type === "diagonal") {
          tl.to(panel, {
            xPercent: 0,
            yPercent: 0,
            ease: "power3.inOut",
          });

          tl.to(prev, {
            scale: 0.9,
            opacity: 0.6,
          }, "<");
        }

        // 🔹 CURTAIN
        if (type === "curtain") {
          tl.to(panel, {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "power2.inOut",
          });

          tl.to(prev, {
            filter: "blur(8px)",
            opacity: 0.5,
          }, "<");
        }

        // 🔹 3D FLIP
        if (type === "flip") {
          tl.to(panel, {
            rotateY: 0,
            ease: "power2.inOut",
          });

          tl.to(prev, {
            rotateY: -30,
            opacity: 0.4,
          }, "<");
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen overflow-hidden bg-background"
      style={{ perspective: "1200px" }}
    >
      {sections.map((sec, i) => (
        <div
          key={i}
          ref={(el) => (panelsRef.current[i] = el!)}
          className="absolute inset-0"
        >
          <Image
            src={sec.img}
            alt={sec.title}
            fill
            priority={i === 0}
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/40" />

          <div className="relative z-10 h-full flex items-center justify-center">
            <h2 className="text-5xl md:text-7xl font-serif text-white tracking-wide">
              {sec.title}
            </h2>
          </div>
        </div>
      ))}
    </section>
  );
}