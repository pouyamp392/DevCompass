import { useState, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    Trophy,
    Award,
    Medal,
    ChevronDown,
    Sparkles,
    BarChart3,
    TrendingUp,
    Target,
    Clock,
    Lightbulb,
} from "lucide-react";

import QuizContext from "../context/QuizContext";
import Scene from "../components/ui/Scene";

// ==============================================
// GOAL LABELS
// ==============================================

const GOAL_LABELS = {
    frontend: "فرانت‌اند",
    backend: "بک‌اند",
    ai: "هوش مصنوعی",
    devops: "دواپس",
    mobile: "موبایل",
    game: "گیم‌دِو",
    uiux: "UI/UX",
};

// ==============================================
// PROFILE LABELS
// ==============================================

const LEVEL_LABELS = {
    beginner: "مبتدی",
    intermediate: "متوسط",
    advanced: "پیشرفته",
};

const GOAL_INTENT_LABELS = {
    employment: "استخدام",
    freelance: "فریلنس",
    startup: "استارتاپ",
    hobby: "علاقه شخصی",
};

const TIME_LABELS = {
    low: "کم (۱ ساعت)",
    medium: "متوسط (۲-۳ ساعت)",
    high: "زیاد (۴+ ساعت)",
};

const STYLE_LABELS = {
    visual: "ویدیو و پروژه",
    textual: "مستندات و تمرین",
    interactive: "چالش و تمرین",
};

// ==============================================
// ANIMATION VARIANTS
// ==============================================

const fadeUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
};

const staggerContainer = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.08,
        },
    },
};

// ==============================================
// getGoalTitle
// ==============================================

function getGoalTitle(id) {
    return GOAL_LABELS[id] || id;
}

// ==============================================
// getDynamicExplanation
// ==============================================

function getDynamicExplanation(id, percentage, rank, total) {
    const baseDescriptions = {
        frontend:
            "طراحی رابط کاربری، تجربه‌ی کاربری و جزئیات بصری، چیزیه که فرانت‌اند رو خاص می‌کنه.",
        backend:
            "ذهن تحلیلی، علاقه به منطق و ساختارهای پشت صحنه، بک‌اند رو برات جذاب می‌کنه.",
        ai:
            "کنجکاوی علمی، عشق به ریاضیات و الگوریتم‌ها، تو رو به سمت هوش مصنوعی می‌کشه.",
        devops:
            "دوست داری سیستم‌ها پایدار، سریع و بدون دردسر کار کنن — این یعنی دواپس.",
        mobile:
            "ساختن اپلیکیشن برای موبایل و کار با محدودیت‌های کوچیک، چیزیه که موبایل رو خاص می‌کنه.",
        game:
            "بازی‌سازی ترکیبی از خلاقیت، ریاضیات و گرافیکه — و تو به هر سه‌شون علاقه داری.",
        uiux:
            "طراحی تجربه‌ی کاربر، فهمیدن نیازهای آدم‌ها و ساختن رابط‌های زیبا، حوزه‌ی توئه.",
    };

    const base = baseDescriptions[id] || "این حوزه به علاقه‌های تو نزدیکه.";

    let dynamics = "";

    if (rank === 0) {
        dynamics = `با ${percentage}% تطابق، این حوزه بهترین گزینه‌ست.`;
    } else if (percentage >= 50) {
        dynamics = `با ${percentage}% تطابق، این حوزه هم برات جذابه — ولی گزینه‌ی اولت نیست.`;
    } else if (percentage >= 25) {
        dynamics = `فقط ${percentage}% از پاسخ‌هات به این حوزه اشاره داشت.`;
    } else {
        dynamics = `این حوزه با ${percentage}% کمترین تطابق رو با پاسخ‌هات داره.`;
    }

    return `${base} ${dynamics}`;
}

// ==============================================
// getComparisonText
// ==============================================

function getComparisonText(best, second) {
    if (!best || !second) return null;

    const gap = best.percentage - second.percentage;
    const bestTitle = getGoalTitle(best.id);
    const secondTitle = getGoalTitle(second.id);

    if (gap >= 40) {
        return `${bestTitle} با ${best.percentage}٪ و ${secondTitle} با ${second.percentage}٪ در رتبه‌ی بعدی — یعنی تفاوت واضحی داری.`;
    }

    if (gap >= 20) {
        return `${bestTitle} با ${best.percentage}٪ جلوتره، ولی ${secondTitle} با ${second.percentage}٪ هم برات جذابه.`;
    }

    if (gap >= 10) {
        return `${bestTitle} با ${best.percentage}٪ و ${secondTitle} با ${second.percentage}٪ — تفاوتشون کمه، شاید بد نباشه هر دو رو ببینی.`;
    }

    return `⚠️ ${bestTitle} با ${best.percentage}٪ و ${secondTitle} با ${second.percentage}٪ — نتیجه‌ات خیلی نزدیکه!`;
}

// ==============================================
// PROFILE SUMMARY
// ==============================================

function ProfileSummary({ profile }) {
    if (!profile) return null;

    const items = [
        {
            icon: TrendingUp,
            label: "سطح",
            value: LEVEL_LABELS[profile.level] || profile.level,
            color: "text-emerald-400",
            bg: "bg-emerald-400/10",
            border: "border-emerald-400/20",
        },
        {
            icon: Target,
            label: "هدف",
            value: GOAL_INTENT_LABELS[profile.goal] || profile.goal,
            color: "text-purple-400",
            bg: "bg-purple-400/10",
            border: "border-purple-400/20",
        },
        {
            icon: Clock,
            label: "وقت",
            value: TIME_LABELS[profile.time] || profile.time,
            color: "text-amber-400",
            bg: "bg-amber-400/10",
            border: "border-amber-400/20",
        },
        {
            icon: Lightbulb,
            label: "سبک",
            value: STYLE_LABELS[profile.style] || profile.style,
            color: "text-pink-400",
            bg: "bg-pink-400/10",
            border: "border-pink-400/20",
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.025] backdrop-blur-2xl p-4"
        >
            <div className="flex items-center gap-2.5 mb-3">
                <div className="w-7 h-7 rounded-lg bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center">
                    <BarChart3 className="w-3.5 h-3.5 text-cyan-400" />
                </div>
                <p className="text-[10px] font-mono tracking-[4px] uppercase text-cyan-400/60">
                    Your Profile
                </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
                {items.map((item) => {
                    const Icon = item.icon;
                    return (
                        <div
                            key={item.label}
                            className={`
                                rounded-xl border px-3 py-2.5
                                ${item.bg} ${item.border}
                            `}
                        >
                            <div className="flex items-center gap-1.5 mb-1">
                                <Icon className={`w-3 h-3 ${item.color}`} />
                                <span className="text-[9px] font-mono tracking-wider uppercase text-zinc-500">
                                    {item.label}
                                </span>
                            </div>
                            <p className={`text-xs font-bold ${item.color}`}>
                                {item.value}
                            </p>
                        </div>
                    );
                })}
            </div>
        </motion.div>
    );
}

// ==============================================
// RANK ITEM (collapsible)
// ==============================================

function RankItem({
    item,
    rank,
    isExpanded,
    isSelected,
    onToggle,
    onSelect,
}) {
    const icon =
        rank === 0 ? (
            <Trophy className="w-4 h-4 text-cyan-400" />
        ) : rank === 1 ? (
            <Award className="w-4 h-4 text-blue-400" />
        ) : rank === 2 ? (
            <Medal className="w-4 h-4 text-purple-400" />
        ) : (
            <span className="text-xs font-bold text-white/40">
                {rank + 1}
            </span>
        );

    return (
        <div
            className={`
                rounded-2xl border backdrop-blur-xl
                transition-all duration-300 overflow-hidden
                ${isSelected
                    ? "border-cyan-400/40 bg-cyan-500/[0.06]"
                    : "border-white/5 bg-white/[0.02] hover:border-white/10"
                }
            `}
        >
            <button
                onClick={onToggle}
                className="w-full flex items-center gap-4 p-4 text-right"
            >
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                    {icon}
                </div>

                <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate">
                        {getGoalTitle(item.id)}
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="w-24 h-1.5 rounded-full bg-white/5 overflow-hidden">
                        <div
                            className="h-full rounded-full bg-cyan-400 transition-all duration-500"
                            style={{ width: `${item.percentage}%` }}
                        />
                    </div>

                    <span className="text-sm text-white/50 w-12 text-left font-mono">
                        {item.percentage}%
                    </span>

                    <ChevronDown
                        className={`
                            w-4 h-4 text-white/40
                            transition-transform duration-300
                            ${isExpanded ? "rotate-180" : ""}
                        `}
                    />
                </div>
            </button>

            <div
                className={`
                    overflow-hidden transition-all duration-300 ease-in-out
                    ${isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
                `}
            >
                <div className="px-4 pb-4 space-y-4">
                    <div className="bg-white/[0.03] rounded-xl p-4 border border-white/5">
                        <p className="text-white/60 text-sm leading-relaxed">
                            {getDynamicExplanation(
                                item.id,
                                item.percentage,
                                rank,
                                0
                            )}
                        </p>
                    </div>

                    <button
                        onClick={onSelect}
                        className={`
                            w-full py-3 rounded-xl text-sm font-bold
                            transition-all duration-300
                            ${isSelected
                                ? "bg-cyan-400 text-black"
                                : "bg-white/[0.04] text-white/70 hover:bg-cyan-400/[0.08] hover:text-cyan-300 border border-white/5"
                            }
                        `}
                    >
                        {isSelected ? "✓ انتخاب شد" : "انتخاب این مسیر"}
                    </button>
                </div>
            </div>
        </div>
    );
}

// ==============================================
// SCROLL HINT
// ==============================================

function ScrollHint({ count }) {
    return (
        <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1, ease: "easeOut" }}
            onClick={() => {
                window.scrollTo({
                    top: window.innerHeight,
                    behavior: "smooth",
                });
            }}
            className="
                group mx-auto mt-6 flex items-center gap-3
                rounded-full border border-cyan-400/30
                bg-cyan-400/[0.08] backdrop-blur-xl
                px-5 py-3
                transition-all duration-300
                hover:border-cyan-400/50 hover:bg-cyan-400/[0.12]
                hover:shadow-[0_0_30px_rgba(34,211,238,.25)]
                active:scale-[0.97]
            "
        >
            <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="flex-shrink-0"
            >
                <ChevronDown className="w-5 h-5 text-cyan-400" />
            </motion.div>

            <span className="text-sm font-bold text-cyan-300">
                {count} مسیر دیگر رو ببین
            </span>

            <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.15,
                }}
                className="flex-shrink-0 -ml-1"
            >
                <ChevronDown className="w-5 h-5 text-cyan-400/40" />
            </motion.div>
        </motion.button>
    );
}

// ==============================================
// RESULT
// ==============================================

export default function Result() {
    const navigate = useNavigate();
    const { result } = useContext(QuizContext);

    const [expandedId, setExpandedId] = useState(null);
    const [selectedGoal, setSelectedGoal] = useState(null);

    const userProfile = useMemo(() => {
        try {
            const raw = localStorage.getItem("quiz_user_profile");
            return raw ? JSON.parse(raw) : null;
        } catch {
            return null;
        }
    }, []);

    const goalMap = {
        frontend: "frontend",
        backend: "backend",
        ai: "ai",
        devops: "devops",
        "فرانت اند": "frontend",
        "بک اند": "backend",
        "هوش مصنوعی": "ai",
        "دواپس": "devops",
    };

    if (!result || result.length === 0) {
        return (
            <section className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
                <h1 className="text-3xl font-black">
                    نتیجه‌ای پیدا نشد.
                </h1>
            </section>
        );
    }

    const bestResult = result[0];
    const bestGoal = goalMap[bestResult.id] || bestResult.id;

    function handleContinue(goal) {
        try {
            localStorage.setItem("pending_roadmap_goal", goal);
            navigate("/register");
        } catch (error) {
            console.error("Failed to save pending goal:", error);
        }
    }

    function handleToggle(id) {
        setExpandedId((prev) => (prev === id ? null : id));
    }

    function handleSelect(goalId) {
        const goal = goalMap[goalId] || goalId;
        setSelectedGoal((prev) => (prev === goal ? null : goal));
    }

    const isCustomSelection = selectedGoal && selectedGoal !== bestGoal;

    return (
        <section dir="rtl" className="relative min-h-screen overflow-hidden px-6">
            <Scene variant="result" />

            <div className="absolute inset-0 bg-cyan-500/5 blur-[220px] pointer-events-none" />

            <div className="relative z-10 mx-auto flex min-h-screen max-w-2xl flex-col justify-center py-12">
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="text-center mb-6"
                >
                    <p className="text-cyan-400/40 text-[10px] tracking-[8px] font-mono">
                        ANALYSIS COMPLETE
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="bg-cyan-500/5 backdrop-blur-2xl rounded-3xl border border-cyan-400/30 p-5 mb-4"
                >
                    <div className="flex items-center gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-cyan-400/15 border border-cyan-400/30 flex items-center justify-center">
                            <Trophy className="w-6 h-6 text-cyan-400" />
                        </div>

                        <div className="relative flex-shrink-0 w-16 h-16">
                            <svg className="absolute inset-0 -rotate-90 w-full h-full">
                                <circle
                                    cx="32"
                                    cy="32"
                                    r="27"
                                    fill="none"
                                    stroke="rgba(255,255,255,.05)"
                                    strokeWidth="3"
                                />
                                <circle
                                    cx="32"
                                    cy="32"
                                    r="27"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeDasharray={`${bestResult.percentage * 1.7} 170`}
                                    className="text-cyan-400"
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-cyan-400 font-bold text-sm font-mono">
                                    {bestResult.percentage}%
                                </span>
                            </div>
                        </div>

                        <div className="min-w-0">
                            <p className="text-cyan-400/50 text-[9px] tracking-[5px] font-mono mb-0.5">
                                BEST MATCH
                            </p>
                            <h2 className="text-2xl font-black text-white truncate">
                                {getGoalTitle(bestResult.id)}
                            </h2>
                        </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-white/5">
                        <p className="text-white/60 text-xs leading-6 mb-3">
                            {getDynamicExplanation(
                                bestResult.id,
                                bestResult.percentage,
                                0,
                                result.length
                            )}
                        </p>

                        {result.length > 1 && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.4,
                                    delay: 0.4,
                                    ease: "easeOut",
                                }}
                                className="mb-3 flex items-start gap-2.5 rounded-xl border border-cyan-400/10 bg-cyan-400/[0.03] p-3"
                            >
                                <BarChart3 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                                <p className="text-cyan-100/70 text-[11px] leading-5">
                                    {getComparisonText(
                                        bestResult,
                                        result[1]
                                    )}
                                </p>
                            </motion.div>
                        )}

                        <button
                            onClick={() => handleContinue(bestGoal)}
                            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-cyan-400 text-black font-bold text-xs hover:bg-cyan-300 transition-all duration-300 group"
                        >
                            ساخت مسیر {getGoalTitle(bestResult.id)}
                            <span className="group-hover:-translate-x-1 transition-transform">
                                ←
                            </span>
                        </button>
                    </div>
                </motion.div>

                <ProfileSummary profile={userProfile} />

                {result.length > 1 && (
                    <ScrollHint count={result.length - 1} />
                )}
            </div>

            {result.length > 1 && (
                <div className="relative z-10 mx-auto max-w-2xl pb-32">
                    <motion.div
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true, amount: 0.1 }}
                        className="space-y-3"
                    >
                        {result.slice(1).map((item, index) => {
                            const rank = index + 1;
                            const isExpanded = expandedId === item.id;
                            const isSelected =
                                selectedGoal ===
                                (goalMap[item.id] || item.id);

                            return (
                                <motion.div
                                    key={item.id}
                                    variants={fadeUp}
                                    transition={{
                                        duration: 0.4,
                                        ease: "easeOut",
                                    }}
                                >
                                    <RankItem
                                        item={item}
                                        rank={rank}
                                        isExpanded={isExpanded}
                                        isSelected={isSelected}
                                        onToggle={() => handleToggle(item.id)}
                                        onSelect={() => handleSelect(item.id)}
                                    />
                                </motion.div>
                            );
                        })}
                    </motion.div>

                    <div className="text-center mt-8">
                        <p className="text-white/20 text-xs">
                            یا برای تغییر پاسخ‌ها به صفحه قبل برگردید
                        </p>
                    </div>
                </div>
            )}

            <AnimatePresence>
                {isCustomSelection && (
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 40 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-6"
                    >
                        <button
                            onClick={() => handleContinue(selectedGoal)}
                            className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-cyan-400 text-black font-black text-sm hover:bg-cyan-300 transition-all duration-300 shadow-[0_0_40px_rgba(34,211,238,.4)] group"
                        >
                            <Sparkles className="w-4 h-4" />
                            ساخت مسیر {getGoalTitle(selectedGoal)}
                            <span className="group-hover:-translate-x-1 transition-transform">
                                ←
                            </span>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}   