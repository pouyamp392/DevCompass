import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiPlay, HiOutlineLockClosed, HiLightBulb } from "react-icons/hi2";

export default function SkillsContinue({
    currentSkills,
    getSkillStatus,
    getPrerequisiteDetails,
    progress,
    hoveredSkill,
    setHoveredSkill,
}) {
    if (currentSkills.length === 0) return null;

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-3">
                <HiPlay className="text-cyan-400" size={22} />
                <h2 className="text-lg font-bold">ادامه یادگیری</h2>
                <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded-full">
                    {currentSkills.length} مهارت
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {currentSkills.map(skill => {
                    const status = getSkillStatus(skill);
                    const value = progress?.[skill.id] || 0;
                    const prereqs = getPrerequisiteDetails(skill);

                    return (
                        <Link
                            key={skill.id}
                            to={`/skill/${skill.id}`}
                            className="group relative p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan-400/30 transition-all duration-300 overflow-hidden"
                            onMouseEnter={() => setHoveredSkill(skill.id)}
                            onMouseLeave={() => setHoveredSkill(null)}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/5 to-cyan-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            <div className="relative">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="text-2xl">{skill.icon || "📘"}</span>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold text-sm">{skill.title}</h4>
                                        <p className="text-zinc-500 text-xs truncate">{skill.description}</p>
                                    </div>
                                    {status === "in-progress" && (
                                        <span className="text-xs bg-cyan-400/10 text-cyan-400 px-2 py-0.5 rounded-full">
                                            {Math.floor(value)}%
                                        </span>
                                    )}
                                </div>

                                {status === "in-progress" && (
                                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full transition-all duration-700"
                                            style={{ width: `${value}%` }}
                                        />
                                    </div>
                                )}

                                <AnimatePresence>
                                    {hoveredSkill === skill.id && (prereqs.required.length > 0 || prereqs.recommended.length > 0) && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 5 }}
                                            className="mt-3 pt-3 border-t border-white/5 space-y-2"
                                        >
                                            {prereqs.required.length > 0 && (
                                                <div>
                                                    <p className="text-[10px] text-red-400/70 mb-1 flex items-center gap-1">
                                                        <HiOutlineLockClosed size={10} /> نیاز
                                                    </p>
                                                    <div className="flex flex-wrap gap-1">
                                                        {prereqs.required.map(req => (
                                                            <span key={req.id} className={`text-[10px] px-1.5 py-0.5 rounded-full ${req.completed ? "bg-emerald-400/10 text-emerald-400" : "bg-red-400/10 text-red-400"}`}>
                                                                {req.completed ? "✅" : "⬜"} {req.title}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                            {prereqs.recommended.length > 0 && (
                                                <div>
                                                    <p className="text-[10px] text-yellow-400/70 mb-1 flex items-center gap-1">
                                                        <HiLightBulb size={10} /> پیشنهادی
                                                    </p>
                                                    <div className="flex flex-wrap gap-1">
                                                        {prereqs.recommended.map(rec => (
                                                            <span key={rec.id} className={`text-[10px] px-1.5 py-0.5 rounded-full ${rec.completed ? "bg-emerald-400/10 text-emerald-400" : "bg-yellow-400/10 text-yellow-400"}`}>
                                                                {rec.completed ? "✅" : "⭐"} {rec.title}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}