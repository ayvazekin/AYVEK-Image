"use client"

import React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import { ArrowRight, ChevronDown, Settings2, Check, X } from "lucide-react"
import { ModelChip } from "./model-chip"
import { MODEL_COLORS, type ModelType, type AspectRatio, type OutputCount } from "@/lib/types"

interface InputBarProps {
  selectedModel: ModelType
  onModelChange: (model: ModelType) => void
  aspectRatio: AspectRatio
  onAspectRatioChange: (ratio: AspectRatio) => void
  outputCount: OutputCount
  onOutputCountChange: (count: OutputCount) => void
  onGenerate: (prompt: string) => void
  isGenerating: boolean
}

export function InputBar({
  selectedModel,
  onModelChange,
  aspectRatio,
  onAspectRatioChange,
  outputCount,
  onOutputCountChange,
  onGenerate,
  isGenerating,
}: InputBarProps) {
  const [prompt, setPrompt] = useState("")
  const [showModelDropdown, setShowModelDropdown] = useState(false)
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [glowIntensity, setGlowIntensity] = useState(0)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const settingsRef = useRef<HTMLDivElement>(null)
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const lastTypeTimeRef = useRef<number>(Date.now())

  const handleSubmit = () => {
    if (prompt.trim() && !isGenerating) {
      onGenerate(prompt)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  // Typing speed detection for glow intensity
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setPrompt(newValue)

    // Immediate glow on type
    setIsTyping(true)
    setGlowIntensity(0.8) // High intensity while typing

    // Clear previous timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    // Slow fade out when typing stops
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false)
      setGlowIntensity(0)
    }, 1000) // 1 second delay before fading starts (CSS handles the duration)
  }, [])

  // Clear prompt
  const handleClearPrompt = () => {
    setPrompt("")
    setIsTyping(false)
    setGlowIntensity(0)
  }

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowModelDropdown(false)
      }
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setShowSettingsDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
    }
  }, [])

  const modelColor = MODEL_COLORS[selectedModel]

  // Get aspect ratio label
  const aspectRatioLabel = aspectRatio === "horizontal" ? "16:9" : "9:16"

  return (
    <div className="w-full max-w-2xl">
      <div
        className="relative rounded-2xl bg-black overflow-visible transition-all duration-200"
        style={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        }}
      >
        {/* Subtle thin border glow - only visible when typing */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none transition-all duration-1000 ease-out"
          style={{
            border: `1px solid ${isTyping ? modelColor.primary : 'rgba(64, 64, 64, 0.5)'}`,
            boxShadow: isTyping
              ? `0 0 20px ${modelColor.glow}, inset 0 0 10px ${modelColor.glow}`
              : 'none',
            opacity: isTyping ? 1 : 0,
          }}
        />

        {/* Single Row Layout */}
        <div className="flex items-center gap-3 px-4 py-2.5">
          {/* Text Input */}
          <input
            value={prompt}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Describe the image you want to create..."
            className="flex-1 bg-transparent text-neutral-200 placeholder:text-neutral-600 outline-none text-sm"
          />

          {/* Clear button - shows when there's text */}
          {prompt.length > 0 && (
            <button
              onClick={handleClearPrompt}
              className="flex-shrink-0 w-6 h-6 rounded-full bg-neutral-900 flex items-center justify-center text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800 transition-all"
            >
              <X className="w-3 h-3" />
            </button>
          )}

          {/* Divider */}
          <div className="w-px h-5 bg-neutral-800" />

          {/* Model Selector */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => {
                setShowModelDropdown(!showModelDropdown)
                setShowSettingsDropdown(false)
              }}
              className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-neutral-900/50 border border-neutral-800/50 hover:border-neutral-700 transition-all"
            >
              <ModelChip model={selectedModel} size="sm" />
              <span className="text-neutral-400 text-xs font-medium">{selectedModel}</span>
              <ChevronDown className={`w-3 h-3 text-neutral-500 transition-transform ${showModelDropdown ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {showModelDropdown && (
              <div className="absolute bottom-full left-0 mb-2 w-56 rounded-xl bg-neutral-950 border border-neutral-800 shadow-2xl overflow-hidden z-[100]">
                {(["A1", "A2", "A3"] as ModelType[]).map((model) => (
                  <button
                    key={model}
                    onClick={() => {
                      onModelChange(model)
                      setShowModelDropdown(false)
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 hover:bg-neutral-900 transition-all ${selectedModel === model ? "bg-neutral-900" : ""
                      }`}
                  >
                    <ModelChip model={model} size="sm" />
                    <span className="text-neutral-300 text-sm font-medium whitespace-nowrap">A.Y.V.E.K-{model}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Settings Button with Dropdown */}
          <div className="relative" ref={settingsRef}>
            <button
              onClick={() => {
                setShowSettingsDropdown(!showSettingsDropdown)
                setShowModelDropdown(false)
              }}
              className="flex items-center gap-1.5 px-2 py-1 rounded-lg hover:bg-neutral-900/50 transition-all text-neutral-500 hover:text-neutral-400"
            >
              <Check className="w-3 h-3 text-emerald-500/70" />
              <span className="text-xs text-neutral-500">{aspectRatioLabel}</span>
              <span className="text-neutral-700 text-xs">|</span>
              <span className="text-xs text-neutral-500">x{outputCount}</span>
              <Settings2 className="w-3.5 h-3.5 ml-0.5" />
            </button>

            {/* Settings Dropdown */}
            {showSettingsDropdown && (
              <div className="absolute bottom-full right-0 mb-2 w-48 rounded-xl bg-neutral-950 border border-neutral-800 shadow-2xl overflow-hidden z-[100]">
                {/* Aspect Ratio Section */}
                <div className="px-3 py-2 border-b border-neutral-800">
                  <span className="text-neutral-500 text-[10px] uppercase tracking-wider font-medium">Aspect Ratio</span>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => onAspectRatioChange("horizontal")}
                      className={`flex-1 flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg text-xs transition-all ${aspectRatio === "horizontal"
                        ? "bg-neutral-800 text-neutral-200"
                        : "text-neutral-500 hover:text-neutral-400 hover:bg-neutral-900"
                        }`}
                    >
                      <svg className="w-4 h-3" viewBox="0 0 16 12" fill="currentColor">
                        <rect x="0" y="0" width="16" height="12" rx="2" />
                      </svg>
                      <span>16:9</span>
                    </button>
                    <button
                      onClick={() => onAspectRatioChange("vertical")}
                      className={`flex-1 flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg text-xs transition-all ${aspectRatio === "vertical"
                        ? "bg-neutral-800 text-neutral-200"
                        : "text-neutral-500 hover:text-neutral-400 hover:bg-neutral-900"
                        }`}
                    >
                      <svg className="w-3 h-4" viewBox="0 0 12 16" fill="currentColor">
                        <rect x="0" y="0" width="12" height="16" rx="2" />
                      </svg>
                      <span>9:16</span>
                    </button>
                  </div>
                </div>

                {/* Output Count Section */}
                <div className="px-3 py-2">
                  <span className="text-neutral-500 text-[10px] uppercase tracking-wider font-medium">Output Count</span>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => onOutputCountChange(1)}
                      className={`flex-1 px-2 py-1.5 rounded-lg text-xs font-medium transition-all ${outputCount === 1
                        ? "bg-neutral-800 text-neutral-200"
                        : "text-neutral-500 hover:text-neutral-400 hover:bg-neutral-900"
                        }`}
                    >
                      x1
                    </button>
                    <button
                      onClick={() => onOutputCountChange(2)}
                      className={`flex-1 px-2 py-1.5 rounded-lg text-xs font-medium transition-all ${outputCount === 2
                        ? "bg-neutral-800 text-neutral-200"
                        : "text-neutral-500 hover:text-neutral-400 hover:bg-neutral-900"
                        }`}
                    >
                      x2
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Submit Button with Neon Glow */}
          <button
            onClick={handleSubmit}
            disabled={!prompt.trim() || isGenerating}
            className="relative flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed"
            style={{
              background: prompt.trim() && !isGenerating
                ? `linear-gradient(135deg, ${modelColor.primary}, ${modelColor.secondary})`
                : 'rgb(38, 38, 38)',
              boxShadow: prompt.trim() && !isGenerating
                ? `0 0 15px ${modelColor.glow}, 0 0 30px ${modelColor.glow}`
                : "none",
            }}
          >
            <ArrowRight className={`w-3.5 h-3.5 relative z-10 ${prompt.trim() && !isGenerating ? 'text-white' : 'text-neutral-600'}`} />
          </button>
        </div>
      </div>
    </div>
  )
}
