export const QUIZ_CATEGORIES = {
    interest: {
        id: "interest",
        label: "علاقه",
        fullTitle: "علاقه‌ت چیه؟",
        icon: "🎯",
        description:
            "با این سوالا می‌فهمیم قلبت با کدوم حوزه می‌زنه.",
        textColor: "text-cyan-400",
        bgColor: "bg-cyan-400/10",
        borderColor: "border-cyan-400/30",
        progressColor: "bg-cyan-400",
        glowShadow: "shadow-[0_0_20px_rgba(34,211,238,.5)]",
    },

    level: {
        id: "level",
        label: "سطح",
        fullTitle: "سطحت چیه؟",
        icon: "📊",
        description:
            "بگو چقدر با برنامه‌نویسی آشنایی تا مسیر رو از جای درست شروع کنیم.",
        textColor: "text-emerald-400",
        bgColor: "bg-emerald-400/10",
        borderColor: "border-emerald-400/30",
        progressColor: "bg-emerald-400",
        glowShadow: "shadow-[0_0_20px_rgba(52,211,153,.5)]",
    },

    goal: {
        id: "goal",
        label: "هدف",
        fullTitle: "هدفت چیه؟",
        icon: "🚀",
        description:
            "هدفت از یادگیری برنامه‌نویسی چیه؟ شغل، فریلنس، یا فقط علاقه؟",
        textColor: "text-purple-400",
        bgColor: "bg-purple-400/10",
        borderColor: "border-purple-400/30",
        progressColor: "bg-purple-400",
        glowShadow: "shadow-[0_0_20px_rgba(192,132,252,.5)]",
    },

    time: {
        id: "time",
        label: "وقت",
        fullTitle: "چقدر وقت داری؟",
        icon: "⏱️",
        description:
            "بگو روزانه چقدر می‌تونی وقت بذاری تا مسیر رو متناسب باهات تنظیم کنیم.",
        textColor: "text-amber-400",
        bgColor: "bg-amber-400/10",
        borderColor: "border-amber-400/30",
        progressColor: "bg-amber-400",
        glowShadow: "shadow-[0_0_20px_rgba(251,191,36,.5)]",
    },

    style: {
        id: "style",
        label: "سبک",
        fullTitle: "چطور یاد می‌گیری؟",
        icon: "💡",
        description:
            "سبک یادگیریت چیه؟ ویدیو، مستندات، یا تمرین و چالش؟",
        textColor: "text-pink-400",
        bgColor: "bg-pink-400/10",
        borderColor: "border-pink-400/30",
        progressColor: "bg-pink-400",
        glowShadow: "shadow-[0_0_20px_rgba(244,114,182,.5)]",
    },
};


export const CATEGORY_ORDER = [
    "interest",
    "level",
    "goal",
    "time",
    "style",
];


export function getCategoryConfig(categoryId) {
    return QUIZ_CATEGORIES[categoryId] || QUIZ_CATEGORIES.interest;
}