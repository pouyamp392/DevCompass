import { useContext } from "react";
import QuizContext from "../../context/QuizContext";
import { useNavigate } from "react-router-dom";

export default function SkillModal({ skill, onClose }) {

    const { setProgress } = useContext(QuizContext);
    const navigate = useNavigate();

    function handleComplete() {
        setProgress(prev => ({
            ...prev,
            [skill.id]: 100
        }));
        onClose();
    }

    if (!skill) return null;

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-5"
            onClick={onClose}
        >
            {/* Glass backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-xl" />

            {/* Modal */}
            <div 
                className="relative w-full max-w-md bg-zinc-900/80 backdrop-blur-2xl border border-white/[0.08] rounded-3xl p-8 shadow-[0_0_60px_rgba(34,211,238,.08)]"
                onClick={e => e.stopPropagation()}
            >
                {/* Subtle top glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.12] transition-all duration-300"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-cyan-400/[0.06] border border-cyan-400/15 flex items-center justify-center text-2xl mb-5">
                    {skill.icon || "📘"}
                </div>

                {/* Title */}
                <h2 className="text-2xl font-black text-white mb-2">
                    {skill.title}
                </h2>

                {/* Description */}
                <p className="text-zinc-400 text-sm leading-relaxed mb-8">
                    {skill.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-8">
                    <div className="bg-white/[0.03] border border-white/[0.05] rounded-xl p-3 text-center">
                        <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Status</p>
                        <p className="text-cyan-400 text-sm font-bold">در حال یادگیری</p>
                    </div>
                    <div className="bg-white/[0.03] border border-white/[0.05] rounded-xl p-3 text-center">
                        <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Projects</p>
                        <p className="text-white/60 text-sm">Coming Soon</p>
                    </div>
                    <div className="bg-white/[0.03] border border-white/[0.05] rounded-xl p-3 text-center">
                        <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Practice</p>
                        <p className="text-white/60 text-sm">Coming Soon</p>
                    </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                    <button
                        onClick={() => {
                            onClose();
                            navigate(`/skill/${skill.id}`);
                        }}
                        className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-400 to-cyan-500 text-black font-bold text-sm hover:from-cyan-300 hover:to-cyan-400 transition-all duration-300 shadow-[0_0_30px_rgba(34,211,238,.25)] hover:shadow-[0_0_40px_rgba(34,211,238,.4)] active:scale-[0.98]"
                    >
                        🚀 شروع یادگیری
                    </button>

                    <button
                        onClick={handleComplete}
                        className="w-full py-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-white/70 font-bold text-sm hover:bg-cyan-400/[0.06] hover:border-cyan-400/20 hover:text-cyan-300 transition-all duration-300 active:scale-[0.98]"
                    >
                        ✅ یاد گرفتم
                    </button>
                </div>

                {/* Bottom subtle reflection */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            </div>
        </div>
    );
}