'use client'

import { motion } from 'framer-motion'

interface SectionHeaderProps {
    title: string
    className?: string
}

export default function SectionHeader({ title, className = "" }: SectionHeaderProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className={`flex items-center gap-8 w-full mb-12 ${className}`}
        >
            <h2 className="text-5xl md:text-6xl font-thin text-white tracking-tight">
                {title}
            </h2>
            <div className="h-px bg-white/20 flex-grow mt-2" />
        </motion.div>
    )
}
