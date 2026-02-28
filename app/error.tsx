'use client'
import { motion } from 'framer-motion'
import { useEffect } from 'react'

interface ErrorProps {
    error: Error & { digest?: string }
    reset: () => void
}

export default function GlobalError({ error }: ErrorProps) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#121212] overflow-hidden">
            {/* Background grid */}
            <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)
          `,
                    backgroundSize: '60px 60px',
                }}
            />

            {/* Subtle radial glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[600px] h-[600px] rounded-full bg-white/[0.02] blur-3xl" />
            </div>

            <div className="relative z-10 flex flex-col items-center text-center px-6">
                {/* Status label */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="font-mono text-xs tracking-[0.4em] text-white/30 mb-8 uppercase"
                >
                    System / Error
                </motion.div>

                {/* Ghost text */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                    className="text-[6rem] md:text-[10rem] font-thin tracking-tighter text-white/5 leading-none select-none"
                >
                    ERR
                </motion.div>

                {/* Glass card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                    className="mt-[-1rem] glass p-8 rounded-2xl max-w-sm w-full backdrop-blur-xl bg-white/5 border border-white/10"
                >
                    <h2 className="text-xl font-light text-white mb-3 tracking-tight">
                        Something went wrong
                    </h2>
                    <p className="text-white/40 font-extralight text-sm leading-relaxed">
                        An unexpected error occurred. Don&apos;t worry — it&apos;s not you, it&apos;s us. Head back home and we&apos;ll get things sorted out.
                    </p>

                    <a
                        href="/"
                        className="mt-6 inline-flex items-center gap-2 text-white/70 hover:text-white font-mono text-xs tracking-widest uppercase transition-colors duration-300"
                    >
                        <motion.span
                            animate={{ x: [0, -4, 0] }}
                            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                        >
                            ←
                        </motion.span>
                        Back to Home
                    </a>
                </motion.div>

                {/* Decorative corner lines */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="absolute top-8 left-8 w-8 h-8 border-t border-l border-white/10"
                />
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="absolute top-8 right-8 w-8 h-8 border-t border-r border-white/10"
                />
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="absolute bottom-8 left-8 w-8 h-8 border-b border-l border-white/10"
                />
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="absolute bottom-8 right-8 w-8 h-8 border-b border-r border-white/10"
                />
            </div>
        </div>
    )
}
