export default function DashboardStats({ 
    roadmapProgress, 
    completedSkills, 
    allSkills, 
    inProgressSkills, 
    totalXP 
}) {
    const stats = [
        {
            label: "پیشرفت کل",
            value: `${roadmapProgress}%`,
            icon: "📊",
            color: "text-cyan-400",
            progress: roadmapProgress
        },
        {
            label: "مهارت‌ها",
            value: `${completedSkills.length}/${allSkills.length}`,
            icon: "✅",
            color: "text-emerald-400",
            subtext: `${inProgressSkills.length} در حال یادگیری`
        },
        {
            label: "XP کل",
            value: totalXP.toLocaleString(),
            icon: "⭐",
            color: "text-yellow-400",
            subtext: `${completedSkills.length} مهارت کامل`
        },
        {
            label: "مرحله فعلی",
            value: Math.floor(completedSkills.length / 3) + 1,
            icon: "🎯",
            color: "text-purple-400",
            subtext: `از ${Math.ceil(allSkills.length / 3)} مرحله`
        }
    ];

    const colors = {
        'text-cyan-400': 'border-cyan-400/20 hover:border-cyan-400/40',
        'text-emerald-400': 'border-emerald-400/20 hover:border-emerald-400/40',
        'text-yellow-400': 'border-yellow-400/20 hover:border-yellow-400/40',
        'text-purple-400': 'border-purple-400/20 hover:border-purple-400/40'
    };

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
                <div 
                    key={index}
                    className={`p-6 rounded-3xl bg-gradient-to-br from-zinc-900/50 to-zinc-800/30 border ${colors[stat.color] || 'border-zinc-800'} transition-all group`}
                >
                    <div className="flex items-center justify-between">
                        <p className="text-zinc-500 text-sm">{stat.label}</p>
                        <span className="text-xl">{stat.icon}</span>
                    </div>
                    <h2 className={`text-3xl font-black mt-3 ${stat.color}`}>
                        {stat.value}
                    </h2>
                    {stat.subtext && (
                        <p className="text-zinc-600 text-xs mt-1">{stat.subtext}</p>
                    )}
                    {stat.progress !== undefined && (
                        <div className="mt-3 h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full transition-all duration-700"
                                style={{ width: `${stat.progress}%` }}
                            />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}