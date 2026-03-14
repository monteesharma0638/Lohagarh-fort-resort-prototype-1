"use client";

import MotionDiv from "@/components/MotionDiv";
import { Variants } from "framer-motion";
import Link from "next/link";
import React from "react";
import ExploreSection from "./ExploreSection";
import { Button } from "@/components/ui/button";

const itemVariants: Variants = {
  hidden: { x: -30, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const ListItems = ({ title, src }: { title: string; src: string }) => (
  <li className="flex items-center gap-3">
    <span className="w-1.5 h-1.5 bg-gray-800 rounded-full" />
    <Link href={src}>{title}</Link>
  </li>
);

const sections = [
  {
    heading: "Regal Stay",
    image: "https://res.cloudinary.com/drayl5ppi/image/upload/v1773305574/lohagarh/images/maharaja/maharaja_ysmojd.jpg",
    content: (
      <div className="space-y-10">
        <MotionDiv variants={itemVariants}>
          <ul>
            <h3 className="font-bold uppercase tracking-widest text-sm mb-4 text-gray-900">
              Grand Heritage
            </h3>
            {[
              {
                title: "Lohagarh Fort",
                src: "/hotels/lohagarh-fort-resort",
              },
              {
                title: "Lohagarh Desert Resort",
                src: "/hotels/lohagarh-desert-resort",
              },
              {
                title: "Mahalkhas Palace",
                src: "/hotels/mahalkhas",
              },
            ].map((value, idx) => (
              <ListItems key={idx} title={value.title} src={value.src} />
            ))}
          </ul>
        </MotionDiv>
        <MotionDiv variants={itemVariants}>
          <ul>
            <h3 className="font-bold uppercase tracking-widest text-sm mb-4 text-gray-900">
              Royal Retreats
            </h3>
            {[
              {
                title: "Kothi Lohagarh",
                src: "/hotels/kothi-lohagarh",
              },
              {
                title: "Lohagarh Corbett Resort",
                src: "/hotels/corbett-resort",
              },
              {
                title: "Townhall Restaurant & Events",
                src: "/hotels/townhall",
              },
            ].map((value, idx) => (
              <ListItems key={idx} title={value.title} src={value.src} />
            ))}
          </ul>
        </MotionDiv>
        <div className="flex justify-center">
          <Link href="/hotels">
            <Button>View More</Button>
          </Link>
        </div>
      </div>
    ),
  },
  {
    heading: "Regal Dining",
    image: "https://res.cloudinary.com/drayl5ppi/image/upload/v1773470890/lohagarh/images/dining/3-min-1_guyrve.webp",
    content: (
      <div className="space-y-10 min-h-6xl flex justify-center">
        <Link href="/dining">
          <Button>View More</Button>
        </Link>
      </div>
    ),
  },
  {
    heading: "Regal Experience",
    image: "/images/lohagarhfortresort/gallery1.webp",
    content: (
      <div className="space-y-10">
        <MotionDiv variants={itemVariants}>
          <ul>
            {[
              {
                title: "Conferences",
                src: "/hotels/lohagarh-fort-resort",
              },
              {
                title: "Meetings",
                src: "/hotels/lohagarh-desert-resort",
              },
              {
                title: "Events",
                src: "/hotels/mahalkhas",
              },
              {
                title: "Shoots",
                src: "/hotels/mahalkhas",
              },
              {
                title: "Incentives",
                src: "/hotels/mahalkhas",
              },
              {
                title: "Recent Events and Conferences",
                src: "/hotels/mahalkhas",
              },
            ].map((value, idx) => (
              <ListItems key={idx} title={value.title} src={value.src} />
            ))}
          </ul>
        </MotionDiv>
        <div className="flex justify-center">
          <Link href="/hotels">
            <Button>View More</Button>
          </Link>
        </div>
      </div>
    ),
  },
  {
    heading: "Regal Weddings",
    image: "/images/lohagarhfortresort/royal-wedding.jpg",
    content: (
      <div className="space-y-10">
        <MotionDiv variants={itemVariants}>
          <ul>
            {[
              {
                title: "Venues",
                src: "/hotels/lohagarh-fort-resort",
              },
              {
                title: "Suggested Itineraries",
                src: "/hotels/lohagarh-desert-resort",
              },
              {
                title: "Suggested Menus",
                src: "/hotels/mahalkhas",
              },
              {
                title: "Photo Gallery",
                src: "/hotels/mahalkhas",
              }
            ].map((value, idx) => (
              <ListItems key={idx} title={value.title} src={value.src} />
            ))}
          </ul>
        </MotionDiv>
        <div className="flex justify-center">
          <Link href="/hotels">
            <Button>View More</Button>
          </Link>
        </div>
      </div>
    ),
  },
  {
    heading: "Spa & Salon",
    image: "/images/lohagarhfortresort/spa.webp",
    content: (
      <div className="space-y-10">
        <MotionDiv variants={itemVariants}>
          <p className="text-center">
            Ancient philosophers used to call India the thousand Yojans (leagues) of land that stretches from the magnificent Himalayas to the intense oceans, intertwined with rivers deemed sacred.
          </p>
        </MotionDiv>
        <div className="flex justify-center">
          <Link href="/hotels">
            <Button>View More</Button>
          </Link>
        </div>
      </div>
    ),
  },
  // {
  //   heading: "Attraction",
  //   image: "/images/dining-fine.png",
  //   content: (
  //     <div className="space-y-10">
  //       <MotionDiv variants={itemVariants}>
  //         <p className="text-center">
  //           For visitors to Udaipur, and guests at HRH Group of Hotels, Regal Visits have been thoughtfully created and organised to make them ‘Experience the Original in the Abode of Kings?
  //         </p>
  //       </MotionDiv>
  //       <div className="flex justify-center">
  //         <Link href="/hotels">
  //           <Button>View More</Button>
  //         </Link>
  //       </div>
  //     </div>
  //   ),
  // },
];

export default function AllExploreSections() {
  return sections.map((val, idx) => (
    <ExploreSection
      image={val.image}
      reverse={!(idx % 2 == 0)}
      title={val.heading}
      content={val.content}
      key={idx}
    />
  ));
}
