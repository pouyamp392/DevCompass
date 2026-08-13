import { useContext } from "react";
import { useParams } from "react-router-dom";
import QuizContext from "../context/QuizContext";

export function useSkillData() {
    const { id } = useParams();

    const {
        roadmap,
        progress,
        updateProgress,
        allSkills,
        totalSkills,
        roadmapProgress,
    } = useContext(QuizContext);

    // --------------------------------
    // Current skill
    // --------------------------------

    const skill = allSkills.find(
        (item) => String(item.id) === String(id)
    );

    const skillProgress = Number(
        progress?.[skill?.id] || 0
    );

    // --------------------------------
    // Difficulty
    // --------------------------------

    const difficultyLabels = {
        1: "آسون",
        2: "متوسط",
        3: "سخت",
        4: "خیلی سخت",
        5: "افسانه‌ای",
    };

    const diffText =
        difficultyLabels[Number(skill?.difficulty)] ||
        "نامشخص";

    // --------------------------------
    // Overall roadmap progress
    // --------------------------------

    const overallProgress = roadmapProgress;

    // --------------------------------
    // Prerequisites
    // --------------------------------

    const requires = allSkills.filter((item) =>
        skill?.requires?.includes(item.id)
    );

    // --------------------------------
    // Check prerequisite
    // --------------------------------

    const hasCompletedPrerequisites = (targetSkill) => {
        const requiredSkills = allSkills.filter((item) =>
            targetSkill?.requires?.includes(item.id)
        );

        return requiredSkills.every(
            (requiredSkill) =>
                Number(progress?.[requiredSkill.id] || 0) >= 100
        );
    };

    // --------------------------------
    // Current and next stage
    // --------------------------------

    const currentStage =
        roadmap.find((stage) =>
            stage.skills?.some(
                (item) => item.id === skill?.id
            )
        ) || null;

    const currentStageIndex = currentStage
        ? roadmap.indexOf(currentStage)
        : -1;

    const nextStage =
        currentStageIndex >= 0
            ? roadmap[currentStageIndex + 1] || null
            : null;

    // --------------------------------
    // Next skills in current stage
    // --------------------------------

    const currentStageSkills =
        currentStage?.skills || [];

    const currentSkillIndex =
        currentStageSkills.findIndex(
            (item) => item.id === skill?.id
        );

    const nextSkillsInStage =
        currentSkillIndex >= 0
            ? currentStageSkills.slice(
                  currentSkillIndex + 1
              )
            : [];

    // --------------------------------
    // Suggested skills
    // --------------------------------

    const getNextSuggestedSkills = () => {
        const suggested = [];

        // First: skills later in current stage
        for (const candidate of nextSkillsInStage) {
            if (suggested.length >= 2) break;

            const candidateProgress =
                Number(progress?.[candidate.id] || 0);

            if (
                candidateProgress === 0 &&
                hasCompletedPrerequisites(candidate)
            ) {
                suggested.push(candidate);
            }
        }

        // Then: skills from next stage
        if (suggested.length < 2 && nextStage) {
            const nextStageSkills =
                nextStage.skills || [];

            for (const candidate of nextStageSkills) {
                if (suggested.length >= 2) break;

                const candidateProgress =
                    Number(progress?.[candidate.id] || 0);

                if (
                    candidateProgress === 0 &&
                    hasCompletedPrerequisites(candidate)
                ) {
                    suggested.push(candidate);
                }
            }
        }

        return suggested;
    };

    const suggestedSkills =
        getNextSuggestedSkills();

    // --------------------------------
    // Skill status
    // --------------------------------

    const getSkillStatus = () => {
        if (skillProgress >= 100) {
            return {
                label: "کامل شده ✅",
                className:
                    "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
            };
        }

        if (skillProgress > 0) {
            return {
                label: "در حال یادگیری 🚀",
                className:
                    "bg-cyan-500/10 border-cyan-500/20 text-cyan-400",
            };
        }

        const prerequisitesCompleted =
            hasCompletedPrerequisites(skill);

        if (!prerequisitesCompleted) {
            return {
                label: "قفل شده 🔒",
                className:
                    "bg-red-500/10 border-red-500/20 text-red-400",
            };
        }

        return {
            label: "آماده شروع ✨",
            className:
                "bg-green-500/10 border-green-500/20 text-green-400",
        };
    };

    const status = getSkillStatus();

    // --------------------------------
    // Button
    // --------------------------------

    const getButtonText = () => {
        if (skillProgress >= 100) {
            return "✅ کامل شده";
        }

        if (skillProgress > 0) {
            return "⏳ ادامه یادگیری";
        }

        return "🚀 شروع یادگیری";
    };

    const isButtonDisabled =
        skillProgress >= 100 ||
        status.label === "قفل شده 🔒";

    // --------------------------------
    // Estimate end date
    // --------------------------------

    const estimateEndDate = () => {
        if (!skill) return null;

        if (skillProgress >= 100) {
            return "تموم شده! 🎉";
        }

        const skillTime = Number(skill.time || 0);

        const remainingDays = Math.max(
            0,
            skillTime -
                skillTime *
                    (skillProgress / 100)
        );

        const dailyHours = 2;

        const totalHours =
            remainingDays * dailyHours;

        if (remainingDays <= 0) {
            return "امروز تموم میشه! 🔥";
        }

        if (remainingDays < 1) {
            return `${Math.ceil(
                totalHours
            )} ساعت دیگه ⏰`;
        }

        if (remainingDays < 7) {
            return `${Math.ceil(
                remainingDays
            )} روز دیگه 📅`;
        }

        if (remainingDays < 30) {
            return `${Math.ceil(
                remainingDays / 7
            )} هفته دیگه 📆`;
        }

        return `${Math.ceil(
            remainingDays / 30
        )} ماه دیگه 🗓️`;
    };

    // --------------------------------
    // Update progress
    // --------------------------------

    const handleProgressUpdate = async (value) => {
        if (!skill?.id) return;

        await updateProgress(
            skill.id,
            value
        );
    };

    // --------------------------------
    // Return
    // --------------------------------

    return {
        id,

        // Current skill
        skill,
        skillProgress,
        diffText,

        // Roadmap
        roadmap,
        allSkills,
        totalSkills,

        // Progress
        progress,
        overallProgress,

        // Prerequisites
        requires,
        hasCompletedPrerequisites,

        // Stages
        currentStage,
        currentStageIndex,
        nextStage,
        nextSkillsInStage,

        // Suggestions
        suggestedSkills,

        // Status
        status,
        getSkillStatus,

        // Button
        getButtonText,
        isButtonDisabled,

        // Estimate
        estimateEndDate,

        // Action
        handleProgressUpdate,
    };
}