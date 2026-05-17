"use client"

import { useState, useCallback, useEffect } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { InputBar } from "@/components/input-bar"
import { ImagePlaceholder } from "@/components/image-placeholder"
import { ImageLightbox } from "@/components/image-lightbox"
import { DownloadToastManager } from "@/components/download-toast"
import { UserMenu } from "@/components/user-menu"
import { MODEL_COLORS, type ModelType, type AspectRatio, type OutputCount } from "@/lib/types"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

interface DownloadToast {
  id: string
  resolution: string
}

interface GeneratedOutput {
  aspectRatio: AspectRatio
  modelColor: ModelType
  outputCount: OutputCount
}

export default function PlaygroundInner() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const initialModel = (searchParams.get("model") as ModelType) || "A2"

  const [selectedModel, setSelectedModel] = useState<ModelType>(initialModel)
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>("horizontal")
  const [outputCount, setOutputCount] = useState<OutputCount>(1)
  const [isGenerating, setIsGenerating] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [imagesRevealed, setImagesRevealed] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [isMounted, setIsMounted] = useState(false)
  const [generatedOutput, setGeneratedOutput] = useState<GeneratedOutput | null>(null)
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)
  const [downloadToasts, setDownloadToasts] = useState<DownloadToast[]>([])
  const [isLogoGlowing, setIsLogoGlowing] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const currentModel = searchParams.get("model")
    const currentEngine = searchParams.get("engine")
    const expectedEngine = `Dream_Engine_${selectedModel}`
    if (currentModel !== selectedModel || currentEngine !== expectedEngine) {
      router.replace(`${pathname}?engine=${expectedEngine}&model=${selectedModel}`, { scroll: false })
    }
  }, [selectedModel, searchParams, router, pathname])

  const handleGenerate = async (prompt: string) => {
    setIsGenerating(true)
    setShowResults(true)
    setImagesRevealed(false)
    setIsLogoGlowing(true)
    setGenerationProgress(0)
    setError(null)
    setGeneratedImageUrl(null)
    setGeneratedOutput({ aspectRatio, modelColor: selectedModel, outputCount })

    let currentProgress = 0
    const interval = setInterval(() => {
      currentProgress += 0.6
      if (currentProgress < 90) setGenerationProgress(currentProgress)
    }, 50)

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, aspectRatio, outputCount }),
      })
      const data = await response.json()
      clearInterval(interval)
      setGenerationProgress(100)
      if (!response.ok || data.error) throw new Error(data.error || "Generation failed")
      const imageUrl = Array.isArray(data.output) ? data.output[0] : data.output
      setGeneratedImageUrl(imageUrl)
      setIsGenerating(false)
      setImagesRevealed(true)
      setTimeout(() => setIsLogoGlowing(false), 2000)
    } catch (err: any) {
      clearInterval(interval)
      setError(err.message || "Something went wrong")
      setIsGenerating(false)
      setIsLogoGlowing(false)
    }
  }

  const handleDownload = useCallback((resolution: string) => {
    setDownloadToasts((prev) => [...prev, { id: `${Date.now()}-${Math.random()}`, resolution }])
  }, [])

  const handleRemoveToast = useCallback((id: string) => {
    setDownloadToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const handleImageClick = () => {
    if (generatedImageUrl) setLightboxImage(generatedImageUrl)
  }

  const logoColor = MODEL_COLORS[selectedModel]

  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-between px-6 py-8 relative overflow-hidden">

      {/* Screen edge glow */}
      <div
        className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000 ease-in-out"
        style={{ opacity: isLogoGlowing ? 0.6 : 0 }}
      >
        <div
          className="absolute inset-0"
          style={{
            boxShadow: `inset 0 0 150px ${logoColor.glow}, inset 0 0 50px ${logoColor.primary}20`,
            transition: "box-shadow 1s ease",
          }}
        />
      </div>

      <DownloadToastManager toasts={downloadToasts} onRemoveToast={handleRemoveToast} />
      <ImageLightbox imageUrl={lightboxImage || ""} isOpen={!!lightboxImage} onClose={() => setLightboxImage(null)} />

      {/* Header */}
      <div className="w-full flex items-center justify-between z-50 px-6 py-8 absolute top-0 left-0">

        {/* Left: back + logo */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-neutral-700 hover:text-neutral-400 transition-colors duration-200 group"
          >
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform duration-200" />
            <span className="text-[10px] tracking-[0.25em] uppercase font-light">Back</span>
          </Link>

          <div className="w-px h-3.5 bg-neutral-800" />

          <div className="flex flex-col">
            <h1
              className="text-white text-sm tracking-[0.6em] uppercase"
              style={{ fontFamily: "var(--font-geist-sans)", fontWeight: 200 }}
            >
              A.Y.V.E.K
            </h1>
            <div className="relative h-px w-14 mt-2 overflow-visible">
              <div
                className="absolute inset-0 transition-all duration-700 ease-out"
                style={{
                  background: `linear-gradient(90deg, transparent, ${logoColor.secondary}20, ${logoColor.primary}40)`,
                }}
              />
              <div
                className="absolute inset-0 transition-all ease-out"
                style={{
                  background: `linear-gradient(90deg, transparent, ${logoColor.secondary}80, ${logoColor.primary})`,
                  opacity: isLogoGlowing ? 1 : 0,
                  filter: isLogoGlowing
                    ? `drop-shadow(0 0 2px ${logoColor.primary}) drop-shadow(0 0 4px ${logoColor.glow})`
                    : "none",
                  transitionDuration: isLogoGlowing ? "300ms" : "2000ms",
                }}
              />
            </div>
          </div>
        </div>

        {/* Center: Under Development badge */}
        <div
          className={`absolute left-1/2 -translate-x-1/2 transition-all duration-[2000ms] ${isMounted ? "opacity-100" : "opacity-0"}`}
        >
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-md">
            <span className="relative flex h-1.5 w-1.5">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
                style={{ backgroundColor: logoColor.primary }}
              />
              <span
                className="relative inline-flex rounded-full h-1.5 w-1.5"
                style={{ backgroundColor: logoColor.primary }}
              />
            </span>
            <span
              className="text-[10px] tracking-[0.2em] uppercase font-light"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              Under Development
            </span>
          </div>
        </div>

        {/* Right: user menu */}
        <div className={`transition-opacity duration-[1500ms] ${isMounted ? "opacity-100" : "opacity-0"}`}>
          <UserMenu />
        </div>
      </div>

      {/* Center content */}
      <div
        className={`flex-1 flex flex-col items-center justify-center w-full max-w-4xl transition-all duration-[2000ms] ease-out ${
          isMounted ? "opacity-100 translate-y-0 scale-100 z-10" : "opacity-0 translate-y-4 scale-95 blur-sm"
        }`}
      >
        {!showResults ? (
          <p className="text-neutral-700 text-xs font-light tracking-[0.3em] uppercase">
            Describe what you want to create
          </p>
        ) : (
          <div className="flex flex-col items-center gap-4">
            {error && <p className="text-red-400/60 text-xs tracking-wide">{error}</p>}
            <ImagePlaceholder
              aspectRatio={generatedOutput?.aspectRatio || aspectRatio}
              isGenerating={isGenerating}
              isRevealed={imagesRevealed}
              modelColor={generatedOutput?.modelColor || selectedModel}
              imageUrl={generatedImageUrl}
              onDownload={handleDownload}
              onImageClick={handleImageClick}
              progress={generationProgress}
            />
          </div>
        )}
      </div>

      {/* Input bar */}
      <div
        className={`transition-all duration-[2000ms] delay-300 ease-out relative z-10 ${
          isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <InputBar
          selectedModel={selectedModel}
          onModelChange={setSelectedModel}
          aspectRatio={aspectRatio}
          onAspectRatioChange={setAspectRatio}
          outputCount={outputCount}
          onOutputCountChange={setOutputCount}
          onGenerate={handleGenerate}
          isGenerating={isGenerating}
        />
      </div>
    </main>
  )
}
