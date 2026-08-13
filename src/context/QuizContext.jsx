import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

import AuthContext from "./AuthContext";

import generateRoadmap from "../engine/generateRoadmap";
import generateStages from "../engine/generateStages";

const QuizContext = createContext();

export function QuizProvider({ children }) {
    const { user } = useContext(AuthContext);

    // ========================================
    // STATE
    // ========================================

    const [result, setResult] = useState([]);

    const [roadmap, setRoadmap] = useState([]);

    const [progress, setProgress] = useState({});

    const [roadmapGoal, setRoadmapGoal] = useState(null);

    // Skills
    const [skills, setSkills] = useState([]);
    const [skillsLoading, setSkillsLoading] = useState(true);
    const [skillsError, setSkillsError] = useState(null);

    // ========================================
    // LOAD USER PROGRESS
    // ========================================

    useEffect(() => {
        if (!user?.id) {
            setProgress({});
            return;
        }

        let cancelled = false;

        async function loadProgress() {
            try {
                const response = await fetch(
                    `http://localhost/devcompass-api/api/progress.php?user_id=${user.id}`
                );

                const data = await response.json();

                if (!response.ok || !data.success) {
                    throw new Error(
                        data.message ||
                            "Failed to load progress"
                    );
                }

                if (cancelled) {
                    return;
                }

                setProgress(data.data || {});
            } catch (error) {
                if (cancelled) {
                    return;
                }

                console.error(
                    "Failed to load user progress:",
                    error
                );

                setProgress({});
            }
        }

        loadProgress();

        return () => {
            cancelled = true;
        };
    }, [user]);

    // ========================================
    // LOAD ALL SKILLS
    // ========================================

    useEffect(() => {
        let cancelled = false;

        async function loadSkills() {
            try {
                setSkillsLoading(true);
                setSkillsError(null);

                const response = await fetch(
                    "http://localhost/devcompass-api/api/skills.php"
                );

                const data = await response.json();

                if (!response.ok || !data.success) {
                    throw new Error(
                        data.message ||
                            "Failed to load skills"
                    );
                }

                if (cancelled) {
                    return;
                }

                const skillsData = Array.isArray(
                    data.data
                )
                    ? data.data
                    : [];

                setSkills(skillsData);
            } catch (error) {
                if (cancelled) {
                    return;
                }

                console.error(
                    "Failed to load skills:",
                    error
                );

                setSkillsError(
                    error.message ||
                        "خطا در دریافت مهارت‌ها"
                );

                setSkills([]);
            } finally {
                if (!cancelled) {
                    setSkillsLoading(false);
                }
            }
        }

        loadSkills();

        return () => {
            cancelled = true;
        };
    }, []);

    // ========================================
    // LOAD USER ROADMAP
    // ========================================

    useEffect(() => {
        // هنوز کاربر مشخص نشده
        if (!user?.id) {
            setRoadmap([]);
            setRoadmapGoal(null);
            return;
        }

        // هنوز skills از API نیامده
        if (skillsLoading) {
            return;
        }

        // اگر skills خالی است، فعلاً roadmap نداریم
        if (skills.length === 0) {
            setRoadmap([]);
            setRoadmapGoal(null);
            return;
        }

        let cancelled = false;

        async function loadRoadmap() {
            try {
                // ========================================
                // Get saved roadmap goal
                // ========================================

                const response = await fetch(
                    `http://localhost/devcompass-api/api/roadmap.php?user_id=${user.id}`
                );

                const data = await response.json();

                if (!response.ok || !data.success) {
                    throw new Error(
                        data.message ||
                            "Failed to load roadmap"
                    );
                }

                if (cancelled) {
                    return;
                }

                const goal =
                    data.data?.roadmap_goal;

                // ========================================
                // User doesn't have roadmap
                // ========================================

                if (!goal) {
                    setRoadmap([]);
                    setRoadmapGoal(null);
                    return;
                }

                // ========================================
                // Generate roadmap
                //
                // IMPORTANT:
                // Use the SAME skills array that
                // Skills page uses.
                // ========================================

                const roadmapSkills =
                    generateRoadmap(
                        goal,
                        skills
                    );

                if (cancelled) {
                    return;
                }

                // ========================================
                // Generate stages
                // ========================================

                const generatedRoadmap =
                    generateStages(
                        roadmapSkills
                    );

                if (cancelled) {
                    return;
                }

                // ========================================
                // Save to state
                // ========================================

                setRoadmapGoal(goal);
                setRoadmap(
                    generatedRoadmap
                );
            } catch (error) {
                if (cancelled) {
                    return;
                }

                console.error(
                    "Failed to load roadmap:",
                    error
                );

                setRoadmap([]);
                setRoadmapGoal(null);
            }
        }

        loadRoadmap();

        return () => {
            cancelled = true;
        };
    }, [
        user,
        skills,
        skillsLoading,
    ]);

    // ========================================
    // ROADMAP PROGRESS
    // ========================================

    const progressData = useMemo(() => {
        const allRoadmapSkills =
            roadmap.flatMap(
                (stage) =>
                    stage.skills || []
            );

        const totalSkills =
            allRoadmapSkills.length;

        const completedSkills =
            allRoadmapSkills.filter(
                (skill) =>
                    Number(
                        progress?.[
                            String(skill.id)
                        ] || 0
                    ) >= 100
            );

        const completedSkillsCount =
            completedSkills.length;

        const roadmapProgress =
            totalSkills === 0
                ? 0
                : Math.round(
                      (completedSkillsCount /
                          totalSkills) *
                          100
                  );

        return {
            allSkills:
                allRoadmapSkills,

            totalSkills,

            completedSkills,

            completedSkillsCount,

            roadmapProgress,
        };
    }, [
        roadmap,
        progress,
    ]);

    // ========================================
    // UPDATE SKILL PROGRESS
    // ========================================

    async function updateProgress(
        skillId,
        value
    ) {
        const userId =
            Number(user?.id);

        const numericSkillId =
            Number(skillId);

        const numericValue =
            Number(value);

        console.log(
            "Updating progress:",
            {
                userId,
                skillId,
                numericSkillId,
                value: numericValue,
            }
        );

        // ========================================
        // Validate IDs
        // ========================================

        if (
            !userId ||
            !numericSkillId
        ) {
            throw new Error(
                `شناسه نامعتبر است: user_id=${user?.id}, skill_id=${skillId}`
            );
        }

        // ========================================
        // Validate progress
        // ========================================

        if (
            Number.isNaN(
                numericValue
            ) ||
            numericValue < 0 ||
            numericValue > 100
        ) {
            throw new Error(
                `مقدار پیشرفت نامعتبر است: ${value}`
            );
        }

        // ========================================
        // Send to API
        // ========================================

        const response =
            await fetch(
                "http://localhost/devcompass-api/api/update-progress.php",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",
                    },

                    body: JSON.stringify({
                        user_id:
                            userId,

                        skill_id:
                            numericSkillId,

                        progress:
                            numericValue,
                    }),
                }
            );

        const data =
            await response.json();

        if (
            !response.ok ||
            !data.success
        ) {
            throw new Error(
                data.message ||
                    "خطا در ذخیره پیشرفت"
            );
        }

        // ========================================
        // Update local progress
        // ========================================

        setProgress(
            (previous) => ({
                ...previous,

                [numericSkillId]:
                    numericValue,
            })
        );

        return data;
    }

    // ========================================
    // CONTEXT VALUE
    // ========================================

    const contextValue = {
        // --------------------------------
        // Quiz
        // --------------------------------

        result,
        setResult,

        // --------------------------------
        // Skills
        // --------------------------------

        skills,
        setSkills,

        skillsLoading,
        skillsError,

        // --------------------------------
        // Roadmap
        // --------------------------------

        roadmap,
        setRoadmap,

        roadmapGoal,
        setRoadmapGoal,

        // --------------------------------
        // User Progress
        // --------------------------------

        progress,
        setProgress,

        // --------------------------------
        // Roadmap Progress
        // --------------------------------

        allSkills:
            progressData.allSkills,

        totalSkills:
            progressData.totalSkills,

        completedSkills:
            progressData.completedSkills,

        completedSkillsCount:
            progressData.completedSkillsCount,

        roadmapProgress:
            progressData.roadmapProgress,

        // --------------------------------
        // Actions
        // --------------------------------

        updateProgress,
    };

    // ========================================
    // PROVIDER
    // ========================================

    return (
        <QuizContext.Provider
            value={contextValue}
        >
            {children}
        </QuizContext.Provider>
    );
}

export default QuizContext;