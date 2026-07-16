import { Link } from "react-router-dom";

export default function DashboardContinue({ 
    currentSkill, 
    nextSkill, 
    allSkills, 
    skillProgress, 
    completedSkills,
    progress,
    allSkillsCount 
}) {
    const isAllCompleted = completedSkills.length === allSkillsCount;

    if (isAllCompleted) {
        return (
            <div className="p-8 rounded-3xl bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <span className="text-5xl">🎉</span>
                        <div>
                            <h2 className="text-2xl font-black text-emerald-400">
                                همه مهارت‌ها کامل شد!
                            </h2>
                            <p className="text-zinc-400 text-sm">
                                به پایان مسیر رسیدی، حالا وقت ساختن پروژه‌های بزرگه
                            </p>
                        </div>
                    </div>
                    <Link
                        to="/roadmap"
                        className="px-6 py-3 rounded-2xl bg-emerald-400 text-black font-bold hover:bg-emerald-300 transition-all active:scale-[0.98] text-center whitespace-nowrap"
                    >
                        🏆 دیدن دستاوردها
                    </Link>
                </div>
            </div>
        );
    }

    const skill = currentSkill || nextSkill;
    const isInProgress = currentSkill !== null;

    return (
        <div className="p-8 rounded-3xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="space-y-3">
                    <p className="text-zinc-500 text-sm">
                        {isInProgress ? "⏳ ادامه یادگیری" : "🚀 شروع کن"}
                    </p>
                    <div className="flex items-center gap-3">
                        <span className="text-4xl">{skill?.icon || "📘"}</span>
                        <div>
                            <h2 className="text-2xl font-black">
                                {skill?.title || "شروع مسیر"}
                            </h2>
                            <p className="text-zinc-400 text-sm">
                                {skill?.description || "اولین مهارت رو انتخاب کن"}
                            </p>
                        </div>
                    </div>

                    {isInProgress && (
                        <div className="space-y-1 max-w-xs">
                            <div className="flex justify-between text-xs">
                                <span className="text-zinc-500">پیشرفت</span>
                                <span className="text-cyan-400 font-mono">{Math.floor(skillProgress)}%</span>
                            </div>
                            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full transition-all duration-700"
                                    style={{ width: `${skillProgress}%` }}
                                />
                            </div>
                        </div>
                    )}

                    {!isInProgress && skill?.requires?.length > 0 && (
                        <div className="flex items-center gap-2 text-xs text-zinc-500 flex-wrap">
                            <span>پیش‌نیازها:</span>
                            {skill.requires.map(req => {
                                const reqSkill = allSkills.find(s => s.id === req);
                                const isCompleted = (progress?.[req] || 0) >= 100;
                                return (
                                    <span key={req} className={`px-2 py-1 rounded-full ${isCompleted ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-zinc-400'}`}>
                                        {isCompleted ? '✅' : '📚'} {reqSkill?.title || req}
                                    </span>
                                );
                            })}
                        </div>
                    )}
                </div>

                <Link
                    to={`/skill/${skill?.id || allSkills[0]?.id}`}
                    className="px-6 py-3 rounded-2xl bg-cyan-400 text-black font-bold hover:bg-cyan-300 transition-all active:scale-[0.98] text-center whitespace-nowrap"
                >
                    {isInProgress ? "⏳ ادامه" : "🚀 شروع"}
                </Link>
            </div>
        </div>
    );
}