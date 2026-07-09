import { useMemo } from "react";
import * as THREE from "three";

import vertexShader from "./shaders/star.vert?raw";
import fragmentShader from "./shaders/star.frag?raw";

export default function StarField({

    count = 1000,
    spread = 200,
    sizeMin = 0.5,
    sizeMax = 2,
    opacity = 1

}) {

    const { geometry, material } = useMemo(() => {

        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const sizes = new Float32Array(count);

        for (let i = 0; i < count; i++) {

            const radius =
                THREE.MathUtils.randFloat(40, 120);

            const theta =
                Math.random() * Math.PI * 2;

            const phi =
                Math.acos(
                    THREE.MathUtils.randFloatSpread(2)
                );

            positions[i * 3] =
                radius *
                Math.sin(phi) *
                Math.cos(theta);

            positions[i * 3 + 1] =
                radius *
                Math.cos(phi);

            positions[i * 3 + 2] =
                radius *
                Math.sin(phi) *
                Math.sin(theta);

            const color = new THREE.Color();

            const random = Math.random();

            if (random < 0.6) {

                color.set("#ffffff");

            }
            else if (random < 0.9) {

                color.set("#cbd5e1");

            }
            else {

                color.set("#64748b");

            }

            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;

            sizes[i] =
                THREE.MathUtils.randFloat(
                    sizeMin,
                    sizeMax
                );
        }

        const geometry = new THREE.BufferGeometry();

        geometry.setAttribute(
            "position",
            new THREE.BufferAttribute(positions, 3)
        );

        geometry.setAttribute(
            "color",
            new THREE.BufferAttribute(colors, 3)
        );

        geometry.setAttribute(
            "aSize",
            new THREE.BufferAttribute(sizes, 1)
        );

        const material = new THREE.ShaderMaterial({

            vertexShader,
            fragmentShader,

            transparent: true,

            opacity,

            depthWrite: false,

            vertexColors: true,

            blending: THREE.AdditiveBlending
        });

        return {

            geometry,
            material

        };

    }, [    count,
    spread,
    sizeMin,
    sizeMax,
    opacity]);

    return (
        <points
            geometry={geometry}
            material={material}
        />
    );
}