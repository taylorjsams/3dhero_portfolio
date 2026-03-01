'use client'

import Link from "next/link"
import { Mail, Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function Navbar() {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)

    // Close menu when route changes
    useEffect(() => {
        setIsOpen(false)
    }, [pathname])

    // Close menu on resize if above mobile breakpoint
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsOpen(false)
            }
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const handleWorkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (pathname === '/') {
            e.preventDefault()
            const workSection = document.getElementById('work-section')
            if (workSection) {
                workSection.scrollIntoView({ behavior: 'smooth' })
                setIsOpen(false)
            }
        }
    }

    const navLinks = [
        { name: 'Work', href: '/#work-section', onClick: handleWorkClick },
        { name: 'Play', href: '/play' },
        { name: 'About', href: '/about' },
    ]

    return (
        <>
            <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4 duration-1000 w-full max-w-fit px-6">
                <div className="glass px-6 md:px-10 py-3 rounded-full flex gap-6 md:gap-10 items-center text-xs font-medium tracking-widest text-white backdrop-blur-xl border border-white/10 bg-white/5 shadow-2xl shadow-black/20">
                    <Link href="/" className="font-bold text-white tracking-tighter text-base hover:scale-105 transition-transform duration-300">TS</Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex gap-10 items-center">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={link.onClick}
                                className="hover:text-white/70 transition-colors duration-300"
                            >
                                {link.name}
                            </Link>
                        ))}

                        <Link href="mailto:taylorjsams@gmail.com" className="hover:text-white/70 transition-colors duration-300 flex items-center gap-2">
                            <Mail size={14} />
                            <span>Contact</span>
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden text-white hover:text-white/70 transition-colors"
                        aria-label="Toggle Menu"
                    >
                        {isOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </nav >

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 md:hidden pt-28 px-6"
                    >
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setIsOpen(false)} />
                        <div className="relative glass rounded-3xl p-8 flex flex-col gap-8 items-center border border-white/10 bg-white/5 shadow-2xl">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={link.onClick}
                                    className="text-lg font-light tracking-[0.2em] text-white hover:text-white/70 transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link
                                href="mailto:taylorjsams@gmail.com"
                                className="text-lg font-light tracking-[0.2em] text-white hover:text-white/70 transition-colors flex items-center gap-3"
                                onClick={() => setIsOpen(false)}
                            >
                                <Mail size={18} />
                                Contact
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
