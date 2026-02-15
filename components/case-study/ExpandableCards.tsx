'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

interface Card {
    title: string
    body: string
}

interface ExpandableCardsProps {
    cards: Card[]
}

export default function ExpandableCards({ cards }: ExpandableCardsProps) {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

    return (
        <div className="flex flex-col gap-4 w-full">
            {cards.map((card, i) => (
                <motion.div
                    key={i}
                    className={`bg-white/5 border border-white/10 rounded-2xl overflow-hidden cursor-pointer transition-colors duration-300 ${expandedIndex === i ? 'bg-white/10 border-white/20' : 'hover:bg-white/10'}`}
                    onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
                    role="button"
                    tabIndex={0}
                    aria-expanded={expandedIndex === i}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            setExpandedIndex(expandedIndex === i ? null : i)
                        }
                    }}
                >
                    <div className="p-6 flex items-center justify-between">
                        <h3 className="text-lg font-normal text-white">{card.title}</h3>
                        <div className={`p-2 rounded-full bg-white/5 transition-transform duration-300 ${expandedIndex === i ? 'rotate-180' : ''}`}>
                            {expandedIndex === i ? <Minus size={20} className="text-white" /> : <Plus size={20} className="text-white/60" />}
                        </div>
                    </div>
                    <AnimatePresence>
                        {expandedIndex === i && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                                <div className="px-6 pb-6 text-sm text-silver leading-relaxed">
                                    {card.body}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            ))}
        </div>
    )
}
