'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import PortalGlass from '@/components/dom/PortalGlass'

export default function LiveClock() {
    const [time, setTime] = useState<string>('')

    useEffect(() => {
        const updateTime = () => {
            const now = new Date()
            setTime(now.toLocaleTimeString('en-US', {
                timeZone: 'America/New_York',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            }))
        }

        updateTime()
        const interval = setInterval(updateTime, 1000)
        return () => clearInterval(interval)
    }, [])

    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
        >
            <PortalGlass 
                className="px-6 py-4 flex flex-col items-center justify-center relative"
                glassClassName="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md"
            >
                <span className="text-silver text-xs uppercase tracking-widest mb-1">New York, NY</span>
                <div className="text-2xl font-mono text-white tabular-nums tracking-widest">
                    {time || "--:--:--"}
                </div>
            </PortalGlass>
        </motion.div>
    )
}
