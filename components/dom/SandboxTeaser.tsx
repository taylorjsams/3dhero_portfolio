import Section from "@/components/dom/Section"
import { ArrowUpRight, Sparkles } from "lucide-react"
import Link from "next/link"

export default function SandboxTeaser() {
    return (
        <Section className="min-h-screen flex flex-col items-center justify-center snap-start w-full max-w-7xl px-6 md:px-12 relative overflow-hidden">

            <div className="w-full relative z-10 mb-8">
                <div className="w-full rounded-[2.5rem] border border-white/10 bg-zinc-900 backdrop-blur-xl p-8 md:p-16 relative">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Left Column: Content */}
                        <div className="space-y-8 flex flex-col items-start text-left">
                            <div className="space-y-2">
                                <div className="flex items-center gap-3 mb-2">
                                    <Sparkles className="text-violet-400/60 w-5 h-5" />
                                    <span className="text-[10px] uppercase tracking-[0.3em] text-silver/60 font-medium">Experimental Lab</span>
                                </div>
                                <h2 className="text-3xl md:text-5xl font-thin text-white tracking-wider mb-4">
                                    Off the <span className="italic text-white/90">Clock</span>
                                </h2>
                                <p className="text-lg md:text-xl font-extralight text-silver/60 tracking-tight">
                                    Curiosity in Forms & Functions
                                </p>
                            </div>

                            <p className="text-silver font-light text-base md:text-lg leading-relaxed max-w-lg">
                                I spent my early career obsessing over how people move through physical spaces—a discipline built on progam, materiality physics, and strict parameters. My Play page is where I continue to explore those threads in other mediums. It's a digital archive of the experiments, 3D sculptures, and prototypes that started as 'what if' moments and became a way for me to push the boundaries of what I can build.
                            </p>

                            <div className="transform transition-transform hover:scale-105 active:scale-95 duration-200 inline-block">
                                <Link
                                    href="/play"
                                    className="inline-flex items-center gap-3 px-10 py-4 rounded-full border border-white/10 bg-white/5 text-white text-xs uppercase tracking-[0.2em] font-light hover:bg-white/10 hover:border-white/30 transition-all duration-300 group"
                                >
                                    Jump into Sandbox
                                    <div className="transform transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                                        <ArrowUpRight size={16} className="text-white/60 group-hover:text-white transition-colors" />
                                    </div>
                                </Link>
                            </div>
                        </div>

                        {/* Right Column: Animated Dog Illustration */}
                        <div className="relative h-[300px] md:h-[400px] flex flex-col items-center justify-center pointer-events-none w-full">
                            <style dangerouslySetInnerHTML={{
                                __html: `
                                @keyframes tailWag {
                                    0% { transform: rotate(15deg); }
                                    100% { transform: rotate(0deg); }
                                }
                                .wag-animation {
                                    animation: tailWag 0.6s ease-in-out infinite alternate;
                                }
                            `}} />

                            <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] opacity-80">
                                {/* Body */}
                                <img
                                    src="/static-body.svg"
                                    alt="Dog Body Outline"
                                    className="absolute inset-0 w-full h-full object-contain"
                                />
                                {/* Tail */}
                                <img
                                    src="/wagging-tail.svg"
                                    alt="Dog Tail Wagging"
                                    className="absolute wag-animation w-[30%] h-[40%] object-contain"
                                    style={{
                                        /* Position the tail relative to the body container */
                                        bottom: "23%",
                                        right: "8%",
                                        /* Pivot from the base of the tail */
                                        transformOrigin: "bottom center"
                                    }}
                                />
                            </div>
                            <div className="w-full flex justify-end">
                                <p className="text-sm text-white/40 mt-4 tracking-widest uppercase">
                                    Baxter says Hi
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    )
}
