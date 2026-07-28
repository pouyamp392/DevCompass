import { Link } from "react-router-dom";

export default function SkillSuggestions({ suggestedSkills, skillProgress }) {
    if (suggestedSkills.length === 0 || skillProgress < 100) return null;

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-bold">🎯 پیشنهاد مهارت بعدی</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {suggestedSkills.map(s => (
                    <Link
                        key={s.id}
                        to={`/skill/${s.id}`}
                        className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-cyan-400/10 to-blue-400/10 border border-cyan-400/20 hover:scale-[1.02] transition-all"
                    >
                        <span className="text-2xl">{s.icon || "📘"}</span>
                        <div>
                            <p className="font-bold text-sm">{s.title}</p>
                            <p className="text-xs text-zinc-400">{s.description}</p>
                        </div>
                        <span className="mr-auto text-cyan-400">→</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}