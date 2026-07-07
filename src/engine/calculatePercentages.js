export default function calculatePercentages(scores) {

    const total = Object.values(scores).reduce(
        (sum, value) => sum + value,
        0
    );

    const percentages = {};

    for (const [category, value] of Object.entries(scores)) {

        percentages[category] = Math.round((value / total) * 100);

    }

    return percentages;

}