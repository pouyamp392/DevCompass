precision highp float;

varying vec3 vColor;
varying float vTwinkle;
varying float vBrightness;

void main() {
    vec2 uv = gl_PointCoord - vec2(0.5);
    float dist = length(uv);

    if (dist > 0.5) discard;

    float core = smoothstep(0.5, 0.05, dist);

    float rareGlow = smoothstep(0.5, 0.0, dist) * step(2.0, vBrightness) * 0.35;

    float alpha = clamp(core + rareGlow, 0.0, 1.0) * vTwinkle;

    // به‌جای اینکه فقط رنگ خام رو بدیم، شدتش رو با brightness واقعی ضرب می‌کنیم
    // و کمی بیشتر از ۱ اجازه می‌دیم بره تا با additive blending واقعا "بدرخشه"
    vec3 color = vColor * vBrightness * (1.0 + core * 0.5);

    gl_FragColor = vec4(color, alpha);
}