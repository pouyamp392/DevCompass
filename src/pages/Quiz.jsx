import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { questions } from "../data/questions";

import ProgressBar from "../components/quiz/ProgressBar";
import QuestionCard from "../components/quiz/QuestionCard";

import calculateScore from "../engine/calculateScore";
import calculatePercentages from "../engine/calculatePercentages";
import sortByPercentage from "../engine/sortByPercentage";

import QuizContext from "../context/QuizContext";

export default function Quiz() {

    const navigate = useNavigate();

    const { setResult } = useContext(QuizContext);

    const [currentQuestion, setCurrentQuestion] = useState(0);

    const [answers, setAnswers] = useState({});

    const question = questions[currentQuestion];

    function handleAnswer(answerIndex) {

        const newAnswers = {
            ...answers,
            [question.id]: answerIndex
        };

        setAnswers(newAnswers);

        if (currentQuestion < questions.length - 1) {

            setTimeout(() => {
                setCurrentQuestion(prev => prev + 1);
            }, 300);

        } else {

            const scores = calculateScore(questions, newAnswers);

            const percentages = calculatePercentages(scores);

            const result = sortByPercentage(percentages);

            setResult(result);

            navigate("/result");

        }

    }

    function previousQuestion() {

        if (currentQuestion > 0) {
            setCurrentQuestion(prev => prev - 1);
        }

    }

    return (

        <section className="min-h-screen bg-zinc-950 text-white flex justify-center items-center px-6">

            <div className="max-w-3xl w-full">

                <ProgressBar
                    currentQuestion={currentQuestion}
                    totalQuestions={questions.length}
                />

                <div className="mt-10">

                    <QuestionCard
                        question={question}
                        selectedAnswer={answers[question.id]}
                        onAnswer={handleAnswer}
                    />

                </div>

                <div className="flex justify-between mt-10">

                    <button
                        onClick={previousQuestion}
                        disabled={currentQuestion === 0}
                        className="px-6 py-3 rounded-xl bg-zinc-800 disabled:opacity-40"
                    >
                        قبلی
                    </button>

                </div>

            </div>

        </section>

    );

}