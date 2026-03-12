import MotionDiv from "@/components/MotionDiv";
import Image from "next/image";

const codeOfConduct = [
  {
    title: "Bribery, Illegal Gifts & Commissions",
    description: (
      <p>
        Employees must not solicit or accept any form of bribe, illegal payment,
        or commission in connection with their duties. Any form of advantage
        offered in return for influencing business decisions or gaining unfair
        benefits is strictly prohibited.
        <br />
        <br />
        Gifts or benefits that may compromise the integrity of business
        decisions must be avoided. Transparency and fairness must always guide
        interactions with suppliers, partners, and guests.
      </p>
    ),
  },
  {
    title: "Accepting Advantages",
    description: (
      <p>
        Employees should exercise caution when accepting gifts, hospitality, or
        benefits related to their work. Accepting such advantages may affect
        objectivity and may create a perception of bias or favoritism.
        <br />
        <br />
        Any gift or benefit that could potentially influence professional
        judgment must be declined unless it is customary, modest, and in line
        with company policies.
      </p>
    ),
  },
  {
    title: "Offering Advantages",
    description: (
      <p>
        Under no circumstances should an employee offer gifts, favors, or other
        benefits to influence business decisions or secure unfair advantages for
        the organization.
        <br />
        <br />
        Business relationships must be built on professionalism, mutual respect,
        and lawful conduct.
      </p>
    ),
  },
  {
    title: "Entertainment & Hospitality Industry Practice",
    description: (
      <p>
        In the hospitality industry, certain forms of entertainment or
        complimentary services may be customary for building relationships.
        However, employees must ensure that such gestures remain reasonable,
        transparent, and in line with industry norms.
        <br />
        <br />
        Excessive hospitality or entertainment that could be perceived as an
        attempt to influence decisions must be avoided.
      </p>
    ),
  },
  {
    title: "Use of Proprietary Information",
    description: (
      <p>
        Employees must protect confidential and proprietary information
        belonging to the organization. Such information may include business
        strategies, marketing plans, financial data, guest information,
        operational processes, and internal communications.
        <br />
        <br />
        Confidential information must never be disclosed to unauthorized
        individuals or used for personal benefit.
      </p>
    ),
  },
  {
    title: "Handling Conflict of Interest Situations",
    description: (
      <p>
        A conflict of interest occurs when personal interests interfere with
        professional responsibilities. Employees must avoid situations where
        personal relationships, financial interests, or outside activities may
        influence their professional decisions.
        <br />
        <br />
        If any potential conflict arises, it must be disclosed to management
        immediately to ensure transparency and appropriate resolution.
      </p>
    ),
  },
  {
    title: "Insider Trading",
    description: (
      <p>
        Employees must not use confidential or non-public information for
        personal financial gain or share such information with others who may
        use it for trading or investment purposes.
        <br />
        <br />
        The misuse of insider information is illegal and strictly prohibited.
      </p>
    ),
  },
  {
    title: "Misuse of Company Assets & Resources",
    description: (
      <p>
        Company property, resources, and facilities must be used responsibly and
        only for legitimate business purposes. Misuse or unauthorized use of
        company assets—including equipment, materials, or information—may result
        in disciplinary action.
      </p>
    ),
  },
  {
    title: "Sexual Harassment & Workplace Conduct",
    description: (
      <p>
        Lohagarh Group is committed to providing a safe, respectful, and
        inclusive workplace. Any form of harassment, discrimination,
        intimidation, or abusive behavior is strictly prohibited.
        <br />
        <br />
        Sexual harassment, inappropriate remarks, unwanted advances, or behavior
        that creates an uncomfortable work environment will not be tolerated
        under any circumstances.
      </p>
    ),
  },
  {
    title: "Personal Conduct Outside Working Hours",
    description: (
      <p>
        Employees are expected to maintain professional conduct even outside
        working hours when their actions may reflect on the organization.
        Activities that could damage the reputation of the company or create
        conflicts with organizational interests should be avoided.
      </p>
    ),
  },
  {
    title: "Environmental Responsibility",
    description: (
      <p>
        We are committed to conducting our operations in an environmentally
        responsible manner. Employees are encouraged to support initiatives that
        minimize environmental impact, conserve resources, and promote
        sustainable practices.
        <br />
        <br />
        Protecting the environment is an important part of our commitment to
        responsible hospitality.
      </p>
    ),
  },
  {
    title: "Political Participation",
    description: (
      <p>
        Employees are free to participate in political activities in their
        personal capacity; however, such participation must not involve the use
        of company resources or represent the organization in any way.
        <br />
        <br />
        The organization maintains neutrality and does not support political
        parties or candidates.
      </p>
    ),
  },
  {
    title: "Commitment to Ethical Conduct",
    description: (
      <p>
        The Code of Conduct serves as a foundation for maintaining integrity,
        professionalism, and accountability across the Lohagarh Group. By
        adhering to these principles, we ensure that our organization continues
        to build lasting relationships based on trust, respect, and excellence
        in hospitality.
        <br />
        <br />
        Every employee shares the responsibility of upholding these values and
        contributing to a culture of ethical conduct.
      </p>
    ),
  },
];

export default function CodeOfConduct() {
  return (
    <div className="min-h-screen bg-background">
      <div className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/images/lohagarhfortresort/outer.webp"
            alt="Code of Conduct"
            width={1200}
            height={700}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center text-white">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="block text-sm tracking-[0.3em] uppercase mb-4">
              Our Standards
            </span>
            <h1 className="text-5xl md:text-7xl font-serif">Code of Conduct</h1>
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
          >
            <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed font-serif italic mb-12 text-center">
              "Excellence in conduct is the cornerstone of exceptional
              hospitality."
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-12">
              At Lohagarh Group of Companies, we believe that honesty,
              integrity, and fairness are essential to maintaining trust with
              our guests, partners, employees, and the communities we serve. Our
              Code of Conduct defines the standards of behavior expected from
              everyone associated with the organization. It guides our actions,
              decisions, and professional relationships, ensuring that we uphold
              the highest ethical values in all aspects of our operations.
              <br />
              <br />
              Every employee and representative of the organization is expected
              to conduct themselves in a manner that reflects the values and
              reputation of the Lohagarh brand.
            </p>
            <div className="space-y-8">
              {codeOfConduct.map((item, index) => (
                <div key={index} className="flex gap-8 group">
                  <span className="text-primary font-serif text-2xl min-w-[40px]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="border-l border-primary/20 pl-8">
                    <h3 className="text-xl font-serif text-primary mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 group-hover:text-gray-700 transition-colors">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </MotionDiv>
        </div>
      </div>
    </div>
  );
}
