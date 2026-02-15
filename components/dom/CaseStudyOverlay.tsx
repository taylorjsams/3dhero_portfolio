'use client'
import Section from "@/components/dom/Section"
import { motion } from "framer-motion"
import { User, Calendar, Cpu, Building2, ArrowUpRight } from "lucide-react"
import Link from "next/link"

interface CaseStudyProps {
    title: string
    tags: string[]
    description: string
    role: string
    duration: string
    tools: string
    industry: string
    index: string
    href?: string
    id?: string
}

export default function CaseStudyOverlay({ title, tags, description, role, duration, tools, industry, href = "#", id }: CaseStudyProps) {
    return (
        <Section id={id} className="h-screen flex flex-col items-start justify-center snap-start w-full max-w-7xl px-6 md:px-12 relative pointer-events-none">
            <div className="w-full max-w-4xl pointer-events-auto text-left">
                {/* Title and Line */}
                <div className="relative mb-6">
                    <h2 className="text-3xl md:text-5xl font-thin text-white tracking-wider mb-4 whitespace-nowrap">
                        {title}
                    </h2>
                    {/* Horizontal Line with Dot connecting to 3D space */}
                    <div className="flex items-center w-full">
                        <div className="h-px bg-white/30 flex-grow min-w-[200px] md:min-w-[600px]"></div>
                        <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
                    </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {tags.map((tag, i) => (
                        <span key={i} className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs uppercase tracking-wider text-silver backdrop-blur-md">
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Description */}
                <p className="text-silver font-light text-lg md:text-xl leading-relaxed mb-12 max-w-xl text-left">
                    {description}
                </p>

                {/* Data Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm text-left mb-12">
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
                </div>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <Link
                        href={href}
                        className="inline-flex items-center gap-3 px-10 py-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl text-white text-xs uppercase tracking-[0.2em] font-light hover:bg-white/10 hover:border-white/30 transition-all duration-300 group"
                    >
                        View Project
                        <motion.div
                            animate={{ x: 0, y: 0 }}
                            whileHover={{ x: 2, y: -2 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                            <ArrowUpRight size={16} className="text-white/60 group-hover:text-white transition-colors" />
                        </motion.div>
                    </Link>
                </motion.div>
            </div>
        </Section>
    )
}
