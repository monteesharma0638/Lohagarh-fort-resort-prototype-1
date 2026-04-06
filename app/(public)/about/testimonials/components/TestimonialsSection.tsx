"use client";

import { useFetch } from "@/hooks/api";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

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

const townhall: Testimonial[] = [
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
    "lohagarh-fort-resort": {
        title: "Lohagarh Fort Resort, Jaipur",
        id: "lohagarh-fort-resort"
    },
    "corbett-resort": {
        title: "Lohagarh Corbett Resort, Nainital",
        id: "corbett-resort"
    },
    "mahalkhas": {
        title: "MahalKhas, Bharatpur",
        id: "mahalkhas"
    },
    "kothi-lohagarh": {
        title: "Kothi Lohagarh, Jaipur",
        id: "kothi-lohagarh"
    },
    "lohagarh-desert-resort": {
        title: "Lohagarh Desert Resort, Jaiselmer",
        id: "lohagarh-desert-resort"
    },
    "townhall": {
      title: "Townhall Restaurant & Events",
      id: "townhall"
    }
}

export default function TestimonialsSection() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  
  const params = new URLSearchParams(searchParams);
  const property = params.get("property") as keyof typeof testimonials;
  const selectedHotel = Object.keys(testimonials).includes(property) ? property : "lohagarh-fort-resort";
  
  
  const { data } = useFetch(`/api/properties/testimonials?id=${selectedHotel}`);

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">

      {/* Heading */}
      <h2 className="text-3xl font-semibold mb-6">Testimonials</h2>

      {/* Select */}
      <div className="mb-10">
        <select
          value={selectedHotel}
          onChange={(e) => {
            params.set("property", e.target.value);
            router.replace(`${pathname}?${params.toString()}`, {scroll: false});
          }}
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
        {data?.map?.((t: any, i: any) => (
          <div
            key={i}
            className="border border-amber-200 rounded-lg p-6 bg-white hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold">{t.name}</h3>
            <p className="text-sm text-gray-500 mb-3">{new Date(t.time).toLocaleString()}</p>
            <p className="text-gray-700 leading-relaxed">{t.description}</p>
          </div>
        ))}
      </div>

    </section>
  );
}