"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Facebook, Twitter, Instagram } from "lucide-react";

export default function TopHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const links = [
    ...(isHome ? [] : [{ label: "Home", href: "/" }]),
    { label: "Rajasthan", href: "#" },
    { label: "Media", href: "/media" },
    { label: "Special Packages", href: "/special-packages" },
    { label: "Reservations", href: "/reservations" },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-[#3D0C02] text-white/80 text-[0.65rem] tracking-[0.15em] uppercase border-b border-[#D4AF37]/20">
      <div className="container mx-auto px-6 flex items-center justify-between h-9">
        <nav className="hidden sm:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="hover:text-[#D4AF37] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4 ml-auto">
          <a href="#" className="hover:text-[#D4AF37] transition-colors" aria-label="Facebook">
            <Facebook size={14} />
          </a>
          <a href="#" className="hover:text-[#D4AF37] transition-colors" aria-label="Twitter">
            <Twitter size={14} />
          </a>
          <a href="#" className="hover:text-[#D4AF37] transition-colors" aria-label="Instagram">
            <Instagram size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}
