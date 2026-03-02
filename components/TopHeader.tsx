"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Facebook, Twitter, Instagram } from "lucide-react";

export default function TopHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    ...(isHome ? [] : [{ label: "Home", href: "/" }]),
    { label: "Rajasthan", href: "#" },
    { label: "Media", href: "/media" },
    { label: "Special Packages", href: "/special-packages" },
    { label: "Reservations", href: "/reservations" },
  ];

  return (
    <div className={`fixed top-0 left-0 right-0 z-[60] bg-[#1a1a1a] text-white/70 text-[0.65rem] tracking-[0.1em] uppercase transition-transform duration-500 ${isScrolled ? "-translate-y-full" : "translate-y-0"}`}>
      <div className="container mx-auto px-6 flex items-center justify-between h-9">
        <nav className="flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-primary transition-colors" aria-label="Facebook">
            <Facebook size={14} />
          </a>
          <a href="#" className="hover:text-primary transition-colors" aria-label="Twitter">
            <Twitter size={14} />
          </a>
          <a href="#" className="hover:text-primary transition-colors" aria-label="Instagram">
            <Instagram size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}
