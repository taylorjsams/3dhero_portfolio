'use client'

import { motion } from 'framer-motion'
import ProjectNavigation from "@/components/case-study/ProjectNavigation"
import Link from 'next/link'
import { ArrowLeft, Construction } from 'lucide-react'

export default function PaymentsPlaceholder() {
    return (
        <main className="min-h-screen flex flex-col justify-between px-6">
            <div className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 0)',
                    backgroundSize: '40px 40px',
                }}
            />

            <div className="flex-1 flex items-center justify-center w-full pt-40 pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 w-full max-w-2xl text-center"
                >
                    <div className="glass p-12 md:p-20 rounded-[2rem] border border-white/10 backdrop-blur-2xl bg-white/[0.02] shadow-2xl relative overflow-hidden group">
                        {/* Animated Glow */}
                        <div className="absolute -top-24 -left-24 w-48 h-48 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors duration-700" />

                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-violet-500/10 bg-violet-500/5 text-[10px] uppercase tracking-[0.3em] text-violet-300 mb-10"
                        >
                            <Construction size={14} className="animate-pulse" />
                            <span>Work in Progress</span>
                        </motion.div>

                        <h1 className="text-4xl md:text-6xl font-thin text-white tracking-tight mb-6 leading-tight">
                            Payments <br />
                            <span className="text-white/40 italic">Re-Imagined</span>
                        </h1>

                        <p className="text-silver/60 font-light text-lg mb-12 max-w-md mx-auto leading-relaxed">
                            I&apos;m currently documenting the process behind this fundamental redesign and integration of the bank&apos;s payment services. Check back soon.
                        </p>

                        <Link href="/#work" className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black text-xs uppercase tracking-widest font-bold hover:scale-105 active:scale-95 transition-all group">
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                            Back to Works
                        </Link>
                    </div>
                </motion.div>
            </div>

            <ProjectNavigation currentId="payments-reimagined" />
        </main>
    )
}
