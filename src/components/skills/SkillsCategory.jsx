import { motion, AnimatePresence } from "framer-motion";
import { HiChevronDown } from "react-icons/hi2";
import SkillsCard from "./SkillsCard";

export default function SkillsCategory({
    category,
    isExpanded,
    onToggle,
    getSkillStatus,
    getPrerequisiteDetails,
    buildSkillPath,
    progress,
    hoveredSkill,
    setHoveredSkill,
}) {
    if (!category) return null;

    const stats = category.stats || {
        total: 0,
        completed: 0,
        inProgress: 0,
        locked: 0,
        available: 0,
        progress: 0,
    };

    const categorySkills = Array.isArray(category.skills)
        ? category.skills
        : [];

    const progressPercent = Math.min(
        100,
        Math.max(0, Number(stats.progress) || 0)
    );


    return (
        <div
            className={`
                rounded-3xl
                border
                transition-all
                duration-300
                ${category.borderColor || "border-white/10"}
                ${category.bgColor || "bg-white/[0.02]"}
                overflow-hidden
            `}
        >
            {/* ================================
                HEADER
            ================================= */}

            <button
                type="button"
                onClick={() => onToggle(category.id)}
                aria-expanded={isExpanded}
                className="
                    w-full
                    flex
                    items-center
                    justify-between
                    p-5
                    md:p-6
                    hover:bg-white/[0.02]
                    transition-colors
                    text-right
                "
            >
                <div className="flex items-center gap-4 min-w-0">
                    {/* Category icon */}
                    <div
                        className={`
                            w-12
                            h-12
                            rounded-2xl
                            bg-gradient-to-br
                            ${category.color || "from-cyan-500 to-blue-500"}
                            flex
                            items-center
                            justify-center
                            text-2xl
                            flex-shrink-0
                        `}
                    >
                        {category.icon || "📚"}
                    </div>

                    {/* Category info */}
                    <div className="min-w-0">
                        <h3 className="text-lg font-bold truncate">
                            {category.label}
                        </h3>

                        <div className="flex items-center gap-3 mt-1">
                            <span
                                className={`
                                    text-xs
                                    font-mono
                                    ${category.textColor || "text-cyan-400"}
                                `}
                            >
                                {stats.completed} / {stats.total}
                            </span>

                            <div className="w-20 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                <div
                                    className={`
                                        h-full
                                        ${category.progressBg || "bg-cyan-400"}
                                        rounded-full
                                        transition-all
                                        duration-700
                                    `}
                                    style={{
                                        width: `${progressPercent}%`,
                                    }}
                                />
                            </div>

                            <span className="text-xs text-zinc-500">
                                {progressPercent}%
                            </span>
                        </div>
                    </div>
                </div>

                {/* Header stats */}
                <div className="flex items-center gap-3 flex-shrink-0">
                    {stats.completed > 0 && (
                        <span
                            className="
                                hidden
                                md:flex
                                items-center
                                gap-1
                                text-xs
                                bg-emerald-400/10
                                text-emerald-400
                                px-2
                                py-1
                                rounded-full
                            "
                        >
                            ✅ {stats.completed}
                        </span>
                    )}

                    {stats.inProgress > 0 && (
                        <span
                            className="
                                hidden
                                md:flex
                                items-center
                                gap-1
                                text-xs
                                bg-cyan-400/10
                                text-cyan-400
                                px-2
                                py-1
                                rounded-full
                            "
                        >
                            🚀 {stats.inProgress}
                        </span>
                    )}

                    {stats.locked > 0 && (
                        <span
                            className="
                                hidden
                                md:flex
                                items-center
                                gap-1
                                text-xs
                                bg-zinc-700/30
                                text-zinc-500
                                px-2
                                py-1
                                rounded-full
                            "
                        >
                            🔒 {stats.locked}
                        </span>
                    )}

                    <motion.div
                        animate={{
                            rotate: isExpanded ? 180 : 0,
                        }}
                        transition={{ duration: 0.2 }}
                    >
                        <HiChevronDown
                            size={20}
                            className="text-zinc-500"
                        />
                    </motion.div>
                </div>
            </button>

            {/* ================================
                MOBILE STATS
            ================================= */}

            <div className="flex md:hidden items-center gap-2 px-5 pb-2">
                {stats.completed > 0 && (
                    <span className="text-[10px] bg-emerald-400/10 text-emerald-400 px-2 py-0.5 rounded-full">
                        ✅ {stats.completed}
                    </span>
                )}

                {stats.inProgress > 0 && (
                    <span className="text-[10px] bg-cyan-400/10 text-cyan-400 px-2 py-0.5 rounded-full">
                        🚀 {stats.inProgress}
                    </span>
                )}

                {stats.locked > 0 && (
                    <span className="text-[10px] bg-zinc-700/30 text-zinc-500 px-2 py-0.5 rounded-full">
                        🔒 {stats.locked}
                    </span>
                )}
            </div>

            {/* ================================
                SKILLS
            ================================= */}

            <AnimatePresence initial={false}>
                {isExpanded && (
                    <motion.div
                        initial={{
                            height: 0,
                            opacity: 0,
                        }}
                        animate={{
                            height: "auto",
                            opacity: 1,
                        }}
                        exit={{
                            height: 0,
                            opacity: 0,
                        }}
                        transition={{
                            duration: 0.3,
                            ease: "easeInOut",
                        }}
                        className="overflow-hidden"
                    >
                        <div className="px-5 pb-5 md:px-6 md:pb-6 space-y-2">
                            {categorySkills.length === 0 ? (
                                <p className="text-zinc-500 text-sm text-center py-6">
                                    مهارتی پیدا نشد
                                </p>
                            ) : (
                                categorySkills.map((skill) => {
                                    const rawValue =
                                        progress?.[skill.id];

                                    const value = Math.min(
                                        100,
                                        Math.max(
                                            0,
                                            Number(rawValue) || 0
                                        )
                                    );
                                    

                                    const status =
                                        getSkillStatus(skill);

                                    const isLocked =
                                        status === "locked";

                                    const prereqs =
                                        getPrerequisiteDetails(
                                            skill
                                        );

                                    const skillPath =
                                        buildSkillPath(
                                            skill.id
                                        );

                                    return (
                                        <SkillsCard
                                            key={skill.id}
                                            skill={skill}
                                            status={status}
                                            value={value}
                                            isLocked={isLocked}
                                            prereqs={prereqs}
                                            skillPath={skillPath}
                                            hoveredSkill={
                                                hoveredSkill
                                            }
                                            setHoveredSkill={
                                                setHoveredSkill
                                            }
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