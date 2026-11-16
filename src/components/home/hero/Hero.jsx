// components/Hero/Hero.jsx
import { Link } from "react-router-dom";
import Scene from "../../ui/Scene";
import CompassSVG from "./CompassSVG";
import HeroBadge from "./HeroBadge";
import HeroTitle from "./HeroTitle";
import HeroDescription from "./HeroDescription";
import HeroCTA from "./HeroCTA";
import HeroStats from "./HeroStats";



export default function Hero() {
    return (
        <section
            dir="rtl"
            className="
                relative isolate min-h-screen overflow-hidden bg-slate-950
            "
        >
            <Scene variant="hero" />

            {/* لایه تیره برای افزایش خوانایی متن */}
            <div
                aria-hidden="true"
                className="
                    pointer-events-none absolute inset-0 z-[1]
                    bg-gradient-to-l from-slate-950/85 via-slate-950/40 to-slate-950/10
                "
            />

            {/* نور تزئینی سمت متن */}
            <div
                aria-hidden="true"
                className="
                    pointer-events-none absolute -right-40 top-1/3 z-[1]
                    h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[140px]
                "
            />

            <div
                className="
                    relative z-10 mx-auto flex min-h-screen w-full max-w-[1500px]
                    items-center px-5 py-20 sm:px-8 sm:py-0 lg:px-12 xl:px-16
                "
            >
                <div
                    className="
                        grid w-full grid-cols-1 items-center gap-14
                        lg:grid-cols-[1.08fr_0.92fr] lg:gap-10 xl:gap-16
                    "
                >
                    {/* محتوای اصلی */}
                    <div className="order-1 max-w-3xl text-right">
                        <HeroBadge />
                        <HeroTitle />
                        <HeroDescription />
                        <HeroCTA />
                        <HeroStats />


                    </div>

                    {/* قطب‌نما */}
                    <div className="order-2 flex items-center justify-center lg:justify-start">
                        <div
                            className="
                                group relative flex aspect-square w-full max-w-[420px]
                                items-center justify-center sm:max-w-[500px] lg:max-w-[520px]
                            "
                        >
     
                            <CompassSVG />

                            {/* برچسب پایین قطب‌نما */}
                   
                        </div>
                    </div>
                </div>
            </div>

            {/* Fade پایین Hero */}
            <div
                aria-hidden="true"
                className="
                    pointer-events-none absolute bottom-0 left-0 right-0 z-[2]
                    h-32 bg-gradient-to-t from-slate-950 to-transparent
                "
            />
        </section>
    );
}