'use client'

import { useState, useRef, useEffect } from 'react'

// Defined based on the user's provided data matrix image (simplified for 10 key items)
const entitlements = [
    { id: 'e1', label: 'Account Recon', targets: ['w1', 'w4', 'w5'] },
    { id: 'e2', label: 'ACH Origination', targets: ['w1', 'w2', 'w5', 'w6'] },
    { id: 'e3', label: 'Balance Reporting', targets: ['w3', 'w1'] },
    { id: 'e4', label: 'Enhanced Liquidity', targets: ['w3', 'w5', 'w6'] },
    { id: 'e5', label: 'Wire Payments', targets: ['w4', 'w6'] },
    { id: 'e6', label: 'Tokenized Payments', targets: ['w1', 'w2', 'w4', 'w6'] },
    { id: 'e7', label: 'Real-time Treasury', targets: ['w3', 'w1', 'w6'] },
    { id: 'e8', label: 'Smart Pay Global', targets: ['w1', 'w2', 'w5', 'w6'] },
    { id: 'e9', label: 'Fraud Control', targets: ['w1', 'w4'] }, // Extrapolated for visual balance
    { id: 'e10', label: 'FX Trading', targets: ['w1', 'w5', 'w6'] }
]

const widgets = [
    { id: 'w1', label: 'Open Tasks' },
    { id: 'w2', label: 'Quick Actions' },
    { id: 'w3', label: 'Global Liquidity' },
    { id: 'w4', label: 'Reports' },
    { id: 'w5', label: 'Insights' },
    { id: 'w6', label: 'Recent Updates' }
]

export default function RelationalNodeMap() {
    const [activeEntitlement, setActiveEntitlement] = useState<string | null>(null)

    const [nodePositions, setNodePositions] = useState<{ [key: string]: { x: number, y: number } }>({})
    const containerRef = useRef<HTMLDivElement>(null)
    const itemRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

    // Update positions on mount and window resize
    useEffect(() => {
        const updatePositions = () => {
            if (!containerRef.current) return
            const containerRect = containerRef.current.getBoundingClientRect()
            const newPositions: { [key: string]: { x: number, y: number } } = {}

            // Calculate Entitlement Positions (Right side center)
            entitlements.forEach(item => {
                const el = itemRefs.current[item.id]
                if (el) {
                    const rect = el.getBoundingClientRect()
                    newPositions[item.id] = {
                        x: rect.right - containerRect.left,
                        y: rect.top + rect.height / 2 - containerRect.top
                    }
                }
            })

            // Calculate Widget Positions (Left side center - the dot)
            widgets.forEach(item => {
                const el = itemRefs.current[item.id]
                if (el) {
                    const rect = el.getBoundingClientRect()
                    // Adjust for the dot position which is usually the first child
                    // But simpler: just take the left edge of the row container
                    // The dot is inside the container, likely ~6px from left if padding? 
                    // Let's look at the widget rendering: <div className="flex items-center gap-4"> <div className="dot"/> ...
                    newPositions[item.id] = {
                        x: rect.left - containerRect.left + 6, // Estimate dot center offset
                        y: rect.top + rect.height / 2 - containerRect.top
                    }
                }
            })

            setNodePositions(newPositions)
        }

        updatePositions()
        window.addEventListener('resize', updatePositions)
        return () => window.removeEventListener('resize', updatePositions)
    }, [])

    return (
        <div ref={containerRef} className="relative w-full min-h-[600px] bg-[#1a1a1a] rounded-3xl border border-white/10 overflow-hidden p-8 md:p-12">
            {/* Dot Grid Background */}
            <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
                    backgroundSize: '24px 24px'
                }}
            />

            {/* SVG Layer for Lines - Rendered behind content */}
            <svg className="hidden md:block absolute inset-0 w-full h-full pointer-events-none overflow-visible z-0">
                {entitlements.map((ent) => {
                    const entPos = nodePositions[ent.id]
                    const isActive = activeEntitlement === ent.id

                    if (!entPos) return null

                    return ent.targets.map((targetId) => {
                        const targetPos = nodePositions[targetId]
                        if (!targetPos) return null

                        // Draw Curve: Dynamic S-Curve based on distance
                        // M startX, startY C cp1x, cp1y cp2x, cp2y endX, endY
                        const diffX = targetPos.x - entPos.x
                        const controlPointX1 = entPos.x + (diffX * 0.5)
                        const controlPointX2 = targetPos.x - (diffX * 0.5)

                        return (
                            <path
                                key={`${ent.id}-${targetId}`}
                                d={`M ${entPos.x},${entPos.y} C ${controlPointX1},${entPos.y} ${controlPointX2},${targetPos.y} ${targetPos.x},${targetPos.y}`}
                                fill="none"
                                stroke="white"
                                strokeWidth={isActive ? 1.5 : 0.5}
                                className={`transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-20'}`}
                            />
                        )
                    })
                })}
            </svg>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 h-full pointer-events-none">

                {/* Left Column: Entitlements */}
                <div className="flex flex-col justify-center gap-4 pointer-events-auto">
                    <h3 className="text-white/40 text-xs uppercase tracking-widest mb-4">Entitlements</h3>
                    {entitlements.map((item) => (
                        <div
                            key={item.id}
                            ref={el => { itemRefs.current[item.id] = el }}
                            className={`group flex items-center justify-between cursor-pointer py-2 px-4 rounded-full transition-all duration-300 border border-transparent ${activeEntitlement === item.id ? 'bg-white text-black scale-105' : 'bg-white/5 text-silver hover:bg-white/10 hover:border-white/10'}`}
                            onMouseEnter={() => {
                                if (window.matchMedia('(hover: hover)').matches) {
                                    setActiveEntitlement(item.id)
                                }
                            }}
                            onMouseLeave={() => {
                                if (window.matchMedia('(hover: hover)').matches) {
                                    setActiveEntitlement(null)
                                }
                            }}
                            onClick={() => setActiveEntitlement(activeEntitlement === item.id ? null : item.id)}
                            role="button"
                            tabIndex={0}
                            aria-pressed={activeEntitlement === item.id}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault()
                                    setActiveEntitlement(activeEntitlement === item.id ? null : item.id)
                                }
                            }}
                        >
                            <span className="text-sm font-medium">{item.label}</span>
                            <div className={`w-2 h-2 rounded-full ml-4 ${activeEntitlement === item.id ? 'bg-violet-400' : 'bg-white/20'}`} />
                        </div>
                    ))}
                </div>

                {/* Center Spacer */}
                <div className="hidden md:block" />

                {/* Right Column: Widgets */}
                <div className="flex flex-col justify-center gap-8 pl-0 md:pl-12 pointer-events-auto">
                    <h3 className="text-white/40 text-xs uppercase tracking-widest mb-4">Affected Widgets</h3>
                    {widgets.map((widget) => {
                        // Check if this widget is targeted by the active entitlement
                        const isTargeted = activeEntitlement ? entitlements.find(e => e.id === activeEntitlement)?.targets.includes(widget.id) : false;

                        return (
                            <div
                                key={widget.id}
                                ref={el => { itemRefs.current[widget.id] = el }}
                                className={`flex items-center gap-4 transition-all duration-500 ${isTargeted ? 'opacity-100 translate-x-2' : 'opacity-30'}`}
                            >
                                <div className={`w-3 h-3 rounded-full border border-white flex-shrink-0 ${isTargeted ? 'bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]' : 'bg-transparent'}`} />
                                <span className={`text-lg font-light ${isTargeted ? 'text-white' : 'text-silver'}`}>{widget.label}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
