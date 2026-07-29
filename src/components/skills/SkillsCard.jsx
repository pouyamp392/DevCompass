import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    HiOutlineLockClosed,
    HiArrowTrendingUp,
    HiOutlineArrowLongDown,
} from "react-icons/hi2";

export default function SkillsCard({
    skill,
    status,
    value,
    isLocked,
    prereqs,
    skillPath,
    hoveredSkill,
    setHoveredSkill,
}) {
    return (
        <Link
            to={isLocked ? "#" : `/skill/${skill.id}`}
            onClick={(e) => isLocked && e.preventDefault()}
            onMouseEnter={() => setHoveredSkill(skill.id)}
            onMouseLeave={() => setHoveredSkill(null)}
            className={`
                block p-4 rounded-2xl border transition-all duration-200 group relative
                ${isLocked
                    ? "border-zinc-800/50 bg-zinc-900/20 cursor-not-allowed opacity-50"
                    : "border-white/5 bg-white/[0.02] hover:border-cyan-400/20 hover:bg-cyan-400/[0.03]"
                }
            `}
        >
            <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 transition-all ${
                    status === "completed" ? "bg-emerald-400/10" :
                    status === "in-progress" ? "bg-cyan-400/10" :
                    "bg-white/5"
                }`}>
                    {skill.icon || "📘"}
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <h4 className={`font-bold text-sm truncate ${
                            status === "completed" ? "text-emerald-300" :
                            status === "in-progress" ? "text-white" :
                            "text-zinc-400"
                        }`}>
                            {skill.title}
                        </h4>
                        {status === "in-progress" && (
                            <span className="text-[10px] bg-cyan-400/10 text-cyan-400 px-1.5 py-0.5 rounded-full">
                                {Math.floor(value)}%
                            </span>
                        )}
                        {skill.xp && (
                            <span className="text-[10px] bg-yellow-400/10 text-yellow-400 px-1.5 py-0.5 rounded-full">
                                +{skill.xp}
                            </span>
                        )}
                    </div>
                    <p className="text-zinc-500 text-xs truncate mt-0.5">
                        {skill.description}
                    </p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="hidden md:flex gap-0.5">
                        {[1, 2, 3, 4, 5].map(star => (
                            <div
                                key={star}
                                className={`w-1.5 h-1.5 rounded-full ${
                                    star <= (skill.difficulty || 1) ? "bg-cyan-400" : "bg-white/10"
                                }`}
                            />
                        ))}
                    </div>
                    {!isLocked ? (
                        <HiArrowTrendingUp className="text-zinc-600 group-hover:text-cyan-400 transition-colors" size={16} />
                    ) : (
                        <HiOutlineLockClosed className="text-zinc-600" size={14} />
                    )}
                </div>
            </div>

            {/* Skill Path */}
            <AnimatePresence>
                {hoveredSkill === skill.id && !isLocked && skillPath.length > 1 && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-3 pt-3 border-t border-white/5 overflow-hidden"
                    >
                        <p className="text-[10px] text-zinc-500 mb-2 flex items-center gap-1">
                            <HiOutlineArrowLongDown size={12} className="text-cyan-400" /> مسیر یادگیری
                        </p>
                        <div className="flex items-center gap-1.5 flex-wrap">
                            {skillPath.map((step, i) => (
                                <div key={step.id} className="flex items-center gap-1.5">
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                                        step.completed
                                            ? "bg-emerald-400/10 text-emerald-400"
                                            : step.inProgress
                                            ? "bg-cyan-400/10 text-cyan-400"
                                            : "bg-white/5 text-zinc-500"
                                    }`}>
                                        {step.icon} {step.title}
                                    </span>
                                    {i < skillPath.length - 1 && (
                                        <span className="text-zinc-700 text-xs">↓</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Prerequisites */}
            <AnimatePresence>
                {hoveredSkill === skill.id && !isLocked && (prereqs.required.length > 0 || prereqs.recommended.length > 0) && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-2 pt-2 border-t border-white/5 overflow-hidden"
                    >
                        <div className="flex flex-wrap gap-2">
                            {prereqs.required.length > 0 && (
                                <div className="flex items-center gap-1">
                                    <span className="text-[10px] text-red-400/70">نیاز:</span>
                                    {prereqs.required.map(req => (
                                        <span key={req.id} className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                                            req.completed ? "bg-emerald-400/10 text-emerald-400" : "bg-red-400/10 text-red-400"
                                        }`}>
                                            {req.completed ? "✅" : "⬜"} {req.title}
                                        </span>
                                    ))}
                                </div>
                            )}
                            {prereqs.recommended.length > 0 && (
                                <div className="flex items-center gap-1">
                                    <span className="text-[10px] text-yellow-400/70">پیشنهادی:</span>
                                    {prereqs.recommended.map(rec => (
                                        <span key={rec.id} className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                                            rec.completed ? "bg-emerald-400/10 text-emerald-400" : "bg-yellow-400/10 text-yellow-400"
                                        }`}>
                                            {rec.completed ? "✅" : "⭐"} {rec.title}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </Link>
    );
}