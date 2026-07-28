export default function SkillOverallProgress({ overallProgress }) {
    return (
        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4">
            <div className="flex justify-between items-center">
                <span className="text-sm text-zinc-400">پیشرفت کل مسیر</span>
                <span className="text-cyan-400 font-bold">{overallProgress}%</span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden mt-2">
                <div
                    className="h-full bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full transition-all duration-700"
                    style={{ width: `${overallProgress}%` }}
                />
            </div>
        </div>
    );
}