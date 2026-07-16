import { Link } from "react-router-dom";

export default function DashboardQuickActions({ unlockedAchievements, achievements }) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
                to="/roadmap"
                className="p-6 rounded-3xl bg-zinc-900/50 border border-zinc-800 hover:border-cyan-400/40 transition-all duration-300 hover:scale-[1.02] group"
            >
                <h3 className="text-xl font-black">🗺 نقشه راه</h3>
                <p className="text-zinc-500 text-sm mt-2 group-hover:text-zinc-400 transition-colors">
                    مشاهده مسیر یادگیری
                </p>
                <div className="mt-3 text-cyan-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    ← برو به نقشه راه
                </div>
            </Link>

            <Link
                to="/skills"
                className="p-6 rounded-3xl bg-zinc-900/50 border border-zinc-800 hover:border-emerald-400/40 transition-all duration-300 hover:scale-[1.02] group"
            >
                <h3 className="text-xl font-black">📚 همه مهارت‌ها</h3>
                <p className="text-zinc-500 text-sm mt-2 group-hover:text-zinc-400 transition-colors">
                    مشاهده همه مهارت‌ها
                </p>
                <div className="mt-3 text-emerald-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    ← مشاهده همه
                </div>
            </Link>

            <div className="p-6 rounded-3xl bg-zinc-900/50 border border-zinc-800 opacity-50 cursor-not-allowed">
                <h3 className="text-xl font-black">🏆 دستاوردها</h3>
                <p className="text-zinc-500 text-sm mt-2">
                    {unlockedAchievements.length} از {achievements.length} باز شده
                </p>
                <div className="mt-3 flex gap-1">
                    {achievements.slice(0, 4).map((a, i) => (
                        <span key={i} className={`text-sm ${a.unlocked ? 'opacity-100' : 'opacity-20'}`}>
                            {a.icon}
                        </span>
                    ))}
                </div>
            </div>

            <div className="p-6 rounded-3xl bg-zinc-900/50 border border-zinc-800 opacity-50 cursor-not-allowed">
                <h3 className="text-xl font-black">💬 پشتیبانی</h3>
                <p className="text-zinc-500 text-sm mt-2">
                    سوالات و مشکلات
                </p>
                <div className="mt-3 text-zinc-600 text-sm">
                    به زودی ⏳
                </div>
            </div>
        </div>
    );
}