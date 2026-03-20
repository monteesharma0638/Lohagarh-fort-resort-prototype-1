"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatePresence } from "framer-motion";
import MotionDiv from "./MotionDiv";

type SubMenuItem = {
  label: string;
  href: string;
};

type SubMenuCategory = {
  category: string;
  items: SubMenuItem[];
};

type NavItem = {
  label: string;
  href: string;
  submenu?: SubMenuCategory[];
};

const navItems: NavItem[] = [
  {
    label: "About",
    href: "/about",
    submenu: [
      {
        category: "",
        items: [
          { label: "About Lohagarh", href: "/about" },
          // { label: "Letter from Chairman", href: "/about/chairman-letter" },
          { label: "Management", href: "/about/management" },
          { label: "Our Mission", href: "/about/mission" },
          { label: "Code of Conduct", href: "/about/code-of-conduct" },
          { label: "Code of Ethics", href: "/about/code-of-ethics" },
          { label: "Testimonials", href: "/about/testimonials" },
          { label: "Definition of LOGO", href: "/about/logo-definition" },
        ],
      },
    ],
  },
  {
    label: "Our Hotels",
    href: "/hotels",
    submenu: [
      {
        category: "Jaipur",
        items: [
          { label: "Lohagarh Fort Resort", href: "/hotels/lohagarh-fort-resort" },
          { label: "Kothi Lohagarh", href: "/hotels/kothi-lohagarh" },
        ],
      },
      {
        category: "Jaisalmer",
        items: [
          { label: "Lohagarh Desert Resort", href: "/hotels/lohagarh-desert-resort" },
        ],
      },
      {
        category: "Bharatpur",
        items: [
          { label: "Townhall Restaurant & Events", href: "/hotels/townhall" },
          { label: "Mahalkhas", href: "/hotels/mahalkhas" },
        ],
      },
      {
        category: "Nainital",
        items: [
          { label: "Lohagarh Corbett Resort", href: "/hotels/corbett-resort" },
        ],
      },
      {
        category: "Special Packages",
        items: [
          { label: "Wedding", href: "/experiences/regal-weddings" },
          { label: "Events", href: "/experiences/regal-experience/#events" },
          { label: "Palace on Wheels", href: "/special-packages/palace-on-wheels" },
        ],
      },
    ],
  },
  {
    label: "Experiences",
    href: "/experiences",
    submenu: [
      {
        category: "",
        items: [
          { label: "Regal Experience", href: "/experiences/regal-experience" },
          { label: "Regal Weddings", href: "/experiences/regal-weddings" },
          { label: "Spa and Salon", href: "/experiences/spa-and-salon" },
        ],
      },
    ],
  },
  {
    label: "Awards",
    href: "/awards",
  },
  {
    label: "Gallery",
    href: "/gallery",
    submenu: [
      {
        category: "Properties",
        items: [
          { label: "Lohagarh Fort Resort", href: "/gallery?property=lohagarh-fort-resort" },
          { label: "Kothi Lohagarh", href: "/gallery?property=kothi-lohagarh" },
          { label: "Lohagarh Desert Resort", href: "/gallery?property=lohagarh-desert-resort" },
          { label: "Townhall Restaurant & Events", href: "/gallery?property=townhall" },
          { label: "Mahalkhas", href: "/gallery?property=mahalkhas" },
          { label: "Lohagarh Corbett Resort", href: "/gallery?property=corbett-resort" },
        ],
      },
    ],
  },
  {
    label: "Contact Us",
    href: "/contact",
    submenu: [
      {
        category: "",
        items: [
          { label: "Marketing & Sales", href: "/contact/marketing-and-sales" },
          { label: "Feedback", href: "/contact/feedback" },
          // { label: "Career", href: "/contact?dept=career" },
        ],
      },
    ],
  },
];

export default function Navbar({noTopHeader}: {noTopHeader?: boolean}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<NavItem | null>(null);
  const [expandedMobileItems, setExpandedMobileItems] = useState<string[]>([]);
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isMobileMenuOpen) return;
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveSubmenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  const toggleMobileSubmenu = (label: string) => {
    setExpandedMobileItems((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  const isOurHotels = activeSubmenu?.label === "Our Hotels";

  const navTextClass = (active: boolean) =>
    cn(
      "text-[0.7rem] font-bold tracking-[0.2em] uppercase transition-all flex items-center gap-1",
      isScrolled || activeSubmenu
        ? active
          ? "text-primary"
          : "text-gray-700 hover:text-primary"
        : active
          ? "text-white"
          : "text-white/80 hover:text-white"
    );

  const headerClasses =  cn(
    `${noTopHeader? "top-0": "top-9"} ${noTopHeader? "hidden md:block": ""} fixed left-0 right-0 z-50 transition-all duration-500`,
    isScrolled || activeSubmenu
      ? "bg-white/97 backdrop-blur-md py-4 border-b border-primary/15 shadow-lg"
      : "bg-gradient-to-b from-black/60 to-transparent py-8"
  );

  return (
    <>
    <header
      ref={navRef}
      className={headerClasses}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link
          href="/"
          onClick={() => setActiveSubmenu(null)}
          className="flex flex-col items-center group"
        >
          <span className={cn(
            "font-serif text-2xl md:text-3xl tracking-[0.3em] font-bold transition-all",
            isScrolled || activeSubmenu ? "text-primary" : "text-white"
          )}>
            LOHAGARH
          </span>
          <span className={cn(
            "text-[0.5rem] tracking-[0.6em] uppercase font-bold mt-1 transition-all",
            isScrolled || activeSubmenu ? "text-primary/70" : "text-white/80"
          )}>
            ROYAL HERITAGE
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative group py-2"
              onMouseEnter={() => item.submenu ? setActiveSubmenu(item) : setActiveSubmenu(null)}
            >
              {item.submenu ? (
                <a
                  className={cn(
                    navTextClass(pathname.startsWith(item.href)),
                    "cursor-pointer"
                  )}
                >
                  {item.label}
                  <ChevronDown
                    size={12}
                    className={cn(
                      "transition-transform duration-300",
                      activeSubmenu?.label === item.label && "rotate-180"
                    )}
                  />
                </a>
              ) : (
                <Link
                  href={item.href}
                  onClick={() => setActiveSubmenu(null)}
                  className={navTextClass(pathname.startsWith(item.href))}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        <div className={`hidden ${!noTopHeader ? "lg:flex invisible": ""} items-center gap-6`}>
          <Link
            href="/reservations"
            className={cn(
              "px-6 py-2.5 text-[0.65rem] tracking-[0.2em] uppercase font-bold transition-all",
              isScrolled || activeSubmenu
                ? "bg-primary text-white hover:bg-primary/90"
                : "border border-white/60 text-white hover:bg-white hover:text-gray-900"
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
          <Menu size={24} />
        </button>
      </div>


      <AnimatePresence>
        {activeSubmenu && activeSubmenu.submenu && (
          <MotionDiv
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onMouseLeave={() => setActiveSubmenu(null)}
            className="absolute left-0 top-full w-full bg-white shadow-2xl border-t-2 border-primary"
          >
            <div
              className={cn(
                "max-w-7xl mx-auto p-10",
                isOurHotels ? "grid grid-cols-3 gap-10" : "grid grid-cols-2 gap-10"
              )}
            >
              <div
                className="h-[380px] rounded-lg bg-cover bg-center overflow-hidden"
                style={{
                  backgroundImage:
                    "url('/images/lohagarhfortresort/coridoor.jpg')",
                }}
              >
                <div className="h-full w-full bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end p-6">
                  <h2 className="text-white text-2xl font-serif font-semibold">
                    {activeSubmenu.label === "About" && "Discover Our Legacy"}
                    {activeSubmenu.label === "Our Hotels" && "Luxury Across Rajasthan"}
                    {activeSubmenu.label === "Experiences" && "Unforgettable Moments"}
                    {activeSubmenu.label === "Gallery" && "Visual Stories"}
                    {activeSubmenu.label === "Contact Us" && "Get in Touch"}
                  </h2>
                </div>
              </div>

              <div
                className={cn(
                  "grid gap-8",
                  isOurHotels ? "grid-cols-3 col-span-2" : "grid-cols-2"
                )}
              >
                {activeSubmenu.submenu.map((group, index) => (
                  <div key={group.category || `group-${index}`}>
                    {group.category && (
                      <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-primary mb-4">
                        {group.category}
                      </h3>
                    )}
                    <ul className="space-y-3">
                      {group.items.map((sub) => (
                        <li key={sub.label}>
                          <Link
                            href={sub.href}
                            onClick={() => setActiveSubmenu(null)}
                          >
                            <span className="text-md text-gray-600 hover:text-primary transition-colors flex items-center gap-1 group/link">
                              <ChevronRight
                                size={12}
                                className="opacity-0 -ml-4 group-hover/link:opacity-100 group-hover/link:ml-0 transition-all duration-200 text-primary"
                              />
                              {sub.label}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>
    </header>
    
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MotionDiv
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="fixed inset-0 bg-[#1E0800] z-[70] p-8 flex flex-col overflow-y-auto"
          >
            <button
              className="self-end text-primary mb-12"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X size={32} />
            </button>
            <div className="flex flex-col gap-6">
              {navItems.map((item) => (
                <div key={item.label} className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="text-3xl font-serif text-white">
                        {item.label}
                      </span>
                    </Link>
                    {item.submenu && (
                      <button
                        onClick={() => toggleMobileSubmenu(item.label)}
                        className="text-primary p-1"
                      >
                        <ChevronDown
                          size={20}
                          className={cn(
                            "transition-transform duration-300",
                            expandedMobileItems.includes(item.label) &&
                              "rotate-180"
                          )}
                        />
                      </button>
                    )}
                  </div>
                  {item.submenu && expandedMobileItems.includes(item.label) && (
                    <div className="flex flex-col gap-4 pl-4 border-l border-primary/20">
                      {item.submenu.map((group) => (
                        <div key={group.category || "default"}>
                          {group.category && (
                            <p className="text-xs tracking-[0.15em] uppercase text-primary/40 mb-2">
                              {group.category}
                            </p>
                          )}
                          <div className="flex flex-col gap-3">
                            {group.items.map((sub) => (
                              <Link
                                key={sub.label}
                                href={sub.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                <span className="text-sm tracking-[0.1em] uppercase text-white/60 hover:text-primary transition-colors">
                                  {sub.label}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>
    </>
  );
}
