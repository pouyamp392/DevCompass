import { Link } from "react-router-dom";

export default function SkillHeader({ skill }) {
    return (
        <>
            <Link
                to="/roadmap"
                className="inline-flex items-center gap-2 text-zinc-500 hover:text-cyan-400 text-sm transition-colors group"
            >
                <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                برگشت به نقشه راه
            </Link>

            <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-3xl mx-auto">
                    {skill.icon || "📘"}
                </div>
                <h1 className="text-4xl md:text-5xl font-black">
                    {skill.title}
                </h1>
                <p className="text-zinc-400 leading-relaxed max-w-lg mx-auto">
                    {skill.description}
                </p>
            </div>
        </>
    );
}