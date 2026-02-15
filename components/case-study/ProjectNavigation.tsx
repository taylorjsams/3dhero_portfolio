'use client'

import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'


const projects = [
    {
        id: 'payments-reimagined',
        title: 'Payments Re-Imagined',
        href: '/payments-reimagined',
        subtitle: 'Product Design • Strategy'
    },
    {
        id: 'treasury-dashboard',
        title: 'Treasury Dashboard',
        href: '/treasury-dashboard',
        subtitle: 'Fintech • Data Viz'
    },
    {
        id: 'verizon',
        title: 'Verizon BUSS 2.0',
        href: '/verizon',
        subtitle: 'UX Research • Systems'
    }
]

interface ProjectNavigationProps {
    currentId: string
}

export default function ProjectNavigation({ currentId }: ProjectNavigationProps) {
    const currentIndex = projects.findIndex(p => p.id === currentId)

    // Calculate Prev/Next with loop
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length
    const nextIndex = (currentIndex + 1) % projects.length

    const prevProject = projects[prevIndex]
    const nextProject = projects[nextIndex]

    return (
        <div className="w-full border-t border-white/10 mt-32">
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10">
                {/* Previous Project Link */}
                <Link href={prevProject.href} className="group relative block p-12 md:p-24 overflow-hidden">
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.02] transition-colors duration-500" />

                    <motion.div
                        className="relative z-10 flex flex-col items-start h-full justify-between gap-8"
                        initial="rest"
                        whileHover="hover"
                        animate="rest"
                    >
                        <div className="flex items-center gap-4 text-silver/40 group-hover:text-silver transition-colors">
                            <motion.div variants={{ rest: { x: 0 }, hover: { x: -8 } }} transition={{ duration: 0.3, ease: "easeOut" }}>
                                <ArrowLeft size={20} />
                            </motion.div>
                            <span className="text-sm uppercase tracking-widest font-light">Previous Project</span>
                        </div>

                        <div>
                            <h3 className="text-3xl md:text-4xl text-white font-thin mb-2">{prevProject.title}</h3>
                            <p className="text-silver/40 font-light">{prevProject.subtitle}</p>
                        </div>
                    </motion.div>
                </Link>

                {/* Next Project Link */}
                <Link href={nextProject.href} className="group relative block p-12 md:p-24 overflow-hidden text-right">
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.02] transition-colors duration-500" />

                    <motion.div
                        className="relative z-10 flex flex-col items-end h-full justify-between gap-8"
                        initial="rest"
                        whileHover="hover"
                        animate="rest"
                    >
                        <div className="flex items-center gap-4 text-silver/40 group-hover:text-silver transition-colors">
                            <span className="text-sm uppercase tracking-widest font-light">Next Project</span>
                            <motion.div variants={{ rest: { x: 0 }, hover: { x: 8 } }} transition={{ duration: 0.3, ease: "easeOut" }}>
                                <ArrowRight size={20} />
                            </motion.div>
                        </div>

                        <div>
                            <h3 className="text-3xl md:text-4xl text-white font-thin mb-2">{nextProject.title}</h3>
                            <p className="text-silver/40 font-light">{nextProject.subtitle}</p>
                        </div>
                    </motion.div>
                </Link>
            </div>
        </div>
    )
}
