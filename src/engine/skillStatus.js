// ========================================
// SKILL STATUS
// ========================================
//
// این تابع تنها منبع حقیقت برای وضعیت یک مهارت است.
//
// پارامترها:
//   skill          → آبجکت مهارت (شامل id و requires)
//   progress       → آبجکت progress (کلیدها عددی)
//   orderedSkills  → آرایه‌ی مرتب مهارت‌ها (اختیاری)
//                    اگه داده بشه، منطق linear (قدم به قدم)
//                    اگه نداده بشه، fallback به pre-req
//
// خروجی:
//   "completed"    → progress >= 100
//   "in-progress"  → 0 < progress < 100
//   "available"    → progress = 0 و نوبتشه
//   "locked"       → progress = 0 و نوبتش نیست

export function getSkillStatus(skill, progress = {}, orderedSkills = []) {
    // ----------------------------------------
    // 1. Validation
    // ----------------------------------------

    if (!skill) {
        return "locked";
    }

    // ----------------------------------------
    // 2. Progress
    // ----------------------------------------

    const skillId = Number(skill.id);
    const value = Number(progress?.[skillId]) || 0;

    // ----------------------------------------
    // 3. Completed
    // ----------------------------------------

    if (value >= 100) {
        return "completed";
    }

    // ----------------------------------------
    // 4. In Progress
    // ----------------------------------------

    if (value > 0) {
        return "in-progress";
    }

    // ----------------------------------------
    // 5. Fallback: pre-req based (بدون orderedSkills)
    // ----------------------------------------

    if (!Array.isArray(orderedSkills) || orderedSkills.length === 0) {
        const requires = Array.isArray(skill.requires)
            ? skill.requires
            : [];

        if (requires.length === 0) {
            return "available";
        }

        const hasUncompletedRequired = requires.some((reqId) => {
            const reqValue = Number(progress?.[Number(reqId)]) || 0;
            return reqValue < 100;
        });

        return hasUncompletedRequired ? "locked" : "available";
    }

    // ----------------------------------------
    // 6. Linear: بر اساس ترتیب roadmap
    // ----------------------------------------

    const index = orderedSkills.findIndex(
        (s) => Number(s.id) === skillId
    );

    // skill توی لیست نیست → fallback
    if (index < 0) {
        const requires = Array.isArray(skill.requires)
            ? skill.requires
            : [];

        if (requires.length === 0) {
            return "available";
        }

        const hasUncompletedRequired = requires.some((reqId) => {
            const reqValue = Number(progress?.[Number(reqId)]) || 0;
            return reqValue < 100;
        });

        return hasUncompletedRequired ? "locked" : "available";
    }

    // اولین skill توی لیست → available
    if (index === 0) {
        return "available";
    }

    // چک کن همه‌ی skillهای قبلی کامل شدن
    const allPreviousCompleted = orderedSkills
        .slice(0, index)
        .every((prev) => {
            const prevValue = Number(progress?.[Number(prev.id)]) || 0;
            return prevValue >= 100;
        });

    return allPreviousCompleted ? "available" : "locked";
}