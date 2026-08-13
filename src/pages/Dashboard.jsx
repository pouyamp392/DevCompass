import { Link } from "react-router-dom";
import {
    Award,
    BookOpen,
    CheckCircle2,
    ChevronLeft,
    Circle,
    Flame,
    Gauge,
    Lock,
    Map,
    PartyPopper,
    Play,
    Rocket,
    Sparkles,
    Target,
    Trophy,
    Zap,
} from "lucide-react";

import Scene from "../components/ui/Scene";
import { useDashboardData } from "../hooks/useDashboardData";

const DAILY_GOAL_MINUTES = 60;

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function ProgressBar({
    value = 0,
    className = "",
    barClassName = "bg-gradient-to-l from-cyan-400 to-blue-500",
}) {
    const safeValue = clamp(Number(value) || 0, 0, 100);

    return (
        <div className={`h-2 overflow-hidden rounded-full bg-white/5 ${className}`}>
            <div
                className={`h-full rounded-full transition-all duration-700 ${barClassName}`}
                style={{ width: `${safeValue}%` }}
            />
        </div>
    );
}

function StatCard({ label, value, helper, icon: Icon, iconClassName }) {
    return (
        <article className="rounded-2xl border border-white/5 bg-zinc-950/45 p-5 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-medium text-zinc-500">{label}</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/[0.04]">
                    <Icon className={`h-4 w-4 ${iconClassName}`} />
                </span>
            </div>

            <p className="mt-3 text-2xl font-black text-white">{value}</p>

            {helper && (
                <p className="mt-1 text-xs leading-5 text-zinc-600">{helper}</p>
            )}
        </article>
    );
}

function EmptyDashboard() {
    return (
        <>
            <Scene variant="result" />

            <main className="relative z-10 flex min-h-screen items-center justify-center px-6 py-20 text-white">
                <section className="w-full max-w-lg rounded-[2rem] border border-cyan-400/15 bg-zinc-950/60 p-8 text-center backdrop-blur-2xl">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10">
                        <Rocket className="h-8 w-8 text-cyan-400" />
                    </div>

                    <h1 className="mt-5 text-2xl font-black">
                        هنوز مسیر یادگیریت ساخته نشده
                    </h1>

                    <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-zinc-500">
                        اول کوییز رو تکمیل کن تا DevCompass بر اساس هدف و سطح فعلیت،
                        یک نقشه راه شخصی برات بسازه.
                    </p>

                    <Link
                        to="/quiz"
                        className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-cyan-400 px-7 py-3.5 font-bold text-black transition hover:bg-cyan-300 active:scale-[0.98]"
                    >
                        شروع کوییز
                        <ChevronLeft className="h-4 w-4" />
                    </Link>
                </section>
            </main>
        </>
    );
}

export default function Dashboard() {
    const {
        allSkills = [],
        completedSkills = [],
        inProgressSkills = [],
        lockedSkills = [],
        currentSkill = null,
        nextSkill = null,
        totalXP = 0,
        roadmapProgress = 0,
        currentStage = null,
        recentSkills = [],
        skillProgress = 0,
        achievements = [],
        unlockedAchievements = [],
        nextAchievement = null,
        dailyProgress = 0,
        setDailyProgress,
        streakDays = 0,
        progress = {},
    } = useDashboardData();

    if (!allSkills.length) {
        return <EmptyDashboard />;
    }

    const isAllCompleted = completedSkills.length === allSkills.length;
    const activeSkill = currentSkill || nextSkill || allSkills[0] || null;
    const isInProgress = Boolean(currentSkill);

    const activeSkillProgress = isInProgress
        ? clamp(Number(skillProgress) || 0, 0, 100)
        : clamp(Number(progress?.[activeSkill?.id]) || 0, 0, 100);

    const dailyGoalProgress = clamp(
        (Number(dailyProgress) / DAILY_GOAL_MINUTES) * 100,
        0,
        100
    );

    const pathPreview = allSkills
        .filter((skill) => {
            const value = Number(progress?.[skill.id]) || 0;

            return (
                value > 0 ||
                skill.id === activeSkill?.id ||
                skill.requires?.includes(activeSkill?.id) ||
                activeSkill?.requires?.includes(skill.id)
            );
        })
        .slice(0, 6);

    const dailyMissions = [
        {
            id: "study",
            label: "حداقل ۳۰ دقیقه مطالعه",
            completed: Number(dailyProgress) >= 30,
        },
        {
            id: "skill",
            label: isInProgress
                ? `ادامه‌ی ${activeSkill?.title || "مهارت فعلی"}`
                : `شروع ${activeSkill?.title || "مهارت بعدی"}`,
            completed: isInProgress && activeSkillProgress >= 50,
        },
        {
            id: "progress",
            label: "ثبت یک پیشرفت جدید",
            completed: recentSkills.some(
                (skill) => (Number(progress?.[skill.id]) || 0) > 0
            ),
        },
    ];

    const completedMissionCount = dailyMissions.filter(
        (mission) => mission.completed
    ).length;

    return (
        <>
            <Scene variant="result" />

            <main
                dir="rtl"
                className="relative z-10 mx-auto max-w-7xl space-y-6 px-4 pb-32 pt-10 text-white sm:px-6 lg:px-8"
            >
                {/* Header */}
                <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <p className="mb-2 text-sm font-medium text-cyan-400">
                            مرکز کنترل یادگیری
                        </p>

                        <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
                            به مسیرت خوش اومدی
                        </h1>

                        <p className="mt-2 text-sm leading-6 text-zinc-500">
                            {currentStage?.title
                                ? `الان در مرحله «${currentStage.title}» هستی.`
                                : "مرحله بعدی مسیرت آماده است."}
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-sm">
                        <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-zinc-400">
                            {new Date().toLocaleDateString("fa-IR")}
                        </span>

                        <span className="inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-400/10 px-4 py-2 font-bold text-orange-400">
                            <Flame className="h-4 w-4" />
                            {streakDays} روز متوالی
                        </span>
                    </div>
                </header>

                {/* Primary dashboard grid */}
                <section className="grid gap-6 xl:grid-cols-[minmax(0,1.65fr)_minmax(320px,0.85fr)]">
                    {/* Main action area */}
                    <div className="space-y-6">
                        {/* Continue learning */}
                        {isAllCompleted ? (
                            <article className="overflow-hidden rounded-[2rem] border border-emerald-400/20 bg-gradient-to-br from-emerald-500/10 via-zinc-950/70 to-cyan-500/10 p-7 sm:p-8">
                                <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-emerald-400/25 bg-emerald-400/10">
                                            <PartyPopper className="h-7 w-7 text-emerald-400" />
                                        </div>

                                        <div>
                                            <p className="text-sm font-bold text-emerald-400">
                                                مسیر تکمیل شد
                                            </p>
                                            <h2 className="mt-1 text-2xl font-black">
                                                همه‌ی مهارت‌ها رو کامل کردی
                                            </h2>
                                            <p className="mt-2 max-w-xl text-sm leading-7 text-zinc-400">
                                                حالا بهترین قدم، ساخت پروژه‌های واقعی و تثبیت
                                                چیزهاییه که یاد گرفتی.
                                            </p>
                                        </div>
                                    </div>

                                    <Link
                                        to="/roadmap"
                                        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-emerald-400 px-6 py-3 font-bold text-black transition hover:bg-emerald-300"
                                    >
                                        مشاهده مسیر
                                        <ChevronLeft className="h-4 w-4" />
                                    </Link>
                                </div>
                            </article>
                        ) : (
                            <article className="relative overflow-hidden rounded-[2rem] border border-cyan-400/20 bg-gradient-to-br from-cyan-500/12 via-zinc-950/75 to-blue-500/10 p-7 sm:p-8">
                                <div className="pointer-events-none absolute -left-20 -top-24 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />
                                <div className="pointer-events-none absolute -bottom-24 -right-16 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />

                                <div className="relative">
                                    <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                                        <div className="max-w-2xl">
                                            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/15 bg-cyan-400/8 px-3 py-1.5 text-xs font-bold text-cyan-300">
                                                <Play className="h-3.5 w-3.5" />
                                                {isInProgress
                                                    ? "ادامه‌ی یادگیری"
                                                    : "پیشنهاد بعدی"}
                                            </div>

                                            <div className="mt-5 flex items-start gap-4">
                                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-2xl">
                                                    {activeSkill?.icon || (
                                                        <BookOpen className="h-7 w-7 text-cyan-400" />
                                                    )}
                                                </div>

                                                <div>
                                                    <h2 className="text-2xl font-black sm:text-3xl">
                                                        {activeSkill?.title || "شروع مسیر"}
                                                    </h2>

                                                    <p className="mt-2 max-w-xl text-sm leading-7 text-zinc-400">
                                                        {activeSkill?.description ||
                                                            "اولین مهارت مسیرت رو شروع کن."}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="mt-6 max-w-xl">
                                                <div className="mb-2 flex items-center justify-between text-xs">
                                                    <span className="text-zinc-500">
                                                        پیشرفت این مهارت
                                                    </span>
                                                    <span className="font-mono font-bold text-cyan-400">
                                                        {Math.floor(activeSkillProgress)}%
                                                    </span>
                                                </div>

                                                <ProgressBar value={activeSkillProgress} />
                                            </div>

                                            {!isInProgress &&
                                                activeSkill?.requires?.length > 0 && (
                                                    <div className="mt-5 flex flex-wrap items-center gap-2 text-xs">
                                                        <span className="text-zinc-600">
                                                            پیش‌نیازها:
                                                        </span>

                                                        {activeSkill.requires.map((requiredId) => {
                                                            const requiredSkill = allSkills.find(
                                                                (skill) =>
                                                                    skill.id === requiredId
                                                            );
                                                            const completed =
                                                                (Number(
                                                                    progress?.[requiredId]
                                                                ) || 0) >= 100;

                                                            return (
                                                                <span
                                                                    key={requiredId}
                                                                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 ${
                                                                        completed
                                                                            ? "bg-emerald-400/10 text-emerald-400"
                                                                            : "bg-white/5 text-zinc-500"
                                                                    }`}
                                                                >
                                                                    {completed ? (
                                                                        <CheckCircle2 className="h-3 w-3" />
                                                                    ) : (
                                                                        <Lock className="h-3 w-3" />
                                                                    )}
                                                                    {requiredSkill?.title ||
                                                                        requiredId}
                                                                </span>
                                                            );
                                                        })}
                                                    </div>
                                                )}
                                        </div>

                                        <Link
                                            to={`/skill/${
                                                activeSkill?.id || allSkills[0]?.id
                                            }`}
                                            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-7 py-3.5 font-black text-black shadow-lg shadow-cyan-400/10 transition hover:bg-cyan-300 active:scale-[0.98]"
                                        >
                                            {isInProgress
                                                ? "ادامه یادگیری"
                                                : "شروع یادگیری"}
                                            <ChevronLeft className="h-4 w-4" />
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        )}

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                            <StatCard
                                label="پیشرفت مسیر"
                                value={`${roadmapProgress}%`}
                                helper={`${completedSkills.length} مهارت کامل شده`}
                                icon={Gauge}
                                iconClassName="text-cyan-400"
                            />

                            <StatCard
                                label="XP کسب‌شده"
                                value={totalXP.toLocaleString()}
                                helper="از مهارت‌های تکمیل‌شده"
                                icon={Zap}
                                iconClassName="text-yellow-400"
                            />

                            <StatCard
                                label="در حال یادگیری"
                                value={inProgressSkills.length}
                                helper={`${lockedSkills.length} مهارت هنوز قفل است`}
                                icon={BookOpen}
                                iconClassName="text-emerald-400"
                            />

                            <StatCard
                                label="دستاوردها"
                                value={`${unlockedAchievements.length}/${achievements.length}`}
                                helper="مدال‌های بازشده"
                                icon={Trophy}
                                iconClassName="text-purple-400"
                            />
                        </div>

                        {/* Learning path preview */}
                        <article className="rounded-[2rem] border border-white/5 bg-zinc-950/45 p-6 backdrop-blur-xl">
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-xs font-bold text-cyan-400">
                                        نمای مسیر
                                    </p>
                                    <h2 className="mt-1 text-xl font-black">
                                        جایگاه فعلی تو در نقشه راه
                                    </h2>
                                </div>

                                <Link
                                    to="/roadmap"
                                    className="inline-flex items-center gap-1 text-sm font-bold text-cyan-400 hover:text-cyan-300"
                                >
                                    مشاهده نقشه کامل
                                    <ChevronLeft className="h-4 w-4" />
                                </Link>
                            </div>

                            <div className="mt-6 overflow-x-auto pb-2">
                                <div className="flex min-w-max items-center gap-2">
                                    {pathPreview.length > 0 ? (
                                        pathPreview.map((skill, index) => {
                                            const value =
                                                Number(progress?.[skill.id]) || 0;
                                            const completed = value >= 100;
                                            const active = skill.id === activeSkill?.id;
                                            const locked =
                                                !completed && !active && value === 0;

                                            return (
                                                <div
                                                    key={skill.id}
                                                    className="flex items-center gap-2"
                                                >
                                                    <Link
                                                        to={
                                                            locked
                                                                ? "/roadmap"
                                                                : `/skill/${skill.id}`
                                                        }
                                                        className={`group flex w-36 flex-col rounded-2xl border p-4 transition ${
                                                            completed
                                                                ? "border-emerald-400/20 bg-emerald-400/[0.06]"
                                                                : active
                                                                ? "border-cyan-400/30 bg-cyan-400/[0.08]"
                                                                : "border-white/5 bg-white/[0.02]"
                                                        }`}
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-xl">
                                                                {skill.icon || "📘"}
                                                            </span>

                                                            {completed ? (
                                                                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                                                            ) : active ? (
                                                                <Play className="h-4 w-4 text-cyan-400" />
                                                            ) : (
                                                                <Lock className="h-4 w-4 text-zinc-700" />
                                                            )}
                                                        </div>

                                                        <p
                                                            className={`mt-3 truncate text-sm font-bold ${
                                                                active
                                                                    ? "text-white"
                                                                    : "text-zinc-400"
                                                            }`}
                                                        >
                                                            {skill.title}
                                                        </p>

                                                        <p className="mt-1 text-[11px] text-zinc-600">
                                                            {completed
                                                                ? "تکمیل شده"
                                                                : active
                                                                ? `${Math.floor(value)}٪ پیشرفت`
                                                                : "مرحله بعد"}
                                                        </p>
                                                    </Link>

                                                    {index < pathPreview.length - 1 && (
                                                        <ChevronLeft className="h-4 w-4 text-zinc-800" />
                                                    )}
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <p className="text-sm text-zinc-600">
                                            هنوز بخشی از مسیر شروع نشده.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </article>

                        {/* Active/recent skills */}
                        <article className="rounded-[2rem] border border-white/5 bg-zinc-950/45 p-6 backdrop-blur-xl">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-xs font-bold text-cyan-400">
                                        فعالیت جاری
                                    </p>
                                    <h2 className="mt-1 text-xl font-black">
                                        مهارت‌های فعال
                                    </h2>
                                </div>

                                <Link
                                    to="/skills"
                                    className="inline-flex items-center gap-1 text-sm font-bold text-zinc-500 transition hover:text-white"
                                >
                                    همه مهارت‌ها
                                    <ChevronLeft className="h-4 w-4" />
                                </Link>
                            </div>

                            <div className="mt-5 space-y-3">
                                {recentSkills.length > 0 ? (
                                    recentSkills.slice(0, 4).map((skill) => {
                                        const value =
                                            Number(progress?.[skill.id]) || 0;

                                        return (
                                            <Link
                                                key={skill.id}
                                                to={`/skill/${skill.id}`}
                                                className="group flex items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-4 transition hover:border-cyan-400/20 hover:bg-cyan-400/[0.03]"
                                            >
                                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] text-xl">
                                                    {skill.icon || "📘"}
                                                </div>

                                                <div className="min-w-0 flex-1">
                                                    <div className="flex items-center justify-between gap-3">
                                                        <div className="min-w-0">
                                                            <p className="truncate text-sm font-bold text-white">
                                                                {skill.title}
                                                            </p>
                                                            <p className="mt-0.5 text-xs text-zinc-600">
                                                                {skill.time
                                                                    ? `${skill.time} روز`
                                                                    : "مهارت فعال"}
                                                            </p>
                                                        </div>

                                                        <span className="shrink-0 font-mono text-xs font-bold text-cyan-400">
                                                            {Math.floor(value)}%
                                                        </span>
                                                    </div>

                                                    <ProgressBar
                                                        value={value}
                                                        className="mt-3 h-1.5"
                                                    />
                                                </div>

                                                <ChevronLeft className="h-4 w-4 shrink-0 text-zinc-700 transition group-hover:text-cyan-400" />
                                            </Link>
                                        );
                                    })
                                ) : (
                                    <div className="rounded-2xl border border-dashed border-white/10 p-8 text-center">
                                        <Rocket className="mx-auto h-8 w-8 text-zinc-700" />
                                        <p className="mt-3 text-sm text-zinc-500">
                                            هنوز هیچ مهارتی رو شروع نکردی.
                                        </p>
                                        <Link
                                            to="/roadmap"
                                            className="mt-3 inline-block text-sm font-bold text-cyan-400 hover:text-cyan-300"
                                        >
                                            شروع مسیر
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </article>
                    </div>

                    {/* Sidebar */}
                    <aside className="space-y-6">
                        {/* Daily mission */}
                        <article className="rounded-[2rem] border border-yellow-400/15 bg-gradient-to-br from-yellow-500/[0.07] to-orange-500/[0.03] p-6">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <p className="inline-flex items-center gap-2 text-xs font-bold text-yellow-400">
                                        <Target className="h-4 w-4" />
                                        مأموریت امروز
                                    </p>

                                    <h2 className="mt-2 text-xl font-black">
                                        {completedMissionCount} از{" "}
                                        {dailyMissions.length} انجام شده
                                    </h2>
                                </div>

                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-yellow-400/15 bg-yellow-400/10 text-sm font-black text-yellow-400">
                                    {Math.floor(
                                        (completedMissionCount /
                                            dailyMissions.length) *
                                            100
                                    )}
                                    %
                                </div>
                            </div>

                            <div className="mt-6 space-y-3">
                                {dailyMissions.map((mission) => (
                                    <div
                                        key={mission.id}
                                        className="flex items-center gap-3 rounded-xl border border-white/5 bg-black/10 px-3 py-3"
                                    >
                                        {mission.completed ? (
                                            <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
                                        ) : (
                                            <Circle className="h-5 w-5 shrink-0 text-zinc-700" />
                                        )}

                                        <span
                                            className={`text-sm ${
                                                mission.completed
                                                    ? "text-zinc-400 line-through"
                                                    : "text-zinc-300"
                                            }`}
                                        >
                                            {mission.label}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-5">
                                <div className="mb-2 flex items-center justify-between text-xs">
                                    <span className="text-zinc-600">
                                        زمان مطالعه امروز
                                    </span>
                                    <span className="font-mono font-bold text-yellow-400">
                                        {dailyProgress}/{DAILY_GOAL_MINUTES} دقیقه
                                    </span>
                                </div>

                                <ProgressBar
                                    value={dailyGoalProgress}
                                    barClassName="bg-gradient-to-l from-yellow-400 to-orange-500"
                                />
                            </div>

                            {dailyProgress < DAILY_GOAL_MINUTES &&
                                typeof setDailyProgress === "function" && (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setDailyProgress((previous) =>
                                                Math.min(
                                                    DAILY_GOAL_MINUTES,
                                                    Number(previous || 0) + 15
                                                )
                                            )
                                        }
                                        className="mt-4 w-full rounded-xl border border-yellow-400/20 bg-yellow-400/10 py-2.5 text-sm font-bold text-yellow-400 transition hover:bg-yellow-400/15"
                                    >
                                        ثبت ۱۵ دقیقه مطالعه
                                    </button>
                                )}
                        </article>

                        {/* Achievement */}
                        <article className="rounded-[2rem] border border-white/5 bg-zinc-950/45 p-6 backdrop-blur-xl">
                            <div className="flex items-center justify-between gap-3">
                                <div>
                                    <p className="text-xs font-bold text-purple-400">
                                        دستاوردها
                                    </p>
                                    <h2 className="mt-1 text-lg font-black">
                                        پیشرفت گیمیفیکیشن
                                    </h2>
                                </div>

                                <Award className="h-5 w-5 text-purple-400" />
                            </div>

                            <div className="mt-5 grid grid-cols-3 gap-2">
                                {achievements.slice(0, 6).map((achievement) => (
                                    <div
                                        key={achievement.id}
                                        title={achievement.label}
                                        className={`rounded-xl border p-3 text-center ${
                                            achievement.unlocked
                                                ? "border-purple-400/20 bg-purple-400/[0.06]"
                                                : "border-white/5 bg-white/[0.02] opacity-35"
                                        }`}
                                    >
                                        <span className="block text-xl">
                                            {achievement.icon}
                                        </span>
                                        <span className="mt-1 block truncate text-[10px] text-zinc-400">
                                            {achievement.label}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {nextAchievement && (
                                <div className="mt-4 rounded-2xl border border-white/5 bg-white/[0.02] p-4">
                                    <p className="text-[11px] text-zinc-600">
                                        دستاورد بعدی
                                    </p>
                                    <p className="mt-1 text-sm font-bold">
                                        {nextAchievement.icon}{" "}
                                        {nextAchievement.label}
                                    </p>
                                    <p className="mt-1 text-xs leading-5 text-zinc-600">
                                        {nextAchievement.description}
                                    </p>
                                </div>
                            )}
                        </article>

                        {/* Quick access */}
                        <article className="rounded-[2rem] border border-white/5 bg-zinc-950/45 p-6 backdrop-blur-xl">
                            <p className="text-xs font-bold text-emerald-400">
                                دسترسی سریع
                            </p>

                            <div className="mt-4 space-y-2">
                                <Link
                                    to="/roadmap"
                                    className="group flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3 transition hover:border-cyan-400/20"
                                >
                                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-400/10">
                                        <Map className="h-4 w-4 text-cyan-400" />
                                    </span>
                                    <span className="flex-1 text-sm font-bold">
                                        نقشه راه
                                    </span>
                                    <ChevronLeft className="h-4 w-4 text-zinc-700 transition group-hover:text-cyan-400" />
                                </Link>

                                <Link
                                    to="/skills"
                                    className="group flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3 transition hover:border-emerald-400/20"
                                >
                                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-400/10">
                                        <Sparkles className="h-4 w-4 text-emerald-400" />
                                    </span>
                                    <span className="flex-1 text-sm font-bold">
                                        کتابخانه مهارت‌ها
                                    </span>
                                    <ChevronLeft className="h-4 w-4 text-zinc-700 transition group-hover:text-emerald-400" />
                                </Link>
                            </div>
                        </article>
                    </aside>
                </section>
            </main>
        </>
    );
}
