import MotionDiv from "@/components/MotionDiv";
import Image from "next/image";

export default function Testimonials() {
  return (
    <div className="min-h-screen bg-background">
      <div className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image src="/images/lohagarhfortresort/spa.webp" alt="Testimonials" width={1200} height={700} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center text-white">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="block text-sm tracking-[0.3em] uppercase mb-4">Guest Voices</span>
            <h1 className="text-5xl md:text-7xl font-serif">Testimonials</h1>
          </MotionDiv>
        </div>
      </div>

      <div className="py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <MotionDiv
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed font-serif italic">
              "Hear from those who have experienced the Lohagarh difference."
            </p>
          </MotionDiv>

          <div className="space-y-12">
            {[
              { quote: "An extraordinary experience that transported us back to the era of maharajas. The attention to detail and warmth of the staff made our stay truly unforgettable.", author: "Guest Review", location: "Lohagarh Fort Resort" },
              { quote: "The perfect blend of heritage charm and modern luxury. Every moment felt special, from the welcome ceremony to the farewell. We will return.", author: "Guest Review", location: "Mahal Khas" },
              { quote: "A destination wedding beyond our wildest dreams. The palace setting, the impeccable service, and the royal treatment made our celebration truly magical.", author: "Guest Review", location: "Lohagarh Desert Resort" },
            ].map((testimonial, index) => (
              <MotionDiv
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-12 border border-primary/10 text-center"
              >
                <p className="text-xl md:text-2xl font-serif text-foreground/80 italic leading-relaxed mb-8">
                  "{testimonial.quote}"
                </p>
                <p className="text-primary text-sm tracking-widest uppercase font-bold">{testimonial.author}</p>
                <p className="text-gray-500 text-xs tracking-widest uppercase mt-2">{testimonial.location}</p>
              </MotionDiv>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
