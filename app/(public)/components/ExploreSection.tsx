'use client';

import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import MotionDiv from '@/components/MotionDiv';

// 1. Define typed variants to satisfy TypeScript
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { x: -30, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const imageVariants: Variants = {
  hidden: { x: 60, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { 
      duration: 0.8, 
      ease: [0.6, 0.05, 0.01, 0.9] // Custom cubic-bezier
    },
  },
};

interface IExploreSection {
    reverse?: boolean;
    content: any;
    title: string;
    image: string;
}

export default function ExploreSection({ reverse = false, content, title, image }: IExploreSection) {
  return (
    <section className="w-full bg-[#D6CBB3] flex items-center justify-center">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        
        {/* Left Side: Content */}
        <MotionDiv
          className={`bg-[#E9E1D0] p-10 ${reverse? "md:order-2" : ""} md:p-20 flex flex-col justify-center min-h-[80vh]`}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2 
            variants={itemVariants}
            className="text-5xl md:text-6xl text-center font-serif text-gray-800 mb-12"
          >
            {title}
          </motion.h2>

          {
            content || null
          }
        </MotionDiv>

        {/* Right Side: Image */}
        <MotionDiv
          className={`relative h-[400px] ${reverse? "md:order-1" : ""} order-1 md:h-auto overflow-hidden p-20`}
          variants={imageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Image 
            src={image}
            alt="Regal Bedroom"
            fill
            className="object-cover"
            priority
          />
        </MotionDiv>
      </div>
    </section>
  );
}