varying vec2 vUv;

void main(){

    vec2 uv = vUv;

    uv -= 0.5;

    float dist = length(uv);

    float glow = smoothstep(0.6,0.0,dist);

    vec3 inner = vec3(0.70,0.85,1.0);

    vec3 outer = vec3(0.20,0.35,0.90);

    vec3 color = mix(outer,inner,glow);

    gl_FragColor = vec4(color,glow);

}