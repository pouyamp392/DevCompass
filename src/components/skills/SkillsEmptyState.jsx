export default function SkillsEmptyState({ onClearSearch }) {
    return (
        <div className="text-center py-20">
            <span className="text-6xl block mb-4">🔍</span>
            <h3 className="text-xl font-bold text-zinc-400">هیچ مهارتی پیدا نشد</h3>
            <p className="text-zinc-500 text-sm mt-2">با عبارت دیگه‌ای جستجو کن</p>
            <button
                onClick={onClearSearch}
                className="mt-4 px-6 py-2 rounded-xl bg-cyan-400/10 text-cyan-400 text-sm hover:bg-cyan-400/20 transition-colors"
            >
                پاک کردن جستجو
            </button>
        </div>
    );
}