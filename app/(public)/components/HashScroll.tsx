'use client';
import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function HashScroll() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        // Delay slightly to ensure the DOM is fully painted
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [pathname, searchParams]); // Re-run when the route changes

  return null;
}