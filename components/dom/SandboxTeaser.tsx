'use client'
import Section from "@/components/dom/Section"
import { motion } from "framer-motion"
import { ArrowUpRight, Terminal } from "lucide-react"
import Link from "next/link"

export default function SandboxTeaser() {
    return (
        <Section className="min-h-screen flex flex-col items-center justify-center snap-start w-full max-w-7xl px-6 md:px-12 relative">
            <div className="w-full text-left">
                {/* Title and Line (Matching Case Study Styling) */}
                <div className="relative mb-6">
                    <h2 className="text-3xl md:text-5xl font-thin text-white tracking-wider mb-2 whitespace-nowrap uppercase">
                        Off the Clock
                    </h2>
                    <h3 className="text-xl md:text-2xl font-extralight text-silver/60 tracking-tight mb-4">
                        Space for Personal Explorations
                    </h3>
                    {/* Horizontal Line with Dot connecting to 3D space */}
                    <div className="flex items-center w-full">
                        <div className="h-px bg-white/20 flex-grow"></div>
                        <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mt-12">
                    {/* Left Column: Body Text & CTA */}
                    <div className="space-y-8 max-w-xl">
                        <p className="text-silver font-light text-lg md:text-xl leading-relaxed">
                            I spent my early career obsessing over how people move through physical spaces—a discipline built on rules, physics, and strict constraints. My &apos;Play&apos; page is where I let those constraints go. It&apos;s a digital archive of the experiments, 3D sculptures, and prototypes that started as &apos;what if&apos; moments and became a way for me to push the boundaries of what I can build.
                        </p>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <Link
                                href="/play"
                                className="inline-flex items-center gap-3 px-10 py-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl text-white text-xs uppercase tracking-[0.2em] font-light hover:bg-white/10 hover:border-white/30 transition-all duration-300 group"
                            >
                                Explore
                                <motion.div
                                    animate={{ x: 0, y: 0 }}
                                    whileHover={{ x: 2, y: -2 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                >
                                    <ArrowUpRight size={16} className="text-silver/60 group-hover:text-white transition-colors" />
                                </motion.div>
                            </Link>
                        </motion.div>
                    </div>

                    {/* Right Column: Terminal Style Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="glass rounded-2xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-xl group hover:border-white/20 transition-colors shadow-2xl shadow-black/40"
                    >
                        {/* Terminal Header */}
                        <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
                            <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/40"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/40"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/40"></div>
                            </div>
                            <div className="flex items-center gap-2 text-[10px] text-silver/40 font-mono tracking-tight">
                                <Terminal size={10} />
                                sandbox.tsx
                            </div>
                        </div>

                        {/* Code Content */}
                        <div className="p-8 md:p-12 font-mono flex flex-col items-center justify-center overflow-hidden">
                            <pre className="text-transparent bg-clip-text bg-gradient-to-b from-purple-400 via-blue-400 via-emerald-400 via-yellow-400 to-rose-400 font-mono text-[10px] md:text-[13px] leading-[1.2] md:leading-[1.4] select-none text-center">
                                {`      { }             [ ]      
   ( ) { }         [ ] ( )   
 < > ( ) { }     [ ] ( ) < > 
! @ < > ( ) { } [ ] ( ) < > !
# $ ! @ < > ( ) { } [ ] @ ! $
 % ^ # $ ! @ < > ( ) { } ^ % 
  & * % ^ # $ ! @ < > * &   
    - + & * % ^ # $ + -     
      _ = - + & * = _       
        ? ~ _ = ~ ?         
          \` | \` |          
            : ;             
             !              `}
                            </pre>

                            <motion.div
                                className="w-1.5 h-4 bg-rose-400/60 mt-6 inline-block"
                                animate={{ opacity: [1, 0] }}
                                transition={{ repeat: Infinity, duration: 1 }}
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </Section>
    )
}
