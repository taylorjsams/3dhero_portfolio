'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { clsx } from 'clsx'

const screens = [
    {
        id: 'sales-dashboard',
        label: 'Sales Dashboard',
        image: '/verizon/final_salesdashboard.webp',
        persona: {
            name: 'Francis',
            role: 'Sales / B2B',
            type: 'sales'
        },
        caption: 'A personalized home for sales reps, providing instant visibility into pipeline health, daily tasks, and prioritized leads to drive efficiency.'
    },
    {
        id: 'product-quote-dock',
        label: 'Product & Quote Dock',
        image: '/verizon/final_quotedock.webp',
        persona: {
            name: 'Francis',
            role: 'Sales / B2B',
            type: 'sales'
        },
        caption: 'The persistent quote builder allows reps to browse the catalog and add products without losing context, drastically reducing configuration time.'
    },
    {
        id: 'quote-management',
        label: 'Quote Management',
        image: '/verizon/final_quotemanage.webp',
        persona: {
            name: 'Francis',
            role: 'Sales / B2B',
            type: 'sales'
        },
        caption: 'Visualizing the sales pipeline through a kanban interface helps managers and reps track quote status and identify bottlenecks in real-time.'
    },
    {
        id: 'solutions-dashboard',
        label: 'Solutions Dashboard',
        image: '/verizon/final_productdashboard.webp',
        persona: {
            name: 'Shae',
            role: 'Product / Solutions',
            type: 'designer'
        },
        caption: 'A centralized hub for product managers to oversee vendor records and catalog health, ensuring all sales data is accurate and up-to-date.'
    }
]

export default function VerizonGallery() {
    const [activeIndex, setActiveIndex] = useState(0)
    const activeScreen = screens[activeIndex]

    return (
        <div className="w-full space-y-8">
            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 px-4">
                {screens.map((screen, index) => (
                    <button
                        key={screen.id}
                        onClick={() => setActiveIndex(index)}
                        aria-selected={activeIndex === index}
                        role="tab"
                        className={clsx(
                            "px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border",
                            activeIndex === index
                                ? "bg-white text-black border-white shadow-lg shadow-white/10"
                                : "bg-white/5 text-silver/60 border-white/10 hover:bg-white/10 hover:text-white"
                        )}
                    >
                        {screen.label}
                    </button>
                ))}
            </div>

            {/* Main Container */}
            <div className="relative aspect-[16/10] w-full rounded-[2rem] overflow-hidden border border-white/10 bg-black/20 backdrop-blur-sm group">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeScreen.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={activeScreen.image}
                            alt={activeScreen.label}
                            fill
                            className="object-contain"
                            priority
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Persona Badge */}
                <div className="absolute top-6 left-6 z-20">
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        key={`badge-${activeScreen.id}`}
                        className="flex items-center gap-3 px-4 py-2 bg-black/60 backdrop-blur-md rounded-full border border-white/10"
                    >
                        <div className="relative flex items-center justify-center">
                            <div className={clsx(
                                "absolute w-3 h-3 rounded-full blur-sm opacity-60",
                                activeScreen.persona.type === 'sales' ? "bg-amber-500" : "bg-emerald-500"
                            )} />
                            <div className={clsx(
                                "relative w-2 h-2 rounded-full",
                                activeScreen.persona.type === 'sales' ? "bg-amber-500" : "bg-emerald-500"
                            )} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-white text-xs font-medium leading-none">{activeScreen.persona.name}</span>
                            <span className="text-silver/60 text-[10px] uppercase tracking-wider">{activeScreen.persona.role}</span>
                        </div>
                    </motion.div>
                </div>

                {/* Screen Counter */}
                <div className="absolute top-6 right-6 z-20">
                    <div className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-[10px] font-medium text-silver/80 uppercase tracking-widest">
                        {activeIndex + 1} / {screens.length}
                    </div>
                </div>

                {/* Gradient Overlay for better contrast */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
            </div>

            {/* Caption & Indicators */}
            <div className="flex flex-col items-center gap-6 text-center max-w-3xl mx-auto px-4">
                <AnimatePresence mode="wait">
                    <motion.p
                        key={`caption-${activeScreen.id}`}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        className="text-base text-silver font-light antialiased leading-relaxed"
                    >
                        {activeScreen.caption}
                    </motion.p>
                </AnimatePresence>

                {/* Navigation Dots */}
                <div className="flex items-center gap-2">
                    {screens.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            className={clsx(
                                "h-1.5 rounded-full transition-all duration-300",
                                activeIndex === index
                                    ? "w-8 bg-white"
                                    : "w-1.5 bg-white/20 hover:bg-white/40"
                            )}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
