export default function SkillProgress({ skillProgress, skillTitle }) {
    if (skillProgress <= 0) return null;

    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <span className="text-xs text-zinc-500">پیشرفت تو در {skillTitle}</span>
                <span className="text-cyan-400 text-sm font-mono">%{Math.floor(skillProgress)}</span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full transition-all duration-700"
                    style={{ width: `${skillProgress}%` }}
                />
            </div>
        </div>
    );
}