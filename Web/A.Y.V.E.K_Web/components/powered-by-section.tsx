"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export function PoweredBySection() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  })

  // Start deeper below (positive y) and move up to 0 - Heavy, elegant rise
  const y = useTransform(scrollYProgress, [0, 0.6], [150, 0])
  const opacity = useTransform(scrollYProgress, [0.1, 0.5], [0, 1])

  // World line animation - glows as text rises
  const lineOpacity = useTransform(scrollYProgress, [0.2, 0.6], [0, 1])
  const lineScale = useTransform(scrollYProgress, [0.2, 0.6], [0.5, 1])

  return (
    <section ref={containerRef} className="py-20 px-6 relative overflow-hidden min-h-[60vh] flex flex-col items-center justify-center">
      {/* Subtle red gradient background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Center radial gradient - subtle red */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-radial from-red-950/20 via-red-900/10 to-transparent rounded-full blur-3xl" />
        {/* Additional subtle accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-radial from-rose-950/15 via-transparent to-transparent rounded-full blur-2xl" />
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10 flex flex-col items-center">
        {/* Title */}
        {/* Prestigious Apple-quality slogan */}
        <div className="relative">
          <motion.p
            style={{ y, opacity }}
            className="text-2xl md:text-3xl font-light text-white/80 mb-8 tracking-tight relative z-10"
          >
            Frighteningly <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-amber-200">Real</span>
          </motion.p>

          {/* World Line - The Horizon */}
          <motion.div
            style={{ opacity: lineOpacity, scaleX: lineScale }}
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[200px] h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent blur-[1px]"
          />
          <motion.div
            style={{ opacity: lineOpacity }}
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[100px] h-[1px] bg-gradient-to-r from-transparent via-amber-100/50 to-transparent"
          />
        </div>

        {/* Logos removed as requested */}
      </div>
    </section>
  )
}



