'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { clsx } from 'clsx'
import chartData from '@/app/verizon/data/chartData.json'

// Types
type PersonaType = 'sales' | 'designer' | 'architect'
type PriorityType = 'high' | 'medium' | 'low'

interface NodeData {
    id: number
    text: string
    shortText: string
    persona: PersonaType | string
    x: number
    y: number
    priority: PriorityType | string
    context: string
}

// Config
const PERSONA_CONFIG: Record<string, { label: string; color: string; ring: string; glow: string }> = {
    sales: {
        label: 'Sales Rep',
        color: 'bg-amber-500',
        ring: 'ring-amber-400',
        glow: 'shadow-[0_0_15px_rgba(245,158,11,0.5)]'
    },
    designer: {
        label: 'Solutions Designer',
        color: 'bg-emerald-500',
        ring: 'ring-emerald-400',
        glow: 'shadow-[0_0_15px_rgba(16,185,129,0.5)]'
    },
    architect: {
        label: 'Solutions Architect',
        color: 'bg-blue-500',
        ring: 'ring-blue-400',
        glow: 'shadow-[0_0_15px_rgba(59,130,246,0.5)]'
    }
}

const PRIORITY_SIZE_MAP: Record<string, string> = {
    high: 'w-6 h-6 md:w-8 md:h-8',
    medium: 'w-4 h-4 md:w-6 md:h-6',
    low: 'w-3 h-3 md:w-4 md:h-4'
}

export default function ImpactEffortScatterPlot() {
    const [activePersona, setActivePersona] = useState<string | null>(null)
    const [hoveredNode, setHoveredNode] = useState<number | null>(null)

    // Filter logic
    const isNodeActive = (persona: string) => !activePersona || activePersona === persona

    return (
        <div className="w-full flex flex-col gap-8">
            {/* Legend / Filter */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                {Object.entries(PERSONA_CONFIG).map(([key, config]) => (
                    <button
                        key={key}
                        onClick={() => setActivePersona(activePersona === key ? null : key)}
                        className={clsx(
                            "flex items-center gap-3 px-4 py-2 rounded-full border transition-all duration-300",
                            activePersona === key
                                ? "bg-white/10 border-white/40"
                                : "bg-transparent border-white/10 hover:border-white/20",
                            activePersona && activePersona !== key && "opacity-40"
                        )}
                    >
                        <span className={clsx("w-3 h-3 rounded-full", config.color)} />
                        <span className="text-sm font-light text-silver">{config.label}</span>
                    </button>
                ))}
            </div>

            {/* Chart Container - Relative with visible overflow for tooltips */}
            <div className="relative w-full aspect-[16/10] bg-[#1a1a1a] rounded-3xl border border-white/5 group">

                {/* Background Mask - Handles grid clipping */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                    {/* Dot Grid Background */}
                    <div
                        className="absolute inset-0 opacity-20"
                        style={{
                            backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
                            backgroundSize: '24px 24px'
                        }}
                    />
                </div>

                {/* Centered Axes (4 Quadrants) */}
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 pointer-events-none" />
                <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10 -translate-y-1/2 pointer-events-none" />

                {/* Axis Labels */}
                <div className="absolute inset-0 pointer-events-none p-4 opacity-50 select-none">
                    {/* Top / Bottom (Impact) */}
                    <span className="absolute top-4 bg-[#1a1a1a] px-2 left-1/2 -translate-x-1/2 text-sm uppercase tracking-[0.2em] text-white/40 font-medium">High Impact</span>
                    <span className="absolute bottom-4 bg-[#1a1a1a] px-2 left-1/2 -translate-x-1/2 text-sm uppercase tracking-[0.2em] text-white/40 font-medium">Low Impact</span>

                    {/* Left / Right (Effort) */}
                    <span className="absolute left-4 top-1/2 bg-[#1a1a1a] px-2 -translate-y-1/2 -rotate-90 origin-center text-sm uppercase tracking-[0.2em] text-white/40 font-medium">Low Effort</span>
                    <span className="absolute right-4 top-1/2 bg-[#1a1a1a] px-2 -translate-y-1/2 rotate-90 origin-center text-sm uppercase tracking-[0.2em] text-white/40 font-medium text-right">High Effort</span>
                </div>

                {/* Nodes */}
                {chartData.map((node: NodeData) => {
                    const config = PERSONA_CONFIG[node.persona] || { color: 'bg-white', ring: 'ring-white', glow: '' }
                    const sizeClass = PRIORITY_SIZE_MAP[node.priority] || 'w-4 h-4'
                    const isActive = isNodeActive(node.persona)
                    const isHovered = hoveredNode === node.id

                    return (
                        <motion.div
                            key={node.id}
                            className={clsx(
                                "absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer outline-none",
                                isHovered ? "z-50" : "z-10"
                            )}
                            style={{
                                left: `${node.x}%`,
                                top: `${100 - node.y}%` // Inverted Y axis
                            }}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{
                                opacity: isActive ? 1 : 0.2,
                                scale: isActive ? 1 : 0.8
                            }}
                            transition={{ duration: 0.3 }}
                            onMouseEnter={() => setHoveredNode(node.id)}
                            onMouseLeave={() => setHoveredNode(null)}
                            // Mobile implementation: toggle on tap
                            onClick={() => setHoveredNode(hoveredNode === node.id ? null : node.id)}
                            tabIndex={0}
                            role="button"
                            aria-label={`${node.shortText} - ${node.priority} priority`}
                        >
                            <motion.div
                                className={clsx(
                                    "rounded-full relative",
                                    config.color,
                                    sizeClass
                                )}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                {/* Glow Effect */}
                                {isActive && (
                                    <div className={clsx("absolute inset-0 rounded-full blur-[4px] opacity-70", config.color)} />
                                )}
                            </motion.div>

                            {/* Tooltip */}
                            <AnimatePresence>
                                {isHovered && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 5, scale: 0.95 }}
                                        className={clsx(
                                            "absolute bottom-full mb-4 w-64 p-4 z-50",
                                            "rounded-xl border border-white/10 backdrop-blur-xl shadow-xl",
                                            "bg-[#121212]/90 text-left pointer-events-none md:pointer-events-auto",
                                            // Intelligent positioning to prevent cutoff
                                            // Anchoring logic based on X position percentage
                                            node.x > 80 ? "right-0 translate-x-8" :
                                                node.x > 50 ? "right-1/2 translate-x-1/2" :
                                                    node.x < 20 ? "left-0 -translate-x-8" :
                                                        "left-1/2 -translate-x-1/2"
                                        )}
                                    >
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className={clsx("w-2 h-2 rounded-full", config.color)} />
                                            <span className="text-sm uppercase tracking-wider font-medium text-white/50">
                                                {config.label}
                                            </span>
                                        </div>
                                        <h4 className="text-white text-sm font-medium mb-1 leading-tight">
                                            {node.shortText}
                                        </h4>
                                        <p className="text-silver/80 text-sm leading-relaxed mb-3">
                                            {node.text}
                                        </p>
                                        <div className="border-t border-white/5 pt-2 mt-2">
                                            <p className="text-sm text-white/40 italic">
                                                {node.context}
                                            </p>
                                        </div>

                                        {/* Connector Arrow - simplified to bottom center of tooltip for now, or hidden to avoid misalignment with shifted tooltips */}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )
                })}
            </div>
        </div>
    )
}
