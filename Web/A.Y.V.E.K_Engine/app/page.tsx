"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"

const SHOWCASE = [
  "/Show_Case_01.png",
  "/Show_Case_02.png",
  "/Show_Case_03.png",
  "/Show_Case_04.png",
]

export default function Landing() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [entering, setEntering] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80)
    return () => clearTimeout(t)
  }, [])

  // Background slideshow
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((c) => (c + 1) % SHOWCASE.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleEnter = () => {
    setEntering(true)
    setTimeout(() => router.push("/playground"), 700)
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden select-none">

      {/* ── Background images ─────────────────────────────────────── */}

      {/* Tüm görseller üst üste, sadece aktif olan görünür */}
      {SHOWCASE.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 z-0"
          style={{
            opacity: i === current ? 1 : 0,
            transition: "opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <img
            src={src}
            alt=""
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.55) saturate(0.9)" }}
          />
        </div>
      ))}

      {/* Deep vignette overlay */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 75% 75% at 50% 50%, transparent 40%, rgba(0,0,0,0.25) 75%, rgba(0,0,0,0.65) 100%)",
        }}
      />

      {/* Bottom fade to black */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 z-[1] pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.7))",
        }}
      />

      {/* Top fade to black */}
      <div
        className="absolute top-0 left-0 right-0 h-24 z-[1] pointer-events-none"
        style={{
          background: "linear-gradient(to top, transparent, rgba(0,0,0,0.45))",
        }}
      />



      {/* ── Main content ──────────────────────────────────────────── */}
      <div
        className="relative z-10 flex flex-col items-center gap-12 transition-all duration-[1200ms] ease-out"
        style={{
          opacity: mounted && !entering ? 1 : 0,
          transform: entering
            ? "scale(0.96) translateY(-8px)"
            : mounted
            ? "translateY(0)"
            : "translateY(24px)",
          filter: entering ? "blur(6px)" : "none",
        }}
      >
        {/* Logo block */}
        <div className="flex flex-col items-center gap-5">
          <h1
            className="text-white tracking-[0.55em] uppercase"
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontWeight: 100,
              fontSize: "clamp(1.6rem, 4vw, 2.8rem)",
              textShadow: "0 2px 40px rgba(0,0,0,0.8)",
            }}
          >
            A.Y.V.E.K
          </h1>

          {/* Thin decorative line */}
          <div
            className="h-px transition-all duration-[2000ms] delay-300"
            style={{
              width: mounted ? "100px" : "0px",
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)",
            }}
          />

          {/* Subtitle */}
          <p
            className="text-white/40 tracking-[0.3em] uppercase transition-all duration-[1800ms] delay-500"
            style={{
              fontWeight: 300,
              fontSize: "0.6rem",
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(6px)",
            }}
          >
            AI Image Generation
          </p>
        </div>

        {/* Under Development badge */}
        <div
          className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/[0.1] bg-black/30 backdrop-blur-md transition-all duration-[2000ms] delay-700"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(8px)",
          }}
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/50 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white/40" />
          </span>
          <span
            className="text-[9px] tracking-[0.3em] uppercase font-light text-white/30"
          >
            Under Development
          </span>
        </div>

        {/* CTA button */}
        <div
          className="transition-all duration-[2000ms] delay-[900ms]"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(10px)",
          }}
        >
          <button
            onClick={handleEnter}
            className="group relative flex items-center gap-3 px-8 py-4 rounded-full overflow-hidden transition-all duration-300"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              backdropFilter: "blur(12px)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.11)"
              e.currentTarget.style.border = "1px solid rgba(255,255,255,0.22)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.06)"
              e.currentTarget.style.border = "1px solid rgba(255,255,255,0.12)"
            }}
          >
            {/* Inner glow */}
            <span
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(255,255,255,0.06) 0%, transparent 70%)",
              }}
            />

            <span className="text-white/55 group-hover:text-white/85 text-xs tracking-[0.28em] uppercase font-light transition-colors duration-300 relative z-10">
              Enter Playground
            </span>

            <ArrowRight className="w-3.5 h-3.5 text-white/25 group-hover:text-white/60 group-hover:translate-x-0.5 transition-all duration-300 relative z-10" />
          </button>
        </div>
      </div>

      {/* ── Bottom version tag ────────────────────────────────────── */}
      <div
        className="absolute bottom-8 right-8 z-10 transition-all duration-[2500ms] delay-[1200ms]"
        style={{ opacity: mounted ? 0.25 : 0 }}
      >
        <span className="text-white/60 text-[9px] tracking-[0.3em] uppercase font-light">
          v0.1 — Early Access
        </span>
      </div>

    
    </main>
  )
}
