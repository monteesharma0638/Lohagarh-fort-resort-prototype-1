"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import TopHeaderSocialLinks from "./TopHeaderSocialLinks";

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
    <div className="fixed top-0 left-0 right-0 z-[60] bg-primary text-white text-[0.65rem] tracking-[0.15em] uppercase font-medium">
      <div className="container mx-auto px-6 flex items-center justify-between h-9">
        <nav className="hidden sm:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="hover:text-white/70 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <TopHeaderSocialLinks />
      </div>
    </div>
  );
}
