// components/Hero/HeroBadge.jsx
export default function HeroBadge() {
    return (
        <div
            className="
                mb-6 inline-flex items-center gap-2 rounded-full
                border border-cyan-300/15 bg-cyan-300/[0.06]
                px-4 py-2 text-xs font-bold text-cyan-200 backdrop-blur-xl sm:text-sm
            "
        >
            <span
                aria-hidden="true"
                className="
                    flex h-5 w-5 items-center justify-center rounded-full
                    bg-cyan-300/10 text-cyan-300
                "
            >
                ✦
            </span>
            مسیر هوشمند انتخاب حوزه برنامه‌نویسی
        </div>
    );
}