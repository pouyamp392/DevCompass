attribute float aSize;
attribute float aSpeed;
attribute float aPhase;

uniform float uTime;

varying vec3 vColor;

void main() {
    vColor = color;

    vec3 pos = position;
    
    // حرکت نوسانی بسیار آروم
    float wave = sin(uTime * aSpeed * 0.1 + aPhase) * 0.2;
    pos.y += wave * 0.1;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);

    gl_PointSize = clamp(
        aSize * (300.0 / -mvPosition.z),
        0.5,
        8.0
    );

    gl_Position = projectionMatrix * mvPosition;
}