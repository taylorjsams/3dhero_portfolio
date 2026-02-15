'use client'

import { useScrollStore } from "@/store"

export default function HeroBackgroundGrid() {
    const scrollProgress = useScrollStore((state) => state.scrollProgress)

    // Fade out as we reach the first case study (approx 0.2)
    const opacity = Math.max(0, 1 - (scrollProgress / 0.2))

    if (opacity <= 0) return null

    return (
        <div
            className="fixed inset-0 pointer-events-none -z-20"
            style={{
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 0)',
                backgroundSize: '40px 40px',
                maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
                opacity: opacity
            }}
        />
    )
}
