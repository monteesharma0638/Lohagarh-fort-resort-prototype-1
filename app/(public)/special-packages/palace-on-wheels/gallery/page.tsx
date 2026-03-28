"use client";

import Image from "next/image";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import trainCabins from "@/data/train-cabins.json"

const images = Object.values(trainCabins).flat();

export default function PalaceGalleryPage() {
  return (
    <main className="bg-background border-t-150 border-black/70 min-h-screen">

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <p className="text-xs tracking-[0.3em] text-primary uppercase">
          Palace on Wheels
        </p>

        <h1 className="text-3xl md:text-5xl font-serif mt-2 leading-tight">
          Photo Gallery
          {/* <span className="block text-accent">
            Royal Experience
          </span> */}
        </h1>
      </div>

      {/* Gallery */}
      <PhotoProvider
        maskOpacity={0.9}
        speed={() => 300}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 pb-10">

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">

            {images.map((src, i) => (
              <PhotoView key={i} src={src}>
                <div className="relative aspect-square cursor-zoom-in overflow-hidden border border-border group">

                  <Image
                    src={src}
                    alt="Palace Gallery"
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />

                  {/* subtle hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition" />
                </div>
              </PhotoView>
            ))}

          </div>
        </div>
      </PhotoProvider>
    </main>
  );
}