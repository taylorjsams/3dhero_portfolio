'use client'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="w-full py-12 px-6 border-t border-white/5 bg-black/20 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto text-center">
                <p className="text-silver text-[10px] uppercase tracking-[0.4em]">
                    &copy; {currentYear} Taylor Sams. All rights reserved.
                </p>
            </div>
        </footer>
    )
}
