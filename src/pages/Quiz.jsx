import { useContext, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { questions } from "../data/questions";
import { QUIZ_CATEGORIES, CATEGORY_ORDER } from "../constants/quizCategories";

import calculateScore from "../engine/calculateScore";
import calculatePercentages from "../engine/calculatePercentages";
import sortByPercentage from "../engine/sortByPercentage";

import QuizContext from "../context/QuizContext";
import Scene from "../components/ui/Scene";

// ========================================
// BUILD CATEGORY GROUPS
// ========================================

function buildCategoryGroups(questions) {
    const groups = {};

    for (const question of questions) {
        const category = question.category || "interest";
        if (!groups[category]) {
            groups[category] = [];
        }
        groups[category].push(question);
    }

    return CATEGORY_ORDER
        .filter((cat) => groups[cat]?.length > 0)
        .map((cat) => ({
            id: cat,
            config: QUIZ_CATEGORIES[cat],
            questions: groups[cat],
        }));
}

// ========================================
// QUIZ
// ========================================

export default function Quiz() {
    const navigate = useNavigate();
    const { setResult, setUserProfile } = useContext(QuizContext);

    // screens: "welcome" | "question" | "transition"
    const [screen, setScreen] = useState("welcome");
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [pendingCategory, setPendingCategory] = useState(null);

    const question = questions[currentQuestion];
    const categoryGroups = useMemo(() => buildCategoryGroups(questions), []);

    const currentCategory = question?.category || "interest";
    const currentCategoryConfig = QUIZ_CATEGORIES[currentCategory];

    const currentGroup = categoryGroups.find((g) => g.id === currentCategory);
    const questionIndexInCategory = currentGroup
        ? currentGroup.questions.findIndex((q) => q.id === question.id)
        : 0;
    const totalInCategory = currentGroup?.questions.length || 0;

    // ========================================
    // START QUIZ
    // ========================================

    function startQuiz() {
        setScreen("question");
    }

    // ========================================
    // HANDLE ANSWER
    // ========================================

    function handleAnswer(answerIndex) {
        const newAnswers = {
            ...answers,
            [question.id]: answerIndex,
        };

        setAnswers(newAnswers);

        // آخرین سوال؟
        if (currentQuestion >= questions.length - 1) {
            finishQuiz(newAnswers);
            return;
        }

        const nextQuestion = questions[currentQuestion + 1];
        const nextCategory = nextQuestion?.category || "interest";

        if (nextCategory !== currentCategory) {
            setPendingCategory(nextCategory);
            setScreen("transition");
        } else {
            setTimeout(() => {
                setCurrentQuestion((prev) => prev + 1);
            }, 250);
        }
    }

    // ========================================
    // FINISH
    // ========================================

    function finishQuiz(finalAnswers) {
        const { scores, userProfile } = calculateScore(questions, finalAnswers);
        const percentages = calculatePercentages(scores);
        const result = sortByPercentage(percentages);

        localStorage.setItem("quiz_user_profile", JSON.stringify(userProfile));

        setUserProfile(userProfile);

        setResult(result);
        navigate("/result");
    }
    // ========================================
    // CONTINUE FROM TRANSITION
    // ========================================

    function continueFromTransition() {
        setPendingCategory(null);
        setScreen("question");
        setCurrentQuestion((prev) => prev + 1);
    }

    // ========================================
    // RENDER: WELCOME
    // ========================================

    if (screen === "welcome") {
        return (
            <section className="relative h-screen overflow-hidden flex items-center justify-center px-6">
                <Scene variant="quiz" />

                <div className="relative z-10 w-full max-w-xl text-center">

                    <p className="text-cyan-400/60 text-xs font-mono tracking-[8px] uppercase">
                        DevCompass
                    </p>

                    <h1 className="mt-6 text-4xl md:text-5xl font-black text-white tracking-tight">
                        آزمون استعدادیابی
                    </h1>

                    <div className="mx-auto mt-6 h-[2px] w-16 bg-cyan-400/60" />

                    <p className="mt-6 text-zinc-500 text-sm leading-7 max-w-md mx-auto">
                        با پاسخ دادن به این سوالا، مسیر یادگیری مناسب خودت رو پیدا می‌کنی.
                    </p>

                    {/* Stats */}
                    <div className="mt-12 flex items-center justify-center gap-12">
                        <div className="text-center">
                            <p className="text-3xl font-black text-white">
                                {questions.length}
                            </p>
                            <p className="mt-1 text-[10px] font-mono tracking-[4px] uppercase text-zinc-600">
                                سوال
                            </p>
                        </div>

                        <div className="h-12 w-px bg-white/10" />

                        <div className="text-center">
                            <p className="text-3xl font-black text-white">
                                ~۲
                            </p>
                            <p className="mt-1 text-[10px] font-mono tracking-[4px] uppercase text-zinc-600">
                                دقیقه
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={startQuiz}
                        className="mt-12 inline-flex items-center justify-center gap-3 px-10 py-4 rounded-2xl bg-white text-black font-black text-sm hover:bg-zinc-200 transition-all duration-300 active:scale-[0.98]"
                    >
                        شروع
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </button>
                </div>
            </section>
        );
    }

    // ========================================
    // RENDER: TRANSITION
    // ========================================

    if (screen === "transition" && pendingCategory) {
        const toConfig = QUIZ_CATEGORIES[pendingCategory];

        return (
            <section className="relative h-screen overflow-hidden flex items-center justify-center px-6">
                <Scene variant="quiz" />

                <div className="relative z-10 w-full max-w-xl text-center">

                    {/* Progress bars */}
                    <div className="mb-16 flex items-center justify-center gap-2">
                        {questions.map((q, index) => {
                            const cat = q.category || "interest";
                            const config = QUIZ_CATEGORIES[cat];
                            const isPast = index <= currentQuestion;
                            const isCurrent = index === currentQuestion + 1;

                            return (
                                <div
                                    key={index}
                                    className={`
                                        h-[3px] rounded-full transition-all duration-500
                                        ${isPast
                                            ? `w-8 ${config.progressColor} opacity-60`
                                            : ""}
                                        ${isCurrent
                                            ? `w-12 ${config.progressColor} ${config.glowShadow}`
                                            : ""}
                                        ${!isPast && !isCurrent ? "w-4 bg-white/10" : ""}
                                    `}
                                />
                            );
                        })}
                    </div>

                    <p className="text-xs font-mono tracking-[12px] uppercase text-cyan-400/60">
                        NEXT SECTION
                    </p>

                    <h1 className="mt-6 text-4xl md:text-5xl font-black text-white tracking-tight">
                        {toConfig.fullTitle}
                    </h1>

                    <div className={`mx-auto mt-6 h-[2px] w-16 ${toConfig.progressColor}`} />

                    <p className="mt-6 text-zinc-500 text-sm leading-7 max-w-md mx-auto">
                        {toConfig.description}
                    </p>

                    <button
                        onClick={continueFromTransition}
                        className="mt-12 inline-flex items-center justify-center gap-3 px-10 py-4 rounded-2xl bg-white text-black font-black text-sm hover:bg-zinc-200 transition-all duration-300 active:scale-[0.98]"
                    >
                        ادامه
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </button>
                </div>
            </section>
        );
    }

    // ========================================
    // RENDER: QUESTION
    // ========================================

    return (
        <section className="relative h-screen overflow-hidden flex items-center justify-center">
            <Scene variant="quiz" />

            <div className="relative z-10 w-full max-w-2xl px-6">

                {/* ────────────────────────────────
                    PROGRESS BAR (per question, colored)
                    ──────────────────────────────── */}
                <div className="mb-10">
                    <div className="flex items-center justify-center gap-2">
                        {questions.map((q, index) => {
                            const cat = q.category || "interest";
                            const config = QUIZ_CATEGORIES[cat];

                            const isPast = index < currentQuestion;
                            const isCurrent = index === currentQuestion;
                            const isFuture = index > currentQuestion;

                            return (
                                <div
                                    key={index}
                                    className={`
                                        h-[3px] rounded-full transition-all duration-500
                                        ${isPast
                                            ? `w-8 ${config.progressColor} opacity-60`
                                            : ""}
                                        ${isCurrent
                                            ? `w-14 ${config.progressColor} ${config.glowShadow}`
                                            : ""}
                                        ${isFuture
                                            ? "w-6 bg-white/10"
                                            : ""}
                                    `}
                                />
                            );
                        })}
                    </div>

                    {/* Counter */}
                    <p className="mt-4 text-center text-cyan-400/40 text-[10px] font-mono tracking-[6px] uppercase">
                        سوال {currentQuestion + 1} از {questions.length}
                    </p>
                </div>

                {/* ────────────────────────────────
                    HEADER (category · counter · back)
                    ──────────────────────────────── */}
                <div className="mb-6 flex items-center justify-between">
                    <p
                        className={`text-xs font-mono tracking-[6px] uppercase ${currentCategoryConfig.textColor}`}
                    >
                        {currentCategoryConfig.label} · {String(questionIndexInCategory + 1).padStart(2, "0")} / {String(totalInCategory).padStart(2, "0")}
                    </p>

                    {currentQuestion > 0 && (
                        <button
                            onClick={() => setCurrentQuestion((prev) => prev - 1)}
                            className="text-zinc-600 hover:text-white text-xs font-mono tracking-wider transition-colors"
                        >
                            ← BACK
                        </button>
                    )}
                </div>

                {/* ────────────────────────────────
                    QUESTION
                    ──────────────────────────────── */}
                <div className="mb-8" dir="rtl">
                    <h1 className="text-white text-xl md:text-3xl font-bold leading-relaxed tracking-tight">
                        {question.title}
                    </h1>
                </div>

                {/* ────────────────────────────────
                    OPTIONS
                    ──────────────────────────────── */}
                <div className="space-y-2.5 mb-8" dir="rtl">
                    {question.answers.map((answer, index) => {
                        const selected = answers[question.id] === index;

                        return (
                            <button
                                key={index}
                                onClick={() => handleAnswer(index)}
                                className={`
                                    group w-full py-3.5 px-5
                                    flex items-center gap-3
                                    rounded-2xl
                                    transition-all duration-200
                                    ${selected
                                        ? "bg-cyan-500/15 border border-cyan-400/50 shadow-[0_0_25px_rgba(34,211,238,.15)]"
                                        : "border border-transparent hover:bg-white/[0.03] hover:border-white/10"
                                    }
                                `}
                            >
                                <div
                                    className={`
                                        w-4 h-4 rounded-full border-2 flex items-center justify-center
                                        transition-all flex-shrink-0
                                        ${selected
                                            ? "border-cyan-400 bg-cyan-400/20"
                                            : "border-white/25 group-hover:border-cyan-400/50"
                                        }
                                    `}
                                >
                                    {selected && (
                                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                                    )}
                                </div>

                                <span
                                    className={`
                                        text-base transition-all
                                        ${selected ? "text-cyan-100 font-medium" : "text-white/80"}
                                    `}
                                >
                                    {answer.text}
                                </span>

                                {selected && (
                                    <svg
                                        className="w-4 h-4 text-cyan-400 ml-auto"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2.5}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* ────────────────────────────────
                    FOOTER
                    ──────────────────────────────── */}
                <div className="flex justify-between items-center text-[10px] font-mono tracking-[4px] uppercase">
                    <p className="text-cyan-400/30">
                        {answers[question.id] !== undefined
                            ? "✓ ANSWERED"
                            : "○ PENDING"}
                    </p>

                    {answers[question.id] !== undefined &&
                        currentQuestion < questions.length - 1 &&
                        question.category === questions[currentQuestion + 1]?.category && (
                            <button
                                onClick={() => setCurrentQuestion((prev) => prev + 1)}
                                className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-2 tracking-[4px]"
                            >
                                NEXT
                                <svg
                                    className="w-3 h-3"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </button>
                        )}
                </div>
            </div>
        </section>
    );
}