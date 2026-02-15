'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface ContentSectionProps {
    children: ReactNode
    className?: string
    delay?: number
}

export default function ContentSection({ children, className = "", delay = 0 }: ContentSectionProps) {
    return (
        <section className={`py-24 px-6 md:px-12 w-full max-w-7xl mx-auto ${className}`}>
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay }}
                viewport={{ once: true, margin: "-100px" }}
            >
                {children}
            </motion.div>
        </section>
    )
}
