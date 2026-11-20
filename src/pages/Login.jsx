import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, Mail, Lock, ArrowLeft } from "lucide-react";

import { API_BASE_URL } from "../config";

import AuthContext from "../context/AuthContext";
import Scene from "../components/ui/Scene";

export default function Login() {
    const navigate = useNavigate();
    const { login, updateUser } = useContext(AuthContext);

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    function handleChange(event) {
        const { name, value } = event.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setError("");
        setLoading(true);

        try {
            const loggedUser = await login(form.email, form.password);

            // اگه کاربر قبل از login، quiz داده و هدف انتخاب کرده،
            // حالا roadmap_goal رو ذخیره کن
            const pendingGoal = localStorage.getItem("pending_roadmap_goal");

            if (pendingGoal && loggedUser?.id) {
                try {
                    const response = await fetch(
                        `${API_BASE_URL}/api/roadmap.php`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                user_id: Number(loggedUser.id),
                                roadmap_goal: pendingGoal,
                            }),
                        }
                    );

                    const data = await response.json();

                    if (response.ok && data.success) {
                        // مهم: user state رو با roadmap_goal آپدیت کن
                        // تا QuizContext بفهمه و roadmap رو بسازه
                        updateUser({ roadmap_goal: pendingGoal });
                    }
                } catch (roadmapError) {
                    // اگه ذخیره‌ی roadmap خطا داد، ولی login موفق بوده،
                    // کاربر رو متوقف نکن — بذار بره dashboard
                    console.error("Failed to save pending roadmap:", roadmapError);
                }

                // پاک کردن pending
                localStorage.removeItem("pending_roadmap_goal");
            }

            navigate("/dashboard");

        } catch (error) {
            setError(error.message || "ورود ناموفق بود");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Scene variant="hero" />

            <main
                dir="rtl"
                className="relative z-10 flex min-h-screen items-center justify-center px-6 py-16 text-white"
            >
                <section className="w-full max-w-md rounded-[2rem] border border-white/10 bg-zinc-950/60 p-8 backdrop-blur-2xl">

                    {/* Header */}
                    <div className="text-center">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10">
                            <LogIn className="h-8 w-8 text-cyan-400" />
                        </div>

                        <p className="mt-6 text-xs font-mono tracking-[5px] text-cyan-400/60">
                            WELCOME BACK
                        </p>

                        <h1 className="mt-2 text-3xl font-black">
                            ورود به حساب
                        </h1>

                        <p className="mt-2 text-sm text-zinc-500">
                            وارد حساب خودت شو و ادامه‌ی مسیر یادگیریت رو دنبال کن.
                        </p>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="mt-6 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-400">
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="mt-8 space-y-5"
                    >

                        {/* Email */}
                        <div>
                            <label className="mb-2 block text-sm text-zinc-400">
                                ایمیل
                            </label>

                            <div className="relative">
                                <Mail className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" />

                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                    autoComplete="email"
                                    placeholder="example@email.com"
                                    dir="ltr"
                                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-3.5 pr-11 pl-4 text-sm text-white outline-none transition placeholder:text-zinc-700 focus:border-cyan-400/40 focus:bg-cyan-400/[0.03]"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="mb-2 block text-sm text-zinc-400">
                                رمز عبور
                            </label>

                            <div className="relative">
                                <Lock className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" />

                                <input
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    required
                                    autoComplete="current-password"
                                    placeholder="رمز عبور"
                                    dir="ltr"
                                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-3.5 pr-11 pl-4 text-sm text-white outline-none transition placeholder:text-zinc-700 focus:border-cyan-400/40 focus:bg-cyan-400/[0.03]"
                                />
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 py-3.5 font-bold text-black transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {loading
                                ? "در حال ورود..."
                                : "ورود به حساب"}

                            <ArrowLeft className="h-4 w-4" />
                        </button>
                    </form>

                    {/* Register */}
                    <div className="mt-6 border-t border-white/5 pt-6 text-center text-sm">
                        <span className="text-zinc-600">
                            هنوز حساب نداری؟
                        </span>

                        <Link
                            to="/"
                            className="mr-2 font-bold text-cyan-400 hover:text-cyan-300"
                        >
                            ساخت حساب
                        </Link>
                    </div>
                </section>
            </main>
        </>
    );
}