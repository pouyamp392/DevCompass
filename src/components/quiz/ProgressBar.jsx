export default function ProgressBar({ currentQuestion, totalQuestions }) {

    const percentage = ((currentQuestion + 1) / totalQuestions) * 100;

    return (
        <div className="w-full">

            <div className="flex justify-between mb-2 text-sm text-zinc-400">

                <span>
                    سؤال {currentQuestion + 1}
                </span>

                <span>
                    {totalQuestions}
                </span>

            </div>

            <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">

                <div
                    className="h-full bg-cyan-500 transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                />

            </div>

        </div>
    );
}