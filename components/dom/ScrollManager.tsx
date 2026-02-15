'use client'
import { useEffect } from 'react'
import { useScrollStore } from '@/store'

export default function ScrollManager() {
    const setScroll = useScrollStore((state) => state.setScroll)
    const setSection = useScrollStore((state) => state.setSection)

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY || document.documentElement.scrollTop
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight
            const progress = maxScroll > 0 ? scrollY / maxScroll : 0

            setScroll(scrollY, progress)

            // Determine current section based on viewport height
            // This logic can be refined later with IntersectionObserver if needed
            const sectionHeight = window.innerHeight
            const currentSection = Math.round(scrollY / sectionHeight)

            setSection(currentSection)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll() // Initialize on mount

        return () => window.removeEventListener('scroll', handleScroll)
    }, [setScroll, setSection])

    return null
}
