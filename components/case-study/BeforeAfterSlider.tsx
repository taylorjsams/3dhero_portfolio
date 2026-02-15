'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { GripVertical } from 'lucide-react'

interface BeforeAfterSliderProps {
    beforeImage: string
    afterImage: string
}

export default function BeforeAfterSlider({ beforeImage, afterImage }: BeforeAfterSliderProps) {
    const [sliderPosition, setSliderPosition] = useState(50)
    const [isDragging, setIsDragging] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    const handleMove = (clientX: number) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect()
            const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
            const percent = Math.max(0, Math.min((x / rect.width) * 100, 100))
            setSliderPosition(percent)
        }
    }

    const handleMouseDown = () => setIsDragging(true)
    const handleMouseUp = () => setIsDragging(false)
    const handleMouseMove = (e: React.MouseEvent) => {
        if (isDragging) handleMove(e.clientX)
    }

    const handleTouchMove = (e: React.TouchEvent) => {
        handleMove(e.touches[0].clientX)
    }

    return (
        <div
            className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden cursor-ew-resize select-none border border-white/10 shadow-2xl"
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
        >
            {/* After Image (Background) */}
            <Image
                src={afterImage}
                alt="After Design"
                fill
                className="object-cover object-left"
                draggable={false}
            />
            <span className="absolute top-4 right-4 bg-black/50 backdrop-blur-md text-white text-xs uppercase px-3 py-1 rounded-full border border-white/10 z-10">After</span>

            {/* Before Image (Foreground, clipped) */}
            <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
            >
                <Image
                    src={beforeImage}
                    alt="Before Design"
                    fill
                    className="object-cover object-left"
                    draggable={false}
                />
                <span className="absolute top-4 left-4 bg-black/50 backdrop-blur-md text-white text-xs uppercase px-3 py-1 rounded-full border border-white/10 z-10">Before</span>
            </div>

            {/* Slider Handle */}
            <div
                className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.5)]"
                style={{ left: `${sliderPosition}%` }}
            >
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg transform -translate-x-1/2 text-black">
                    <GripVertical size={16} />
                </div>
            </div>
        </div>
    )
}
