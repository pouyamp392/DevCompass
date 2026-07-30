export default function AnswerButton({
    answer,
    selected,
    onClick
}) {

    return (
        <button
            onClick={onClick}
            aria-pressed={selected}
            className={`
                w-full p-6 rounded-3xl border transition-all duration-300 cursor-pointer
                ${
                    selected
                        ? "bg-cyan-500 text-black border-cyan-500"
                        : "bg-white/[0.03] border-white/10 text-white hover:border-cyan-400/40 hover:bg-cyan-500/[0.06]"
                }
            `}
        >
            {answer.text}
        </button>
    );
}