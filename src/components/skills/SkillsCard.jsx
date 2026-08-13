import { Link } from "react-router-dom";
import {
    HiOutlineLockClosed,
    HiArrowTrendingUp,
    HiCheckCircle,
} from "react-icons/hi2";

export default function SkillsCard({
    skill,
    status,
    value = 0,
    isLocked = false,
    prereqs,
    skillPath,
    hoveredSkill,
    setHoveredSkill,
}) {
    const progress = Math.min(
        100,
        Math.max(0, Number(value) || 0)
    );

    const isCompleted = status === "completed";
    const isInProgress = status === "in-progress";
    const isAvailable = status === "available";

    const canOpen =
        !isLocked &&
        !isCompleted;

    const handleMouseEnter = () => {
        setHoveredSkill?.(skill.id);
    };

    const handleMouseLeave = () => {
        setHoveredSkill?.(null);
    };

    return (
        <Link
            to={canOpen ? `/skill/${skill.id}` : "#"}
            onClick={(event) => {
                if (!canOpen) {
                    event.preventDefault();
                }
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`
                block
                p-4
                rounded-2xl
                border
                transition-all
                duration-200
                group

                ${
                    isLocked
                        ? `
                            border-zinc-800/50
                            bg-zinc-900/20
                            cursor-not-allowed
                            opacity-50
                        `
                        : isCompleted
                        ? `
                            border-emerald-400/10
                            bg-emerald-400/[0.02]
                            hover:border-emerald-400/20
                        `
                        : isInProgress
                        ? `
                            border-cyan-400/20
                            bg-cyan-400/[0.03]
                            hover:border-cyan-400/40
                        `
                        : `
                            border-white/5
                            bg-white/[0.02]
                            hover:border-cyan-400/20
                            hover:bg-cyan-400/[0.03]
                        `
                }
            `}
        >
            <div className="flex items-center gap-4">

                {/* ================================
                    ICON
                ================================= */}

                <div
                    className={`
                        w-10
                        h-10
                        rounded-xl
                        flex
                        items-center
                        justify-center
                        text-xl
                        flex-shrink-0

                        ${
                            isLocked
                                ? "bg-zinc-800/40"
                                : isCompleted
                                ? "bg-emerald-400/10"
                                : isInProgress
                                ? "bg-cyan-400/10"
                                : "bg-white/5"
                        }
                    `}
                >
                    {isLocked ? (
                        <HiOutlineLockClosed
                            className="text-zinc-600"
                            size={18}
                        />
                    ) : isCompleted ? (
                        <HiCheckCircle
                            className="text-emerald-400"
                            size={20}
                        />
                    ) : (
                        skill.icon || "📘"
                    )}
                </div>

                {/* ================================
                    CONTENT
                ================================= */}

                <div className="flex-1 min-w-0">

                    <div className="flex items-center gap-2 min-w-0">

                        <h4
                            className={`
                                font-bold
                                text-sm
                                truncate

                                ${
                                    isLocked
                                        ? "text-zinc-600"
                                        : isCompleted
                                        ? "text-emerald-300"
                                        : isInProgress
                                        ? "text-white"
                                        : "text-zinc-300"
                                }
                            `}
                        >
                            {skill.title}
                        </h4>

                        {/* Status */}

                        {isInProgress && (
                            <span
                                className="
                                    flex-shrink-0
                                    text-[10px]
                                    bg-cyan-400/10
                                    text-cyan-400
                                    px-1.5
                                    py-0.5
                                    rounded-full
                                "
                            >
                                {Math.floor(progress)}%
                            </span>
                        )}

                        {isCompleted && (
                            <span
                                className="
                                    flex-shrink-0
                                    text-[10px]
                                    bg-emerald-400/10
                                    text-emerald-400
                                    px-1.5
                                    py-0.5
                                    rounded-full
                                "
                            >
                                کامل
                            </span>
                        )}

                        {isAvailable && (
                            <span
                                className="
                                    hidden
                                    sm:inline-flex
                                    flex-shrink-0
                                    text-[10px]
                                    bg-white/5
                                    text-zinc-500
                                    px-1.5
                                    py-0.5
                                    rounded-full
                                "
                            >
                                آماده
                            </span>
                        )}

                        {/* XP */}

                        {skill.xp && (
                            <span
                                className="
                                    flex-shrink-0
                                    text-[10px]
                                    bg-yellow-400/10
                                    text-yellow-400
                                    px-1.5
                                    py-0.5
                                    rounded-full
                                "
                            >
                                +{skill.xp}
                            </span>
                        )}
                    </div>

                    {/* Description */}

                    <p
                        className="
                            text-zinc-500
                            text-xs
                            truncate
                            mt-0.5
                        "
                    >
                        {skill.description}
                    </p>
                </div>

                {/* ================================
                    RIGHT SIDE
                ================================= */}

                <div className="flex items-center gap-2 flex-shrink-0">

                    {/* Difficulty */}

                    <div className="hidden md:flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <div
                                key={star}
                                className={`
                                    w-1.5
                                    h-1.5
                                    rounded-full

                                    ${
                                        star <=
                                        Math.min(
                                            5,
                                            Math.max(
                                                1,
                                                Number(
                                                    skill.difficulty
                                                ) || 1
                                            )
                                        )
                                            ? "bg-cyan-400"
                                            : "bg-white/10"
                                    }
                                `}
                            />
                        ))}
                    </div>

                    {/* Lock / Arrow */}

                    {isLocked ? (
                        <HiOutlineLockClosed
                            className="text-zinc-600"
                            size={14}
                        />
                    ) : isCompleted ? (
                        <HiCheckCircle
                            className="
                                text-emerald-400/70
                            "
                            size={16}
                        />
                    ) : (
                        <HiArrowTrendingUp
                            className="
                                text-zinc-600
                                group-hover:text-cyan-400
                                transition-colors
                            "
                            size={16}
                        />
                    )}
                </div>
            </div>

            {/* ================================
                PROGRESS
            ================================= */}

            {isInProgress && progress > 0 && (
                <div
                    className="
                        mt-3
                        h-1
                        rounded-full
                        bg-white/5
                        overflow-hidden
                    "
                >
                    <div
                        className="
                            h-full
                            rounded-full
                            bg-gradient-to-r
                            from-cyan-400
                            to-blue-400
                            transition-all
                            duration-500
                        "
                        style={{
                            width: `${progress}%`,
                        }}
                    />
                </div>
            )}

            {/* ================================
                PREREQUISITES
            ================================= */}

            {isLocked &&
                prereqs?.required?.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-white/5">
                        <p className="text-[10px] text-red-400/70 mb-2">
                            🔒 پیش‌نیازها
                        </p>

                        <div className="flex flex-wrap gap-1">
                            {prereqs.required.map(
                                (requirement) => (
                                    <span
                                        key={
                                            requirement.id
                                        }
                                        className={`
                                            text-[10px]
                                            px-1.5
                                            py-0.5
                                            rounded-full

                                            ${
                                                requirement.completed
                                                    ? `
                                                        bg-emerald-400/10
                                                        text-emerald-400
                                                    `
                                                    : `
                                                        bg-red-400/10
                                                        text-red-400
                                                    `
                                            }
                                        `}
                                    >
                                        {requirement.completed
                                            ? "✅"
                                            : "⬜"}{" "}
                                        {
                                            requirement.title
                                        }
                                    </span>
                                )
                            )}
                        </div>
                    </div>
                )}
        </Link>
    );
}
