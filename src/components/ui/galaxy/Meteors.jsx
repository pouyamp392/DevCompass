export default function Meteors() {

    const meteors = Array.from({ length: 4 });

    return (
        <>
            {meteors.map((_, index) => (
                <span
                    key={index}
                    className="meteor"
                    style={{
                        top: `${Math.random() * 60}%`,
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 12}s`
                    }}
                />
            ))}
        </>
    );

}