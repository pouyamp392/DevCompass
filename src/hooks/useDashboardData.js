import { useContext, useEffect, useState } from "react";
import QuizContext from "../context/QuizContext";
import AuthContext from "../context/AuthContext";
import { getSkillStatus } from "../engine/skillStatus";

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
    // Skill states (from engine)
    // --------------------------------

    const inProgressSkills = allSkills.filter(
        (skill) => getSkillStatus(skill, progress) === "in-progress"
    );

    const lockedSkills = allSkills.filter(
        (skill) => getSkillStatus(skill, progress) === "locked"
    );

    const availableSkills = allSkills.filter(
        (skill) => getSkillStatus(skill, progress) === "available"
    );

    // --------------------------------
    // Roadmap skill order
    // --------------------------------

    const roadmapSkills = roadmap.flatMap((stage) => stage.skills || []);

    // --------------------------------
    // Current skill
    // --------------------------------

    const currentSkill =
        roadmapSkills.find(
            (skill) => getSkillStatus(skill, progress) === "in-progress"
        ) || null;

    // --------------------------------
    // Next skill
    // --------------------------------

    const nextSkill =
        roadmapSkills.find(
            (skill) => getSkillStatus(skill, progress) === "available"
        ) || null;

    // --------------------------------
    // XP (single source of truth: user.xp)
    // --------------------------------

    const totalXP = Number(user?.xp) || 0;

    // --------------------------------
    // Current stage
    // --------------------------------

    const currentStage =
        roadmap.find((stage) =>
            stage.skills?.some(
                (skill) => String(skill.id) === String(currentSkill?.id)
            )
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
        availableSkills,
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