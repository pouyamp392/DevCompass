import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { questions } from "../data/questions";

import ProgressBar from "../components/quiz/ProgressBar";
import QuestionCard from "../components/quiz/QuestionCard";

import calculateScore from "../engine/calculateScore";
import calculatePercentages from "../engine/calculatePercentages";
import sortByPercentage from "../engine/sortByPercentage";

import QuizContext from "../context/QuizContext";
import Scene from "../components/ui/Scene";

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
        <section className="relative min-h-screen overflow-hidden flex items-center justify-center">

            <Scene variant="quiz" />

            <div className="relative z-10 w-full max-w-2xl px-6 py-8">

                {/* Header + Progress combined */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-cyan-400/60 text-xs tracking-[8px] font-mono">
                            QUESTION {currentQuestion + 1}/{questions.length}
                        </p>

                        {/* Back button */}
                        {currentQuestion > 0 && (
                            <button
                                onClick={() => setCurrentQuestion(prev => prev - 1)}
                                className="text-cyan-400/60 hover:text-cyan-300 text-sm font-mono tracking-wider transition-colors"
                            >
                                ← BACK
                            </button>
                        )}
                    </div>

                    {/* Progress bar */}
                    <div className="flex items-center gap-3">

                        {questions.map((_, index) => (

                            <div
                                key={index}
                                className={`
                h-[3px]
                rounded-full
                transition-all
                duration-500

                ${index < currentQuestion
                                        ? `
                            w-10
                            bg-cyan-400
                            shadow-[0_0_20px_rgba(34,211,238,.7)]
                          `
                                        : index === currentQuestion
                                            ? `
                            w-14
                            bg-white
                            shadow-[0_0_25px_rgba(255,255,255,.8)]
                          `
                                            : `
                            w-6
                            bg-white/10
                          `
                                    }
            `}
                            />

                        ))}

                    </div>
                </div>

                {/* Question */}
                <div className="mb-10" dir="rtl">
                    <h1 className="text-white text-2xl md:text-4xl font-bold leading-relaxed tracking-tight">
                        {question.title}
                    </h1>
                </div>

                {/* Options */}
                <div className="space-y-3 mb-8" dir="rtl">
                    {question.answers.map((answer, index) => {
                        const selected = answers[question.id] === index;

                        return (
                            <button
                                key={index}
                                onClick={() => handleAnswer(index)}
                                className={`
                group w-full py-4 px-6
                flex items-center gap-4
                rounded-2xl
                transition-all duration-200
                ${selected
                                        ? 'bg-cyan-500/15 border border-cyan-400/50 shadow-[0_0_25px_rgba(34,211,238,.2)]'
                                        : 'border border-transparent hover:bg-white/[0.03] hover:border-white/10'
                                    }
                `}
                            >
                                {/* Radio indicator */}
                                <div
                                    className={`
                    w-5 h-5 rounded-full border-2 flex items-center justify-center
                    transition-all flex-shrink-0
                    ${selected
                                            ? 'border-cyan-400 bg-cyan-400/20'
                                            : 'border-white/25 group-hover:border-cyan-400/50'
                                        }
                `}
                                >
                                    {selected && (
                                        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-scale-in" />
                                    )}
                                </div>

                                <span
                                    className={`
                    text-lg transition-all
                    ${selected ? 'text-cyan-100 font-medium' : 'text-white/80'}
                `}
                                >
                                    {answer.text}
                                </span>

                                {/* Checkmark for selected */}
                                {selected && (
                                    <svg
                                        className="w-5 h-5 text-cyan-400 ml-auto animate-fade-in"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Footer navigation */}
                <div className="flex justify-between items-center">
                    <p className="text-cyan-400/30 text-xs tracking-[4px] font-mono">
                        {answers[question.id] !== undefined ? '✓ ANSWERED' : '○ PENDING'}
                    </p>

                    {/* Next button - only show if answered */}
                    {answers[question.id] !== undefined && currentQuestion < questions.length - 1 && (
                        <button
                            onClick={() => setCurrentQuestion(prev => prev + 1)}
                            className="text-cyan-400 hover:text-cyan-300 text-sm font-mono tracking-wider transition-colors flex items-center gap-2"
                        >
                            NEXT
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>
        </section>
    );

}