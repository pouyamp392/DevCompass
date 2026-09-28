import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    User,
    Mail,
    Map,
    Trophy,
    Target,
    LogOut,
    ChevronRight,
    Pencil,
    X,
    Save,
} from "lucide-react";

import AuthContext from "../context/AuthContext";
import QuizContext from "../context/QuizContext";
import Scene from "../components/ui/Scene";

export default function Profile() {
    const navigate = useNavigate();

    const {
        user,
        logout,
        updateProfile,
    } = useContext(AuthContext);

    const {
        roadmapProgress,
        completedSkillsCount,
        totalSkills,
    } = useContext(QuizContext);

    // roadmapGoal از user گرفته می‌شه (منبع واحد حقیقت)
    const roadmapGoal = user?.roadmap_goal ?? null;

    // ========================================
    // EDIT STATE
    // ========================================

    const [isEditing, setIsEditing] = useState(false);

    const [editUsername, setEditUsername] = useState("");
    const [editEmail, setEditEmail] = useState("");

    const [saving, setSaving] = useState(false);
    const [editError, setEditError] = useState("");
    const [editSuccess, setEditSuccess] = useState("");

    // ========================================
    // NOT LOGGED IN
    // ========================================

    if (!user) {
        return (
            <>
                <Scene variant="result" />

                <main className="relative z-10 flex min-h-screen items-center justify-center px-6 text-white">
                    <div className="text-center">

                        <div className="mb-6 text-6xl">
                            👤
                        </div>

                        <h1 className="text-3xl font-black">
                            وارد حساب کاربری شوید
                        </h1>

                        <p className="mt-3 text-zinc-500">
                            برای مشاهده پروفایل باید وارد حساب خود شوید.
                        </p>

                        <button
                            onClick={() => navigate("/login")}
                            className="mt-8 rounded-2xl bg-cyan-400 px-8 py-4 font-bold text-black transition hover:bg-cyan-300"
                        >
                            ورود به حساب
                        </button>

                    </div>
                </main>
            </>
        );
    }

    // ========================================
    // USER STATS
    // ========================================

    const userLevel = Number(user.level) || 1;
    const userXP = Number(user.xp) || 0;

    // ========================================
    // LOGOUT
    // ========================================

    function handleLogout() {
        logout();
        navigate("/login");
    }

    // ========================================
    // START EDIT
    // ========================================

    function handleStartEdit() {
        setEditUsername(user.username || "");
        setEditEmail(user.email || "");

        setEditError("");
        setEditSuccess("");

        setIsEditing(true);
    }

    // ========================================
    // CANCEL EDIT
    // ========================================

    function handleCancelEdit() {
        setEditUsername(user.username || "");
        setEditEmail(user.email || "");

        setEditError("");
        setEditSuccess("");

        setIsEditing(false);
    }

    // ========================================
    // SAVE PROFILE
    // ========================================

    async function handleSaveProfile() {
        setEditError("");
        setEditSuccess("");

        const username = editUsername.trim();
        const email = editEmail.trim();

        if (!username || !email) {
            setEditError(
                "نام کاربری و ایمیل نمی‌توانند خالی باشند."
            );

            return;
        }

        try {
            setSaving(true);

            await updateProfile(
                username,
                email
            );

            setEditSuccess(
                "پروفایل با موفقیت به‌روزرسانی شد."
            );

            setIsEditing(false);

        } catch (error) {
            setEditError(
                error.message ||
                "ویرایش پروفایل ناموفق بود."
            );
        } finally {
            setSaving(false);
        }
    }

    // ========================================
    // GOAL TITLE
    // ========================================

    const goalTitles = {
        frontend: "Frontend Developer",
        backend: "Backend Developer",
        ai: "AI Developer",
        devops: "DevOps Developer",
        soft: "Soft Skills",
    };

    const goalTitle =
        goalTitles[roadmapGoal] ||
        "No roadmap yet";

    // ========================================
    // USER INITIALS
    // ========================================

    const initials =
        String(user.username || "U")
            .slice(0, 2)
            .toUpperCase();

    // ========================================
    // RENDER
    // ========================================

    return (
        <>
            <Scene variant="result" />

            <main className="relative z-10 mx-auto min-h-screen max-w-4xl px-6 py-12 text-white">

                {/* ========================================
                    HEADER
                ======================================== */}

                <header className="mb-10">

                    <p className="text-[10px] font-mono uppercase tracking-[10px] text-cyan-400/60">
                        Profile
                    </p>

                    <h1 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
                        Your Profile
                    </h1>

                    <p className="mt-3 text-sm text-zinc-500">
                        اطلاعات حساب و پیشرفت شما در DevCompass
                    </p>

                </header>


                {/* ========================================
                    USER CARD
                ======================================== */}

                <section className="mb-6 rounded-[32px] border border-white/[0.06] bg-white/[0.025] p-6 backdrop-blur-2xl md:p-8">

                    <div className="flex flex-col gap-6 sm:flex-row sm:items-center">

                        {/* Avatar */}

                        <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-[28px] border border-cyan-400/30 bg-cyan-400/[0.08] text-2xl font-black text-cyan-400 shadow-[0_0_40px_rgba(34,211,238,.08)]">
                            {initials}
                        </div>


                        {/* User info */}

                        <div className="flex-1">

                            <p className="text-xs font-mono uppercase tracking-[5px] text-cyan-400/50">
                                Developer
                            </p>

                            <h2 className="mt-2 text-3xl font-black">
                                {user.username}
                            </h2>

                            <div className="mt-3 flex items-center gap-2 text-sm text-zinc-500">
                                <Mail className="h-4 w-4" />
                                {user.email}
                            </div>

                        </div>


                        {/* Edit button */}

                        {!isEditing && (
                            <button
                                onClick={handleStartEdit}
                                className="flex items-center justify-center gap-2 rounded-2xl border border-white/[0.06] bg-white/[0.03] px-5 py-3 text-sm font-bold text-zinc-300 transition hover:border-cyan-400/30 hover:bg-cyan-400/[0.05] hover:text-cyan-400"
                            >
                                <Pencil className="h-4 w-4" />

                                ویرایش
                            </button>
                        )}

                    </div>


                    {/* ========================================
                        EDIT FORM
                    ======================================== */}

                    {isEditing && (
                        <div className="mt-8 border-t border-white/[0.06] pt-8">

                            <div className="space-y-5">

                                {/* Username */}

                                <div>

                                    <label className="mb-2 block text-xs font-medium text-zinc-500">
                                        Username
                                    </label>

                                    <div className="relative">

                                        <User className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" />

                                        <input
                                            type="text"
                                            value={editUsername}
                                            onChange={(event) =>
                                                setEditUsername(
                                                    event.target.value
                                                )
                                            }
                                            disabled={saving}
                                            className="w-full rounded-2xl border border-white/[0.06] bg-white/[0.03] py-3 pl-4 pr-11 text-sm text-white outline-none transition placeholder:text-zinc-700 focus:border-cyan-400/40 focus:bg-white/[0.04] disabled:opacity-50"
                                            placeholder="Username"
                                        />

                                    </div>

                                </div>


                                {/* Email */}

                                <div>

                                    <label className="mb-2 block text-xs font-medium text-zinc-500">
                                        Email
                                    </label>

                                    <div className="relative">

                                        <Mail className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" />

                                        <input
                                            type="email"
                                            value={editEmail}
                                            onChange={(event) =>
                                                setEditEmail(
                                                    event.target.value
                                                )
                                            }
                                            disabled={saving}
                                            className="w-full rounded-2xl border border-white/[0.06] bg-white/[0.03] py-3 pl-4 pr-11 text-sm text-white outline-none transition placeholder:text-zinc-700 focus:border-cyan-400/40 focus:bg-white/[0.04] disabled:opacity-50"
                                            placeholder="Email"
                                        />

                                    </div>

                                </div>

                            </div>


                            {/* Error */}

                            {editError && (
                                <div className="mt-5 rounded-2xl border border-red-400/10 bg-red-400/[0.04] px-4 py-3">
                                    <p className="text-sm text-red-400">
                                        {editError}
                                    </p>
                                </div>
                            )}


                            {/* Success */}

                            {editSuccess && (
                                <div className="mt-5 rounded-2xl border border-emerald-400/10 bg-emerald-400/[0.04] px-4 py-3">
                                    <p className="text-sm text-emerald-400">
                                        {editSuccess}
                                    </p>
                                </div>
                            )}


                            {/* Buttons */}

                            <div className="mt-6 flex flex-col gap-3 sm:flex-row">

                                <button
                                    onClick={handleSaveProfile}
                                    disabled={saving}
                                    className="flex items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-6 py-3 text-sm font-bold text-black transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <Save className="h-4 w-4" />

                                    {saving
                                        ? "در حال ذخیره..."
                                        : "ذخیره تغییرات"}
                                </button>


                                <button
                                    onClick={handleCancelEdit}
                                    disabled={saving}
                                    className="flex items-center justify-center gap-2 rounded-2xl border border-white/[0.06] bg-white/[0.03] px-6 py-3 text-sm font-bold text-zinc-400 transition hover:border-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <X className="h-4 w-4" />

                                    انصراف
                                </button>

                            </div>

                        </div>
                    )}

                </section>


                {/* ========================================
                    STATS
                ======================================== */}

                <section className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">

                    <StatCard
                        icon={
                            <Trophy className="h-5 w-5" />
                        }
                        label="Level"
                        value={userLevel}
                    />

                    <StatCard
                        icon={
                            <Target className="h-5 w-5" />
                        }
                        label="Completed"
                        value={completedSkillsCount || 0}
                    />

                    <StatCard
                        icon={
                            <Map className="h-5 w-5" />
                        }
                        label="Skills"
                        value={totalSkills || 0}
                    />


                    <StatCard
                        icon={
                            <Trophy className="h-5 w-5" />
                        }
                        label="XP"
                        value={userXP.toLocaleString()}
                    />

                </section>


                {/* ========================================
                    ROADMAP
                ======================================== */}

                <section className="mb-6 rounded-[32px] border border-white/[0.06] bg-white/[0.025] p-6 backdrop-blur-2xl md:p-8">

                    <div className="flex items-center justify-between gap-4">

                        <div>

                            <p className="text-[10px] font-mono uppercase tracking-[5px] text-cyan-400/50">
                                Current Roadmap
                            </p>

                            <h2 className="mt-2 text-2xl font-black">
                                {goalTitle}
                            </h2>

                        </div>

                        {roadmapGoal && (
                            <button
                                onClick={() =>
                                    navigate("/roadmap")
                                }
                                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.03] text-zinc-400 transition hover:border-cyan-400/30 hover:text-cyan-400"
                            >
                                <ChevronRight className="h-5 w-5" />
                            </button>
                        )}

                    </div>


                    {roadmapGoal ? (
                        <div className="mt-7">

                            <div className="mb-3 flex items-center justify-between">

                                <span className="text-xs text-zinc-500">
                                    Roadmap progress
                                </span>

                                <span className="text-sm font-mono font-bold text-cyan-400">
                                    {roadmapProgress || 0}%
                                </span>

                            </div>


                            <div className="h-2 overflow-hidden rounded-full bg-white/[0.04]">

                                <div
                                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 transition-all duration-700"
                                    style={{
                                        width: `${roadmapProgress || 0}%`,
                                    }}
                                />

                            </div>


                            <div className="mt-4 flex justify-between text-xs text-zinc-600">

                                <span>
                                    {completedSkillsCount || 0}{" "}
                                    completed
                                </span>

                                <span>
                                    {totalSkills || 0} total skills
                                </span>

                            </div>

                        </div>
                    ) : (
                        <div className="mt-7 rounded-2xl border border-white/[0.05] bg-white/[0.02] p-5">

                            <p className="text-sm text-zinc-500">
                                هنوز نقشه راهی برای شما ساخته نشده است.
                            </p>

                            <button
                                onClick={() =>
                                    navigate("/result")
                                }
                                className="mt-4 text-sm font-bold text-cyan-400 transition hover:text-cyan-300"
                            >
                                ساخت نقشه راه

                                <span className="mr-2">
                                    →
                                </span>
                            </button>

                        </div>
                    )}

                </section>


                {/* ========================================
                    ACCOUNT INFORMATION
                ======================================== */}

                <section className="mb-6 rounded-[32px] border border-white/[0.06] bg-white/[0.025] p-6 backdrop-blur-2xl md:p-8">

                    <p className="text-[10px] font-mono uppercase tracking-[5px] text-cyan-400/50">
                        Account
                    </p>

                    <div className="mt-6 space-y-3">

                        <InfoRow
                            icon={
                                <User className="h-4 w-4" />
                            }
                            label="Username"
                            value={user.username}
                        />

                        <InfoRow
                            icon={
                                <Mail className="h-4 w-4" />
                            }
                            label="Email"
                            value={user.email}
                        />

                        <InfoRow
                            icon={
                                <Map className="h-4 w-4" />
                            }
                            label="User ID"
                            value={user.id}
                        />

                    </div>

                </section>


                {/* ========================================
                    LOGOUT
                ======================================== */}

                <button
                    onClick={handleLogout}
                    className="flex w-full items-center justify-center gap-3 rounded-2xl border border-red-400/10 bg-red-400/[0.04] px-6 py-4 text-sm font-bold text-red-400 transition hover:border-red-400/20 hover:bg-red-400/[0.08]"
                >
                    <LogOut className="h-4 w-4" />

                    خروج از حساب
                </button>

            </main>
        </>
    );
}


// ======================================================
// STAT CARD
// ======================================================

function StatCard({
    icon,
    label,
    value,
}) {
    return (
        <div className="rounded-3xl border border-white/[0.06] bg-white/[0.025] p-5 backdrop-blur-xl">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-400/[0.06] text-cyan-400">
                {icon}
            </div>

            <p className="mt-5 text-[10px] font-mono uppercase tracking-[3px] text-zinc-600">
                {label}
            </p>

            <p className="mt-1 text-2xl font-black text-white">
                {value}
            </p>

        </div>
    );
}


// ======================================================
// INFO ROW
// ======================================================

function InfoRow({
    icon,
    label,
    value,
}) {
    return (
        <div className="flex items-center gap-4 rounded-2xl border border-white/[0.04] bg-white/[0.015] px-4 py-4">

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.04] text-zinc-500">
                {icon}
            </div>

            <div className="flex-1">

                <p className="text-[10px] font-mono uppercase tracking-[2px] text-zinc-600">
                    {label}
                </p>

                <p className="mt-1 text-sm text-zinc-300">
                    {value}
                </p>

            </div>

        </div>
    );
}