"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import LoadingPage from "./LoadingPage";

export default function NavigationLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true); // true on first visit

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 3500); // match your animation duration
    return () => clearTimeout(timer);
  }, [pathname]); // re-triggers on every route change

  if (!loading) return null;
  return <LoadingPage />;
}