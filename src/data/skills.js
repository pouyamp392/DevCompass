export const skills = [

    {
        id: "html",
        title: "HTML",
        icon: "🌐",

        requires: [],

        difficulty: 1,
        time: 7,

        goals: ["frontend"],

        category: "core",
        type: "language",

        stage: 1,

        priority: "required",

        description: "Structure of web pages"
    },

    {
        id: "css",
        title: "CSS",
        icon: "🎨",

        requires: ["html"],

        difficulty: 2,
        time: 14,

        goals: ["frontend"],

        category: "core",
        type: "language",

        stage: 1,

        priority: "required",

        description: "Styling web pages"
    },

    {
        id: "git",
        title: "Git",
        icon: "🔀",

        requires: [],

        difficulty: 2,
        time: 7,

        goals: ["frontend", "backend", "ai"],

        category: "tool",
        type: "tool",

        stage: 1,

        priority: "required",

        description: "Version Control"
    },

    {
        id: "javascript",
        title: "JavaScript",
        icon: "⚡",

        requires: ["html", "css"],

        difficulty: 3,
        time: 45,

        goals: ["frontend", "backend"],

        category: "core",
        type: "language",

        stage: 2,

        priority: "required",

        description: "Programming Language"
    },

    {
        id: "dom",
        title: "DOM",
        icon: "🧩",

        requires: ["javascript"],

        difficulty: 3,
        time: 10,

        goals: ["frontend"],

        category: "core",
        type: "concept",

        stage: 2,

        priority: "required",

        description: "Manipulating Pages"
    },

    {
        id: "es6",
        title: "ES6+",
        icon: "✨",

        requires: ["javascript"],

        difficulty: 3,
        time: 10,

        goals: ["frontend", "backend"],

        category: "core",
        type: "concept",

        stage: 2,

        priority: "required",

        description: "Modern JavaScript"
    },

    {
        id: "sass",
        title: "Sass",
        icon: "💅",

        requires: ["css"],

        difficulty: 2,
        time: 7,

        goals: ["frontend"],

        category: "tool",
        type: "tool",

        stage: 3,

        priority: "optional",

        description: "CSS Preprocessor"
    },

    {
        id: "tailwind",
        title: "TailwindCSS",
        icon: "💨",

        requires: ["css"],

        difficulty: 2,
        time: 7,

        goals: ["frontend"],

        category: "framework",
        type: "framework",

        stage: 3,

        priority: "required",

        description: "Utility CSS Framework"
    },

    {
        id: "api",
        title: "REST API",
        icon: "🔌",

        requires: ["javascript"],

        difficulty: 3,
        time: 10,

        goals: ["frontend", "backend"],

        category: "core",
        type: "concept",

        stage: 3,

        priority: "required",

        description: "Working With APIs"
    },

    {
        id: "react",
        title: "React",
        icon: "⚛️",

        requires: [
            "javascript",
            "dom",
            "es6"
        ],

        difficulty: 4,
        time: 30,

        goals: ["frontend"],

        category: "framework",
        type: "framework",

        stage: 4,

        priority: "required",

        description: "UI Library"
    },

    {
        id: "router",
        title: "React Router",
        icon: "🛣️",

        requires: ["react"],

        difficulty: 3,
        time: 5,

        goals: ["frontend"],

        category: "framework",
        type: "framework",

        stage: 5,

        priority: "required",

        description: "Routing"
    },

    {
        id: "state",
        title: "State Management",
        icon: "🧠",

        requires: ["react"],

        difficulty: 4,
        time: 10,

        goals: ["frontend"],

        category: "advanced",
        type: "concept",

        stage: 5,

        priority: "recommended",

        description: "Context / Zustand"
    },

    {
        id: "typescript",
        title: "TypeScript",
        icon: "🔷",

        requires: ["javascript"],

        difficulty: 4,
        time: 20,

        goals: ["frontend", "backend"],

        category: "advanced",
        type: "language",

        stage: 6,

        priority: "recommended",

        description: "Typed JavaScript"
    },

    {
        id: "nextjs",
        title: "Next.js",
        icon: "▲",

        requires: ["react"],

        difficulty: 5,
        time: 20,

        goals: ["frontend"],

        category: "framework",
        type: "framework",

        stage: 6,

        priority: "recommended",

        description: "React Framework"
    },

    {
        id: "testing",
        title: "Testing",
        icon: "🧪",

        requires: ["react"],

        difficulty: 4,
        time: 10,

        goals: ["frontend"],

        category: "advanced",
        type: "tool",

        stage: 7,

        priority: "optional",

        description: "Testing Apps"
    },

    {
        id: "deployment",
        title: "Deployment",
        icon: "🚀",

        requires: ["react"],

        difficulty: 3,
        time: 7,

        goals: ["frontend"],

        category: "tool",
        type: "tool",

        stage: 7,

        priority: "required",

        description: "Deploy Projects"
    },

    {
        id: "portfolio",
        title: "Portfolio",
        icon: "🗂️",

        requires: ["deployment"],

        difficulty: 2,
        time: 7,

        goals: ["frontend"],

        category: "career",
        type: "career",

        stage: 8,

        priority: "required",

        description: "Build Projects"
    },

    {
        id: "freelancing",
        title: "Freelancing",
        icon: "💰",

        requires: ["portfolio"],

        difficulty: 3,
        time: 7,

        goals: ["frontend"],

        category: "career",
        type: "career",

        stage: 9,

        priority: "optional",

        description: "Find Clients"
    }

];