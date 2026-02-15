'use client'
import { useProgress } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Loader() {
    const { progress } = useProgress()
    const [show, setShow] = useState(true)

    useEffect(() => {
        if (progress === 100) {
            const timer = setTimeout(() => setShow(false), 500)
            return () => clearTimeout(timer)
        }
        if (!show) {
            const t = setTimeout(() => setShow(true), 0)
            return () => clearTimeout(t)
        }
    }, [progress, show])

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-[#121212] flex-col"
                >
                    <div className="text-white font-mono text-sm mb-4 tracking-widest">{Math.round(progress)}%</div>
                    <div className="w-48 h-[1px] bg-white/20 overflow-hidden relative">
                        <motion.div
                            className="h-full bg-white absolute top-0 left-0"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.1 }}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
