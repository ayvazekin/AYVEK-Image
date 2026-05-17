"use client"

import { useState, useEffect, useRef } from "react"
import { Download, MoreHorizontal, Heart, Trash2, MessageSquare } from "lucide-react"
import { MODEL_COLORS, type ModelType, type AspectRatio } from "@/lib/types"
import { motion, AnimatePresence } from "framer-motion"

interface ImagePlaceholderProps {
  aspectRatio: AspectRatio
  isGenerating: boolean
  isRevealed: boolean
  modelColor: ModelType
  imageUrl?: string | null
  onDownload: (resolution: string) => void
  onImageClick: () => void
  progress?: number
}

export function ImagePlaceholder({
  aspectRatio,
  isGenerating,
  isRevealed,
  modelColor,
  imageUrl,
  onDownload,
  onImageClick,
  progress = 0,
}: ImagePlaceholderProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorited, setIsFavorited] = useState(false)
  const [showDownloadMenu, setShowDownloadMenu] = useState(false)
  const [showMoreMenu, setShowMoreMenu] = useState(false)
  const [displayedProgress, setDisplayedProgress] = useState(0)

  // Curtain Reveal State
  const [startReveal, setStartReveal] = useState(false)
  const [animationFinished, setAnimationFinished] = useState(false)

  const downloadRef = useRef<HTMLDivElement>(null)
  const moreRef = useRef<HTMLDivElement>(null)

  const color = MODEL_COLORS[modelColor]

  // Dimensions based on aspect ratio
  const dimensions = aspectRatio === "horizontal"
    ? { width: 560, height: 315 }
    : { width: 315, height: 560 }

  // Typewriter effect for progress & Reveal Trigger
  useEffect(() => {
    if (isGenerating) {
      const target = Math.min(Math.round(progress), 100)

      // Trigger reveal animation slightly before completion
      if (target >= 98 && !startReveal) {
        setStartReveal(true)
      }

      if (displayedProgress < target) {
        const timeout = setTimeout(() => {
          setDisplayedProgress(prev => Math.min(prev + 1, target))
        }, 30)
        return () => clearTimeout(timeout)
      }
    } else if (!isGenerating && isRevealed) {
      setDisplayedProgress(100)
      setStartReveal(true) // Ensure reveal happens if we jump straight to done
    } else {
      // Reset
      setStartReveal(false)
      setDisplayedProgress(0)
    }
  }, [progress, displayedProgress, isGenerating, isRevealed, startReveal])

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (downloadRef.current && !downloadRef.current.contains(event.target as Node)) {
        setShowDownloadMenu(false)
      }
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setShowMoreMenu(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleDownloadClick = (resolution: string, isPremium: boolean) => {
    if (isPremium) return
    setShowDownloadMenu(false)
    onDownload(resolution)
  }

  // Map internal model IDs to display names
  const modelShortName = modelColor === "A1" ? "A1.0" :
    modelColor === "A2" ? "A2.0" : "A3.0"

  return (
    <div
      className="relative group transition-opacity duration-700"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: dimensions.width,
        height: dimensions.height,
      }}
    >
      {/* Main container */}
      <div
        className="relative w-full h-full rounded-2xl overflow-hidden cursor-pointer bg-black/40"
        onClick={() => isRevealed && onImageClick()}
        style={{
          boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.5)`,
        }}
      >
        {/* ========================================================= */}
        {/* GENERATED IMAGE LAYER */}
        {/* ========================================================= */}
        <div className="absolute inset-0 w-full h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl || "/placeholder.svg"}
            alt="Generated image"
            className="w-full h-full object-cover"
            crossOrigin="anonymous"
          />
        </div>

        {/* ========================================================= */}
        {/* FROSTED GLASS & CURTAIN MASK LAYER */}
        {/* ========================================================= */}
        {/* 
            We use a motion div that slides OUT to reveal the image.
            Initial: Covers the image with Frosted Glass.
            Animate: Slides rapidly to the right.
        */}
        <AnimatePresence>
          {!animationFinished && (
            <motion.div
              initial={{ x: "0%" }}
              animate={
                startReveal
                  ? { x: "100%" }
                  : { x: "0%" }
              }
              transition={{
                duration: 2.5, // Fixed slow duration
                ease: "easeInOut", // Balanced, controlled motion (no sudden jumps)
                delay: 0
              }}
              onAnimationComplete={() => {
                if (startReveal) {
                  setAnimationFinished(true)
                }
              }}
              className="absolute inset-0 z-20 overflow-hidden bg-black"
            >
              {/* The Cover - PITCH BLACK with Subtle Shine */}
              <div className="absolute inset-0 w-full h-full bg-black">
                {/* Subtle Apple-like Glass Shine Animation */}
                <div
                  className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
                  style={{
                    background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 45%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.1) 55%, transparent 60%)',
                    backgroundSize: '200% 100%',
                    animation: 'shine 3s infinite linear'
                  }}
                />
                <style jsx>{`
                  @keyframes shine {
                    0% { background-position: 150% 0; }
                    100% { background-position: -50% 0; }
                  }
                `}</style>
              </div>

              {/* NEON CURTAIN STRIP - BRIGHT WHITE & PREMIUM */}
              {/* This moves WITH the container because it's absolute right-0 of the moving container? 
                      No, the container is revealing from left to right (x: 100%).
                      Basically the 'black' box is moving x: 0% -> x: 100%. 
                      The neon strip should be on the LEFT edge of this moving box?
                      Wait, if the box moves 0 -> 100 (Right), the Left edge moves away.
                      If the user wants a "Curtain" opening effect:
                      A div covering the image (x:0). It slides to the RIGHT (x:100).
                      The neon strip should be on the LEFT edge of this sliding div? No, that would mean the neon strip is at x=0 initially and moves to x=width.
                      YES.
                   */}
              {startReveal && (
                <div
                  className="absolute inset-y-0 left-0 w-[6px] h-full shadow-[0_0_60px_20px_rgba(255,255,255,0.6)] z-50"
                  style={{
                    background: '#FFFFFF',
                    transform: 'translateX(-3px)', // Center centered on the cut line
                  }}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>



        {/* Model name on hover */}
        {isRevealed && (
          <div
            className={`absolute top-3 left-3 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 transition-all duration-300 flex items-center gap-2 ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
              }`}
          >
            {/* Dot indicator */}
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{
                backgroundColor: color.primary,
                boxShadow: `0 0 6px ${color.glow}`
              }}
            />
            <span className="text-white/80 text-[10px] font-medium tracking-wide">{modelShortName}</span>
          </div>
        )}

        {/* Hover Actions */}
        <div
          className={`absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 transition-all duration-300 ${isHovered && isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Download Button with Dropdown */}
          <div className="relative" ref={downloadRef}>
            <button
              onClick={() => {
                setShowDownloadMenu(!showDownloadMenu)
                setShowMoreMenu(false)
              }}
              className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-lg border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-black/80 transition-all"
            >
              <Download className="w-4 h-4" />
            </button>

            {/* Download Dropdown */}
            {showDownloadMenu && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-40 rounded-xl bg-neutral-950 border border-neutral-800 shadow-2xl overflow-hidden z-[150]">
                {[
                  { res: "1K", premium: false },
                  { res: "2K", premium: false },
                  { res: "4K", premium: true },
                  { res: "8K", premium: true },
                ].map(({ res, premium }) => (
                  <button
                    key={res}
                    onClick={() => handleDownloadClick(res, premium)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 transition-all ${premium
                      ? "text-neutral-600 cursor-not-allowed"
                      : "text-neutral-300 hover:bg-neutral-900"
                      }`}
                    disabled={premium}
                  >
                    <div className="flex items-center gap-2">
                      {res === "1K" ? (
                        <Download className="w-4 h-4" />
                      ) : (
                        <span className="w-4 h-4 rounded text-[10px] font-bold flex items-center justify-center bg-neutral-800 text-neutral-400">
                          {res.replace("K", "")}K
                        </span>
                      )}
                      <span className="text-sm">Download {res}</span>
                    </div>
                    {premium && (
                      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-500">
                        Upgrade
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* More Options Button with Dropdown */}
          <div className="relative" ref={moreRef}>
            <button
              onClick={() => {
                setShowMoreMenu(!showMoreMenu)
                setShowDownloadMenu(false)
              }}
              className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-lg border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-black/80 transition-all"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>

            {/* More Options Dropdown */}
            {showMoreMenu && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-40 rounded-xl bg-neutral-950 border border-neutral-800 shadow-2xl overflow-hidden z-[150]">
                <button
                  onClick={() => setShowMoreMenu(false)}
                  className="w-full flex items-center gap-2 px-3 py-2.5 text-neutral-300 hover:bg-neutral-900 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="text-sm">Delete</span>
                </button>
                <button
                  onClick={() => setShowMoreMenu(false)}
                  className="w-full flex items-center gap-2 px-3 py-2.5 text-neutral-300 hover:bg-neutral-900 transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-sm">Send Feedback</span>
                </button>
              </div>
            )}
          </div>

          {/* Favorite Button */}
          <button
            onClick={() => setIsFavorited(!isFavorited)}
            className={`w-10 h-10 rounded-full backdrop-blur-lg border border-white/10 flex items-center justify-center transition-all ${isFavorited
              ? "bg-red-500/80 text-white"
              : "bg-black/60 text-white/80 hover:text-white hover:bg-black/80"
              }`}
          >
            <Heart className={`w-4 h-4 ${isFavorited ? "fill-current" : ""}`} />
          </button>
        </div>
      </div>
    </div >
  )
}
