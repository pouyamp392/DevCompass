export default function sortByPercentage(percentages) {

    return Object.entries(percentages)

        .map(([id, percentage]) => ({
            id,
            percentage
        }))

        .sort((a, b) => b.percentage - a.percentage);

}