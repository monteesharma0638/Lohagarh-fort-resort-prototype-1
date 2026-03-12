"use client";

import { title } from "process";
import { useState } from "react";

type Testimonial = {
  name: string;
  date: string;
  message: string;
};

const lohagarhFortResort: Testimonial[] = [
  {
    name: "Mr. Lalit Shah",
    date: "December 29, 2019",
    message: "Very good and quiet environment, classic ambiance.",
  },
  {
    name: "Mr. Mandakini Kumari Singh",
    date: "December 13, 2019",
    message: "Pleasure staying with Karni Bhawan Palace.",
  },
  {
    name: "Ms. Latha R.",
    date: "November 30, 2019",
    message: "Wanted to help !! best service I've seen in Rajasthan.",
  },
  {
    name: "Brig. Lehti Lekha MK (Retd.)",
    date: "November 21, 2019",
    message:
      "Excellent stay, polite staff, pleasant and serene atmosphere. I had a comfortable stay.",
  },
  {
    name: "Ms. Maria Ivey",
    date: "November 06, 2019",
    message:
      "Beautiful surroundings and architecture with a vintage charm.",
  },
  {
    name: "Ms. Christiane Dielite",
    date: "November 02, 2019",
    message:
      "Wonderful attention to the small things that make travelling special.",
  },
  {
    name: "Sloan",
    date: "September 26, 2017",
    message:
      "It was like stepping back in time. A great vintage experience.",
  },
];
const lohagarhCorbettResort: Testimonial[] = [
  {
    name: "Brig. Lehti Lekha MK (Retd.)",
    date: "November 21, 2019",
    message:
      "Excellent stay, polite staff, pleasant and serene atmosphere. I had a comfortable stay.",
  },
  {
    name: "Ms. Maria Ivey",
    date: "November 06, 2019",
    message:
      "Beautiful surroundings and architecture with a vintage charm.",
  },
  {
    name: "Ms. Christiane Dielite",
    date: "November 02, 2019",
    message:
      "Wonderful attention to the small things that make travelling special.",
  },
  {
    name: "Sloan",
    date: "September 26, 2017",
    message:
      "It was like stepping back in time. A great vintage experience.",
  },
];
const mahalKhas: Testimonial[] = [
  {
    name: "Mr. Lalit Shah",
    date: "December 29, 2019",
    message: "Very good and quiet environment, classic ambiance.",
  },
  {
    name: "Mr. Mandakini Kumari Singh",
    date: "December 13, 2019",
    message: "Pleasure staying with Karni Bhawan Palace.",
  },
  {
    name: "Ms. Latha R.",
    date: "November 30, 2019",
    message: "Wanted to help !! best service I've seen in Rajasthan.",
  },
  {
    name: "Brig. Lehti Lekha MK (Retd.)",
    date: "November 21, 2019",
    message:
      "Excellent stay, polite staff, pleasant and serene atmosphere. I had a comfortable stay.",
  },
  {
    name: "Ms. Maria Ivey",
    date: "November 06, 2019",
    message:
      "Beautiful surroundings and architecture with a vintage charm.",
  },
  {
    name: "Ms. Christiane Dielite",
    date: "November 02, 2019",
    message:
      "Wonderful attention to the small things that make travelling special.",
  },
  {
    name: "Sloan",
    date: "September 26, 2017",
    message:
      "It was like stepping back in time. A great vintage experience.",
  },
];
const kothiLohagarh: Testimonial[] = [
  {
    name: "Mr. Lalit Shah",
    date: "December 29, 2019",
    message: "Very good and quiet environment, classic ambiance.",
  },
  {
    name: "Mr. Mandakini Kumari Singh",
    date: "December 13, 2019",
    message: "Pleasure staying with Karni Bhawan Palace.",
  },
  {
    name: "Ms. Latha R.",
    date: "November 30, 2019",
    message: "Wanted to help !! best service I've seen in Rajasthan.",
  },
  {
    name: "Brig. Lehti Lekha MK (Retd.)",
    date: "November 21, 2019",
    message:
      "Excellent stay, polite staff, pleasant and serene atmosphere. I had a comfortable stay.",
  },
  {
    name: "Ms. Maria Ivey",
    date: "November 06, 2019",
    message:
      "Beautiful surroundings and architecture with a vintage charm.",
  },
  {
    name: "Ms. Christiane Dielite",
    date: "November 02, 2019",
    message:
      "Wonderful attention to the small things that make travelling special.",
  },
  {
    name: "Sloan",
    date: "September 26, 2017",
    message:
      "It was like stepping back in time. A great vintage experience.",
  },
];
const lohagarhDesertResort: Testimonial[] = [
  {
    name: "Mr. Lalit Shah",
    date: "December 29, 2019",
    message: "Very good and quiet environment, classic ambiance.",
  },
  {
    name: "Mr. Mandakini Kumari Singh",
    date: "December 13, 2019",
    message: "Pleasure staying with Karni Bhawan Palace.",
  },
  {
    name: "Ms. Latha R.",
    date: "November 30, 2019",
    message: "Wanted to help !! best service I've seen in Rajasthan.",
  },
  {
    name: "Brig. Lehti Lekha MK (Retd.)",
    date: "November 21, 2019",
    message:
      "Excellent stay, polite staff, pleasant and serene atmosphere. I had a comfortable stay.",
  },
  {
    name: "Ms. Maria Ivey",
    date: "November 06, 2019",
    message:
      "Beautiful surroundings and architecture with a vintage charm.",
  },
  {
    name: "Ms. Christiane Dielite",
    date: "November 02, 2019",
    message:
      "Wonderful attention to the small things that make travelling special.",
  },
  {
    name: "Sloan",
    date: "September 26, 2017",
    message:
      "It was like stepping back in time. A great vintage experience.",
  },
];

const testimonials = {
    lohagarhFortResort: {
        title: "Lohagarh Fort Resort, Jaipur",
        data: lohagarhFortResort
    },
    lohagarhCorbettResort: {
        title: "Lohagarh Corbett Resort, Nainital",
        data: lohagarhCorbettResort
    },
    mahalKhas: {
        title: "MahalKhas, Bharatpur",
        data: mahalKhas
    },
    kothiLohagarh: {
        title: "Kothi Lohagarh, Jaipur",
        data: kothiLohagarh
    },
    lohagarhDesertResort: {
        title: "Lohagarh Desert Resort, Jaiselmer",
        data: lohagarhDesertResort
    }
}

export default function TestimonialsSection() {
  const [selectedHotel, setSelectedHotel] = useState<keyof typeof testimonials>("lohagarhFortResort");

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">

      {/* Heading */}
      <h2 className="text-3xl font-semibold mb-6">Testimonials</h2>

      {/* Select */}
      <div className="mb-10">
        <select
          value={selectedHotel}
          onChange={(e) => setSelectedHotel(e.target.value as any)}
          className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none"
        >
          {
            Object.entries(testimonials).map(([key, value], index) => (
              <option key={index} value={key}>{value.title}</option>
            ))
          }
        </select>
      </div>

      {/* Testimonials */}
      <div className="space-y-6">
        {testimonials[selectedHotel].data.map((t, i) => (
          <div
            key={i}
            className="border border-amber-200 rounded-lg p-6 bg-white hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold">{t.name}</h3>
            <p className="text-sm text-gray-500 mb-3">{t.date}</p>
            <p className="text-gray-700 leading-relaxed">{t.message}</p>
          </div>
        ))}
      </div>

    </section>
  );
}