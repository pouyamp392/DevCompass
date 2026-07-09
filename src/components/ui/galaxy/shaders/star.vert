attribute float aSize;
precision highp float;
varying vec3 vColor;

void main() {

    vColor = color;

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

    gl_PointSize =
    clamp(
        aSize * (250.0 / -mvPosition.z),
        1.0,
        6.0
    );

    gl_Position = projectionMatrix * mvPosition;
}