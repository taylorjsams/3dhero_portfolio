'use client'

import { useScrollStore } from '@/store'


export default function HeroVignette() {
    const scrollY = useScrollStore((state) => state.scrollY)

    // Opacity should be at its peak at scrollY 0 and fade out by 600px
    const opacity = Math.max(0, 1 - scrollY / 600)

    return (
        <div
            className="fixed inset-0 pointer-events-none z-0"
            style={{
                background: 'radial-gradient(circle at center, transparent 20%, rgba(139, 92, 246, 0.12) 100%)',
                opacity: opacity,
                transition: 'opacity 0.3s ease-out'
            }}
        />
    )
}
