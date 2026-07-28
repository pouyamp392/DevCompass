export default function RoadmapHeader({
    title
}) {
    return (

        <div className="mb-16 text-center">

            <h1
                className="
                text-6xl
                font-black
                bg-gradient-to-r
                from-cyan-300
                to-blue-400
                bg-clip-text
                text-transparent
            "
            >

                {title}

            </h1>

            <p
                className="
                text-zinc-500
                mt-4
            "
            >
                مسیر یادگیری تو
            </p>

        </div>

    );
}