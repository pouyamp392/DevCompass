varying vec3 vColor;
precision highp float;
void main() {

    vec2 uv = gl_PointCoord - vec2(0.5);

    float dist = length(uv);

    if(dist > 0.5){
        discard;
    }

    // هسته‌ی روشن
    float core = smoothstep(0.15, 0.0, dist);

    // هاله‌ی اطراف
    float glow = smoothstep(0.5, 0.0, dist);

    // ترکیب
    float alpha = core + glow * 0.35;

    gl_FragColor = vec4(vColor, alpha);

}