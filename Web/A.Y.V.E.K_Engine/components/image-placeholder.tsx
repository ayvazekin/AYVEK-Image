"use client"

import { useState, useEffect, useRef } from "react"
import { Download, MoreHorizontal, Heart, Trash2, MessageSquare } from "lucide-react"
import { MODEL_COLORS, type ModelType, type AspectRatio } from "@/lib/types"

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
  const [glassOpacity, setGlassOpacity] = useState(1)
  const [displayedProgress, setDisplayedProgress] = useState(0)

  // Intro Animation States
  const [introState, setIntroState] = useState<'fullscreen' | 'shrinking' | 'done'>('done')
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null)

  const downloadRef = useRef<HTMLDivElement>(null)
  const moreRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const color = MODEL_COLORS[modelColor]

  // Dimensions based on aspect ratio
  const dimensions = aspectRatio === "horizontal"
    ? { width: 480, height: 270 }
    : { width: 270, height: 480 }

  // Start intro animation on mount if generating
  useEffect(() => {
    if (isGenerating && progress < 10) {
      setIntroState('fullscreen')

      const shrinkTimer = setTimeout(() => {
        if (containerRef.current) {
          setTargetRect(containerRef.current.getBoundingClientRect())
          setIntroState('shrinking')
        }
      }, 1500) // Stay fullscreen for 1.5s

      const doneTimer = setTimeout(() => {
        setIntroState('done')
      }, 2500) // Transition duration

      return () => {
        clearTimeout(shrinkTimer)
        clearTimeout(doneTimer)
      }
    }
  }, []) // Empty deps to run once on mount

  // Typewriter effect for progress
  useEffect(() => {
    if (isGenerating) {
      const target = Math.min(Math.round(progress), 100)
      if (displayedProgress < target) {
        const timeout = setTimeout(() => {
          setDisplayedProgress(prev => Math.min(prev + 1, target))
        }, 30)
        return () => clearTimeout(timeout)
      }
    } else if (!isGenerating && isRevealed) {
      setDisplayedProgress(100)
    }
  }, [progress, displayedProgress, isGenerating, isRevealed])

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

  // Fade out glass effect 2 seconds after reveal
  useEffect(() => {
    if (isRevealed) {
      setGlassOpacity(1)
      const timeout = setTimeout(() => {
        setGlassOpacity(0)
      }, 2000)
      return () => clearTimeout(timeout)
    } else {
      setGlassOpacity(1)
    }
  }, [isRevealed])

  const handleDownloadClick = (resolution: string, isPremium: boolean) => {
    if (isPremium) return
    setShowDownloadMenu(false)
    onDownload(resolution)
  }

  // Map internal model IDs to display names
  const modelShortName = modelColor === "A1" ? "A1.0" :
    modelColor === "A2" ? "A2.0" : "A3.0"

  // Intro Overlay Render
  const renderIntro = () => {
    if (introState === 'done') return null

    const style = introState === 'fullscreen' ? {
      position: 'fixed' as const,
      inset: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 100,
      borderRadius: 0,
    } : {
      position: 'fixed' as const,
      top: targetRect?.top ?? 0,
      left: targetRect?.left ?? 0,
      width: targetRect?.width ?? '100vw',
      height: targetRect?.height ?? '100vh',
      zIndex: 100,
      borderRadius: '1rem',
      transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)'
    }

    return (
      <div
        style={style}
        className="overflow-hidden backdrop-blur-3xl bg-neutral-900/60 border border-white/10 shadow-2xl flex items-center justify-center"
      >
        <style jsx>{`
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}</style>

        {/* Shimmer Effect */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent w-full h-full"
          style={{ animation: 'shimmer 2s infinite linear' }}
        />

        {/* Large Loader for Fullscreen */}
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div
            className="w-12 h-12 rounded-full border-2 border-t-transparent animate-spin"
            style={{ borderColor: `${color.primary}80 transparent ${color.primary}80 ${color.primary}80` }}
          />
          <span className="text-white/60 text-sm font-medium tracking-widest uppercase">Creating Masterpiece</span>
          <span className="text-white/40 text-xs font-mono">{displayedProgress}%</span>
        </div>
      </div>
    )
  }

  return (
    <>
      {renderIntro()}

      <div
        ref={containerRef}
        className="relative group transition-opacity duration-700"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          width: dimensions.width,
          height: dimensions.height,
          opacity: introState !== 'done' ? 0 : 1 // Hide actual placeholder during intro
        }}
      >
        {/* Main container */}
        <div
          className="relative w-full h-full rounded-2xl overflow-hidden cursor-pointer"
          onClick={() => isRevealed && onImageClick()}
          style={{
            boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.5)`,
          }}
        >
          {/* Actual image - always present behind glass */}
          <div className="absolute inset-0 w-full h-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl || "/placeholder.svg"}
              alt="Generated image"
              className="w-full h-full object-cover"
              crossOrigin="anonymous"
            />
          </div>

          {/* Apple Glass Frosted Overlay (Refined for Vibrant Glass) */}
          <div
            className="absolute inset-0 transition-all duration-1000 ease-out pointer-events-none"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: isRevealed
                ? `blur(${glassOpacity * 24}px)`
                : 'blur(24px)',
              opacity: isRevealed ? glassOpacity : 1,
            }}
          />

          {/* Subtle glass border */}
          <div
            className="absolute inset-0 rounded-2xl border border-white/10 pointer-events-none transition-opacity duration-1000"
            style={{ opacity: glassOpacity > 0 || !isRevealed ? 0.3 : 0.1 }}
          />

          {/* Top highlight reflection */}
          <div
            className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-white/5 to-transparent pointer-events-none transition-opacity duration-1000"
            style={{ opacity: glassOpacity > 0 || !isRevealed ? 0.8 : 0.2 }}
          />

          {/* Loading indicator with typewriter progress (Small contained version) */}
          {(isGenerating || (!isRevealed && glassOpacity > 0)) && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
                  style={{ borderColor: `${color.primary}40 transparent ${color.primary}40 ${color.primary}40` }}
                />
                <div className="flex flex-col items-center">
                  <span className="text-white/40 text-xs font-medium tracking-wider">Generating</span>
                  <span
                    className="text-white/30 text-[10px] font-mono mt-0.5"
                    style={{ fontVariantNumeric: 'tabular-nums' }}
                  >
                    {displayedProgress}%
                  </span>
                </div>
              </div>
            </div>
          )}

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
      </div>
    </>
  )
}
