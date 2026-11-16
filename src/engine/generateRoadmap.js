// ========================================
// GENERATE ROADMAP
// ========================================
//
// ورودی:
//   goal         → حوزه‌ی اصلی (frontend / backend / ai / devops)
//   skills       → همه‌ی مهارت‌ها از API
//   userProfile  → { level, goal, time, style } از کوییز (اختیاری)
//
// خروجی: آرایه‌ی مرتب‌شده از مهارت‌ها
//
// منطق:
//   1. فیلتر بر اساس goal
//   2. فیلتر بر اساس level (beginner → بدون سخت، advanced → بدون ساده)
//   3. فیلتر بر اساس time (low → بدون optional)
//   4. مرتب‌سازی بر اساس stage + اولویت‌های goal
//   5. اضافه کردن pre-req ها

export default function generateRoadmap(goal, skills, userProfile = {}) {
    if (!Array.isArray(skills) || skills.length === 0) {
        return [];
    }

    const { level, goal: goalIntent, time } = userProfile || {};

    // ----------------------------------------
    // 1. فیلتر بر اساس goal
    // ----------------------------------------

    const goalSkills = skills.filter(
        (skill) =>
            Array.isArray(skill.goals) &&
            skill.goals.includes(goal)
    );

    // ----------------------------------------
    // 2. فیلتر بر اساس level
    // ----------------------------------------

    let levelFiltered = goalSkills;

    if (level === "beginner") {
        // مبتدی: مهارت‌های سخت (difficulty >= 4) رو حذف کن
        levelFiltered = goalSkills.filter(
            (skill) => Number(skill.difficulty) <= 3
        );
    } else if (level === "advanced") {
        // پیشرفته: مهارت‌های خیلی ساده (difficulty == 1) رو حذف کن
        levelFiltered = goalSkills.filter(
            (skill) => Number(skill.difficulty) >= 2
        );
    }

    // اگه فیلتر سطح باعث خالی شدن شد، برگرد به goalSkills
    if (levelFiltered.length === 0) {
        levelFiltered = goalSkills;
    }

    // ----------------------------------------
    // 3. فیلتر بر اساس time
    // ----------------------------------------

    let timeFiltered = levelFiltered;

    if (time === "low") {
        // وقت کم: مهارت‌های optional رو حذف کن
        timeFiltered = levelFiltered.filter(
            (skill) => skill.priority !== "optional"
        );
    }

    // اگه خالی شد، برگرد به levelFiltered
    if (timeFiltered.length === 0) {
        timeFiltered = levelFiltered;
    }

    // ----------------------------------------
    // 4. مرتب‌سازی
    // ----------------------------------------

    const sorted = [...timeFiltered].sort((a, b) => {
        // الف) اولویت‌های هدف شغلی
        if (goalIntent === "freelance") {
            const aIsFreelance =
                a.id === "portfolio" || a.id === "freelancing" ? 1 : 0;
            const bIsFreelance =
                b.id === "portfolio" || b.id === "freelancing" ? 1 : 0;

            if (aIsFreelance !== bIsFreelance) {
                return bIsFreelance - aIsFreelance;
            }
        }

        if (goalIntent === "employment") {
            const aIsEmployment =
                a.id === "testing" || a.id === "deployment" ? 1 : 0;
            const bIsEmployment =
                b.id === "testing" || b.id === "deployment" ? 1 : 0;

            if (aIsEmployment !== bIsEmployment) {
                return bIsEmployment - aIsEmployment;
            }
        }

        // ب) اولویت: required قبل از recommended قبل از optional
        const priorityWeight = {
            required: 0,
            recommended: 1,
            optional: 2,
        };

        const aPriority = priorityWeight[a.priority] ?? 2;
        const bPriority = priorityWeight[b.priority] ?? 2;

        if (aPriority !== bPriority) {
            return aPriority - bPriority;
        }

        // ج) stage (کمتر = جلوتر)
        const aStage = Number(a.stage) || 99;
        const bStage = Number(b.stage) || 99;

        if (aStage !== bStage) {
            return aStage - bStage;
        }

        // د) difficulty (ساده‌تر = جلوتر)
        const aDiff = Number(a.difficulty) || 3;
        const bDiff = Number(b.difficulty) || 3;

        return aDiff - bDiff;
    });

    // ----------------------------------------
    // 5. اضافه کردن pre-req ها (topological sort)
    // ----------------------------------------

    const roadmap = [];
    const visited = new Set();

    function addSkill(skillId) {
        if (visited.has(skillId)) {
            return;
        }

        visited.add(skillId);

        const skill = skills.find(
            (item) => Number(item.id) === Number(skillId)
        );

        if (!skill) {
            return;
        }

        const requires = Array.isArray(skill.requires)
            ? skill.requires
            : [];

        // اول pre-req ها
        requires.forEach((requirement) => {
            addSkill(requirement);
        });

        // بعد خود مهارت
        roadmap.push(skill);
    }

    // اولویت‌دارها اول، بقیه بعد
    sorted.forEach((skill) => {
        addSkill(skill.id);
    });

    return roadmap;
}