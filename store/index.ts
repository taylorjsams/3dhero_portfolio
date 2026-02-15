import { create } from 'zustand'

interface ScrollState {
    scrollY: number
    scrollProgress: number // 0 to 1
    currentSection: number
    setScroll: (scrollY: number, progress: number) => void
    setSection: (section: number) => void
}

export const useScrollStore = create<ScrollState>((set) => ({
    scrollY: 0,
    scrollProgress: 0,
    currentSection: 0,
    setScroll: (scrollY, progress) => set({ scrollY, scrollProgress: progress }),
    setSection: (section) => set({ currentSection: section }),
}))
