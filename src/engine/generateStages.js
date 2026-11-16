export default function generateStages(roadmap) {

    const stages = {};

    roadmap.forEach(skill => {

        if (!stages[skill.stage]) {

            stages[skill.stage] = [];

        }

        stages[skill.stage].push(skill);

    });

    return Object
        .entries(stages)
        .map(([stage, skills]) => ({

            stage: Number(stage),

            skills

        }))
        .sort(
            (a, b) =>
                a.stage - b.stage
        );

}