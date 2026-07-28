export default function SkillEstimate({ estimateEndDate }) {
    return (
        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 text-center">
            <p className="text-xs text-zinc-500 mb-1">⏱️ تخمین پایان</p>
            <p className="text-xl font-bold text-cyan-400">{estimateEndDate()}</p>
            <p className="text-xs text-zinc-600 mt-1">روزانه ۲ ساعت مطالعه</p>
        </div>
    );
}