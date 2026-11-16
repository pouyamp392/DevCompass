export default function calculateScore(questions, answers) {
    const scores = {};
    const userProfile = {};

    for (const question of questions) {
        const answerIndex = answers[question.id];

        if (answerIndex === undefined) {
            continue;
        }

        const selectedAnswer = question.answers[answerIndex];

        if (!selectedAnswer) {
            continue;
        }


        if (
            selectedAnswer.score &&
            typeof selectedAnswer.score === "object"
        ) {
            for (const [category, value] of Object.entries(
                selectedAnswer.score
            )) {
                scores[category] = (scores[category] || 0) + value;
            }
        }

        if (selectedAnswer.profile) {
            const category = question.category;

            if (category && category !== "interest") {
                userProfile[category] = selectedAnswer.profile;
            }
        }
    }

    return {
        scores,
        userProfile,
    };
}