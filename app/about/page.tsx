import Section from "@/components/dom/Section"
import LiveClock from "@/components/dom/LiveClock"
import WeatherWidget from "@/components/dom/WeatherWidget"
import SocialLinks from "@/components/dom/SocialLinks"
import { Briefcase, GraduationCap, MousePointer2, Download, HeartHandshake } from "lucide-react"

export default function About() {
    const experience = [
        {
            role: "Vice President - Product Design",
            company: "BNY",
            duration: "Jan 2024 - Present",
            description: "Leading the digital transformation of legacy payment systems into unified, user-centric platforms for global enterprise clients. I orchestrate complex ecosystems by aligning cross-functional stakeholders to bridge the gap between institutional business requirements and intuitive, high-stakes digital workflows at scale."
        },
        {
            role: "Senior Designer",
            company: "Orion Innovation",
            duration: "Jun 2023 - Dec 2023",
            description: "Led the digital transformation of fragmented consumer experiences into modern, streamlined workflows for a diverse global clientele, including a major financial firm, an international appliance manufacturer, and a large-scale travel agency. I specialized in modernizing legacy systems to drive business efficiency and user engagement, delivering unified, high-performance product suites that successfully bridged the gap between complex technical constraints and intuitive design."
        },
        {
            role: "Product Designer",
            company: "Orion Innovation",
            duration: "Apr 2022 - Jun 2023",
            description: "Collaborated on the design modernization of Verizon’s enterprise sales tools, transforming legacy workflows into high-velocity interfaces that increased operational productivity. I also contributed to exploratory design for managed tablet experiences in emerging markets, leveraging scalable, user-centric architecture to identify and capture new revenue streams within a complex telecommunications ecosystem."
        },
        {
            role: "Senior Designer",
            company: "MARCH",
            duration: "Dec 2018 - Apr 2022",
            description: "Established unified graphic standards across web, digital, and print media to ensure total brand coherence. I led a full website redesign and engineered custom interactive controllers for large-format sales gallery displays, successfully bridging physical architecture with digital interfaces while managing high-stakes client relationships."
        },
        {
            role: "Designer",
            company: "MARCH",
            duration: "Jun 2015 - Dec 2018",
            description: "Contributed to the UX design of an AR software platform, which evolved into a core product that now generates significant revenue for the firm, and assisted on the development of new busines."
        }
    ]

    return (
        <main className="min-h-screen pt-32 pb-20 font-[family-name:var(--font-geist-sans)] flex flex-col gap-32 overflow-hidden">
            <div className="relative w-full flex flex-col gap-32 md:block">
                {/* Mobile-only background extension */}
                <div
                    className="absolute inset-x-0 -top-20 -bottom-20 z-0 md:hidden"
                    style={{
                        background: 'linear-gradient(to bottom, transparent 0%, rgba(18, 18, 18, 0.9) 15%, rgba(18, 18, 18, 0.9) 85%, transparent 100%)'
                    }}
                />

                <Section className="relative z-10 flex flex-col md:flex-row gap-12 items-start justify-between max-w-6xl mx-auto px-6">
                    <div className="flex-1 text-left">
                        <h1 className="text-3xl md:text-5xl font-thin text-white tracking-tight mb-8">
                            A Little About Me <HeartHandshake className="inline-block w-8 h-8 text-violet-800 ml-2 mb-2" />
                        </h1>
                        <p className="text-silver font-light text-base tracking-wide leading-relaxed max-w-2xl">
                            I&apos;m a builder by trade and a creator by heart. From my early days as an architect to my current role leading product design in the financial services space, I&apos;ve spent my career obsessing over how people move through spaces—both physical and digital. I don&apos;t just &apos;make things look good&apos;; I build systems that work.
                        </p>
                        <br />
                        <p className="text-silver font-light text-base tracking-wide leading-relaxed max-w-2xl">
                            My approach combines data-driven insights with creative problem-solving to build products that not only work beautifully but also drive real business results. When I&apos;m not at my desk, I&apos;m usually elbows-deep in a home renovation project, wandering through a local gallery, or crafting an over-the-top costume for my next big event.
                        </p>

                        {/* Identity Metadata */}
                        <div className="mt-8 pt-8 border-t border-white/10 flex flex-wrap gap-x-12 gap-y-6">
                            <div className="flex flex-col gap-1 items-start">
                                <span className="text-sm tracking-[0.2em] text-silver">Email</span>
                                <span className="text-base font-extralight text-white/80 uppercase tracking-widest">TaylorJSams@gmail.com</span>
                            </div>
                            <div className="flex flex-col gap-1 items-start">
                                <span className="text-sm tracking-[0.2em] text-silver">Birthday</span>
                                <span className="text-base font-extralight text-white/80 uppercase tracking-widest">October 10</span>
                            </div>
                            <div className="flex flex-col gap-1 items-start">
                                <span className="text-sm tracking-[0.2em] text-silver">Favorite Color</span>
                                <span className="text-base font-extralight text-white/80 uppercase tracking-widest shimmer">Clear & Sparkly</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 w-full md:w-auto items-center md:items-start [&>*]:w-full [&>*]:max-w-md md:[&>*]:w-[200px] md:[&>*]:max-w-none">
                        <LiveClock />
                        <WeatherWidget />
                        <SocialLinks />
                    </div>
                </Section>

                {/* Experience Timeline with Full-Width Background */}
                <div
                    className="relative z-10 w-full py-20 md:mt-20 bg-none md:bg-[linear-gradient(to_bottom,transparent_0%,rgba(18,18,18,0.9)_10%,rgba(18,18,18,0.9)_90%,transparent_100%)]"
                >
                    <Section className="text-left max-w-6xl mx-auto px-6">
                        <div className="flex justify-between items-center mb-12">
                            <h2 className="text-xs uppercase tracking-[0.2em] text-silver flex items-center gap-4">
                                <Briefcase size={16} className="text-white/40" />
                                Experience
                            </h2>
                            <a
                                href="/taylorsams_resume.pdf"
                                download="TaylorSams_Resume.pdf"
                                className="flex items-center gap-2 px-4 py-2 glass rounded-full text-[10px] uppercase tracking-widest text-white/70 hover:text-white hover:bg-white/10 transition-all group"
                            >
                                <Download size={12} className="group-hover:translate-y-0.5 transition-transform" />
                                Download Resume
                            </a>
                        </div>
                        <div className="relative border-l border-white/10 ml-3 md:ml-0 space-y-16">
                            {experience.map((job, i) => (
                                <div key={i} className="relative pl-12 md:pl-24 group">
                                    {/* Dot */}
                                    <div className="absolute left-0 -translate-x-[5px] top-2 w-2.5 h-2.5 rounded-full bg-white/20 group-hover:bg-white group-hover:shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all duration-300"></div>

                                    <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 mb-4">
                                        <h3 className="text-2xl text-white font-light">{job.role}</h3>
                                        <span className="text-silver text-sm md:text-base">@ {job.company}</span>
                                        <span className="text-white/30 text-xs font-mono md:ml-auto">{job.duration}</span>
                                    </div>
                                    <p className="text-silver/80 font-light leading-relaxed max-w-xl">
                                        {job.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </Section>
                </div>
            </div>

            {/* Education & Skills */}
            <Section className="grid grid-cols-1 md:grid-cols-2 gap-16 text-left max-w-6xl mx-auto px-6">
                {/* Education */}
                <div>
                    <h2 className="text-xs uppercase tracking-[0.2em] text-silver mb-8 flex items-center gap-4">
                        <GraduationCap size={16} className="text-white/40" />
                        Education
                    </h2>
                    <div className="space-y-8 pl-4 border-l border-white/10">
                        <div>
                            <h3 className="text-xl text-white font-light mb-1">B.Arch in Architecture</h3>
                            <div className="text-silver mb-2">Pratt Institute</div>
                            <div className="text-white/30 text-xs font-mono">2010 – 2015</div>
                        </div>
                        <div>
                            <h3 className="text-xl text-white font-light mb-1">Google UX Design</h3>
                            <div className="text-silver mb-2">Professional Certificate</div>
                            <div className="text-white/30 text-xs font-mono">2021</div>
                        </div>
                    </div>
                </div>

                {/* Skills */}
                <div>
                    <h2 className="text-xs uppercase tracking-[0.2em] text-silver mb-8 flex items-center gap-4">
                        <MousePointer2 size={16} className="text-white/40" />
                        Design Skills
                    </h2>
                    <div className="flex flex-wrap gap-2 pl-4 border-l border-white/10">
                        {["Product Design", "Design Systems", "Prototyping", "User Research", "Interaction Design", "Motion Design", "Figma", "Adobe Creative Suite", "3Ds Max + Vray", "HTML5/CSS3"].map((skill) => (
                            <span key={skill} className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-silver backdrop-blur-sm hover:bg-white/10 transition-colors">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </Section>
        </main>
    )
}
