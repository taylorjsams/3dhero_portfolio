'use client'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface SectionProps {
    children: ReactNode
    className?: string
    id?: string
}

export default function Section({ children, className = "", id }: SectionProps) {
    return (
        <motion.section
            id={id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // Apple-like ease
            className={className}
        >
            {children}
        </motion.section>
    )
}
