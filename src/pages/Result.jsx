import { useContext } from "react";
import { Link } from "react-router-dom";

import QuizContext from "../context/QuizContext";

export default function Result() {

    const { result } = useContext(QuizContext);

    const bestResult = result[0];


    if (!bestResult) {

        console.log(result);

        return (

            <section className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">

                <h1 className="text-3xl">

                    نتیجه‌ای پیدا نشد.

                </h1>

            </section>

        );

    }


    return (

        <section className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-6">

            <div className="max-w-4xl w-full">

                <p className="text-cyan-400 text-center mb-4">

                    🎉 نتیجه آزمون

                </p>

                <h1 className="text-5xl font-black text-center">

                    {bestResult.id}

                </h1>

                <h2 className="text-center text-7xl mt-6 text-cyan-400">

                    {bestResult.percentage}%

                </h2>

                <div className="bg-zinc-900 rounded-3xl p-8 mt-14">

                    <h3 className="text-2xl font-bold mb-6">

                        چرا این مسیر؟

                    </h3>

                    <ul className="space-y-4 text-zinc-300">

                        <li>✔ این مسیر بیشترین امتیاز را از پاسخ‌های تو گرفته است.</li>

                        <li>✔ با علایق و هدفت بیشترین تطابق را دارد.</li>

                        <li>✔ ادامه مسیر یادگیری برایت مشخص شده است.</li>

                    </ul>

                </div>

                <div className="text-center mt-12">

                    <Link
                        to="/roadmap"
                        className="bg-cyan-500 text-black font-bold px-8 py-4 rounded-2xl"
                    >

                        مشاهده نقشه راه →

                    </Link>

                </div>

            </div>

        </section>

    );

}