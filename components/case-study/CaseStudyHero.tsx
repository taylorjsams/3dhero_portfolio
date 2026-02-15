'use client'

import { motion } from 'framer-motion'
import { ArrowDown, User, Calendar, Cpu, Building2 } from 'lucide-react'

interface CaseStudyHeroProps {
    title: string
    subtitle: string
    tags: string[]
    role: string
    duration: string
    tools: string
    industry: string
}

export default function CaseStudyHero({ title, subtitle, tags, role, duration, tools, industry }: CaseStudyHeroProps) {
    return (
        <section className="min-h-screen relative flex flex-col justify-center items-start px-6 md:px-12 w-full max-w-7xl mx-auto">
            <div className="max-w-4xl w-full z-10 text-left">
                {/* Title and Line */}
                <div className="relative mb-6">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-3xl md:text-5xl lg:text-7xl font-thin text-white tracking-wider mb-4 whitespace-nowrap"
                    >
                        {title}
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="flex items-center w-full origin-left"
                    >
                        <div className="h-px bg-white/30 flex-grow min-w-[200px] md:min-w-[600px]"></div>
                        <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
                    </motion.div>
                </div>

                {/* Tags */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex flex-wrap gap-2 mb-8"
                >
                    {tags.map((tag, i) => (
                        <span key={i} className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs uppercase tracking-wider text-silver backdrop-blur-md">
                            {tag}
                        </span>
                    ))}
                </motion.div>

                {/* Subtitle / Description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-silver font-light text-lg md:text-xl leading-relaxed mb-12 max-w-2xl"
                >
                    {subtitle}
                </motion.p>

                {/* Data Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm text-left mb-12"
                >
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-silver">
                            <User size={12} className="opacity-50" />
                            <span className="text-[10px] uppercase tracking-wider">Role</span>
                        </div>
                        <span className="text-white block font-light">{role}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-silver">
                            <Calendar size={12} className="opacity-50" />
                            <span className="text-[10px] uppercase tracking-wider">Duration</span>
                        </div>
                        <span className="text-white block font-light">{duration}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-silver">
                            <Cpu size={12} className="opacity-50" />
                            <span className="text-[10px] uppercase tracking-wider">Tools</span>
                        </div>
                        <span className="text-white block font-light">{tools}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-silver">
                            <Building2 size={12} className="opacity-50" />
                            <span className="text-[10px] uppercase tracking-wider">Industry</span>
                        </div>
                        <span className="text-white block font-light">{industry}</span>
                    </div>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
            >
                <span className="text-xs uppercase tracking-[0.2em] font-light">Scroll to see more</span>
                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    <ArrowDown size={20} />
                </motion.div>
            </motion.div>
        </section>
    )
}
