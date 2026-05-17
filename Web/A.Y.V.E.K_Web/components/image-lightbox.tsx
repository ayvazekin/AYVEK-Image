"use client"

import { useEffect } from "react"
import { X } from "lucide-react"

interface ImageLightboxProps {
  imageUrl: string
  isOpen: boolean
  onClose: () => void
}

export function ImageLightbox({ imageUrl, isOpen, onClose }: ImageLightboxProps) {
  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 z-[300] flex items-center justify-center animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-neutral-900/80 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-neutral-800 transition-all"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Image */}
      <div 
        className="relative max-w-[90vw] max-h-[90vh] animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl || "/placeholder.svg"}
          alt="Enlarged view"
          className="max-w-full max-h-[90vh] rounded-2xl shadow-2xl object-contain"
          crossOrigin="anonymous"
        />
        
        {/* Glass border */}
        <div className="absolute inset-0 rounded-2xl border border-white/10 pointer-events-none" />
      </div>
    </div>
  )
}
