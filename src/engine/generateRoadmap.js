import { skills } from "../data/skills";

export default function generateRoadmap(goal) {

    const roadmap = [];

    const visited = new Set();

    function addSkill(skillId) {

        if (visited.has(skillId))
            return;

        visited.add(skillId);

        const skill =
            skills.find(
                item => item.id === skillId
            );

        if (!skill)
            return;

        skill.requires.forEach(
            requirement => {

                addSkill(requirement);

            }
        );

        roadmap.push(skill);

    }

    const goalSkills =
        skills.filter(
            skill =>
                skill.goals.includes(goal)
        );

    goalSkills.forEach(
        skill => {

            addSkill(skill.id);

        }
    );

    return roadmap;

}
