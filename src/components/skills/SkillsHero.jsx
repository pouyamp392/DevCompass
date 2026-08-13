import {
    HiOutlineFire,
    HiOutlineCheckCircle,
    HiOutlineBolt,
    HiOutlineSparkles,
} from "react-icons/hi2";

export default function SkillsHero({ globalStats = {} }) {
    const {
        completed = 0,
        total = 0,
        level = 1,
        earnedXP = 0,
        totalXP = 0,
        inProgress = 0,
    } = globalStats;

    return (
        <div className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10 p-8">
            {/* Background glows */}
            <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 -translate-y-32 translate-x-32 rounded-full bg-cyan-500/10 blur-3xl" />

            <div className="pointer-events-none absolute bottom-0 left-0 h-48 w-48 -translate-x-16 translate-y-16 rounded-full bg-purple-500/10 blur-3xl" />

            <div className="relative">
                {/* Title */}
                <div className="mb-2 flex items-center gap-3">
                    <span className="text-3xl">📚</span>

                    <h1 className="bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-3xl font-black text-transparent md:text-4xl">
                        کتابخانه مهارت‌ها
                    </h1>
                </div>

                {/* Description */}
                <p className="text-zinc-400">
                    {completed} از {total} مهارت کامل شده • سطح {level}
                </p>
            </div>

            {/* Stats */}
            <div className="relative mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
                {/* XP */}
                <div className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/5 p-3">
                    <HiOutlineFire
                        className="shrink-0 text-yellow-400"
                        size={20}
                    />

                    <div>
                        <p className="text-xs text-zinc-500">
                            XP
                        </p>

                        <p className="text-lg font-bold text-yellow-400">
                            {earnedXP} / {totalXP}
                        </p>
                    </div>
                </div>

                {/* Completed */}
                <div className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/5 p-3">
                    <HiOutlineCheckCircle
                        className="shrink-0 text-emerald-400"
                        size={20}
                    />

                    <div>
                        <p className="text-xs text-zinc-500">
                            کامل شده
                        </p>

                        <p className="text-lg font-bold text-emerald-400">
                            {completed}
                        </p>
                    </div>
                </div>

                {/* In progress */}
                <div className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/5 p-3">
                    <HiOutlineBolt
                        className="shrink-0 text-cyan-400"
                        size={20}
                    />

                    <div>
                        <p className="text-xs text-zinc-500">
                            در حال یادگیری
                        </p>

                        <p className="text-lg font-bold text-cyan-400">
                            {inProgress}
                        </p>
                    </div>
                </div>

                {/* Level */}
                <div className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/5 p-3">
                    <HiOutlineSparkles
                        className="shrink-0 text-purple-400"
                        size={20}
                    />

                    <div>
                        <p className="text-xs text-zinc-500">
                            سطح
                        </p>

                        <p className="text-lg font-bold text-purple-400">
                            {level}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

