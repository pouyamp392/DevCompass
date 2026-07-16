import { Link } from "react-router-dom";

export default function SkillNextSteps({ 
    nextSkillsInStage, 
    nextStage, 
    currentStage 
}) {
    if (nextSkillsInStage.length === 0 && !nextStage) return null;

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-bold">📍 مرحله بعدی</h2>
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 space-y-3">
                {nextSkillsInStage.length > 0 && (
                    <div>
                        <p className="text-xs text-zinc-500 mb-2">
                            در همین مرحله ({currentStage?.title || "مرحله فعلی"}):
                        </p>
                        <div className="space-y-2">
                            {nextSkillsInStage.slice(0, 4).map(s => (
                                <Link
                                    key={s.id}
                                    to={`/skill/${s.id}`}
                                    className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] transition-colors"
                                >
                                    <span className="text-lg">{s.icon || "📘"}</span>
                                    <span className="text-sm">{s.title}</span>
                                    <span className="text-xs text-zinc-500 mr-auto">{s.difficulty}⭐</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {nextStage && (
                    <div>
                        <p className="text-xs text-zinc-500 mb-2">
                            مرحله بعدی ({nextStage.title}):
                        </p>
                        <div className="space-y-2">
                            {nextStage.skills.slice(0, 3).map(s => (
                                <Link
                                    key={s.id}
                                    to={`/skill/${s.id}`}
                                    className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] transition-colors"
                                >
                                    <span className="text-lg">{s.icon || "📘"}</span>
                                    <span className="text-sm">{s.title}</span>
                                    <span className="text-xs text-zinc-500 mr-auto">{s.difficulty}⭐</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}