import {
    HiOutlineFire,
    HiOutlineCheckCircle,
    HiOutlineBolt,
    HiOutlineSparkles,
} from "react-icons/hi2";

export default function SkillsHero({ globalStats }) {
    return (
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10 border border-cyan-500/20 p-8">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -translate-y-32 translate-x-32 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl translate-y-16 -translate-x-16 pointer-events-none" />

            <div className="relative">
                <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">📚</span>
                    <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
                        کتابخانه مهارت‌ها
                    </h1>
                </div>
                <p className="text-zinc-400">
                    {globalStats.completed} از {globalStats.total} مهارت کامل شده • سطح {globalStats.level}
                </p>
            </div>

            <div className="relative grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3">
                    <HiOutlineFire className="text-yellow-400 flex-shrink-0" size={20} />
                    <div>
                        <p className="text-xs text-zinc-500">XP</p>
                        <p className="text-lg font-bold text-yellow-400">{globalStats.earnedXP} / {globalStats.totalXP}</p>
                    </div>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3">
                    <HiOutlineCheckCircle className="text-emerald-400 flex-shrink-0" size={20} />
                    <div>
                        <p className="text-xs text-zinc-500">کامل شده</p>
                        <p className="text-lg font-bold text-emerald-400">{globalStats.completed}</p>
                    </div>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3">
                    <HiOutlineBolt className="text-cyan-400 flex-shrink-0" size={20} />
                    <div>
                        <p className="text-xs text-zinc-500">در حال یادگیری</p>
                        <p className="text-lg font-bold text-cyan-400">{globalStats.inProgress}</p>
                    </div>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3">
                    <HiOutlineSparkles className="text-purple-400 flex-shrink-0" size={20} />
                    <div>
                        <p className="text-xs text-zinc-500">سطح</p>
                        <p className="text-lg font-bold text-purple-400">{globalStats.level}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}