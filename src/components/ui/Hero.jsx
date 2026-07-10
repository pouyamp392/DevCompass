import { Link } from "react-router-dom";
import Scene from "./Scene";

export default function Hero() {
    return (
        <section className="relative min-h-screen overflow-hidden">

            <Scene variant="hero" />

            <div
                className="
                relative z-10
                container mx-auto
                min-h-screen
                flex items-center
                px-8
                "
            >
                <div className="w-full flex flex-row-reverse items-center justify-between">

                    {/* متن سمت راست */}
                    <div className="max-w-2xl text-right">

                        <span
                            className="
                            inline-block
                            mb-5
                            px-4 py-2
                            rounded-full
                            bg-white/10
                            border border-white/10
                            backdrop-blur-md
                            text-blue-300
                            text-sm
                            "
                        >
                            🚀 مسیر هوشمند کشف استعداد
                        </span>

                        <h1
                            className="
                            text-white
                            font-black
                            leading-tight
                            text-6xl
                            "
                        >
                            DevCompass
                        </h1>

                        <h2
                            className="
                            mt-4
                            text-3xl
                            font-bold
                            text-blue-200
                            "
                        >
                            قطب‌نمای مسیر برنامه‌نویسی شما
                        </h2>

                        <p
                            className="
                            mt-8
                            text-gray-300
                            text-xl
                            leading-9
                            max-w-xl
                            "
                        >
                            با چند تست کوتاه، مناسب‌ترین
                            مسیر یادگیری، تکنولوژی و
                            شغل برنامه‌نویسی خودت را پیدا کن.
                        </p>

                        <div
                            className="
                            mt-10
                            flex flex-row-reverse
                            gap-5
                            "
                        >
                            <Link
                                to="/quiz"
                                className="inline-flex mt-12 bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-105"
                            >
                                شروع مسیر من →
                            </Link>

                            {/* <button
                                className="
                                px-8 py-4
                                rounded-2xl
                                bg-white/5
                                border border-white/10
                                backdrop-blur-md
                                text-gray-200
                                hover:bg-white/10
                                transition-all
                                "
                            >
                                مشاهده مسیرها
                            </button> */}
                        </div>
                    </div>

                    {/* سمت چپ فعلاً خالی */}
                    <div className="w-[500px]" />
                </div>
            </div>
        </section>
    );
}