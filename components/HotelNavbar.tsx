"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatePresence } from "framer-motion";
import MotionDiv from "./MotionDiv";

interface HotelNavbarProps {
  hotelId: string;
  hotelName: string;
  hasWedding?: boolean;
}

const getNavItems = (hotelId: string, hasWedding: boolean) => [
  { label: "Overview", href: `/hotels/${hotelId}` },
  { label: "Dining", href: `/hotels/${hotelId}/dining` },
  { label: "Spa & Salon", href: `/hotels/${hotelId}/spa-salon` },
  { label: "Gallery", href: `/hotels/${hotelId}/gallery` },
  { label: "Contact Us", href: `/hotels/${hotelId}/contact` },
  { label: "Guest Reviews", href: `/hotels/${hotelId}/guest-reviews` },
  { label: "Offers", href: `/hotels/${hotelId}/offers` },
  ...(hasWedding
    ? [
        { label: "Wedding Venues", href: `/hotels/${hotelId}/wedding-venues` },
        { label: "Royal Wedding", href: `/hotels/${hotelId}/royal-wedding` },
      ]
    : []),
  { label: "Explore", href: `/hotels/${hotelId}/explore` },
  { label: "Classification", href: `/hotels/${hotelId}/hotel-classification` },
  { label: "Fact Sheet", href: `/hotels/${hotelId}/hotel-fact-sheet` },
];

export default function HotelNavbar({ hotelId, hotelName, hasWedding = true }: HotelNavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const scrollRef = useRef<HTMLDivElement>(null);

  const navItems = getNavItems(hotelId, hasWedding);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === `/hotels/${hotelId}`) {
      return pathname === `/hotels/${hotelId}`;
    }
    return pathname.startsWith(href);
  };

  return (
    <header
      className={cn(
        "fixed top-9 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-white/97 backdrop-blur-md py-2 border-b border-primary/15 shadow-lg"
          : "bg-gradient-to-b from-black/70 to-transparent py-4"
      )}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-1">
          <Link
            href="/"
            className="flex items-center gap-3 group"
          >
            <span className={cn(
              "font-serif text-xl md:text-2xl tracking-[0.3em] font-bold transition-all",
              isScrolled ? "text-primary" : "text-white"
            )}>
              LOHAGARH
            </span>
            <span className={cn(
              "hidden md:inline-block text-[0.5rem] tracking-[0.3em] uppercase font-bold transition-all",
              isScrolled ? "text-primary/60" : "text-white/60"
            )}>
              Royal Heritage
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/hotels"
              className={cn(
                "flex items-center gap-1 text-[0.65rem] tracking-[0.15em] uppercase font-bold transition-all",
                isScrolled ? "text-gray-500 hover:text-primary" : "text-white/60 hover:text-white"
              )}
            >
              <ChevronLeft size={14} />
              All Hotels
            </Link>
            <Link
              href="/reservations"
              className={cn(
                "px-5 py-2 text-[0.6rem] tracking-[0.15em] uppercase font-bold transition-all",
                isScrolled
                  ? "bg-primary text-white hover:bg-primary/90"
                  : "border border-white/50 text-white hover:bg-white hover:text-gray-900"
              )}
            >
              Book Now
            </Link>
          </div>

          <button
            className={cn(
              "lg:hidden p-2 border transition-colors",
              isScrolled ? "text-primary border-primary/20" : "text-white border-white/30"
            )}
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={22} />
          </button>
        </div>

        <div className="hidden lg:block">
          <div
            ref={scrollRef}
            className="flex items-center gap-1 overflow-x-auto scrollbar-hide pb-1 -mx-1 px-1"
          >
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "whitespace-nowrap px-3 py-2 text-[0.6rem] tracking-[0.12em] uppercase font-bold transition-all relative",
                  isActive(item.href)
                    ? isScrolled
                      ? "text-primary"
                      : "text-white"
                    : isScrolled
                      ? "text-gray-500 hover:text-primary"
                      : "text-white/60 hover:text-white"
                )}
              >
                {item.label}
                {isActive(item.href) && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-primary" />
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <MotionDiv
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="fixed inset-0 bg-[#1E0800] z-[70] p-8 flex flex-col overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-10">
              <Link
                href="/hotels"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 text-white/60 text-sm"
              >
                <ChevronLeft size={16} />
                All Hotels
              </Link>
              <button
                className="text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X size={28} />
              </button>
            </div>

            <h2 className="text-2xl font-serif text-white mb-8">{hotelName}</h2>

            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "py-3 px-4 text-sm tracking-[0.1em] uppercase transition-colors",
                    isActive(item.href)
                      ? "text-primary bg-primary/10 font-bold"
                      : "text-white/60 hover:text-white"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="mt-auto pt-8">
              <Link
                href="/reservations"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-center bg-primary text-white py-4 text-xs tracking-widest uppercase font-bold"
              >
                Book Now
              </Link>
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>
    </header>
  );
}
