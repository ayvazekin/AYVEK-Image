"use client"

import { useState, useCallback, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { InputBar } from "@/components/input-bar"
import { ImagePlaceholder } from "@/components/image-placeholder"
import { ImageLightbox } from "@/components/image-lightbox"
import { DownloadToastManager } from "@/components/download-toast"
import { UserMenu } from "@/components/user-menu"
import { MODEL_COLORS, type ModelType, type AspectRatio, type OutputCount } from "@/lib/types"

interface DownloadToast {
    id: string
    resolution: string
}

interface GeneratedOutput {
    aspectRatio: AspectRatio
    modelColor: ModelType
    outputCount: OutputCount
}

export default function DreamEnginePage() {
    const router = useRouter()
    const params = useParams()

    // Parse model from URL param (format: A.Y.V.E.K-[MODEL])
    const getModelFromParam = (param: string | string[] | undefined): ModelType => {
        if (!param) return "A3"

        const modelStr = Array.isArray(param) ? param[0] : param

        // Extract A1, A2, A3 from A.Y.V.E.K-A1
        const match = modelStr.match(/A\.Y\.V\.E\.K-(A[1-3])/i)
        if (match && match[1]) {
            return match[1] as ModelType
        }

        // Fallback if specific format isn't matched but ends with known model
        if (modelStr.endsWith("A1")) return "A1"
        if (modelStr.endsWith("A2")) return "A2"
        if (modelStr.endsWith("A3")) return "A3"

        return "A3" // Default
    }

    const initialModel = getModelFromParam(params.model)

    const [selectedModel, setSelectedModel] = useState<ModelType>(initialModel)
    const [aspectRatio, setAspectRatio] = useState<AspectRatio>("horizontal")
    const [outputCount, setOutputCount] = useState<OutputCount>(1)
    const [isGenerating, setIsGenerating] = useState(false)
    const [showResults, setShowResults] = useState(false)
    const [imagesRevealed, setImagesRevealed] = useState(false)
    const [generationProgress, setGenerationProgress] = useState(0)

    // Entrance Animation State
    const [isMounted, setIsMounted] = useState(false)

    // Locked output settings
    const [generatedOutput, setGeneratedOutput] = useState<GeneratedOutput | null>(null)

    // Real AI Data - Array of strings for multiple outputs
    const [generatedImages, setGeneratedImages] = useState<string[] | null>(null)
    const [error, setError] = useState<string | null>(null)

    // Lightbox state
    const [lightboxImage, setLightboxImage] = useState<string | null>(null)

    // Download toasts
    const [downloadToasts, setDownloadToasts] = useState<DownloadToast[]>([])

    // Generation ID to force fresh component mounts
    const [generationId, setGenerationId] = useState(0)

    // Trigger entrance animation
    useEffect(() => {
        setIsMounted(true)
    }, [])

    // Update URL accurately when model changes
    useEffect(() => {
        // Current model in URL vs Selected Model
        const currentParamModel = getModelFromParam(params.model)

        if (selectedModel !== currentParamModel) {
            // Sync URL to match selected model
            const newPath = `/dream_engine/A.Y.V.E.K-${selectedModel}`
            router.push(newPath)
        }
    }, [selectedModel, params.model, router])

    const handleGenerate = async (prompt: string) => {
        // Increment ID to force hard reset of placeholders
        setGenerationId(prev => prev + 1)

        // Reset state
        setIsGenerating(true)
        setShowResults(true)
        setImagesRevealed(false)
        setGenerationProgress(0)
        setError(null)
        setGeneratedImages(null)

        // Lock current settings
        setGeneratedOutput({
            aspectRatio,
            modelColor: selectedModel,
            outputCount
        })

        // Fake progress for UX (Fast then slow)
        let currentProgress = 0
        const progressInterval = setInterval(() => {
            if (currentProgress < 80) {
                currentProgress += (Math.random() * 5)
                if (currentProgress > 80) currentProgress = 80
                setGenerationProgress(currentProgress)
            }
        }, 200)

        try {
            // REAL API CALL
            const response = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    prompt,
                    aspectRatio,
                    outputCount,
                    model: selectedModel // Pass model if API supports switching
                })
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || "Generation failed")
            }

            // Success
            clearInterval(progressInterval)
            setGenerationProgress(100)

            // Short delay to let progress hit 100 visually
            setTimeout(() => {
                setGeneratedImages(data.output) // Array of URLs
                setIsGenerating(false)
                setImagesRevealed(true)
            }, 500)

        } catch (err: any) {
            clearInterval(progressInterval)
            setIsGenerating(false)
            setError(err.message)
            console.error("Generation failed:", err)
            // Optional: Show error toast here
        }
    }

    const handleDownload = useCallback((resolution: string) => {
        const newToast: DownloadToast = {
            id: `${Date.now()}-${Math.random()}`,
            resolution
        }
        setDownloadToasts(prev => [...prev, newToast])
    }, [])

    const handleRemoveToast = useCallback((id: string) => {
        setDownloadToasts(prev => prev.filter(t => t.id !== id))
    }, [])

    // Fix: handleImageClick needs to use the real image if available
    const handleImageClick = (imageIndex: number) => {
        if (generatedImages && generatedImages[imageIndex]) {
            setLightboxImage(generatedImages[imageIndex])
        }
    }

    const logoColor = MODEL_COLORS[selectedModel]

    return (
        <main className="min-h-screen bg-black flex flex-col items-center justify-between px-6 py-8 relative overflow-hidden">

            {/* ============================================= */}
            {/* SCREEN EDGE GLOW EFFECT */}
            {/* ============================================= */}
            <div
                className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000 ease-in-out"
                style={{
                    opacity: isGenerating ? 0.6 : 0, // Visible during generation
                }}
            >
                <div
                    className="absolute inset-0 animate-pulse-slow"
                    style={{
                        // Dynamic color based on model
                        boxShadow: `inset 0 0 150px ${logoColor.glow}, inset 0 0 50px ${logoColor.primary}20`,
                        transition: 'box-shadow 1s ease'
                    }}
                />
            </div>

            {/* Download Toast Manager */}
            <DownloadToastManager toasts={downloadToasts} onRemoveToast={handleRemoveToast} />

            {/* Lightbox */}
            <ImageLightbox
                imageUrl={lightboxImage || ""}
                isOpen={!!lightboxImage}
                onClose={() => setLightboxImage(null)}
            />

            {/* Header - Logo persists/matches Landing position exactly */}
            <div className="w-full flex items-center justify-between z-50 px-6 py-8 absolute top-0 left-0">
                <div className="flex flex-col">
                    <h1
                        className="text-white text-base tracking-[0.6em] uppercase"
                        style={{
                            fontFamily: 'var(--font-geist-sans)',
                            fontWeight: 200,
                            letterSpacing: '0.6em' // Exact match to Web App
                        }}
                    >
                        A.Y.V.E.K
                    </h1>
                    {/* Ultra-thin elegant line under logo */}
                    <div className="relative h-px w-16 mt-2.5 overflow-visible">
                        {/* Base subtle line */}
                        <div
                            className="absolute inset-0 transition-all duration-700 ease-out"
                            style={{
                                background: `linear-gradient(90deg, transparent, ${logoColor.secondary}20, ${logoColor.primary}40)`,
                            }}
                        />
                        {/* Premium metallic glow - appears during generation */}
                        <div
                            className="absolute inset-0 transition-all ease-out"
                            style={{
                                background: `linear-gradient(90deg, transparent, ${logoColor.secondary}80, ${logoColor.primary})`,
                                opacity: isGenerating ? 1 : 0,
                                filter: isGenerating ? `drop-shadow(0 0 2px ${logoColor.primary}) drop-shadow(0 0 4px ${logoColor.glow})` : 'none',
                                transitionDuration: isGenerating ? '300ms' : '2000ms',
                            }}
                        />
                        {/* Shimmer effect during glow */}
                        {isGenerating && (
                            <div
                                className="absolute inset-0 animate-pulse"
                                style={{
                                    background: `linear-gradient(90deg, transparent, ${logoColor.primary}60, transparent)`,
                                    animation: 'shimmer 1.5s ease-in-out infinite',
                                }}
                            />
                        )}
                    </div>
                </div>

                {/* User Menu - Should fade in */}
                <div className={`transition-opacity duration-[1500ms] ${isMounted ? 'opacity-100' : 'opacity-0'}`}>
                    <UserMenu />
                </div>
            </div>

            {/* Center Content - "Void Reveal" - Slow fade in */}
            <div className={`flex-1 flex flex-col items-center justify-center w-full max-w-[90rem] transition-all duration-[2000ms] ease-out ${isMounted ? 'opacity-100 translate-y-0 scale-100 z-10' : 'opacity-0 translate-y-4 scale-95 blur-sm'}`}>
                {!showResults ? (
                    <p className="text-neutral-500 text-lg font-light tracking-wide">
                        Write in the prompt box to start
                    </p>
                ) : (
                    <div className="flex flex-wrap justify-center gap-8 w-full">
                        {/* Rendering Loop based on Output Count */}
                        {Array.from({ length: generatedOutput?.outputCount || 1 }).map((_, index) => (
                            <ImagePlaceholder
                                key={`${generationId}-${index}`}
                                aspectRatio={generatedOutput?.aspectRatio || aspectRatio}
                                isGenerating={isGenerating}
                                isRevealed={imagesRevealed}
                                modelColor={generatedOutput?.modelColor || selectedModel}
                                imageUrl={generatedImages ? generatedImages[index] : null}
                                onDownload={handleDownload}
                                onImageClick={() => handleImageClick(index)}
                                progress={generationProgress}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Input Bar - Fade in slowly */}
            <div className={`transition-all duration-[2000ms] delay-300 ease-out relative z-10 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
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
