precision highp float;

attribute float aSize;
attribute float aSpeed;
attribute float aPhase;
attribute float aBrightness;

varying vec3 vColor;
varying float vTwinkle;
varying float vBrightness;

uniform float uTime;
uniform bool uTwinkle;

void main() {
    vColor = color;
    vBrightness = aBrightness;

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    float depth = -mvPosition.z;

    if (uTwinkle) {
        float amount = step(1.6, aBrightness) * 0.18;
        vTwinkle = 1.0 - amount + amount * sin(uTime * aSpeed + aPhase);
    } else {
        vTwinkle = 1.0;
    }

    // ستاره‌های پرنورتر کمی بزرگ‌تر هم دیده بشن (شبیه bloom طبیعی چشم/سنسور)
    float brightnessBoost = 0.7 + aBrightness * 0.3;

    float size = aSize * brightnessBoost * (230.0 / depth);

    // کف رو خیلی پایین‌تر آوردم تا ستاره‌های کوچیک واقعا کوچیک بمونن،
    // و سقف رو بالاتر بردم تا نادرها واقعا بزرگ و متمایز باشن
    gl_PointSize = clamp(size, 0.9, 8.0);

    gl_Position = projectionMatrix * mvPosition;
}