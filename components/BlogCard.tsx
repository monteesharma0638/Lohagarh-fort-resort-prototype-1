"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export interface BlogCardProps {
  id: string;
  title: string;
  image: string;
  excerpt: string;
  category?: string;
  date?: string;
}

export default function BlogCard({
  id,
  title,
  image,
  excerpt,
  category,
  date
}: BlogCardProps) {
  const linkHref = `/blogs/${id}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group cursor-pointer"
    >
      <Link href={linkHref}>
        <div className="relative overflow-hidden aspect-[4/3] mb-5 rounded-md">

          {/* Image */}
          <Image
            src={image}
            alt={title}
            width={500}
            height={375}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
          />

          {/* Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          {/* Decorative Corner Strips */}
          <span className="absolute top-4 left-4 h-6 w-6 border-t-2 border-l-2 border-primary opacity-0 group-hover:opacity-100 group-hover:-translate-x-1 group-hover:-translate-y-1 transition-all duration-500 rounded-tl-lg" />

          <span className="absolute bottom-4 right-4 h-6 w-6 border-b-2 border-r-2 border-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:translate-y-1 transition-all duration-500 rounded-br-lg" />

          {/* Text */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            {category && (
              <span className="text-xs font-bold tracking-widest text-primary uppercase mb-1 block">
                {category}
              </span>
            )}

            <h3 className="text-lg font-serif text-white leading-snug">
              {title}
            </h3>

            {date && (
              <span className="text-xs text-gray-300 block mt-1">
                {date}
              </span>
            )}
          </div>
        </div>
      </Link>

      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
        {excerpt}
      </p>

      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500 uppercase">
          Read Article
        </span>

        <Link href={linkHref}>
          <span className="inline-flex items-center text-xs font-bold tracking-widest uppercase hover:text-primary transition-colors">
            Read More <ArrowRight size={14} className="ml-2" />
          </span>
        </Link>
      </div>
    </motion.div>
  );
}