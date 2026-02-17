'use client'

import { ArrowRight, Lock, LayoutGrid, BarChart3, Globe, Layers } from 'lucide-react'

// Defined Data (Permissions & Widgets)
const personas = [
    {
        role: "Financial Analyst",
        title: "Receivables Focused",
        icon: BarChart3,
        entitlements: [
            "Account Statements",
            "Balance Reporting",
            "Check Returns",
            "Digital Archive",
            "Event Manager",
            "Lockbox Exceptions",
            "Receivables Reports",
            "Remote Deposit"
        ],
        activeWidgets: [
            "Quick Actions & Links",
            "Insights",
            "Recent Activity",
            "Digital Archive"
        ]
    },
    {
        role: "Liquidity / Treasury Manager",
        title: "Reporting Focused",
        icon: Globe,
        entitlements: [
            "Account Analysis",
            "ACH History",
            "Balance Reporting",
            "Cash Sweeps",
            "Enhanced Liquidity",
            "FX Reports",
            "LNI Statements",
            "Payment Reports",
            "Analytics",
            "Virtual Accounts",
            "Book Transfer"
        ],
        activeWidgets: [
            "Quick Actions & Links",
            "Liquidity Overview",
            "Reports",
            "Insights",
            "Recent Activity"
        ]
    },
    {
        role: "Payments Operations",
        title: "Payments Focused",
        icon: Layers,
        entitlements: [
            "ACH Origination",
            "File Transfer (Up/Down)",
            "Wire Payment",
            "Real-time Payments",
            "Tax Payments",
            "Funds Transfer",
            "Notice to Receive",
            "Quick Entry",
            "Draw Down",
            "Intra Company",
            "Payment Tracking",
            "Tokenized Payments"
        ],
        activeWidgets: [
            "Pending Tasks",
            "Quick Actions & Links",
            "Liquidity Overview",
            "File Import Status",
            "Reports",
            "Insights",
            "Recent Activity"
        ]
    }
]

// Master list of all possible widgets to maintain grid consistency
// We'll arrange them in a 3x3 grid for the visual
const masterWidgetGrid = [
    { id: "Liquidity Overview", label: "Liquidity" },
    { id: "Pending Tasks", label: "Pending Tasks" },
    { id: "Quick Actions & Links", label: "Quick Actions" },
    { id: "Reports", label: "Reports" },
    { id: "Insights", label: "Insights" },
    { id: "Recent Activity", label: "Activity" },
    { id: "File Import Status", label: "File Status" },
    { id: "Digital Archive", label: "Digital Archive" },
]


export default function PermissionFlowDiagram() {
    return (
        <div className="w-full bg-[#1a1a1a] rounded-3xl border border-white/10 overflow-hidden p-8 md:p-12 relative">
            {/* Dot Grid Background */}
            <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
                    backgroundSize: '24px 24px'
                }}
            />

            <div className="relative z-10 flex flex-col gap-12">
                {/* Header/Title if needed? No, prompt just said create structure. */}

                {personas.map((persona, index) => (
                    <div key={index} className="flex flex-col md:flex-row gap-6 md:gap-0 items-stretch">


                        {/* Column 1: User Persona (Flex: 1) */}
                        <div className="flex-1 min-w-0 relative">
                            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm h-full flex flex-col justify-between group-hover:bg-white/10 transition-colors duration-300">
                                <div>
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-4 text-white">
                                        <persona.icon size={20} strokeWidth={1.5} />
                                    </div>
                                    <h4 className="text-base font-normal text-white leading-tight mb-2">{persona.role}</h4>
                                    <p className="text-silver/60 text-sm font-mono uppercase tracking-wider">{persona.title}</p>
                                </div>
                            </div>
                        </div>

                        {/* Arrow 1 (Shrink) */}
                        <div className="shrink-0 w-12 flex items-center justify-center text-white/60 z-10 py-2 md:py-0 rotate-90 md:rotate-0">
                            <ArrowRight size={20} />
                        </div>


                        {/* Column 2: Entitlements (Flex: 2) */}
                        <div className="flex-[2] min-w-0 relative">
                            <div className="bg-transparent py-2 h-full flex flex-col justify-center">
                                <h5 className="text-white/40 text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
                                    <Lock size={12} /> Entitlements
                                </h5>
                                <div className="flex flex-wrap gap-2">
                                    {persona.entitlements.map((ent, i) => (
                                        <span key={i} className="inline-flex text-xs text-silver bg-white/5 px-2 py-1 rounded-md border border-white/5 whitespace-nowrap">
                                            {ent}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Arrow 2 (Shrink) */}
                        <div className="shrink-0 w-12 flex items-center justify-center text-white/60 z-10 py-2 md:py-0 rotate-90 md:rotate-0">
                            <ArrowRight size={20} />
                        </div>

                        {/* Column 3: Dashboard UI (Flex: 2) */}
                        <div className="flex-[2] min-w-0 relative">
                            <div className="bg-[#121212] border border-white/10 rounded-xl p-6 shadow-2xl h-full flex flex-col">
                                <h5 className="text-white/40 text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <LayoutGrid size={12} /> Interface
                                </h5>
                                <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 flex-grow content-start">
                                    {masterWidgetGrid.map((widget, widx) => {
                                        const isActive = persona.activeWidgets.includes(widget.id);
                                        return (
                                            <div
                                                key={widx}
                                                className={`px-2 py-2 rounded-lg border text-[10px] lg:text-xs font-medium transition-all duration-300 flex items-center gap-1.5 justify-start ${isActive
                                                    ? 'bg-violet-500/20 border-violet-500/50 text-white shadow-[0_0_10px_rgba(139,92,246,0.2)]'
                                                    : 'bg-white/5 border-white/5 text-silver/20 grayscale opacity-40'
                                                    }`}
                                            >
                                                <div className={`w-1.5 h-1.5 shrink-0 rounded-full ${isActive ? 'bg-violet-400 shadow-[0_0_5px_rgba(139,92,246,0.8)]' : 'bg-white/10'}`} />
                                                <span className="truncate">{widget.label}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Caption */}
            <div className="mt-12 pt-6 border-t border-white/10 flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0 animate-pulse" />
                <p className="text-sm text-silver font-light leading-relaxed">
                    <strong className="text-white font-medium">Adaptive Interface Logic:</strong> The dashboard framework dynamically renders components based on the user&apos;s granular entitlement set to reduce cognitive load.
                </p>
            </div>
        </div>
    )
}
