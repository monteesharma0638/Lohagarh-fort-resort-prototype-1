"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const navItems = getNavItems(hotelId, hasWedding);

  const isActive = (href: string) => {
    if (href === `/hotels/${hotelId}`) return pathname === `/hotels/${hotelId}`;
    return pathname.startsWith(href);
  };

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-[55] bg-primary text-white w-12 h-12 flex items-center justify-center shadow-lg"
        aria-label="Open hotel menu"
      >
        <Menu size={22} />
      </button>

      <aside className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-28">
          <div className="bg-white border border-border shadow-sm">
            <div className="p-5 border-b border-border">
              <Link
                href="/hotels"
                className="flex items-center gap-1.5 text-[0.6rem] tracking-[0.15em] uppercase font-bold text-foreground/40 hover:text-primary transition-colors mb-3"
              >
                <ChevronLeft size={12} />
                All Hotels
              </Link>
              <h3 className="font-serif text-lg text-foreground leading-snug">{hotelName}</h3>
            </div>

            <nav className="py-2">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between px-5 py-2.5 text-[0.7rem] tracking-[0.08em] uppercase transition-all group",
                    isActive(item.href)
                      ? "text-primary font-bold bg-primary/5 border-r-2 border-primary"
                      : "text-foreground/60 hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  {item.label}
                  <ChevronRight
                    size={12}
                    className={cn(
                      "transition-all",
                      isActive(item.href)
                        ? "text-primary opacity-100"
                        : "opacity-0 group-hover:opacity-50"
                    )}
                  />
                </Link>
              ))}
            </nav>

            <div className="p-4 border-t border-border">
              <Link
                href="/reservations"
                className="block w-full text-center bg-primary text-white py-3 text-[0.65rem] tracking-[0.15em] uppercase font-bold hover:bg-primary/90 transition-colors"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </aside>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <MotionDiv
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[60] lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <MotionDiv
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 left-0 bottom-0 w-72 bg-white z-[65] shadow-2xl lg:hidden flex flex-col"
            >
              <div className="p-5 border-b border-border flex items-center justify-between">
                <div>
                  <Link
                    href="/hotels"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-1.5 text-[0.6rem] tracking-[0.15em] uppercase font-bold text-foreground/40 hover:text-primary transition-colors mb-2"
                  >
                    <ChevronLeft size={12} />
                    All Hotels
                  </Link>
                  <h3 className="font-serif text-lg text-foreground leading-snug">{hotelName}</h3>
                </div>
                <button onClick={() => setMobileOpen(false)} className="text-foreground/40 hover:text-foreground">
                  <X size={22} />
                </button>
              </div>

              <nav className="py-2 flex-1 overflow-y-auto">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center justify-between px-5 py-3 text-[0.7rem] tracking-[0.08em] uppercase transition-all",
                      isActive(item.href)
                        ? "text-primary font-bold bg-primary/5 border-r-2 border-primary"
                        : "text-foreground/60 hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    {item.label}
                    <ChevronRight
                      size={12}
                      className={cn(isActive(item.href) ? "text-primary" : "opacity-30")}
                    />
                  </Link>
                ))}
              </nav>

              <div className="p-4 border-t border-border">
                <Link
                  href="/reservations"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-center bg-primary text-white py-3 text-[0.65rem] tracking-[0.15em] uppercase font-bold"
                >
                  Book Now
                </Link>
              </div>
            </MotionDiv>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
