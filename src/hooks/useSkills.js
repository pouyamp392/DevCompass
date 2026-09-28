import {
    useState,
    useContext,
    useMemo,
    useCallback,
} from "react";

import QuizContext from "../context/QuizContext";
import { CATEGORIES } from "../constants/categories";
import { getSkillStatus } from "../engine/skillStatus";

export function useSkills() {
    const {
        skills,
        skillsLoading,
        skillsError,
        progress,
    } = useContext(QuizContext);

    // ========================================
    // STATE
    // ========================================

    const [searchTerm, setSearchTerm] =
        useState("");

    const [sortBy, setSortBy] =
        useState("progress");

    const [expandedCategories, setExpandedCategories] =
        useState(
            CATEGORIES.reduce(
                (acc, category) => ({
                    ...acc,
                    [category.id]: false,
                }),
                {}
            )
        );

    const [hoveredSkill, setHoveredSkill] =
        useState(null);

    // ========================================
    // DATA
    // ========================================

    const allSkills = Array.isArray(skills)
        ? skills
        : [];

    // ========================================
    // SKILLS MAP
    // ========================================

    const skillsMap = useMemo(() => {
        return Object.fromEntries(
            allSkills.map((skill) => [
                String(skill.id),
                skill,
            ])
        );
    }, [allSkills]);

    // ========================================
    // SKILL STATUS WRAPPER
    // ========================================
    //
    // این wrapper فقط برای سازگاری با کامپوننت‌های فعلی
    // است که getSkillStatus(skill) را صدا می‌زنند.
    // خود تابع اصلی در engine/skillStatus.js است.

    const getSkillStatusForSkill = useCallback(
        (skill) => getSkillStatus(skill, progress),
        [progress]
    );

    // ========================================
    // PREREQUISITES
    // ========================================

    const getPrerequisiteDetails =
        useCallback(
            (skill) => {
                if (!skill) {
                    return {
                        required: [],
                        recommended: [],
                    };
                }

                // Required
                const required =
                    (
                        Array.isArray(
                            skill.requires
                        )
                            ? skill.requires
                            : []
                    ).map((reqId) => {
                        const id =
                            String(reqId);

                        const requiredSkill =
                            skillsMap[id];

                        return {
                            id,

                            title:
                                requiredSkill?.title ||
                                id,

                            icon:
                                requiredSkill?.icon ||
                                "📘",

                            completed:
                                (
                                    Number(
                                        progress?.[
                                            id
                                        ]
                                    ) || 0
                                ) >= 100,

                            type: "required",
                        };
                    });

                // Recommended
                const recommended =
                    (
                        Array.isArray(
                            skill.recommended
                        )
                            ? skill.recommended
                            : []
                    ).map((recId) => {
                        const id =
                            String(recId);

                        const recommendedSkill =
                            skillsMap[id];

                        return {
                            id,

                            title:
                                recommendedSkill?.title ||
                                id,

                            icon:
                                recommendedSkill?.icon ||
                                "📘",

                            completed:
                                (
                                    Number(
                                        progress?.[
                                            id
                                        ]
                                    ) || 0
                                ) >= 100,

                            type: "recommended",
                        };
                    });

                return {
                    required,
                    recommended,
                };
            },
            [skillsMap, progress]
        );

    // ========================================
    // SKILL PATH
    // ========================================

    const buildSkillPath =
        useCallback(
            (skillId) => {
                const path = [];

                let currentId =
                    String(skillId);

                const visited =
                    new Set();

                while (
                    currentId &&
                    !visited.has(
                        currentId
                    )
                ) {
                    visited.add(
                        currentId
                    );

                    const skill =
                        skillsMap[
                            currentId
                        ];

                    if (!skill) {
                        break;
                    }

                    const value =
                        Number(
                            progress?.[
                                String(
                                    skill.id
                                )
                            ]
                        ) || 0;

                    path.unshift({
                        id: skill.id,

                        title: skill.title,

                        icon:
                            skill.icon ||
                            "📘",

                        completed:
                            value >= 100,

                        inProgress:
                            value > 0 &&
                            value < 100,
                    });

                    const requires =
                        Array.isArray(
                            skill.requires
                        )
                            ? skill.requires
                            : [];

                    if (
                        requires.length >
                        0
                    ) {
                        currentId =
                            String(
                                requires[0]
                            );
                    } else {
                        break;
                    }
                }

                return path;
            },
            [skillsMap, progress]
        );

    // ========================================
    // CURRENT SKILLS
    // ========================================

    const currentSkills =
        useMemo(() => {
            return allSkills
                .filter((skill) => {
                    const status =
                        getSkillStatusForSkill(
                            skill
                        );

                    return (
                        status ===
                            "in-progress" ||
                        status ===
                            "available"
                    );
                })
                .slice(0, 3);
        }, [
            allSkills,
            getSkillStatusForSkill,
        ]);

    // ========================================
    // CATEGORIZED SKILLS
    // ========================================

    const categorizedSkills =
        useMemo(() => {
            const result =
                CATEGORIES.map(
                    (category) => {
                        // -------------------------
                        // Category filter
                        // -------------------------

                        const categorySkills =
                            allSkills.filter(
                                (skill) => {
                                    const matchesCategory =
                                        Array.isArray(
                                            category.skillCategories
                                        ) &&
                                        category.skillCategories.includes(
                                            skill.category
                                        );

                                    const matchesGoal =
                                        Array.isArray(
                                            skill.goals
                                        ) &&
                                        Array.isArray(
                                            category.goals
                                        ) &&
                                        skill.goals.some(
                                            (goal) =>
                                                category.goals.includes(
                                                    goal
                                                )
                                        );

                                    return (
                                        matchesCategory ||
                                        matchesGoal
                                    );
                                }
                            );

                        // -------------------------
                        // Search
                        // -------------------------

                        const search =
                            searchTerm
                                .toLowerCase()
                                .trim();

                        const filtered =
                            search
                                ? categorySkills.filter(
                                      (
                                          skill
                                      ) => {
                                          const title =
                                              String(
                                                  skill.title ||
                                                      ""
                                              ).toLowerCase();

                                          const description =
                                              String(
                                                  skill.description ||
                                                      ""
                                              ).toLowerCase();

                                          return (
                                              title.includes(
                                                  search
                                              ) ||
                                              description.includes(
                                                  search
                                              )
                                          );
                                      }
                                  )
                                : categorySkills;

                        // -------------------------
                        // Sort
                        // -------------------------

                        const sorted =
                            [
                                ...filtered,
                            ].sort(
                                (
                                    a,
                                    b
                                ) => {
                                    switch (
                                        sortBy
                                    ) {
                                        case "progress":
                                            return (
                                                (
                                                    Number(
                                                        progress?.[
                                                            String(
                                                                b.id
                                                            )
                                                        ]
                                                    ) ||
                                                    0
                                                ) -
                                                (
                                                    Number(
                                                        progress?.[
                                                            String(
                                                                a.id
                                                            )
                                                        ]
                                                    ) ||
                                                    0
                                                )
                                            );

                                        case "difficulty":
                                            return (
                                                (
                                                    Number(
                                                        b.difficulty
                                                    ) ||
                                                    0
                                                ) -
                                                (
                                                    Number(
                                                        a.difficulty
                                                    ) ||
                                                    0
                                                )
                                            );

                                        case "xp":
                                            return (
                                                (
                                                    Number(
                                                        b.xp
                                                    ) ||
                                                    0
                                                ) -
                                                (
                                                    Number(
                                                        a.xp
                                                    ) ||
                                                    0
                                                )
                                            );

                                        case "name":
                                            return String(
                                                a.title ||
                                                    ""
                                            ).localeCompare(
                                                String(
                                                    b.title ||
                                                        ""
                                                )
                                            );

                                        default:
                                            return 0;
                                    }
                                }
                            );

                        // -------------------------
                        // Stats
                        // -------------------------

                        const completed =
                            sorted.filter(
                                (
                                    skill
                                ) =>
                                    getSkillStatusForSkill(
                                        skill
                                    ) ===
                                    "completed"
                            ).length;

                        const inProgress =
                            sorted.filter(
                                (
                                    skill
                                ) =>
                                    getSkillStatusForSkill(
                                        skill
                                    ) ===
                                    "in-progress"
                            ).length;

                        const locked =
                            sorted.filter(
                                (
                                    skill
                                ) =>
                                    getSkillStatusForSkill(
                                        skill
                                    ) ===
                                    "locked"
                            ).length;

                        const available =
                            sorted.length -
                            completed -
                            inProgress -
                            locked;

                        const categoryProgress =
                            sorted.length >
                            0
                                ? Math.round(
                                      (
                                          completed /
                                          sorted.length
                                      ) *
                                          100
                                  )
                                : 0;

                        return {
                            ...category,

                            skills:
                                sorted,

                            stats: {
                                total:
                                    sorted.length,

                                completed,

                                inProgress,

                                locked,

                                available,

                                progress:
                                    categoryProgress,
                            },
                        };
                    }
                );

            return result.filter(
                (category) =>
                    category.skills
                        .length > 0
            );
        }, [
            allSkills,
            progress,
            searchTerm,
            sortBy,
            getSkillStatusForSkill,
        ]);

    // ========================================
    // GLOBAL STATS
    // ========================================

    const globalStats =
        useMemo(() => {
            const completed =
                allSkills.filter(
                    (skill) =>
                        getSkillStatusForSkill(
                            skill
                        ) ===
                        "completed"
                ).length;

            const inProgress =
                allSkills.filter(
                    (skill) =>
                        getSkillStatusForSkill(
                            skill
                        ) ===
                        "in-progress"
                ).length;

            const total =
                allSkills.length;

            const earnedXP =
                allSkills
                    .filter(
                        (skill) =>
                            getSkillStatusForSkill(
                                skill
                            ) ===
                            "completed"
                    )
                    .reduce(
                        (
                            acc,
                            skill
                        ) =>
                            acc +
                            (
                                Number(
                                    skill.xp
                                ) ||
                                Number(
                                    skill.difficulty
                                ) *
                                    100 ||
                                100
                            ),
                        0
                    );

            const totalXP =
                allSkills.reduce(
                    (
                        acc,
                        skill
                    ) =>
                        acc +
                        (
                            Number(
                                skill.xp
                            ) ||
                            Number(
                                skill.difficulty
                            ) *
                                100 ||
                            100
                        ),
                    0
                );

            const level =
                Math.floor(
                    completed / 3
                ) + 1;

            return {
                completed,
                inProgress,
                total,
                earnedXP,
                totalXP,
                level,
            };
        }, [
            allSkills,
            getSkillStatusForSkill,
        ]);

    // ========================================
    // TOGGLE CATEGORY
    // ========================================

    const toggleCategory =
        useCallback(
            (categoryId) => {
                setExpandedCategories(
                    (previous) => ({
                        ...previous,

                        [categoryId]:
                            !previous[
                                categoryId
                            ],
                    })
                );
            },
            []
        );

    // ========================================
    // RETURN
    // ========================================

    return {
        // --------------------------------
        // Loading / Error
        // --------------------------------

        loading: skillsLoading,
        error: skillsError,

        // --------------------------------
        // State
        // --------------------------------

        searchTerm,
        setSearchTerm,

        sortBy,
        setSortBy,

        expandedCategories,

        hoveredSkill,
        setHoveredSkill,

        // --------------------------------
        // Data
        // --------------------------------

        allSkills,
        skillsMap,

        // --------------------------------
        // User Progress
        // --------------------------------

        progress,

        // --------------------------------
        // Functions
        // --------------------------------

        // این wrapper، برای سازگاری با کامپوننت‌های فعلی است.
        // خود تابع اصلی در engine/skillStatus.js است.
        getSkillStatus: getSkillStatusForSkill,

        getPrerequisiteDetails,
        buildSkillPath,
        toggleCategory,

        // --------------------------------
        // Derived
        // --------------------------------

        currentSkills,
        categorizedSkills,
        globalStats,
    };
}