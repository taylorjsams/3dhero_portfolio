export default function Loading() {
    return (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-[#121212]">
            <div className="flex flex-col items-center gap-4">
                <div className="font-mono text-xs tracking-[0.4em] text-white/30 uppercase">
                    Loading
                </div>
                <div className="w-48 h-[1px] bg-white/10 overflow-hidden relative">
                    <div className="h-full bg-white absolute top-0 left-0 loading-bar-animate" />
                </div>
            </div>
        </div>
    )
}
