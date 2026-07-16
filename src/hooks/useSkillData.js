import { useContext } from "react";
import { useParams } from "react-router-dom";
import QuizContext from "../context/QuizContext";

export function useSkillData() {
    const { id } = useParams();
    const { roadmap, progress } = useContext(QuizContext);

    const allSkills = roadmap.flatMap(stage => stage.skills);
    const skill = allSkills.find(skill => skill.id === id);

    // محاسبه درصد کل مسیر
    const totalSkills = allSkills.length;
    const completedSkills = allSkills.filter(s => (progress?.[s.id] || 0) >= 100).length;
    const overallProgress = Math.floor((completedSkills / totalSkills) * 100);

    // پیدا کردن مرحله فعلی و بعدی
    const currentStage = roadmap.find(stage =>
        stage.skills.some(s => s.id === skill?.id)
    );
    const currentStageIndex = roadmap.indexOf(currentStage);
    const nextStage = roadmap[currentStageIndex + 1];

    // پیدا کردن مهارت‌های بعدی در همین مرحله
    const currentStageSkills = currentStage?.skills || [];
    const currentSkillIndex = currentStageSkills.findIndex(s => s.id === skill?.id);
    const nextSkillsInStage = currentStageSkills.slice(currentSkillIndex + 1);

    // پیشنهاد مهارت بعدی
    const getNextSuggestedSkills = () => {
        const suggested = [];
        if (nextSkillsInStage.length > 0) {
            suggested.push(...nextSkillsInStage.slice(0, 2));
        }
        if (suggested.length < 2 && nextStage) {
            const nextStageSkills = nextStage.skills || [];
            suggested.push(...nextStageSkills.slice(0, 2 - suggested.length));
        }
        return suggested;
    };

    const suggestedSkills = getNextSuggestedSkills();

    // وضعیت مهارت
    const getSkillStatus = () => {
        const skillProgress = progress?.[skill?.id] || 0;
        const requires = allSkills.filter(item => skill?.requires?.includes(item.id));

        if (skillProgress >= 100) {
            return { label: "کامل شده ✅", className: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" };
        } else if (skillProgress > 0) {
            return { label: "در حال یادگیری 🚀", className: "bg-cyan-500/10 border-cyan-500/20 text-cyan-400" };
        } else {
            const hasUncompletedPrereq = requires.some(req => (progress?.[req.id] || 0) < 100);
            if (hasUncompletedPrereq) {
                return { label: "قفل شده 🔒", className: "bg-red-500/10 border-red-500/20 text-red-400" };
            }
            return { label: "آماده شروع ✨", className: "bg-green-500/10 border-green-500/20 text-green-400" };
        }
    };

    // دکمه شروع داینامیک
    const getButtonText = () => {
        const skillProgress = progress?.[skill?.id] || 0;
        if (skillProgress >= 100) return "✅ کامل شده";
        if (skillProgress > 0) return "⏳ ادامه یادگیری";
        return "🚀 شروع یادگیری";
    };

    const isButtonDisabled = () => {
        const skillProgress = progress?.[skill?.id] || 0;
        const status = getSkillStatus();
        return skillProgress >= 100 || status.label === "قفل شده 🔒";
    };

    // تخمین زمان پایان
    const estimateEndDate = () => {
        const skillProgress = progress?.[skill?.id] || 0;
        if (skillProgress >= 100) return "تموم شده! 🎉";

        const remainingDays = Math.max(0, skill.time - (skill.time * (skillProgress / 100)));
        const dailyHours = 2;
        const totalHours = remainingDays * dailyHours;

        if (remainingDays <= 0) return "امروز تموم میشه! 🔥";
        if (remainingDays < 1) return `${Math.ceil(totalHours)} ساعت دیگه ⏰`;
        if (remainingDays < 7) return `${Math.ceil(remainingDays)} روز دیگه 📅`;
        if (remainingDays < 30) return `${Math.ceil(remainingDays / 7)} هفته دیگه 📆`;
        return `${Math.ceil(remainingDays / 30)} ماه دیگه 🗓️`;
    };

    const skillProgress = progress?.[skill?.id] || 0;
    const requires = allSkills.filter(item => skill?.requires?.includes(item.id));

    return {
        id,
        skill,
        allSkills,
        progress,
        roadmap,
        requires,
        skillProgress,
        overallProgress,
        currentStage,
        currentStageIndex,
        nextStage,
        nextSkillsInStage,
        suggestedSkills,
        getSkillStatus,
        getButtonText,
        isButtonDisabled: isButtonDisabled(),
        estimateEndDate,
        status: getSkillStatus(),
        totalSkills,
        completedSkills
    };
}