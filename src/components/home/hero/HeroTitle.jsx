// components/Hero/HeroTitle.jsx
export default function HeroTitle() {
    return (
        <h1
            className="
                max-w-[820px] text-4xl font-black leading-[1.3] tracking-tight
                text-white sm:text-5xl lg:text-6xl xl:text-[4.35rem]
            "
        >
            مسیر برنامه‌نویسی
            <br />
            <span
                className="
                    bg-gradient-to-l from-cyan-300 via-blue-400 to-violet-400
                    bg-clip-text text-transparent
                "
            >
                مناسب خودت
            </span>
            {" "}را پیدا کن
        </h1>
    );
}