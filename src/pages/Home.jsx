import { Link } from "react-router-dom";

export default function Home() {
    return (
        <section className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-6">

            <div className="max-w-5xl w-full text-center">

                <p className="text-cyan-400 text-lg font-semibold tracking-widest mb-4">
                    DevCompass
                </p>

                <h1 className="text-5xl md:text-7xl font-black leading-tight">
                    مسیر درست
                    <br />
                    برنامه‌نویسی را پیدا کن.
                </h1>

                <p className="text-zinc-400 text-lg max-w-2xl mx-auto mt-8 leading-8">
                    هنوز نمی‌دانی از کجا باید شروع کنی؟
                    <br />
                    فقط به ۱۵ سؤال جواب بده تا مناسب‌ترین مسیر یادگیری را
                    بر اساس هدف، شخصیت و شرایطت پیدا کنیم.
                </p>

                <Link
                    to="/quiz"
                    className="inline-flex mt-12 bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-105"
                >
                    شروع مسیر من →
                </Link>

                <div className="grid md:grid-cols-3 gap-6 mt-24">

                    <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800">
                        <div className="text-5xl mb-5">
                            🎯
                        </div>

                        <h2 className="text-xl font-bold mb-3">
                            مسیر شخصی‌سازی‌شده
                        </h2>

                        <p className="text-zinc-400 leading-7">
                            بر اساس پاسخ‌های خودت،
                            مناسب‌ترین مسیر یادگیری را پیدا کن.
                        </p>
                    </div>

                    <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800">
                        <div className="text-5xl mb-5">
                            🧠
                        </div>

                        <h2 className="text-xl font-bold mb-3">
                            تحلیل هوشمند
                        </h2>

                        <p className="text-zinc-400 leading-7">
                            جواب‌ها فقط جمع نمی‌شوند؛
                            تحلیل می‌شوند.
                        </p>
                    </div>

                    <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800">
                        <div className="text-5xl mb-5">
                            🗺️
                        </div>

                        <h2 className="text-xl font-bold mb-3">
                            نقشه راه کامل
                        </h2>

                        <p className="text-zinc-400 leading-7">
                            از اولین قدم تا پروژه‌های واقعی،
                            همه چیز مشخص است.
                        </p>
                    </div>

                </div>

            </div>

        </section>
    );
}