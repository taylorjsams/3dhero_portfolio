'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface Feature {
    title: string
    description: string
    image: string
    aspectRatio?: number
}

interface FeatureShowcaseProps {
    features: Feature[]
}

export default function FeatureShowcase({ features }: FeatureShowcaseProps) {
    const [activeIndex, setActiveIndex] = useState(0)

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20 items-center">
            {/* Left: Clickable List (1/3) */}
            <div className="flex flex-col gap-6">
                {features.map((feature, i) => (
                    <motion.div
                        key={i}
                        className={`p-6 rounded-2xl border cursor-pointer transition-all duration-300 ${activeIndex === i ? 'bg-white/10 border-white/30 scale-[1.02]' : 'bg-transparent border-transparent hover:bg-white/5'}`}
                        onClick={() => setActiveIndex(i)}
                        role="button"
                        tabIndex={0}
                        aria-pressed={activeIndex === i}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault()
                                setActiveIndex(i)
                            }
                        }}
                    >
                        <h3 className={`text-sm font-bold uppercase tracking-[0.2em] mb-3 transition-colors ${activeIndex === i ? 'text-white' : 'text-white/40'}`}>
                            {feature.title}
                        </h3>
                        <p className={`text-sm font-light leading-relaxed transition-colors ${activeIndex === i ? 'text-silver' : 'text-white/20'}`}>
                            {feature.description}
                        </p>
                    </motion.div>
                ))}
            </div>

            {/* Right: Dynamic Image (2/3) */}
            <div className="lg:col-span-2 w-full">
                <motion.div
                    layout
                    transition={{
                        duration: 0.6,
                        ease: [0.22, 1, 0.36, 1]
                    }}
                    className="relative w-full bg-white/5 rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
                    style={{ aspectRatio: features[activeIndex].aspectRatio || 16 / 10 }}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0, scale: 1.02, x: 0 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.98, x: 0 }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute inset-0"
                        >
                            <Image
                                src={features[activeIndex].image}
                                alt={features[activeIndex].title}
                                fill
                                className="object-cover"
                            />
                            {/* Subtle Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent pointer-events-none" />
                        </motion.div>
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    )
}
