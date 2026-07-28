// components/Hero/FeatureCard.jsx
export default function FeatureCard({ title, description }) {
    return (
        <div
            className="
                rounded-2xl border border-white/[0.08] bg-white/[0.035] p-4
                backdrop-blur-lg transition duration-300 hover:-translate-y-1
                hover:border-cyan-300/15 hover:bg-white/[0.055]
            "
        >
            <div className="flex items-start gap-3">
                <span
                    aria-hidden="true"
                    className="
                        mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center
                        rounded-full bg-cyan-300/10 text-xs font-black text-cyan-300
                    "
                >
                    ✓
                </span>

                <div>
                    <h2 className="text-sm font-black text-slate-100">
                        {title}
                    </h2>

                    <p className="mt-1.5 text-xs leading-6 text-slate-400">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
}