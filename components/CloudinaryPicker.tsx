"use client";
import { useRef } from "react";

export default function CloudinaryPicker({ onUpload }: any) {
  const cloudinaryRef = useRef<any>(null);
  const widgetRef = useRef<any>(null);

  const openWidget = () => {
    if (!cloudinaryRef.current) return;

    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "drayl5ppi",
        uploadPreset: "lohagarh",
        sources: ["local", "url", "camera", "image_search"],
        multiple: false,
      },
      function (error: any, result: any) {
        if (!error && result && result.event === "success") {
          onUpload(result.info.secure_url);
        }
      }
    );

    widgetRef.current.open();
  };

  if (typeof window !== "undefined" && !cloudinaryRef.current) {
    cloudinaryRef.current = (window as any).cloudinary;
  }

  return (
    <button onClick={openWidget}>
      Select Image
    </button>
  );
}