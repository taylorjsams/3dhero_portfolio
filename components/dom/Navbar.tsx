'use client'

import Link from "next/link"
import { Mail } from "lucide-react"
import { usePathname } from "next/navigation"

export default function Navbar() {
    const pathname = usePathname()

    const handleWorkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (pathname === '/') {
            e.preventDefault()
            const workSection = document.getElementById('work-section')
            if (workSection) {
                workSection.scrollIntoView({ behavior: 'smooth' })
            }
        }
        // If not on '/', the default Link behavior will go to '/#work-section'
    }

    return (
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4 duration-1000">
            <div className="glass px-10 py-3 rounded-full flex gap-10 items-center text-xs font-medium tracking-widest text-white backdrop-blur-xl border border-white/10 bg-white/5 shadow-2xl shadow-black/20">
                <Link href="/" className="font-bold text-white tracking-tighter text-base hover:scale-105 transition-transform duration-300">TS</Link>

                <Link
                    href="/#work-section"
                    onClick={handleWorkClick}
                    className="hover:text-white/70 transition-colors duration-300"
                >
                    Work
                </Link>

                <Link href="/play" className="hover:text-white/70 transition-colors duration-300">Play</Link>

                <Link href="/about" className="hover:text-white/70 transition-colors duration-300">About</Link>

                <Link href="mailto:taylorjsams@gmail.com" className="hover:text-white/70 transition-colors duration-300 flex items-center gap-2">
                    <Mail size={14} />
                    <span>Contact</span>
                </Link>
            </div>
        </nav >
    )
}
