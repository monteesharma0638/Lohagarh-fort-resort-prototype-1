"use client";
import { useRef } from "react";
import { Button } from "./ui/button";
import Swal from "sweetalert2";

export default function CloudinaryPicker({ onUpload }: {onUpload: (url: string) => void}) {
  const cloudinaryRef = useRef<any>(null);
  const widgetRef = useRef<any>(null);

  const openWidget = () => {
    if (!cloudinaryRef.current) return;
    console.log("Opening the widget");

    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "drayl5ppi",
        uploadPreset: "lohagarh",
        sources: ["local", "url", "camera", "image_search"],
        multiple: false,
      },
      function (error: any, result: any) {
        if (!error && result && result.event === "success") {
          Swal.fire({
            title: "Uploaded Successfully",
            icon: "success",
            timer: 1000
          })
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
    <Button onClick={openWidget}>
      Select Image
    </Button>
  );
}