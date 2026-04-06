import type { Metadata } from "next";
import "./globals.css";
import TopHeader from "@/components/TopHeader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "./providers";
import Script from 'next/script';
import { GoogleAnalytics } from '@next/third-parties/google'

export const metadata: Metadata = {
  title: "Lohagarh Hotels - A Legacy of Indian Royalty",
  description: "Discover the timeless elegance of Lohagarh Hotels, where historic forts and palaces have been transformed into luxurious sanctuaries. Experience a symphony of Indian hospitality and grandeur in our palatial destinations across the subcontinent.",
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <TopHeader />
        <Navbar />
        <Providers>
          {children}
        </Providers>
        <Footer />
      </body>
      <GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS_ID || ""} />
      {/* <Script async type="text/javascript" id="zsiqchat">
      {
        `
          var $zoho = $zoho || {};
          $zoho.salesiq = $zoho.salesiq || {
            widgetcode: '${process.env.ZOHO_WIDGET_ID}',
            values: {},
            ready: function(){}
          };
          var d = document;
          s = d.createElement("script");
          s.type = "text/javascript";
          s.id = "zsiqscript";
          s.defer = true;
          s.src = "https://salesiq.zoho.in/widget";
          t = d.getElementsByTagName("script")[0];
          setTimeout(function() {
            t.parentNode.insertBefore(s, t);
          }, 10000);
        `
      }
      </Script> */}
   </html>
  );
}
