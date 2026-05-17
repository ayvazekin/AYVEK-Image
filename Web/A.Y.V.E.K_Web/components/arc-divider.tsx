"use client"

export function ArcDivider() {
  return (
    <div className="relative w-full h-48 overflow-hidden">
      <svg
        className="absolute bottom-0 w-full h-full"
        viewBox="0 0 1440 200"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M0 200 Q720 0 1440 200"
          stroke="url(#arcGradient)"
          strokeWidth="1.5"
          fill="none"
        />
        <defs>
          <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(82, 82, 82, 0.3)" />
            <stop offset="50%" stopColor="rgba(115, 115, 115, 0.6)" />
            <stop offset="100%" stopColor="rgba(82, 82, 82, 0.3)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
