import { useContext, useState, useEffect } from "react";
import QuizContext from "../context/QuizContext";

export function useDashboardData() {
    const { roadmap, progress } = useContext(QuizContext);

    const [dailyProgress, setDailyProgress] = useState(0);
    const [streakDays, setStreakDays] = useState(7);

    const allSkills = roadmap.flatMap(stage => stage.skills);

    const completedSkills = allSkills.filter(
        skill => (progress?.[skill.id] || 0) >= 100
    );

    const inProgressSkills = allSkills.filter(
        skill => {
            const value = progress?.[skill.id] || 0;
            return value > 0 && value < 100;
        }
    );

    const lockedSkills = allSkills.filter(
        skill => {
            const value = progress?.[skill.id] || 0;
            if (value > 0) return false;

            const requires = allSkills.filter(item => skill.requires?.includes(item.id));
            const hasUncompletedPrereq = requires.some(req => (progress?.[req.id] || 0) < 100);
            return hasUncompletedPrereq;
        }
    );

    const currentSkill = inProgressSkills[0] || null;

    const totalXP = completedSkills.reduce(
        (acc, skill) => acc + (skill.xp || 0), 0
    );

    const roadmapProgress = Math.floor(
        (completedSkills.length / allSkills.length) * 100
    );

    const currentStage = roadmap.find(stage =>
        stage.skills.some(s => s.id === currentSkill?.id)
    );

    const recentSkills = [...allSkills]
        .filter(s => (progress?.[s.id] || 0) > 0)
        .sort((a, b) => (progress?.[b.id] || 0) - (progress?.[a.id] || 0))
        .slice(0, 3);

    const getNextSuggestedSkill = () => {
        if (currentSkill) return currentSkill;

        const available = allSkills.find(skill => {
            const value = progress?.[skill.id] || 0;
            if (value > 0) return false;

            const requires = allSkills.filter(item => skill.requires?.includes(item.id));
            const hasUncompletedPrereq = requires.some(req => (progress?.[req.id] || 0) < 100);
            return !hasUncompletedPrereq;
        });

        return available || allSkills[0];
    };

    const nextSkill = getNextSuggestedSkill();
    const skillProgress = currentSkill ? (progress?.[currentSkill.id] || 0) : 0;

    const achievements = [
        {
            id: "first_skill",
            label: "اولین مهارت",
            icon: "🌟",
            unlocked: completedSkills.length >= 1,
            description: "یک مهارت رو کامل کردی"
        },
        {
            id: "five_skills",
            label: "مهارت‌آموز",
            icon: "🏅",
            unlocked: completedSkills.length >= 5,
            description: "۵ مهارت رو کامل کردی"
        },
        {
            id: "ten_skills",
            label: "متخصص",
            icon: "🏆",
            unlocked: completedSkills.length >= 10,
            description: "۱۰ مهارت رو کامل کردی"
        },
        {
            id: "xp_500",
            label: "جمع‌آورنده XP",
            icon: "💎",
            unlocked: totalXP >= 500,
            description: "۵۰۰ XP جمع کردی"
        },
        {
            id: "xp_1000",
            label: "استاد XP",
            icon: "👑",
            unlocked: totalXP >= 1000,
            description: "۱۰۰۰ XP جمع کردی"
        },
        {
            id: "seven_day",
            label: "متدی",
            icon: "🔥",
            unlocked: streakDays >= 7,
            description: "۷ روز متوالی یادگیری"
        }
    ];

    const unlockedAchievements = achievements.filter(a => a.unlocked);
    const nextAchievement = achievements.find(a => !a.unlocked);

    useEffect(() => {
        const saved = localStorage.getItem('dailyProgress');
        if (saved) {
            setDailyProgress(parseInt(saved));
        }
    }, []);

    return {
        allSkills,
        completedSkills,
        inProgressSkills,
        lockedSkills,
        currentSkill,
        nextSkill,
        totalXP,
        roadmapProgress,
        currentStage,
        recentSkills,
        skillProgress,
        achievements,
        unlockedAchievements,
        nextAchievement,
        dailyProgress,
        setDailyProgress,
        streakDays,
        progress,
        roadmap
    };
}