export default function Stars() {

    const stars = Array.from({ length: 180 });

    return (
        <>
            {stars.map((_, index) => {

                const size = Math.random() * 3 + 1;

                const top = Math.random() * 100;

                const left = Math.random() * 100;

                const delay = Math.random() * 5;

                const duration = Math.random() * 4 + 2;

                return (
                    <span
                        key={index}
                        className="star"
                        style={{
                            width: `${size}px`,
                            height: `${size}px`,
                            top: `${top}%`,
                            left: `${left}%`,
                            animationDelay: `${delay}s`,
                            animationDuration: `${duration}s`
                        }}
                    />
                );

            })}
        </>
    );

}