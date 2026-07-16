import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import QuizContext from "../context/QuizContext";

import Scene from "../components/ui/Scene";

import generateRoadmap from "../engine/generateRoadmap";
import generateStages from "../engine/generateStages";

export default function Result() {

    const navigate = useNavigate();

    const {
        result,
        setRoadmap
    } = useContext(QuizContext);

    if (!result || result.length === 0) {

        return (

            <section className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">

                <h1 className="text-3xl">

                    نتیجه‌ای پیدا نشد.

                </h1>

            </section>

        );

    }

    const bestResult = result[0];

    const goalMap = {

        frontend: "frontend",
        backend: "backend",
        ai: "ai",

        "فرانت اند": "frontend",
        "بک اند": "backend",
        "هوش مصنوعی": "ai"

    };

    const roadmapGoal =
        goalMap[bestResult.id] ||
        bestResult.id;

    function handleRoadmap() {

        const roadmap =
            generateStages(
                generateRoadmap(
                    roadmapGoal
                )
            );

        setRoadmap(roadmap);

        navigate("/roadmap");

    }

    return (

        <section className="relative min-h-screen overflow-hidden flex items-center justify-center px-6 py-8">

            <Scene variant="result" />

            <div className="absolute inset-0 bg-cyan-500/5 blur-[220px] pointer-events-none" />

            <div className="relative z-10 w-full max-w-2xl">

                <div className="text-center mb-8">

                    <p className="text-cyan-400/40 text-xs tracking-[8px] font-mono">

                        ANALYSIS COMPLETE

                    </p>

                </div>

                {/* Winner */}

                <div className="bg-cyan-500/5 backdrop-blur-2xl rounded-[32px] border border-cyan-400/30 p-6 mb-5">

                    <div className="flex items-center gap-6">

                        <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-cyan-400/15 border border-cyan-400/30 flex items-center justify-center">

                            <span className="text-2xl">
                                🥇
                            </span>

                        </div>

                        <div className="relative flex-shrink-0 w-20 h-20">

                            <svg className="absolute inset-0 -rotate-90 w-full h-full">

                                <circle
                                    cx="40"
                                    cy="40"
                                    r="34"
                                    fill="none"
                                    stroke="rgba(255,255,255,.05)"
                                    strokeWidth="3"
                                />

                                <circle
                                    cx="40"
                                    cy="40"
                                    r="34"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeDasharray={`${bestResult.percentage * 2.13} 213`}
                                    className="text-cyan-400"
                                />

                            </svg>

                            <div className="absolute inset-0 flex items-center justify-center">

                                <span className="text-cyan-400 font-bold text-lg">

                                    {bestResult.percentage}%

                                </span>

                            </div>

                        </div>

                        <div>

                            <p className="text-cyan-400/50 text-[10px] tracking-[6px] font-mono mb-1">

                                BEST MATCH

                            </p>

                            <h2 className="text-3xl font-black text-white">

                                {bestResult.id}

                            </h2>

                            <p className="text-white/40 text-sm mt-1">

                                بیشترین تطابق با پاسخ‌های شما

                            </p>

                        </div>

                    </div>

                </div>

                {/* Rankings */}

                <div className="space-y-3 mb-10">

                    {result.map((item, index) => {

                        const medals = [
                            "🥇",
                            "🥈",
                            "🥉",
                            "4️⃣",
                            "5️⃣"
                        ];

                        return (

                            <div
                                key={item.id}
                                className={`
                                    rounded-2xl
                                    border
                                    p-4
                                    backdrop-blur-xl
                                    transition-all

                                    ${
                                        index === 0
                                            ? "border-cyan-400/20 bg-cyan-500/[0.03]"
                                            : "border-white/5 bg-white/[0.02]"
                                    }
                                `}
                            >

                                <div className="flex items-center gap-4">

                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">

                                        {medals[index]}

                                    </div>

                                    <div className="flex-1">

                                        <p className="text-white font-medium">

                                            {item.id}

                                        </p>

                                    </div>

                                    <div className="flex items-center gap-3">

                                        <div className="w-24 h-1.5 rounded-full bg-white/5 overflow-hidden">

                                            <div
                                                className="h-full rounded-full bg-cyan-400"
                                                style={{
                                                    width: `${item.percentage}%`
                                                }}
                                            />

                                        </div>

                                        <span className="text-sm text-white/50 w-12">

                                            {item.percentage}%

                                        </span>

                                    </div>

                                </div>

                            </div>

                        );

                    })}

                </div>

                {/* CTA */}

                <div className="text-center">

                    <button
                        onClick={handleRoadmap}
                        className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-cyan-400 text-black font-bold text-sm hover:bg-cyan-300 transition-all duration-300 group"
                    >

                        مشاهده نقشه راه

                        <span className="group-hover:translate-x-1 transition-transform">

                            →

                        </span>

                    </button>

                    <p className="text-white/20 text-xs mt-3">

                        یا برای تغییر پاسخ‌ها به صفحه قبل برگردید

                    </p>

                </div>

            </div>

        </section>

    );

}