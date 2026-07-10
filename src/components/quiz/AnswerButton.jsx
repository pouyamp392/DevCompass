export default function AnswerButton({
    answer,
    selected,
    onClick
}) {

    return (

        <button
            onClick={onClick}
            className={`
group
w-full
p-6
rounded-3xl
bg-white/[0.03]
border border-white/10
hover:border-cyan-400/40
hover:bg-cyan-500/[0.06]
transition-all
duration-300

                ${
                    selected
                        ? "bg-cyan-500 text-black border-cyan-500"
                        : "bg-zinc-900 border-zinc-800 hover:border-cyan-500"
                }
            `}
        >

            {answer.text}

        </button>

    );

}