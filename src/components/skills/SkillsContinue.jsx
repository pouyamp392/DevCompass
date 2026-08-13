import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    HiPlay,
    HiOutlineLockClosed,
    HiLightBulb,
} from "react-icons/hi2";

export default function SkillsContinue({
    currentSkills = [],
    getSkillStatus,
    getPrerequisiteDetails,
    progress = {},
    hoveredSkill,
    setHoveredSkill,
}) {
    // فقط مهارت‌هایی که واقعاً شروع شده‌اند
    const inProgressSkills = currentSkills.filter(
        (skill) => getSkillStatus(skill) === "in-progress"
    );

    // اگر چیزی برای ادامه نداریم، چیزی نمایش نده
    if (inProgressSkills.length === 0) {
        return null;
    }

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center gap-3">
                <HiPlay
                    className="text-cyan-400"
                    size={22}
                />

                <h2 className="text-lg font-bold">
                    ادامه یادگیری
                </h2>

                <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-xs text-zinc-500">
                    {inProgressSkills.length} مهارت
                </span>
            </div>

            {/* Skills */}
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                {inProgressSkills.map((skill) => {
                    const status = getSkillStatus(skill);

                    const value = Math.min(
                        100,
                        Math.max(
                            0,
                            Number(progress?.[skill.id]) || 0
                        )
                    );

                    const prereqs =
                        getPrerequisiteDetails(skill);

                    return (
                        <Link
                            key={skill.id}
                            to={`/skill/${skill.id}`}
                            className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-4 transition-all duration-300 hover:border-cyan-400/30"
                            onMouseEnter={() =>
                                setHoveredSkill?.(skill.id)
                            }
                            onMouseLeave={() =>
                                setHoveredSkill?.(null)
                            }
                        >
                            {/* Hover glow */}
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/5 to-cyan-400/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                            <div className="relative">
                                {/* Skill header */}
                                <div className="mb-3 flex items-center gap-3">
                                    <span className="text-2xl">
                                        {skill.icon || "📘"}
                                    </span>

                                    <div className="min-w-0 flex-1">
                                        <h4 className="truncate text-sm font-bold text-white">
                                            {skill.title}
                                        </h4>

                                        <p className="truncate text-xs text-zinc-500">
                                            {skill.description ||
                                                "در حال یادگیری"}
                                        </p>
                                    </div>

                                    {/* Progress */}
                                    <span className="shrink-0 rounded-full bg-cyan-400/10 px-2 py-0.5 text-xs text-cyan-400">
                                        {Math.floor(value)}%
                                    </span>
                                </div>

                                {/* Progress bar */}
                                <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                                    <div
                                        className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 transition-all duration-700"
                                        style={{
                                            width: `${value}%`,
                                        }}
                                    />
                                </div>

                                {/* Prerequisites */}
                                <AnimatePresence>
                                    {hoveredSkill === skill.id &&
                                        (prereqs.required.length > 0 ||
                                            prereqs.recommended.length > 0) && (
                                            <motion.div
                                                initial={{
                                                    opacity: 0,
                                                    y: 5,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    y: 0,
                                                }}
                                                exit={{
                                                    opacity: 0,
                                                    y: 5,
                                                }}
                                                className="mt-3 space-y-2 border-t border-white/5 pt-3"
                                            >
                                                {/* Required */}
                                                {prereqs.required.length >
                                                    0 && (
                                                    <div>
                                                        <p className="mb-1 flex items-center gap-1 text-[10px] text-red-400/70">
                                                            <HiOutlineLockClosed
                                                                size={10}
                                                            />
                                                            نیاز
                                                        </p>

                                                        <div className="flex flex-wrap gap-1">
                                                            {prereqs.required.map(
                                                                (req) => (
                                                                    <span
                                                                        key={
                                                                            req.id
                                                                        }
                                                                        className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                                                                            req.completed
                                                                                ? "bg-emerald-400/10 text-emerald-400"
                                                                                : "bg-red-400/10 text-red-400"
                                                                        }`}
                                                                    >
                                                                        {req.completed
                                                                            ? "✅"
                                                                            : "⬜"}{" "}
                                                                        {
                                                                            req.title
                                                                        }
                                                                    </span>
                                                                )
                                                            )}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Recommended */}
                                                {prereqs.recommended.length >
                                                    0 && (
                                                    <div>
                                                        <p className="mb-1 flex items-center gap-1 text-[10px] text-yellow-400/70">
                                                            <HiLightBulb
                                                                size={10}
                                                            />
                                                            پیشنهادی
                                                        </p>

                                                        <div className="flex flex-wrap gap-1">
                                                            {prereqs.recommended.map(
                                                                (rec) => (
                                                                    <span
                                                                        key={
                                                                            rec.id
                                                                        }
                                                                        className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                                                                            rec.completed
                                                                                ? "bg-emerald-400/10 text-emerald-400"
                                                                                : "bg-yellow-400/10 text-yellow-400"
                                                                        }`}
                                                                    >
                                                                        {rec.completed
                                                                            ? "✅"
                                                                            : "⭐"}{" "}
                                                                        {
                                                                            rec.title
                                                                        }
                                                                    </span>
                                                                )
                                                            )}
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

