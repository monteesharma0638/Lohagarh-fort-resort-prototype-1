import SectionHeading from "@/components/SectionHeading";
import MotionDiv from "@/components/MotionDiv";
import RouteMap from "./components/RouteMap";
import PalaceDetails from "./components/PalaceDetails";
import { CLOUDFLARE_DEV_URL } from "@/lib/constants";
import Hero from "@/components/Hero";
import PalaceGallerySection from "./components/PalaceGallerySection";
import TrainRouteMap from "./components/TrainRouteMap";

export default function PalaceOnWheels() {

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Hero imageUrl={`${CLOUDFLARE_DEV_URL}/palace-on-wheels/images/train_cover.jpeg`} restrictVideoOnMobile videoUrl="https://www.youtube.com/embed/VtxWYAwAGwY?autoplay=1&controls=0&start=0&loop=0&mute=1&rel=0">
        <div className="absolute inset-0" />
        <div className="relative z-10 text-center text-white px-4">
          <MotionDiv 
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: [0, 1, 1, 0], // Start -> Visible -> Stay Visible -> Hide
              display: ["block", "block", "block", "none"], // Completely remove from layout at the end
              y: [20, 0, 0, 0]
            }}
            transition={{ 
              duration: 6, // Total time (1s fade + 5s wait)
              times: [0, 0.1, 0.9, 1] // Percentages of the duration (0s, 0.6s, 5.4s, 6s)
            }}
          >
            <span className="block text-sm tracking-[0.3em] uppercase mb-4 text-primary">Special Packages</span>
            <h1 className="text-5xl md:text-8xl font-serif">Palace on Wheels</h1>
          </MotionDiv>
        </div>
      </Hero>
      {/* <TrainJourney /> */}
       {/* <RouteMap /> */}
       <TrainRouteMap />
       {/* <RouteExperience /> */}
       <PalaceGallerySection />
       <PalaceDetails />
    </div>
  );
}
