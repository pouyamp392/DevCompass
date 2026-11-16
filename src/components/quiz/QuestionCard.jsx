import AnswerButton from "./AnswerButton";

export default function QuestionCard({
    question,
    selectedAnswer,
    onAnswer
}) {

    return (

        <div>

            <h1 className="text-3xl font-bold mb-8">

                {question.title}

            </h1>

            <div className="space-y-4">

                {question.answers.map((answer, index) => (

                    <AnswerButton
                        key={index}
                        answer={answer}
                        selected={selectedAnswer === index}
                        onClick={() => onAnswer(index)}
                    />

                ))}

            </div>

        </div>

    );

}