'use client'

import CaseStudyHero from "@/components/case-study/CaseStudyHero"
import ContentSection from "@/components/case-study/ContentSection"
import ExpandableCards from "@/components/case-study/ExpandableCards"
import Timeline from "@/components/case-study/Timeline"
import FeatureShowcase from "@/components/case-study/FeatureShowcase"
import StatsGrid from "@/components/case-study/StatsGrid"

import SectionHeader from "@/components/case-study/SectionHeader"
import Image from "next/image"
import RelationalNodeMap from "@/components/case-study/RelationalNodeMap"
import PermissionFlowDiagram from "@/components/case-study/PermissionFlowDiagram"
import ProjectNavigation from "@/components/case-study/ProjectNavigation"
import { Plus } from "lucide-react"

export default function TreasuryDashboardPage() {
    return (
        <main className=" min-h-screen">
            {/* Section 1: Hero */}
            <CaseStudyHero
                title="Treasury Dashboard"
                subtitle="Crafting a Streamlined Dashboard for Intelligent Treasury Operations"
                tags={["Fintech", "Data Viz", "Service Design"]}
                role="Lead Designer"
                duration="January 2025 - June 2025"
                tools="Figma, Miro, Pens + Sticky Notes"
                industry="Financial Services"
            />

            {/* Section 2: About Project - Gradient Transition */}
            <div className="w-full bg-gradient-to-b from-transparent to-[#121212]/90">
                <ContentSection className="max-w-6xl">
                    <SectionHeader title="About Project" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-base text-silver font-light antialiased leading-relaxed">
                        <div className="flex flex-col text-left">
                            <p className="mb-6">
                                Before this project, treasury teams were navigating a challenging landscape where the data essential for strategic decisions was fragmented, hidden in silos, or sometimes, just wasn&apos;t there at all. This led to serious inefficiencies and a constant struggle to understand <span className="font-semibold">&apos;what needs my attention right now?&apos;</span>
                            </p>
                            <p className="mb-6">
                                Add to that the complexity of serving a wide spectrum of clients with vastly different product sets, and the challenge became immense. Our goal was ambitious: to eliminate these blind spots and create a dashboard that wasn&apos;t just a data aggregator, but an intelligent daily guide.
                            </p>
                            <p>
                                We designed a flexible dashboard that is highly adaptable, pulling together all relevant information for each unique client profile, highlighting critical tasks and alerts, and empowering users to proactively manage their day with clarity and confidence. It&apos;s about turning data frustration into decisive action, every single morning.
                            </p>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
                            <h3 className="text-white font-light text-2xl mb-6">The Challenge</h3>
                            <ul className="space-y-6 text-lg">
                                {[
                                    { q: "Provide a Unified Data Hub", a: "To consolidate fragmented financial data from disparate sources into a single, comprehensive, and easily accessible view for treasury professionals." },
                                    { q: "Enable Proactive Task Management", a: "To clearly highlight daily priorities, urgent actions, and pending tasks, allowing users to efficiently manage their workflow." },
                                    { q: "Offer Dynamic Personalization", a: "To flexibly adapt and display relevant product and service information tailored to each unique client's portfolio." },

                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-4">
                                        <Plus className="w-5 h-5 mt-1 shrink-0 text-violet-400" />
                                        <div className="flex flex-col gap-1 text-left">
                                            <span className="text-white font-medium text-base">{item.q}</span>
                                            <span className="text-silver/60 text-base font-light leading-relaxed">{item.a}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </ContentSection>
            </div>

            {/* Content Area - Solid Background */}
            <div className="bg-[#121212]/90">
                {/* Section 3: Existing Legacy State */}
                <ContentSection>
                    <SectionHeader title="Existing Legacy State" />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-6 text-base text-silver font-light antialiased leading-relaxed mb-12 text-left">
                        <p>
                            I initiated a strategic analysis of existing dashboard and workspace experiences. This survey revealed a significant challenge:
                            not only were these solutions fragmented and inconsistent with the diverse services they covered, but they also lacked a unifying
                            design language, often appearing as isolated responses to individual client demands.
                        </p>
                        <p>
                            There were major gaps in the data covered, missing essential services like wire status, real-time, and tokenized payments.
                            Clients also had no live view of their cash positions or any insights into their cash flow leading to operational inefficiencies.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-start">
                        <div className="md:col-span-1">
                            <ExpandableCards
                                cards={[
                                    { title: "Scattered Information", body: "Essential data was dispersed across multiple screens, requiring excessive navigation." },
                                    { title: "Entitlement Complexity", body: "User entitlements weren't handled gracefully, often showing irrelevant options or hiding critical data." },
                                    { title: "Reactive, not proactive", body: "Lack of critical alerts meant users were reacting to issues rather than managing them proactively." }
                                ]}
                            />
                        </div>
                        <div className="md:col-span-2 rounded-2xl overflow-hidden bg-white/80 border border-white/10 shadow-lg group">
                            <Image
                                src="/dashboard_before.webp"
                                alt="Legacy Interface"
                                width={1600}
                                height={1200}
                                className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                            />
                            {/* <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" /> */}
                        </div>
                    </div>
                </ContentSection>

                {/* Section 4: The Solution */}
                <ContentSection>
                    <SectionHeader title="The Solution" />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 text-base text-silver font-light antialiased leading-relaxed mb-16 text-left max-w-6xl">
                        <p>
                            It was clear BNY needed a modern payments platform to stay competitive, our goal was to find opportunities to go beyond basic payment views and deliver something exceptional. We dug deep, chatting with clients of all sizes and types to understand their workflows, both within and outside the bank&apos;s systems. What we uncovered were three distinct user types and a handful of significant pain points.
                        </p>
                        <p>
                            These discoveries became the foundation for our design solutions, allowing us to deliver a superior user experience while simultaneously cutting down on the bank&apos;s expensive manual interventions. The result? Significant cost savings for the bank and greater self-service capabilities for their clients, giving them a transparent view of their payment activities.
                        </p>
                    </div>

                    <div className="w-full rounded-2xl bg-white/70 overflow-hidden border border-violet-600/30 shadow-xl mb-16 pt-0 pr-0 pl-0 md:pt-16 md:pr-16 md:pl-16">
                        <div className="w-full h-full">
                            <Image
                                src="/dashboard/dashboard_finaldesign.webp"
                                alt="Final Design"
                                width={2400}
                                height={1600}
                                className="w-full h-auto shadow-xl rounded-t-2xl"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                        {[
                            { title: "Modular Architecture", body: "A flexible grid system that allows for the modular activation of payment services based on client needs." },
                            { title: "Actionable Intelligence", body: "Critical alerts and pending tasks are surfaced immediately, empowering proactive decision-making." },
                            { title: "Entitlement-Aware", body: "Smart filtering ensures users only see what they have access to, reducing cognitive load and interface clutter." }
                        ].map((item, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                                <h3 className="text-lg font-normal text-white mb-3">{item.title}</h3>
                                <p className="text-sm text-silver leading-relaxed">{item.body}</p>
                            </div>
                        ))}
                    </div>
                </ContentSection>

                {/* Section 5: Methodology */}
                <ContentSection className="max-w-5xl">
                    <SectionHeader title="Methodology" />
                    <p className="text-base text-silver font-light antialiased leading-relaxed max-w-3xl mb-12 text-center md:text-left">
                        This project&apos;s design phase kicked off in January 2025, culminating in June 2025 when our high-fidelity prototypes were successfully handed off to the development team. Throughout this period, we progressed through several distinct stages: starting with in-depth Discovery and Requirements gathering, moving into crucial Technical collaboration, followed by comprehensive Ideation, Low-Fidelity design, and finally, detailed High-Fidelity prototyping.
                    </p>

                    <Timeline />

                    <div className="mt-24 mb-16">
                        <h3 className="text-2xl text-white font-light mb-4 text-center md:text-left">Workshop Spotlight: Entitlement Architecture</h3>
                        <p className="text-base text-silver font-light antialiased leading-relaxed max-w-3xl mb-12 text-center md:text-left">
                            One of the critical challenges was ensuring the dashboard interaction model could gracefully handle the thousands of potential permission combinations without breaking the layout or user experience. We mapped every possible entitlement to its corresponding widget visibility.
                        </p>
                        <h4 className="text-lg text-silver font-light mb-4 text-center md:text-left">Output 01: Entitlement Matrix</h4>
                        <RelationalNodeMap />
                        <div className="w-full mt-6">
                            <p className="text-white/30 text-xs uppercase tracking-widest">
                                * Simplified view of 10 key services. Full matrix covers 50+ combinations.
                            </p>
                        </div>

                        <div className="mt-24">
                            <h4 className="text-lg text-silver font-light mb-4 text-center md:text-left">Output 02: Permission Flow Diagram</h4>
                            <PermissionFlowDiagram />
                        </div>
                        <div className="w-full mt-6">
                            <p className="text-white/30 text-xs uppercase tracking-widest">
                                * Simplified view of 3 major user personas. Extensive mapping was conducted across 10+ groupings.
                            </p>
                        </div>

                    </div>


                </ContentSection>

                {/* Section 6: Key Features */}
                <ContentSection>
                    <SectionHeader title="Key Features" />
                    <FeatureShowcase
                        features={[
                            { title: "User-Specific Metrics", description: "Personalized dashboard widgets that adapt to the user's role and daily tasks.", image: "/dashboard/dashboard_metrics.webp", aspectRatio: 1470 / 923 },
                            { title: "Critical Alerts System", description: "Intelligent notification center that prioritizes urgent items requiring immediate attention.", image: "/dashboard/dashboard_alerts.webp", aspectRatio: 1470 / 923 },
                            { title: "Cash-Flow Visualization", description: "Interactive charts providing real-time visibility into liquidity and forecasting.", image: "/dashboard/dashboard_cash.webp", aspectRatio: 1440 / 1021 },
                            { title: "Modular Payments", description: "Seamless integration of ACH, Real-Time, and Tokenized payment workflows.", image: "/dashboard/dashboard_finaldesign.webp", aspectRatio: 1440 / 1149 }
                        ]}
                    />
                </ContentSection>

                {/* Section 7: Impact and Results */}
                <ContentSection>
                    <SectionHeader title="Impact & Results" />
                    <div className="mt-8">
                        <StatsGrid />
                    </div>
                </ContentSection>
            </div>

            {/* Section 8: Visual Evolution - Gradient Transition Back to Scene */}
            {/* <div className="w-full bg-gradient-to-b from-[#121212] to-transparent">
                <ContentSection>
                    <SectionHeader title="Visual Evolution" />
                    <p className="text-base text-silver font-light antialiased leading-relaxed mb-12 max-w-2xl">
                        A direct comparison showing the transformation from the legacy system to the new unified dashboard.
                    </p>
                    <BeforeAfterSlider
                        beforeImage="/dashboard_before.webp"
                        afterImage="/dashboard_finaldesign.webp"
                    />
                </ContentSection>
            </div> */}

            <ProjectNavigation currentId="treasury-dashboard" />
        </main>
    )
}
