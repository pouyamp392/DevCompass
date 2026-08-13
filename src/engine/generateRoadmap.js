export default function generateRoadmap(goal, skills) {
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

        // اول پیش‌نیازها
        requires.forEach((requirement) => {
            addSkill(requirement);
        });

        // بعد خود مهارت
        roadmap.push(skill);
    }

    const goalSkills = skills.filter(
        (skill) =>
            Array.isArray(skill.goals) &&
            skill.goals.includes(goal)
    );

    goalSkills.forEach((skill) => {
        addSkill(skill.id);
    });

    return roadmap;
}