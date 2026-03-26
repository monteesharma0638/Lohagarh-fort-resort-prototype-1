"use client";
import { ParallaxProvider } from "react-scroll-parallax";

export default function Providers({children}: any) {
  return (
    <ParallaxProvider>
        {children}
    </ParallaxProvider>
  )
}
