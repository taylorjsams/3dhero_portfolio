'use client'

import Link from 'next/link'
import { Linkedin } from 'lucide-react'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="w-full py-12 px-6 border-t border-white/5 bg-black/20 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
                <p className="text-silver text-[10px] uppercase tracking-[0.4em]">
                    &copy; {currentYear} Taylor Sams. All rights reserved.
                </p>
                <Link
                    href="https://www.linkedin.com/in/taylor-sams"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-silver hover:text-white transition-colors p-2"
                    aria-label="LinkedIn Profile"
                >
                    <Linkedin size={16} />
                </Link>
            </div>
        </footer>
    )
}
