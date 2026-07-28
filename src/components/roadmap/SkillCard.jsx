export default function SkillCard({ skill, status, progress, onClick }) {

    const statusConfig = {
        completed: {
            glass: "bg-cyan-400/[0.04] backdrop-blur-lg border-cyan-400/25",
            dot: "bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,.6)]",
            ring: "border-cyan-400/50",
            text: "text-cyan-100",
            desc: "text-cyan-400/40",
            badge: "✓",
        },
        current: {
            glass: "bg-white/[0.03] backdrop-blur-lg border-white/[0.08]",
            dot: "bg-white shadow-[0_0_18px_rgba(255,255,255,.4)]",
            ring: "border-white/25",
            text: "text-white",
            desc: "text-zinc-400",
            badge: null,
        },
        locked: {
            glass: "bg-transparent border-white/[0.03] opacity-30",
            dot: "bg-white/10",
            ring: "border-white/5",
            text: "text-zinc-600",
            desc: "text-zinc-700",
            badge: "🔒",
        },
    };

    const config = statusConfig[status];

    return (
        <button
            onClick={() => status !== "locked" && onClick?.(skill)}
            disabled={status === "locked"}
            className={`
                w-full group relative overflow-hidden
                rounded-2xl border p-5
                flex items-center gap-5
                transition-all duration-300
                ${config.glass}
                ${status !== "locked"
                    ? "cursor-pointer hover:bg-cyan-400/[0.06] hover:border-cyan-400/30"
                    : "cursor-not-allowed"}
            `}
        >
            {/* Subtle inner glow on hover */}
            {status !== "locked" && (
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/[0.02] to-cyan-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />
            )}

            {/* Left: Indicator */}
            <div className="relative flex-shrink-0">
                <div className={`
                    w-11 h-11 rounded-full flex items-center justify-center
                    border-2 transition-all duration-500
                    ${config.ring}
                    ${status === "current" && "group-hover:border-white/40"}
                `}>
                    {/* Inner dot */}
                    <div className={`
                        w-3 h-3 rounded-full transition-all duration-300
                        ${config.dot}
                        ${status === "current" && "group-hover:scale-110"}
                    `} />

                    {/* Progress arc for current skill */}
                    {status === "current" && progress > 0 && (
                        <svg className="absolute inset-0 w-full h-full -rotate-90">
                            <circle
                                cx="22" cy="22" r="18"
                                fill="none"
                                stroke="rgba(34,211,238,0.25)"
                                strokeWidth="2"
                                strokeDasharray={`${progress * 1.13} 113`}
                                strokeLinecap="round"
                            />
                        </svg>
                    )}
                </div>

                {/* Badge */}
                {config.badge && (
                    <span className="absolute -top-1 -right-1 text-xs">
                        {config.badge}
                    </span>
                )}
            </div>

            {/* Center: Info */}
            <div className="flex-1 text-left min-w-0">
                <h3 className={`font-bold text-base truncate transition-colors ${config.text}`}>
                    {skill.title}
                </h3>
                {skill.description && (
                    <p className={`text-xs truncate mt-0.5 transition-colors ${config.desc}`}>
                        {skill.description}
                    </p>
                )}
            </div>

            {/* Right: Status icon */}
            <div className="flex-shrink-0">
                {status === "completed" ? (
                    <div className="w-7 h-7 rounded-full bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center">
                        <svg className="w-3.5 h-3.5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                ) : status === "current" ? (
                    <div className="w-7 h-7 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-zinc-500 group-hover:text-cyan-400 group-hover:border-cyan-400/30 transition-all">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                        </svg>
                    </div>
                ) : (
                    <div className="w-7 h-7 rounded-full border border-white/5 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                    </div>
                )}
            </div>
        </button>
    );
}