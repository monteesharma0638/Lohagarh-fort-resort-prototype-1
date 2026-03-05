"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function HotelBreadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="flex items-center mt-10 gap-2 text-white/70 text-xs tracking-wider">
      <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
        <Home size={12} />
        <span>Home</span>
      </Link>
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-2">
          <ChevronRight size={12} className="text-white/70" />
          {item.href ? (
            <Link href={item.href} className="text-white/70 hover:text-white transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-white">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
