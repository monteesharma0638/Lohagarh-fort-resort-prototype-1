"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { ZoomInIcon } from "lucide-react";

import 'react-photo-view/dist/react-photo-view.css';

interface Props {
  gallery: string[];
  hotelName: string;
}

export default function HotelGallery({ gallery, hotelName }: Props) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  // Opens the viewer at a specific image index
  const openImageViewer = useCallback((index: number) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  // Closes the viewer
  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  const OverLayIcon = () => (
    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
      <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-sm font-medium border border-white/40 bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">
        <ZoomInIcon />
      </span>
    </div>
  )

  return (
    <PhotoProvider>
      <div className="relative">
        {/* The Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {gallery.map((img, idx) => (
              <PhotoView src={img} height={100} width={100} overlay={<OverLayIcon />}>
                  <Image
                    src={img}
                    alt={`${hotelName} gallery ${idx + 1}`}
                    height={500}
                    width={500}
                    className="object-cover cursor-pointer group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
              </PhotoView>
          ))}
        </div>

        {/* The Image Viewer Portal */}
        {/* {isViewerOpen && (
          <div className="z-[9999] relative">
            <PhotoView
              src={gallery}
              currentIndex={currentImage}
              disableScroll={true}
              closeOnClickOutside={true}
              onClose={closeImageViewer}
              backgroundStyle={{
                backgroundColor: "rgba(0,0,0,0.9)",
                zIndex: 9999
              }}
            />
          </div>
        )} */}

      {/* <style jsx global>{`
          .react-simple-image-viewer__next, 
          .react-simple-image-viewer__previous,
          .react-simple-image-viewer__close {
              color: white !important;
          }
      `}</style> */}
      </div>
    </PhotoProvider>
  );
}