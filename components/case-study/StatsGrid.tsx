'use client'

import { motion } from 'framer-motion'

interface Stat {
    value: string
    label: string
}

const defaultStats: Stat[] = [
    { value: '12+', label: 'Services Data Integrated' },
    { value: '85%', label: 'More Clicks on Page' },
    { value: '45%', label: 'Fewer Support Tickets' },
    { value: '3x', label: 'Faster Decisions' },
]

interface StatsGridProps {
    stats?: Stat[]
}

export default function StatsGrid({ stats = defaultStats }: StatsGridProps) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full">
            {stats.map((stat, index) => (
                <div key={index} className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 group">
                    <motion.span
                        initial={{ scale: 0.5, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1, type: "spring" }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-thin text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/50 transition-all"
                    >
                        {stat.value}
                    </motion.span>
                    <span className="text-xs uppercase tracking-widest text-white/50">{stat.label}</span>
                </div>
            ))}
        </div>
    )
}
