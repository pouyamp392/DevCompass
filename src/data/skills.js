export const skills = [
    {
        id: "html",
        slug: "html",
        title: "HTML",
        icon: "🌐",
        requires: [],
        difficulty: 1,
        time: 7,
        xp: 50,
        goals: ["frontend"],
        category: "core",
        type: "language",
        stage: 1,
        priority: "required",
        description: "Structure of web pages",
        project: {
            title: "Personal Bio Page",
            description: "Create a simple HTML page about yourself."
        },
        exercise: {
            title: "HTML Basics",
            description: "Practice using headings, paragraphs, and lists."
        },
        resources: [
            {
                title: "MDN HTML Docs",
                url: "https://developer.mozilla.org/en-US/docs/Web/HTML"
            }
        ]
    },
    {
        id: "css",
        slug: "css",
        title: "CSS",
        icon: "🎨",
        requires: ["html"],
        difficulty: 2,
        time: 14,
        xp: 100,
        goals: ["frontend"],
        category: "core",
        type: "language",
        stage: 1,
        priority: "required",
        description: "Styling web pages",
        project: {
            title: "Styled Bio Page",
            description: "Add colors, fonts, and layouts to your bio page."
        },
        exercise: {
            title: "CSS Styling",
            description: "Practice with selectors, colors, and box model."
        },
        resources: [
            {
                title: "MDN CSS Docs",
                url: "https://developer.mozilla.org/en-US/docs/Web/CSS"
            }
        ]
    },
    {
        id: "git",
        slug: "git",
        title: "Git",
        icon: "🔀",
        requires: [],
        difficulty: 2,
        time: 7,
        xp: 80,
        goals: ["frontend", "backend", "ai"],
        category: "tool",
        type: "tool",
        stage: 1,
        priority: "required",
        description: "Version Control",
        project: {
            title: "Git Repository",
            description: "Initialize a repo and make your first commit."
        },
        exercise: {
            title: "Git Commands",
            description: "Practice add, commit, push, and pull."
        },
        resources: [
            {
                title: "Git Documentation",
                url: "https://git-scm.com/doc"
            }
        ]
    },
    {
        id: "javascript",
        slug: "javascript",
        title: "JavaScript",
        icon: "⚡",
        requires: ["html", "css"],
        difficulty: 3,
        time: 45,
        xp: 300,
        goals: ["frontend", "backend"],
        category: "core",
        type: "language",
        stage: 2,
        priority: "required",
        description: "Programming Language",
        project: {
            title: "Interactive Page",
            description: "Add interactivity to your webpage with JS."
        },
        exercise: {
            title: "JS Fundamentals",
            description: "Practice variables, functions, and loops."
        },
        resources: [
            {
                title: "MDN JavaScript Docs",
                url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript"
            },
            {
                title: "JavaScript.info",
                url: "https://javascript.info"
            }
        ]
    },
    {
        id: "dom",
        slug: "dom",
        title: "DOM",
        icon: "🧩",
        requires: ["javascript"],
        difficulty: 3,
        time: 10,
        xp: 120,
        goals: ["frontend"],
        category: "core",
        type: "concept",
        stage: 2,
        priority: "required",
        description: "Manipulating Pages",
        project: {
            title: "DOM Manipulation",
            description: "Build a dynamic to-do list with DOM methods."
        },
        exercise: {
            title: "DOM Practice",
            description: "Practice selecting, creating, and removing elements."
        },
        resources: [
            {
                title: "DOM Manipulation Guide",
                url: "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model"
            }
        ]
    },
    {
        id: "es6",
        slug: "es6",
        title: "ES6+",
        icon: "✨",
        requires: ["javascript"],
        difficulty: 3,
        time: 10,
        xp: 130,
        goals: ["frontend", "backend"],
        category: "core",
        type: "concept",
        stage: 2,
        priority: "required",
        description: "Modern JavaScript",
        project: {
            title: "ES6 Features",
            description: "Rewrite old code using modern JS features."
        },
        exercise: {
            title: "ES6 Practice",
            description: "Practice arrow functions, destructuring, and modules."
        },
        resources: [
            {
                title: "ES6 Guide",
                url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
            }
        ]
    },
    {
        id: "sass",
        slug: "sass",
        title: "Sass",
        icon: "💅",
        requires: ["css"],
        difficulty: 2,
        time: 7,
        xp: 80,
        goals: ["frontend"],
        category: "tool",
        type: "tool",
        stage: 3,
        priority: "optional",
        description: "CSS Preprocessor",
        project: {
            title: "Sass Styling",
            description: "Convert CSS to SCSS with variables and nesting."
        },
        exercise: {
            title: "Sass Basics",
            description: "Practice variables, nesting, and mixins."
        },
        resources: [
            {
                title: "Sass Docs",
                url: "https://sass-lang.com/documentation"
            }
        ]
    },
    {
        id: "tailwind",
        slug: "tailwind",
        title: "TailwindCSS",
        icon: "💨",
        requires: ["css"],
        difficulty: 2,
        time: 7,
        xp: 90,
        goals: ["frontend"],
        category: "framework",
        type: "framework",
        stage: 3,
        priority: "required",
        description: "Utility CSS Framework",
        project: {
            title: "Tailwind Portfolio",
            description: "Build a portfolio using TailwindCSS."
        },
        exercise: {
            title: "Tailwind Practice",
            description: "Practice utility classes and responsive design."
        },
        resources: [
            {
                title: "Tailwind Docs",
                url: "https://tailwindcss.com/docs"
            }
        ]
    },
    {
        id: "api",
        slug: "api",
        title: "REST API",
        icon: "🔌",
        requires: ["javascript"],
        difficulty: 3,
        time: 10,
        xp: 150,
        goals: ["frontend", "backend"],
        category: "core",
        type: "concept",
        stage: 3,
        priority: "required",
        description: "Working With APIs",
        project: {
            title: "API Integration",
            description: "Fetch and display data from a public API."
        },
        exercise: {
            title: "API Practice",
            description: "Practice fetch, async/await, and error handling."
        },
        resources: [
            {
                title: "Fetch API Docs",
                url: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API"
            }
        ]
    },
    {
        id: "react",
        slug: "react",
        title: "React",
        icon: "⚛️",
        requires: ["javascript", "dom", "es6"],
        difficulty: 4,
        time: 30,
        xp: 500,
        goals: ["frontend"],
        category: "framework",
        type: "framework",
        stage: 4,
        priority: "required",
        description: "UI Library",
        project: {
            title: "Todo Application",
            description: "Build a complete todo app with localStorage."
        },
        exercise: {
            title: "State Practice",
            description: "Practice useState and component communication."
        },
        resources: [
            {
                title: "React Docs",
                url: "https://react.dev"
            }
        ]
    },
    {
        id: "router",
        slug: "router",
        title: "React Router",
        icon: "🛣️",
        requires: ["react"],
        difficulty: 3,
        time: 5,
        xp: 150,
        goals: ["frontend"],
        category: "framework",
        type: "framework",
        stage: 5,
        priority: "required",
        description: "Routing",
        project: {
            title: "Multi-page App",
            description: "Add routing to your React app with multiple pages."
        },
        exercise: {
            title: "Router Practice",
            description: "Practice routes, links, and nested routes."
        },
        resources: [
            {
                title: "React Router Docs",
                url: "https://reactrouter.com"
            }
        ]
    },
    {
        id: "state",
        slug: "state",
        title: "State Management",
        icon: "🧠",
        requires: ["react"],
        difficulty: 4,
        time: 10,
        xp: 200,
        goals: ["frontend"],
        category: "advanced",
        type: "concept",
        stage: 5,
        priority: "recommended",
        description: "Context / Zustand",
        project: {
            title: "Global State App",
            description: "Manage global state with Context API or Zustand."
        },
        exercise: {
            title: "State Management Practice",
            description: "Practice context, providers, and state updates."
        },
        resources: [
            {
                title: "React Context Docs",
                url: "https://react.dev/learn/passing-data-deeply-with-context"
            },
            {
                title: "Zustand Docs",
                url: "https://docs.pmnd.rs/zustand"
            }
        ]
    },
    {
        id: "typescript",
        slug: "typescript",
        title: "TypeScript",
        icon: "🔷",
        requires: ["javascript"],
        difficulty: 4,
        time: 20,
        xp: 300,
        goals: ["frontend", "backend"],
        category: "advanced",
        type: "language",
        stage: 6,
        priority: "recommended",
        description: "Typed JavaScript",
        project: {
            title: "TypeScript Project",
            description: "Convert a JS project to TypeScript."
        },
        exercise: {
            title: "TypeScript Practice",
            description: "Practice types, interfaces, and generics."
        },
        resources: [
            {
                title: "TypeScript Docs",
                url: "https://www.typescriptlang.org/docs"
            }
        ]
    },
    {
        id: "nextjs",
        slug: "nextjs",
        title: "Next.js",
        icon: "▲",
        requires: ["react"],
        difficulty: 5,
        time: 20,
        xp: 400,
        goals: ["frontend"],
        category: "framework",
        type: "framework",
        stage: 6,
        priority: "recommended",
        description: "React Framework",
        project: {
            title: "Next.js App",
            description: "Build a full-stack app with Next.js."
        },
        exercise: {
            title: "Next.js Practice",
            description: "Practice SSR, SSG, and API routes."
        },
        resources: [
            {
                title: "Next.js Docs",
                url: "https://nextjs.org/docs"
            }
        ]
    },
    {
        id: "testing",
        slug: "testing",
        title: "Testing",
        icon: "🧪",
        requires: ["react"],
        difficulty: 4,
        time: 10,
        xp: 200,
        goals: ["frontend"],
        category: "advanced",
        type: "tool",
        stage: 7,
        priority: "optional",
        description: "Testing Apps",
        project: {
            title: "Tested App",
            description: "Write unit and integration tests for your app."
        },
        exercise: {
            title: "Testing Practice",
            description: "Practice Jest, React Testing Library, and mocks."
        },
        resources: [
            {
                title: "Jest Docs",
                url: "https://jestjs.io"
            },
            {
                title: "React Testing Library",
                url: "https://testing-library.com/react"
            }
        ]
    },
    {
        id: "deployment",
        slug: "deployment",
        title: "Deployment",
        icon: "🚀",
        requires: ["react"],
        difficulty: 3,
        time: 7,
        xp: 150,
        goals: ["frontend"],
        category: "tool",
        type: "tool",
        stage: 7,
        priority: "required",
        description: "Deploy Projects",
        project: {
            title: "Deployed App",
            description: "Deploy your React app to Vercel or Netlify."
        },
        exercise: {
            title: "Deployment Practice",
            description: "Practice deploying with different platforms."
        },
        resources: [
            {
                title: "Vercel Docs",
                url: "https://vercel.com/docs"
            },
            {
                title: "Netlify Docs",
                url: "https://docs.netlify.com"
            }
        ]
    },
    {
        id: "portfolio",
        slug: "portfolio",
        title: "Portfolio",
        icon: "🗂️",
        requires: ["deployment"],
        difficulty: 2,
        time: 7,
        xp: 100,
        goals: ["frontend"],
        category: "career",
        type: "career",
        stage: 8,
        priority: "required",
        description: "Build Projects",
        project: {
            title: "Portfolio Website",
            description: "Create a professional portfolio with your projects."
        },
        exercise: {
            title: "Portfolio Planning",
            description: "Plan your portfolio structure and content."
        },
        resources: [
            {
                title: "Portfolio Guide",
                url: "https://www.freecodecamp.org/news/how-to-build-a-dev-portfolio"
            }
        ]
    },
    {
        id: "freelancing",
        slug: "freelancing",
        title: "Freelancing",
        icon: "💰",
        requires: ["portfolio"],
        difficulty: 3,
        time: 7,
        xp: 150,
        goals: ["frontend"],
        category: "career",
        type: "career",
        stage: 9,
        priority: "optional",
        description: "Find Clients",
        project: {
            title: "Freelance Profile",
            description: "Set up your profile on Upwork or Fiverr."
        },
        exercise: {
            title: "Freelance Strategy",
            description: "Practice writing proposals and pricing projects."
        },
        resources: [
            {
                title: "Freelance Guide",
                url: "https://www.upwork.com/resources/freelancing-guide"
            }
        ]
    }
];