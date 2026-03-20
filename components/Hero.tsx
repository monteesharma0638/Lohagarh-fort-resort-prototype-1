"use client";
import { useMediaQuery } from "@/hooks/useUtils";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface IHero {
  videoUrl?: string;
  imageUrl?: string;
  restrictVideoOnMobile?: boolean;
  children?: React.ReactNode;
}

export default function Hero({videoUrl, imageUrl, children, restrictVideoOnMobile = false}: IHero) {
  const { scrollY } = useScroll();
  const [videoLoaded, setVideoLoaded] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  console.log("🚀 ~ Hero ~ isMobile:", isMobile)

  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Parallax Background */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute inset-0 z-0"
      >
        {!videoLoaded && (
          <Image
            src={imageUrl ?? "/lohagarhfort/room1.jpg"}
            alt="Luxury Palace"
            fill
            priority
            className="object-cover"
          />
        )}
        {
          !(restrictVideoOnMobile && isMobile) &&
          (
            videoUrl ?
            <div className="absolute top-1/2 left-1/2 w-[177.77vh] min-w-full h-full min-h-[56.25vw] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <iframe
              src={videoUrl}
              allow="autoplay; encrypted-media"
              className="w-full h-full"
              style={{ border: 'none' }}
              title="Background Video"
            />
            </div>:
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              onCanPlay={() => setVideoLoaded(true)}
            >
              <source src={"https://res.cloudinary.com/drayl5ppi/video/upload/v1773225725/lohagarh/Mahal_Khas_Website_Video_fzmu7h.mp4"} type="video/webm" />
            </video>
          )
        }
        <div className="absolute inset-0 bg-black/40" />
        {/* <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-background/30" /> */}
      </motion.div>

      {/* Content */}
      {
        children ||
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ opacity }}
          >
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="block text-primary text-xs md:text-sm tracking-[0.5em] uppercase font-bold mb-8 invisible"
            >
              Est. 1924 • Heritage of Excellence
            </motion.span>
            
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-white mb-8 leading-[0.9] flex flex-col items-center">
              <motion.span
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 1 }}
              >
                The Royal
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9, duration: 1 }}
                style={{lineHeight: 1.1}}
                className="italic font-light gold-text-gradient text-center"
              >
                Lohagarh
              </motion.span>
            </h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="mt-10"
            >
              <div className="w-px h-24 bg-gradient-to-b from-primary to-transparent mx-auto mb-8 invisible" />
              <p className="text-white/70 text-sm md:text-base leading-loose tracking-[0.2em] uppercase max-w-xl mx-auto font-medium">
                A Symphony of Indian Hospitality & Grandeur
              </p>
            </motion.div>
          </motion.div>
        </div>
      }

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-primary cursor-pointer"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <ChevronDown size={32} strokeWidth={1} />
      </motion.div>

      {/* Decorative Borders */}
      {/* <div className="absolute inset-8 border border-white/10 pointer-events-none z-20 hidden md:block" /> */}
    </section>
  );
}