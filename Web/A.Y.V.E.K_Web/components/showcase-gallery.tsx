"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Image from "next/image"
import { getEngineUrl } from "@/lib/utils"

const showcaseImages = [
    { id: 1, src: "/showcase/1.jpeg" },
    { id: 2, src: "/showcase/2.jpeg" },
    { id: 3, src: "/showcase/3.jpeg" },
    { id: 4, src: "/showcase/4.jpeg" },
    { id: 5, src: "/showcase/5.jpeg" },
    { id: 6, src: "/showcase/6.jpeg" },
    { id: 7, src: "/showcase/7.jpeg" },
    { id: 8, src: "/showcase/8.jpeg" },
    { id: 9, src: "/showcase/9.jpeg" },
    { id: 10, src: "/showcase/10.jpeg" },
    { id: 11, src: "/showcase/11.jpeg" },
    { id: 12, src: "/showcase/12.jpeg" },
    { id: 13, src: "/showcase/13.jpeg" },
    { id: 14, src: "/showcase/14.jpeg" },
]

export function ShowcaseGallery() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [nextIndex, setNextIndex] = useState(1)
    const [isTransitioning, setIsTransitioning] = useState(false)
    const [mounted, setMounted] = useState(false)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    const SLIDE_DURATION = 2500 // 2.5 seconds - faster transitions

    useEffect(() => {
        setMounted(true)
    }, [])

    const nextSlide = useCallback(() => {
        setIsTransitioning(true)

        setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % showcaseImages.length)
            setNextIndex((prev) => (prev + 1) % showcaseImages.length)
            setIsTransitioning(false)
        }, 800) // Transition duration
    }, [])

    useEffect(() => {
        if (!mounted) return
        intervalRef.current = setInterval(nextSlide, SLIDE_DURATION)
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current)
        }
    }, [nextSlide, mounted])

    const handleLaunchApp = () => {
        window.open(getEngineUrl(), '_self')
    }

    if (!mounted) {
        return (
            <section className="relative w-full max-w-5xl mx-auto px-4">
                <div className="relative rounded-3xl overflow-hidden bg-black aspect-[16/10]" />
            </section>
        )
    }

    return (
        <section
            className="relative w-full max-w-5xl mx-auto px-4 cursor-pointer group"
            onClick={handleLaunchApp}
        >
            {/* Outer Premium Glow - Always visible, intensifies on hover */}
            <div className="absolute -inset-4 bg-gradient-to-r from-amber-600/0 via-amber-500/20 to-amber-600/0 rounded-[2rem] blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />

            {/* Rotating Border Glow */}
            <div className="absolute -inset-[2px] rounded-3xl overflow-hidden">
                <div
                    className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent,rgba(245,158,11,0.4),transparent,rgba(245,158,11,0.2),transparent)]"
                    style={{
                        animation: 'spin 8s linear infinite'
                    }}
                />
            </div>

            {/* Main Container */}
            <div className="relative rounded-3xl overflow-hidden bg-black border border-white/10 shadow-2xl">

                {/* Image Container - 16:10 Aspect Ratio */}
                <div className="relative aspect-[16/10] overflow-hidden">

                    {/* Current Image with Ken Burns */}
                    <div
                        className={`absolute inset-0 transition-all duration-[800ms] ease-out ${isTransitioning ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
                            }`}
                    >
                        <Image
                            src={showcaseImages[currentIndex].src}
                            alt="A.Y.V.E.K Generated"
                            fill
                            className="object-cover transition-transform duration-[3000ms] ease-out scale-100 group-hover:scale-105"
                            priority
                        />
                    </div>

                    {/* Next Image (preloaded, fades in) */}
                    <div
                        className={`absolute inset-0 transition-all duration-[800ms] ease-out ${isTransitioning ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
                            }`}
                    >
                        <Image
                            src={showcaseImages[nextIndex].src}
                            alt="A.Y.V.E.K Generated"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    {/* Cinematic Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 pointer-events-none" />

                    {/* Film Grain Effect */}
                    <div
                        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
                        }}
                    />

                    {/* Top Fade Mask */}
                    <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent pointer-events-none" />

                    {/* Bottom Heavy Fade - Creates Mystery */}
                    <div
                        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
                        style={{
                            background: 'linear-gradient(to top, rgb(0,0,0) 0%, rgba(0,0,0,0.95) 30%, rgba(0,0,0,0.6) 60%, transparent 100%)'
                        }}
                    />

                    {/* A.Y.V.E.K Branding - Bottom Left */}
                    <div className="absolute bottom-8 left-8 flex items-center gap-3 z-10">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.8)]" />
                            <span className="text-white/90 text-sm font-medium tracking-[0.3em] uppercase">A.Y.V.E.K</span>
                        </div>
                        <div className="w-px h-4 bg-white/20" />
                        <span className="text-white/50 text-xs tracking-widest">AI GENERATION</span>
                    </div>

                    {/* Image Counter - Bottom Right */}
                    <div className="absolute bottom-8 right-8 z-10">
                        <div className="flex items-center gap-2 text-white/40 text-sm font-light tracking-widest">
                            <span className="text-white/80 font-medium">{String(currentIndex + 1).padStart(2, '0')}</span>
                            <span>/</span>
                            <span>{String(showcaseImages.length).padStart(2, '0')}</span>
                        </div>
                    </div>

                    {/* Hover Call to Action */}
                    <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${'opacity-0 group-hover:opacity-100'
                        }`}>
                        <div className="flex flex-col items-center gap-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            {/* Glowing Button */}
                            <div className="relative">
                                <div className="absolute -inset-4 bg-white/20 rounded-full blur-xl animate-pulse" />
                                <div className="relative w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center">
                                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </div>
                            </div>
                            <span className="text-white/90 text-sm font-medium tracking-[0.3em] uppercase">Start Creating</span>
                        </div>
                    </div>

                    {/* Subtle Progress Indicator */}
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5">
                        <div
                            className="h-full bg-gradient-to-r from-amber-400 to-amber-500"
                            style={{
                                animation: `progressBar ${SLIDE_DURATION}ms linear infinite`
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* CSS Animations */}
            <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes progressBar {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
        </section>
    )
}
