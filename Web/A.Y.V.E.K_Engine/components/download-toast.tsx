"use client"

import { useState, useEffect } from "react"
import { X, Check } from "lucide-react"

interface DownloadToast {
  id: string
  resolution: string
}

interface DownloadToastManagerProps {
  toasts: DownloadToast[]
  onRemoveToast: (id: string) => void
}

export function DownloadToastManager({ toasts, onRemoveToast }: DownloadToastManagerProps) {
  return (
    <div className="fixed top-4 right-4 z-[200] flex flex-col gap-2">
      {toasts.map((toast, index) => (
        <DownloadToastItem 
          key={toast.id} 
          toast={toast} 
          index={index}
          onRemove={() => onRemoveToast(toast.id)} 
        />
      ))}
    </div>
  )
}

function DownloadToastItem({ 
  toast, 
  index,
  onRemove 
}: { 
  toast: DownloadToast
  index: number
  onRemove: () => void 
}) {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const duration = 3000
    const interval = 30
    const increment = 100 / (duration / interval)

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer)
          setIsComplete(true)
          return 100
        }
        return prev + increment
      })
    }, interval)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (isComplete) {
      const timeout = setTimeout(() => {
        onRemove()
      }, 3000)
      return () => clearTimeout(timeout)
    }
  }, [isComplete, onRemove])

  return (
    <div 
      className="relative bg-neutral-950 border border-neutral-800 rounded-xl p-4 pr-10 shadow-2xl min-w-[300px] animate-in slide-in-from-right-5 fade-in duration-300"
      style={{ 
        transform: `translateY(${index * 4}px)`,
        zIndex: 200 - index 
      }}
    >
      <button
        onClick={onRemove}
        className="absolute top-3 right-3 w-6 h-6 rounded-full bg-neutral-900 hover:bg-neutral-800 flex items-center justify-center text-neutral-500 hover:text-neutral-300 transition-all"
      >
        <X className="w-3 h-3" />
      </button>

      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
          isComplete ? "bg-emerald-500/20" : "bg-neutral-900"
        }`}>
          {isComplete ? (
            <Check className="w-4 h-4 text-emerald-400" />
          ) : (
            <div className="w-4 h-4 rounded-full border-2 border-neutral-600 border-t-neutral-400 animate-spin" />
          )}
        </div>
        
        {/* Text */}
        <div className="flex-1 min-w-0">
          {isComplete ? (
            <>
              <p className="text-white text-sm font-medium">Resolution enhancement complete.</p>
              <p className="text-neutral-400 text-xs mt-1">Your image has been downloaded.</p>
            </>
          ) : (
            <>
              <p className="text-neutral-200 text-sm font-medium">Upscaling to {toast.resolution}...</p>
              <p className="text-neutral-500 text-xs mt-1">The download will start automatically</p>
            </>
          )}
        </div>
      </div>

      {/* Progress bar */}
      {!isComplete && (
        <div className="mt-3 h-1 bg-neutral-900 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-neutral-600 to-neutral-400 rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  )
}
