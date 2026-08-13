import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
    Trophy,
    Award,
    Medal,
    ChevronDown,
} from "lucide-react";

import QuizContext from "../context/QuizContext";
import Scene from "../components/ui/Scene";

import generateRoadmap from "../engine/generateRoadmap";
import generateStages from "../engine/generateStages";

import AuthContext from "../context/AuthContext";

// ==============================================
// RankItem
// ==============================================

function RankItem({
    item,
    rank,
    icon,
    isSelected,
    onSelect,
    explanation,
}) {
    return (
        <div
            onClick={onSelect}
            className={`
                rounded-2xl
                border
                p-4
                backdrop-blur-xl
                transition-all
                duration-300
                cursor-pointer

                ${
                    isSelected
                        ? "border-cyan-400/30 bg-cyan-500/[0.06]"
                        : "border-white/5 bg-white/[0.02] hover:border-white/10"
                }
            `}
        >
            <div className="flex items-center gap-4">

                {/* آیکون رتبه */}
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                    {icon}
                </div>

                {/* نام حوزه */}
                <div className="flex-1">
                    <p className="text-white font-medium">
                        {item.id}
                    </p>
                </div>

                {/* نوار درصد */}
                <div className="flex items-center gap-3">

                    <div className="w-24 h-1.5 rounded-full bg-white/5 overflow-hidden">
                        <div
                            className="h-full rounded-full bg-cyan-400 transition-all duration-500"
                            style={{
                                width: `${item.percentage}%`,
                            }}
                        />
                    </div>

                    <span className="text-sm text-white/50 w-12">
                        {item.percentage}%
                    </span>

                </div>

                {/* آیکون بازشونده */}
                <ChevronDown
                    className={`
                        w-4 h-4
                        text-white/40
                        transition-transform
                        duration-300

                        ${
                            isSelected
                                ? "rotate-180"
                                : ""
                        }
                    `}
                />

            </div>

            {/* پنل توضیح */}
            <div
                className={`
                    overflow-hidden
                    transition-all
                    duration-400
                    ease-in-out

                    ${
                        isSelected
                            ? "max-h-48 opacity-100 mt-4"
                            : "max-h-0 opacity-0 mt-0"
                    }
                `}
            >
                <div className="bg-white/[0.03] rounded-xl p-4 border border-white/5">

                    <p className="text-white/60 text-sm leading-relaxed">
                        {explanation}
                    </p>

                    <p className="text-cyan-400/40 text-xs mt-2 font-mono">
                        توضیحات تکمیلی به‌زودی...
                    </p>

                </div>
            </div>

        </div>
    );
}

// ==============================================
// Result
// ==============================================

export default function Result() {

    const navigate = useNavigate();

    const { user } =
        useContext(AuthContext);

    // ==========================================
    // Quiz Context
    // ==========================================

    const {
        result,
        setRoadmap,
        setRoadmapGoal,

        // مهم:
        // همان skills اصلی پروژه
        skills,
    } = useContext(QuizContext);

    // ==========================================
    // STATE
    // ==========================================

    const [selectedId, setSelectedId] =
        useState(null);

    // ==========================================
    // هندل نبود نتیجه
    // ==========================================

    if (
        !result ||
        result.length === 0
    ) {
        return (
            <section className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">

                <h1 className="text-3xl font-black">
                    نتیجه‌ای پیدا نشد.
                </h1>

            </section>
        );
    }

    // ==========================================
    // بهترین نتیجه
    // ==========================================

    const bestResult =
        result[0];

    // ==========================================
    // Goal Map
    // ==========================================

    const goalMap = {
        frontend: "frontend",
        backend: "backend",
        ai: "ai",

        "فرانت اند":
            "frontend",

        "بک اند":
            "backend",

        "هوش مصنوعی":
            "ai",
    };

    const roadmapGoal =
        goalMap[bestResult.id] ||
        bestResult.id;

    // ==========================================
    // Generate Roadmap
    // ==========================================

    async function handleRoadmap(goal) {

        try {

            // ====================================
            // 1. Validate user
            // ====================================

            if (!user?.id) {
                throw new Error(
                    "کاربر وارد نشده است"
                );
            }

            // ====================================
            // 2. Validate skills
            // ====================================

            if (
                !Array.isArray(skills) ||
                skills.length === 0
            ) {
                throw new Error(
                    "لیست مهارت‌ها هنوز بارگذاری نشده است"
                );
            }

            // ====================================
            // 3. Generate roadmap
            //
            // از همان skills اصلی استفاده می‌کنیم
            // ====================================

            const roadmapSkills =
                generateRoadmap(
                    goal,
                    skills
                );

            // ====================================
            // 4. Generate stages
            // ====================================

            const roadmap =
                generateStages(
                    roadmapSkills
                );

            // ====================================
            // Debug
            // ====================================

            console.log(
                "Roadmap goal:",
                goal
            );

            console.log(
                "All skills:",
                skills
            );

            console.log(
                "Roadmap skills:",
                roadmapSkills
            );

            console.log(
                "Generated roadmap:",
                roadmap
            );

            // ====================================
            // 5. Save roadmap goal
            // ====================================

            const response =
                await fetch(
                    "http://localhost/devcompass-api/api/roadmap.php",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json",
                        },

                        body:
                            JSON.stringify({
                                user_id:
                                    Number(
                                        user.id
                                    ),

                                roadmap_goal:
                                    goal,
                            }),
                    }
                );

            // ====================================
            // 6. Response
            // ====================================

            const data =
                await response.json();

            if (
                !response.ok ||
                !data.success
            ) {
                throw new Error(
                    data.message ||
                        "خطا در ذخیره مسیر"
                );
            }

            // ====================================
            // 7. Update Context
            // ====================================

            setRoadmap(
                roadmap
            );

            setRoadmapGoal(
                goal
            );

            // ====================================
            // 8. Navigate
            // ====================================

            navigate(
                "/dashboard"
            );

        } catch (error) {

            console.error(
                "Failed to generate roadmap:",
                error
            );

        }
    }

    // ==========================================
    // Explanation
    // ==========================================

    function getExplanation(id) {

        const map = {

            frontend:
                "شما به طراحی رابط کاربری، تجربه کاربری و جزئیات بصری علاقه دارید. خلاقیت و دقت در پیاده‌سازی طرح‌ها از ویژگی‌های شماست.",

            backend:
                "ذهن تحلیلی و علاقه به منطق و ساختارهای پشت صحنه دارید. حل مسائل پیچیده و کار با داده‌ها شما را به چالش می‌کشد.",

            ai:
                "کنجکاوی علمی، عشق به ریاضیات و الگوریتم‌ها، و تمایل به حل مسائل هوشمند از شاخصه‌های اصلی شماست.",

            "فرانت اند":
                "شما به طراحی رابط کاربری، تجربه کاربری و جزئیات بصری علاقه دارید. خلاقیت و دقت در پیاده‌سازی طرح‌ها از ویژگی‌های شماست.",

            "بک اند":
                "ذهن تحلیلی و علاقه به منطق و ساختارهای پشت صحنه دارید. حل مسائل پیچیده و کار با داده‌ها شما را به چالش می‌کشد.",

            "هوش مصنوعی":
                "کنجکاوی علمی، عشق به ریاضیات و الگوریتم‌ها، و تمایل به حل مسائل هوشمند از شاخصه‌های اصلی شماست.",
        };

        return (
            map[id] ||
            "تحلیل دقیق‌تری برای این حوزه در حال آماده‌سازی است."
        );
    }

    // ==========================================
    // Rank Icon
    // ==========================================

    function getRankIcon(index) {

        switch (index) {

            case 0:
                return (
                    <Trophy className="w-5 h-5 text-cyan-400" />
                );

            case 1:
                return (
                    <Award className="w-5 h-5 text-blue-400" />
                );

            case 2:
                return (
                    <Medal className="w-5 h-5 text-purple-400" />
                );

            default:
                return (
                    <span className="text-sm font-bold text-white/40">
                        {index + 1}
                    </span>
                );
        }
    }

    // ==========================================
    // Render
    // ==========================================

    return (

        <section className="relative min-h-screen overflow-hidden flex items-center justify-center px-6 py-8">

            {/* Background */}
            <Scene variant="result" />

            {/* Cyan Glow */}
            <div className="absolute inset-0 bg-cyan-500/5 blur-[220px] pointer-events-none" />

            {/* Main */}
            <div className="relative z-10 w-full max-w-2xl">

                {/* Header */}
                <div className="text-center mb-8">

                    <p className="text-cyan-400/40 text-xs tracking-[8px] font-mono">
                        ANALYSIS COMPLETE
                    </p>

                </div>

                {/* Winner Card */}
                <div className="bg-cyan-500/5 backdrop-blur-2xl rounded-[32px] border border-cyan-400/30 p-6 mb-6">

                    <div className="flex items-center gap-6">

                        {/* Icon */}
                        <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-cyan-400/15 border border-cyan-400/30 flex items-center justify-center">

                            <Trophy className="w-7 h-7 text-cyan-400" />

                        </div>

                        {/* Percentage Circle */}
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

                        {/* Winner Info */}
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

                    {/* CTA */}
                    <div className="mt-6 pt-5 border-t border-white/5">

                        <button
                            onClick={() =>
                                handleRoadmap(
                                    roadmapGoal
                                )
                            }
                            className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-cyan-400 text-black font-bold text-sm hover:bg-cyan-300 transition-all duration-300 group"
                        >

                            مشاهده نقشه راه{" "}
                            {bestResult.id}

                            <span className="group-hover:translate-x-1 transition-transform">
                                →
                            </span>

                        </button>

                    </div>

                </div>

                {/* Other Matches */}
                {result.length > 1 && (

                    <div className="space-y-3 mb-10">

                        <p className="text-white/30 text-xs font-mono tracking-[4px] px-1">
                            OTHER MATCHES
                        </p>

                        {result
                            .slice(1)
                            .map(
                                (
                                    item,
                                    index
                                ) => {

                                    const rank =
                                        index + 1;

                                    const isSelected =
                                        selectedId ===
                                        item.id;

                                    return (

                                        <RankItem
                                            key={
                                                item.id
                                            }
                                            item={
                                                item
                                            }
                                            rank={
                                                rank
                                            }
                                            icon={
                                                getRankIcon(
                                                    rank
                                                )
                                            }
                                            isSelected={
                                                isSelected
                                            }
                                            onSelect={() =>
                                                setSelectedId(
                                                    isSelected
                                                        ? null
                                                        : item.id
                                                )
                                            }
                                            explanation={
                                                getExplanation(
                                                    item.id
                                                )
                                            }
                                        />

                                    );
                                }
                            )}

                    </div>

                )}

                {/* Bottom Text */}
                <div className="text-center">

                    <p className="text-white/20 text-xs mt-3">
                        یا برای تغییر پاسخ‌ها به صفحه قبل برگردید
                    </p>

                </div>

            </div>

        </section>
    );
}