import { useContext } from "react";
import { Link } from "react-router-dom";

import QuizContext from "../context/QuizContext";
import Scene from "../components/ui/Scene";

export default function Result() {

    const { result } = useContext(QuizContext);
    
    if (!result || result.length === 0) {
        return (
            <section className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
                <h1 className="text-3xl">
                    نتیجه‌ای پیدا نشد.
                </h1>
            </section>
        );
    }

    const bestResult = result[0];

    return (
        <section className="relative min-h-screen overflow-hidden flex items-center justify-center px-6 py-8">
            
            <Scene variant="result" />
            <div className="absolute inset-0 bg-cyan-500/5 blur-[220px] pointer-events-none" />

            <div className="relative z-10 w-full max-w-2xl">
                
                {/* Header */}
                <div className="text-center mb-8">
                    <p className="text-cyan-400/40 text-xs tracking-[8px] font-mono">
                        ANALYSIS COMPLETE
                    </p>
                </div>

                {/* Winner Card - highlighted */}
                <div className="bg-cyan-500/5 backdrop-blur-2xl rounded-[32px] border border-cyan-400/30 p-6 mb-4">
                    <div className="flex items-center gap-6">
                        
                        {/* Rank badge */}
                        <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-cyan-400/15 border border-cyan-400/30 flex items-center justify-center">
                            <span className="text-cyan-400 text-2xl font-black">🥇</span>
                        </div>

                        {/* Score ring */}
                        <div className="relative flex-shrink-0 w-20 h-20">
                            <svg className="absolute inset-0 -rotate-90 w-full h-full">
                                <circle cx="40" cy="40" r="34" fill="none" stroke="white/5" strokeWidth="3" />
                                <circle
                                    cx="40" cy="40" r="34"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeDasharray={`${bestResult.percentage * 2.13} 213`}
                                    className="text-cyan-400"
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-cyan-400 text-lg font-bold">{bestResult.percentage}%</span>
                            </div>
                        </div>

                        {/* Title */}
                        <div className="min-w-0">
                            <p className="text-cyan-400/50 text-[10px] tracking-[6px] font-mono mb-1">
                                BEST MATCH
                            </p>
                            <h2 className="text-white text-2xl md:text-3xl font-bold truncate">
                                {bestResult.id}
                            </h2>
                            <p className="text-white/40 text-xs mt-1 line-clamp-1">
                                بیشترین تطابق با پاسخ‌های شما
                            </p>
                        </div>
                    </div>
                </div>

                {/* Other Results */}
                <div className="space-y-2 mb-8">
                    {result.slice(1).map((item, index) => {
                        const rank = index + 2;
                        const medals = ['🥈', '🥉', '4️⃣', '5️⃣'];
                        
                        return (
                            <div
                                key={item.id}
                                className="bg-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/5 p-4 hover:bg-white/[0.04] transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    
                                    {/* Rank */}
                                    <span className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-sm flex-shrink-0">
                                        {medals[index] || rank}
                                    </span>

                                    {/* Name */}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-white font-medium truncate">
                                            {item.id}
                                        </p>
                                    </div>

                                    {/* Percentage bar */}
                                    <div className="flex items-center gap-3 flex-shrink-0">
                                        <div className="w-20 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-cyan-400/50 rounded-full"
                                                style={{ width: `${item.percentage}%` }}
                                            />
                                        </div>
                                        <span className="text-white/40 text-sm w-10 text-right">
                                            {item.percentage}%
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* CTA */}
                <div className="text-center">
                    <Link
                        to="/roadmap"
                        className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-cyan-400 text-black font-bold text-sm hover:bg-cyan-300 transition-all duration-300 group"
                    >
                        مشاهده نقشه راه {bestResult.id}
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                    
                    <p className="text-white/20 text-xs mt-3">
                        یا برای تغییر پاسخ‌ها به صفحه قبل برگردید
                    </p>
                </div>

            </div>
        </section>
    );
}