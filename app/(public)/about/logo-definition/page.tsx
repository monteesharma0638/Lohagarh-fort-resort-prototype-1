import MotionDiv from "@/components/MotionDiv";
import Image from "next/image";

export default function LogoDefinition() {
  return (
    <div className="min-h-screen bg-background">
      <div className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image src="/images/lohagarhfortresort/hero_bg_1_1.jpg" alt="Definition of Logo" width={1200} height={700} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center text-white">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="block text-sm tracking-[0.3em] uppercase mb-4">Brand Identity</span>
            <h1 className="text-5xl md:text-7xl font-serif">Definition of LOGO</h1>
          </MotionDiv>
        </div>
      </div>

      <div className="py-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <MotionDiv
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="mb-16 flex justify-center">
              <Image
                src="/logo/website-logo.png"
                alt="Lohagarh Group Of Companies"
                height={200}
                width={600}
              />
            </div>
            <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed font-serif italic mb-12">
              "Every element of our logo carries the weight of centuries of tradition and the promise of timeless luxury."
            </p>
            <div className="space-y-12 text-left">
              <div className="border-l-2 border-primary/30 pl-8">
                <h3 className="text-2xl font-serif text-primary mb-4">The Name</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  "Lohagarh" — meaning "Iron Fort" — derives from the legendary impregnable fortress of Bharatpur, symbolizing strength, resilience, and an unbreakable commitment to excellence.
                </p>
              </div>
              <div className="border-l-2 border-primary/30 pl-8">
                <h3 className="text-2xl font-serif text-primary mb-4">The Design</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Our logo draws inspiration from the architectural motifs found in Rajasthan's royal palaces, representing the fusion of heritage artistry with contemporary elegance.
                </p>
              </div>
              <div className="border-l-2 border-primary/30 pl-8">
                <h3 className="text-2xl font-serif text-primary mb-4">The Colors</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  The gold palette represents royalty, prosperity, and the warm hospitality that defines every Lohagarh experience. It reflects the golden sands of Rajasthan and the gilded interiors of our heritage properties.
                </p>
              </div>
            </div>
          </MotionDiv>
        </div>
      </div>
    </div>
  );
}
