"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<typeof navItems[number] | null>(null);
  const location = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    {
      label: 'Hotels', 
      href: '/hotels',
      // submenu: [
      //   { label: 'Palaces', href: '/hotels?type=palace' },
      //   { label: 'Resorts', href: '/hotels?type=resort' },
      //   { label: 'Safari Lodges', href: '/hotels?type=safari' },
      //   { label: 'Heritage Havelis', href: '/hotels?type=heritage' }
      // ]
    },
    { 
      label: 'Dining', 
      href: '/dining',
      submenu: [
        { label: 'Fine Dining', category: null, href: '/dining#fine' },
        { label: 'Bars & Lounges', category: null, href: '/dining#bars' },
        { label: 'In-Room Dining', category: null, href: '/dining#room' }
      ]
    },
    { 
      label: 'Experiences', 
      href: '/experiences',
      submenu: [
        { label: 'Jiva Spa', category: "Rooms", href: '/experiences/spa' },
        { label: 'Weddings', category: "Rooms", href: '/experiences/weddings' },
        { label: 'Lohagarh Wedding Venue', category: "Weddings", href: 'https://www.lohagarhfortresort.in/wedding/' },
        { label: 'Royal Wedding', category: "Weddings", href: 'https://www.lohagarhfortresort.in/5-star-luxury-destination-wedding-venues-in-jaipur-rajasthan-for-royal-wedding/' },
      ]
    },
    { label: 'Offers', href: '/offers' },
    { label: 'Discover', href: '/discover' }
  ];

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
      isScrolled || activeSubmenu ? "bg-[white]/95 backdrop-blur-md py-4 border-b border-primary/20 shadow-2xl" : "bg-gradient-to-b from-black/80 to-transparent py-8"
    )}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" onClick={() => setActiveSubmenu(null)} className="flex flex-col items-center group">
            <span className="font-serif text-2xl md:text-3xl tracking-[0.3em] font-bold text-primary transition-all group-hover:text-primary">LOHAGARH</span>
            <span className="text-[0.5rem] tracking-[0.6em] uppercase text-primary font-bold mt-1">ROYAL HERITAGE</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <div 
              key={item.label}
              className="relative group py-2"
              onClick={() => item.submenu ? setActiveSubmenu(item) : setActiveSubmenu(null)}
              // onMouseLeave={() => setActiveSubmenu(null)}
            >
              {
                item.submenu ? (
                      <a className={cn(
                        "text-[0.7rem] font-bold tracking-[0.2em] uppercase transition-all flex items-center gap-1 cursor-pointer",
                        location.startsWith(item.href) ? "text-primary" : "text-primary/60 hover:text-primary"
                      )}>
                        {item.label} {item.submenu && <ChevronDown size={12} className={cn("transition-transform duration-300", activeSubmenu?.label === item.label && "rotate-180")} />}
                      </a>
                ): (
                  <Link href={item.href} className={cn(
                      "text-[0.7rem] font-bold tracking-[0.2em] uppercase transition-all flex items-center gap-1",
                      location.startsWith(item.href) ? "text-primary" : "text-primary/60 hover:text-primary"
                    )}>
                      {item.label} {item.submenu}
                  </Link>
                )
              }
              
            </div>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-6">
          <button className="px-6 py-2.5 border border-primary/50 text-[0.65rem] tracking-[0.2em] uppercase text-primary font-bold hover:bg-primary hover:text-black transition-all">Book Now</button>
        </div>

        <button className="lg:hidden text-primary p-2 border border-primary/20" onClick={() => setIsMobileMenuOpen(true)}><Menu size={24} /></button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed inset-0 bg-black z-[60] p-8 flex flex-col">
            <button className="self-end text-primary mb-12" onClick={() => setIsMobileMenuOpen(false)}><X size={32} /></button>
            <div className="flex flex-col gap-6">
              {navItems.map((item) => (
                <div key={item.label} className="flex flex-col gap-4">
                  <Link href={item.href} onClick={() => setActiveSubmenu(null)}><a onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-serif text-white">{item.label}</a></Link>
                  {item.submenu && (
                    <div className="flex flex-col gap-3 pl-4 border-l border-primary/20">
                      {item.submenu.map((sub) => (
                        <Link key={sub.label} href={sub.href}><a onClick={() => setIsMobileMenuOpen(false)} className="text-sm tracking-[0.1em] uppercase text-primary/70">{sub.label}</a></Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {
        activeSubmenu && (
          <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                onMouseLeave={() => setActiveSubmenu(null)}
                className={"absolute left-0 top-full w-full bg-white shadow-2xl border-t"}
              >
                <div className="grid grid-cols-2 max-w-7xl mx-auto p-10 gap-10">

                  {/* LEFT SIDE IMAGE */}
                  <div
                    className="h-[380px] rounded-xl bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "url('https://images.unsplash.com/photo-1566073771259-6a8506099945')",
                    }}
                  >
                    <div className="h-full w-full bg-black/30 rounded-xl flex items-end p-6">
                      <h2 className="text-white text-2xl font-semibold">
                        Experience Luxury & Comfort
                      </h2>
                    </div>
                  </div>

                  {/* RIGHT SIDE MENU */}
                  <div className="grid grid-cols-2 gap-8">
                    {
                      Array.from(new Set(activeSubmenu.submenu?.map((item) => item?.category))).map((category, index) => (
                        <div key={category ?? "" + index}>
                          {
                            category &&
                            <h3 className="text-sm font-semibold uppercase text-gray-500 mb-4">
                              {category}
                            </h3>
                          }
                          <ul className="space-y-3">
                            {
                              activeSubmenu.submenu?.filter((sub) => sub?.category === category)?.map((sub) => (
                                <li key={sub.label}>
                                  <Link href={sub.href} onClick={() => setActiveSubmenu(null)}>
                                    <span className="text-sm tracking-[0.1em] uppercase text-primary/70 hover:text-primary"> {sub.label}</span>
                                  </Link>
                                </li>
                              ))
                            }
                          </ul>
                        </div>
                      ))   
                    }
                  </div>
                </div>
          </motion.div>
        )
      }
    </header>
  );
}