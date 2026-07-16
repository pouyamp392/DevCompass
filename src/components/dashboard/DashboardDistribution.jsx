export default function DashboardDistribution({ 
    completedSkills, 
    inProgressSkills, 
    lockedSkills, 
    allSkills 
}) {
    const total = allSkills.length;

    return (
        <div className="p-6 rounded-3xl bg-zinc-900/50 border border-zinc-800">
            <h3 className="text-sm font-bold mb-4">📊 توزیع مهارت‌ها</h3>
            <div className="space-y-3">
                <div>
                    <div className="flex justify-between text-sm mb-1">
                        <span className="text-emerald-400">✅ کامل شده</span>
                        <span className="text-zinc-400">{completedSkills.length}</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-emerald-400 rounded-full transition-all duration-700"
                            style={{ width: `${(completedSkills.length / total) * 100}%` }}
                        />
                    </div>
                </div>
                <div>
                    <div className="flex justify-between text-sm mb-1">
                        <span className="text-cyan-400">🚀 در حال یادگیری</span>
                        <span className="text-zinc-400">{inProgressSkills.length}</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-cyan-400 rounded-full transition-all duration-700"
                            style={{ width: `${(inProgressSkills.length / total) * 100}%` }}
                        />
                    </div>
                </div>
                <div>
                    <div className="flex justify-between text-sm mb-1">
                        <span className="text-red-400">🔒 قفل شده</span>
                        <span className="text-zinc-400">{lockedSkills.length}</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-red-400 rounded-full transition-all duration-700"
                            style={{ width: `${(lockedSkills.length / total) * 100}%` }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}