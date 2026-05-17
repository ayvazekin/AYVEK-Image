"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function TransitionLink({
    href,
    children,
    className
}: {
    href: string
    children: React.ReactNode
    className?: string
}) {
    const router = useRouter()
    const [isTransitioning, setIsTransitioning] = useState(false)

    const handleTransition = async (e: React.MouseEvent) => {
        e.preventDefault()
        setIsTransitioning(true)

        // Add page exit animation class to body
        document.body.classList.add('page-transition-exit')

        // Wait for animation
        await new Promise(resolve => setTimeout(resolve, 800))

        router.push(href)

        // Cleanup after navigation (Next.js handles this mostly but good to be safe)
        setTimeout(() => {
            document.body.classList.remove('page-transition-exit')
            setIsTransitioning(false)
        }, 1000)
    }

    return (
        <a
            href={href}
            onClick={handleTransition}
            className={className}
        >
            {isTransitioning && (
                <div className="fixed inset-0 z-[100] bg-black pointer-events-none animate-in-fade" />
            )}
            {children}
        </a>
    )
}
