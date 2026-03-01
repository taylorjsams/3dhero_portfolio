'use client'

import CaseStudyHero from "@/components/case-study/CaseStudyHero"
import ContentSection from "@/components/case-study/ContentSection"
import SectionHeader from "@/components/case-study/SectionHeader"
import Image from "next/image"
import { clsx } from "clsx"
import { MoveDownRight, Check, ListChecks, DatabaseZap, ChartColumn } from "lucide-react"
import ImpactEffortScatterPlot from "@/components/verizon/ImpactEffortScatterPlot"
import VerizonGallery from "@/components/verizon/VerizonGallery"
import ProjectNavigation from "@/components/case-study/ProjectNavigation"
import StatsGrid from "@/components/case-study/StatsGrid"

export default function VerizonPage() {
    return (
        <main className="min-h-screen">
            {/* Section 1: Hero */}
            <CaseStudyHero
                title="Verizon BuSS 2.0"
                subtitle="Imagining an innovative & robust sales tool for incredible bulk volume quote-building and catalog management"
                tags={["Enterprise UX", "Product Design", "UX Research"]}
                role="UX Designer"
                duration="April 2023 - August 2023"
                tools="Sketch, Adobe Creative Suite, Full Story"
                industry="Telecommunications"
            />

            {/* Section 2: Project Overview - Gradient Transition */}
            <div className="w-full bg-gradient-to-b from-transparent to-[#121212]/90">
                <ContentSection className="max-w-6xl">
                    <SectionHeader title="Project Overview" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-base text-silver font-light antialiased leading-relaxed">
                        <div className="flex flex-col justify-center">
                            <h3 className="text-2xl text-white font-light mb-6">About the project</h3>
                            <p className="mb-6">
                                Verizon has a nationally recognizable brand and an incredible marketing team - they&apos;ve always been pretty capable of designing their own products and experiences. However, they&apos;re very aware that data-intense or complex software experiences are just not their forté. In addition to that they have no internal resources to conduct unbiased research.
                            </p>
                            <p>
                                This was the motivation behind our first engagement together - their internal sales tools have become a terribly inefficient mess and all attempts to design a solution have failed to yield any successful results. We don&apos;t have to design the whole thing today, but if we can paint an attractive picture of what this product might look like and give its stakeholders adequate research to justify building it, then we will have established ourselves as the go-to partner for complex, high-stakes enterprise transformations.
                            </p>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
                            <h3 className="text-2xl text-white font-light mb-6">The Challenge</h3>
                            <div className="relative mb-8">
                                <blockquote className="text-base text-white italic font-light leading-relaxed">
                                    &quot;Sales reps are drowning in spreadsheets and manual processes. Building bulk quotes takes hours, catalog management is chaotic, and errors cost us millions annually.&quot;
                                </blockquote>
                            </div>
                            <ul className="space-y-6 text-lg">
                                {[
                                    "Manual quote building taking 4-6 hours per order",
                                    "Catalog inconsistencies across regions",
                                    "High error rate in bulk volume pricing"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-4">
                                        <MoveDownRight className="w-5 h-5 mt-1 shrink-0 text-rose-500/80" />
                                        <span className="text-base text-silver font-light antialiased leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </ContentSection>
            </div>

            {/* Content Area - Solid Background */}
            <div className="bg-[#121212]/90">
                {/* Section 3: Research & Discovery */}
                <ContentSection className="max-w-6xl">
                    <SectionHeader title="Research & Discovery" />
                    <div className="space-y-16">
                        <p className="text-base text-silver font-light antialiased leading-relaxed max-w-4xl">
                            There wasn&apos;t a clear problem statement from the client, just that there were big structural issues. So stakeholder interviews seemed like a great place to start to gather information directly from those most impacted. We conducted 14 interview sessions with more than 20 stakeholders and identified 12 types of users. These were then distilled down into 3 personas who represented clear user paths we could design for.
                        </p>

                        {/* Research Diagrams Stack */}
                        <div className="space-y-12">
                            {[
                                {
                                    src: "/verizon/stakeholderinterview.webp",
                                    alt: "Stakeholder Interviews",
                                    caption: "Interview matrix mapping stakeholder roles to key functions and pain points",
                                    aspect: "aspect-video"
                                },
                                {
                                    src: "/verizon/r_affinitymapping.webp",
                                    alt: "Affinity Mapping",
                                    caption: "Affinity mapping from 14 stakeholder interview sessions across 12 user types",
                                    aspect: "aspect-video"
                                },
                                {
                                    src: "/verizon/r_ecologydiagram.webp",
                                    alt: "Ecology Diagram",
                                    caption: "User ecosystem showing the relationships between personas and key workflows",
                                    aspect: "aspect-[21/9]"
                                }
                            ].map((diagram, i) => (
                                <div key={i} className="group pt-6 bg-zinc-100/20 border border-zinc-600 rounded-3xl overflow-hidden backdrop-blur-sm">
                                    <div className={`relative ${diagram.aspect}`}>
                                        <Image
                                            src={diagram.src}
                                            alt={diagram.alt}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                    <div className="p-6 md:p-6 bg-zinc-800/20">
                                        <p className="text-silver text-sm tracking-wider font-base">
                                            {diagram.caption}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                {
                                    value: "14",
                                    label: "Interview Sessions",
                                    description: "In-depth conversations with stakeholders across the organization"
                                },
                                {
                                    value: "12",
                                    label: "User Types Identified",
                                    description: "Diverse roles from sales reps to product managers"
                                },
                                {
                                    value: "3",
                                    label: "Core Personas",
                                    description: "Distilled into clear user paths we could design for"
                                }
                            ].map((stat, i) => (
                                <div key={i} className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm text-center flex flex-col items-center justify-center">
                                    <div className="text-5xl font-light text-white mb-3">{stat.value}</div>
                                    <div className="text-white text-sm uppercase tracking-[0.2em] font-medium mb-4">{stat.label}</div>
                                    <p className="text-silver text-sm font-light leading-relaxed max-w-[200px]">
                                        {stat.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </ContentSection>

                {/* Section 4: Conceptualization & Strategy */}
                <ContentSection className="max-w-6xl">
                    <SectionHeader title="Conceptualization & Strategy" />
                    <div className="space-y-16">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {[
                                {
                                    name: "Francis",
                                    role: "Sales / B2B",
                                    personaType: "sales",
                                    image: "/verizon/new_persona_francis.webp",
                                    problem: "Francis is a sales executive specializing in B2B sales. He wants to build stronger relationships with Verizon customers. Francis wants to get to know customers more and see what sticks.",
                                    challenges: [
                                        "Partner content is outdated because it's manually updated",
                                        "Sales enablement is a single BuSS homepage which is difficult to locate",
                                        "BuSS isn't compatible with MyBiz instance",
                                        "Outdated SKUs that aren't useful or sellable anymore"
                                    ]
                                },
                                {
                                    name: "Shae",
                                    role: "Product / Business Solutions",
                                    personaType: "designer",
                                    image: "/verizon/new_persona_shae.webp",
                                    problem: "Shae is a Solutions Designer for small to midsize business products. She wants a better way to find products and manage the solutions she's creating.",
                                    challenges: [
                                        "Finding products across multiple BuSS catalogs",
                                        "No good way to customize bundles to meet changing needs",
                                        "BuSS solutions aren't searchable or indexed well"
                                    ]
                                },
                                {
                                    name: "Carmen",
                                    role: "Channel / Manager",
                                    personaType: "architect",
                                    image: "/verizon/new_persona_carmen.webp",
                                    problem: "Carmen is a senior manager for the BuSS who needs a better way to manage pricing and discounts across catalogs and bundles.",
                                    challenges: [
                                        "All discounts are handled manually, no rule-based opportunities",
                                        "Takes 6-12 months to add partners to the platform",
                                        "No way to group packages for sales",
                                        "Partner APIs fail frequently and are outdated"
                                    ]
                                }
                            ].map((persona, i) => (
                                <div key={i} className="group relative flex flex-col bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm transition-colors hover:bg-white/[0.07]">
                                    {/* Persona Indicator Dot */}
                                    <div className="absolute top-8 right-8 flex items-center justify-center pointer-events-none">
                                        <div className={clsx(
                                            "absolute w-4 h-4 rounded-full blur-md opacity-60",
                                            persona.personaType === 'sales' ? "bg-amber-500" :
                                                persona.personaType === 'designer' ? "bg-emerald-500" :
                                                    "bg-blue-500"
                                        )} />
                                        <div className={clsx(
                                            "relative w-2.5 h-2.5 rounded-full border border-white/20",
                                            persona.personaType === 'sales' ? "bg-amber-500" :
                                                persona.personaType === 'designer' ? "bg-emerald-500" :
                                                    "bg-blue-500"
                                        )} />
                                    </div>

                                    <div className="flex items-center gap-6 mb-8">
                                        <div className="relative w-20 h-20 rounded-full overflow-hidden border border-white/10 shrink-0">
                                            <Image
                                                src={persona.image}
                                                alt={persona.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="text-white text-2xl font-normal leading-tight">{persona.name}</h3>
                                            <p className="text-silver/60 text-xs uppercase tracking-[0.2em] mt-1">{persona.role}</p>
                                        </div>
                                    </div>

                                    <div className="mb-8">
                                        <h4 className="text-white text-sm uppercase tracking-[0.2em] font-medium mb-4">Problem Statement</h4>
                                        <p className="text-silver text-sm font-light leading-relaxed">
                                            &quot;{persona.problem}&quot;
                                        </p>
                                    </div>

                                    <div className="mt-auto">
                                        <h4 className="text-white text-sm uppercase tracking-[0.2em] font-medium mb-4">Top Challenges</h4>
                                        <ul className="space-y-3">
                                            {persona.challenges.map((challenge, j) => (
                                                <li key={j} className="flex items-start gap-3 text-sm text-silver/80 font-light leading-snug">
                                                    <MoveDownRight className="w-3 h-3 mt-1 shrink-0 text-white/30" />
                                                    <span>{challenge}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <p className="text-base text-silver font-light antialiased leading-relaxed max-w-4xl">
                            Through the course of developing these Personas, we identified key workflows that any redesigned system would need to address. Among them: Onboarding new vendors, products, and product bundles. Educating salespeople on the products that they&apos;re expected to sell. Giving salespeople access to tools to help them optimize sales opportunities. Building and tracking quotes.
                        </p>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h3 className="text-2xl text-white font-light mb-6">Reimagining the Sales Experience</h3>
                                <p className="text-base text-silver font-light antialiased leading-relaxed mb-8">
                                    We envisioned a unified platform that would transform bulk quote building from a tedious manual process into an intelligent, guided workflow. The key was balancing power and simplicity - giving sales reps advanced capabilities without overwhelming complexity.
                                </p>
                                <ul className="space-y-4">
                                    {[
                                        "Smart catalog search with ML-powered recommendations",
                                        "Bulk operations with intelligent validation",
                                        "Real-time pricing calculations and margin visibility",
                                        "Centralized catalog management with version control"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-4 text-silver/80 font-light">
                                            <Check className="w-5 h-5 text-violet-400 mt-1 shrink-0" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10">
                                <Image
                                    src="/verizon/r_userprocess.webp"
                                    alt="User Process Workflow"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>

                        {/* Interactive Scatter Plot */}
                        <div className="w-full pt-16">
                            <ImpactEffortScatterPlot />
                            <p className="text-center text-silver/40 text-xs mt-6 font-light tracking-wide italic">
                                Hover over nodes to see details • Click persona labels to filter • Node size indicates priority
                            </p>
                        </div>
                    </div>
                </ContentSection>

                {/* Section 5: Exploration & Iteration */}
                <ContentSection className="max-w-6xl">
                    <SectionHeader title="Exploration & Iteration" />
                    <div className="space-y-16">
                        <p className="text-base text-silver font-light antialiased leading-relaxed max-w-4xl">
                            Through multiple rounds of wireframing and prototyping, we tested different approaches to the quote builder interface, focusing on reducing cognitive load while maintaining power user capabilities.
                        </p>
                        {/* Sketches */}
                        {/* Sketches in Card Containers */}
                        <div className="flex flex-col gap-12">
                            {[
                                {
                                    src: "/verizon/sketch_nav.webp",
                                    alt: "Navigation Sketch",
                                    title: "Project Navigation",
                                    desc: "Early explorations of the information architecture and navigation hierarchy."
                                },
                                {
                                    src: "/verizon/sketch_quotebuilder.webp",
                                    alt: "Quote Builder Sketch",
                                    title: "Quote Builder",
                                    desc: "Conceptual sketches for the drag-and-drop quote building interface."
                                },
                                {
                                    src: "/verizon/sketch_quotemanage.webp",
                                    alt: "Quote Workflow",
                                    title: "Quote Management Workflow",
                                    desc: "Defining the lifecycle of a quote from draft to approval."
                                }
                            ].map((sketch, i) => (
                                <div key={i} className="bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden group">
                                    <div className="bg-white/[0.02]">
                                        <Image
                                            src={sketch.src}
                                            alt={sketch.alt}
                                            width={1920}
                                            height={1080}
                                            className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-[1.01]"
                                        />
                                    </div>
                                    <div className="p-6 md:p-8 bg-white/5 backdrop-blur-sm border-t border-white/10">
                                        <h3 className="text-lg text-white mb-2">{sketch.title}</h3>
                                        <p className="text-silver font-light leading-relaxed">{sketch.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Options Considered Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 text-silver hover:bg-white/10 transition-colors">
                                <h3 className="text-white text-lg font-medium mb-2">Cart-Based Approach</h3>
                                <p className="text-sm">Familiar e-commerce pattern but felt too consumer-focused for enterprise sales.</p>
                            </div>
                            <div className="p-8 rounded-2xl bg-green-500/10 border border-green-500/30 text-green-100">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-lg font-medium">Guided Builder</h3>
                                    <div className="px-2 py-1 text-[10px] bg-green-500 text-black font-bold rounded uppercase">Winner</div>
                                </div>
                                <p className="text-sm">Step-by-step guidance with advanced mode toggle for power users.</p>
                            </div>
                            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 text-silver hover:bg-white/10 transition-colors">
                                <h3 className="text-white text-lg font-medium mb-2">Spreadsheet View</h3>
                                <p className="text-sm">Power users loved it but new reps found it overwhelming and error-prone.</p>
                            </div>
                        </div>

                        {/* Key Directions */}
                        <h3 className="text-white text-3xl font-light mb-6">Key Design Decisions</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[
                                { title: "Progressive Disclosure", body: "Advanced features hidden by default but easily accessible for power users through keyboard shortcuts and toggle switches." },
                                { title: "Intelligent Validation", body: "Real-time pricing updates as configuration changes, eliminating the 'calculate' button." }
                            ].map((item, i) => (
                                <div key={i} className="border-l-2 border-white/20 pl-6 py-2">
                                    <h3 className="text-2xl text-white font-light mb-2">{item.title}</h3>
                                    <p className="text-base text-silver font-light antialiased leading-relaxed">{item.body}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </ContentSection>

                {/* Section 6: The Design Solution */}
                <ContentSection className="max-w-6xl">
                    <SectionHeader title="The Design Solution" />
                    <div className="space-y-16">
                        <p className="text-base text-silver font-light antialiased leading-relaxed max-w-4xl">
                            The final design creates a seamless experience that guides new users while empowering experienced reps. Smart defaults, bulk operations, and real-time validation transform quote building from hours to minutes.
                        </p>

                        <VerizonGallery />

                        {/* Feature Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                {
                                    title: "Quote Builder",
                                    body: "Intelligent product search, bulk add capabilities, and real-time pricing with margin calculations.",
                                    icon: ListChecks
                                },
                                {
                                    title: "Catalog Manager",
                                    body: "Centralized product database with version control, regional pricing, and bulk update tools.",
                                    icon: DatabaseZap
                                },
                                {
                                    title: "Analytics Dashboard",
                                    body: "Sales performance metrics, quote conversion tracking, and product popularity insights.",
                                    icon: ChartColumn
                                }
                            ].map((item, i) => (
                                <div key={i} className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 group">
                                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 transition-transform duration-300">
                                        <item.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-xl font-normal text-white mb-3">{item.title}</h3>
                                    <p className="text-silver/80 font-light leading-relaxed text-sm">{item.body}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </ContentSection>
            </div>

            {/* Section 7: Reflection & Impact - Gradient Transition Back to Scene */}
            <div className="w-full bg-gradient-to-b from-[#121212] to-transparent">
                <ContentSection className="max-w-4xl">
                    <SectionHeader title="Reflection & Impact" />
                    <div className="space-y-12">
                        <p className="text-base text-silver font-light antialiased leading-relaxed">
                            This project demonstrated the power of deep user research and iterative design. By understanding the real workflows and pain points of sales teams, we created a solution that didn&apos;t just digitize existing processes - it fundamentally reimagined how bulk sales could work. The success of this engagement established a long-term partnership with Verizon for future enterprise tool design.
                        </p>
                        <p className="text-base text-silver font-light antialiased leading-relaxed">These design choices were borne out by early test data of prototypes:</p>

                        <StatsGrid
                            stats={[
                                { label: "Quote Time", value: "-37%" },
                                { label: "Error Rate", value: "-90%" },
                                { label: "Training Time", value: "-25%" },
                                { label: "Correct Quote Delivery", value: "95%" }
                            ]}
                        />
                        <p className="text-silver/40 text-sm font-light tracking-wide italic">
                            (Projected based on usability testing of high-fidelity prototypes)
                        </p>
                    </div>
                </ContentSection>
            </div>

            <ProjectNavigation currentId="verizon" />
        </main>
    )
}
