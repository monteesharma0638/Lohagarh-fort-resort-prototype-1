"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQ {
  q: string;
  a: string;
}

export default function WeddingVenuesFAQ({ faqs }: { faqs: FAQ[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="divide-y divide-border">
      {faqs.map((faq, i) => (
        <div key={i}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between py-5 text-left gap-4"
          >
            <span className="font-serif text-foreground text-base md:text-lg leading-snug">{faq.q}</span>
            <ChevronDown
              className={`shrink-0 w-5 h-5 text-primary transition-transform duration-300 ${open === i ? "rotate-180" : ""}`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${open === i ? "max-h-96 pb-5" : "max-h-0"}`}
          >
            <p className="text-foreground/70 leading-relaxed">{faq.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
