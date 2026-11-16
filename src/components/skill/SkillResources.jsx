export default function SkillResources({ resources }) {
    if (!resources?.length) return null;

    return (
        <div className="space-y-3">
            <h2 className="text-lg font-bold">منابع یادگیری</h2>
            <div className="space-y-2">
                {resources.map(resource => (
                    <a
                        key={resource.url}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan-400/20 transition-all group"
                    >
                        <span className="text-lg flex-shrink-0">🔗</span>
                        <div className="flex-1 min-w-0">
                            <p className="font-bold text-sm text-white group-hover:text-cyan-300 transition-colors">
                                {resource.title}
                            </p>
                            <p className="text-zinc-500 text-xs truncate mt-0.5">
                                {resource.url}
                            </p>
                        </div>
                        <svg className="w-4 h-4 text-zinc-600 group-hover:text-cyan-400 flex-shrink-0 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>
                ))}
            </div>
        </div>
    );
}