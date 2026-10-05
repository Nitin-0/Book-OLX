"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { X } from "lucide-react";

export function LightboxModal() {
  const { lightboxSrc, closeLightbox } = useApp();

  if (!lightboxSrc) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90" onClick={closeLightbox} />
      <img
        src={lightboxSrc}
        className="relative max-w-full max-h-[85vh] rounded-2xl shadow-2xl pop-in object-contain z-10"
        alt="Enlarged view"
      />
      <button
        onClick={closeLightbox}
        className="absolute top-4 right-4 w-11 h-11 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center z-20 cursor-pointer transition"
      >
        <X className="w-6 h-6" />
      </button>
    </div>
  );
}
