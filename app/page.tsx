import Section from "@/components/dom/Section";
import CaseStudyOverlay from "@/components/dom/CaseStudyOverlay";
import SectionHeader from "@/components/case-study/SectionHeader";
import VisualExplorations from "@/components/dom/VisualExplorations";
import HeroVignette from "@/components/dom/HeroVignette";

export default function Home() {
  return (
    <main className="flex flex-col items-center text-center w-full min-h-screen font-[family-name:var(--font-geist-sans)] justify-center">
      <HeroVignette />
      {/* Hero Section */}
      <Section className="h-screen flex flex-col items-start justify-center snap-start w-full max-w-7xl px-6 md:px-12 text-left pointer-events-none relative overflow-hidden">
        <div className="pointer-events-auto relative z-10">
          <h1 className="text-6xl md:text-[5rem] font-thin tracking-tighter text-white mix-blend-overlay leading-none whitespace-nowrap">
            Taylor Sams
          </h1>
          <div className="glass p-6 rounded-2xl w-full max-w-md backdrop-blur-xl bg-white/5 border border-white/10 mt-12">
            <h2 className="text-xl font-light text-white mb-2">Digital Product Designer</h2>
            <p className="text-silver font-extralight text-base leading-relaxed">
              Hi nice to meet you, I&apos;m currently a digital product designer at BNY, I use my background in architecture to bridge the gap between human needs and technical systems.
              Designer of products, spaces, and all scales of experiences in between.
              <span className="text-silver text-xs mt-2 block">Based in New York.</span>
            </p>
          </div>
        </div>
      </Section>

      {/* Case Study 1: Payments */}
      <CaseStudyOverlay
        id="work-section"
        index="01"
        title="Payments Re-Imagined"
        tags={["Product Design", "Strategy", "Innovation"]}
        description="A strateic solution that centralizes payments, and liqutidy services for financial and corporate treasury clients"
        role="Product Designer"
        duration="Jan 2024 - Present"
        tools="Figma, Gemini"
        industry="Financial Services"
        href="/payments-reimagined"
      />

      {/* Case Study 2: Treasury */}
      <CaseStudyOverlay
        index="02"
        title="Treasury Dashboard"
        tags={["Fintech", "Data Viz", "Service Design"]}
        description="Crafting a Streamlined Dashboard for Intelligent Treasury Operations"
        role="Lead Designer"
        duration="Aug 2023 - Dec 2023"
        tools="Figma, Miro, Pens + Postits"
        industry="Financial Services"
        href="/treasury-dashboard"
      />

      {/* Case Study 3: Verizon */}
      <CaseStudyOverlay
        index="03"
        title="Verizon BUSS 2.0"
        tags={["Product Design", "UX Research"]}
        description="Imagining an innovative & robust sales tool for incredible bulk volume quote-building and catalog management"
        role="UX Designer"
        duration="6 Weeks"
        tools="Sketch, Adobe Creative Suite, Full Story"
        industry="Telecommunications"
        href="/verizon"
      />

      {/* Art Gallery */}
      <Section className="min-h-screen py-24 flex flex-col items-center snap-start w-full max-w-6xl px-6">
        <SectionHeader title="Visual Explorations" />
        <VisualExplorations />
      </Section>
    </main>
  );
}
