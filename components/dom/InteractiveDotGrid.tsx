'use client'

import { useEffect, useRef } from 'react'

export default function InteractiveDotGrid() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let width = window.innerWidth
        let height = window.innerHeight
        canvas.width = width
        canvas.height = height

        const spacing = 24
        const radius = 1
        const mouse = { x: -1000, y: -1000 }
        const maxDistance = 150
        const pullStrength = 0.4
        const FRAME_INTERVAL = 1000 / 30 // ~30 FPS cap

        let isVisible = true
        let animationFrameId: number
        let lastFrameTime = 0

        const dots: { x: number; y: number; baseX: number; baseY: number }[] = []

        const initDots = () => {
            dots.length = 0
            for (let x = 0; x <= width; x += spacing) {
                for (let y = 0; y <= height; y += spacing) {
                    dots.push({ x, y, baseX: x, baseY: y })
                }
            }
        }
        initDots()

        const handleResize = () => {
            width = window.innerWidth
            height = window.innerHeight
            canvas.width = width
            canvas.height = height
            initDots()
        }

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX
            mouse.y = e.clientY
        }

        const handleMouseLeave = () => {
            mouse.x = -1000
            mouse.y = -1000
        }

        window.addEventListener('resize', handleResize)
        window.addEventListener('mousemove', handleMouseMove)
        document.body.addEventListener('mouseleave', handleMouseLeave)

        // --- IntersectionObserver: pause when off-screen ---
        const observer = new IntersectionObserver(
            ([entry]) => {
                isVisible = entry.isIntersecting
                if (isVisible) {
                    lastFrameTime = 0
                    animationFrameId = requestAnimationFrame(render)
                }
            },
            { threshold: 0 }
        )
        observer.observe(canvas)

        const render = (timestamp: number = 0) => {
            if (!isVisible) return

            // --- FPS throttle ---
            if (timestamp - lastFrameTime < FRAME_INTERVAL) {
                animationFrameId = requestAnimationFrame(render)
                return
            }
            lastFrameTime = timestamp

            ctx.clearRect(0, 0, width, height)
            ctx.fillStyle = 'rgba(255, 255, 255, 0.2)'

            for (let i = 0; i < dots.length; i++) {
                const dot = dots[i]
                const dx = mouse.x - dot.baseX
                const dy = mouse.y - dot.baseY
                const distance = Math.sqrt(dx * dx + dy * dy)

                if (distance < maxDistance) {
                    const pull = ((maxDistance - distance) / maxDistance) * pullStrength
                    dot.x = dot.baseX + dx * pull
                    dot.y = dot.baseY + dy * pull
                } else {
                    dot.x += (dot.baseX - dot.x) * 0.1
                    dot.y += (dot.baseY - dot.y) * 0.1
                }

                ctx.beginPath()
                ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2)
                ctx.fill()
            }

            animationFrameId = requestAnimationFrame(render)
        }

        render()

        return () => {
            window.removeEventListener('resize', handleResize)
            window.removeEventListener('mousemove', handleMouseMove)
            document.body.removeEventListener('mouseleave', handleMouseLeave)
            cancelAnimationFrame(animationFrameId)
            observer.disconnect()
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none z-0"
        />
    )
}
