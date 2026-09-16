import { useContext, useEffect, useState } from "react";
import QuizContext from "../context/QuizContext";
import AuthContext from "../context/AuthContext";

export function useDashboardData() {
    const { user } = useContext(AuthContext);
    const {
        roadmap,
        progress,
        roadmapProgress,
        allSkills,
        completedSkills,
    } = useContext(QuizContext);

    const [dailyProgress, setDailyProgress] = useState(0);
    const [streakDays, setStreakDays] = useState(7);

    // --------------------------------
    // Skill states
    // --------------------------------

    const inProgressSkills = allSkills.filter((skill) => {
        const value = Number(progress?.[skill.id]) || 0;
        return value > 0 && value < 100;
    });

    const lockedSkills = allSkills.filter((skill) => {
        const value = Number(progress?.[skill.id]) || 0;
        if (value > 0) return false;

        const requires = skill.requires || [];
        return requires.some(
            (requiredId) => (Number(progress?.[requiredId]) || 0) < 100
        );
    });

    // --------------------------------
    // Skill availability
    // --------------------------------

    function isSkillAvailable(skill) {
        const value = Number(progress?.[skill.id]) || 0;
        if (value >= 100) return false;

        const requires = skill.requires || [];
        return requires.every(
            (requiredId) => (Number(progress?.[requiredId]) || 0) >= 100
        );
    }

    // --------------------------------
    // Roadmap skill order
    // --------------------------------

    const roadmapSkills = roadmap.flatMap((stage) => stage.skills || []);

    // --------------------------------
    // Current skill
    // --------------------------------

    const currentSkill =
        roadmapSkills.find((skill) => {
            const value = Number(progress?.[skill.id]) || 0;
            return value > 0 && value < 100;
        }) || null;

    // --------------------------------
    // Next skill
    // --------------------------------

    const nextSkill =
        roadmapSkills.find((skill) => {
            const value = Number(progress?.[skill.id]) || 0;
            if (value > 0) return false;
            return isSkillAvailable(skill);
        }) || null;

    // --------------------------------
    // XP (Read directly from AuthContext with local fallback)
    // --------------------------------

    const calculatedXP = completedSkills.reduce(
        (acc, skill) => acc + (Number(skill.xp) || 0),
        0
    );

    const totalXP =
        user?.xp !== undefined && user?.xp !== null
            ? Number(user.xp)
            : calculatedXP;

    // --------------------------------
    // Current stage
    // --------------------------------

    const currentStage =
        roadmap.find((stage) =>
            stage.skills?.some((skill) => skill.id === currentSkill?.id)
        ) || null;

    // --------------------------------
    // Recent skills
    // --------------------------------

    const recentSkills = [...allSkills]
        .filter((skill) => (Number(progress?.[skill.id]) || 0) > 0)
        .sort(
            (a, b) =>
                (Number(progress?.[b.id]) || 0) -
                (Number(progress?.[a.id]) || 0)
        )
        .slice(0, 3);

    // --------------------------------
    // Current skill progress
    // --------------------------------

    const skillProgress = currentSkill
        ? Number(progress?.[currentSkill.id]) || 0
        : 0;

    // --------------------------------
    // Achievements
    // --------------------------------

    const achievements = [
        {
            id: "first_skill",
            label: "اولین مهارت",
            icon: "🌟",
            unlocked: completedSkills.length >= 1,
            description: "یک مهارت رو کامل کردی",
        },
        {
            id: "five_skills",
            label: "مهارت‌آموز",
            icon: "🏅",
            unlocked: completedSkills.length >= 5,
            description: "۵ مهارت رو کامل کردی",
        },
        {
            id: "ten_skills",
            label: "متخصص",
            icon: "🏆",
            unlocked: completedSkills.length >= 10,
            description: "۱۰ مهارت رو کامل کردی",
        },
        {
            id: "xp_500",
            label: "جمع‌آورنده XP",
            icon: "💎",
            unlocked: totalXP >= 500,
            description: "۵۰۰ XP جمع کردی",
        },
        {
            id: "xp_1000",
            label: "استاد XP",
            icon: "👑",
            unlocked: totalXP >= 1000,
            description: "۱۰۰۰ XP جمع کردی",
        },
        {
            id: "seven_day",
            label: "متدی",
            icon: "🔥",
            unlocked: streakDays >= 7,
            description: "۷ روز متوالی یادگیری",
        },
    ];

    const unlockedAchievements = achievements.filter(
        (achievement) => achievement.unlocked
    );

    const nextAchievement =
        achievements.find((achievement) => !achievement.unlocked) || null;

    // --------------------------------
    // Daily progress
    // --------------------------------

    useEffect(() => {
        const saved = localStorage.getItem("dailyProgress");
        if (saved !== null) {
            setDailyProgress(Number(saved) || 0);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("dailyProgress", String(dailyProgress));
    }, [dailyProgress]);

    // --------------------------------
    // Return
    // --------------------------------

    return {
        allSkills,
        completedSkills,
        inProgressSkills,
        lockedSkills,
        currentSkill,
        nextSkill,
        currentStage,
        progress,
        roadmapProgress,
        skillProgress,
        totalXP,
        recentSkills,
        achievements,
        unlockedAchievements,
        nextAchievement,
        dailyProgress,
        setDailyProgress,
        streakDays,
        setStreakDays,
        roadmap,
    };
}