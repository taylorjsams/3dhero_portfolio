'use client'

import { motion } from 'framer-motion'
import { Calendar, Users, PenTool, LayoutTemplate } from 'lucide-react'

const steps = [
    { title: 'Discovery', description: 'Stakeholder interviews and user panel insights to identify key pain points.', icon: Users },
    { title: 'Workshops', description: 'Collaborative sessions for journey mapping and entitlement modeling.', icon: Calendar },
    { title: 'Prototyping', description: 'Iterative wireframing and feedback loops.', icon: PenTool },
    { title: 'Validation', description: 'Usability testing with treasury heads to validate the new architecture.', icon: LayoutTemplate },
]

export default function Timeline() {
    return (
        <div className="relative flex flex-col lg:flex-row gap-12 lg:gap-8 py-12">
            {/* Desktop Connecting Line */}
            <div className="hidden lg:block absolute top-[72px] left-0 w-full h-px bg-white/10" />

            {/* Mobile Connecting Line */}
            <div className="lg:hidden absolute left-6 top-0 bottom-0 w-px bg-white/10" />

            {steps.map((step, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.15 }}
                    viewport={{ once: true }}
                    className="relative flex flex-row lg:flex-col items-start lg:items-center text-left lg:text-center group flex-1"
                >
                    {/* Indicator Marker */}
                    <div className="relative z-10 flex flex-col items-center justify-center mr-8 lg:mr-0 lg:mb-8">
                        <div className="w-12 h-12 rounded-full border border-violet-500/20 bg-background flex items-center justify-center transition-all duration-300 group-hover:border-violet-500/40 group-hover:scale-110">
                            <div className="w-2 h-2 bg-white rounded-full group-hover:scale-125 transition-transform" />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 lg:max-w-[240px]">
                        <h3 className="text-sm font-bold text-white uppercase tracking-[0.2em] mb-4">
                            {step.title}
                        </h3>
                        <p className="text-sm text-silver font-light leading-relaxed max-w-xs transition-colors duration-300 group-hover:text-white/80">
                            {step.description}
                        </p>
                    </div>
                </motion.div>
            ))}
        </div>
    )
}
