"use client"

import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect, useCallback, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { AuthModal } from "@/components/auth-modal"
import { getSiteUrl } from "@/lib/utils"

// 4 Evolving Story Images
const heroImages = [
  "/showcase/Show_Case_01.png",
  "/showcase/Show_Case_02.png",
  "/showcase/Show_Case_03.png",
  "/showcase/Show_Case_04.png",
]

export function HeroSection() {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [nextIndex, setNextIndex] = useState(1)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  // Auth Modal State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authView, setAuthView] = useState<'signin' | 'signup'>('signin')

  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const SLIDE_DURATION = 6000 // 6 seconds per image

  useEffect(() => {
    setMounted(true)
  }, [])

  const nextSlide = useCallback(() => {
    if (isExiting) return
    setIsTransitioning(true)

    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length)
      setNextIndex((prev) => (prev + 1) % heroImages.length)

      setTimeout(() => {
        setIsTransitioning(false)
      }, 100)
    }, 2000) // 2 seconds transition duration
  }, [isExiting])

  useEffect(() => {
    if (!mounted || isExiting) return
    intervalRef.current = setInterval(nextSlide, SLIDE_DURATION)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [nextSlide, mounted, isExiting])

  const handleCinematicExit = async (model?: string) => {
    setIsExiting(true)
    // Wait for The Void Fade animation (1.5s to allow full effect)
    await new Promise(resolve => setTimeout(resolve, 1500))
    const baseUrl = getSiteUrl()
    // Default to A3 (Titan) if no model specified
    const targetModel = model || 'A3'
    const targetUrl = `/dream_engine/A.Y.V.E.K-${targetModel}`

    // Use client-side routing if possible, otherwise fallback
    router.push(targetUrl)
  }

  const openAuth = (view: 'signin' | 'signup') => {
    setAuthView(view)
    setIsAuthModalOpen(true)
  }

  return (
    <>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialView={authView}
      />

      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden bg-black">

        {/* ============================================= */}
        {/* TOP NAVBAR - IDENTICAL TO APP (Port 3001) */}
        {/* ============================================= */}
        <div className="absolute top-0 left-0 w-full px-6 py-8 z-50 flex justify-between items-center pointer-events-none">

          {/* LEFT: THE SURVIVOR LOGO - Geist Sans Luxury */}
          <div className={`flex flex-col transition-all duration-1000 ${isExiting ? 'opacity-100' : 'opacity-0 animate-nav-in'}`} style={{ animationDelay: '0s', animationFillMode: 'forwards' }}>
            <h1
              className="text-white text-base tracking-[0.6em] uppercase"
              style={{
                fontFamily: 'var(--font-geist-sans)',
                fontWeight: 200,
                letterSpacing: '0.6em'
              }}
            >
              A.Y.V.E.K
            </h1>
            <div className="relative h-px w-16 mt-2.5 overflow-visible">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/30 transition-opacity duration-1000" />
            </div>
          </div>

          {/* RIGHT: AUTH BUTTONS - Fade out on exit */}
          <div
            className={`flex items-center gap-2 pointer-events-auto transition-all duration-700 ${isExiting ? 'opacity-0 translate-y-[-10px]' : 'opacity-0 animate-nav-in'}`}
            style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
          >
            {/* Sign In - Text Button */}
            <button
              onClick={() => openAuth('signin')}
              className="h-10 px-6 rounded-full text-white/70 hover:text-white text-sm font-medium tracking-wide transition-all duration-300 hover:bg-white/5"
            >
              Sign In
            </button>

            {/* Sign Up - Clean Button (No Glass Frame) */}
            <button
              onClick={() => openAuth('signup')}
              className="h-10 px-6 rounded-full bg-white text-black hover:bg-neutral-200 text-sm font-medium tracking-wide transition-all duration-300 transform hover:scale-105"
            >
              Sign Up
            </button>
          </div>

        </div>

        {/* ============================================= */}
        {/* FULLSCREEN BACKGROUND */}
        {/* ============================================= */}
        <div className={`absolute inset-0 z-0 transition-all duration-[2000ms] ease-in-out ${isExiting ? 'opacity-0 scale-110 blur-3xl' : 'opacity-100'}`}>
          {mounted && heroImages.map((src, index) => (
            <div
              key={src}
              className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${index === currentIndex && !isTransitioning
                ? 'opacity-100'
                : index === nextIndex && isTransitioning
                  ? 'opacity-100'
                  : 'opacity-0'
                }`}
            >
              <Image
                src={src}
                alt="A.Y.V.E.K Cinematic Art"
                fill
                className={`object-cover ${index === currentIndex
                  ? 'animate-ken-burns-titan'
                  : 'scale-100'
                  }`}
                priority={index < 2}
              />
            </div>
          ))}
          {!mounted && <div className="absolute inset-0 bg-black" />}
        </div>

        {/* ============================================= */}
        {/* CINEMATIC OVERLAYS & VIGNETTE */}
        {/* ============================================= */}
        <div className={`absolute inset-0 z-[1] transition-opacity duration-[2000ms] ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
          <div className="absolute inset-x-0 top-0 h-[40%] bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-black/95 via-black/50 to-transparent pointer-events-none" />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 90% 70% at 50% 50%, transparent 40%, rgba(0,0,0,0.6) 100%)'
            }}
          />
          {/* Center spotlight behind text */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[500px] bg-black/40 blur-[100px] rounded-full pointer-events-none"
          />
        </div>

        {/* ============================================= */}
        {/* MAIN CONTENT CENTER */}
        {/* ============================================= */}
        <div className="relative z-10 flex flex-col items-center animate-in-active">

          {/* Badge - Clickable, goes to Engine with A3 model */}
          <div
            className={`mb-8 transition-all duration-[2000ms] ease-out ${isExiting ? 'opacity-0 -translate-y-10 blur-sm' : 'opacity-0 translate-y-4 animate-nav-in'}`}
            style={{ animationDelay: '0.4s', animationFillMode: 'forwards', transitionTimingFunction: 'cubic-bezier(0.2, 0.8, 0.2, 1)' }}
          >
            <button
              onClick={() => handleCinematicExit('A3')}
              className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 hover:bg-white/10 px-4 py-1.5 rounded-full inline-flex items-center gap-2 text-sm text-white/80 hover:text-white shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-all duration-300 cursor-pointer group"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-200 group-hover:text-amber-400 transition-colors" />
              <span className="tracking-wide">Introducing A.Y.V.E.K Titan Engine</span>
            </button>
          </div>

          {/* Hero Title */}
          <h1 className="text-center space-y-2 relative">

            {/* Main CENTER Logo - Geist Sans Luxury Design */}
            <span
              className={`block text-6xl sm:text-7xl md:text-8xl leading-none transition-all duration-[2000ms] cubic-bezier(0.2, 0.8, 0.2, 1) ${isExiting
                ? 'opacity-0 blur-xl scale-95'
                : 'opacity-0 translate-y-8 animate-nav-in'
                }`}
              style={{
                fontFamily: 'var(--font-geist-sans)',
                fontWeight: 200,
                animationDelay: '0.6s',
                animationFillMode: 'forwards',
                color: '#FFFFFF',
                letterSpacing: '0.6em',
                textShadow: '0 2px 40px rgba(255,255,255,0.08)'
              }}
            >
              A.Y.V.E.K
            </span>

            {/* Slogan - Fades out */}
            <div
              className={`transition-all duration-[2000ms] ease-out ${isExiting ? 'opacity-0 translate-y-10 blur-sm' : ''}`}
            >
              <span
                className="block text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight opacity-0 translate-y-8 animate-nav-in"
                style={{
                  fontFamily: 'var(--font-display)',
                  animationDelay: '0.8s',
                  animationFillMode: 'forwards',
                  color: 'rgba(255,255,255,0.9)'
                }}
              >
                is the new way to{' '}
                {/* AMBER + GLASS "imagine." */}
                <span className="relative inline-block backdrop-blur-[2px]">
                  <span className="bg-gradient-to-r from-amber-200/90 via-amber-400/80 to-amber-200/90 bg-clip-text text-transparent">
                    imagine.
                  </span>
                </span>
              </span>
            </div>
          </h1>

          {/* Description - Fades out */}
          <p
            className={`mt-8 text-center max-w-2xl text-lg md:text-xl text-white/70 font-light leading-relaxed transition-all duration-[2000ms] ease-out ${isExiting ? 'opacity-0 translate-y-10 blur-sm' : 'opacity-0 translate-y-8 animate-nav-in'
              }`}
            style={{ animationDelay: isExiting ? '0s' : '1.1s', animationFillMode: 'forwards' }}
          >
            Transform your words into breathtaking imagery. Next-generation AI
            generation with <span className="text-white font-medium">unrivaled realism.</span>
          </p>

          {/* CTA Button - Fades out */}
          <div
            className={`mt-12 relative group transition-all duration-[2000ms] ease-out ${isExiting ? 'opacity-0 translate-y-20 blur-md scale-90' : 'opacity-0 translate-y-8 animate-nav-in'
              }`}
            style={{ animationDelay: isExiting ? '0s' : '1.3s', animationFillMode: 'forwards' }}
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-200 via-white to-amber-200 rounded-full opacity-20 group-hover:opacity-60 blur-lg transition-all duration-700" />
            <Button
              className="relative h-14 px-10 rounded-full bg-white text-black hover:bg-white text-base font-semibold tracking-wide transition-all duration-300 hover:scale-[1.03] overflow-hidden pointer-events-auto"
              onClick={() => handleCinematicExit()}
            >
              <span className="relative z-10 flex items-center">
                Start Creating
                <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Button>
          </div>

        </div>

        {/* Scroll indicator - Fades out */}
        <div
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 transition-all duration-700 ${isExiting ? 'opacity-0 translate-y-10' : 'opacity-0 animate-nav-in'
            }`}
          style={{ animationDelay: '1.8s', animationFillMode: 'forwards' }}
        >
          <span className="text-white/40 text-[10px] tracking-[0.2em] uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </section>
    </>
  )
}
