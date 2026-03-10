import SectionHeading from "@/components/SectionHeading";
import MotionDiv from "@/components/MotionDiv";

export default function Contact() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="py-24 container mx-auto px-6 max-w-5xl">
        <SectionHeading title="We'd Love to Hear From You" subtitle="Reach Out" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-12">
          <div>
            <h3 className="text-primary font-serif text-2xl mb-4">Marketing & Sales</h3>
            <p className="text-gray-400 leading-relaxed">For partnership inquiries, marketing collaborations, and sales information, please reach out to our dedicated team.</p>
          </div>
          <div>
            <h3 className="text-primary font-serif text-2xl mb-4">Investors</h3>
            <p className="text-gray-400 leading-relaxed">For investor relations and financial inquiries, our team is available to assist you.</p>
          </div>
          <div>
            <h3 className="text-primary font-serif text-2xl mb-4">Feedback</h3>
            <p className="text-gray-400 leading-relaxed">Your experience matters to us. Share your feedback to help us continue delivering exceptional hospitality.</p>
          </div>
          <div>
            <h3 className="text-primary font-serif text-2xl mb-4">Career</h3>
            <p className="text-gray-400 leading-relaxed">Join the Lohagarh family. Explore exciting career opportunities across our heritage properties.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
