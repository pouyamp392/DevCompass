// components/Hero/HeroCTA.jsx
import { Link } from "react-router-dom";

export default function HeroCTA() {
    return (
        <>
            <div
                className="
                    mt-9 flex flex-col items-stretch gap-3
                    sm:flex-row sm:items-center
                "
            >
                <Link
                    to="/quiz"
                    className="
                        group inline-flex min-h-14 items-center justify-center gap-3
                        rounded-2xl bg-gradient-to-l from-cyan-400 to-blue-500
                        px-7 py-3.5 text-sm font-black text-slate-950
                        shadow-[0_12px_45px_rgba(34,211,238,0.22)]
                        transition duration-300 hover:-translate-y-1
                        hover:shadow-[0_18px_55px_rgba(34,211,238,0.32)]
                        focus-visible:outline-none focus-visible:ring-2
                        focus-visible:ring-cyan-300 focus-visible:ring-offset-2
                        focus-visible:ring-offset-slate-950 sm:text-base
                    "
                >
                    <span
                        aria-hidden="true"
                        className="text-lg transition-transform duration-300 group-hover:-rotate-12"
                    >
                        🧭
                    </span>
                    مسیر مناسبم را پیدا کن
                    <span
                        aria-hidden="true"
                        className="transition-transform duration-300 group-hover:-translate-x-1"
                    >
                        ←
                    </span>
                </Link>

                <Link
                    to="/login"
                    className="
                        inline-flex min-h-14 items-center justify-center rounded-2xl
                        border border-white/10 bg-white/[0.045] px-7 py-3.5
                        text-sm font-bold text-slate-200 backdrop-blur-xl
                        transition duration-300 hover:border-white/20
                        hover:bg-white/[0.08] hover:text-white
                        focus-visible:outline-none focus-visible:ring-2
                        focus-visible:ring-white/40 focus-visible:ring-offset-2
                        focus-visible:ring-offset-slate-950 sm:text-base
                    "
                >
                    قبلاً مسیرم رو ساختم                
                    
                    </Link>
            </div>
        </>
    );
}