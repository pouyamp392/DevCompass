export default function SkillStats({ skill, roadmap, diffText }) {

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 text-center">
                <p className="text-xs text-zinc-500 mb-2">سختی</p>
                <div className="flex justify-center gap-0.5 mb-1">
                    {[1, 2, 3, 4, 5].map(star => (
                        <div
                            key={star}
                            className={`w-2 h-2 rounded-full ${star <= skill.difficulty ? "bg-cyan-400" : "bg-white/10"}`}
                        />
                    ))}
                </div>
                <p className="text-xs text-cyan-400/70">{diffText}</p>
            </div>

            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 text-center">
                <p className="text-xs text-zinc-500 mb-2">زمان</p>
                <p className="text-2xl font-black">{skill.time}</p>
                <p className="text-xs text-zinc-600">روز</p>
            </div>

            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 text-center">
                <p className="text-xs text-zinc-500 mb-2">مرحله</p>
                <p className="text-2xl font-black">{skill.stage}</p>
                <p className="text-xs text-zinc-600">از {roadmap.length}</p>
            </div>

            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 text-center">
                <p className="text-xs text-zinc-500 mb-2">XP</p>
                <p className="text-2xl font-black text-cyan-400">{skill.xp || 0}</p>
                <p className="text-xs text-zinc-600">امتیاز</p>
            </div>
        </div>
    );
}