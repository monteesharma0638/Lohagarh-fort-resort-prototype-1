import type { Metadata } from "next";
import "./globals.css";
import TopHeader from "@/components/TopHeader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Lohagarh Hotels - A Legacy of Indian Royalty",
  description: "Discover the timeless elegance of Lohagarh Hotels, where historic forts and palaces have been transformed into luxurious sanctuaries. Experience a symphony of Indian hospitality and grandeur in our palatial destinations across the subcontinent.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body>
        <TopHeader />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
