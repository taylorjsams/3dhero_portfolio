'use client'
import { useProgress } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

export default function Loader() {
    const { progress, active, item } = useProgress()
    const [show, setShow] = useState(true)
    const hasFinished = useRef(false)
    const activeRef = useRef(active)

    useEffect(() => {
        // Track if it was ever active
        if (active) activeRef.current = true

        // Finish condition:
        // 1. Progress is 100%
        // 2. OR it was active and is now inactive (loading finished)
        // 3. OR it's been mounted for 1.5s and never became active (no assets to load)
        const isFinished =
            progress === 100 ||
            (activeRef.current && !active)

        if (isFinished && !hasFinished.current) {
            hasFinished.current = true
            const timer = setTimeout(() => setShow(false), 500)
            return () => clearTimeout(timer)
        }
    }, [progress, active])

    useEffect(() => {
        // Fallback for scenes with absolutely zero external assets
        const timer = setTimeout(() => {
            if (!hasFinished.current && !activeRef.current) {
                hasFinished.current = true
                setShow(false)
            }
        }, 1500)
        return () => clearTimeout(timer)
    }, [])

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
