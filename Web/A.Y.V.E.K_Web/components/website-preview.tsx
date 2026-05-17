"use client"

import { useState } from "react"
import { ArrowRight, ChevronDown, Settings2, Check, X, Send, Sparkles } from "lucide-react"

export function WebsitePreview() {
  const [isHovered, setIsHovered] = useState(false)

  const handleLaunchApp = () => {
    const engineUrl = process.env.NEXT_PUBLIC_ENGINE_URL
    if (!engineUrl) {
      console.error("Engine URL not configured")
      return
    }
    window.open(engineUrl, '_self')
  }

  return (

    <div className="relative w-full max-w-5xl mx-auto px-4 perspective-1000">
      {/* Premium neon border wrapper with vertical fade mask */}
      <div
        className="relative rounded-xl cursor-pointer group transition-all duration-700 hover:scale-[1.01]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleLaunchApp}
        style={{
          maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)'
        }}
      >
        {/* Outer glow effect - slower, more elegant pulse */}
        <div className={`absolute -inset-[1px] rounded-xl bg-gradient-to-r from-amber-600/30 via-amber-400/20 to-amber-600/30 blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ease-out`} />

        {/* Sharp premium neon border - refined thickness */}
        <div className={`absolute -inset-[0.5px] rounded-xl bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-800 group-hover:from-amber-500/50 group-hover:via-amber-200/40 group-hover:to-amber-500/50 transition-all duration-1000 ease-out`} />

        {/* Main container */}
        <div className="relative bg-black rounded-xl overflow-hidden border border-white/5 shadow-2xl">

          {/* Engine Interface Preview */}
          <div className="h-[500px] bg-black relative overflow-hidden flex flex-col">

            {/* Ambient background light needed for depth */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-64 bg-gradient-to-b from-blue-900/10 to-transparent opacity-50" />

            {/* Engine Header */}
            <div className="flex items-center justify-between px-8 py-6 relative z-10">
              <div className="flex flex-col">
                <h1 className="text-white text-lg font-medium tracking-[0.2em]">A.Y.V.E.K</h1>
                {/* Ultra-thin elegant line under logo */}
                {/* Ultra-thin elegant line under logo */}
                <div className="relative h-[1px] w-20 mt-2 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/80 to-transparent"
                    style={{
                      boxShadow: '0 0 10px rgba(168, 85, 247, 0.4)'
                    }}
                  />
                </div>
              </div>
              {/* User Avatar - Fixed Visibility */}
              <div className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center shadow-inner">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neutral-700 to-neutral-800 flex items-center justify-center">
                  <span className="text-xs font-medium text-neutral-400">U</span>
                </div>
              </div>
            </div>

            {/* Center Content */}
            <div className="flex-1 flex flex-col items-center justify-center -mt-20 relative z-10">
              <p className="text-neutral-600 text-lg font-light tracking-widest uppercase opacity-40">
                AI Generation Engine
              </p>
            </div>

            {/* Engine Input Bar - Floating & Glowing */}
            <div className="px-8 pb-12 relative z-20">
              <div className="w-full max-w-2xl mx-auto group/input">
                <div
                  className="relative rounded-2xl bg-neutral-900/40 backdrop-blur-xl border border-white/5 overflow-hidden transition-all duration-700 ease-out group-hover/input:border-white/10 group-hover/input:shadow-[0_0_30px_-5px_rgba(255,255,255,0.05)]"
                >
                  {/* Slow fade neon glow on active */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 opacity-0 group-hover/input:opacity-100 transition-opacity duration-1000 ease-in-out" />

                  {/* Single Row Layout */}
                  <div className="flex items-center gap-4 px-5 py-3.5">
                    {/* Text Input */}
                    <div className="flex-1 text-neutral-500 text-base font-light tracking-wide cursor-text">
                      Describe your imagination...
                    </div>

                    {/* Divider */}
                    <div className="w-px h-6 bg-white/10" />

                    {/* Model Selector */}
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors duration-300 cursor-pointer">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                      <span className="text-neutral-300 text-xs font-medium tracking-wide">A3.0</span>
                    </div>

                    {/* Submit Button */}
                    <div
                      className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-white text-black hover:scale-105 transition-transform duration-500 cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hover overlay - Minimal Apple Style */}
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${isHovered ? 'bg-black/40 backdrop-blur-[2px]' : 'pointer-events-none'}`}>
            <div
              className={`transform transition-all duration-700 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
            >
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-[20px] bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <span className="text-sm font-medium text-white/80 tracking-widest uppercase">Click to Launch</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
