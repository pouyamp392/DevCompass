export default function AnswerButton({
    answer,
    selected,
    onClick
}) {

    return (

        <button
            onClick={onClick}
            className={`
                w-full
                text-right
                p-5
                rounded-2xl
                border
                transition

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