"use client"

import { MODEL_COLORS, type ModelType } from "@/lib/types"

interface ModelChipProps {
  model: ModelType
  size?: "sm" | "md" | "lg"
  className?: string
}

export function ModelChip({ model, size = "md", className = "" }: ModelChipProps) {
  const color = MODEL_COLORS[model]

  // Map internal model IDs to display names as requested
  // A1 -> A1.0, A2 -> A2.0, A3 -> A3.0
  const displayLabel = model === "A1" ? "A1.0" :
    model === "A2" ? "A2.0" : "A3.0"

  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-2.5 py-1.5 text-sm",
    lg: "px-3 py-2 text-base",
  }

  const dotSizes = {
    sm: "w-1.5 h-1.5",
    md: "w-2 h-2",
    lg: "w-2.5 h-2.5",
  }

  return (
    <div
      className={`relative inline-flex items-center gap-2 rounded-full border bg-neutral-900/50 ${sizeClasses[size]} ${className}`}
      style={{
        borderColor: `rgba(255,255,255,0.1)`,
      }}
    >
      {/* Glow behind the dot */}
      <div
        className={`rounded-full ${dotSizes[size]}`}
        style={{
          backgroundColor: color.primary,
          boxShadow: `0 0 8px ${color.glow}`
        }}
      />

      <span className="font-medium text-neutral-300 tracking-wide">
        {displayLabel}
      </span>
    </div>
  )
}
