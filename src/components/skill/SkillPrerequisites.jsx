import { Link } from "react-router-dom";

export default function SkillPrerequisites({ requires, progress }) {
    if (requires.length === 0) {
        return (
            <div className="space-y-4">
                <h2 className="text-lg font-bold text-center">پیش‌نیازها</h2>
                <div className="bg-cyan-400/5 border border-cyan-400/10 rounded-2xl p-5 text-center">
                    <span className="text-2xl block mb-2">🎉</span>
                    <p className="text-cyan-300 font-bold">بدون پیش‌نیاز</p>
                    <p className="text-zinc-500 text-sm mt-1">همین حالا می‌تونی شروع کنی</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-bold text-center">پیش‌نیازها</h2>
            <div className="space-y-2">
                {requires.map(item => {
                    const itemProgress = progress?.[item.id] || 0;
                    const isCompleted = itemProgress >= 100;
                    const isInProgress = itemProgress > 0 && itemProgress < 100;

                    let statusIcon = "🔒";
                    let statusText = "قفل شده";
                    let statusClass = "text-red-400";

                    if (isCompleted) {
                        statusIcon = "✅";
                        statusText = "کامل شده";
                        statusClass = "text-emerald-400";
                    } else if (isInProgress) {
                        statusIcon = "🚀";
                        statusText = `${Math.floor(itemProgress)}%`;
                        statusClass = "text-cyan-400";
                    }

                    return (
                        <Link
                            key={item.id}
                            to={`/skill/${item.id}`}
                            className="flex items-center gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan-400/20 transition-all group"
                        >
                            <span className="text-xl">{item.icon || "📘"}</span>
                            <span className="flex-1 text-sm text-white group-hover:text-cyan-300 transition-colors">
                                {item.title}
                            </span>
                            <span className={`text-xs font-medium ${statusClass}`}>
                                {statusIcon} {statusText}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}