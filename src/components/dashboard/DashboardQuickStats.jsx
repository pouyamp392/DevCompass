export default function DashboardQuickStats({ 
    allSkills, 
    completedSkills, 
    totalXP, 
    currentStage 
}) {
    return (
        <div className="p-6 rounded-3xl bg-zinc-900/50 border border-zinc-800">
            <h3 className="text-sm font-bold mb-4">⚡ آمار سریع</h3>
            <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 rounded-xl bg-white/5">
                    <p className="text-2xl font-black text-cyan-400">{allSkills.length}</p>
                    <p className="text-xs text-zinc-500">کل مهارت‌ها</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-white/5">
                    <p className="text-2xl font-black text-emerald-400">{completedSkills.length}</p>
                    <p className="text-xs text-zinc-500">تکمیل شده</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-white/5">
                    <p className="text-2xl font-black text-yellow-400">{totalXP}</p>
                    <p className="text-xs text-zinc-500">کل XP</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-white/5">
                    <p className="text-2xl font-black text-purple-400">{currentStage?.title || '-'}</p>
                    <p className="text-xs text-zinc-500">مرحله فعلی</p>
                </div>
            </div>
        </div>
    );
}