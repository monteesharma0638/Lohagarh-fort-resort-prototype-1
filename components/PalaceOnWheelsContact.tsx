"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PalaceOnWheelsContact() {
  const pathname = usePathname();

  const isPalaceOnWheelsPage =
    pathname?.startsWith("/special-packages/palace-on-wheels");

  if (!isPalaceOnWheelsPage) return null;

  return (
    <Link
      href="/special-packages/palace-on-wheels/contact"
      className="fixed bottom-6 left-6 z-50 group flex items-center gap-3"
      aria-label="Contact Palace on Wheels"
    >
      {/* Tooltip label — slides in on hover */}
      <span className="absolute left-14 whitespace-nowrap bg-[#1a1209] text-white text-xs tracking-[0.15em] uppercase px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        Contact Us
      </span>

      {/* Icon button */}
      <div className="w-12 h-12 bg-[#c9a84c] flex items-center justify-center shadow-lg hover:bg-[#b8923e] transition-colors duration-300">
        {/* Train icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
          aria-hidden="true"
        >
          {/* Train body */}
          <rect x="4" y="3" width="16" height="13" rx="2" />
          {/* Window row */}
          <line x1="8" y1="7" x2="8" y2="10" />
          <line x1="16" y1="7" x2="16" y2="10" />
          {/* Centre divider */}
          <line x1="12" y1="3" x2="12" y2="16" />
          {/* Wheels */}
          <circle cx="7" cy="19" r="2" />
          <circle cx="17" cy="19" r="2" />
          {/* Connector rod */}
          <line x1="9" y1="19" x2="15" y2="19" />
          {/* Undercarriage */}
          <line x1="4" y1="16" x2="20" y2="16" />
        </svg>
      </div>
    </Link>
  );
}