

import Section from "@/components/dom/Section";
import SectionHeader from "@/components/case-study/SectionHeader";
import VisualExplorations from "@/components/dom/VisualExplorations";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function PlayPage() {
    return (
        <main className="flex flex-col items-center text-center w-full min-h-screen font-[family-name:var(--font-geist-sans)] pt-32">

            {/* Header Section */}
            <Section className="flex flex-col items-center justify-center w-full max-w-4xl px-6 mb-24">
                <h1 className="text-6xl md:text-[5rem] font-thin tracking-tighter text-white mix-blend-overlay leading-none mb-6">
                    Play
                </h1>
                <p className="text-silver font-extralight text-lg max-w-xl leading-relaxed">
                    A collection of side projects, experiments, and visual explorations.
                    A sandbox for code and creativity.
                </p>
            </Section>

            {/* Interactive Projects (Cross-Repo) */}
            <Section className="w-full max-w-6xl px-6 mb-32">
                <SectionHeader title="Interactive Projects" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    {/* Placeholder for future projects */}
                    <Link href="#" className="group relative aspect-video glass rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all flex flex-col items-center justify-center p-8 text-center bg-white/5 cursor-not-allowed opacity-50">
                        <ArrowUpRight className="text-white/20 group-hover:text-white/60 mb-4 transition-colors" size={48} />
                        <h3 className="text-white text-xl font-light mb-1">Coming Soon</h3>
                        <p className="text-silver/40 text-sm font-extralight">New projects will appear here as they are deployed.</p>
                    </Link>

                    <Link href="#" className="group relative aspect-video glass rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all flex flex-col items-center justify-center p-8 text-center bg-white/5 cursor-not-allowed opacity-50">
                        <ArrowUpRight className="text-white/20 group-hover:text-white/60 mb-4 transition-colors" size={48} />
                        <h3 className="text-white text-xl font-light mb-1">Coming Soon</h3>
                        <p className="text-silver/40 text-sm font-extralight">New projects will appear here as they are deployed.</p>
                    </Link>
                </div>
            </Section>

            {/* Visual Explorations Gallery */}
            <Section className="w-full max-w-6xl px-6 pb-24">
                <SectionHeader title="Visual Explorations" />
                <VisualExplorations />
            </Section>

        </main>
    );
}
