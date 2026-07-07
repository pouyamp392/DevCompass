export default function calculateScore(questions, answers) {

    const scores = {};

    for (const question of questions) {

        const answerIndex = answers[question.id];

        if (answerIndex === undefined) continue;

        const selectedAnswer = question.answers[answerIndex];

        for (const [category, value] of Object.entries(selectedAnswer.score)) {

            scores[category] = (scores[category] || 0) + value;

        }

    }

    return scores;

}