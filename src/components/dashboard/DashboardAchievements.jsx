export default function DashboardAchievements({ achievements, unlockedAchievements, nextAchievement }) {
    return (
        <div className="p-6 rounded-3xl bg-zinc-900/50 border border-zinc-800">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-bold">🏆 دستاوردها</h3>
                <span className="text-xs text-zinc-500">
                    {unlockedAchievements.length}/{achievements.length}
                </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
                {achievements.map(ach => (
                    <div
                        key={ach.id}
                        className={`p-3 rounded-xl text-center transition-all ${
                            ach.unlocked
                                ? 'bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20'
                                : 'bg-zinc-800/30 border border-zinc-700 opacity-40'
                        }`}
                    >
                        <span className="text-2xl block">{ach.icon}</span>
                        <p className={`text-xs mt-1 ${ach.unlocked ? 'text-white' : 'text-zinc-500'}`}>
                            {ach.label}
                        </p>
                    </div>
                ))}
            </div>
            {nextAchievement && (
                <div className="mt-3 p-3 rounded-xl bg-white/5 border border-white/5">
                    <p className="text-xs text-zinc-500">دستاورد بعدی:</p>
                    <p className="text-sm font-bold">
                        {nextAchievement.icon} {nextAchievement.label}
                    </p>
                    <p className="text-xs text-zinc-600">{nextAchievement.description}</p>
                </div>
            )}
        </div>
    );
}