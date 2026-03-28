"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import itinerary from "@/data/train-iternary.json";

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    setMatches(mq.matches);
    const h = (e: MediaQueryListEvent) => setMatches(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, [query]);
  return matches;
}

const TrackLine = ({ leftEdge }: { leftEdge: boolean }) => (
  <svg
    style={{
      position: "absolute", top: 0, height: "100%", width: 48,
      left: leftEdge ? 20 : "50%",
      transform: leftEdge ? "none" : "translateX(-50%)",
      pointerEvents: "none", zIndex: 1,
    }}
    preserveAspectRatio="none"
    viewBox="0 0 48 1000"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line x1="14" y1="0" x2="14" y2="1000" stroke="#2a1f10" strokeWidth="3.5"/>
    <line x1="34" y1="0" x2="34" y2="1000" stroke="#2a1f10" strokeWidth="3.5"/>
    {Array.from({ length: 120 }).map((_, i) => (
      <rect key={i} x="7" y={i * 9} width="34" height="4" rx="1.5" fill="#1e1508" opacity="0.95"/>
    ))}
    <line x1="14" y1="0" x2="14" y2="1000" stroke="#c48b36" strokeWidth="1.2" opacity="0.4"/>
    <line x1="34" y1="0" x2="34" y2="1000" stroke="#c48b36" strokeWidth="1.2" opacity="0.4"/>
  </svg>
);

const FixedTrain = ({ sectionRef, leftEdge }: any) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      {
        root: null,
        rootMargin: "-50% 0px -50% 0px"
      }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [sectionRef]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // ✅ Responsive vertical movement
  const top = useTransform(
    scrollYProgress,
    [0, 1],
    ["12vh", "88vh"] // more natural for tall screens
  );

  const trainWidth = leftEdge ? 60 : 60; // mobile : desktop


  // ✅ Correct alignment with track
  const leftStyle = leftEdge
    ? 15 // mobile (left track)
    : "50%"; // desktop (center track)

  if (!visible) return null;

  return (
    <motion.div
      style={{
        position: "fixed",
        top,
        left: leftStyle,
        x: leftEdge ? 0 : "-50%", // center align on desktop
        zIndex: 50,
        pointerEvents: "none",
      }}
    >
      <motion.div style={{ width: trainWidth }}>
        <Image
          src="/train.png"
          alt="train"
          width={200}
          height={600}
          style={{ width: "100%", height: "auto" }}
          priority
        />
      </motion.div>
    </motion.div>
  );
};

const CardInner = ({ item, imgHeight = "h-44", titleSize = "text-2xl", padding = "p-5" }: { item: typeof itinerary[0]; imgHeight?: string; titleSize?: string; padding?: string }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 90%", "end 20%"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);

  return (
    <div ref={ref} className="rounded-xl overflow-hidden border border-white/[0.07] shadow-2xl shadow-black/70" style={{ background: "#16100a" }}>
      <div className={`${imgHeight} overflow-hidden relative`}>
        <motion.img style={{ y: imgY }} src={item.img} alt={item.city} className="w-full h-[120%] object-cover"/>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#16100a]"/>
        <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[9px] uppercase tracking-[0.2em] font-bold backdrop-blur-sm border"
          style={{ color: item.color, borderColor: item.color+"50", background: item.color+"18", fontFamily:"sans-serif" }}>
          {item.day}
        </div>
        <div className="absolute top-3 right-3 text-xl">{item.icon}</div>
      </div>
      <div className={padding}>
        <h3 className={`${titleSize} font-serif mb-2 tracking-tight`} style={{ color: item.color }}>{item.city}</h3>
        <p className="text-white/55 text-sm leading-relaxed" style={{ fontFamily:"sans-serif" }}>{item.desc}</p>
        <motion.div
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.55 }}
          className="mt-4 h-[1px] origin-left"
          style={{ background: `linear-gradient(to right, ${item.color}60, transparent)` }}
        />
      </div>
    </div>
  );
};

const StationDot = ({ isLeft, mobile }: { isLeft?: boolean; mobile?: boolean }) => {
  if (mobile) return (
    <>
      <motion.div initial={{ scale:0 }} whileInView={{ scale:1 }} transition={{ delay:0.12, type:"spring" }}
        className="absolute left-[26px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-amber-400 bg-[#0f0b06] z-20"/>
      <div className="absolute left-[38px] top-1/2 -translate-y-1/2 h-[1px] w-8"
        style={{ background:"linear-gradient(to right,#f59e0b50,transparent)" }}/>
    </>
  );
  return (
    <>
      <motion.div initial={{ scale:0 }} whileInView={{ scale:1 }} transition={{ delay:0.18, type:"spring" }}
        className={`absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border-2 border-amber-400 bg-[#0f0b06] z-20 ${isLeft ? "right-[calc(53%-52px)]" : "left-[calc(53%-52px)]"}`}/>
      <div className={`absolute top-1/2 -translate-y-1/2 h-[1px] w-12 ${isLeft ? "right-[calc(53%-40px)] bg-gradient-to-r from-transparent to-amber-500/50" : "left-[calc(53%-40px)] bg-gradient-to-r from-amber-500/50 to-transparent"}`}/>
    </>
  );
};

const MobileCard = ({ item }: { item: typeof itinerary[0] }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target:ref, offset:["start 88%","start 28%"] });
  const opacity = useTransform(scrollYProgress, [0,.4,.85,1], [0,1,1,.75]);
  const y       = useTransform(scrollYProgress, [0,.5], [20,0]);
  return (
    <motion.div ref={ref} style={{ opacity, y }} className="relative flex items-center min-h-[30vh] py-10 pl-16 pr-4">
      <StationDot mobile={true}/>
      <div className="w-full"><CardInner item={item} imgHeight="h-40" titleSize="text-xl" padding="p-4"/></div>
    </motion.div>
  );
};

const TabletCard = ({ item }: { item: typeof itinerary[0] }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target:ref, offset:["start 88%","start 25%"] });
  const opacity = useTransform(scrollYProgress, [0,.4,.85,1], [0,1,1,.75]);
  const y       = useTransform(scrollYProgress, [0,.5], [22,0]);
  return (
    <motion.div ref={ref} style={{ opacity, y }} className="relative flex items-center min-h-[75vh] py-12 pl-20 pr-8">
      <StationDot mobile={true}/>
      <div className="w-full max-w-md"><CardInner item={item} imgHeight="h-48" titleSize="text-2xl" padding="p-5"/></div>
    </motion.div>
  );
};

const DesktopCard = ({ item }: { item: typeof itinerary[0] }) => {
  const ref = useRef(null);
  const isLeft = item.side === "left";
  const { scrollYProgress } = useScroll({ target:ref, offset:["start 85%","start 20%"] });
  const opacity = useTransform(scrollYProgress, [0,.35,.85,1], [0,1,1,.65]);
  const x       = useTransform(scrollYProgress, [0,.4], [isLeft ? -50 : 50, 0]);
  const scale   = useTransform(scrollYProgress, [0,.4], [0.95,1]);
  return (
    <motion.div ref={ref} style={{ opacity, x, scale }}
      className={`relative flex items-center min-h-[85vh] py-16 ${isLeft ? "justify-start pl-10 xl:pl-20 pr-[53%]" : "justify-end pr-10 xl:pr-20 pl-[53%]"}`}>
      <StationDot isLeft={isLeft}/>
      <div className="w-full" style={{ maxWidth:600 }}>
        <CardInner item={item} imgHeight="h-70" titleSize="text-2xl" padding="p-5"/>
      </div>
    </motion.div>
  );
};

const RouteMap = () => {
  const sectionRef = useRef(null);
  const isMobile   = useMediaQuery("(max-width: 639px)");
  const isTablet   = useMediaQuery("(min-width: 640px) and (max-width: 1023px)");
  const leftEdge   = isMobile || isTablet;

  return (
    <section  style={{ position:"relative", fontFamily:"'Georgia', serif", overflowX:"hidden" }}>

      {/* Train */}
      <div style={{
        position:"relative", inset:0, pointerEvents:"none", opacity:0.025, top: 0,
        backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundRepeat:"repeat", backgroundSize:"120px",
      }}/>
      <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0 }}>
        <div style={{ position:"absolute", top:"30%", left:"50%", transform:"translate(-50%,-50%)", width:400, height:400, background:"rgba(180,120,40,0.07)", borderRadius:"50%", filter:"blur(100px)" }}/>
      </div>

      {/* ── HEADER ── */}
      <div className="relative z-10 text-center pt-14 sm:pt-20 lg:pt-24 pb-6 sm:pb-10 px-4">
        <motion.p initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
          className="text-amber-500 uppercase tracking-[0.4em] text-[10px] sm:text-xs mb-3" style={{ fontFamily:"sans-serif" }}>
          The Palace on Wheels
        </motion.p>
        <motion.h1 initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.15 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-primary font-serif mb-4 leading-tight"
          style={{ textShadow:"0 0 80px #c48b3628" }}>
          Royal Journey
        </motion.h1>
        <motion.div initial={{ scaleX:0 }} animate={{ scaleX:1 }} transition={{ delay:0.4, duration:0.8 }}
          className="w-24 sm:w-32 h-[1px] bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-4"/>
        <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.5 }}
          className="text-black text-xs sm:text-sm max-w-[220px] sm:max-w-xs mx-auto leading-relaxed" style={{ fontFamily:"sans-serif" }}>
          Scroll to travel through eight days of Rajasthan magnificence
        </motion.p>
        <motion.div animate={{ y:[0,8,0] }} transition={{ repeat:Infinity, duration:2 }}
          className="mt-6 sm:mt-10 text-amber text-[10px] sm:text-xs tracking-widest uppercase" style={{ fontFamily:"sans-serif" }}>
          ↓ scroll
        </motion.div>
      </div>

      {/* ── JOURNEY ── */}
      <div ref={sectionRef} style={{ position:"relative", zIndex:10 }}>
        <TrackLine leftEdge={leftEdge}/>

        {itinerary.map((item, i) => (
          <div key={i} className="relative">
            <div className="block sm:hidden"><MobileCard item={item}/></div>
            <div className="hidden sm:block lg:hidden"><TabletCard item={item}/></div>
            <div className="hidden lg:block"><DesktopCard item={item}/></div>
          </div>
        ))}
      </div>

      {/* ── FOOTER ── */}
      <div className="relative z-10 text-center pb-16 sm:pb-24 pt-6 px-4">
        <motion.div initial={{ opacity:0, scale:0.9 }} whileInView={{ opacity:1, scale:1 }}
          className="inline-block px-6 sm:px-8 py-3 sm:py-4 rounded-full border border-amber-500/70 bg-amber-500/5 backdrop-blur-sm">
          <p className="text-amber-400 text-xs sm:text-sm tracking-widest uppercase" style={{ fontFamily:"sans-serif" }}>
            🚉 Journey Complete
          </p>
        </motion.div>
      </div>

      {/* ── TRAIN — fixed, clamped to section via IntersectionObserver ── */}
      <FixedTrain sectionRef={sectionRef} leftEdge={leftEdge}/>

    </section>
  );
};

export default RouteMap;