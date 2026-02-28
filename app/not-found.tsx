'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import InteractiveDotGrid from '@/components/dom/InteractiveDotGrid'

export default function NotFound() {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#121212] overflow-hidden">
      <InteractiveDotGrid />

      {/* Dark violet vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle at center, transparent 20%, rgba(139, 92, 246, 0.12) 100%)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Glass card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="glass p-8 rounded-2xl max-w-sm w-full backdrop-blur-sm bg-white/5 border border-white/10 flex flex-col items-center text-center"
        >
          {/* Tag */}
          <div className="px-3 py-1 rounded-full border border-red-500/50 bg-red-500/5 text-[10px] uppercase tracking-wider text-red-500 backdrop-blur-md mb-6">
            Error: 404
          </div>

          <h2 className="text-3xl font-thin text-white tracking-wider mb-3 uppercase">
            UH OH
          </h2>
          <p className="text-white/40 font-extralight text-sm leading-relaxed mb-8">
            Page not found. Don&apos;t panic, let&apos;s head home.
          </p>

          <Link
            href="/"
            className="inline-flex items-center gap-3 px-10 py-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl text-white text-xs uppercase tracking-[0.2em] font-light hover:bg-white/10 hover:border-white/30 transition-all duration-300 group"
          >
            <motion.div
              animate={{ x: 0, y: 0 }}
              whileHover={{ x: -2, y: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <ArrowLeft size={16} className="text-white/60 group-hover:text-white transition-colors" />
            </motion.div>
            Back Home
          </Link>
        </motion.div>


      </div>
    </div>
  )
}
