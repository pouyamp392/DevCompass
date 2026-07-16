import { Link } from "react-router-dom";

export default function DashboardRecentSkills({ recentSkills, progress }) {
    if (recentSkills.length === 0) {
        return (
            <div className="md:col-span-2 space-y-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">📈 مهارت‌های در حال یادگیری</h2>
                    <Link to="/roadmap" className="text-cyan-400 text-sm hover:underline">
                        مشاهده همه →
                    </Link>
                </div>
                <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 text-center">
                    <span className="text-4xl block mb-3">🚀</span>
                    <p className="text-zinc-400">هنوز هیچ مهارتی رو شروع نکردی</p>
                    <Link to="/roadmap" className="inline-block mt-3 text-cyan-400 text-sm hover:underline">
                        برو به نقشه راه
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="md:col-span-2 space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">📈 مهارت‌های در حال یادگیری</h2>
                <Link to="/roadmap" className="text-cyan-400 text-sm hover:underline">
                    مشاهده همه →
                </Link>
            </div>
            <div className="grid grid-cols-1 gap-3">
                {recentSkills.map(skill => {
                    const value = progress?.[skill.id] || 0;
                    return (
                        <Link
                            key={skill.id}
                            to={`/skill/${skill.id}`}
                            className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-cyan-400/20 transition-all group"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3 flex-1">
                                    <span className="text-3xl">{skill.icon}</span>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3">
                                            <h3 className="font-bold group-hover:text-cyan-300 transition-colors">
                                                {skill.title}
                                            </h3>
                                            <span className="text-xs text-zinc-600">
                                                {skill.difficulty}⭐
                                            </span>
                                            <span className="text-xs text-zinc-600">
                                                {skill.time} روز
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-4 mt-2">
                                            <div className="flex-1 max-w-xs">
                                                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full transition-all duration-700"
                                                        style={{ width: `${value}%` }}
                                                    />
                                                </div>
                                            </div>
                                            <span className="text-cyan-400 text-xs font-mono">
                                                {Math.floor(value)}%
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <span className="text-zinc-600 group-hover:text-cyan-400 transition-colors">
                                    →
                                </span>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}