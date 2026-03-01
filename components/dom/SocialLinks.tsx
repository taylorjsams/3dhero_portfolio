'use client'

import { motion } from 'framer-motion'
import { Linkedin, Github, ExternalLink } from 'lucide-react'

export default function SocialLinks() {
    const socials = [
        {
            name: 'LinkedIn',
            url: 'https://www.linkedin.com/in/taylor-sams/',
            icon: <Linkedin size={18} />,
            color: 'hover:text-[#0077B5]'
        },
        {
            name: 'GitHub',
            url: 'https://github.com/taylorjsams',
            icon: <Github size={18} />,
            color: 'hover:text-white'
        }
    ]

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className="glass px-6 py-4 rounded-xl flex flex-col border border-white/10 bg-white/5 backdrop-blur-md"
        >
            <span className="text-silver text-xs uppercase tracking-[0.2em] mb-4">Connect</span>

            <div className="flex flex-col gap-3">
                {socials.map((social) => (
                    <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center justify-between group transition-colors ${social.color}`}
                        aria-label={social.name}
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-white/40 group-hover:text-inherit transition-colors">
                                {social.icon}
                            </span>
                            <span className="text-sm font-light text-silver group-hover:text-white transition-colors">
                                {social.name}
                            </span>
                        </div>
                        <ExternalLink size={12} className="text-white/10 group-hover:text-white/40 transition-colors" />
                    </a>
                ))}
            </div>

            <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
                <span className="text-[8px] font-mono text-white/20 tracking-tighter uppercase">
                    Social Presence
                </span>
                <span className="text-[8px] font-mono text-white/10 uppercase tracking-widest">
                    v1.0
                </span>
            </div>
        </motion.div>
    )
}
