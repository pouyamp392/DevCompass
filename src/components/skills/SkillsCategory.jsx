import { motion, AnimatePresence } from "framer-motion";
import { HiChevronDown } from "react-icons/hi2";
import SkillsCard from "./SkillsCard";

export default function SkillsCategory({
    category,
    isExpanded,
    onToggle,
    skillsMap,
    getSkillStatus,
    getPrerequisiteDetails,
    buildSkillPath,
    progress,
    hoveredSkill,
    setHoveredSkill,
}) {
    return (
        <div
            className={`rounded-3xl border transition-all duration-300 ${category.borderColor} ${category.bgColor} overflow-hidden`}
        >
            <button
                onClick={() => onToggle(category.id)}
                className="w-full flex items-center justify-between p-5 md:p-6 hover:bg-white/[0.02] transition-colors"
            >
                <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center text-2xl flex-shrink-0`}>
                        {category.icon}
                    </div>

                    <div className="text-right">
                        <h3 className="text-lg font-bold">{category.label}</h3>
                        <div className="flex items-center gap-3 mt-1">
                            <span className={`text-xs font-mono ${category.textColor}`}>
                                {category.stats.completed} / {category.stats.total}
                            </span>
                            <div className="w-20 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                <div
                                    className={`h-full ${category.progressBg} rounded-full transition-all duration-700`}
                                    style={{ width: `${category.stats.progress}%` }}
                                />
                            </div>
                            <span className="text-xs text-zinc-500">
                                {category.stats.progress}%
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {category.stats.completed > 0 && (
                        <span className="hidden md:flex items-center gap-1 text-xs bg-emerald-400/10 text-emerald-400 px-2 py-1 rounded-full">
                            ✅ {category.stats.completed}
                        </span>
                    )}
                    {category.stats.inProgress > 0 && (
                        <span className="hidden md:flex items-center gap-1 text-xs bg-cyan-400/10 text-cyan-400 px-2 py-1 rounded-full">
                            🚀 {category.stats.inProgress}
                        </span>
                    )}
                    {category.stats.locked > 0 && (
                        <span className="hidden md:flex items-center gap-1 text-xs bg-zinc-700/30 text-zinc-500 px-2 py-1 rounded-full">
                            🔒 {category.stats.locked}
                        </span>
                    )}
                    <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <HiChevronDown size={20} className="text-zinc-500" />
                    </motion.div>
                </div>
            </button>

            <div className="flex md:hidden items-center gap-2 px-5 pb-2">
                {category.stats.completed > 0 && (
                    <span className="text-[10px] bg-emerald-400/10 text-emerald-400 px-2 py-0.5 rounded-full">✅ {category.stats.completed}</span>
                )}
                {category.stats.inProgress > 0 && (
                    <span className="text-[10px] bg-cyan-400/10 text-cyan-400 px-2 py-0.5 rounded-full">🚀 {category.stats.inProgress}</span>
                )}
                {category.stats.locked > 0 && (
                    <span className="text-[10px] bg-zinc-700/30 text-zinc-500 px-2 py-0.5 rounded-full">🔒 {category.stats.locked}</span>
                )}
            </div>

            <AnimatePresence initial={false}>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="px-5 pb-5 md:px-6 md:pb-6 space-y-2">
                            {category.skills.length === 0 ? (
                                <p className="text-zinc-500 text-sm text-center py-6">مهارتی پیدا نشد</p>
                            ) : (
                                category.skills.map(skill => {
                                    const status = getSkillStatus(skill);
                                    const value = progress?.[skill.id] || 0;
                                    const prereqs = getPrerequisiteDetails(skill);
                                    const isLocked = status === "locked";
                                    const skillPath = buildSkillPath(skill.id);

                                    return (
                                        <SkillsCard
                                            key={skill.id}
                                            skill={skill}
                                            status={status}
                                            value={value}
                                            isLocked={isLocked}
                                            prereqs={prereqs}
                                            skillPath={skillPath}
                                            hoveredSkill={hoveredSkill}
                                            setHoveredSkill={setHoveredSkill}
                                        />
                                    );
                                })
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}