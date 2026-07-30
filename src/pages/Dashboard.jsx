import { Link } from "react-router-dom";
import {
    Flame,
    Trophy,
    Rocket,
    Map,
    BookOpen,
    CheckCircle2,
    Lock,
    TrendingUp,
    Sparkles,
    ChevronLeft,
    Target,
    Zap,
    Award,
    PartyPopper,
} from "lucide-react";

import Scene from "../components/ui/Scene";
import { useDashboardData } from "../hooks/useDashboardData";

export default function Dashboard() {
    const {
        allSkills,
        completedSkills,
        inProgressSkills,
        lockedSkills,
        currentSkill,
        nextSkill,
        totalXP,
        roadmapProgress,
        currentStage,
        recentSkills,
        skillProgress,
        achievements,
        unlockedAchievements,
        nextAchievement,
        dailyProgress,
        setDailyProgress,
        streakDays,
        progress,
    } = useDashboardData();

    // ===== حالت خالی: کاربر هنوز روردمپی نداره =====
    if (!allSkills || allSkills.length === 0) {
        return (
            <>
                <Scene variant="result" />
                <section className="relative z-10 min-h-screen flex items-center justify-center px-6">
                    <div className="max-w-md text-center space-y-5">
                        <div className="mx-auto w-16 h-16 rounded-2xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center">
                            <Rocket className="w-8 h-8 text-cyan-400" />
                        </div>
                        <h1 className="text-2xl font-black text-white">
                            هنوز نقشه‌راهی برات ساخته نشده
                        </h1>
                        <p className="text-zinc-500 text-sm leading-7">
                            برای دیدن داشبورد، اول باید کوییز رو پر کنی تا مسیر
                            یادگیری متناسب با علاقه‌ات ساخته بشه.
                        </p>
                        <Link
                            to="/quiz"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-cyan-400 text-black font-bold hover:bg-cyan-300 transition-all"
                        >
                            شروع کوییز
                            <ChevronLeft className="w-4 h-4" />
                        </Link>
                    </div>
                </section>
            </>
        );
    }

    const isAllCompleted = completedSkills.length === allSkills.length;
    const activeSkill = currentSkill || nextSkill;
    const isInProgress = currentSkill !== null;

    return (
        <>
            <Scene variant="result" />

            <section className="relative z-10 max-w-6xl mx-auto px-6 py-16 text-white space-y-8">

                {/* ==================== هدر ==================== */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="space-y-1">
                        <h1 className="text-4xl font-black bg-gradient-to-l from-white to-cyan-400 bg-clip-text text-transparent">
                            به مسیرت خوش اومدی
                        </h1>
                        {currentStage?.title && (
                            <p className="text-zinc-500 text-base">
                                مرحله فعلی: {currentStage.title}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-sm font-medium">
                            {new Date().toLocaleDateString("fa-IR")}
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-orange-400/10 border border-orange-400/20 text-orange-400 text-sm font-bold">
                            <Flame className="w-4 h-4" />
                            {streakDays} روز
                        </span>
                    </div>
                </div>

                {/* ==================== کارت ادامه‌ی یادگیری / تبریک پایان ==================== */}
                {isAllCompleted ? (
                    <div className="p-8 rounded-3xl bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-emerald-400/15 border border-emerald-400/30 flex items-center justify-center flex-shrink-0">
                                    <PartyPopper className="w-7 h-7 text-emerald-400" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-emerald-400">
                                        همه‌ی مهارت‌ها رو کامل کردی!
                                    </h2>
                                    <p className="text-zinc-400 text-sm mt-1">
                                        به پایان مسیر رسیدی، حالا وقت ساختن پروژه‌های واقعیه.
                                    </p>
                                </div>
                            </div>
                            <Link
                                to="/roadmap"
                                className="px-6 py-3 rounded-2xl bg-emerald-400 text-black font-bold hover:bg-emerald-300 transition-all text-center whitespace-nowrap"
                            >
                                مشاهده نقشه راه
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="p-8 rounded-3xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                            <div className="space-y-3 flex-1">
                                <p className="inline-flex items-center gap-1.5 text-zinc-400 text-sm font-medium">
                                    {isInProgress ? (
                                        <>
                                            <TrendingUp className="w-4 h-4 text-cyan-400" />
                                            در حال یادگیری
                                        </>
                                    ) : (
                                        <>
                                            <Rocket className="w-4 h-4 text-cyan-400" />
                                            شروع کن
                                        </>
                                    )}
                                </p>

                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                                        <BookOpen className="w-6 h-6 text-cyan-400" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black">
                                            {activeSkill?.title || "شروع مسیر"}
                                        </h2>
                                        <p className="text-zinc-400 text-sm mt-0.5">
                                            {activeSkill?.description || "اولین مهارت رو انتخاب کن"}
                                        </p>
                                    </div>
                                </div>

                                {isInProgress && (
                                    <div className="space-y-1.5 max-w-xs pt-1">
                                        <div className="flex justify-between text-xs">
                                            <span className="text-zinc-500">پیشرفت</span>
                                            <span className="text-cyan-400 font-mono">
                                                {Math.floor(skillProgress)}%
                                            </span>
                                        </div>
                                        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-l from-cyan-400 to-blue-400 rounded-full transition-all duration-700"
                                                style={{ width: `${skillProgress}%` }}
                                            />
                                        </div>
                                    </div>
                                )}

                                {!isInProgress && activeSkill?.requires?.length > 0 && (
                                    <div className="flex items-center gap-2 text-xs text-zinc-500 flex-wrap pt-1">
                                        <span>پیش‌نیازها:</span>
                                        {activeSkill.requires.map((req) => {
                                            const reqSkill = allSkills.find((s) => s.id === req);
                                            const isCompleted = (progress?.[req] || 0) >= 100;
                                            return (
                                                <span
                                                    key={req}
                                                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full ${
                                                        isCompleted
                                                            ? "bg-emerald-500/15 text-emerald-400"
                                                            : "bg-white/5 text-zinc-400"
                                                    }`}
                                                >
                                                    {isCompleted ? (
                                                        <CheckCircle2 className="w-3 h-3" />
                                                    ) : (
                                                        <BookOpen className="w-3 h-3" />
                                                    )}
                                                    {reqSkill?.title || req}
                                                </span>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                            <Link
                                to={`/skill/${activeSkill?.id || allSkills[0]?.id}`}
                                className="px-6 py-3 rounded-2xl bg-cyan-400 text-black font-bold hover:bg-cyan-300 transition-all active:scale-[0.98] text-center whitespace-nowrap flex-shrink-0"
                            >
                                {isInProgress ? "ادامه یادگیری" : "شروع یادگیری"}
                            </Link>
                        </div>
                    </div>
                )}

                {/* ==================== آمار یکپارچه (یه‌بار، نه سه‌بار) ==================== */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                        <div className="flex items-center justify-between">
                            <span className="text-zinc-500 text-xs">پیشرفت کل</span>
                            <TrendingUp className="w-4 h-4 text-cyan-400" />
                        </div>
                        <p className="text-2xl font-black text-cyan-400 mt-2">
                            {roadmapProgress}%
                        </p>
                        <div className="mt-2 h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-cyan-400 rounded-full transition-all duration-700"
                                style={{ width: `${roadmapProgress}%` }}
                            />
                        </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                        <div className="flex items-center justify-between">
                            <span className="text-zinc-500 text-xs">مهارت‌ها</span>
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        </div>
                        <p className="text-2xl font-black text-emerald-400 mt-2">
                            {completedSkills.length}/{allSkills.length}
                        </p>
                        <p className="text-zinc-600 text-xs mt-1">
                            {inProgressSkills.length} در حال یادگیری · {lockedSkills.length} قفل
                        </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                        <div className="flex items-center justify-between">
                            <span className="text-zinc-500 text-xs">XP کل</span>
                            <Zap className="w-4 h-4 text-yellow-400" />
                        </div>
                        <p className="text-2xl font-black text-yellow-400 mt-2">
                            {totalXP.toLocaleString()}
                        </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                        <div className="flex items-center justify-between">
                            <span className="text-zinc-500 text-xs">دستاوردها</span>
                            <Trophy className="w-4 h-4 text-purple-400" />
                        </div>
                        <p className="text-2xl font-black text-purple-400 mt-2">
                            {unlockedAchievements.length}/{achievements.length}
                        </p>
                    </div>
                </div>

                {/* ==================== ستون‌ها: مهارت‌های اخیر + هدف روزانه/دستاوردها ==================== */}
                <div className="grid md:grid-cols-3 gap-6">

                    {/* مهارت‌های در حال یادگیری */}
                    <div className="md:col-span-2 space-y-4">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-bold">مهارت‌های در حال یادگیری</h2>
                            <Link
                                to="/roadmap"
                                className="inline-flex items-center gap-1 text-cyan-400 text-sm hover:underline"
                            >
                                مشاهده همه
                                <ChevronLeft className="w-3.5 h-3.5" />
                            </Link>
                        </div>

                        {recentSkills.length === 0 ? (
                            <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 text-center">
                                <Rocket className="w-8 h-8 text-zinc-600 mx-auto mb-3" />
                                <p className="text-zinc-400 text-sm">
                                    هنوز هیچ مهارتی رو شروع نکردی
                                </p>
                                <Link
                                    to="/roadmap"
                                    className="inline-block mt-3 text-cyan-400 text-sm hover:underline"
                                >
                                    برو به نقشه راه
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {recentSkills.map((skill) => {
                                    const value = progress?.[skill.id] || 0;
                                    return (
                                        <Link
                                            key={skill.id}
                                            to={`/skill/${skill.id}`}
                                            className="block p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-cyan-400/30 transition-all group"
                                        >
                                            <div className="flex items-center justify-between gap-4">
                                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                                                        <BookOpen className="w-5 h-5 text-cyan-400" />
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <div className="flex items-center gap-2 flex-wrap">
                                                            <h3 className="font-bold group-hover:text-cyan-300 transition-colors">
                                                                {skill.title}
                                                            </h3>
                                                            <span className="text-xs text-zinc-600">
                                                                {skill.time} روز
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-3 mt-2">
                                                            <div className="flex-1 max-w-xs h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                                <div
                                                                    className="h-full bg-gradient-to-l from-cyan-400 to-blue-400 rounded-full transition-all duration-700"
                                                                    style={{ width: `${value}%` }}
                                                                />
                                                            </div>
                                                            <span className="text-cyan-400 text-xs font-mono flex-shrink-0">
                                                                {Math.floor(value)}%
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <ChevronLeft className="w-4 h-4 text-zinc-600 group-hover:text-cyan-400 transition-colors flex-shrink-0" />
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* هدف روزانه + دستاوردها */}
                    <div className="space-y-6">

                        {/* هدف روزانه */}
                        <div className="p-6 rounded-3xl bg-gradient-to-br from-yellow-500/5 to-orange-500/5 border border-yellow-500/20">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="inline-flex items-center gap-1.5 text-zinc-500 text-sm">
                                        <Target className="w-3.5 h-3.5" />
                                        هدف روزانه
                                    </p>
                                    <h3 className="text-xl font-black text-yellow-400 mt-1">
                                        {dailyProgress} دقیقه
                                    </h3>
                                    <p className="text-zinc-600 text-xs">از ۶۰ دقیقه</p>
                                </div>
                                <div className="relative w-16 h-16 flex-shrink-0">
                                    <svg className="w-16 h-16 -rotate-90">
                                        <circle
                                            cx="32"
                                            cy="32"
                                            r="27"
                                            stroke="rgba(255,255,255,0.06)"
                                            strokeWidth="6"
                                            fill="none"
                                        />
                                        <circle
                                            cx="32"
                                            cy="32"
                                            r="27"
                                            stroke="#fbbf24"
                                            strokeWidth="6"
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeDasharray={2 * Math.PI * 27}
                                            strokeDashoffset={
                                                2 * Math.PI * 27 -
                                                (Math.min(100, (dailyProgress / 60) * 100) / 100) *
                                                    (2 * Math.PI * 27)
                                            }
                                            className="transition-all duration-700"
                                        />
                                    </svg>
                                    <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-yellow-400">
                                        {Math.min(100, Math.floor((dailyProgress / 60) * 100))}%
                                    </span>
                                </div>
                            </div>
                            {dailyProgress < 60 && (
                                <button
                                    onClick={() => setDailyProgress((prev) => Math.min(60, prev + 15))}
                                    className="w-full mt-4 py-2 rounded-xl bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-sm font-bold hover:bg-yellow-400/20 transition-colors"
                                >
                                    +۱۵ دقیقه
                                </button>
                            )}
                        </div>

                        {/* دستاوردها */}
                        <div className="p-6 rounded-3xl bg-zinc-900/50 border border-zinc-800">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="inline-flex items-center gap-1.5 text-sm font-bold">
                                    <Award className="w-4 h-4 text-purple-400" />
                                    دستاوردها
                                </h3>
                                <span className="text-xs text-zinc-500">
                                    {unlockedAchievements.length}/{achievements.length}
                                </span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                {achievements.map((ach) => (
                                    <div
                                        key={ach.id}
                                        title={ach.label}
                                        className={`p-3 rounded-xl text-center transition-all ${
                                            ach.unlocked
                                                ? "bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border border-purple-500/20"
                                                : "bg-zinc-800/30 border border-zinc-700 opacity-40"
                                        }`}
                                    >
                                        <span className="text-xl block">{ach.icon}</span>
                                        <p
                                            className={`text-[11px] mt-1 truncate ${
                                                ach.unlocked ? "text-white" : "text-zinc-500"
                                            }`}
                                        >
                                            {ach.label}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            {nextAchievement && (
                                <div className="mt-3 p-3 rounded-xl bg-white/5 border border-white/5">
                                    <p className="text-xs text-zinc-500">دستاورد بعدی:</p>
                                    <p className="text-sm font-bold mt-0.5">
                                        {nextAchievement.icon} {nextAchievement.label}
                                    </p>
                                    <p className="text-xs text-zinc-600 mt-0.5">
                                        {nextAchievement.description}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* ==================== دسترسی سریع (فقط لینک‌های واقعی) ==================== */}
                <div className="grid grid-cols-2 gap-4">
                    <Link
                        to="/roadmap"
                        className="p-6 rounded-3xl bg-zinc-900/50 border border-zinc-800 hover:border-cyan-400/40 transition-all duration-300 hover:scale-[1.02] group"
                    >
                        <div className="flex items-center gap-3">
                            <Map className="w-6 h-6 text-cyan-400" />
                            <h3 className="text-lg font-black">نقشه راه</h3>
                        </div>
                        <p className="text-zinc-500 text-sm mt-2 group-hover:text-zinc-400 transition-colors">
                            مشاهده مسیر یادگیری کامل
                        </p>
                    </Link>

                    <Link
                        to="/skills"
                        className="p-6 rounded-3xl bg-zinc-900/50 border border-zinc-800 hover:border-emerald-400/40 transition-all duration-300 hover:scale-[1.02] group"
                    >
                        <div className="flex items-center gap-3">
                            <Sparkles className="w-6 h-6 text-emerald-400" />
                            <h3 className="text-lg font-black">همه مهارت‌ها</h3>
                        </div>
                        <p className="text-zinc-500 text-sm mt-2 group-hover:text-zinc-400 transition-colors">
                            مرور کامل مهارت‌های موجود
                        </p>
                    </Link>
                </div>
            </section>
        </>
    );
}