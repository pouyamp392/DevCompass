export default function RoadmapProgress({
    progress,
    completed,
    total
}) {

    return (
        <div
            className="
                max-w-3xl
                mx-auto
                mb-16
                p-6
                rounded-3xl
                bg-zinc-900
                border
                border-zinc-800
            "
        >

            <div
                className="
                    flex
                    justify-between
                    mb-3
                "
            >

                <span>
                    پیشرفت
                </span>

                <span>
                    {completed}
                    /
                    {total}
                </span>

            </div>

            <div
                className="
                    h-3
                    bg-zinc-800
                    rounded-full
                    overflow-hidden
                "
            >

                <div
                    className="
                        h-full
                        bg-gradient-to-r
                        from-cyan-400
                        to-blue-500
                        duration-500
                    "
                    style={{
                        width:
                            `${progress}%`
                    }}
                />

            </div>

        </div>
    );
}