import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "*.replit.dev",
    "*.repl.co",
    "*.worf.replit.dev",
    "127.0.0.1",
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
