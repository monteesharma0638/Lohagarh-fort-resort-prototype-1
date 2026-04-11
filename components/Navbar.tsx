"use client";

import Link from "next/link";
import { usePathname, useSelectedLayoutSegments } from "next/navigation";
import { useState, useEffect, useRef, useMemo } from "react";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatePresence } from "framer-motion";
import MotionDiv from "./MotionDiv";
import Image from "next/image";
import PalaceOnWheelsContact from "./PalaceOnWheelsContact";

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
          {
            label: "Lohagarh Fort Resort",
            href: "/hotels/lohagarh-fort-resort",
          },
          { label: "Kothi Lohagarh", href: "/hotels/kothi-lohagarh" },
        ],
      },
      {
        category: "Jaisalmer",
        items: [
          {
            label: "Lohagarh Desert Resort",
            href: "/hotels/lohagarh-desert-resort",
          },
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
          {
            label: "Palace on Wheels",
            href: "/special-packages/palace-on-wheels",
          },
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
          { label: "All Properties", href: "/gallery?property=all" },
          {
            label: "Lohagarh Fort Resort",
            href: "/gallery?property=lohagarh-fort-resort",
          },
          { label: "Kothi Lohagarh", href: "/gallery?property=kothi-lohagarh" },
          {
            label: "Lohagarh Desert Resort",
            href: "/gallery?property=lohagarh-desert-resort",
          },
          {
            label: "Townhall Restaurant & Events",
            href: "/gallery?property=townhall",
          },
          { label: "Mahalkhas", href: "/gallery?property=mahalkhas" },
          {
            label: "Lohagarh Corbett Resort",
            href: "/gallery?property=corbett-resort",
          },
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

export default function Navbar({ noTopHeader }: { noTopHeader?: boolean }) {
  const segments = useSelectedLayoutSegments();

  if (segments?.length >= 2 && segments?.[0] === "hotels") {
    noTopHeader = true;
  }
  let powLogo = false;
  if (segments?.[1] === "palace-on-wheels") {
    powLogo = true;
  }

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<NavItem | null>(null);
  const [expandedMobileItems, setExpandedMobileItems] = useState<string[]>([]);
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

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
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label],
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
          : "text-white/80 hover:text-white",
    );

  const headerClasses = cn(
    // 1. Static/Non-transitioned Positioning
    "fixed left-0 right-0 z-50",
    noTopHeader ? "top-0" : "top-9",
    noTopHeader && "hidden md:block",

    // 2. Transitioned Properties (Colors & Padding)
    "transition-[background-color,padding,border,box-shadow] duration-500",
    isScrolled || activeSubmenu
      ? "bg-white py-4 border-b border-primary/15 shadow-lg"
      : "bg-gradient-to-b from-black/60 to-transparent py-8",
  );

  return (
    <>
      <header ref={navRef} className={headerClasses}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link
            href="/"
            onClick={() => setActiveSubmenu(null)}
            className="flex flex-row items-center space-x-5 group"
          >
            {powLogo ? (
              <>
                <Image
                  src="/logo/pow-logo.png"
                  alt="Lohagarh Group Of Companies"
                  width={50}
                  height={50}
                  priority
                />
                <Image
                  src="/logo/icon_lgf.png"
                  alt="Lohagarh Group Of Companies"
                  width={50}
                  height={50}
                  priority
                />
              </>
            ) : (
              <Image
                src="/logo/website-logo.png"
                alt="Lohagarh Group Of Companies"
                width={200}
                height={50}
                priority
              />
            )}
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative group py-2"
                onMouseEnter={() =>
                  item.submenu ? setActiveSubmenu(item) : setActiveSubmenu(null)
                }
              >
                {item.submenu ? (
                  <a
                    className={cn(
                      navTextClass(pathname.startsWith(item.href)),
                      "cursor-pointer",
                    )}
                  >
                    {item.label}
                    <ChevronDown
                      size={12}
                      className={cn(
                        "transition-transform duration-300",
                        activeSubmenu?.label === item.label && "rotate-180",
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

          <div
            className={`hidden ${!noTopHeader ? "lg:flex invisible" : ""} items-center gap-6`}
          >
            <Link
              href="/reservations"
              className={cn(
                "px-6 py-2.5 text-[0.65rem] tracking-[0.2em] uppercase font-bold transition-all",
                isScrolled || activeSubmenu
                  ? "bg-primary text-white hover:bg-primary/90"
                  : "border border-white/60 text-white hover:bg-white hover:text-gray-900",
              )}
            >
              Book Now
            </Link>
          </div>

          <button
            className={cn(
              "lg:hidden p-2 border transition-colors",
              isScrolled
                ? "text-primary border-primary/20"
                : "text-white border-white/30",
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
                  isOurHotels
                    ? "grid grid-cols-3 gap-10"
                    : "grid grid-cols-2 gap-10",
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
                      {activeSubmenu.label === "Our Hotels" &&
                        "Luxury Across Rajasthan"}
                      {activeSubmenu.label === "Experiences" &&
                        "Unforgettable Moments"}
                      {activeSubmenu.label === "Gallery" && "Visual Stories"}
                      {activeSubmenu.label === "Contact Us" && "Get in Touch"}
                    </h2>
                  </div>
                </div>

                <div
                  className={cn(
                    "grid gap-8",
                    isOurHotels ? "grid-cols-3 col-span-2" : "grid-cols-2",
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
            initial={{ x: "100%", opacity: 0 }}
            animate={{
              x: 0,
              opacity: 1,
              transition: {
                x: { duration: 0.65, ease: [0.76, 0, 0.24, 1] },
                opacity: { duration: 0.4, ease: "easeOut" },
              },
            }}
            exit={{
              x: "100%",
              opacity: 0,
              transition: {
                x: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
                opacity: { duration: 0.3, ease: "easeIn" },
              },
            }}
            className="fixed inset-0 z-[70] overflow-y-auto"
            style={{ background: "#1E0800" }}
          >
            {/* Decorative arc background */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 390 844"
                preserveAspectRatio="xMidYMid slice"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="195"
                  cy="-40"
                  r="220"
                  fill="none"
                  stroke="#C9A84C"
                  strokeWidth="0.4"
                  opacity="0.25"
                />
                <circle
                  cx="195"
                  cy="-40"
                  r="270"
                  fill="none"
                  stroke="#C9A84C"
                  strokeWidth="0.3"
                  opacity="0.15"
                />
                <line
                  x1="0"
                  y1="0"
                  x2="195"
                  y2="100"
                  stroke="#C9A84C"
                  strokeWidth="0.3"
                  opacity="0.1"
                />
                <line
                  x1="390"
                  y1="0"
                  x2="195"
                  y2="100"
                  stroke="#C9A84C"
                  strokeWidth="0.3"
                  opacity="0.1"
                />
                <circle
                  cx="50"
                  cy="800"
                  r="160"
                  fill="none"
                  stroke="#C9A84C"
                  strokeWidth="0.3"
                  opacity="0.1"
                />
                <circle
                  cx="340"
                  cy="820"
                  r="130"
                  fill="none"
                  stroke="#C9A84C"
                  strokeWidth="0.3"
                  opacity="0.08"
                />
              </svg>
            </div>

            {/* Header: logo area + close button */}
            <div className="relative z-10 flex items-center justify-between px-7 pt-7">
              <div className="flex flex-col gap-0.5">
                <span
                  style={{
                    fontFamily: "Georgia, serif",
                    color: "#C9A84C",
                    fontSize: "10px",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    opacity: 0.75,
                  }}
                >
                  Est. 1924
                </span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  border: "1px solid rgba(201,168,76,0.35)",
                  background: "rgba(201,168,76,0.06)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <X size={16} color="#C9A84C" />
              </button>
            </div>

            {/* Ornamental top divider */}
            <div className="relative z-10 mx-7 mt-5 flex items-center gap-2.5">
              <div
                style={{
                  flex: 1,
                  height: 1,
                  background:
                    "linear-gradient(to right, rgba(201,168,76,0.6), rgba(201,168,76,0.1))",
                }}
              />
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                style={{ opacity: 0.55 }}
              >
                <path
                  d="M9 1L10.5 6.5H16L11.5 9.5L13 15L9 12L5 15L6.5 9.5L2 6.5H7.5L9 1Z"
                  stroke="#C9A84C"
                  strokeWidth="0.8"
                  fill="rgba(201,168,76,0.12)"
                />
              </svg>
              <div
                style={{
                  flex: 1,
                  height: 1,
                  background:
                    "linear-gradient(to left, rgba(201,168,76,0.6), rgba(201,168,76,0.1))",
                }}
              />
            </div>

            {/* Nav items */}
            <nav className="relative z-10 mt-5 flex flex-col pb-8">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  style={{ borderBottom: "1px solid rgba(201,168,76,0.1)" }}
                >
                  {/* Row */}
                  <div className="flex items-center justify-between px-7 py-4">
                    <div className="flex items-center gap-3.5">
                      {/* Side dash */}
                      <div
                        style={{
                          width: 22,
                          height: 1,
                          background: "rgba(201,168,76,0.5)",
                          flexShrink: 0,
                        }}
                      />
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        style={{
                          fontFamily: "Georgia, serif",
                          color: "#fff",
                          fontSize: 22,
                          letterSpacing: "0.02em",
                        }}
                      >
                        {item.label}
                      </Link>
                    </div>

                    {item.submenu && (
                      <div className="flex items-center gap-2.5">
                        <span
                          style={{
                            fontSize: 9,
                            letterSpacing: "0.18em",
                            textTransform: "uppercase",
                            color: "rgba(201,168,76,0.5)",
                          }}
                        >
                          Explore
                        </span>
                        <button
                          onClick={() => toggleMobileSubmenu(item.label)}
                          style={{
                            width: 24,
                            height: 24,
                            borderRadius: "50%",
                            border: "1px solid rgba(201,168,76,0.3)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "transparent",
                          }}
                        >
                          <ChevronDown
                            size={10}
                            color="#C9A84C"
                            className={cn(
                              "transition-transform duration-300",
                              expandedMobileItems.includes(item.label) &&
                                "rotate-180",
                            )}
                          />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Submenu */}
                  {item.submenu && expandedMobileItems.includes(item.label) && (
                    <div className="pb-4 pl-16 pr-7">
                      <div
                        style={{
                          borderLeft: "1px solid rgba(201,168,76,0.2)",
                          paddingLeft: 16,
                        }}
                      >
                        {item.submenu.map((group) => (
                          <div
                            key={group.category || "default"}
                            className="mb-3 last:mb-0"
                          >
                            {group.category && (
                              <p
                                style={{
                                  fontSize: 9,
                                  letterSpacing: "0.2em",
                                  textTransform: "uppercase",
                                  color: "rgba(201,168,76,0.4)",
                                  marginBottom: 10,
                                }}
                              >
                                {group.category}
                              </p>
                            )}
                            <div className="flex flex-col gap-2.5">
                              {group.items.map((sub) => (
                                <Link
                                  key={sub.label}
                                  href={sub.href}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  style={{
                                    fontSize: 11,
                                    letterSpacing: "0.15em",
                                    textTransform: "uppercase",
                                    color: "rgba(255,255,255,0.55)",
                                    textDecoration: "none",
                                  }}
                                >
                                  {sub.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Middle ornamental divider */}
              <div className="mx-7 mt-7 flex items-center gap-2.5">
                <div
                  style={{
                    flex: 1,
                    height: 1,
                    background:
                      "linear-gradient(to right, rgba(201,168,76,0), rgba(201,168,76,0.35))",
                  }}
                />
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  style={{ opacity: 0.4 }}
                >
                  <circle
                    cx="7"
                    cy="7"
                    r="3"
                    stroke="#C9A84C"
                    strokeWidth="0.8"
                  />
                  <circle
                    cx="7"
                    cy="7"
                    r="6"
                    stroke="#C9A84C"
                    strokeWidth="0.5"
                  />
                </svg>
                <div
                  style={{
                    flex: 1,
                    height: 1,
                    background:
                      "linear-gradient(to left, rgba(201,168,76,0), rgba(201,168,76,0.35))",
                  }}
                />
              </div>

              {/* CTA Button */}
              <div className="mx-7 mt-7">
                <button
                  style={{
                    width: "100%",
                    padding: "15px",
                    border: "1px solid rgba(201,168,76,0.6)",
                    background: "rgba(201,168,76,0.07)",
                    borderRadius: 2,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Left bracket accent */}
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: 3,
                      height: "60%",
                      background: "#C9A84C",
                      borderRadius: "0 2px 2px 0",
                    }}
                  />
                  {/* Right bracket accent */}
                  <div
                    style={{
                      position: "absolute",
                      right: 0,
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: 3,
                      height: "60%",
                      background: "#C9A84C",
                      borderRadius: "2px 0 0 2px",
                    }}
                  />
                  <span
                    style={{
                      fontSize: 9,
                      letterSpacing: "0.25em",
                      textTransform: "uppercase",
                      color: "#C9A84C",
                      fontFamily: "Georgia, serif",
                    }}
                  >
                    Reserve Your Stay
                  </span>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2 6H10M7 3L10 6L7 9"
                      stroke="#C9A84C"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {/* Footer utility links */}
                <div className="mt-5 flex items-center justify-center gap-5">
                  {[
                    { label: "Contact", href: "/contact" },
                    { label: "Offers", href: "/offers" },
                    { label: "Gift Cards", href: "/gift-cards" },
                  ].map((link, i, arr) => (
                    <div key={link.label} className="flex items-center gap-5">
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        style={{
                          fontSize: 9,
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          color: "rgba(201,168,76,0.4)",
                          textDecoration: "none",
                        }}
                      >
                        {link.label}
                      </Link>
                      {i < arr.length - 1 && (
                        <span
                          style={{ color: "rgba(201,168,76,0.2)", fontSize: 9 }}
                        >
                          ◆
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </nav>
          </MotionDiv>
        )}
      </AnimatePresence>
    </>
  );
}
