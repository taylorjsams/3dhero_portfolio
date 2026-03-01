'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { clsx } from 'clsx'

interface ExplorationImage {
    id: string
    src: string
    title: string
    description: string
    medium: string
}

const ALL_IMAGES: ExplorationImage[] = [
    {
        id: 'graphic-landing',
        src: '/visualexplorations/graphiclanding.webp',
        title: 'Homogenic Spatial Conditions',
        description: 'A study in iterative geometry and textural density. This exploration investigates the transition from rigid structural repetition to fluid, organic forms through parametric layering and light-reflective surfacing.',
        medium: 'Digital Rendering'
    },
    {
        id: 'tech-04',
        src: '/visualexplorations/tech04_small.webp',
        title: 'Technical Study 04',
        description: 'A study of a projective drawing technique that uses intersections of sections to generate scaled 3D forms.',
        medium: 'Pen and Ink on Mylar'
    },
    {
        id: 'tech-06',
        src: '/visualexplorations/tech06_small.webp',
        title: 'Technical Study 06',
        description: 'Simple form is abstracted by a lack of context.',
        medium: 'Pen, Ink, and Spraypaint on Mylar'
    },
    {
        id: 'ultramaroon-slider',
        src: '/visualexplorations/ultramaroon_slider.webp',
        title: 'UltraMaroon Concept',
        description: 'UI exploration for a nighlife brand, focusing on deep color palettes and high-contrast typography.',
        medium: 'Digital Illustration'
    },
    {
        id: 'um-landing',
        src: '/visualexplorations/um_landingimage2.webp',
        title: 'Ultramaroon Photo Concept',
        description: 'Photography and digital compositing for a nighlife brand.',
        medium: 'Digital Illustration'
    },
    {
        id: 'viz-01',
        src: '/visualexplorations/vizimages-01.webp',
        title: 'Visual Research 01',
        description: 'Part 1/3 of series exploring lighting conditions and material properties.',
        medium: 'Digital Rendering'
    },
    {
        id: 'viz-02',
        src: '/visualexplorations/vizimages-02.webp',
        title: 'Visual Research 02',
        description: 'Part 2/3 of series exploring lighting conditions and material properties.',
        medium: 'Digital Rendering'
    },
    {
        id: 'viz-03',
        src: '/visualexplorations/vizimages-03.webp',
        title: 'Visual Research 03',
        description: 'Part 3/3 of series exploring lighting conditions and material properties.',
        medium: 'Digital Rendering'
    },
    {
        id: 'viz-09',
        src: '/visualexplorations/vizimages-09.webp',
        title: 'Wine Section',
        description: 'A perspective section through a series of architectural volumes.',
        medium: 'Digital Rendering'
    }
]

export default function VisualExplorations() {
    const [selectedImages, setSelectedImages] = useState<ExplorationImage[]>([])
    const [activeIndex, setActiveIndex] = useState<number | null>(null)

    useEffect(() => {
        // Randomly select 6 images from the pool
        const shuffled = [...ALL_IMAGES].sort(() => 0.5 - Math.random())
        // Delay setting state to avoid synchronous update warning
        const timer = setTimeout(() => setSelectedImages(shuffled.slice(0, 6)), 0)
        return () => clearTimeout(timer)
    }, [])

    const handleNext = (e?: React.MouseEvent) => {
        e?.stopPropagation()
        if (activeIndex !== null) {
            setActiveIndex((prev) => (prev! + 1) % selectedImages.length)
        }
    }

    const handlePrev = (e?: React.MouseEvent) => {
        e?.stopPropagation()
        if (activeIndex !== null) {
            setActiveIndex((prev) => (prev! - 1 + selectedImages.length) % selectedImages.length)
        }
    }

    const closeModal = () => setActiveIndex(null)

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (activeIndex === null) return
            if (e.key === 'ArrowRight') {
                if (activeIndex !== null) setActiveIndex((prev) => (prev! + 1) % selectedImages.length)
            }
            if (e.key === 'ArrowLeft') {
                if (activeIndex !== null) setActiveIndex((prev) => (prev! - 1 + selectedImages.length) % selectedImages.length)

            }
            if (e.key === 'Escape') setActiveIndex(null)
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [activeIndex, selectedImages.length])

    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full">
                {selectedImages.map((image, index) => (
                    <motion.div
                        key={image.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => setActiveIndex(index)}
                        className="group relative aspect-square glass rounded-2xl overflow-hidden cursor-pointer border border-white/10 hover:border-white/20 transition-all"
                    >
                        <Image
                            src={image.src}
                            alt={image.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center backdrop-blur-sm">
                            <h3 className="text-white text-xl font-light mb-2">{image.title}</h3>
                            <p className="text-silver/80 text-sm font-extralight line-clamp-2 mb-3">{image.description}</p>
                            <span className="text-white/40 text-xs italic tracking-wider font-light">{image.medium}</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {activeIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-8"
                        onClick={closeModal}
                    >
                        {/* Close Button */}
                        <button
                            onClick={closeModal}
                            className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-[110]"
                            aria-label="Close modal"
                        >
                            <X size={32} />
                        </button>

                        <div
                            className="relative w-full max-w-6xl flex flex-col items-center gap-8"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Navigation Buttons - Desktop */}
                            <div className="absolute inset-y-0 -left-16 hidden md:flex items-center">
                                <button
                                    onClick={handlePrev}
                                    className="p-4 text-white/30 hover:text-white transition-colors"
                                    aria-label="Previous image"
                                >
                                    <ChevronLeft size={48} />
                                </button>
                            </div>
                            <div className="absolute inset-y-0 -right-16 hidden md:flex items-center">
                                <button
                                    onClick={handleNext}
                                    className="p-4 text-white/30 hover:text-white transition-colors"
                                    aria-label="Next image"
                                >
                                    <ChevronRight size={48} />
                                </button>
                            </div>

                            {/* Image & Text Container */}
                            <div className="w-full flex flex-col md:flex-row gap-8 items-center md:items-start">
                                <div className="relative aspect-[4/3] w-full md:w-2/3 rounded-2xl overflow-hidden border border-white/10 bg-white/5">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={selectedImages[activeIndex].id}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.3 }}
                                            className="absolute inset-0"
                                        >
                                            <Image
                                                src={selectedImages[activeIndex].src}
                                                alt={selectedImages[activeIndex].title}
                                                fill
                                                className="object-contain"
                                                priority
                                            />
                                        </motion.div>
                                    </AnimatePresence>
                                </div>

                                <div className="w-full md:w-1/3 text-left space-y-4">
                                    <motion.div
                                        key={`text-${selectedImages[activeIndex].id}`}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="flex flex-col h-full justify-center md:justify-start"
                                    >
                                        <h2 className="text-3xl font-light text-white mb-4">{selectedImages[activeIndex].title}</h2>
                                        <p className="text-silver text-lg font-extralight leading-relaxed mb-6">
                                            {selectedImages[activeIndex].description}
                                        </p>
                                        <div className="mt-auto border-t border-white/10 pt-4">
                                            <span className="text-silver/40 text-sm italic tracking-widest uppercase font-light">
                                                {selectedImages[activeIndex].medium}
                                            </span>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>

                            {/* Indicators & Navigation - Mobile Layout or Shared Footer */}
                            <div className="flex flex-col items-center gap-6 mt-4 w-full">
                                {/* Navigation Dots / Progress Indicator */}
                                <div className="flex items-center gap-2">
                                    {selectedImages.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setActiveIndex(index)}
                                            className={clsx(
                                                "h-1.5 rounded-full transition-all duration-300",
                                                activeIndex === index
                                                    ? "w-8 bg-white"
                                                    : "w-1.5 bg-white/20 hover:bg-white/40"
                                            )}
                                            aria-label={`Go to image ${index + 1}`}
                                        />
                                    ))}
                                </div>

                                <div className="text-silver/40 text-xs tracking-widest uppercase">
                                    {activeIndex + 1} / {selectedImages.length}
                                </div>

                                {/* Mobile Navigation Arrows */}
                                <div className="flex md:hidden items-center gap-12">
                                    <button onClick={handlePrev} className="p-4 text-white/50" aria-label="Previous image"><ChevronLeft size={32} /></button>
                                    <button onClick={handleNext} className="p-4 text-white/50" aria-label="Next image"><ChevronRight size={32} /></button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
