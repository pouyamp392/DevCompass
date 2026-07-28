uniform float uOpacity;

varying vec2 vUv;

void main()
{
    float tail =
        pow(vUv.x, 3.0);

    float width =
        smoothstep(
            0.45,
            0.0,
            abs(vUv.y - 0.5)
        );

    float head =
        smoothstep(
            0.3,
            0.0,
            distance(
                vUv,
                vec2(
                    1.0,
                    0.5
                )
            )
        );

    vec3 color =
        vec3(
            0.65,
            0.82,
            1.0
        );

    color +=
        vec3(1.0) *
        head *
        4.0;

    float alpha =
        (
            tail *
            width
            +
            head
        ) *
        uOpacity;

    gl_FragColor =
        vec4(
            color,
            alpha
        );
}